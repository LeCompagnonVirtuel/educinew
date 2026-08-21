import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAcademicMetricsError, EduCloudAcademicOptimizationError, EduCloudAcademicProjectionError, EduCloudAcademicSimulationError, EduCloudAIPredictionFactorError, EduCloudAllocationRuleError, EduCloudAssemblyPointError, EduCloudBottleneckError, EduCloudBudgetAllocationError, EduCloudBudgetOptimizationError, EduCloudBudgetProjectionError, EduCloudBudgetSimulationError, EduCloudCapacityOptimizationError, EduCloudCapacityPlanError, EduCloudCapacityResultError, EduCloudCapacitySimulationError, EduCloudCapacityTargetError, EduCloudClassAssignmentError, EduCloudComparisonMetricError, EduCloudDashboardLayoutError, EduCloudDashboardWidgetError, EduCloudDataPointError, EduCloudDisasterImpactError, EduCloudDisasterParameterError, EduCloudDisasterRecoveryError, EduCloudDisasterScenarioError, EduCloudDisasterSimulationError, EduCloudEnergyForecastError, EduCloudEnergyOptimizationError, EduCloudEnergySimulationError, EduCloudEnergySourceError, EduCloudEnrollmentDataPointError, EduCloudEnrollmentParameterError, EduCloudEnrollmentProjectionError, EduCloudEnrollmentScenarioError, EduCloudEnrollmentSimulationError, EduCloudEnvironmentalForecastError, EduCloudEnvironmentalImpactResultError, EduCloudEnvironmentalOptimizationError, EduCloudEnvironmentalSimulationError, EduCloudEvacuationMetricError, EduCloudEvacuationPlanError, EduCloudEvacuationRouteError, EduCloudEvacuationSimulationError, EduCloudFinancialOptimizationError, EduCloudFinancialProjectionError, EduCloudFinancialSimulationError, EduCloudFinancialStateError, EduCloudGeoLocationError, EduCloudGeoPointError, EduCloudGrowthFactorError, EduCloudGrowthProjectionResultError, EduCloudGrowthScenarioError, EduCloudGrowthSimulationError, EduCloudHazardError, EduCloudImprovementAreaError, EduCloudInfrastructureAssessmentError, EduCloudInfrastructureAssetError, EduCloudInfrastructurePlanError, EduCloudInfrastructureProjectError, EduCloudInfrastructureSimulationError, EduCloudMaintenanceAssetError, EduCloudMaintenanceOptimizationError, EduCloudMaintenanceScheduleError, EduCloudMaintenanceSimulationError, EduCloudMaintenanceTaskError, EduCloudOperationalMetricsError, EduCloudOperationalOptimizationError, EduCloudOperationalProjectionError, EduCloudOperationalSimulationError, EduCloudOptimizationResultError, EduCloudProcessImprovementError, EduCloudProjectionFactorError, EduCloudRecoveryPhaseError, EduCloudReportSectionError, EduCloudReportTableError, EduCloudResourceAllocationError, EduCloudResourceConstraintError, EduCloudResourceOptimizationError, EduCloudRouteUtilizationError, EduCloudSafetyAssessmentError, EduCloudSafetyMeasureError, EduCloudSafetyPlanError, EduCloudSafetySimulationError, EduCloudScenarioComparisonError, EduCloudScenarioDataError, EduCloudScenarioRankingError, EduCloudScenarioRecommendationError, EduCloudScenarioReportError, EduCloudScenarioResultError, EduCloudSecurityMeasureError, EduCloudSecurityPlanError, EduCloudSecuritySimulationError, EduCloudSensitivityAnalysisError, EduCloudSensitivityReportError, EduCloudSensitivityResultError, EduCloudSensitivityVariableError, EduCloudSimulationAIError, EduCloudSimulationAIModelError, EduCloudSimulationAIResultError, EduCloudSimulationAlertError, EduCloudSimulationDashboardError, EduCloudSimulationEventError, EduCloudSimulationHistoryError, EduCloudSimulationMetricsError, EduCloudSimulationParameterError, EduCloudSimulationPresetError, EduCloudSimulationRecommendationError, EduCloudSimulationReportError, EduCloudSimulationSnapshotError, EduCloudSimulationTemplateError, EduCloudSimulationTimelineError, EduCloudTeacherAllocationError, EduCloudTeacherPlanError, EduCloudTeacherSimulationError, EduCloudThreatAssessmentError, EduCloudTransportOptimizationError, EduCloudTransportRouteError, EduCloudTransportSimulationError, EduCloudTransportStopError, EduCloudVisualizationError, EduCloudWasteCategoryError, EduCloudWasteForecastError, EduCloudWasteOptimizationError, EduCloudWasteSimulationError, EduCloudWaterForecastError, EduCloudWaterOptimizationError, EduCloudWaterSimulationError, EduCloudWaterSourceError, EduCloudWidgetError, EduCloudWidgetPositionError, EduCloudWidgetSizeError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface InteropModuleRepository {

  // =============================================================================
  // SIMULATION-EDUCATION
  // =============================================================================
  getCapacityPlan(schoolId: string, id: string): Promise<any | null>;
  listCapacityPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityPlan(schoolId: string, data: any): Promise<any>;
  updateCapacityPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityPlan(schoolId: string, id: string): Promise<void>;

  getCapacityTarget(schoolId: string, id: string): Promise<any | null>;
  listCapacityTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityTarget(schoolId: string, data: any): Promise<any>;
  updateCapacityTarget(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityTarget(schoolId: string, id: string): Promise<void>;

  getCapacitySimulation(schoolId: string, id: string): Promise<any | null>;
  listCapacitySimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacitySimulation(schoolId: string, data: any): Promise<any>;
  updateCapacitySimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacitySimulation(schoolId: string, id: string): Promise<void>;

  getCapacityResult(schoolId: string, id: string): Promise<any | null>;
  listCapacityResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityResult(schoolId: string, data: any): Promise<any>;
  updateCapacityResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityResult(schoolId: string, id: string): Promise<void>;

  getCapacityOptimization(schoolId: string, id: string): Promise<any | null>;
  listCapacityOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCapacityOptimization(schoolId: string, data: any): Promise<any>;
  updateCapacityOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteCapacityOptimization(schoolId: string, id: string): Promise<void>;

  getEnrollmentSimulation(schoolId: string, id: string): Promise<any | null>;
  listEnrollmentSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnrollmentSimulation(schoolId: string, data: any): Promise<any>;
  updateEnrollmentSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnrollmentSimulation(schoolId: string, id: string): Promise<void>;

  getEnrollmentParameter(schoolId: string, id: string): Promise<any | null>;
  listEnrollmentParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnrollmentParameter(schoolId: string, data: any): Promise<any>;
  updateEnrollmentParameter(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnrollmentParameter(schoolId: string, id: string): Promise<void>;

  getEnrollmentProjection(schoolId: string, id: string): Promise<any | null>;
  listEnrollmentProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnrollmentProjection(schoolId: string, data: any): Promise<any>;
  updateEnrollmentProjection(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnrollmentProjection(schoolId: string, id: string): Promise<void>;

  getProjectionFactor(schoolId: string, id: string): Promise<any | null>;
  listProjectionFactor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createProjectionFactor(schoolId: string, data: any): Promise<any>;
  updateProjectionFactor(schoolId: string, id: string, data: any): Promise<any>;
  deleteProjectionFactor(schoolId: string, id: string): Promise<void>;

  getEnrollmentScenario(schoolId: string, id: string): Promise<any | null>;
  listEnrollmentScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnrollmentScenario(schoolId: string, data: any): Promise<any>;
  updateEnrollmentScenario(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnrollmentScenario(schoolId: string, id: string): Promise<void>;

  getEnrollmentDataPoint(schoolId: string, id: string): Promise<any | null>;
  listEnrollmentDataPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnrollmentDataPoint(schoolId: string, data: any): Promise<any>;
  updateEnrollmentDataPoint(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnrollmentDataPoint(schoolId: string, id: string): Promise<void>;

  getTeacherPlan(schoolId: string, id: string): Promise<any | null>;
  listTeacherPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherPlan(schoolId: string, data: any): Promise<any>;
  updateTeacherPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherPlan(schoolId: string, id: string): Promise<void>;

  getAllocationRule(schoolId: string, id: string): Promise<any | null>;
  listAllocationRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAllocationRule(schoolId: string, data: any): Promise<any>;
  updateAllocationRule(schoolId: string, id: string, data: any): Promise<any>;
  deleteAllocationRule(schoolId: string, id: string): Promise<void>;

  getTeacherSimulation(schoolId: string, id: string): Promise<any | null>;
  listTeacherSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherSimulation(schoolId: string, data: any): Promise<any>;
  updateTeacherSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherSimulation(schoolId: string, id: string): Promise<void>;

  getTeacherAllocation(schoolId: string, id: string): Promise<any | null>;
  listTeacherAllocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherAllocation(schoolId: string, data: any): Promise<any>;
  updateTeacherAllocation(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherAllocation(schoolId: string, id: string): Promise<void>;

  getClassAssignment(schoolId: string, id: string): Promise<any | null>;
  listClassAssignment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createClassAssignment(schoolId: string, data: any): Promise<any>;
  updateClassAssignment(schoolId: string, id: string, data: any): Promise<any>;
  deleteClassAssignment(schoolId: string, id: string): Promise<void>;

  getBudgetSimulation(schoolId: string, id: string): Promise<any | null>;
  listBudgetSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBudgetSimulation(schoolId: string, data: any): Promise<any>;
  updateBudgetSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteBudgetSimulation(schoolId: string, id: string): Promise<void>;

  getBudgetAllocation(schoolId: string, id: string): Promise<any | null>;
  listBudgetAllocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBudgetAllocation(schoolId: string, data: any): Promise<any>;
  updateBudgetAllocation(schoolId: string, id: string, data: any): Promise<any>;
  deleteBudgetAllocation(schoolId: string, id: string): Promise<void>;

  getBudgetProjection(schoolId: string, id: string): Promise<any | null>;
  listBudgetProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBudgetProjection(schoolId: string, data: any): Promise<any>;
  updateBudgetProjection(schoolId: string, id: string, data: any): Promise<any>;
  deleteBudgetProjection(schoolId: string, id: string): Promise<void>;

  getBudgetOptimization(schoolId: string, id: string): Promise<any | null>;
  listBudgetOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBudgetOptimization(schoolId: string, data: any): Promise<any>;
  updateBudgetOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteBudgetOptimization(schoolId: string, id: string): Promise<void>;

  getDisasterSimulation(schoolId: string, id: string): Promise<any | null>;
  listDisasterSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDisasterSimulation(schoolId: string, data: any): Promise<any>;
  updateDisasterSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteDisasterSimulation(schoolId: string, id: string): Promise<void>;

  getDisasterParameter(schoolId: string, id: string): Promise<any | null>;
  listDisasterParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDisasterParameter(schoolId: string, data: any): Promise<any>;
  updateDisasterParameter(schoolId: string, id: string, data: any): Promise<any>;
  deleteDisasterParameter(schoolId: string, id: string): Promise<void>;

  getDisasterScenario(schoolId: string, id: string): Promise<any | null>;
  listDisasterScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDisasterScenario(schoolId: string, data: any): Promise<any>;
  updateDisasterScenario(schoolId: string, id: string, data: any): Promise<any>;
  deleteDisasterScenario(schoolId: string, id: string): Promise<void>;

  getDisasterImpact(schoolId: string, id: string): Promise<any | null>;
  listDisasterImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDisasterImpact(schoolId: string, data: any): Promise<any>;
  updateDisasterImpact(schoolId: string, id: string, data: any): Promise<any>;
  deleteDisasterImpact(schoolId: string, id: string): Promise<void>;

  getDisasterRecovery(schoolId: string, id: string): Promise<any | null>;
  listDisasterRecovery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDisasterRecovery(schoolId: string, data: any): Promise<any>;
  updateDisasterRecovery(schoolId: string, id: string, data: any): Promise<any>;
  deleteDisasterRecovery(schoolId: string, id: string): Promise<void>;

  getRecoveryPhase(schoolId: string, id: string): Promise<any | null>;
  listRecoveryPhase(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRecoveryPhase(schoolId: string, data: any): Promise<any>;
  updateRecoveryPhase(schoolId: string, id: string, data: any): Promise<any>;
  deleteRecoveryPhase(schoolId: string, id: string): Promise<void>;

  getEvacuationPlan(schoolId: string, id: string): Promise<any | null>;
  listEvacuationPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEvacuationPlan(schoolId: string, data: any): Promise<any>;
  updateEvacuationPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteEvacuationPlan(schoolId: string, id: string): Promise<void>;

  getEvacuationRouteConfig(schoolId: string, id: string): Promise<any | null>;
  listEvacuationRouteConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEvacuationRouteConfig(schoolId: string, data: any): Promise<any>;
  updateEvacuationRouteConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteEvacuationRouteConfig(schoolId: string, id: string): Promise<void>;

  getAssemblyPoint(schoolId: string, id: string): Promise<any | null>;
  listAssemblyPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAssemblyPoint(schoolId: string, data: any): Promise<any>;
  updateAssemblyPoint(schoolId: string, id: string, data: any): Promise<any>;
  deleteAssemblyPoint(schoolId: string, id: string): Promise<void>;

  getEvacuationSimulation(schoolId: string, id: string): Promise<any | null>;
  listEvacuationSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEvacuationSimulation(schoolId: string, data: any): Promise<any>;
  updateEvacuationSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteEvacuationSimulation(schoolId: string, id: string): Promise<void>;

  getEvacuationMetric(schoolId: string, id: string): Promise<any | null>;
  listEvacuationMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEvacuationMetric(schoolId: string, data: any): Promise<any>;
  updateEvacuationMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteEvacuationMetric(schoolId: string, id: string): Promise<void>;

  getRouteUtilization(schoolId: string, id: string): Promise<any | null>;
  listRouteUtilization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRouteUtilization(schoolId: string, data: any): Promise<any>;
  updateRouteUtilization(schoolId: string, id: string, data: any): Promise<any>;
  deleteRouteUtilization(schoolId: string, id: string): Promise<void>;

  getBottleneck(schoolId: string, id: string): Promise<any | null>;
  listBottleneck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBottleneck(schoolId: string, data: any): Promise<any>;
  updateBottleneck(schoolId: string, id: string, data: any): Promise<any>;
  deleteBottleneck(schoolId: string, id: string): Promise<void>;

  getEvacuationRoute(schoolId: string, id: string): Promise<any | null>;
  listEvacuationRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEvacuationRoute(schoolId: string, data: any): Promise<any>;
  updateEvacuationRoute(schoolId: string, id: string, data: any): Promise<any>;
  deleteEvacuationRoute(schoolId: string, id: string): Promise<void>;

  getInfrastructureSimulation(schoolId: string, id: string): Promise<any | null>;
  listInfrastructureSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructureSimulation(schoolId: string, data: any): Promise<any>;
  updateInfrastructureSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructureSimulation(schoolId: string, id: string): Promise<void>;

  getInfrastructureAsset(schoolId: string, id: string): Promise<any | null>;
  listInfrastructureAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructureAsset(schoolId: string, data: any): Promise<any>;
  updateInfrastructureAsset(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructureAsset(schoolId: string, id: string): Promise<void>;

  getInfrastructureAssessment(schoolId: string, id: string): Promise<any | null>;
  listInfrastructureAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructureAssessment(schoolId: string, data: any): Promise<any>;
  updateInfrastructureAssessment(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructureAssessment(schoolId: string, id: string): Promise<void>;

  getInfrastructurePlan(schoolId: string, id: string): Promise<any | null>;
  listInfrastructurePlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructurePlan(schoolId: string, data: any): Promise<any>;
  updateInfrastructurePlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructurePlan(schoolId: string, id: string): Promise<void>;

  getInfrastructureProject(schoolId: string, id: string): Promise<any | null>;
  listInfrastructureProject(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createInfrastructureProject(schoolId: string, data: any): Promise<any>;
  updateInfrastructureProject(schoolId: string, id: string, data: any): Promise<any>;
  deleteInfrastructureProject(schoolId: string, id: string): Promise<void>;

  getEnergySimulation(schoolId: string, id: string): Promise<any | null>;
  listEnergySimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnergySimulation(schoolId: string, data: any): Promise<any>;
  updateEnergySimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnergySimulation(schoolId: string, id: string): Promise<void>;

  getEnergySourceConfig(schoolId: string, id: string): Promise<any | null>;
  listEnergySourceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnergySourceConfig(schoolId: string, data: any): Promise<any>;
  updateEnergySourceConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnergySourceConfig(schoolId: string, id: string): Promise<void>;

  getEnergyForecast(schoolId: string, id: string): Promise<any | null>;
  listEnergyForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnergyForecast(schoolId: string, data: any): Promise<any>;
  updateEnergyForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnergyForecast(schoolId: string, id: string): Promise<void>;

  getEnergyOptimization(schoolId: string, id: string): Promise<any | null>;
  listEnergyOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnergyOptimization(schoolId: string, data: any): Promise<any>;
  updateEnergyOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnergyOptimization(schoolId: string, id: string): Promise<void>;

  getWaterSimulation(schoolId: string, id: string): Promise<any | null>;
  listWaterSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterSimulation(schoolId: string, data: any): Promise<any>;
  updateWaterSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterSimulation(schoolId: string, id: string): Promise<void>;

  getWaterSourceConfig(schoolId: string, id: string): Promise<any | null>;
  listWaterSourceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterSourceConfig(schoolId: string, data: any): Promise<any>;
  updateWaterSourceConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterSourceConfig(schoolId: string, id: string): Promise<void>;

  getWaterForecast(schoolId: string, id: string): Promise<any | null>;
  listWaterForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterForecast(schoolId: string, data: any): Promise<any>;
  updateWaterForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterForecast(schoolId: string, id: string): Promise<void>;

  getWaterOptimization(schoolId: string, id: string): Promise<any | null>;
  listWaterOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterOptimization(schoolId: string, data: any): Promise<any>;
  updateWaterOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterOptimization(schoolId: string, id: string): Promise<void>;

  getWasteSimulation(schoolId: string, id: string): Promise<any | null>;
  listWasteSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWasteSimulation(schoolId: string, data: any): Promise<any>;
  updateWasteSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteWasteSimulation(schoolId: string, id: string): Promise<void>;

  getWasteCategory(schoolId: string, id: string): Promise<any | null>;
  listWasteCategory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWasteCategory(schoolId: string, data: any): Promise<any>;
  updateWasteCategory(schoolId: string, id: string, data: any): Promise<any>;
  deleteWasteCategory(schoolId: string, id: string): Promise<void>;

  getWasteForecast(schoolId: string, id: string): Promise<any | null>;
  listWasteForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWasteForecast(schoolId: string, data: any): Promise<any>;
  updateWasteForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteWasteForecast(schoolId: string, id: string): Promise<void>;

  getWasteOptimization(schoolId: string, id: string): Promise<any | null>;
  listWasteOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWasteOptimization(schoolId: string, data: any): Promise<any>;
  updateWasteOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteWasteOptimization(schoolId: string, id: string): Promise<void>;

  getSecuritySimulation(schoolId: string, id: string): Promise<any | null>;
  listSecuritySimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecuritySimulation(schoolId: string, data: any): Promise<any>;
  updateSecuritySimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecuritySimulation(schoolId: string, id: string): Promise<void>;

  getThreatAssessment(schoolId: string, id: string): Promise<any | null>;
  listThreatAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createThreatAssessment(schoolId: string, data: any): Promise<any>;
  updateThreatAssessment(schoolId: string, id: string, data: any): Promise<any>;
  deleteThreatAssessment(schoolId: string, id: string): Promise<void>;

  getSecurityPlan(schoolId: string, id: string): Promise<any | null>;
  listSecurityPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecurityPlan(schoolId: string, data: any): Promise<any>;
  updateSecurityPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecurityPlan(schoolId: string, id: string): Promise<void>;

  getSecurityMeasure(schoolId: string, id: string): Promise<any | null>;
  listSecurityMeasure(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSecurityMeasure(schoolId: string, data: any): Promise<any>;
  updateSecurityMeasure(schoolId: string, id: string, data: any): Promise<any>;
  deleteSecurityMeasure(schoolId: string, id: string): Promise<void>;

  getTransportSimulation(schoolId: string, id: string): Promise<any | null>;
  listTransportSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTransportSimulation(schoolId: string, data: any): Promise<any>;
  updateTransportSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteTransportSimulation(schoolId: string, id: string): Promise<void>;

  getTransportRouteConfig(schoolId: string, id: string): Promise<any | null>;
  listTransportRouteConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTransportRouteConfig(schoolId: string, data: any): Promise<any>;
  updateTransportRouteConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTransportRouteConfig(schoolId: string, id: string): Promise<void>;

  getTransportOptimization(schoolId: string, id: string): Promise<any | null>;
  listTransportOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTransportOptimization(schoolId: string, data: any): Promise<any>;
  updateTransportOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteTransportOptimization(schoolId: string, id: string): Promise<void>;

  getTransportRoute(schoolId: string, id: string): Promise<any | null>;
  listTransportRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTransportRoute(schoolId: string, data: any): Promise<any>;
  updateTransportRoute(schoolId: string, id: string, data: any): Promise<any>;
  deleteTransportRoute(schoolId: string, id: string): Promise<void>;

  getTransportStop(schoolId: string, id: string): Promise<any | null>;
  listTransportStop(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTransportStop(schoolId: string, data: any): Promise<any>;
  updateTransportStop(schoolId: string, id: string, data: any): Promise<any>;
  deleteTransportStop(schoolId: string, id: string): Promise<void>;

  getGrowthSimulation(schoolId: string, id: string): Promise<any | null>;
  listGrowthSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGrowthSimulation(schoolId: string, data: any): Promise<any>;
  updateGrowthSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGrowthSimulation(schoolId: string, id: string): Promise<void>;

  getGrowthProjectionResult(schoolId: string, id: string): Promise<any | null>;
  listGrowthProjectionResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGrowthProjectionResult(schoolId: string, data: any): Promise<any>;
  updateGrowthProjectionResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteGrowthProjectionResult(schoolId: string, id: string): Promise<void>;

  getGrowthFactor(schoolId: string, id: string): Promise<any | null>;
  listGrowthFactor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGrowthFactor(schoolId: string, data: any): Promise<any>;
  updateGrowthFactor(schoolId: string, id: string, data: any): Promise<any>;
  deleteGrowthFactor(schoolId: string, id: string): Promise<void>;

  getGrowthScenario(schoolId: string, id: string): Promise<any | null>;
  listGrowthScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGrowthScenario(schoolId: string, data: any): Promise<any>;
  updateGrowthScenario(schoolId: string, id: string, data: any): Promise<any>;
  deleteGrowthScenario(schoolId: string, id: string): Promise<void>;

  getAcademicSimulation(schoolId: string, id: string): Promise<any | null>;
  listAcademicSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAcademicSimulation(schoolId: string, data: any): Promise<any>;
  updateAcademicSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteAcademicSimulation(schoolId: string, id: string): Promise<void>;

  getAcademicProjection(schoolId: string, id: string): Promise<any | null>;
  listAcademicProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAcademicProjection(schoolId: string, data: any): Promise<any>;
  updateAcademicProjection(schoolId: string, id: string, data: any): Promise<any>;
  deleteAcademicProjection(schoolId: string, id: string): Promise<void>;

  getAcademicOptimization(schoolId: string, id: string): Promise<any | null>;
  listAcademicOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAcademicOptimization(schoolId: string, data: any): Promise<any>;
  updateAcademicOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteAcademicOptimization(schoolId: string, id: string): Promise<void>;

  getAcademicMetrics(schoolId: string, id: string): Promise<any | null>;
  listAcademicMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAcademicMetrics(schoolId: string, data: any): Promise<any>;
  updateAcademicMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteAcademicMetrics(schoolId: string, id: string): Promise<void>;

  getImprovementArea(schoolId: string, id: string): Promise<any | null>;
  listImprovementArea(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createImprovementArea(schoolId: string, data: any): Promise<any>;
  updateImprovementArea(schoolId: string, id: string, data: any): Promise<any>;
  deleteImprovementArea(schoolId: string, id: string): Promise<void>;

  getFinancialSimulation(schoolId: string, id: string): Promise<any | null>;
  listFinancialSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFinancialSimulation(schoolId: string, data: any): Promise<any>;
  updateFinancialSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteFinancialSimulation(schoolId: string, id: string): Promise<void>;

  getFinancialProjection(schoolId: string, id: string): Promise<any | null>;
  listFinancialProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFinancialProjection(schoolId: string, data: any): Promise<any>;
  updateFinancialProjection(schoolId: string, id: string, data: any): Promise<any>;
  deleteFinancialProjection(schoolId: string, id: string): Promise<void>;

  getFinancialOptimization(schoolId: string, id: string): Promise<any | null>;
  listFinancialOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFinancialOptimization(schoolId: string, data: any): Promise<any>;
  updateFinancialOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteFinancialOptimization(schoolId: string, id: string): Promise<void>;

  getFinancialState(schoolId: string, id: string): Promise<any | null>;
  listFinancialState(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFinancialState(schoolId: string, data: any): Promise<any>;
  updateFinancialState(schoolId: string, id: string, data: any): Promise<any>;
  deleteFinancialState(schoolId: string, id: string): Promise<void>;

  getOperationalSimulation(schoolId: string, id: string): Promise<any | null>;
  listOperationalSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOperationalSimulation(schoolId: string, data: any): Promise<any>;
  updateOperationalSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteOperationalSimulation(schoolId: string, id: string): Promise<void>;

  getOperationalProjection(schoolId: string, id: string): Promise<any | null>;
  listOperationalProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOperationalProjection(schoolId: string, data: any): Promise<any>;
  updateOperationalProjection(schoolId: string, id: string, data: any): Promise<any>;
  deleteOperationalProjection(schoolId: string, id: string): Promise<void>;

  getOperationalOptimization(schoolId: string, id: string): Promise<any | null>;
  listOperationalOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOperationalOptimization(schoolId: string, data: any): Promise<any>;
  updateOperationalOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteOperationalOptimization(schoolId: string, id: string): Promise<void>;

  getOperationalMetrics(schoolId: string, id: string): Promise<any | null>;
  listOperationalMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOperationalMetrics(schoolId: string, data: any): Promise<any>;
  updateOperationalMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteOperationalMetrics(schoolId: string, id: string): Promise<void>;

  getProcessImprovement(schoolId: string, id: string): Promise<any | null>;
  listProcessImprovement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createProcessImprovement(schoolId: string, data: any): Promise<any>;
  updateProcessImprovement(schoolId: string, id: string, data: any): Promise<any>;
  deleteProcessImprovement(schoolId: string, id: string): Promise<void>;

  getEnvironmentalSimulation(schoolId: string, id: string): Promise<any | null>;
  listEnvironmentalSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnvironmentalSimulation(schoolId: string, data: any): Promise<any>;
  updateEnvironmentalSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnvironmentalSimulation(schoolId: string, id: string): Promise<void>;

  getEnvironmentalImpactResult(schoolId: string, id: string): Promise<any | null>;
  listEnvironmentalImpactResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnvironmentalImpactResult(schoolId: string, data: any): Promise<any>;
  updateEnvironmentalImpactResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnvironmentalImpactResult(schoolId: string, id: string): Promise<void>;

  getEnvironmentalForecast(schoolId: string, id: string): Promise<any | null>;
  listEnvironmentalForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnvironmentalForecast(schoolId: string, data: any): Promise<any>;
  updateEnvironmentalForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnvironmentalForecast(schoolId: string, id: string): Promise<void>;

  getEnvironmentalOptimization(schoolId: string, id: string): Promise<any | null>;
  listEnvironmentalOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnvironmentalOptimization(schoolId: string, data: any): Promise<any>;
  updateEnvironmentalOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnvironmentalOptimization(schoolId: string, id: string): Promise<void>;

  getSafetySimulation(schoolId: string, id: string): Promise<any | null>;
  listSafetySimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSafetySimulation(schoolId: string, data: any): Promise<any>;
  updateSafetySimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteSafetySimulation(schoolId: string, id: string): Promise<void>;

  getSafetyAssessment(schoolId: string, id: string): Promise<any | null>;
  listSafetyAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSafetyAssessment(schoolId: string, data: any): Promise<any>;
  updateSafetyAssessment(schoolId: string, id: string, data: any): Promise<any>;
  deleteSafetyAssessment(schoolId: string, id: string): Promise<void>;

  getHazard(schoolId: string, id: string): Promise<any | null>;
  listHazard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createHazard(schoolId: string, data: any): Promise<any>;
  updateHazard(schoolId: string, id: string, data: any): Promise<any>;
  deleteHazard(schoolId: string, id: string): Promise<void>;

  getSafetyPlan(schoolId: string, id: string): Promise<any | null>;
  listSafetyPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSafetyPlan(schoolId: string, data: any): Promise<any>;
  updateSafetyPlan(schoolId: string, id: string, data: any): Promise<any>;
  deleteSafetyPlan(schoolId: string, id: string): Promise<void>;

  getSafetyMeasure(schoolId: string, id: string): Promise<any | null>;
  listSafetyMeasure(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSafetyMeasure(schoolId: string, data: any): Promise<any>;
  updateSafetyMeasure(schoolId: string, id: string, data: any): Promise<any>;
  deleteSafetyMeasure(schoolId: string, id: string): Promise<void>;

  getMaintenanceSimulation(schoolId: string, id: string): Promise<any | null>;
  listMaintenanceSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMaintenanceSimulation(schoolId: string, data: any): Promise<any>;
  updateMaintenanceSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteMaintenanceSimulation(schoolId: string, id: string): Promise<void>;

  getMaintenanceAsset(schoolId: string, id: string): Promise<any | null>;
  listMaintenanceAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMaintenanceAsset(schoolId: string, data: any): Promise<any>;
  updateMaintenanceAsset(schoolId: string, id: string, data: any): Promise<any>;
  deleteMaintenanceAsset(schoolId: string, id: string): Promise<void>;

  getMaintenanceSchedule(schoolId: string, id: string): Promise<any | null>;
  listMaintenanceSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMaintenanceSchedule(schoolId: string, data: any): Promise<any>;
  updateMaintenanceSchedule(schoolId: string, id: string, data: any): Promise<any>;
  deleteMaintenanceSchedule(schoolId: string, id: string): Promise<void>;

  getMaintenanceTask(schoolId: string, id: string): Promise<any | null>;
  listMaintenanceTask(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMaintenanceTask(schoolId: string, data: any): Promise<any>;
  updateMaintenanceTask(schoolId: string, id: string, data: any): Promise<any>;
  deleteMaintenanceTask(schoolId: string, id: string): Promise<void>;

  getMaintenanceOptimization(schoolId: string, id: string): Promise<any | null>;
  listMaintenanceOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMaintenanceOptimization(schoolId: string, data: any): Promise<any>;
  updateMaintenanceOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteMaintenanceOptimization(schoolId: string, id: string): Promise<void>;

  getResourceAllocation(schoolId: string, id: string): Promise<any | null>;
  listResourceAllocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResourceAllocation(schoolId: string, data: any): Promise<any>;
  updateResourceAllocation(schoolId: string, id: string, data: any): Promise<any>;
  deleteResourceAllocation(schoolId: string, id: string): Promise<void>;

  getResourceConstraint(schoolId: string, id: string): Promise<any | null>;
  listResourceConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResourceConstraint(schoolId: string, data: any): Promise<any>;
  updateResourceConstraint(schoolId: string, id: string, data: any): Promise<any>;
  deleteResourceConstraint(schoolId: string, id: string): Promise<void>;

  getResourceOptimization(schoolId: string, id: string): Promise<any | null>;
  listResourceOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResourceOptimization(schoolId: string, data: any): Promise<any>;
  updateResourceOptimization(schoolId: string, id: string, data: any): Promise<any>;
  deleteResourceOptimization(schoolId: string, id: string): Promise<void>;

  getSensitivityAnalysis(schoolId: string, id: string): Promise<any | null>;
  listSensitivityAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSensitivityAnalysis(schoolId: string, data: any): Promise<any>;
  updateSensitivityAnalysis(schoolId: string, id: string, data: any): Promise<any>;
  deleteSensitivityAnalysis(schoolId: string, id: string): Promise<void>;

  getSensitivityVariable(schoolId: string, id: string): Promise<any | null>;
  listSensitivityVariable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSensitivityVariable(schoolId: string, data: any): Promise<any>;
  updateSensitivityVariable(schoolId: string, id: string, data: any): Promise<any>;
  deleteSensitivityVariable(schoolId: string, id: string): Promise<void>;

  getSensitivityResult(schoolId: string, id: string): Promise<any | null>;
  listSensitivityResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSensitivityResult(schoolId: string, data: any): Promise<any>;
  updateSensitivityResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteSensitivityResult(schoolId: string, id: string): Promise<void>;

  getDataPoint(schoolId: string, id: string): Promise<any | null>;
  listDataPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDataPoint(schoolId: string, data: any): Promise<any>;
  updateDataPoint(schoolId: string, id: string, data: any): Promise<any>;
  deleteDataPoint(schoolId: string, id: string): Promise<void>;

  getSensitivityReport(schoolId: string, id: string): Promise<any | null>;
  listSensitivityReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSensitivityReport(schoolId: string, data: any): Promise<any>;
  updateSensitivityReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteSensitivityReport(schoolId: string, id: string): Promise<void>;

  getScenarioComparison(schoolId: string, id: string): Promise<any | null>;
  listScenarioComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScenarioComparison(schoolId: string, data: any): Promise<any>;
  updateScenarioComparison(schoolId: string, id: string, data: any): Promise<any>;
  deleteScenarioComparison(schoolId: string, id: string): Promise<void>;

  getScenarioData(schoolId: string, id: string): Promise<any | null>;
  listScenarioData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScenarioData(schoolId: string, data: any): Promise<any>;
  updateScenarioData(schoolId: string, id: string, data: any): Promise<any>;
  deleteScenarioData(schoolId: string, id: string): Promise<void>;

  getScenarioResult(schoolId: string, id: string): Promise<any | null>;
  listScenarioResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScenarioResult(schoolId: string, data: any): Promise<any>;
  updateScenarioResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteScenarioResult(schoolId: string, id: string): Promise<void>;

  getComparisonMetric(schoolId: string, id: string): Promise<any | null>;
  listComparisonMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComparisonMetric(schoolId: string, data: any): Promise<any>;
  updateComparisonMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteComparisonMetric(schoolId: string, id: string): Promise<void>;

  getScenarioReport(schoolId: string, id: string): Promise<any | null>;
  listScenarioReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScenarioReport(schoolId: string, data: any): Promise<any>;
  updateScenarioReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteScenarioReport(schoolId: string, id: string): Promise<void>;

  getScenarioRanking(schoolId: string, id: string): Promise<any | null>;
  listScenarioRanking(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScenarioRanking(schoolId: string, data: any): Promise<any>;
  updateScenarioRanking(schoolId: string, id: string, data: any): Promise<any>;
  deleteScenarioRanking(schoolId: string, id: string): Promise<void>;

  getScenarioRecommendation(schoolId: string, id: string): Promise<any | null>;
  listScenarioRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createScenarioRecommendation(schoolId: string, data: any): Promise<any>;
  updateScenarioRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteScenarioRecommendation(schoolId: string, id: string): Promise<void>;

  getSimulationDashboard(schoolId: string, id: string): Promise<any | null>;
  listSimulationDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationDashboard(schoolId: string, data: any): Promise<any>;
  updateSimulationDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationDashboard(schoolId: string, id: string): Promise<void>;

  getDashboardWidget(schoolId: string, id: string): Promise<any | null>;
  listDashboardWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDashboardWidget(schoolId: string, data: any): Promise<any>;
  updateDashboardWidget(schoolId: string, id: string, data: any): Promise<any>;
  deleteDashboardWidget(schoolId: string, id: string): Promise<void>;

  getWidgetConfig(schoolId: string, id: string): Promise<any | null>;
  listWidgetConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWidgetConfig(schoolId: string, data: any): Promise<any>;
  updateWidgetConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteWidgetConfig(schoolId: string, id: string): Promise<void>;

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

  getSimulationReport(schoolId: string, id: string): Promise<any | null>;
  listSimulationReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationReport(schoolId: string, data: any): Promise<any>;
  updateSimulationReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationReport(schoolId: string, id: string): Promise<void>;

  getReportSection(schoolId: string, id: string): Promise<any | null>;
  listReportSection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReportSection(schoolId: string, data: any): Promise<any>;
  updateReportSection(schoolId: string, id: string, data: any): Promise<any>;
  deleteReportSection(schoolId: string, id: string): Promise<void>;

  getReportTable(schoolId: string, id: string): Promise<any | null>;
  listReportTable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createReportTable(schoolId: string, data: any): Promise<any>;
  updateReportTable(schoolId: string, id: string, data: any): Promise<any>;
  deleteReportTable(schoolId: string, id: string): Promise<void>;

  getVisualizationConfig(schoolId: string, id: string): Promise<any | null>;
  listVisualizationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVisualizationConfig(schoolId: string, data: any): Promise<any>;
  updateVisualizationConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteVisualizationConfig(schoolId: string, id: string): Promise<void>;

  getSimulationAlert(schoolId: string, id: string): Promise<any | null>;
  listSimulationAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationAlert(schoolId: string, data: any): Promise<any>;
  updateSimulationAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationAlert(schoolId: string, id: string): Promise<void>;

  getSimulationAI(schoolId: string, id: string): Promise<any | null>;
  listSimulationAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationAI(schoolId: string, data: any): Promise<any>;
  updateSimulationAI(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationAI(schoolId: string, id: string): Promise<void>;

  getSimulationAIModel(schoolId: string, id: string): Promise<any | null>;
  listSimulationAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationAIModel(schoolId: string, data: any): Promise<any>;
  updateSimulationAIModel(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationAIModel(schoolId: string, id: string): Promise<void>;

  getSimulationAIResult(schoolId: string, id: string): Promise<any | null>;
  listSimulationAIResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationAIResult(schoolId: string, data: any): Promise<any>;
  updateSimulationAIResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationAIResult(schoolId: string, id: string): Promise<void>;

  getAIPredictionFactor(schoolId: string, id: string): Promise<any | null>;
  listAIPredictionFactor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAIPredictionFactor(schoolId: string, data: any): Promise<any>;
  updateAIPredictionFactor(schoolId: string, id: string, data: any): Promise<any>;
  deleteAIPredictionFactor(schoolId: string, id: string): Promise<void>;

  getSimulationEvent(schoolId: string, id: string): Promise<any | null>;
  listSimulationEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationEvent(schoolId: string, data: any): Promise<any>;
  updateSimulationEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationEvent(schoolId: string, id: string): Promise<void>;

  getSimulationTimeline(schoolId: string, id: string): Promise<any | null>;
  listSimulationTimeline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationTimeline(schoolId: string, data: any): Promise<any>;
  updateSimulationTimeline(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationTimeline(schoolId: string, id: string): Promise<void>;

  getSimulationSnapshot(schoolId: string, id: string): Promise<any | null>;
  listSimulationSnapshot(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationSnapshot(schoolId: string, data: any): Promise<any>;
  updateSimulationSnapshot(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationSnapshot(schoolId: string, id: string): Promise<void>;

  getSimulationMetrics(schoolId: string, id: string): Promise<any | null>;
  listSimulationMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationMetrics(schoolId: string, data: any): Promise<any>;
  updateSimulationMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationMetrics(schoolId: string, id: string): Promise<void>;

  getSimulationTemplate(schoolId: string, id: string): Promise<any | null>;
  listSimulationTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationTemplate(schoolId: string, data: any): Promise<any>;
  updateSimulationTemplate(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationTemplate(schoolId: string, id: string): Promise<void>;

  getSimulationPreset(schoolId: string, id: string): Promise<any | null>;
  listSimulationPreset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationPreset(schoolId: string, data: any): Promise<any>;
  updateSimulationPreset(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationPreset(schoolId: string, id: string): Promise<void>;

  getSimulationHistory(schoolId: string, id: string): Promise<any | null>;
  listSimulationHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationHistory(schoolId: string, data: any): Promise<any>;
  updateSimulationHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationHistory(schoolId: string, id: string): Promise<void>;

  getSimulationParameter(schoolId: string, id: string): Promise<any | null>;
  listSimulationParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationParameter(schoolId: string, data: any): Promise<any>;
  updateSimulationParameter(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationParameter(schoolId: string, id: string): Promise<void>;

  getSimulationRecommendation(schoolId: string, id: string): Promise<any | null>;
  listSimulationRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationRecommendation(schoolId: string, data: any): Promise<any>;
  updateSimulationRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationRecommendation(schoolId: string, id: string): Promise<void>;

  getOptimizationResult(schoolId: string, id: string): Promise<any | null>;
  listOptimizationResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createOptimizationResult(schoolId: string, data: any): Promise<any>;
  updateOptimizationResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteOptimizationResult(schoolId: string, id: string): Promise<void>;

  getGeoLocation(schoolId: string, id: string): Promise<any | null>;
  listGeoLocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoLocation(schoolId: string, data: any): Promise<any>;
  updateGeoLocation(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoLocation(schoolId: string, id: string): Promise<void>;

  getGeoPoint(schoolId: string, id: string): Promise<any | null>;
  listGeoPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGeoPoint(schoolId: string, data: any): Promise<any>;
  updateGeoPoint(schoolId: string, id: string, data: any): Promise<any>;
  deleteGeoPoint(schoolId: string, id: string): Promise<void>;

}

class InteropModuleRepositoryImpl implements InteropModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // SIMULATION-EDUCATION
  // =============================================================================
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

  async getCapacityTarget(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_targets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityTarget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_targets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityTargetError(error.message);
    return data ?? [];
  }

  async createCapacityTarget(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_targets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityTargetError(error.message);
    return result;
  }

  async updateCapacityTarget(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_targets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityTargetError(error.message);
    return result;
  }

  async deleteCapacityTarget(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_targets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityTargetError(error.message);
  }

  async getCapacitySimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacitySimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacitySimulationError(error.message);
    return data ?? [];
  }

  async createCapacitySimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacitySimulationError(error.message);
    return result;
  }

  async updateCapacitySimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacitySimulationError(error.message);
    return result;
  }

  async deleteCapacitySimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacitySimulationError(error.message);
  }

  async getCapacityResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityResultError(error.message);
    return data ?? [];
  }

  async createCapacityResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityResultError(error.message);
    return result;
  }

  async updateCapacityResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityResultError(error.message);
    return result;
  }

  async deleteCapacityResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityResultError(error.message);
  }

  async getCapacityOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('capacity_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCapacityOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('capacity_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCapacityOptimizationError(error.message);
    return data ?? [];
  }

  async createCapacityOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('capacity_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCapacityOptimizationError(error.message);
    return result;
  }

  async updateCapacityOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('capacity_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCapacityOptimizationError(error.message);
    return result;
  }

  async deleteCapacityOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('capacity_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCapacityOptimizationError(error.message);
  }

  async getEnrollmentSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('enrollment_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnrollmentSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('enrollment_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnrollmentSimulationError(error.message);
    return data ?? [];
  }

  async createEnrollmentSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('enrollment_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentSimulationError(error.message);
    return result;
  }

  async updateEnrollmentSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('enrollment_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentSimulationError(error.message);
    return result;
  }

  async deleteEnrollmentSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('enrollment_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnrollmentSimulationError(error.message);
  }

  async getEnrollmentParameter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('enrollment_parameters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnrollmentParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('enrollment_parameters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnrollmentParameterError(error.message);
    return data ?? [];
  }

  async createEnrollmentParameter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('enrollment_parameters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentParameterError(error.message);
    return result;
  }

  async updateEnrollmentParameter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('enrollment_parameters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentParameterError(error.message);
    return result;
  }

  async deleteEnrollmentParameter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('enrollment_parameters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnrollmentParameterError(error.message);
  }

  async getEnrollmentProjection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('enrollment_projectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnrollmentProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('enrollment_projectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnrollmentProjectionError(error.message);
    return data ?? [];
  }

  async createEnrollmentProjection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('enrollment_projectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentProjectionError(error.message);
    return result;
  }

  async updateEnrollmentProjection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('enrollment_projectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentProjectionError(error.message);
    return result;
  }

  async deleteEnrollmentProjection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('enrollment_projectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnrollmentProjectionError(error.message);
  }

  async getProjectionFactor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('projection_factors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listProjectionFactor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('projection_factors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudProjectionFactorError(error.message);
    return data ?? [];
  }

  async createProjectionFactor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('projection_factors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudProjectionFactorError(error.message);
    return result;
  }

  async updateProjectionFactor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('projection_factors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudProjectionFactorError(error.message);
    return result;
  }

  async deleteProjectionFactor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('projection_factors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudProjectionFactorError(error.message);
  }

  async getEnrollmentScenario(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('enrollment_scenarios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnrollmentScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('enrollment_scenarios').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnrollmentScenarioError(error.message);
    return data ?? [];
  }

  async createEnrollmentScenario(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('enrollment_scenarios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentScenarioError(error.message);
    return result;
  }

  async updateEnrollmentScenario(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('enrollment_scenarios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentScenarioError(error.message);
    return result;
  }

  async deleteEnrollmentScenario(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('enrollment_scenarios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnrollmentScenarioError(error.message);
  }

  async getEnrollmentDataPoint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('enrollment_data_points')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnrollmentDataPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('enrollment_data_points').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnrollmentDataPointError(error.message);
    return data ?? [];
  }

  async createEnrollmentDataPoint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('enrollment_data_points')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentDataPointError(error.message);
    return result;
  }

  async updateEnrollmentDataPoint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('enrollment_data_points')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnrollmentDataPointError(error.message);
    return result;
  }

  async deleteEnrollmentDataPoint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('enrollment_data_points')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnrollmentDataPointError(error.message);
  }

  async getTeacherPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherPlanError(error.message);
    return data ?? [];
  }

  async createTeacherPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherPlanError(error.message);
    return result;
  }

  async updateTeacherPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherPlanError(error.message);
    return result;
  }

  async deleteTeacherPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherPlanError(error.message);
  }

  async getAllocationRule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('allocation_rules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAllocationRule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('allocation_rules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAllocationRuleError(error.message);
    return data ?? [];
  }

  async createAllocationRule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('allocation_rules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAllocationRuleError(error.message);
    return result;
  }

  async updateAllocationRule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('allocation_rules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAllocationRuleError(error.message);
    return result;
  }

  async deleteAllocationRule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('allocation_rules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAllocationRuleError(error.message);
  }

  async getTeacherSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherSimulationError(error.message);
    return data ?? [];
  }

  async createTeacherSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherSimulationError(error.message);
    return result;
  }

  async updateTeacherSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherSimulationError(error.message);
    return result;
  }

  async deleteTeacherSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherSimulationError(error.message);
  }

  async getTeacherAllocation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_allocatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherAllocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_allocatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherAllocationError(error.message);
    return data ?? [];
  }

  async createTeacherAllocation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_allocatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherAllocationError(error.message);
    return result;
  }

  async updateTeacherAllocation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_allocatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherAllocationError(error.message);
    return result;
  }

  async deleteTeacherAllocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_allocatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherAllocationError(error.message);
  }

  async getClassAssignment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('class_assignments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listClassAssignment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('class_assignments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudClassAssignmentError(error.message);
    return data ?? [];
  }

  async createClassAssignment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('class_assignments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudClassAssignmentError(error.message);
    return result;
  }

  async updateClassAssignment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('class_assignments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudClassAssignmentError(error.message);
    return result;
  }

  async deleteClassAssignment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('class_assignments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudClassAssignmentError(error.message);
  }

  async getBudgetSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('budget_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBudgetSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('budget_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBudgetSimulationError(error.message);
    return data ?? [];
  }

  async createBudgetSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('budget_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBudgetSimulationError(error.message);
    return result;
  }

  async updateBudgetSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('budget_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBudgetSimulationError(error.message);
    return result;
  }

  async deleteBudgetSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('budget_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBudgetSimulationError(error.message);
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

  async getBudgetProjection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('budget_projectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBudgetProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('budget_projectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBudgetProjectionError(error.message);
    return data ?? [];
  }

  async createBudgetProjection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('budget_projectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBudgetProjectionError(error.message);
    return result;
  }

  async updateBudgetProjection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('budget_projectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBudgetProjectionError(error.message);
    return result;
  }

  async deleteBudgetProjection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('budget_projectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBudgetProjectionError(error.message);
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

  async getDisasterSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('disaster_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDisasterSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('disaster_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDisasterSimulationError(error.message);
    return data ?? [];
  }

  async createDisasterSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('disaster_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDisasterSimulationError(error.message);
    return result;
  }

  async updateDisasterSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('disaster_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDisasterSimulationError(error.message);
    return result;
  }

  async deleteDisasterSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('disaster_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDisasterSimulationError(error.message);
  }

  async getDisasterParameter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('disaster_parameters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDisasterParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('disaster_parameters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDisasterParameterError(error.message);
    return data ?? [];
  }

  async createDisasterParameter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('disaster_parameters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDisasterParameterError(error.message);
    return result;
  }

  async updateDisasterParameter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('disaster_parameters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDisasterParameterError(error.message);
    return result;
  }

  async deleteDisasterParameter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('disaster_parameters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDisasterParameterError(error.message);
  }

  async getDisasterScenario(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('disaster_scenarios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDisasterScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('disaster_scenarios').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDisasterScenarioError(error.message);
    return data ?? [];
  }

  async createDisasterScenario(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('disaster_scenarios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDisasterScenarioError(error.message);
    return result;
  }

  async updateDisasterScenario(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('disaster_scenarios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDisasterScenarioError(error.message);
    return result;
  }

  async deleteDisasterScenario(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('disaster_scenarios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDisasterScenarioError(error.message);
  }

  async getDisasterImpact(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('disaster_impacts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDisasterImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('disaster_impacts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDisasterImpactError(error.message);
    return data ?? [];
  }

  async createDisasterImpact(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('disaster_impacts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDisasterImpactError(error.message);
    return result;
  }

  async updateDisasterImpact(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('disaster_impacts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDisasterImpactError(error.message);
    return result;
  }

  async deleteDisasterImpact(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('disaster_impacts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDisasterImpactError(error.message);
  }

  async getDisasterRecovery(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('disaster_recoverys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDisasterRecovery(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('disaster_recoverys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDisasterRecoveryError(error.message);
    return data ?? [];
  }

  async createDisasterRecovery(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('disaster_recoverys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryError(error.message);
    return result;
  }

  async updateDisasterRecovery(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('disaster_recoverys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDisasterRecoveryError(error.message);
    return result;
  }

  async deleteDisasterRecovery(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('disaster_recoverys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDisasterRecoveryError(error.message);
  }

  async getRecoveryPhase(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('recovery_phases')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRecoveryPhase(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('recovery_phases').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRecoveryPhaseError(error.message);
    return data ?? [];
  }

  async createRecoveryPhase(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('recovery_phases')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRecoveryPhaseError(error.message);
    return result;
  }

  async updateRecoveryPhase(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('recovery_phases')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRecoveryPhaseError(error.message);
    return result;
  }

  async deleteRecoveryPhase(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recovery_phases')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRecoveryPhaseError(error.message);
  }

  async getEvacuationPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('evacuation_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEvacuationPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('evacuation_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEvacuationPlanError(error.message);
    return data ?? [];
  }

  async createEvacuationPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('evacuation_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEvacuationPlanError(error.message);
    return result;
  }

  async updateEvacuationPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('evacuation_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEvacuationPlanError(error.message);
    return result;
  }

  async deleteEvacuationPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('evacuation_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEvacuationPlanError(error.message);
  }

  async getEvacuationRouteConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('evacuation_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEvacuationRouteConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('evacuation_routes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEvacuationRouteError(error.message);
    return data ?? [];
  }

  async createEvacuationRouteConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('evacuation_routes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEvacuationRouteError(error.message);
    return result;
  }

  async updateEvacuationRouteConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('evacuation_routes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEvacuationRouteError(error.message);
    return result;
  }

  async deleteEvacuationRouteConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('evacuation_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEvacuationRouteError(error.message);
  }

  async getAssemblyPoint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('assembly_points')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAssemblyPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('assembly_points').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAssemblyPointError(error.message);
    return data ?? [];
  }

  async createAssemblyPoint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('assembly_points')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAssemblyPointError(error.message);
    return result;
  }

  async updateAssemblyPoint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('assembly_points')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAssemblyPointError(error.message);
    return result;
  }

  async deleteAssemblyPoint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('assembly_points')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAssemblyPointError(error.message);
  }

  async getEvacuationSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('evacuation_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEvacuationSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('evacuation_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEvacuationSimulationError(error.message);
    return data ?? [];
  }

  async createEvacuationSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('evacuation_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEvacuationSimulationError(error.message);
    return result;
  }

  async updateEvacuationSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('evacuation_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEvacuationSimulationError(error.message);
    return result;
  }

  async deleteEvacuationSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('evacuation_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEvacuationSimulationError(error.message);
  }

  async getEvacuationMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('evacuation_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEvacuationMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('evacuation_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEvacuationMetricError(error.message);
    return data ?? [];
  }

  async createEvacuationMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('evacuation_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEvacuationMetricError(error.message);
    return result;
  }

  async updateEvacuationMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('evacuation_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEvacuationMetricError(error.message);
    return result;
  }

  async deleteEvacuationMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('evacuation_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEvacuationMetricError(error.message);
  }

  async getRouteUtilization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('route_utilizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRouteUtilization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('route_utilizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRouteUtilizationError(error.message);
    return data ?? [];
  }

  async createRouteUtilization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('route_utilizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRouteUtilizationError(error.message);
    return result;
  }

  async updateRouteUtilization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('route_utilizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRouteUtilizationError(error.message);
    return result;
  }

  async deleteRouteUtilization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('route_utilizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRouteUtilizationError(error.message);
  }

  async getBottleneck(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('bottlenecks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBottleneck(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('bottlenecks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBottleneckError(error.message);
    return data ?? [];
  }

  async createBottleneck(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('bottlenecks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBottleneckError(error.message);
    return result;
  }

  async updateBottleneck(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('bottlenecks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBottleneckError(error.message);
    return result;
  }

  async deleteBottleneck(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('bottlenecks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBottleneckError(error.message);
  }

  async getEvacuationRoute(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('evacuation_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEvacuationRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('evacuation_routes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEvacuationRouteError(error.message);
    return data ?? [];
  }

  async createEvacuationRoute(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('evacuation_routes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEvacuationRouteError(error.message);
    return result;
  }

  async updateEvacuationRoute(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('evacuation_routes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEvacuationRouteError(error.message);
    return result;
  }

  async deleteEvacuationRoute(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('evacuation_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEvacuationRouteError(error.message);
  }

  async getInfrastructureSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructureSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructureSimulationError(error.message);
    return data ?? [];
  }

  async createInfrastructureSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureSimulationError(error.message);
    return result;
  }

  async updateInfrastructureSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureSimulationError(error.message);
    return result;
  }

  async deleteInfrastructureSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructureSimulationError(error.message);
  }

  async getInfrastructureAsset(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_assets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructureAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_assets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructureAssetError(error.message);
    return data ?? [];
  }

  async createInfrastructureAsset(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_assets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureAssetError(error.message);
    return result;
  }

  async updateInfrastructureAsset(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_assets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureAssetError(error.message);
    return result;
  }

  async deleteInfrastructureAsset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_assets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructureAssetError(error.message);
  }

  async getInfrastructureAssessment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructureAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_assessments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructureAssessmentError(error.message);
    return data ?? [];
  }

  async createInfrastructureAssessment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureAssessmentError(error.message);
    return result;
  }

  async updateInfrastructureAssessment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureAssessmentError(error.message);
    return result;
  }

  async deleteInfrastructureAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructureAssessmentError(error.message);
  }

  async getInfrastructurePlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructurePlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructurePlanError(error.message);
    return data ?? [];
  }

  async createInfrastructurePlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructurePlanError(error.message);
    return result;
  }

  async updateInfrastructurePlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructurePlanError(error.message);
    return result;
  }

  async deleteInfrastructurePlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructurePlanError(error.message);
  }

  async getInfrastructureProject(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('infrastructure_projects')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listInfrastructureProject(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('infrastructure_projects').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudInfrastructureProjectError(error.message);
    return data ?? [];
  }

  async createInfrastructureProject(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('infrastructure_projects')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureProjectError(error.message);
    return result;
  }

  async updateInfrastructureProject(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('infrastructure_projects')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudInfrastructureProjectError(error.message);
    return result;
  }

  async deleteInfrastructureProject(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('infrastructure_projects')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudInfrastructureProjectError(error.message);
  }

  async getEnergySimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('energy_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnergySimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('energy_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnergySimulationError(error.message);
    return data ?? [];
  }

  async createEnergySimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('energy_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnergySimulationError(error.message);
    return result;
  }

  async updateEnergySimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('energy_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnergySimulationError(error.message);
    return result;
  }

  async deleteEnergySimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('energy_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnergySimulationError(error.message);
  }

  async getEnergySourceConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('energy_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnergySourceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createEnergySourceConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('energy_sources')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnergySourceError(error.message);
    return result;
  }

  async updateEnergySourceConfig(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteEnergySourceConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('energy_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnergySourceError(error.message);
  }

  async getEnergyForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('energy_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnergyForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('energy_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnergyForecastError(error.message);
    return data ?? [];
  }

  async createEnergyForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('energy_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnergyForecastError(error.message);
    return result;
  }

  async updateEnergyForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('energy_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnergyForecastError(error.message);
    return result;
  }

  async deleteEnergyForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('energy_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnergyForecastError(error.message);
  }

  async getEnergyOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('energy_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnergyOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('energy_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnergyOptimizationError(error.message);
    return data ?? [];
  }

  async createEnergyOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('energy_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnergyOptimizationError(error.message);
    return result;
  }

  async updateEnergyOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('energy_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnergyOptimizationError(error.message);
    return result;
  }

  async deleteEnergyOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('energy_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnergyOptimizationError(error.message);
  }

  async getWaterSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('water_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWaterSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('water_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWaterSimulationError(error.message);
    return data ?? [];
  }

  async createWaterSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('water_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWaterSimulationError(error.message);
    return result;
  }

  async updateWaterSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('water_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWaterSimulationError(error.message);
    return result;
  }

  async deleteWaterSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('water_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWaterSimulationError(error.message);
  }

  async getWaterSourceConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('water_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWaterSourceConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createWaterSourceConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('water_sources')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWaterSourceError(error.message);
    return result;
  }

  async updateWaterSourceConfig(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteWaterSourceConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('water_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWaterSourceError(error.message);
  }

  async getWaterForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('water_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWaterForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('water_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWaterForecastError(error.message);
    return data ?? [];
  }

  async createWaterForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('water_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWaterForecastError(error.message);
    return result;
  }

  async updateWaterForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('water_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWaterForecastError(error.message);
    return result;
  }

  async deleteWaterForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('water_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWaterForecastError(error.message);
  }

  async getWaterOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('water_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWaterOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('water_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWaterOptimizationError(error.message);
    return data ?? [];
  }

  async createWaterOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('water_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWaterOptimizationError(error.message);
    return result;
  }

  async updateWaterOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('water_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWaterOptimizationError(error.message);
    return result;
  }

  async deleteWaterOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('water_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWaterOptimizationError(error.message);
  }

  async getWasteSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('waste_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWasteSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('waste_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWasteSimulationError(error.message);
    return data ?? [];
  }

  async createWasteSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('waste_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWasteSimulationError(error.message);
    return result;
  }

  async updateWasteSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('waste_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWasteSimulationError(error.message);
    return result;
  }

  async deleteWasteSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('waste_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWasteSimulationError(error.message);
  }

  async getWasteCategory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('waste_categorys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWasteCategory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('waste_categorys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWasteCategoryError(error.message);
    return data ?? [];
  }

  async createWasteCategory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('waste_categorys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWasteCategoryError(error.message);
    return result;
  }

  async updateWasteCategory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('waste_categorys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWasteCategoryError(error.message);
    return result;
  }

  async deleteWasteCategory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('waste_categorys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWasteCategoryError(error.message);
  }

  async getWasteForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('waste_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWasteForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('waste_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWasteForecastError(error.message);
    return data ?? [];
  }

  async createWasteForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('waste_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWasteForecastError(error.message);
    return result;
  }

  async updateWasteForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('waste_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWasteForecastError(error.message);
    return result;
  }

  async deleteWasteForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('waste_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWasteForecastError(error.message);
  }

  async getWasteOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('waste_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWasteOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('waste_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWasteOptimizationError(error.message);
    return data ?? [];
  }

  async createWasteOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('waste_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWasteOptimizationError(error.message);
    return result;
  }

  async updateWasteOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('waste_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWasteOptimizationError(error.message);
    return result;
  }

  async deleteWasteOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('waste_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWasteOptimizationError(error.message);
  }

  async getSecuritySimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('security_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecuritySimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('security_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecuritySimulationError(error.message);
    return data ?? [];
  }

  async createSecuritySimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('security_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecuritySimulationError(error.message);
    return result;
  }

  async updateSecuritySimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('security_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecuritySimulationError(error.message);
    return result;
  }

  async deleteSecuritySimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('security_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecuritySimulationError(error.message);
  }

  async getThreatAssessment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('threat_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listThreatAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('threat_assessments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudThreatAssessmentError(error.message);
    return data ?? [];
  }

  async createThreatAssessment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('threat_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudThreatAssessmentError(error.message);
    return result;
  }

  async updateThreatAssessment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('threat_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudThreatAssessmentError(error.message);
    return result;
  }

  async deleteThreatAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('threat_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudThreatAssessmentError(error.message);
  }

  async getSecurityPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('security_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecurityPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('security_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecurityPlanError(error.message);
    return data ?? [];
  }

  async createSecurityPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('security_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecurityPlanError(error.message);
    return result;
  }

  async updateSecurityPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('security_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecurityPlanError(error.message);
    return result;
  }

  async deleteSecurityPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('security_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecurityPlanError(error.message);
  }

  async getSecurityMeasure(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('security_measures')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSecurityMeasure(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('security_measures').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSecurityMeasureError(error.message);
    return data ?? [];
  }

  async createSecurityMeasure(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('security_measures')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSecurityMeasureError(error.message);
    return result;
  }

  async updateSecurityMeasure(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('security_measures')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSecurityMeasureError(error.message);
    return result;
  }

  async deleteSecurityMeasure(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('security_measures')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSecurityMeasureError(error.message);
  }

  async getTransportSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('transport_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTransportSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('transport_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTransportSimulationError(error.message);
    return data ?? [];
  }

  async createTransportSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('transport_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTransportSimulationError(error.message);
    return result;
  }

  async updateTransportSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('transport_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTransportSimulationError(error.message);
    return result;
  }

  async deleteTransportSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('transport_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTransportSimulationError(error.message);
  }

  async getTransportRouteConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('transport_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTransportRouteConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('transport_routes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTransportRouteError(error.message);
    return data ?? [];
  }

  async createTransportRouteConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('transport_routes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTransportRouteError(error.message);
    return result;
  }

  async updateTransportRouteConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('transport_routes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTransportRouteError(error.message);
    return result;
  }

  async deleteTransportRouteConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('transport_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTransportRouteError(error.message);
  }

  async getTransportOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('transport_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTransportOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('transport_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTransportOptimizationError(error.message);
    return data ?? [];
  }

  async createTransportOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('transport_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTransportOptimizationError(error.message);
    return result;
  }

  async updateTransportOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('transport_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTransportOptimizationError(error.message);
    return result;
  }

  async deleteTransportOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('transport_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTransportOptimizationError(error.message);
  }

  async getTransportRoute(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('transport_routes')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTransportRoute(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('transport_routes').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTransportRouteError(error.message);
    return data ?? [];
  }

  async createTransportRoute(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('transport_routes')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTransportRouteError(error.message);
    return result;
  }

  async updateTransportRoute(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('transport_routes')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTransportRouteError(error.message);
    return result;
  }

  async deleteTransportRoute(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('transport_routes')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTransportRouteError(error.message);
  }

  async getTransportStop(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('transport_stops')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTransportStop(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('transport_stops').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTransportStopError(error.message);
    return data ?? [];
  }

  async createTransportStop(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('transport_stops')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTransportStopError(error.message);
    return result;
  }

  async updateTransportStop(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('transport_stops')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTransportStopError(error.message);
    return result;
  }

  async deleteTransportStop(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('transport_stops')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTransportStopError(error.message);
  }

  async getGrowthSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('growth_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGrowthSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('growth_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGrowthSimulationError(error.message);
    return data ?? [];
  }

  async createGrowthSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('growth_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGrowthSimulationError(error.message);
    return result;
  }

  async updateGrowthSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('growth_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGrowthSimulationError(error.message);
    return result;
  }

  async deleteGrowthSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('growth_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGrowthSimulationError(error.message);
  }

  async getGrowthProjectionResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('growth_projection_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGrowthProjectionResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('growth_projection_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGrowthProjectionResultError(error.message);
    return data ?? [];
  }

  async createGrowthProjectionResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('growth_projection_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGrowthProjectionResultError(error.message);
    return result;
  }

  async updateGrowthProjectionResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('growth_projection_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGrowthProjectionResultError(error.message);
    return result;
  }

  async deleteGrowthProjectionResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('growth_projection_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGrowthProjectionResultError(error.message);
  }

  async getGrowthFactor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('growth_factors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGrowthFactor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('growth_factors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGrowthFactorError(error.message);
    return data ?? [];
  }

  async createGrowthFactor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('growth_factors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGrowthFactorError(error.message);
    return result;
  }

  async updateGrowthFactor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('growth_factors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGrowthFactorError(error.message);
    return result;
  }

  async deleteGrowthFactor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('growth_factors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGrowthFactorError(error.message);
  }

  async getGrowthScenario(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('growth_scenarios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGrowthScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('growth_scenarios').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGrowthScenarioError(error.message);
    return data ?? [];
  }

  async createGrowthScenario(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('growth_scenarios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGrowthScenarioError(error.message);
    return result;
  }

  async updateGrowthScenario(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('growth_scenarios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGrowthScenarioError(error.message);
    return result;
  }

  async deleteGrowthScenario(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('growth_scenarios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGrowthScenarioError(error.message);
  }

  async getAcademicSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('academic_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAcademicSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('academic_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAcademicSimulationError(error.message);
    return data ?? [];
  }

  async createAcademicSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('academic_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAcademicSimulationError(error.message);
    return result;
  }

  async updateAcademicSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('academic_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAcademicSimulationError(error.message);
    return result;
  }

  async deleteAcademicSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('academic_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAcademicSimulationError(error.message);
  }

  async getAcademicProjection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('academic_projectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAcademicProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('academic_projectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAcademicProjectionError(error.message);
    return data ?? [];
  }

  async createAcademicProjection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('academic_projectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAcademicProjectionError(error.message);
    return result;
  }

  async updateAcademicProjection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('academic_projectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAcademicProjectionError(error.message);
    return result;
  }

  async deleteAcademicProjection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('academic_projectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAcademicProjectionError(error.message);
  }

  async getAcademicOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('academic_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAcademicOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('academic_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAcademicOptimizationError(error.message);
    return data ?? [];
  }

  async createAcademicOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('academic_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAcademicOptimizationError(error.message);
    return result;
  }

  async updateAcademicOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('academic_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAcademicOptimizationError(error.message);
    return result;
  }

  async deleteAcademicOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('academic_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAcademicOptimizationError(error.message);
  }

  async getAcademicMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('academic_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAcademicMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('academic_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAcademicMetricsError(error.message);
    return data ?? [];
  }

  async createAcademicMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('academic_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAcademicMetricsError(error.message);
    return result;
  }

  async updateAcademicMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('academic_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAcademicMetricsError(error.message);
    return result;
  }

  async deleteAcademicMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('academic_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAcademicMetricsError(error.message);
  }

  async getImprovementArea(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('improvement_areas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listImprovementArea(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('improvement_areas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudImprovementAreaError(error.message);
    return data ?? [];
  }

  async createImprovementArea(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('improvement_areas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudImprovementAreaError(error.message);
    return result;
  }

  async updateImprovementArea(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('improvement_areas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudImprovementAreaError(error.message);
    return result;
  }

  async deleteImprovementArea(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('improvement_areas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudImprovementAreaError(error.message);
  }

  async getFinancialSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('financial_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFinancialSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('financial_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFinancialSimulationError(error.message);
    return data ?? [];
  }

  async createFinancialSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('financial_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFinancialSimulationError(error.message);
    return result;
  }

  async updateFinancialSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('financial_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFinancialSimulationError(error.message);
    return result;
  }

  async deleteFinancialSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('financial_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFinancialSimulationError(error.message);
  }

  async getFinancialProjection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('financial_projectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFinancialProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('financial_projectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFinancialProjectionError(error.message);
    return data ?? [];
  }

  async createFinancialProjection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('financial_projectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFinancialProjectionError(error.message);
    return result;
  }

  async updateFinancialProjection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('financial_projectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFinancialProjectionError(error.message);
    return result;
  }

  async deleteFinancialProjection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('financial_projectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFinancialProjectionError(error.message);
  }

  async getFinancialOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('financial_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFinancialOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('financial_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFinancialOptimizationError(error.message);
    return data ?? [];
  }

  async createFinancialOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('financial_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFinancialOptimizationError(error.message);
    return result;
  }

  async updateFinancialOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('financial_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFinancialOptimizationError(error.message);
    return result;
  }

  async deleteFinancialOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('financial_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFinancialOptimizationError(error.message);
  }

  async getFinancialState(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('financial_states')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFinancialState(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('financial_states').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFinancialStateError(error.message);
    return data ?? [];
  }

  async createFinancialState(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('financial_states')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFinancialStateError(error.message);
    return result;
  }

  async updateFinancialState(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('financial_states')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFinancialStateError(error.message);
    return result;
  }

  async deleteFinancialState(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('financial_states')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFinancialStateError(error.message);
  }

  async getOperationalSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('operational_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOperationalSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('operational_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOperationalSimulationError(error.message);
    return data ?? [];
  }

  async createOperationalSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('operational_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOperationalSimulationError(error.message);
    return result;
  }

  async updateOperationalSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('operational_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOperationalSimulationError(error.message);
    return result;
  }

  async deleteOperationalSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('operational_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOperationalSimulationError(error.message);
  }

  async getOperationalProjection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('operational_projectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOperationalProjection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('operational_projectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOperationalProjectionError(error.message);
    return data ?? [];
  }

  async createOperationalProjection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('operational_projectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOperationalProjectionError(error.message);
    return result;
  }

  async updateOperationalProjection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('operational_projectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOperationalProjectionError(error.message);
    return result;
  }

  async deleteOperationalProjection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('operational_projectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOperationalProjectionError(error.message);
  }

  async getOperationalOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('operational_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOperationalOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('operational_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOperationalOptimizationError(error.message);
    return data ?? [];
  }

  async createOperationalOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('operational_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOperationalOptimizationError(error.message);
    return result;
  }

  async updateOperationalOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('operational_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOperationalOptimizationError(error.message);
    return result;
  }

  async deleteOperationalOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('operational_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOperationalOptimizationError(error.message);
  }

  async getOperationalMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('operational_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOperationalMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('operational_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOperationalMetricsError(error.message);
    return data ?? [];
  }

  async createOperationalMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('operational_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOperationalMetricsError(error.message);
    return result;
  }

  async updateOperationalMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('operational_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOperationalMetricsError(error.message);
    return result;
  }

  async deleteOperationalMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('operational_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOperationalMetricsError(error.message);
  }

  async getProcessImprovement(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('process_improvements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listProcessImprovement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('process_improvements').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudProcessImprovementError(error.message);
    return data ?? [];
  }

  async createProcessImprovement(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('process_improvements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudProcessImprovementError(error.message);
    return result;
  }

  async updateProcessImprovement(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('process_improvements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudProcessImprovementError(error.message);
    return result;
  }

  async deleteProcessImprovement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('process_improvements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudProcessImprovementError(error.message);
  }

  async getEnvironmentalSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('environmental_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnvironmentalSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('environmental_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnvironmentalSimulationError(error.message);
    return data ?? [];
  }

  async createEnvironmentalSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('environmental_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalSimulationError(error.message);
    return result;
  }

  async updateEnvironmentalSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('environmental_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalSimulationError(error.message);
    return result;
  }

  async deleteEnvironmentalSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('environmental_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnvironmentalSimulationError(error.message);
  }

  async getEnvironmentalImpactResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('environmental_impact_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnvironmentalImpactResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('environmental_impact_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnvironmentalImpactResultError(error.message);
    return data ?? [];
  }

  async createEnvironmentalImpactResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('environmental_impact_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalImpactResultError(error.message);
    return result;
  }

  async updateEnvironmentalImpactResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('environmental_impact_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalImpactResultError(error.message);
    return result;
  }

  async deleteEnvironmentalImpactResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('environmental_impact_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnvironmentalImpactResultError(error.message);
  }

  async getEnvironmentalForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('environmental_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnvironmentalForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('environmental_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnvironmentalForecastError(error.message);
    return data ?? [];
  }

  async createEnvironmentalForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('environmental_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalForecastError(error.message);
    return result;
  }

  async updateEnvironmentalForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('environmental_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalForecastError(error.message);
    return result;
  }

  async deleteEnvironmentalForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('environmental_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnvironmentalForecastError(error.message);
  }

  async getEnvironmentalOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('environmental_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnvironmentalOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('environmental_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnvironmentalOptimizationError(error.message);
    return data ?? [];
  }

  async createEnvironmentalOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('environmental_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalOptimizationError(error.message);
    return result;
  }

  async updateEnvironmentalOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('environmental_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalOptimizationError(error.message);
    return result;
  }

  async deleteEnvironmentalOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('environmental_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnvironmentalOptimizationError(error.message);
  }

  async getSafetySimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('safety_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSafetySimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('safety_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSafetySimulationError(error.message);
    return data ?? [];
  }

  async createSafetySimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('safety_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSafetySimulationError(error.message);
    return result;
  }

  async updateSafetySimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('safety_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSafetySimulationError(error.message);
    return result;
  }

  async deleteSafetySimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('safety_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSafetySimulationError(error.message);
  }

  async getSafetyAssessment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('safety_assessments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSafetyAssessment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('safety_assessments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSafetyAssessmentError(error.message);
    return data ?? [];
  }

  async createSafetyAssessment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('safety_assessments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSafetyAssessmentError(error.message);
    return result;
  }

  async updateSafetyAssessment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('safety_assessments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSafetyAssessmentError(error.message);
    return result;
  }

  async deleteSafetyAssessment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('safety_assessments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSafetyAssessmentError(error.message);
  }

  async getHazard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('hazards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listHazard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('hazards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudHazardError(error.message);
    return data ?? [];
  }

  async createHazard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('hazards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudHazardError(error.message);
    return result;
  }

  async updateHazard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('hazards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudHazardError(error.message);
    return result;
  }

  async deleteHazard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('hazards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudHazardError(error.message);
  }

  async getSafetyPlan(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('safety_plans')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSafetyPlan(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('safety_plans').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSafetyPlanError(error.message);
    return data ?? [];
  }

  async createSafetyPlan(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('safety_plans')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSafetyPlanError(error.message);
    return result;
  }

  async updateSafetyPlan(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('safety_plans')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSafetyPlanError(error.message);
    return result;
  }

  async deleteSafetyPlan(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('safety_plans')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSafetyPlanError(error.message);
  }

  async getSafetyMeasure(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('safety_measures')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSafetyMeasure(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('safety_measures').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSafetyMeasureError(error.message);
    return data ?? [];
  }

  async createSafetyMeasure(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('safety_measures')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSafetyMeasureError(error.message);
    return result;
  }

  async updateSafetyMeasure(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('safety_measures')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSafetyMeasureError(error.message);
    return result;
  }

  async deleteSafetyMeasure(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('safety_measures')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSafetyMeasureError(error.message);
  }

  async getMaintenanceSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('maintenance_simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMaintenanceSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('maintenance_simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMaintenanceSimulationError(error.message);
    return data ?? [];
  }

  async createMaintenanceSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('maintenance_simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceSimulationError(error.message);
    return result;
  }

  async updateMaintenanceSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('maintenance_simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceSimulationError(error.message);
    return result;
  }

  async deleteMaintenanceSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('maintenance_simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMaintenanceSimulationError(error.message);
  }

  async getMaintenanceAsset(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('maintenance_assets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMaintenanceAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('maintenance_assets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMaintenanceAssetError(error.message);
    return data ?? [];
  }

  async createMaintenanceAsset(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('maintenance_assets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceAssetError(error.message);
    return result;
  }

  async updateMaintenanceAsset(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('maintenance_assets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceAssetError(error.message);
    return result;
  }

  async deleteMaintenanceAsset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('maintenance_assets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMaintenanceAssetError(error.message);
  }

  async getMaintenanceSchedule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('maintenance_schedules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMaintenanceSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('maintenance_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMaintenanceScheduleError(error.message);
    return data ?? [];
  }

  async createMaintenanceSchedule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('maintenance_schedules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceScheduleError(error.message);
    return result;
  }

  async updateMaintenanceSchedule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('maintenance_schedules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceScheduleError(error.message);
    return result;
  }

  async deleteMaintenanceSchedule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('maintenance_schedules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMaintenanceScheduleError(error.message);
  }

  async getMaintenanceTask(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('maintenance_tasks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMaintenanceTask(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('maintenance_tasks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMaintenanceTaskError(error.message);
    return data ?? [];
  }

  async createMaintenanceTask(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('maintenance_tasks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceTaskError(error.message);
    return result;
  }

  async updateMaintenanceTask(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('maintenance_tasks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceTaskError(error.message);
    return result;
  }

  async deleteMaintenanceTask(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('maintenance_tasks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMaintenanceTaskError(error.message);
  }

  async getMaintenanceOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('maintenance_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMaintenanceOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('maintenance_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMaintenanceOptimizationError(error.message);
    return data ?? [];
  }

  async createMaintenanceOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('maintenance_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceOptimizationError(error.message);
    return result;
  }

  async updateMaintenanceOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('maintenance_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMaintenanceOptimizationError(error.message);
    return result;
  }

  async deleteMaintenanceOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('maintenance_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMaintenanceOptimizationError(error.message);
  }

  async getResourceAllocation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('resource_allocatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResourceAllocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('resource_allocatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResourceAllocationError(error.message);
    return data ?? [];
  }

  async createResourceAllocation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('resource_allocatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResourceAllocationError(error.message);
    return result;
  }

  async updateResourceAllocation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('resource_allocatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResourceAllocationError(error.message);
    return result;
  }

  async deleteResourceAllocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('resource_allocatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResourceAllocationError(error.message);
  }

  async getResourceConstraint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('resource_constraints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResourceConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('resource_constraints').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResourceConstraintError(error.message);
    return data ?? [];
  }

  async createResourceConstraint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('resource_constraints')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResourceConstraintError(error.message);
    return result;
  }

  async updateResourceConstraint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('resource_constraints')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResourceConstraintError(error.message);
    return result;
  }

  async deleteResourceConstraint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('resource_constraints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResourceConstraintError(error.message);
  }

  async getResourceOptimization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('resource_optimizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResourceOptimization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('resource_optimizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResourceOptimizationError(error.message);
    return data ?? [];
  }

  async createResourceOptimization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('resource_optimizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResourceOptimizationError(error.message);
    return result;
  }

  async updateResourceOptimization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('resource_optimizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResourceOptimizationError(error.message);
    return result;
  }

  async deleteResourceOptimization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('resource_optimizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResourceOptimizationError(error.message);
  }

  async getSensitivityAnalysis(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sensitivity_analysises')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSensitivityAnalysis(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sensitivity_analysises').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSensitivityAnalysisError(error.message);
    return data ?? [];
  }

  async createSensitivityAnalysis(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sensitivity_analysises')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSensitivityAnalysisError(error.message);
    return result;
  }

  async updateSensitivityAnalysis(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sensitivity_analysises')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSensitivityAnalysisError(error.message);
    return result;
  }

  async deleteSensitivityAnalysis(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sensitivity_analysises')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSensitivityAnalysisError(error.message);
  }

  async getSensitivityVariable(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sensitivity_variables')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSensitivityVariable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sensitivity_variables').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSensitivityVariableError(error.message);
    return data ?? [];
  }

  async createSensitivityVariable(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sensitivity_variables')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSensitivityVariableError(error.message);
    return result;
  }

  async updateSensitivityVariable(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sensitivity_variables')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSensitivityVariableError(error.message);
    return result;
  }

  async deleteSensitivityVariable(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sensitivity_variables')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSensitivityVariableError(error.message);
  }

  async getSensitivityResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sensitivity_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSensitivityResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sensitivity_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSensitivityResultError(error.message);
    return data ?? [];
  }

  async createSensitivityResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sensitivity_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSensitivityResultError(error.message);
    return result;
  }

  async updateSensitivityResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sensitivity_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSensitivityResultError(error.message);
    return result;
  }

  async deleteSensitivityResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sensitivity_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSensitivityResultError(error.message);
  }

  async getDataPoint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('data_points')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDataPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('data_points').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDataPointError(error.message);
    return data ?? [];
  }

  async createDataPoint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('data_points')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDataPointError(error.message);
    return result;
  }

  async updateDataPoint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('data_points')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDataPointError(error.message);
    return result;
  }

  async deleteDataPoint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('data_points')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDataPointError(error.message);
  }

  async getSensitivityReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sensitivity_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSensitivityReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sensitivity_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSensitivityReportError(error.message);
    return data ?? [];
  }

  async createSensitivityReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sensitivity_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSensitivityReportError(error.message);
    return result;
  }

  async updateSensitivityReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sensitivity_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSensitivityReportError(error.message);
    return result;
  }

  async deleteSensitivityReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sensitivity_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSensitivityReportError(error.message);
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

  async getScenarioData(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scenario_datas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listScenarioData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scenario_datas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudScenarioDataError(error.message);
    return data ?? [];
  }

  async createScenarioData(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scenario_datas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudScenarioDataError(error.message);
    return result;
  }

  async updateScenarioData(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scenario_datas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudScenarioDataError(error.message);
    return result;
  }

  async deleteScenarioData(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scenario_datas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudScenarioDataError(error.message);
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

  async getScenarioReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scenario_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listScenarioReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scenario_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudScenarioReportError(error.message);
    return data ?? [];
  }

  async createScenarioReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scenario_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudScenarioReportError(error.message);
    return result;
  }

  async updateScenarioReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scenario_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudScenarioReportError(error.message);
    return result;
  }

  async deleteScenarioReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scenario_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudScenarioReportError(error.message);
  }

  async getScenarioRanking(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scenario_rankings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listScenarioRanking(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scenario_rankings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudScenarioRankingError(error.message);
    return data ?? [];
  }

  async createScenarioRanking(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scenario_rankings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudScenarioRankingError(error.message);
    return result;
  }

  async updateScenarioRanking(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scenario_rankings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudScenarioRankingError(error.message);
    return result;
  }

  async deleteScenarioRanking(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scenario_rankings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudScenarioRankingError(error.message);
  }

  async getScenarioRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('scenario_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listScenarioRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('scenario_recommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudScenarioRecommendationError(error.message);
    return data ?? [];
  }

  async createScenarioRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('scenario_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudScenarioRecommendationError(error.message);
    return result;
  }

  async updateScenarioRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('scenario_recommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudScenarioRecommendationError(error.message);
    return result;
  }

  async deleteScenarioRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('scenario_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudScenarioRecommendationError(error.message);
  }

  async getSimulationDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationDashboardError(error.message);
    return data ?? [];
  }

  async createSimulationDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationDashboardError(error.message);
    return result;
  }

  async updateSimulationDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationDashboardError(error.message);
    return result;
  }

  async deleteSimulationDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationDashboardError(error.message);
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

  async getWidgetConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('widgets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWidgetConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('widgets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWidgetError(error.message);
    return data ?? [];
  }

  async createWidgetConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('widgets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWidgetError(error.message);
    return result;
  }

  async updateWidgetConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('widgets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWidgetError(error.message);
    return result;
  }

  async deleteWidgetConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('widgets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWidgetError(error.message);
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

  async getSimulationReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationReportError(error.message);
    return data ?? [];
  }

  async createSimulationReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationReportError(error.message);
    return result;
  }

  async updateSimulationReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationReportError(error.message);
    return result;
  }

  async deleteSimulationReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationReportError(error.message);
  }

  async getReportSection(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('report_sectioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReportSection(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('report_sectioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReportSectionError(error.message);
    return data ?? [];
  }

  async createReportSection(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('report_sectioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReportSectionError(error.message);
    return result;
  }

  async updateReportSection(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('report_sectioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReportSectionError(error.message);
    return result;
  }

  async deleteReportSection(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('report_sectioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReportSectionError(error.message);
  }

  async getReportTable(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('report_tables')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listReportTable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('report_tables').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudReportTableError(error.message);
    return data ?? [];
  }

  async createReportTable(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('report_tables')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudReportTableError(error.message);
    return result;
  }

  async updateReportTable(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('report_tables')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudReportTableError(error.message);
    return result;
  }

  async deleteReportTable(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('report_tables')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudReportTableError(error.message);
  }

  async getVisualizationConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('visualizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVisualizationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('visualizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVisualizationError(error.message);
    return data ?? [];
  }

  async createVisualizationConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('visualizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVisualizationError(error.message);
    return result;
  }

  async updateVisualizationConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('visualizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVisualizationError(error.message);
    return result;
  }

  async deleteVisualizationConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('visualizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVisualizationError(error.message);
  }

  async getSimulationAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationAlertError(error.message);
    return data ?? [];
  }

  async createSimulationAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationAlertError(error.message);
    return result;
  }

  async updateSimulationAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationAlertError(error.message);
    return result;
  }

  async deleteSimulationAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationAlertError(error.message);
  }

  async getSimulationAI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_ais').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationAIError(error.message);
    return data ?? [];
  }

  async createSimulationAI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationAIError(error.message);
    return result;
  }

  async updateSimulationAI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_ais')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationAIError(error.message);
    return result;
  }

  async deleteSimulationAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationAIError(error.message);
  }

  async getSimulationAIModel(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_aimodels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationAIModel(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_aimodels').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationAIModelError(error.message);
    return data ?? [];
  }

  async createSimulationAIModel(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_aimodels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationAIModelError(error.message);
    return result;
  }

  async updateSimulationAIModel(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_aimodels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationAIModelError(error.message);
    return result;
  }

  async deleteSimulationAIModel(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_aimodels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationAIModelError(error.message);
  }

  async getSimulationAIResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_airesults')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationAIResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_airesults').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationAIResultError(error.message);
    return data ?? [];
  }

  async createSimulationAIResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_airesults')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationAIResultError(error.message);
    return result;
  }

  async updateSimulationAIResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_airesults')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationAIResultError(error.message);
    return result;
  }

  async deleteSimulationAIResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_airesults')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationAIResultError(error.message);
  }

  async getAIPredictionFactor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('aiprediction_factors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAIPredictionFactor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('aiprediction_factors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAIPredictionFactorError(error.message);
    return data ?? [];
  }

  async createAIPredictionFactor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('aiprediction_factors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAIPredictionFactorError(error.message);
    return result;
  }

  async updateAIPredictionFactor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('aiprediction_factors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAIPredictionFactorError(error.message);
    return result;
  }

  async deleteAIPredictionFactor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('aiprediction_factors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAIPredictionFactorError(error.message);
  }

  async getSimulationEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationEventError(error.message);
    return data ?? [];
  }

  async createSimulationEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationEventError(error.message);
    return result;
  }

  async updateSimulationEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationEventError(error.message);
    return result;
  }

  async deleteSimulationEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationEventError(error.message);
  }

  async getSimulationTimeline(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_timelines')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationTimeline(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_timelines').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationTimelineError(error.message);
    return data ?? [];
  }

  async createSimulationTimeline(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_timelines')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationTimelineError(error.message);
    return result;
  }

  async updateSimulationTimeline(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_timelines')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationTimelineError(error.message);
    return result;
  }

  async deleteSimulationTimeline(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_timelines')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationTimelineError(error.message);
  }

  async getSimulationSnapshot(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_snapshots')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationSnapshot(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationSnapshotError(error.message);
    return data ?? [];
  }

  async createSimulationSnapshot(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_snapshots')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationSnapshotError(error.message);
    return result;
  }

  async updateSimulationSnapshot(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_snapshots')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationSnapshotError(error.message);
    return result;
  }

  async deleteSimulationSnapshot(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_snapshots')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationSnapshotError(error.message);
  }

  async getSimulationMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationMetricsError(error.message);
    return data ?? [];
  }

  async createSimulationMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationMetricsError(error.message);
    return result;
  }

  async updateSimulationMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationMetricsError(error.message);
    return result;
  }

  async deleteSimulationMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationMetricsError(error.message);
  }

  async getSimulationTemplate(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_templates')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationTemplate(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_templates').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationTemplateError(error.message);
    return data ?? [];
  }

  async createSimulationTemplate(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_templates')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationTemplateError(error.message);
    return result;
  }

  async updateSimulationTemplate(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_templates')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationTemplateError(error.message);
    return result;
  }

  async deleteSimulationTemplate(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_templates')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationTemplateError(error.message);
  }

  async getSimulationPreset(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_presets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationPreset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_presets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationPresetError(error.message);
    return data ?? [];
  }

  async createSimulationPreset(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_presets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationPresetError(error.message);
    return result;
  }

  async updateSimulationPreset(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_presets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationPresetError(error.message);
    return result;
  }

  async deleteSimulationPreset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_presets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationPresetError(error.message);
  }

  async getSimulationHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationHistoryError(error.message);
    return data ?? [];
  }

  async createSimulationHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationHistoryError(error.message);
    return result;
  }

  async updateSimulationHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationHistoryError(error.message);
    return result;
  }

  async deleteSimulationHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationHistoryError(error.message);
  }

  async getSimulationParameter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_parameters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationParameter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_parameters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationParameterError(error.message);
    return data ?? [];
  }

  async createSimulationParameter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_parameters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationParameterError(error.message);
    return result;
  }

  async updateSimulationParameter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_parameters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationParameterError(error.message);
    return result;
  }

  async deleteSimulationParameter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_parameters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationParameterError(error.message);
  }

  async getSimulationRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_recommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_recommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationRecommendationError(error.message);
    return data ?? [];
  }

  async createSimulationRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_recommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationRecommendationError(error.message);
    return result;
  }

  async updateSimulationRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_recommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationRecommendationError(error.message);
    return result;
  }

  async deleteSimulationRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_recommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationRecommendationError(error.message);
  }

  async getOptimizationResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('optimization_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listOptimizationResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('optimization_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudOptimizationResultError(error.message);
    return data ?? [];
  }

  async createOptimizationResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('optimization_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudOptimizationResultError(error.message);
    return result;
  }

  async updateOptimizationResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('optimization_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudOptimizationResultError(error.message);
    return result;
  }

  async deleteOptimizationResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('optimization_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudOptimizationResultError(error.message);
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

  async getGeoPoint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('geo_points')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGeoPoint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('geo_points').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGeoPointError(error.message);
    return data ?? [];
  }

  async createGeoPoint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('geo_points')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGeoPointError(error.message);
    return result;
  }

  async updateGeoPoint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('geo_points')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGeoPointError(error.message);
    return result;
  }

  async deleteGeoPoint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('geo_points')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGeoPointError(error.message);
  }

}

export function createInteropModuleRepository(supabase: SupabaseClient): InteropModuleRepository {
  return new InteropModuleRepositoryImpl(supabase);
}


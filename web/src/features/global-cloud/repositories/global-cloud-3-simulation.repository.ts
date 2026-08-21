import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAnalyticsAggregationError, EduCloudAnalyticsDataError, EduCloudAnalyticsFilterError, EduCloudAnalyticsInsightError, EduCloudAnalyticsVisualizationError, EduCloudBaseTwinError, EduCloudBuildingEnergyError, EduCloudBuildingSecurityError, EduCloudBuildingTwinError, EduCloudCampusFacilityError, EduCloudCampusTwinError, EduCloudClassroomEnvironmentError, EduCloudClassroomEquipmentError, EduCloudClassroomScheduleError, EduCloudClassroomTwinError, EduCloudDashboardGridError, EduCloudDashboardLayoutError, EduCloudDashboardWidgetError, EduCloudEmployeeAttendanceError, EduCloudEmployeePerformanceError, EduCloudEmployeeTwinError, EduCloudForecastValueError, EduCloudFundingSourceError, EduCloudKPIHistoryError, EduCloudLabEquipmentError, EduCloudLaboratoryTwinError, EduCloudLabScheduleError, EduCloudMaintenancePartError, EduCloudMetricThresholdError, EduCloudMinistryPolicyError, EduCloudMinistryTwinError, EduCloudModelMetricsError, EduCloudParentEngagementError, EduCloudParentTwinError, EduCloudPerformanceHistoryError, EduCloudPerformanceMetricError, EduCloudPredictionError, EduCloudPredictionInputError, EduCloudPredictionModelError, EduCloudPredictionOutputError, EduCloudPredictionResultError, EduCloudRegionPerformanceError, EduCloudRegionTwinError, EduCloudResourceTwinError, EduCloudResourceUtilizationError, EduCloudSchoolAcademicsError, EduCloudSchoolCapacityError, EduCloudSchoolFinancesError, EduCloudSchoolInfrastructureError, EduCloudSchoolTwinError, EduCloudSensorError, EduCloudSensorLocationError, EduCloudSimulationChartError, EduCloudSimulationComparisonError, EduCloudSimulationConstraintError, EduCloudSimulationDifferenceError, EduCloudSimulationError, EduCloudSimulationMetricsError, EduCloudSimulationOutputError, EduCloudSimulationResultError, EduCloudSimulationVariableError, EduCloudStudentAttendanceError, EduCloudStudentBehaviorError, EduCloudStudentHealthError, EduCloudStudentPerformanceError, EduCloudStudentTwinError, EduCloudSubjectScoreError, EduCloudTeacherCertificationError, EduCloudTeacherPerformanceError, EduCloudTeacherTwinError, EduCloudTeacherWorkloadError, EduCloudTwinAIError, EduCloudTwinAIModelError, EduCloudTwinAIPredictionError, EduCloudTwinAIRecommendationError, EduCloudTwinAlertError, EduCloudTwinAnalyticsError, EduCloudTwinCapacityError, EduCloudTwinDashboardError, EduCloudTwinDependencyError, EduCloudTwinEventError, EduCloudTwinForecastError, EduCloudTwinHistoryError, EduCloudTwinImpactError, EduCloudTwinKPIError, EduCloudTwinMaintenanceError, EduCloudTwinMaintenanceLogError, EduCloudTwinMaintenanceScheduleError, EduCloudTwinMetricError, EduCloudTwinPerformanceError, EduCloudTwinRelationshipError, EduCloudTwinReportError, EduCloudTwinScenarioError, EduCloudTwinSensorAlertError, EduCloudTwinSensorDataError, EduCloudTwinSensorError, EduCloudTwinSnapshotError, EduCloudTwinVisualizationError, EduCloudTwinWhatIfError, EduCloudVehicleGPSError, EduCloudVehicleMaintenanceError, EduCloudVehicleTwinError, EduCloudWhatIfResultError, EduCloudWhatIfTestValueError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface SimulationModuleRepository {

  // =============================================================================
  // DIGITAL-TWIN
  // =============================================================================
  getBaseTwin(schoolId: string, id: string): Promise<any | null>;
  listBaseTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBaseTwin(schoolId: string, data: any): Promise<any>;
  updateBaseTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteBaseTwin(schoolId: string, id: string): Promise<void>;

  getTwinSnapshot(schoolId: string, id: string): Promise<any | null>;
  listTwinSnapshot(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSnapshot(schoolId: string, data: any): Promise<any>;
  updateTwinSnapshot(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSnapshot(schoolId: string, id: string): Promise<void>;

  getTwinHistory(schoolId: string, id: string): Promise<any | null>;
  listTwinHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinHistory(schoolId: string, data: any): Promise<any>;
  updateTwinHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinHistory(schoolId: string, id: string): Promise<void>;

  getTwinEvent(schoolId: string, id: string): Promise<any | null>;
  listTwinEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinEvent(schoolId: string, data: any): Promise<any>;
  updateTwinEvent(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinEvent(schoolId: string, id: string): Promise<void>;

  getTwinMetric(schoolId: string, id: string): Promise<any | null>;
  listTwinMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinMetric(schoolId: string, data: any): Promise<any>;
  updateTwinMetric(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinMetric(schoolId: string, id: string): Promise<void>;

  getMetricThreshold(schoolId: string, id: string): Promise<any | null>;
  listMetricThreshold(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMetricThreshold(schoolId: string, data: any): Promise<any>;
  updateMetricThreshold(schoolId: string, id: string, data: any): Promise<any>;
  deleteMetricThreshold(schoolId: string, id: string): Promise<void>;

  getMinistryTwin(schoolId: string, id: string): Promise<any | null>;
  listMinistryTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMinistryTwin(schoolId: string, data: any): Promise<any>;
  updateMinistryTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteMinistryTwin(schoolId: string, id: string): Promise<void>;

  getMinistryPolicy(schoolId: string, id: string): Promise<any | null>;
  listMinistryPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMinistryPolicy(schoolId: string, data: any): Promise<any>;
  updateMinistryPolicy(schoolId: string, id: string, data: any): Promise<any>;
  deleteMinistryPolicy(schoolId: string, id: string): Promise<void>;

  getRegionTwin(schoolId: string, id: string): Promise<any | null>;
  listRegionTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionTwin(schoolId: string, data: any): Promise<any>;
  updateRegionTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionTwin(schoolId: string, id: string): Promise<void>;

  getRegionPerformance(schoolId: string, id: string): Promise<any | null>;
  listRegionPerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRegionPerformance(schoolId: string, data: any): Promise<any>;
  updateRegionPerformance(schoolId: string, id: string, data: any): Promise<any>;
  deleteRegionPerformance(schoolId: string, id: string): Promise<void>;

  getSchoolTwin(schoolId: string, id: string): Promise<any | null>;
  listSchoolTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchoolTwin(schoolId: string, data: any): Promise<any>;
  updateSchoolTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchoolTwin(schoolId: string, id: string): Promise<void>;

  getSchoolCapacity(schoolId: string, id: string): Promise<any | null>;
  listSchoolCapacity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchoolCapacity(schoolId: string, data: any): Promise<any>;
  updateSchoolCapacity(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchoolCapacity(schoolId: string, id: string): Promise<void>;

  getSchoolAcademics(schoolId: string, id: string): Promise<any | null>;
  listSchoolAcademics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchoolAcademics(schoolId: string, data: any): Promise<any>;
  updateSchoolAcademics(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchoolAcademics(schoolId: string, id: string): Promise<void>;

  getSchoolFinances(schoolId: string, id: string): Promise<any | null>;
  listSchoolFinances(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchoolFinances(schoolId: string, data: any): Promise<any>;
  updateSchoolFinances(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchoolFinances(schoolId: string, id: string): Promise<void>;

  getFundingSource(schoolId: string, id: string): Promise<any | null>;
  listFundingSource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createFundingSource(schoolId: string, data: any): Promise<any>;
  updateFundingSource(schoolId: string, id: string, data: any): Promise<any>;
  deleteFundingSource(schoolId: string, id: string): Promise<void>;

  getSchoolInfrastructure(schoolId: string, id: string): Promise<any | null>;
  listSchoolInfrastructure(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSchoolInfrastructure(schoolId: string, data: any): Promise<any>;
  updateSchoolInfrastructure(schoolId: string, id: string, data: any): Promise<any>;
  deleteSchoolInfrastructure(schoolId: string, id: string): Promise<void>;

  getCampusTwin(schoolId: string, id: string): Promise<any | null>;
  listCampusTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCampusTwin(schoolId: string, data: any): Promise<any>;
  updateCampusTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteCampusTwin(schoolId: string, id: string): Promise<void>;

  getCampusFacility(schoolId: string, id: string): Promise<any | null>;
  listCampusFacility(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCampusFacility(schoolId: string, data: any): Promise<any>;
  updateCampusFacility(schoolId: string, id: string, data: any): Promise<any>;
  deleteCampusFacility(schoolId: string, id: string): Promise<void>;

  getBuildingTwin(schoolId: string, id: string): Promise<any | null>;
  listBuildingTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBuildingTwin(schoolId: string, data: any): Promise<any>;
  updateBuildingTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteBuildingTwin(schoolId: string, id: string): Promise<void>;

  getBuildingEnergy(schoolId: string, id: string): Promise<any | null>;
  listBuildingEnergy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBuildingEnergy(schoolId: string, data: any): Promise<any>;
  updateBuildingEnergy(schoolId: string, id: string, data: any): Promise<any>;
  deleteBuildingEnergy(schoolId: string, id: string): Promise<void>;

  getBuildingSecurity(schoolId: string, id: string): Promise<any | null>;
  listBuildingSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBuildingSecurity(schoolId: string, data: any): Promise<any>;
  updateBuildingSecurity(schoolId: string, id: string, data: any): Promise<any>;
  deleteBuildingSecurity(schoolId: string, id: string): Promise<void>;

  getClassroomTwin(schoolId: string, id: string): Promise<any | null>;
  listClassroomTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createClassroomTwin(schoolId: string, data: any): Promise<any>;
  updateClassroomTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteClassroomTwin(schoolId: string, id: string): Promise<void>;

  getClassroomEquipment(schoolId: string, id: string): Promise<any | null>;
  listClassroomEquipment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createClassroomEquipment(schoolId: string, data: any): Promise<any>;
  updateClassroomEquipment(schoolId: string, id: string, data: any): Promise<any>;
  deleteClassroomEquipment(schoolId: string, id: string): Promise<void>;

  getClassroomEnvironment(schoolId: string, id: string): Promise<any | null>;
  listClassroomEnvironment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createClassroomEnvironment(schoolId: string, data: any): Promise<any>;
  updateClassroomEnvironment(schoolId: string, id: string, data: any): Promise<any>;
  deleteClassroomEnvironment(schoolId: string, id: string): Promise<void>;

  getClassroomSchedule(schoolId: string, id: string): Promise<any | null>;
  listClassroomSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createClassroomSchedule(schoolId: string, data: any): Promise<any>;
  updateClassroomSchedule(schoolId: string, id: string, data: any): Promise<any>;
  deleteClassroomSchedule(schoolId: string, id: string): Promise<void>;

  getStudentTwin(schoolId: string, id: string): Promise<any | null>;
  listStudentTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentTwin(schoolId: string, data: any): Promise<any>;
  updateStudentTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentTwin(schoolId: string, id: string): Promise<void>;

  getStudentPerformance(schoolId: string, id: string): Promise<any | null>;
  listStudentPerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentPerformance(schoolId: string, data: any): Promise<any>;
  updateStudentPerformance(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentPerformance(schoolId: string, id: string): Promise<void>;

  getSubjectScore(schoolId: string, id: string): Promise<any | null>;
  listSubjectScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSubjectScore(schoolId: string, data: any): Promise<any>;
  updateSubjectScore(schoolId: string, id: string, data: any): Promise<any>;
  deleteSubjectScore(schoolId: string, id: string): Promise<void>;

  getStudentAttendance(schoolId: string, id: string): Promise<any | null>;
  listStudentAttendance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentAttendance(schoolId: string, data: any): Promise<any>;
  updateStudentAttendance(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentAttendance(schoolId: string, id: string): Promise<void>;

  getStudentBehavior(schoolId: string, id: string): Promise<any | null>;
  listStudentBehavior(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentBehavior(schoolId: string, data: any): Promise<any>;
  updateStudentBehavior(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentBehavior(schoolId: string, id: string): Promise<void>;

  getStudentHealth(schoolId: string, id: string): Promise<any | null>;
  listStudentHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createStudentHealth(schoolId: string, data: any): Promise<any>;
  updateStudentHealth(schoolId: string, id: string, data: any): Promise<any>;
  deleteStudentHealth(schoolId: string, id: string): Promise<void>;

  getTeacherTwin(schoolId: string, id: string): Promise<any | null>;
  listTeacherTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherTwin(schoolId: string, data: any): Promise<any>;
  updateTeacherTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherTwin(schoolId: string, id: string): Promise<void>;

  getTeacherPerformance(schoolId: string, id: string): Promise<any | null>;
  listTeacherPerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherPerformance(schoolId: string, data: any): Promise<any>;
  updateTeacherPerformance(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherPerformance(schoolId: string, id: string): Promise<void>;

  getTeacherWorkload(schoolId: string, id: string): Promise<any | null>;
  listTeacherWorkload(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherWorkload(schoolId: string, data: any): Promise<any>;
  updateTeacherWorkload(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherWorkload(schoolId: string, id: string): Promise<void>;

  getTeacherCertification(schoolId: string, id: string): Promise<any | null>;
  listTeacherCertification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTeacherCertification(schoolId: string, data: any): Promise<any>;
  updateTeacherCertification(schoolId: string, id: string, data: any): Promise<any>;
  deleteTeacherCertification(schoolId: string, id: string): Promise<void>;

  getParentTwin(schoolId: string, id: string): Promise<any | null>;
  listParentTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createParentTwin(schoolId: string, data: any): Promise<any>;
  updateParentTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteParentTwin(schoolId: string, id: string): Promise<void>;

  getParentEngagement(schoolId: string, id: string): Promise<any | null>;
  listParentEngagement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createParentEngagement(schoolId: string, data: any): Promise<any>;
  updateParentEngagement(schoolId: string, id: string, data: any): Promise<any>;
  deleteParentEngagement(schoolId: string, id: string): Promise<void>;

  getEmployeeTwin(schoolId: string, id: string): Promise<any | null>;
  listEmployeeTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmployeeTwin(schoolId: string, data: any): Promise<any>;
  updateEmployeeTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmployeeTwin(schoolId: string, id: string): Promise<void>;

  getEmployeePerformance(schoolId: string, id: string): Promise<any | null>;
  listEmployeePerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmployeePerformance(schoolId: string, data: any): Promise<any>;
  updateEmployeePerformance(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmployeePerformance(schoolId: string, id: string): Promise<void>;

  getEmployeeAttendance(schoolId: string, id: string): Promise<any | null>;
  listEmployeeAttendance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEmployeeAttendance(schoolId: string, data: any): Promise<any>;
  updateEmployeeAttendance(schoolId: string, id: string, data: any): Promise<any>;
  deleteEmployeeAttendance(schoolId: string, id: string): Promise<void>;

  getResourceTwin(schoolId: string, id: string): Promise<any | null>;
  listResourceTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResourceTwin(schoolId: string, data: any): Promise<any>;
  updateResourceTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteResourceTwin(schoolId: string, id: string): Promise<void>;

  getResourceUtilization(schoolId: string, id: string): Promise<any | null>;
  listResourceUtilization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createResourceUtilization(schoolId: string, data: any): Promise<any>;
  updateResourceUtilization(schoolId: string, id: string, data: any): Promise<any>;
  deleteResourceUtilization(schoolId: string, id: string): Promise<void>;

  getVehicleTwin(schoolId: string, id: string): Promise<any | null>;
  listVehicleTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVehicleTwin(schoolId: string, data: any): Promise<any>;
  updateVehicleTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteVehicleTwin(schoolId: string, id: string): Promise<void>;

  getVehicleGPS(schoolId: string, id: string): Promise<any | null>;
  listVehicleGPS(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVehicleGPS(schoolId: string, data: any): Promise<any>;
  updateVehicleGPS(schoolId: string, id: string, data: any): Promise<any>;
  deleteVehicleGPS(schoolId: string, id: string): Promise<void>;

  getVehicleMaintenance(schoolId: string, id: string): Promise<any | null>;
  listVehicleMaintenance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createVehicleMaintenance(schoolId: string, data: any): Promise<any>;
  updateVehicleMaintenance(schoolId: string, id: string, data: any): Promise<any>;
  deleteVehicleMaintenance(schoolId: string, id: string): Promise<void>;

  getLaboratoryTwin(schoolId: string, id: string): Promise<any | null>;
  listLaboratoryTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLaboratoryTwin(schoolId: string, data: any): Promise<any>;
  updateLaboratoryTwin(schoolId: string, id: string, data: any): Promise<any>;
  deleteLaboratoryTwin(schoolId: string, id: string): Promise<void>;

  getLabEquipment(schoolId: string, id: string): Promise<any | null>;
  listLabEquipment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLabEquipment(schoolId: string, data: any): Promise<any>;
  updateLabEquipment(schoolId: string, id: string, data: any): Promise<any>;
  deleteLabEquipment(schoolId: string, id: string): Promise<void>;

  getLabSchedule(schoolId: string, id: string): Promise<any | null>;
  listLabSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLabSchedule(schoolId: string, data: any): Promise<any>;
  updateLabSchedule(schoolId: string, id: string, data: any): Promise<any>;
  deleteLabSchedule(schoolId: string, id: string): Promise<void>;

  getSimulation(schoolId: string, id: string): Promise<any | null>;
  listSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulation(schoolId: string, data: any): Promise<any>;
  updateSimulation(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulation(schoolId: string, id: string): Promise<void>;

  getSimulationConfig(schoolId: string, id: string): Promise<any | null>;
  listSimulationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationConfig(schoolId: string, data: any): Promise<any>;
  updateSimulationConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationConfig(schoolId: string, id: string): Promise<void>;

  getSimulationVariable(schoolId: string, id: string): Promise<any | null>;
  listSimulationVariable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationVariable(schoolId: string, data: any): Promise<any>;
  updateSimulationVariable(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationVariable(schoolId: string, id: string): Promise<void>;

  getSimulationConstraint(schoolId: string, id: string): Promise<any | null>;
  listSimulationConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationConstraint(schoolId: string, data: any): Promise<any>;
  updateSimulationConstraint(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationConstraint(schoolId: string, id: string): Promise<void>;

  getSimulationResult(schoolId: string, id: string): Promise<any | null>;
  listSimulationResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationResult(schoolId: string, data: any): Promise<any>;
  updateSimulationResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationResult(schoolId: string, id: string): Promise<void>;

  getSimulationOutput(schoolId: string, id: string): Promise<any | null>;
  listSimulationOutput(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationOutput(schoolId: string, data: any): Promise<any>;
  updateSimulationOutput(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationOutput(schoolId: string, id: string): Promise<void>;

  getSimulationMetrics(schoolId: string, id: string): Promise<any | null>;
  listSimulationMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationMetrics(schoolId: string, data: any): Promise<any>;
  updateSimulationMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationMetrics(schoolId: string, id: string): Promise<void>;

  getSimulationComparison(schoolId: string, id: string): Promise<any | null>;
  listSimulationComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationComparison(schoolId: string, data: any): Promise<any>;
  updateSimulationComparison(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationComparison(schoolId: string, id: string): Promise<void>;

  getSimulationDifference(schoolId: string, id: string): Promise<any | null>;
  listSimulationDifference(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationDifference(schoolId: string, data: any): Promise<any>;
  updateSimulationDifference(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationDifference(schoolId: string, id: string): Promise<void>;

  getSimulationChart(schoolId: string, id: string): Promise<any | null>;
  listSimulationChart(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSimulationChart(schoolId: string, data: any): Promise<any>;
  updateSimulationChart(schoolId: string, id: string, data: any): Promise<any>;
  deleteSimulationChart(schoolId: string, id: string): Promise<void>;

  getPrediction(schoolId: string, id: string): Promise<any | null>;
  listPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPrediction(schoolId: string, data: any): Promise<any>;
  updatePrediction(schoolId: string, id: string, data: any): Promise<any>;
  deletePrediction(schoolId: string, id: string): Promise<void>;

  getPredictionInput(schoolId: string, id: string): Promise<any | null>;
  listPredictionInput(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPredictionInput(schoolId: string, data: any): Promise<any>;
  updatePredictionInput(schoolId: string, id: string, data: any): Promise<any>;
  deletePredictionInput(schoolId: string, id: string): Promise<void>;

  getPredictionOutput(schoolId: string, id: string): Promise<any | null>;
  listPredictionOutput(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPredictionOutput(schoolId: string, data: any): Promise<any>;
  updatePredictionOutput(schoolId: string, id: string, data: any): Promise<any>;
  deletePredictionOutput(schoolId: string, id: string): Promise<void>;

  getPredictionModelConfig(schoolId: string, id: string): Promise<any | null>;
  listPredictionModelConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPredictionModelConfig(schoolId: string, data: any): Promise<any>;
  updatePredictionModelConfig(schoolId: string, id: string, data: any): Promise<any>;
  deletePredictionModelConfig(schoolId: string, id: string): Promise<void>;

  getModelMetrics(schoolId: string, id: string): Promise<any | null>;
  listModelMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createModelMetrics(schoolId: string, data: any): Promise<any>;
  updateModelMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteModelMetrics(schoolId: string, id: string): Promise<void>;

  getPredictionResult(schoolId: string, id: string): Promise<any | null>;
  listPredictionResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPredictionResult(schoolId: string, data: any): Promise<any>;
  updatePredictionResult(schoolId: string, id: string, data: any): Promise<any>;
  deletePredictionResult(schoolId: string, id: string): Promise<void>;

  getTwinAlert(schoolId: string, id: string): Promise<any | null>;
  listTwinAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAlert(schoolId: string, data: any): Promise<any>;
  updateTwinAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAlert(schoolId: string, id: string): Promise<void>;

  getTwinKPI(schoolId: string, id: string): Promise<any | null>;
  listTwinKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinKPI(schoolId: string, data: any): Promise<any>;
  updateTwinKPI(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinKPI(schoolId: string, id: string): Promise<void>;

  getKPIHistory(schoolId: string, id: string): Promise<any | null>;
  listKPIHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createKPIHistory(schoolId: string, data: any): Promise<any>;
  updateKPIHistory(schoolId: string, id: string, data: any): Promise<any>;
  deleteKPIHistory(schoolId: string, id: string): Promise<void>;

  getTwinAnalytics(schoolId: string, id: string): Promise<any | null>;
  listTwinAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAnalytics(schoolId: string, data: any): Promise<any>;
  updateTwinAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAnalytics(schoolId: string, id: string): Promise<void>;

  getAnalyticsData(schoolId: string, id: string): Promise<any | null>;
  listAnalyticsData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnalyticsData(schoolId: string, data: any): Promise<any>;
  updateAnalyticsData(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnalyticsData(schoolId: string, id: string): Promise<void>;

  getAnalyticsAggregation(schoolId: string, id: string): Promise<any | null>;
  listAnalyticsAggregation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnalyticsAggregation(schoolId: string, data: any): Promise<any>;
  updateAnalyticsAggregation(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnalyticsAggregation(schoolId: string, id: string): Promise<void>;

  getAnalyticsFilter(schoolId: string, id: string): Promise<any | null>;
  listAnalyticsFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnalyticsFilter(schoolId: string, data: any): Promise<any>;
  updateAnalyticsFilter(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnalyticsFilter(schoolId: string, id: string): Promise<void>;

  getAnalyticsInsight(schoolId: string, id: string): Promise<any | null>;
  listAnalyticsInsight(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnalyticsInsight(schoolId: string, data: any): Promise<any>;
  updateAnalyticsInsight(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnalyticsInsight(schoolId: string, id: string): Promise<void>;

  getAnalyticsVisualization(schoolId: string, id: string): Promise<any | null>;
  listAnalyticsVisualization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAnalyticsVisualization(schoolId: string, data: any): Promise<any>;
  updateAnalyticsVisualization(schoolId: string, id: string, data: any): Promise<any>;
  deleteAnalyticsVisualization(schoolId: string, id: string): Promise<void>;

  getTwinMaintenance(schoolId: string, id: string): Promise<any | null>;
  listTwinMaintenance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinMaintenance(schoolId: string, data: any): Promise<any>;
  updateTwinMaintenance(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinMaintenance(schoolId: string, id: string): Promise<void>;

  getMaintenancePart(schoolId: string, id: string): Promise<any | null>;
  listMaintenancePart(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createMaintenancePart(schoolId: string, data: any): Promise<any>;
  updateMaintenancePart(schoolId: string, id: string, data: any): Promise<any>;
  deleteMaintenancePart(schoolId: string, id: string): Promise<void>;

  getTwinMaintenanceLog(schoolId: string, id: string): Promise<any | null>;
  listTwinMaintenanceLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinMaintenanceLog(schoolId: string, data: any): Promise<any>;
  updateTwinMaintenanceLog(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinMaintenanceLog(schoolId: string, id: string): Promise<void>;

  getTwinMaintenanceSchedule(schoolId: string, id: string): Promise<any | null>;
  listTwinMaintenanceSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinMaintenanceSchedule(schoolId: string, data: any): Promise<any>;
  updateTwinMaintenanceSchedule(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinMaintenanceSchedule(schoolId: string, id: string): Promise<void>;

  getTwinSensor(schoolId: string, id: string): Promise<any | null>;
  listTwinSensor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSensor(schoolId: string, data: any): Promise<any>;
  updateTwinSensor(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSensor(schoolId: string, id: string): Promise<void>;

  getSensorLocation(schoolId: string, id: string): Promise<any | null>;
  listSensorLocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSensorLocation(schoolId: string, data: any): Promise<any>;
  updateSensorLocation(schoolId: string, id: string, data: any): Promise<any>;
  deleteSensorLocation(schoolId: string, id: string): Promise<void>;

  getSensorConfig(schoolId: string, id: string): Promise<any | null>;
  listSensorConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSensorConfig(schoolId: string, data: any): Promise<any>;
  updateSensorConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteSensorConfig(schoolId: string, id: string): Promise<void>;

  getTwinSensorData(schoolId: string, id: string): Promise<any | null>;
  listTwinSensorData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSensorData(schoolId: string, data: any): Promise<any>;
  updateTwinSensorData(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSensorData(schoolId: string, id: string): Promise<void>;

  getTwinSensorAlert(schoolId: string, id: string): Promise<any | null>;
  listTwinSensorAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinSensorAlert(schoolId: string, data: any): Promise<any>;
  updateTwinSensorAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinSensorAlert(schoolId: string, id: string): Promise<void>;

  getTwinRelationshipRecord(schoolId: string, id: string): Promise<any | null>;
  listTwinRelationshipRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinRelationshipRecord(schoolId: string, data: any): Promise<any>;
  updateTwinRelationshipRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinRelationshipRecord(schoolId: string, id: string): Promise<void>;

  getTwinDependency(schoolId: string, id: string): Promise<any | null>;
  listTwinDependency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinDependency(schoolId: string, data: any): Promise<any>;
  updateTwinDependency(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinDependency(schoolId: string, id: string): Promise<void>;

  getTwinImpact(schoolId: string, id: string): Promise<any | null>;
  listTwinImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinImpact(schoolId: string, data: any): Promise<any>;
  updateTwinImpact(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinImpact(schoolId: string, id: string): Promise<void>;

  getTwinVisualization(schoolId: string, id: string): Promise<any | null>;
  listTwinVisualization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinVisualization(schoolId: string, data: any): Promise<any>;
  updateTwinVisualization(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinVisualization(schoolId: string, id: string): Promise<void>;

  getTwinDashboard(schoolId: string, id: string): Promise<any | null>;
  listTwinDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinDashboard(schoolId: string, data: any): Promise<any>;
  updateTwinDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinDashboard(schoolId: string, id: string): Promise<void>;

  getDashboardLayout(schoolId: string, id: string): Promise<any | null>;
  listDashboardLayout(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDashboardLayout(schoolId: string, data: any): Promise<any>;
  updateDashboardLayout(schoolId: string, id: string, data: any): Promise<any>;
  deleteDashboardLayout(schoolId: string, id: string): Promise<void>;

  getDashboardGrid(schoolId: string, id: string): Promise<any | null>;
  listDashboardGrid(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDashboardGrid(schoolId: string, data: any): Promise<any>;
  updateDashboardGrid(schoolId: string, id: string, data: any): Promise<any>;
  deleteDashboardGrid(schoolId: string, id: string): Promise<void>;

  getDashboardWidget(schoolId: string, id: string): Promise<any | null>;
  listDashboardWidget(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createDashboardWidget(schoolId: string, data: any): Promise<any>;
  updateDashboardWidget(schoolId: string, id: string, data: any): Promise<any>;
  deleteDashboardWidget(schoolId: string, id: string): Promise<void>;

  getTwinReport(schoolId: string, id: string): Promise<any | null>;
  listTwinReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinReport(schoolId: string, data: any): Promise<any>;
  updateTwinReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinReport(schoolId: string, id: string): Promise<void>;

  getTwinAI(schoolId: string, id: string): Promise<any | null>;
  listTwinAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAI(schoolId: string, data: any): Promise<any>;
  updateTwinAI(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAI(schoolId: string, id: string): Promise<void>;

  getTwinAIModelConfig(schoolId: string, id: string): Promise<any | null>;
  listTwinAIModelConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAIModelConfig(schoolId: string, data: any): Promise<any>;
  updateTwinAIModelConfig(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAIModelConfig(schoolId: string, id: string): Promise<void>;

  getTwinAIPrediction(schoolId: string, id: string): Promise<any | null>;
  listTwinAIPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAIPrediction(schoolId: string, data: any): Promise<any>;
  updateTwinAIPrediction(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAIPrediction(schoolId: string, id: string): Promise<void>;

  getTwinAIRecommendation(schoolId: string, id: string): Promise<any | null>;
  listTwinAIRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinAIRecommendation(schoolId: string, data: any): Promise<any>;
  updateTwinAIRecommendation(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinAIRecommendation(schoolId: string, id: string): Promise<void>;

  getTwinForecast(schoolId: string, id: string): Promise<any | null>;
  listTwinForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinForecast(schoolId: string, data: any): Promise<any>;
  updateTwinForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinForecast(schoolId: string, id: string): Promise<void>;

  getForecastValue(schoolId: string, id: string): Promise<any | null>;
  listForecastValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createForecastValue(schoolId: string, data: any): Promise<any>;
  updateForecastValue(schoolId: string, id: string, data: any): Promise<any>;
  deleteForecastValue(schoolId: string, id: string): Promise<void>;

  getTwinScenario(schoolId: string, id: string): Promise<any | null>;
  listTwinScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinScenario(schoolId: string, data: any): Promise<any>;
  updateTwinScenario(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinScenario(schoolId: string, id: string): Promise<void>;

  getTwinWhatIf(schoolId: string, id: string): Promise<any | null>;
  listTwinWhatIf(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinWhatIf(schoolId: string, data: any): Promise<any>;
  updateTwinWhatIf(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinWhatIf(schoolId: string, id: string): Promise<void>;

  getWhatIfTestValue(schoolId: string, id: string): Promise<any | null>;
  listWhatIfTestValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWhatIfTestValue(schoolId: string, data: any): Promise<any>;
  updateWhatIfTestValue(schoolId: string, id: string, data: any): Promise<any>;
  deleteWhatIfTestValue(schoolId: string, id: string): Promise<void>;

  getWhatIfResult(schoolId: string, id: string): Promise<any | null>;
  listWhatIfResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWhatIfResult(schoolId: string, data: any): Promise<any>;
  updateWhatIfResult(schoolId: string, id: string, data: any): Promise<any>;
  deleteWhatIfResult(schoolId: string, id: string): Promise<void>;

  getTwinPerformance(schoolId: string, id: string): Promise<any | null>;
  listTwinPerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinPerformance(schoolId: string, data: any): Promise<any>;
  updateTwinPerformance(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinPerformance(schoolId: string, id: string): Promise<void>;

  getPerformanceMetric(schoolId: string, id: string): Promise<any | null>;
  listPerformanceMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceMetric(schoolId: string, data: any): Promise<any>;
  updatePerformanceMetric(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceMetric(schoolId: string, id: string): Promise<void>;

  getPerformanceHistory(schoolId: string, id: string): Promise<any | null>;
  listPerformanceHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createPerformanceHistory(schoolId: string, data: any): Promise<any>;
  updatePerformanceHistory(schoolId: string, id: string, data: any): Promise<any>;
  deletePerformanceHistory(schoolId: string, id: string): Promise<void>;

  getTwinCapacity(schoolId: string, id: string): Promise<any | null>;
  listTwinCapacity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createTwinCapacity(schoolId: string, data: any): Promise<any>;
  updateTwinCapacity(schoolId: string, id: string, data: any): Promise<any>;
  deleteTwinCapacity(schoolId: string, id: string): Promise<void>;

}

class SimulationModuleRepositoryImpl implements SimulationModuleRepository {
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
  async getBaseTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('base_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBaseTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('base_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBaseTwinError(error.message);
    return data ?? [];
  }

  async createBaseTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('base_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBaseTwinError(error.message);
    return result;
  }

  async updateBaseTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('base_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBaseTwinError(error.message);
    return result;
  }

  async deleteBaseTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('base_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBaseTwinError(error.message);
  }

  async getTwinSnapshot(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_snapshots')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSnapshot(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_snapshots').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSnapshotError(error.message);
    return data ?? [];
  }

  async createTwinSnapshot(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_snapshots')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSnapshotError(error.message);
    return result;
  }

  async updateTwinSnapshot(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_snapshots')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSnapshotError(error.message);
    return result;
  }

  async deleteTwinSnapshot(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_snapshots')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSnapshotError(error.message);
  }

  async getTwinHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinHistoryError(error.message);
    return data ?? [];
  }

  async createTwinHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinHistoryError(error.message);
    return result;
  }

  async updateTwinHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinHistoryError(error.message);
    return result;
  }

  async deleteTwinHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinHistoryError(error.message);
  }

  async getTwinEvent(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_events')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinEvent(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_events').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinEventError(error.message);
    return data ?? [];
  }

  async createTwinEvent(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_events')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinEventError(error.message);
    return result;
  }

  async updateTwinEvent(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_events')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinEventError(error.message);
    return result;
  }

  async deleteTwinEvent(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_events')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinEventError(error.message);
  }

  async getTwinMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinMetricError(error.message);
    return data ?? [];
  }

  async createTwinMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinMetricError(error.message);
    return result;
  }

  async updateTwinMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinMetricError(error.message);
    return result;
  }

  async deleteTwinMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinMetricError(error.message);
  }

  async getMetricThreshold(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('metric_thresholds')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMetricThreshold(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('metric_thresholds').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMetricThresholdError(error.message);
    return data ?? [];
  }

  async createMetricThreshold(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('metric_thresholds')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMetricThresholdError(error.message);
    return result;
  }

  async updateMetricThreshold(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('metric_thresholds')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMetricThresholdError(error.message);
    return result;
  }

  async deleteMetricThreshold(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('metric_thresholds')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMetricThresholdError(error.message);
  }

  async getMinistryTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ministry_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMinistryTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ministry_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMinistryTwinError(error.message);
    return data ?? [];
  }

  async createMinistryTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ministry_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMinistryTwinError(error.message);
    return result;
  }

  async updateMinistryTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ministry_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMinistryTwinError(error.message);
    return result;
  }

  async deleteMinistryTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ministry_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMinistryTwinError(error.message);
  }

  async getMinistryPolicy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('ministry_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMinistryPolicy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('ministry_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMinistryPolicyError(error.message);
    return data ?? [];
  }

  async createMinistryPolicy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('ministry_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMinistryPolicyError(error.message);
    return result;
  }

  async updateMinistryPolicy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('ministry_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMinistryPolicyError(error.message);
    return result;
  }

  async deleteMinistryPolicy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('ministry_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMinistryPolicyError(error.message);
  }

  async getRegionTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('region_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('region_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionTwinError(error.message);
    return data ?? [];
  }

  async createRegionTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('region_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionTwinError(error.message);
    return result;
  }

  async updateRegionTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('region_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionTwinError(error.message);
    return result;
  }

  async deleteRegionTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('region_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionTwinError(error.message);
  }

  async getRegionPerformance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('region_performances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRegionPerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('region_performances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRegionPerformanceError(error.message);
    return data ?? [];
  }

  async createRegionPerformance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('region_performances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRegionPerformanceError(error.message);
    return result;
  }

  async updateRegionPerformance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('region_performances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRegionPerformanceError(error.message);
    return result;
  }

  async deleteRegionPerformance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('region_performances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRegionPerformanceError(error.message);
  }

  async getSchoolTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('school_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchoolTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('school_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchoolTwinError(error.message);
    return data ?? [];
  }

  async createSchoolTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchoolTwinError(error.message);
    return result;
  }

  async updateSchoolTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('school_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchoolTwinError(error.message);
    return result;
  }

  async deleteSchoolTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchoolTwinError(error.message);
  }

  async getSchoolCapacity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('school_capacitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchoolCapacity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('school_capacitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchoolCapacityError(error.message);
    return data ?? [];
  }

  async createSchoolCapacity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_capacitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchoolCapacityError(error.message);
    return result;
  }

  async updateSchoolCapacity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('school_capacitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchoolCapacityError(error.message);
    return result;
  }

  async deleteSchoolCapacity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_capacitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchoolCapacityError(error.message);
  }

  async getSchoolAcademics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('school_academicses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchoolAcademics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('school_academicses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchoolAcademicsError(error.message);
    return data ?? [];
  }

  async createSchoolAcademics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_academicses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchoolAcademicsError(error.message);
    return result;
  }

  async updateSchoolAcademics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('school_academicses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchoolAcademicsError(error.message);
    return result;
  }

  async deleteSchoolAcademics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_academicses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchoolAcademicsError(error.message);
  }

  async getSchoolFinances(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('school_financeses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchoolFinances(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('school_financeses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchoolFinancesError(error.message);
    return data ?? [];
  }

  async createSchoolFinances(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_financeses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchoolFinancesError(error.message);
    return result;
  }

  async updateSchoolFinances(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('school_financeses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchoolFinancesError(error.message);
    return result;
  }

  async deleteSchoolFinances(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_financeses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchoolFinancesError(error.message);
  }

  async getFundingSource(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('funding_sources')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listFundingSource(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('funding_sources').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudFundingSourceError(error.message);
    return data ?? [];
  }

  async createFundingSource(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('funding_sources')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudFundingSourceError(error.message);
    return result;
  }

  async updateFundingSource(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('funding_sources')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudFundingSourceError(error.message);
    return result;
  }

  async deleteFundingSource(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('funding_sources')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudFundingSourceError(error.message);
  }

  async getSchoolInfrastructure(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('school_infrastructures')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSchoolInfrastructure(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('school_infrastructures').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSchoolInfrastructureError(error.message);
    return data ?? [];
  }

  async createSchoolInfrastructure(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('school_infrastructures')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSchoolInfrastructureError(error.message);
    return result;
  }

  async updateSchoolInfrastructure(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('school_infrastructures')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSchoolInfrastructureError(error.message);
    return result;
  }

  async deleteSchoolInfrastructure(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('school_infrastructures')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSchoolInfrastructureError(error.message);
  }

  async getCampusTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('campus_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCampusTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('campus_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCampusTwinError(error.message);
    return data ?? [];
  }

  async createCampusTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('campus_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCampusTwinError(error.message);
    return result;
  }

  async updateCampusTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('campus_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCampusTwinError(error.message);
    return result;
  }

  async deleteCampusTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('campus_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCampusTwinError(error.message);
  }

  async getCampusFacility(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('campus_facilitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCampusFacility(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('campus_facilitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCampusFacilityError(error.message);
    return data ?? [];
  }

  async createCampusFacility(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('campus_facilitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCampusFacilityError(error.message);
    return result;
  }

  async updateCampusFacility(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('campus_facilitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCampusFacilityError(error.message);
    return result;
  }

  async deleteCampusFacility(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('campus_facilitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCampusFacilityError(error.message);
  }

  async getBuildingTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('building_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBuildingTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('building_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBuildingTwinError(error.message);
    return data ?? [];
  }

  async createBuildingTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('building_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBuildingTwinError(error.message);
    return result;
  }

  async updateBuildingTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('building_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBuildingTwinError(error.message);
    return result;
  }

  async deleteBuildingTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('building_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBuildingTwinError(error.message);
  }

  async getBuildingEnergy(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('building_energys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBuildingEnergy(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('building_energys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBuildingEnergyError(error.message);
    return data ?? [];
  }

  async createBuildingEnergy(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('building_energys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBuildingEnergyError(error.message);
    return result;
  }

  async updateBuildingEnergy(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('building_energys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBuildingEnergyError(error.message);
    return result;
  }

  async deleteBuildingEnergy(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('building_energys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBuildingEnergyError(error.message);
  }

  async getBuildingSecurity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('building_securitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBuildingSecurity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('building_securitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBuildingSecurityError(error.message);
    return data ?? [];
  }

  async createBuildingSecurity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('building_securitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBuildingSecurityError(error.message);
    return result;
  }

  async updateBuildingSecurity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('building_securitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBuildingSecurityError(error.message);
    return result;
  }

  async deleteBuildingSecurity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('building_securitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBuildingSecurityError(error.message);
  }

  async getClassroomTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('classroom_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listClassroomTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('classroom_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudClassroomTwinError(error.message);
    return data ?? [];
  }

  async createClassroomTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('classroom_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudClassroomTwinError(error.message);
    return result;
  }

  async updateClassroomTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('classroom_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudClassroomTwinError(error.message);
    return result;
  }

  async deleteClassroomTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('classroom_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudClassroomTwinError(error.message);
  }

  async getClassroomEquipment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('classroom_equipments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listClassroomEquipment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('classroom_equipments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudClassroomEquipmentError(error.message);
    return data ?? [];
  }

  async createClassroomEquipment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('classroom_equipments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudClassroomEquipmentError(error.message);
    return result;
  }

  async updateClassroomEquipment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('classroom_equipments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudClassroomEquipmentError(error.message);
    return result;
  }

  async deleteClassroomEquipment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('classroom_equipments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudClassroomEquipmentError(error.message);
  }

  async getClassroomEnvironment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('classroom_environments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listClassroomEnvironment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('classroom_environments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudClassroomEnvironmentError(error.message);
    return data ?? [];
  }

  async createClassroomEnvironment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('classroom_environments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudClassroomEnvironmentError(error.message);
    return result;
  }

  async updateClassroomEnvironment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('classroom_environments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudClassroomEnvironmentError(error.message);
    return result;
  }

  async deleteClassroomEnvironment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('classroom_environments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudClassroomEnvironmentError(error.message);
  }

  async getClassroomSchedule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('classroom_schedules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listClassroomSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('classroom_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudClassroomScheduleError(error.message);
    return data ?? [];
  }

  async createClassroomSchedule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('classroom_schedules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudClassroomScheduleError(error.message);
    return result;
  }

  async updateClassroomSchedule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('classroom_schedules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudClassroomScheduleError(error.message);
    return result;
  }

  async deleteClassroomSchedule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('classroom_schedules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudClassroomScheduleError(error.message);
  }

  async getStudentTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentTwinError(error.message);
    return data ?? [];
  }

  async createStudentTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentTwinError(error.message);
    return result;
  }

  async updateStudentTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentTwinError(error.message);
    return result;
  }

  async deleteStudentTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentTwinError(error.message);
  }

  async getStudentPerformance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_performances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentPerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_performances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentPerformanceError(error.message);
    return data ?? [];
  }

  async createStudentPerformance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_performances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentPerformanceError(error.message);
    return result;
  }

  async updateStudentPerformance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_performances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentPerformanceError(error.message);
    return result;
  }

  async deleteStudentPerformance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_performances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentPerformanceError(error.message);
  }

  async getSubjectScore(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('subject_scores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSubjectScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('subject_scores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSubjectScoreError(error.message);
    return data ?? [];
  }

  async createSubjectScore(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('subject_scores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSubjectScoreError(error.message);
    return result;
  }

  async updateSubjectScore(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('subject_scores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSubjectScoreError(error.message);
    return result;
  }

  async deleteSubjectScore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('subject_scores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSubjectScoreError(error.message);
  }

  async getStudentAttendance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_attendances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentAttendance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_attendances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentAttendanceError(error.message);
    return data ?? [];
  }

  async createStudentAttendance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_attendances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentAttendanceError(error.message);
    return result;
  }

  async updateStudentAttendance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_attendances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentAttendanceError(error.message);
    return result;
  }

  async deleteStudentAttendance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_attendances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentAttendanceError(error.message);
  }

  async getStudentBehavior(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_behaviors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentBehavior(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_behaviors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentBehaviorError(error.message);
    return data ?? [];
  }

  async createStudentBehavior(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_behaviors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentBehaviorError(error.message);
    return result;
  }

  async updateStudentBehavior(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_behaviors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentBehaviorError(error.message);
    return result;
  }

  async deleteStudentBehavior(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_behaviors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentBehaviorError(error.message);
  }

  async getStudentHealth(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('student_healths')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listStudentHealth(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('student_healths').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudStudentHealthError(error.message);
    return data ?? [];
  }

  async createStudentHealth(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('student_healths')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudStudentHealthError(error.message);
    return result;
  }

  async updateStudentHealth(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('student_healths')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudStudentHealthError(error.message);
    return result;
  }

  async deleteStudentHealth(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('student_healths')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudStudentHealthError(error.message);
  }

  async getTeacherTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherTwinError(error.message);
    return data ?? [];
  }

  async createTeacherTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherTwinError(error.message);
    return result;
  }

  async updateTeacherTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherTwinError(error.message);
    return result;
  }

  async deleteTeacherTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherTwinError(error.message);
  }

  async getTeacherPerformance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_performances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherPerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_performances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherPerformanceError(error.message);
    return data ?? [];
  }

  async createTeacherPerformance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_performances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherPerformanceError(error.message);
    return result;
  }

  async updateTeacherPerformance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_performances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherPerformanceError(error.message);
    return result;
  }

  async deleteTeacherPerformance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_performances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherPerformanceError(error.message);
  }

  async getTeacherWorkload(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_workloads')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherWorkload(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_workloads').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherWorkloadError(error.message);
    return data ?? [];
  }

  async createTeacherWorkload(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_workloads')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherWorkloadError(error.message);
    return result;
  }

  async updateTeacherWorkload(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_workloads')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherWorkloadError(error.message);
    return result;
  }

  async deleteTeacherWorkload(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_workloads')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherWorkloadError(error.message);
  }

  async getTeacherCertification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('teacher_certificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTeacherCertification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('teacher_certificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTeacherCertificationError(error.message);
    return data ?? [];
  }

  async createTeacherCertification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('teacher_certificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTeacherCertificationError(error.message);
    return result;
  }

  async updateTeacherCertification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('teacher_certificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTeacherCertificationError(error.message);
    return result;
  }

  async deleteTeacherCertification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('teacher_certificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTeacherCertificationError(error.message);
  }

  async getParentTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('parent_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listParentTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('parent_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudParentTwinError(error.message);
    return data ?? [];
  }

  async createParentTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('parent_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudParentTwinError(error.message);
    return result;
  }

  async updateParentTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('parent_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudParentTwinError(error.message);
    return result;
  }

  async deleteParentTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('parent_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudParentTwinError(error.message);
  }

  async getParentEngagement(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('parent_engagements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listParentEngagement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('parent_engagements').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudParentEngagementError(error.message);
    return data ?? [];
  }

  async createParentEngagement(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('parent_engagements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudParentEngagementError(error.message);
    return result;
  }

  async updateParentEngagement(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('parent_engagements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudParentEngagementError(error.message);
    return result;
  }

  async deleteParentEngagement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('parent_engagements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudParentEngagementError(error.message);
  }

  async getEmployeeTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employee_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmployeeTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employee_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmployeeTwinError(error.message);
    return data ?? [];
  }

  async createEmployeeTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employee_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmployeeTwinError(error.message);
    return result;
  }

  async updateEmployeeTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employee_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmployeeTwinError(error.message);
    return result;
  }

  async deleteEmployeeTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employee_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmployeeTwinError(error.message);
  }

  async getEmployeePerformance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employee_performances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmployeePerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employee_performances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmployeePerformanceError(error.message);
    return data ?? [];
  }

  async createEmployeePerformance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employee_performances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmployeePerformanceError(error.message);
    return result;
  }

  async updateEmployeePerformance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employee_performances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmployeePerformanceError(error.message);
    return result;
  }

  async deleteEmployeePerformance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employee_performances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmployeePerformanceError(error.message);
  }

  async getEmployeeAttendance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('employee_attendances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEmployeeAttendance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('employee_attendances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEmployeeAttendanceError(error.message);
    return data ?? [];
  }

  async createEmployeeAttendance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('employee_attendances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEmployeeAttendanceError(error.message);
    return result;
  }

  async updateEmployeeAttendance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('employee_attendances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEmployeeAttendanceError(error.message);
    return result;
  }

  async deleteEmployeeAttendance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('employee_attendances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEmployeeAttendanceError(error.message);
  }

  async getResourceTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('resource_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResourceTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('resource_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResourceTwinError(error.message);
    return data ?? [];
  }

  async createResourceTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('resource_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResourceTwinError(error.message);
    return result;
  }

  async updateResourceTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('resource_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResourceTwinError(error.message);
    return result;
  }

  async deleteResourceTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('resource_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResourceTwinError(error.message);
  }

  async getResourceUtilization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('resource_utilizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listResourceUtilization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('resource_utilizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudResourceUtilizationError(error.message);
    return data ?? [];
  }

  async createResourceUtilization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('resource_utilizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudResourceUtilizationError(error.message);
    return result;
  }

  async updateResourceUtilization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('resource_utilizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudResourceUtilizationError(error.message);
    return result;
  }

  async deleteResourceUtilization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('resource_utilizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudResourceUtilizationError(error.message);
  }

  async getVehicleTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('vehicle_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVehicleTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('vehicle_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVehicleTwinError(error.message);
    return data ?? [];
  }

  async createVehicleTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('vehicle_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVehicleTwinError(error.message);
    return result;
  }

  async updateVehicleTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('vehicle_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVehicleTwinError(error.message);
    return result;
  }

  async deleteVehicleTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vehicle_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVehicleTwinError(error.message);
  }

  async getVehicleGPS(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('vehicle_gpses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVehicleGPS(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('vehicle_gpses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVehicleGPSError(error.message);
    return data ?? [];
  }

  async createVehicleGPS(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('vehicle_gpses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVehicleGPSError(error.message);
    return result;
  }

  async updateVehicleGPS(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('vehicle_gpses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVehicleGPSError(error.message);
    return result;
  }

  async deleteVehicleGPS(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vehicle_gpses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVehicleGPSError(error.message);
  }

  async getVehicleMaintenance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('vehicle_maintenances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listVehicleMaintenance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('vehicle_maintenances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudVehicleMaintenanceError(error.message);
    return data ?? [];
  }

  async createVehicleMaintenance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('vehicle_maintenances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudVehicleMaintenanceError(error.message);
    return result;
  }

  async updateVehicleMaintenance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('vehicle_maintenances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudVehicleMaintenanceError(error.message);
    return result;
  }

  async deleteVehicleMaintenance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('vehicle_maintenances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudVehicleMaintenanceError(error.message);
  }

  async getLaboratoryTwin(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('laboratory_twins')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLaboratoryTwin(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('laboratory_twins').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLaboratoryTwinError(error.message);
    return data ?? [];
  }

  async createLaboratoryTwin(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('laboratory_twins')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLaboratoryTwinError(error.message);
    return result;
  }

  async updateLaboratoryTwin(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('laboratory_twins')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLaboratoryTwinError(error.message);
    return result;
  }

  async deleteLaboratoryTwin(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('laboratory_twins')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLaboratoryTwinError(error.message);
  }

  async getLabEquipment(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('lab_equipments')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLabEquipment(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('lab_equipments').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLabEquipmentError(error.message);
    return data ?? [];
  }

  async createLabEquipment(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('lab_equipments')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLabEquipmentError(error.message);
    return result;
  }

  async updateLabEquipment(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('lab_equipments')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLabEquipmentError(error.message);
    return result;
  }

  async deleteLabEquipment(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('lab_equipments')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLabEquipmentError(error.message);
  }

  async getLabSchedule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('lab_schedules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLabSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('lab_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLabScheduleError(error.message);
    return data ?? [];
  }

  async createLabSchedule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('lab_schedules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLabScheduleError(error.message);
    return result;
  }

  async updateLabSchedule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('lab_schedules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLabScheduleError(error.message);
    return result;
  }

  async deleteLabSchedule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('lab_schedules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLabScheduleError(error.message);
  }

  async getSimulation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationError(error.message);
    return data ?? [];
  }

  async createSimulation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationError(error.message);
    return result;
  }

  async updateSimulation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationError(error.message);
    return result;
  }

  async deleteSimulation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationError(error.message);
  }

  async getSimulationConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationError(error.message);
    return data ?? [];
  }

  async createSimulationConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationError(error.message);
    return result;
  }

  async updateSimulationConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationError(error.message);
    return result;
  }

  async deleteSimulationConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationError(error.message);
  }

  async getSimulationVariable(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_variables')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationVariable(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_variables').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationVariableError(error.message);
    return data ?? [];
  }

  async createSimulationVariable(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_variables')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationVariableError(error.message);
    return result;
  }

  async updateSimulationVariable(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_variables')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationVariableError(error.message);
    return result;
  }

  async deleteSimulationVariable(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_variables')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationVariableError(error.message);
  }

  async getSimulationConstraint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_constraints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationConstraint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_constraints').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationConstraintError(error.message);
    return data ?? [];
  }

  async createSimulationConstraint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_constraints')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationConstraintError(error.message);
    return result;
  }

  async updateSimulationConstraint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_constraints')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationConstraintError(error.message);
    return result;
  }

  async deleteSimulationConstraint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_constraints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationConstraintError(error.message);
  }

  async getSimulationResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationResultError(error.message);
    return data ?? [];
  }

  async createSimulationResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationResultError(error.message);
    return result;
  }

  async updateSimulationResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationResultError(error.message);
    return result;
  }

  async deleteSimulationResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationResultError(error.message);
  }

  async getSimulationOutput(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_outputs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationOutput(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_outputs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationOutputError(error.message);
    return data ?? [];
  }

  async createSimulationOutput(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_outputs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationOutputError(error.message);
    return result;
  }

  async updateSimulationOutput(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_outputs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationOutputError(error.message);
    return result;
  }

  async deleteSimulationOutput(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_outputs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationOutputError(error.message);
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

  async getSimulationComparison(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_comparisoa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationComparison(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_comparisoa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationComparisonError(error.message);
    return data ?? [];
  }

  async createSimulationComparison(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_comparisoa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationComparisonError(error.message);
    return result;
  }

  async updateSimulationComparison(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_comparisoa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationComparisonError(error.message);
    return result;
  }

  async deleteSimulationComparison(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_comparisoa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationComparisonError(error.message);
  }

  async getSimulationDifference(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_differences')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationDifference(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_differences').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationDifferenceError(error.message);
    return data ?? [];
  }

  async createSimulationDifference(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_differences')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationDifferenceError(error.message);
    return result;
  }

  async updateSimulationDifference(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_differences')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationDifferenceError(error.message);
    return result;
  }

  async deleteSimulationDifference(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_differences')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationDifferenceError(error.message);
  }

  async getSimulationChart(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('simulation_charts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSimulationChart(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('simulation_charts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSimulationChartError(error.message);
    return data ?? [];
  }

  async createSimulationChart(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('simulation_charts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSimulationChartError(error.message);
    return result;
  }

  async updateSimulationChart(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('simulation_charts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSimulationChartError(error.message);
    return result;
  }

  async deleteSimulationChart(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('simulation_charts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSimulationChartError(error.message);
  }

  async getPrediction(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('predictioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('predictioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPredictionError(error.message);
    return data ?? [];
  }

  async createPrediction(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('predictioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPredictionError(error.message);
    return result;
  }

  async updatePrediction(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('predictioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPredictionError(error.message);
    return result;
  }

  async deletePrediction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('predictioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPredictionError(error.message);
  }

  async getPredictionInput(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('prediction_inputs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPredictionInput(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('prediction_inputs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPredictionInputError(error.message);
    return data ?? [];
  }

  async createPredictionInput(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('prediction_inputs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPredictionInputError(error.message);
    return result;
  }

  async updatePredictionInput(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('prediction_inputs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPredictionInputError(error.message);
    return result;
  }

  async deletePredictionInput(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('prediction_inputs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPredictionInputError(error.message);
  }

  async getPredictionOutput(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('prediction_outputs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPredictionOutput(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('prediction_outputs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPredictionOutputError(error.message);
    return data ?? [];
  }

  async createPredictionOutput(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('prediction_outputs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPredictionOutputError(error.message);
    return result;
  }

  async updatePredictionOutput(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('prediction_outputs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPredictionOutputError(error.message);
    return result;
  }

  async deletePredictionOutput(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('prediction_outputs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPredictionOutputError(error.message);
  }

  async getPredictionModelConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('prediction_models')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPredictionModelConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('prediction_models').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPredictionModelError(error.message);
    return data ?? [];
  }

  async createPredictionModelConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('prediction_models')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPredictionModelError(error.message);
    return result;
  }

  async updatePredictionModelConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('prediction_models')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPredictionModelError(error.message);
    return result;
  }

  async deletePredictionModelConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('prediction_models')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPredictionModelError(error.message);
  }

  async getModelMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('model_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listModelMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('model_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudModelMetricsError(error.message);
    return data ?? [];
  }

  async createModelMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('model_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudModelMetricsError(error.message);
    return result;
  }

  async updateModelMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('model_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudModelMetricsError(error.message);
    return result;
  }

  async deleteModelMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('model_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudModelMetricsError(error.message);
  }

  async getPredictionResult(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('prediction_results')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPredictionResult(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('prediction_results').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPredictionResultError(error.message);
    return data ?? [];
  }

  async createPredictionResult(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('prediction_results')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPredictionResultError(error.message);
    return result;
  }

  async updatePredictionResult(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('prediction_results')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPredictionResultError(error.message);
    return result;
  }

  async deletePredictionResult(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('prediction_results')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPredictionResultError(error.message);
  }

  async getTwinAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createTwinAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAlertError(error.message);
    return result;
  }

  async updateTwinAlert(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteTwinAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAlertError(error.message);
  }

  async getTwinKPI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_kpis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinKPIError(error.message);
    return data ?? [];
  }

  async createTwinKPI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_kpis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinKPIError(error.message);
    return result;
  }

  async updateTwinKPI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_kpis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinKPIError(error.message);
    return result;
  }

  async deleteTwinKPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinKPIError(error.message);
  }

  async getKPIHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('kpihistorys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listKPIHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('kpihistorys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudKPIHistoryError(error.message);
    return data ?? [];
  }

  async createKPIHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('kpihistorys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudKPIHistoryError(error.message);
    return result;
  }

  async updateKPIHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('kpihistorys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudKPIHistoryError(error.message);
    return result;
  }

  async deleteKPIHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('kpihistorys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudKPIHistoryError(error.message);
  }

  async getTwinAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAnalyticsError(error.message);
    return data ?? [];
  }

  async createTwinAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAnalyticsError(error.message);
    return result;
  }

  async updateTwinAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAnalyticsError(error.message);
    return result;
  }

  async deleteTwinAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAnalyticsError(error.message);
  }

  async getAnalyticsData(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('analytics_datas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAnalyticsData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('analytics_datas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAnalyticsDataError(error.message);
    return data ?? [];
  }

  async createAnalyticsData(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('analytics_datas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsDataError(error.message);
    return result;
  }

  async updateAnalyticsData(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('analytics_datas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsDataError(error.message);
    return result;
  }

  async deleteAnalyticsData(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('analytics_datas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAnalyticsDataError(error.message);
  }

  async getAnalyticsAggregation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('analytics_aggregatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAnalyticsAggregation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('analytics_aggregatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAnalyticsAggregationError(error.message);
    return data ?? [];
  }

  async createAnalyticsAggregation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('analytics_aggregatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsAggregationError(error.message);
    return result;
  }

  async updateAnalyticsAggregation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('analytics_aggregatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsAggregationError(error.message);
    return result;
  }

  async deleteAnalyticsAggregation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('analytics_aggregatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAnalyticsAggregationError(error.message);
  }

  async getAnalyticsFilter(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('analytics_filters')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAnalyticsFilter(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('analytics_filters').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAnalyticsFilterError(error.message);
    return data ?? [];
  }

  async createAnalyticsFilter(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('analytics_filters')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsFilterError(error.message);
    return result;
  }

  async updateAnalyticsFilter(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('analytics_filters')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsFilterError(error.message);
    return result;
  }

  async deleteAnalyticsFilter(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('analytics_filters')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAnalyticsFilterError(error.message);
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

  async getAnalyticsVisualization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('analytics_visualizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAnalyticsVisualization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('analytics_visualizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAnalyticsVisualizationError(error.message);
    return data ?? [];
  }

  async createAnalyticsVisualization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('analytics_visualizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsVisualizationError(error.message);
    return result;
  }

  async updateAnalyticsVisualization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('analytics_visualizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAnalyticsVisualizationError(error.message);
    return result;
  }

  async deleteAnalyticsVisualization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('analytics_visualizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAnalyticsVisualizationError(error.message);
  }

  async getTwinMaintenance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_maintenances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinMaintenance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_maintenances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinMaintenanceError(error.message);
    return data ?? [];
  }

  async createTwinMaintenance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_maintenances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinMaintenanceError(error.message);
    return result;
  }

  async updateTwinMaintenance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_maintenances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinMaintenanceError(error.message);
    return result;
  }

  async deleteTwinMaintenance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_maintenances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinMaintenanceError(error.message);
  }

  async getMaintenancePart(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('maintenance_parts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listMaintenancePart(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('maintenance_parts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudMaintenancePartError(error.message);
    return data ?? [];
  }

  async createMaintenancePart(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('maintenance_parts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudMaintenancePartError(error.message);
    return result;
  }

  async updateMaintenancePart(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('maintenance_parts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudMaintenancePartError(error.message);
    return result;
  }

  async deleteMaintenancePart(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('maintenance_parts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudMaintenancePartError(error.message);
  }

  async getTwinMaintenanceLog(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_maintenance_logs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinMaintenanceLog(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_maintenance_logs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinMaintenanceLogError(error.message);
    return data ?? [];
  }

  async createTwinMaintenanceLog(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_maintenance_logs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinMaintenanceLogError(error.message);
    return result;
  }

  async updateTwinMaintenanceLog(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_maintenance_logs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinMaintenanceLogError(error.message);
    return result;
  }

  async deleteTwinMaintenanceLog(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_maintenance_logs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinMaintenanceLogError(error.message);
  }

  async getTwinMaintenanceSchedule(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_maintenance_schedules')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinMaintenanceSchedule(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_maintenance_schedules').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinMaintenanceScheduleError(error.message);
    return data ?? [];
  }

  async createTwinMaintenanceSchedule(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_maintenance_schedules')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinMaintenanceScheduleError(error.message);
    return result;
  }

  async updateTwinMaintenanceSchedule(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_maintenance_schedules')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinMaintenanceScheduleError(error.message);
    return result;
  }

  async deleteTwinMaintenanceSchedule(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_maintenance_schedules')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinMaintenanceScheduleError(error.message);
  }

  async getTwinSensor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_sensors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSensor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_sensors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSensorError(error.message);
    return data ?? [];
  }

  async createTwinSensor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_sensors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSensorError(error.message);
    return result;
  }

  async updateTwinSensor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_sensors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSensorError(error.message);
    return result;
  }

  async deleteTwinSensor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_sensors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSensorError(error.message);
  }

  async getSensorLocation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sensor_locatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSensorLocation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sensor_locatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSensorLocationError(error.message);
    return data ?? [];
  }

  async createSensorLocation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sensor_locatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSensorLocationError(error.message);
    return result;
  }

  async updateSensorLocation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sensor_locatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSensorLocationError(error.message);
    return result;
  }

  async deleteSensorLocation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sensor_locatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSensorLocationError(error.message);
  }

  async getSensorConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sensors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSensorConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sensors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSensorError(error.message);
    return data ?? [];
  }

  async createSensorConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sensors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSensorError(error.message);
    return result;
  }

  async updateSensorConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sensors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSensorError(error.message);
    return result;
  }

  async deleteSensorConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sensors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSensorError(error.message);
  }

  async getTwinSensorData(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_sensor_datas')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSensorData(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_sensor_datas').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSensorDataError(error.message);
    return data ?? [];
  }

  async createTwinSensorData(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_sensor_datas')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSensorDataError(error.message);
    return result;
  }

  async updateTwinSensorData(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_sensor_datas')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSensorDataError(error.message);
    return result;
  }

  async deleteTwinSensorData(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_sensor_datas')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSensorDataError(error.message);
  }

  async getTwinSensorAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_sensor_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinSensorAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_sensor_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinSensorAlertError(error.message);
    return data ?? [];
  }

  async createTwinSensorAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_sensor_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinSensorAlertError(error.message);
    return result;
  }

  async updateTwinSensorAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_sensor_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinSensorAlertError(error.message);
    return result;
  }

  async deleteTwinSensorAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_sensor_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinSensorAlertError(error.message);
  }

  async getTwinRelationshipRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_relationships')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinRelationshipRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_relationships').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinRelationshipError(error.message);
    return data ?? [];
  }

  async createTwinRelationshipRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_relationships')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinRelationshipError(error.message);
    return result;
  }

  async updateTwinRelationshipRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_relationships')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinRelationshipError(error.message);
    return result;
  }

  async deleteTwinRelationshipRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_relationships')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinRelationshipError(error.message);
  }

  async getTwinDependency(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_dependencys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinDependency(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_dependencys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinDependencyError(error.message);
    return data ?? [];
  }

  async createTwinDependency(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_dependencys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinDependencyError(error.message);
    return result;
  }

  async updateTwinDependency(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_dependencys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinDependencyError(error.message);
    return result;
  }

  async deleteTwinDependency(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_dependencys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinDependencyError(error.message);
  }

  async getTwinImpact(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_impacts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinImpact(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_impacts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinImpactError(error.message);
    return data ?? [];
  }

  async createTwinImpact(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_impacts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinImpactError(error.message);
    return result;
  }

  async updateTwinImpact(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_impacts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinImpactError(error.message);
    return result;
  }

  async deleteTwinImpact(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_impacts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinImpactError(error.message);
  }

  async getTwinVisualization(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_visualizatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinVisualization(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_visualizatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinVisualizationError(error.message);
    return data ?? [];
  }

  async createTwinVisualization(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_visualizatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinVisualizationError(error.message);
    return result;
  }

  async updateTwinVisualization(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_visualizatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinVisualizationError(error.message);
    return result;
  }

  async deleteTwinVisualization(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_visualizatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinVisualizationError(error.message);
  }

  async getTwinDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinDashboardError(error.message);
    return data ?? [];
  }

  async createTwinDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinDashboardError(error.message);
    return result;
  }

  async updateTwinDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinDashboardError(error.message);
    return result;
  }

  async deleteTwinDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinDashboardError(error.message);
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

  async getDashboardGrid(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('dashboard_grids')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listDashboardGrid(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('dashboard_grids').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudDashboardGridError(error.message);
    return data ?? [];
  }

  async createDashboardGrid(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('dashboard_grids')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudDashboardGridError(error.message);
    return result;
  }

  async updateDashboardGrid(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('dashboard_grids')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudDashboardGridError(error.message);
    return result;
  }

  async deleteDashboardGrid(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('dashboard_grids')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudDashboardGridError(error.message);
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

  async getTwinReport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinReportError(error.message);
    return data ?? [];
  }

  async createTwinReport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinReportError(error.message);
    return result;
  }

  async updateTwinReport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinReportError(error.message);
    return result;
  }

  async deleteTwinReport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinReportError(error.message);
  }

  async getTwinAI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_ais')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
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

  async createTwinAI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_ais')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAIError(error.message);
    return result;
  }

  async updateTwinAI(schoolId: string, id: string, data: any): Promise<any> {
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

  async deleteTwinAI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_ais')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAIError(error.message);
  }

  async getTwinAIModelConfig(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_aimodels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAIModelConfig(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_aimodels').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAIModelError(error.message);
    return data ?? [];
  }

  async createTwinAIModelConfig(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_aimodels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAIModelError(error.message);
    return result;
  }

  async updateTwinAIModelConfig(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_aimodels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAIModelError(error.message);
    return result;
  }

  async deleteTwinAIModelConfig(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_aimodels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAIModelError(error.message);
  }

  async getTwinAIPrediction(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_aipredictioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAIPrediction(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_aipredictioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAIPredictionError(error.message);
    return data ?? [];
  }

  async createTwinAIPrediction(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_aipredictioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAIPredictionError(error.message);
    return result;
  }

  async updateTwinAIPrediction(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_aipredictioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAIPredictionError(error.message);
    return result;
  }

  async deleteTwinAIPrediction(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_aipredictioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAIPredictionError(error.message);
  }

  async getTwinAIRecommendation(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_airecommendatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinAIRecommendation(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_airecommendatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinAIRecommendationError(error.message);
    return data ?? [];
  }

  async createTwinAIRecommendation(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_airecommendatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinAIRecommendationError(error.message);
    return result;
  }

  async updateTwinAIRecommendation(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_airecommendatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinAIRecommendationError(error.message);
    return result;
  }

  async deleteTwinAIRecommendation(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_airecommendatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinAIRecommendationError(error.message);
  }

  async getTwinForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinForecastError(error.message);
    return data ?? [];
  }

  async createTwinForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinForecastError(error.message);
    return result;
  }

  async updateTwinForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinForecastError(error.message);
    return result;
  }

  async deleteTwinForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinForecastError(error.message);
  }

  async getForecastValue(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('forecast_values')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listForecastValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('forecast_values').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudForecastValueError(error.message);
    return data ?? [];
  }

  async createForecastValue(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('forecast_values')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudForecastValueError(error.message);
    return result;
  }

  async updateForecastValue(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('forecast_values')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudForecastValueError(error.message);
    return result;
  }

  async deleteForecastValue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('forecast_values')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudForecastValueError(error.message);
  }

  async getTwinScenario(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_scenarios')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinScenario(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_scenarios').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinScenarioError(error.message);
    return data ?? [];
  }

  async createTwinScenario(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_scenarios')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinScenarioError(error.message);
    return result;
  }

  async updateTwinScenario(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_scenarios')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinScenarioError(error.message);
    return result;
  }

  async deleteTwinScenario(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_scenarios')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinScenarioError(error.message);
  }

  async getTwinWhatIf(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_what_ifs')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinWhatIf(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_what_ifs').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinWhatIfError(error.message);
    return data ?? [];
  }

  async createTwinWhatIf(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_what_ifs')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinWhatIfError(error.message);
    return result;
  }

  async updateTwinWhatIf(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_what_ifs')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinWhatIfError(error.message);
    return result;
  }

  async deleteTwinWhatIf(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_what_ifs')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinWhatIfError(error.message);
  }

  async getWhatIfTestValue(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('what_if_test_values')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWhatIfTestValue(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('what_if_test_values').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWhatIfTestValueError(error.message);
    return data ?? [];
  }

  async createWhatIfTestValue(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('what_if_test_values')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWhatIfTestValueError(error.message);
    return result;
  }

  async updateWhatIfTestValue(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('what_if_test_values')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWhatIfTestValueError(error.message);
    return result;
  }

  async deleteWhatIfTestValue(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('what_if_test_values')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWhatIfTestValueError(error.message);
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

  async getTwinPerformance(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_performances')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinPerformance(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_performances').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinPerformanceError(error.message);
    return data ?? [];
  }

  async createTwinPerformance(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_performances')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinPerformanceError(error.message);
    return result;
  }

  async updateTwinPerformance(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_performances')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinPerformanceError(error.message);
    return result;
  }

  async deleteTwinPerformance(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_performances')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinPerformanceError(error.message);
  }

  async getPerformanceMetric(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_metrics')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceMetric(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_metrics').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceMetricError(error.message);
    return data ?? [];
  }

  async createPerformanceMetric(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_metrics')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceMetricError(error.message);
    return result;
  }

  async updatePerformanceMetric(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_metrics')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceMetricError(error.message);
    return result;
  }

  async deletePerformanceMetric(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_metrics')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceMetricError(error.message);
  }

  async getPerformanceHistory(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('performance_historys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listPerformanceHistory(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('performance_historys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudPerformanceHistoryError(error.message);
    return data ?? [];
  }

  async createPerformanceHistory(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('performance_historys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudPerformanceHistoryError(error.message);
    return result;
  }

  async updatePerformanceHistory(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('performance_historys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudPerformanceHistoryError(error.message);
    return result;
  }

  async deletePerformanceHistory(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('performance_historys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudPerformanceHistoryError(error.message);
  }

  async getTwinCapacity(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('twin_capacitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listTwinCapacity(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('twin_capacitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudTwinCapacityError(error.message);
    return data ?? [];
  }

  async createTwinCapacity(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('twin_capacitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudTwinCapacityError(error.message);
    return result;
  }

  async updateTwinCapacity(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('twin_capacitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudTwinCapacityError(error.message);
    return result;
  }

  async deleteTwinCapacity(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('twin_capacitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudTwinCapacityError(error.message);
  }

}

export function createSimulationModuleRepository(supabase: SupabaseClient): SimulationModuleRepository {
  return new SimulationModuleRepositoryImpl(supabase);
}


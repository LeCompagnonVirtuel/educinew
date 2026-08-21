import { SupabaseClient } from '@supabase/supabase-js';
import { EduCloudAirQualityMonitorError, EduCloudAirQualityReadingError, EduCloudAuditFindingError, EduCloudBiodiversitySpeciesError, EduCloudBiodiversityTrackerError, EduCloudCarbonCreditError, EduCloudCarbonEmissionError, EduCloudCarbonFootprintError, EduCloudCarbonForecastError, EduCloudCarbonOffsetError, EduCloudCircularEconomyError, EduCloudClimateActionError, EduCloudComplianceGapError, EduCloudComplianceReportError, EduCloudComplianceRequirementError, EduCloudEnergyAnalyticsError, EduCloudEnergyConsumptionError, EduCloudEnergyForecastError, EduCloudEnvironmentalAuditError, EduCloudEnvironmentalKPIError, EduCloudEnvironmentalPolicyError, EduCloudESGDashboardError, EduCloudGreenBuildingCertificationError, EduCloudGreenBuildingCreditError, EduCloudGreenCampusError, EduCloudGreenSpaceError, EduCloudGreenTransportError, EduCloudGreenTransportInitiativeError, EduCloudLandUseError, EduCloudNoiseLevelError, EduCloudNoiseMonitorError, EduCloudNoiseReadingError, EduCloudRecyclingMaterialError, EduCloudRecyclingMetricsError, EduCloudRenewableEnergyAssetError, EduCloudSocialImpactError, EduCloudSoilQualityError, EduCloudSustainabilityAlertError, EduCloudSustainabilityBenchmarkError, EduCloudSustainabilityDashboardError, EduCloudSustainabilityGoalError, EduCloudSustainabilityInitiativeError, EduCloudSustainabilityMilestoneError, EduCloudSustainabilityReportError, EduCloudSustainabilityScoreError, EduCloudSustainabilityTrendError, EduCloudSustainableProcurementError, EduCloudWasteAnalyticsError, EduCloudWasteManagementAssetError, EduCloudWasteManagementError, EduCloudWaterAnalyticsError, EduCloudWaterConservationAssetError, EduCloudWaterConsumptionError, EduCloudWaterForecastError } from '@educi/errors';

const now = () => new Date().toISOString();

export interface AIOpsModuleRepository {

  // =============================================================================
  // SUSTAINABILITY-PLATFORM
  // =============================================================================
  getESGDashboard(schoolId: string, id: string): Promise<any | null>;
  listESGDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createESGDashboard(schoolId: string, data: any): Promise<any>;
  updateESGDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteESGDashboard(schoolId: string, id: string): Promise<void>;

  getCarbonFootprint(schoolId: string, id: string): Promise<any | null>;
  listCarbonFootprint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCarbonFootprint(schoolId: string, data: any): Promise<any>;
  updateCarbonFootprint(schoolId: string, id: string, data: any): Promise<any>;
  deleteCarbonFootprint(schoolId: string, id: string): Promise<void>;

  getCarbonEmission(schoolId: string, id: string): Promise<any | null>;
  listCarbonEmission(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCarbonEmission(schoolId: string, data: any): Promise<any>;
  updateCarbonEmission(schoolId: string, id: string, data: any): Promise<any>;
  deleteCarbonEmission(schoolId: string, id: string): Promise<void>;

  getCarbonOffsetRecord(schoolId: string, id: string): Promise<any | null>;
  listCarbonOffsetRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCarbonOffsetRecord(schoolId: string, data: any): Promise<any>;
  updateCarbonOffsetRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteCarbonOffsetRecord(schoolId: string, id: string): Promise<void>;

  getEnergyAnalytics(schoolId: string, id: string): Promise<any | null>;
  listEnergyAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnergyAnalytics(schoolId: string, data: any): Promise<any>;
  updateEnergyAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnergyAnalytics(schoolId: string, id: string): Promise<void>;

  getWaterAnalytics(schoolId: string, id: string): Promise<any | null>;
  listWaterAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterAnalytics(schoolId: string, data: any): Promise<any>;
  updateWaterAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterAnalytics(schoolId: string, id: string): Promise<void>;

  getWasteAnalytics(schoolId: string, id: string): Promise<any | null>;
  listWasteAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWasteAnalytics(schoolId: string, data: any): Promise<any>;
  updateWasteAnalytics(schoolId: string, id: string, data: any): Promise<any>;
  deleteWasteAnalytics(schoolId: string, id: string): Promise<void>;

  getEnvironmentalKPI(schoolId: string, id: string): Promise<any | null>;
  listEnvironmentalKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnvironmentalKPI(schoolId: string, data: any): Promise<any>;
  updateEnvironmentalKPI(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnvironmentalKPI(schoolId: string, id: string): Promise<void>;

  getSustainabilityReportRecord(schoolId: string, id: string): Promise<any | null>;
  listSustainabilityReportRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainabilityReportRecord(schoolId: string, data: any): Promise<any>;
  updateSustainabilityReportRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainabilityReportRecord(schoolId: string, id: string): Promise<void>;

  getSustainabilityGoalRecord(schoolId: string, id: string): Promise<any | null>;
  listSustainabilityGoalRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainabilityGoalRecord(schoolId: string, data: any): Promise<any>;
  updateSustainabilityGoalRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainabilityGoalRecord(schoolId: string, id: string): Promise<void>;

  getSustainabilityMilestone(schoolId: string, id: string): Promise<any | null>;
  listSustainabilityMilestone(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainabilityMilestone(schoolId: string, data: any): Promise<any>;
  updateSustainabilityMilestone(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainabilityMilestone(schoolId: string, id: string): Promise<void>;

  getSustainabilityInitiative(schoolId: string, id: string): Promise<any | null>;
  listSustainabilityInitiative(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainabilityInitiative(schoolId: string, data: any): Promise<any>;
  updateSustainabilityInitiative(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainabilityInitiative(schoolId: string, id: string): Promise<void>;

  getGreenCampus(schoolId: string, id: string): Promise<any | null>;
  listGreenCampus(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGreenCampus(schoolId: string, data: any): Promise<any>;
  updateGreenCampus(schoolId: string, id: string, data: any): Promise<any>;
  deleteGreenCampus(schoolId: string, id: string): Promise<void>;

  getGreenBuildingCertification(schoolId: string, id: string): Promise<any | null>;
  listGreenBuildingCertification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGreenBuildingCertification(schoolId: string, data: any): Promise<any>;
  updateGreenBuildingCertification(schoolId: string, id: string, data: any): Promise<any>;
  deleteGreenBuildingCertification(schoolId: string, id: string): Promise<void>;

  getGreenBuildingCredit(schoolId: string, id: string): Promise<any | null>;
  listGreenBuildingCredit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGreenBuildingCredit(schoolId: string, data: any): Promise<any>;
  updateGreenBuildingCredit(schoolId: string, id: string, data: any): Promise<any>;
  deleteGreenBuildingCredit(schoolId: string, id: string): Promise<void>;

  getRenewableEnergyAsset(schoolId: string, id: string): Promise<any | null>;
  listRenewableEnergyAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRenewableEnergyAsset(schoolId: string, data: any): Promise<any>;
  updateRenewableEnergyAsset(schoolId: string, id: string, data: any): Promise<any>;
  deleteRenewableEnergyAsset(schoolId: string, id: string): Promise<void>;

  getEnergyConsumption(schoolId: string, id: string): Promise<any | null>;
  listEnergyConsumption(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnergyConsumption(schoolId: string, data: any): Promise<any>;
  updateEnergyConsumption(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnergyConsumption(schoolId: string, id: string): Promise<void>;

  getWaterConsumption(schoolId: string, id: string): Promise<any | null>;
  listWaterConsumption(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterConsumption(schoolId: string, data: any): Promise<any>;
  updateWaterConsumption(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterConsumption(schoolId: string, id: string): Promise<void>;

  getWasteManagement(schoolId: string, id: string): Promise<any | null>;
  listWasteManagement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWasteManagement(schoolId: string, data: any): Promise<any>;
  updateWasteManagement(schoolId: string, id: string, data: any): Promise<any>;
  deleteWasteManagement(schoolId: string, id: string): Promise<void>;

  getRecyclingMetrics(schoolId: string, id: string): Promise<any | null>;
  listRecyclingMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRecyclingMetrics(schoolId: string, data: any): Promise<any>;
  updateRecyclingMetrics(schoolId: string, id: string, data: any): Promise<any>;
  deleteRecyclingMetrics(schoolId: string, id: string): Promise<void>;

  getRecyclingMaterial(schoolId: string, id: string): Promise<any | null>;
  listRecyclingMaterial(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createRecyclingMaterial(schoolId: string, data: any): Promise<any>;
  updateRecyclingMaterial(schoolId: string, id: string, data: any): Promise<any>;
  deleteRecyclingMaterial(schoolId: string, id: string): Promise<void>;

  getCarbonForecast(schoolId: string, id: string): Promise<any | null>;
  listCarbonForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCarbonForecast(schoolId: string, data: any): Promise<any>;
  updateCarbonForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteCarbonForecast(schoolId: string, id: string): Promise<void>;

  getEnergyForecast(schoolId: string, id: string): Promise<any | null>;
  listEnergyForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnergyForecast(schoolId: string, data: any): Promise<any>;
  updateEnergyForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnergyForecast(schoolId: string, id: string): Promise<void>;

  getWaterForecast(schoolId: string, id: string): Promise<any | null>;
  listWaterForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterForecast(schoolId: string, data: any): Promise<any>;
  updateWaterForecast(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterForecast(schoolId: string, id: string): Promise<void>;

  getEnvironmentalAuditRecord(schoolId: string, id: string): Promise<any | null>;
  listEnvironmentalAuditRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnvironmentalAuditRecord(schoolId: string, data: any): Promise<any>;
  updateEnvironmentalAuditRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnvironmentalAuditRecord(schoolId: string, id: string): Promise<void>;

  getAuditFinding(schoolId: string, id: string): Promise<any | null>;
  listAuditFinding(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAuditFinding(schoolId: string, data: any): Promise<any>;
  updateAuditFinding(schoolId: string, id: string, data: any): Promise<any>;
  deleteAuditFinding(schoolId: string, id: string): Promise<void>;

  getComplianceReport(schoolId: string, id: string): Promise<any | null>;
  listComplianceReport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceReport(schoolId: string, data: any): Promise<any>;
  updateComplianceReport(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceReport(schoolId: string, id: string): Promise<void>;

  getComplianceRequirement(schoolId: string, id: string): Promise<any | null>;
  listComplianceRequirement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceRequirement(schoolId: string, data: any): Promise<any>;
  updateComplianceRequirement(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceRequirement(schoolId: string, id: string): Promise<void>;

  getComplianceGap(schoolId: string, id: string): Promise<any | null>;
  listComplianceGap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createComplianceGap(schoolId: string, data: any): Promise<any>;
  updateComplianceGap(schoolId: string, id: string, data: any): Promise<any>;
  deleteComplianceGap(schoolId: string, id: string): Promise<void>;

  getSustainabilityScore(schoolId: string, id: string): Promise<any | null>;
  listSustainabilityScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainabilityScore(schoolId: string, data: any): Promise<any>;
  updateSustainabilityScore(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainabilityScore(schoolId: string, id: string): Promise<void>;

  getBiodiversityTracker(schoolId: string, id: string): Promise<any | null>;
  listBiodiversityTracker(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBiodiversityTracker(schoolId: string, data: any): Promise<any>;
  updateBiodiversityTracker(schoolId: string, id: string, data: any): Promise<any>;
  deleteBiodiversityTracker(schoolId: string, id: string): Promise<void>;

  getBiodiversitySpecies(schoolId: string, id: string): Promise<any | null>;
  listBiodiversitySpecies(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createBiodiversitySpecies(schoolId: string, data: any): Promise<any>;
  updateBiodiversitySpecies(schoolId: string, id: string, data: any): Promise<any>;
  deleteBiodiversitySpecies(schoolId: string, id: string): Promise<void>;

  getAirQualityMonitor(schoolId: string, id: string): Promise<any | null>;
  listAirQualityMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAirQualityMonitor(schoolId: string, data: any): Promise<any>;
  updateAirQualityMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteAirQualityMonitor(schoolId: string, id: string): Promise<void>;

  getAirQualityReading(schoolId: string, id: string): Promise<any | null>;
  listAirQualityReading(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createAirQualityReading(schoolId: string, data: any): Promise<any>;
  updateAirQualityReading(schoolId: string, id: string, data: any): Promise<any>;
  deleteAirQualityReading(schoolId: string, id: string): Promise<void>;

  getNoiseMonitor(schoolId: string, id: string): Promise<any | null>;
  listNoiseMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNoiseMonitor(schoolId: string, data: any): Promise<any>;
  updateNoiseMonitor(schoolId: string, id: string, data: any): Promise<any>;
  deleteNoiseMonitor(schoolId: string, id: string): Promise<void>;

  getNoiseReading(schoolId: string, id: string): Promise<any | null>;
  listNoiseReading(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNoiseReading(schoolId: string, data: any): Promise<any>;
  updateNoiseReading(schoolId: string, id: string, data: any): Promise<any>;
  deleteNoiseReading(schoolId: string, id: string): Promise<void>;

  getGreenTransport(schoolId: string, id: string): Promise<any | null>;
  listGreenTransport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGreenTransport(schoolId: string, data: any): Promise<any>;
  updateGreenTransport(schoolId: string, id: string, data: any): Promise<any>;
  deleteGreenTransport(schoolId: string, id: string): Promise<void>;

  getSustainableProcurementRecord(schoolId: string, id: string): Promise<any | null>;
  listSustainableProcurementRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainableProcurementRecord(schoolId: string, data: any): Promise<any>;
  updateSustainableProcurementRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainableProcurementRecord(schoolId: string, id: string): Promise<void>;

  getCircularEconomyRecord(schoolId: string, id: string): Promise<any | null>;
  listCircularEconomyRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCircularEconomyRecord(schoolId: string, data: any): Promise<any>;
  updateCircularEconomyRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteCircularEconomyRecord(schoolId: string, id: string): Promise<void>;

  getSocialImpactRecord(schoolId: string, id: string): Promise<any | null>;
  listSocialImpactRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSocialImpactRecord(schoolId: string, data: any): Promise<any>;
  updateSocialImpactRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteSocialImpactRecord(schoolId: string, id: string): Promise<void>;

  getClimateActionRecord(schoolId: string, id: string): Promise<any | null>;
  listClimateActionRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createClimateActionRecord(schoolId: string, data: any): Promise<any>;
  updateClimateActionRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteClimateActionRecord(schoolId: string, id: string): Promise<void>;

  getEnvironmentalPolicyRecord(schoolId: string, id: string): Promise<any | null>;
  listEnvironmentalPolicyRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createEnvironmentalPolicyRecord(schoolId: string, data: any): Promise<any>;
  updateEnvironmentalPolicyRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteEnvironmentalPolicyRecord(schoolId: string, id: string): Promise<void>;

  getCarbonCreditRecord(schoolId: string, id: string): Promise<any | null>;
  listCarbonCreditRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createCarbonCreditRecord(schoolId: string, data: any): Promise<any>;
  updateCarbonCreditRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteCarbonCreditRecord(schoolId: string, id: string): Promise<void>;

  getSustainabilityDashboard(schoolId: string, id: string): Promise<any | null>;
  listSustainabilityDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainabilityDashboard(schoolId: string, data: any): Promise<any>;
  updateSustainabilityDashboard(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainabilityDashboard(schoolId: string, id: string): Promise<void>;

  getSustainabilityAlert(schoolId: string, id: string): Promise<any | null>;
  listSustainabilityAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainabilityAlert(schoolId: string, data: any): Promise<any>;
  updateSustainabilityAlert(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainabilityAlert(schoolId: string, id: string): Promise<void>;

  getSustainabilityTrend(schoolId: string, id: string): Promise<any | null>;
  listSustainabilityTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainabilityTrend(schoolId: string, data: any): Promise<any>;
  updateSustainabilityTrend(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainabilityTrend(schoolId: string, id: string): Promise<void>;

  getSustainabilityBenchmark(schoolId: string, id: string): Promise<any | null>;
  listSustainabilityBenchmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSustainabilityBenchmark(schoolId: string, data: any): Promise<any>;
  updateSustainabilityBenchmark(schoolId: string, id: string, data: any): Promise<any>;
  deleteSustainabilityBenchmark(schoolId: string, id: string): Promise<void>;

  getWaterConservationAsset(schoolId: string, id: string): Promise<any | null>;
  listWaterConservationAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWaterConservationAsset(schoolId: string, data: any): Promise<any>;
  updateWaterConservationAsset(schoolId: string, id: string, data: any): Promise<any>;
  deleteWaterConservationAsset(schoolId: string, id: string): Promise<void>;

  getWasteManagementAsset(schoolId: string, id: string): Promise<any | null>;
  listWasteManagementAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createWasteManagementAsset(schoolId: string, data: any): Promise<any>;
  updateWasteManagementAsset(schoolId: string, id: string, data: any): Promise<any>;
  deleteWasteManagementAsset(schoolId: string, id: string): Promise<void>;

  getGreenSpace(schoolId: string, id: string): Promise<any | null>;
  listGreenSpace(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGreenSpace(schoolId: string, data: any): Promise<any>;
  updateGreenSpace(schoolId: string, id: string, data: any): Promise<any>;
  deleteGreenSpace(schoolId: string, id: string): Promise<void>;

  getGreenTransportInitiative(schoolId: string, id: string): Promise<any | null>;
  listGreenTransportInitiative(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createGreenTransportInitiative(schoolId: string, data: any): Promise<any>;
  updateGreenTransportInitiative(schoolId: string, id: string, data: any): Promise<any>;
  deleteGreenTransportInitiative(schoolId: string, id: string): Promise<void>;

  getSoilQualityRecord(schoolId: string, id: string): Promise<any | null>;
  listSoilQualityRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createSoilQualityRecord(schoolId: string, data: any): Promise<any>;
  updateSoilQualityRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteSoilQualityRecord(schoolId: string, id: string): Promise<void>;

  getNoiseLevelRecord(schoolId: string, id: string): Promise<any | null>;
  listNoiseLevelRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createNoiseLevelRecord(schoolId: string, data: any): Promise<any>;
  updateNoiseLevelRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteNoiseLevelRecord(schoolId: string, id: string): Promise<void>;

  getLandUseRecord(schoolId: string, id: string): Promise<any | null>;
  listLandUseRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]>;
  createLandUseRecord(schoolId: string, data: any): Promise<any>;
  updateLandUseRecord(schoolId: string, id: string, data: any): Promise<any>;
  deleteLandUseRecord(schoolId: string, id: string): Promise<void>;

}

class AIOpsModuleRepositoryImpl implements AIOpsModuleRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private handleGetError(error: unknown, id: string): null {
    if (error && typeof error === 'object' && 'code' in error && (error as { code: string }).code === 'PGRST116') {
      return null;
    }
    throw new Error('GlobalCloud entity not found');
  }

  // =============================================================================
  // SUSTAINABILITY-PLATFORM
  // =============================================================================
  async getESGDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('esgdashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listESGDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('esgdashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudESGDashboardError(error.message);
    return data ?? [];
  }

  async createESGDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('esgdashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudESGDashboardError(error.message);
    return result;
  }

  async updateESGDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('esgdashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudESGDashboardError(error.message);
    return result;
  }

  async deleteESGDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('esgdashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudESGDashboardError(error.message);
  }

  async getCarbonFootprint(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('carbon_footprints')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCarbonFootprint(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('carbon_footprints').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCarbonFootprintError(error.message);
    return data ?? [];
  }

  async createCarbonFootprint(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('carbon_footprints')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCarbonFootprintError(error.message);
    return result;
  }

  async updateCarbonFootprint(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('carbon_footprints')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCarbonFootprintError(error.message);
    return result;
  }

  async deleteCarbonFootprint(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('carbon_footprints')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCarbonFootprintError(error.message);
  }

  async getCarbonEmission(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('carbon_emissioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCarbonEmission(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('carbon_emissioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCarbonEmissionError(error.message);
    return data ?? [];
  }

  async createCarbonEmission(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('carbon_emissioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCarbonEmissionError(error.message);
    return result;
  }

  async updateCarbonEmission(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('carbon_emissioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCarbonEmissionError(error.message);
    return result;
  }

  async deleteCarbonEmission(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('carbon_emissioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCarbonEmissionError(error.message);
  }

  async getCarbonOffsetRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('carbon_offsets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCarbonOffsetRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('carbon_offsets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCarbonOffsetError(error.message);
    return data ?? [];
  }

  async createCarbonOffsetRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('carbon_offsets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCarbonOffsetError(error.message);
    return result;
  }

  async updateCarbonOffsetRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('carbon_offsets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCarbonOffsetError(error.message);
    return result;
  }

  async deleteCarbonOffsetRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('carbon_offsets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCarbonOffsetError(error.message);
  }

  async getEnergyAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('energy_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnergyAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('energy_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnergyAnalyticsError(error.message);
    return data ?? [];
  }

  async createEnergyAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('energy_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnergyAnalyticsError(error.message);
    return result;
  }

  async updateEnergyAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('energy_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnergyAnalyticsError(error.message);
    return result;
  }

  async deleteEnergyAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('energy_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnergyAnalyticsError(error.message);
  }

  async getWaterAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('water_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWaterAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('water_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWaterAnalyticsError(error.message);
    return data ?? [];
  }

  async createWaterAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('water_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWaterAnalyticsError(error.message);
    return result;
  }

  async updateWaterAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('water_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWaterAnalyticsError(error.message);
    return result;
  }

  async deleteWaterAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('water_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWaterAnalyticsError(error.message);
  }

  async getWasteAnalytics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('waste_analyticses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWasteAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('waste_analyticses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWasteAnalyticsError(error.message);
    return data ?? [];
  }

  async createWasteAnalytics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('waste_analyticses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWasteAnalyticsError(error.message);
    return result;
  }

  async updateWasteAnalytics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('waste_analyticses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWasteAnalyticsError(error.message);
    return result;
  }

  async deleteWasteAnalytics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('waste_analyticses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWasteAnalyticsError(error.message);
  }

  async getEnvironmentalKPI(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('environmental_kpis')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnvironmentalKPI(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('environmental_kpis').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnvironmentalKPIError(error.message);
    return data ?? [];
  }

  async createEnvironmentalKPI(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('environmental_kpis')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalKPIError(error.message);
    return result;
  }

  async updateEnvironmentalKPI(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('environmental_kpis')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalKPIError(error.message);
    return result;
  }

  async deleteEnvironmentalKPI(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('environmental_kpis')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnvironmentalKPIError(error.message);
  }

  async getSustainabilityReportRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainability_reports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainabilityReportRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainability_reports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainabilityReportError(error.message);
    return data ?? [];
  }

  async createSustainabilityReportRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainability_reports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityReportError(error.message);
    return result;
  }

  async updateSustainabilityReportRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainability_reports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityReportError(error.message);
    return result;
  }

  async deleteSustainabilityReportRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainability_reports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainabilityReportError(error.message);
  }

  async getSustainabilityGoalRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainability_goals')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainabilityGoalRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainability_goals').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainabilityGoalError(error.message);
    return data ?? [];
  }

  async createSustainabilityGoalRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainability_goals')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityGoalError(error.message);
    return result;
  }

  async updateSustainabilityGoalRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainability_goals')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityGoalError(error.message);
    return result;
  }

  async deleteSustainabilityGoalRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainability_goals')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainabilityGoalError(error.message);
  }

  async getSustainabilityMilestone(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainability_milestones')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainabilityMilestone(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainability_milestones').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainabilityMilestoneError(error.message);
    return data ?? [];
  }

  async createSustainabilityMilestone(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainability_milestones')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityMilestoneError(error.message);
    return result;
  }

  async updateSustainabilityMilestone(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainability_milestones')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityMilestoneError(error.message);
    return result;
  }

  async deleteSustainabilityMilestone(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainability_milestones')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainabilityMilestoneError(error.message);
  }

  async getSustainabilityInitiative(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainability_initiatives')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainabilityInitiative(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainability_initiatives').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainabilityInitiativeError(error.message);
    return data ?? [];
  }

  async createSustainabilityInitiative(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainability_initiatives')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityInitiativeError(error.message);
    return result;
  }

  async updateSustainabilityInitiative(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainability_initiatives')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityInitiativeError(error.message);
    return result;
  }

  async deleteSustainabilityInitiative(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainability_initiatives')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainabilityInitiativeError(error.message);
  }

  async getGreenCampus(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('green_campuses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGreenCampus(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('green_campuses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGreenCampusError(error.message);
    return data ?? [];
  }

  async createGreenCampus(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('green_campuses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGreenCampusError(error.message);
    return result;
  }

  async updateGreenCampus(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('green_campuses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGreenCampusError(error.message);
    return result;
  }

  async deleteGreenCampus(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('green_campuses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGreenCampusError(error.message);
  }

  async getGreenBuildingCertification(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('green_building_certificatioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGreenBuildingCertification(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('green_building_certificatioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGreenBuildingCertificationError(error.message);
    return data ?? [];
  }

  async createGreenBuildingCertification(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('green_building_certificatioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGreenBuildingCertificationError(error.message);
    return result;
  }

  async updateGreenBuildingCertification(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('green_building_certificatioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGreenBuildingCertificationError(error.message);
    return result;
  }

  async deleteGreenBuildingCertification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('green_building_certificatioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGreenBuildingCertificationError(error.message);
  }

  async getGreenBuildingCredit(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('green_building_credits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGreenBuildingCredit(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('green_building_credits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGreenBuildingCreditError(error.message);
    return data ?? [];
  }

  async createGreenBuildingCredit(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('green_building_credits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGreenBuildingCreditError(error.message);
    return result;
  }

  async updateGreenBuildingCredit(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('green_building_credits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGreenBuildingCreditError(error.message);
    return result;
  }

  async deleteGreenBuildingCredit(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('green_building_credits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGreenBuildingCreditError(error.message);
  }

  async getRenewableEnergyAsset(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('renewable_energy_assets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRenewableEnergyAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('renewable_energy_assets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRenewableEnergyAssetError(error.message);
    return data ?? [];
  }

  async createRenewableEnergyAsset(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('renewable_energy_assets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRenewableEnergyAssetError(error.message);
    return result;
  }

  async updateRenewableEnergyAsset(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('renewable_energy_assets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRenewableEnergyAssetError(error.message);
    return result;
  }

  async deleteRenewableEnergyAsset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('renewable_energy_assets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRenewableEnergyAssetError(error.message);
  }

  async getEnergyConsumption(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('energy_consumptioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnergyConsumption(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('energy_consumptioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnergyConsumptionError(error.message);
    return data ?? [];
  }

  async createEnergyConsumption(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('energy_consumptioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnergyConsumptionError(error.message);
    return result;
  }

  async updateEnergyConsumption(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('energy_consumptioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnergyConsumptionError(error.message);
    return result;
  }

  async deleteEnergyConsumption(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('energy_consumptioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnergyConsumptionError(error.message);
  }

  async getWaterConsumption(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('water_consumptioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWaterConsumption(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('water_consumptioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWaterConsumptionError(error.message);
    return data ?? [];
  }

  async createWaterConsumption(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('water_consumptioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWaterConsumptionError(error.message);
    return result;
  }

  async updateWaterConsumption(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('water_consumptioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWaterConsumptionError(error.message);
    return result;
  }

  async deleteWaterConsumption(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('water_consumptioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWaterConsumptionError(error.message);
  }

  async getWasteManagement(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('waste_managements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWasteManagement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('waste_managements').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWasteManagementError(error.message);
    return data ?? [];
  }

  async createWasteManagement(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('waste_managements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWasteManagementError(error.message);
    return result;
  }

  async updateWasteManagement(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('waste_managements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWasteManagementError(error.message);
    return result;
  }

  async deleteWasteManagement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('waste_managements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWasteManagementError(error.message);
  }

  async getRecyclingMetrics(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('recycling_metricses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRecyclingMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('recycling_metricses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRecyclingMetricsError(error.message);
    return data ?? [];
  }

  async createRecyclingMetrics(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('recycling_metricses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRecyclingMetricsError(error.message);
    return result;
  }

  async updateRecyclingMetrics(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('recycling_metricses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRecyclingMetricsError(error.message);
    return result;
  }

  async deleteRecyclingMetrics(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recycling_metricses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRecyclingMetricsError(error.message);
  }

  async getRecyclingMaterial(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('recycling_materials')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listRecyclingMaterial(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('recycling_materials').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudRecyclingMaterialError(error.message);
    return data ?? [];
  }

  async createRecyclingMaterial(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('recycling_materials')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudRecyclingMaterialError(error.message);
    return result;
  }

  async updateRecyclingMaterial(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('recycling_materials')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudRecyclingMaterialError(error.message);
    return result;
  }

  async deleteRecyclingMaterial(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('recycling_materials')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudRecyclingMaterialError(error.message);
  }

  async getCarbonForecast(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('carbon_forecasts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCarbonForecast(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('carbon_forecasts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCarbonForecastError(error.message);
    return data ?? [];
  }

  async createCarbonForecast(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('carbon_forecasts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCarbonForecastError(error.message);
    return result;
  }

  async updateCarbonForecast(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('carbon_forecasts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCarbonForecastError(error.message);
    return result;
  }

  async deleteCarbonForecast(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('carbon_forecasts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCarbonForecastError(error.message);
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

  async getEnvironmentalAuditRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('environmental_audits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnvironmentalAuditRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('environmental_audits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnvironmentalAuditError(error.message);
    return data ?? [];
  }

  async createEnvironmentalAuditRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('environmental_audits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalAuditError(error.message);
    return result;
  }

  async updateEnvironmentalAuditRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('environmental_audits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalAuditError(error.message);
    return result;
  }

  async deleteEnvironmentalAuditRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('environmental_audits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnvironmentalAuditError(error.message);
  }

  async getAuditFinding(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('audit_findings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAuditFinding(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('audit_findings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAuditFindingError(error.message);
    return data ?? [];
  }

  async createAuditFinding(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('audit_findings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAuditFindingError(error.message);
    return result;
  }

  async updateAuditFinding(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('audit_findings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAuditFindingError(error.message);
    return result;
  }

  async deleteAuditFinding(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('audit_findings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAuditFindingError(error.message);
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

  async getComplianceRequirement(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('compliance_requirements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComplianceRequirement(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('compliance_requirements').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComplianceRequirementError(error.message);
    return data ?? [];
  }

  async createComplianceRequirement(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliance_requirements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComplianceRequirementError(error.message);
    return result;
  }

  async updateComplianceRequirement(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('compliance_requirements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComplianceRequirementError(error.message);
    return result;
  }

  async deleteComplianceRequirement(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_requirements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComplianceRequirementError(error.message);
  }

  async getComplianceGap(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('compliance_gaps')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listComplianceGap(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('compliance_gaps').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudComplianceGapError(error.message);
    return data ?? [];
  }

  async createComplianceGap(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('compliance_gaps')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudComplianceGapError(error.message);
    return result;
  }

  async updateComplianceGap(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('compliance_gaps')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudComplianceGapError(error.message);
    return result;
  }

  async deleteComplianceGap(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('compliance_gaps')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudComplianceGapError(error.message);
  }

  async getSustainabilityScore(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainability_scores')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainabilityScore(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainability_scores').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainabilityScoreError(error.message);
    return data ?? [];
  }

  async createSustainabilityScore(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainability_scores')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityScoreError(error.message);
    return result;
  }

  async updateSustainabilityScore(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainability_scores')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityScoreError(error.message);
    return result;
  }

  async deleteSustainabilityScore(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainability_scores')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainabilityScoreError(error.message);
  }

  async getBiodiversityTracker(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('biodiversity_trackers')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBiodiversityTracker(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('biodiversity_trackers').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBiodiversityTrackerError(error.message);
    return data ?? [];
  }

  async createBiodiversityTracker(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('biodiversity_trackers')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBiodiversityTrackerError(error.message);
    return result;
  }

  async updateBiodiversityTracker(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('biodiversity_trackers')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBiodiversityTrackerError(error.message);
    return result;
  }

  async deleteBiodiversityTracker(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('biodiversity_trackers')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBiodiversityTrackerError(error.message);
  }

  async getBiodiversitySpecies(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('biodiversity_specieses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listBiodiversitySpecies(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('biodiversity_specieses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudBiodiversitySpeciesError(error.message);
    return data ?? [];
  }

  async createBiodiversitySpecies(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('biodiversity_specieses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudBiodiversitySpeciesError(error.message);
    return result;
  }

  async updateBiodiversitySpecies(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('biodiversity_specieses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudBiodiversitySpeciesError(error.message);
    return result;
  }

  async deleteBiodiversitySpecies(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('biodiversity_specieses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudBiodiversitySpeciesError(error.message);
  }

  async getAirQualityMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('air_quality_monitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAirQualityMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('air_quality_monitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAirQualityMonitorError(error.message);
    return data ?? [];
  }

  async createAirQualityMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('air_quality_monitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAirQualityMonitorError(error.message);
    return result;
  }

  async updateAirQualityMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('air_quality_monitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAirQualityMonitorError(error.message);
    return result;
  }

  async deleteAirQualityMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('air_quality_monitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAirQualityMonitorError(error.message);
  }

  async getAirQualityReading(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('air_quality_readings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listAirQualityReading(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('air_quality_readings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudAirQualityReadingError(error.message);
    return data ?? [];
  }

  async createAirQualityReading(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('air_quality_readings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudAirQualityReadingError(error.message);
    return result;
  }

  async updateAirQualityReading(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('air_quality_readings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudAirQualityReadingError(error.message);
    return result;
  }

  async deleteAirQualityReading(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('air_quality_readings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudAirQualityReadingError(error.message);
  }

  async getNoiseMonitor(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('noise_monitors')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNoiseMonitor(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('noise_monitors').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNoiseMonitorError(error.message);
    return data ?? [];
  }

  async createNoiseMonitor(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('noise_monitors')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNoiseMonitorError(error.message);
    return result;
  }

  async updateNoiseMonitor(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('noise_monitors')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNoiseMonitorError(error.message);
    return result;
  }

  async deleteNoiseMonitor(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('noise_monitors')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNoiseMonitorError(error.message);
  }

  async getNoiseReading(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('noise_readings')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNoiseReading(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('noise_readings').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNoiseReadingError(error.message);
    return data ?? [];
  }

  async createNoiseReading(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('noise_readings')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNoiseReadingError(error.message);
    return result;
  }

  async updateNoiseReading(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('noise_readings')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNoiseReadingError(error.message);
    return result;
  }

  async deleteNoiseReading(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('noise_readings')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNoiseReadingError(error.message);
  }

  async getGreenTransport(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('green_transports')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGreenTransport(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('green_transports').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGreenTransportError(error.message);
    return data ?? [];
  }

  async createGreenTransport(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('green_transports')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGreenTransportError(error.message);
    return result;
  }

  async updateGreenTransport(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('green_transports')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGreenTransportError(error.message);
    return result;
  }

  async deleteGreenTransport(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('green_transports')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGreenTransportError(error.message);
  }

  async getSustainableProcurementRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainable_procurements')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainableProcurementRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainable_procurements').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainableProcurementError(error.message);
    return data ?? [];
  }

  async createSustainableProcurementRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainable_procurements')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainableProcurementError(error.message);
    return result;
  }

  async updateSustainableProcurementRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainable_procurements')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainableProcurementError(error.message);
    return result;
  }

  async deleteSustainableProcurementRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainable_procurements')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainableProcurementError(error.message);
  }

  async getCircularEconomyRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('circular_economys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCircularEconomyRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('circular_economys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCircularEconomyError(error.message);
    return data ?? [];
  }

  async createCircularEconomyRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('circular_economys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCircularEconomyError(error.message);
    return result;
  }

  async updateCircularEconomyRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('circular_economys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCircularEconomyError(error.message);
    return result;
  }

  async deleteCircularEconomyRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('circular_economys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCircularEconomyError(error.message);
  }

  async getSocialImpactRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('social_impacts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSocialImpactRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('social_impacts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSocialImpactError(error.message);
    return data ?? [];
  }

  async createSocialImpactRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('social_impacts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSocialImpactError(error.message);
    return result;
  }

  async updateSocialImpactRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('social_impacts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSocialImpactError(error.message);
    return result;
  }

  async deleteSocialImpactRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('social_impacts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSocialImpactError(error.message);
  }

  async getClimateActionRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('climate_actioa')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listClimateActionRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('climate_actioa').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudClimateActionError(error.message);
    return data ?? [];
  }

  async createClimateActionRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('climate_actioa')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudClimateActionError(error.message);
    return result;
  }

  async updateClimateActionRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('climate_actioa')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudClimateActionError(error.message);
    return result;
  }

  async deleteClimateActionRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('climate_actioa')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudClimateActionError(error.message);
  }

  async getEnvironmentalPolicyRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('environmental_policys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listEnvironmentalPolicyRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('environmental_policys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudEnvironmentalPolicyError(error.message);
    return data ?? [];
  }

  async createEnvironmentalPolicyRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('environmental_policys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalPolicyError(error.message);
    return result;
  }

  async updateEnvironmentalPolicyRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('environmental_policys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudEnvironmentalPolicyError(error.message);
    return result;
  }

  async deleteEnvironmentalPolicyRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('environmental_policys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudEnvironmentalPolicyError(error.message);
  }

  async getCarbonCreditRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('carbon_credits')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listCarbonCreditRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('carbon_credits').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudCarbonCreditError(error.message);
    return data ?? [];
  }

  async createCarbonCreditRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('carbon_credits')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudCarbonCreditError(error.message);
    return result;
  }

  async updateCarbonCreditRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('carbon_credits')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudCarbonCreditError(error.message);
    return result;
  }

  async deleteCarbonCreditRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('carbon_credits')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudCarbonCreditError(error.message);
  }

  async getSustainabilityDashboard(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainability_dashboards')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainabilityDashboard(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainability_dashboards').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainabilityDashboardError(error.message);
    return data ?? [];
  }

  async createSustainabilityDashboard(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainability_dashboards')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityDashboardError(error.message);
    return result;
  }

  async updateSustainabilityDashboard(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainability_dashboards')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityDashboardError(error.message);
    return result;
  }

  async deleteSustainabilityDashboard(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainability_dashboards')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainabilityDashboardError(error.message);
  }

  async getSustainabilityAlert(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainability_alerts')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainabilityAlert(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainability_alerts').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainabilityAlertError(error.message);
    return data ?? [];
  }

  async createSustainabilityAlert(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainability_alerts')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityAlertError(error.message);
    return result;
  }

  async updateSustainabilityAlert(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainability_alerts')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityAlertError(error.message);
    return result;
  }

  async deleteSustainabilityAlert(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainability_alerts')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainabilityAlertError(error.message);
  }

  async getSustainabilityTrend(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainability_trends')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainabilityTrend(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainability_trends').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainabilityTrendError(error.message);
    return data ?? [];
  }

  async createSustainabilityTrend(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainability_trends')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityTrendError(error.message);
    return result;
  }

  async updateSustainabilityTrend(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainability_trends')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityTrendError(error.message);
    return result;
  }

  async deleteSustainabilityTrend(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainability_trends')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainabilityTrendError(error.message);
  }

  async getSustainabilityBenchmark(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('sustainability_benchmarks')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSustainabilityBenchmark(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('sustainability_benchmarks').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSustainabilityBenchmarkError(error.message);
    return data ?? [];
  }

  async createSustainabilityBenchmark(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('sustainability_benchmarks')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityBenchmarkError(error.message);
    return result;
  }

  async updateSustainabilityBenchmark(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('sustainability_benchmarks')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSustainabilityBenchmarkError(error.message);
    return result;
  }

  async deleteSustainabilityBenchmark(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sustainability_benchmarks')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSustainabilityBenchmarkError(error.message);
  }

  async getWaterConservationAsset(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('water_conservation_assets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWaterConservationAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('water_conservation_assets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWaterConservationAssetError(error.message);
    return data ?? [];
  }

  async createWaterConservationAsset(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('water_conservation_assets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWaterConservationAssetError(error.message);
    return result;
  }

  async updateWaterConservationAsset(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('water_conservation_assets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWaterConservationAssetError(error.message);
    return result;
  }

  async deleteWaterConservationAsset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('water_conservation_assets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWaterConservationAssetError(error.message);
  }

  async getWasteManagementAsset(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('waste_management_assets')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listWasteManagementAsset(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('waste_management_assets').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudWasteManagementAssetError(error.message);
    return data ?? [];
  }

  async createWasteManagementAsset(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('waste_management_assets')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudWasteManagementAssetError(error.message);
    return result;
  }

  async updateWasteManagementAsset(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('waste_management_assets')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudWasteManagementAssetError(error.message);
    return result;
  }

  async deleteWasteManagementAsset(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('waste_management_assets')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudWasteManagementAssetError(error.message);
  }

  async getGreenSpace(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('green_spaces')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGreenSpace(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('green_spaces').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGreenSpaceError(error.message);
    return data ?? [];
  }

  async createGreenSpace(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('green_spaces')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGreenSpaceError(error.message);
    return result;
  }

  async updateGreenSpace(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('green_spaces')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGreenSpaceError(error.message);
    return result;
  }

  async deleteGreenSpace(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('green_spaces')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGreenSpaceError(error.message);
  }

  async getGreenTransportInitiative(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('green_transport_initiatives')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listGreenTransportInitiative(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('green_transport_initiatives').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudGreenTransportInitiativeError(error.message);
    return data ?? [];
  }

  async createGreenTransportInitiative(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('green_transport_initiatives')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudGreenTransportInitiativeError(error.message);
    return result;
  }

  async updateGreenTransportInitiative(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('green_transport_initiatives')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudGreenTransportInitiativeError(error.message);
    return result;
  }

  async deleteGreenTransportInitiative(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('green_transport_initiatives')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudGreenTransportInitiativeError(error.message);
  }

  async getSoilQualityRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('soil_qualitys')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listSoilQualityRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('soil_qualitys').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudSoilQualityError(error.message);
    return data ?? [];
  }

  async createSoilQualityRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('soil_qualitys')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudSoilQualityError(error.message);
    return result;
  }

  async updateSoilQualityRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('soil_qualitys')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudSoilQualityError(error.message);
    return result;
  }

  async deleteSoilQualityRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('soil_qualitys')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudSoilQualityError(error.message);
  }

  async getNoiseLevelRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('noise_levels')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listNoiseLevelRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('noise_levels').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudNoiseLevelError(error.message);
    return data ?? [];
  }

  async createNoiseLevelRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('noise_levels')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudNoiseLevelError(error.message);
    return result;
  }

  async updateNoiseLevelRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('noise_levels')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudNoiseLevelError(error.message);
    return result;
  }

  async deleteNoiseLevelRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('noise_levels')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudNoiseLevelError(error.message);
  }

  async getLandUseRecord(schoolId: string, id: string): Promise<any | null> {
    const { data, error } = await this.supabase
      .from('land_uses')
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .single();
    if (error) return this.handleGetError(error, id);
    return data;
  }

  async listLandUseRecord(schoolId: string, filters?: Record<string, unknown>): Promise<any[]> {
    let query = this.supabase.from('land_uses').select('*').eq('school_id', schoolId).is('deleted_at', null);
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      });
    }
    const { data, error } = await query;
    if (error) throw new EduCloudLandUseError(error.message);
    return data ?? [];
  }

  async createLandUseRecord(schoolId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const { data: result, error } = await this.supabase
      .from('land_uses')
      .insert({ ...data, school_id: schoolId, created_at: timestamp, updated_at: timestamp })
      .select()
      .single();
    if (error) throw new EduCloudLandUseError(error.message);
    return result;
  }

  async updateLandUseRecord(schoolId: string, id: string, data: any): Promise<any> {
    const { data: result, error } = await this.supabase
      .from('land_uses')
      .update({ ...data, updated_at: now() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new EduCloudLandUseError(error.message);
    return result;
  }

  async deleteLandUseRecord(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('land_uses')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new EduCloudLandUseError(error.message);
  }

}

export function createAIOpsModuleRepository(supabase: SupabaseClient): AIOpsModuleRepository {
  return new AIOpsModuleRepositoryImpl(supabase);
}


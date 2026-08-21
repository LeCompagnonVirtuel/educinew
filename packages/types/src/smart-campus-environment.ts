export enum WasteType {
  ORGANIC = 'ORGANIC',
  RECYCLABLE_PAPER = 'RECYCLABLE_PAPER',
  RECYCLABLE_PLASTIC = 'RECYCLABLE_PLASTIC',
  RECYCLABLE_GLASS = 'RECYCLABLE_GLASS',
  RECYCLABLE_METAL = 'RECYCLABLE_METAL',
  ELECTRONIC = 'ELECTRONIC',
  HAZARDOUS = 'HAZARDOUS',
  GENERAL = 'GENERAL',
  FOOD_WASTE = 'FOOD_WASTE',
  CONSTRUCTION = 'CONSTRUCTION',
  MEDICAL = 'MEDICAL',
  CHEMICAL = 'CHEMICAL',
}

export enum WasteStatus {
  COLLECTED = 'COLLECTED',
  IN_TRANSIT = 'IN_TRANSIT',
  PROCESSED = 'PROCESSED',
  RECYCLED = 'RECYCLED',
  DISPOSED = 'DISPOSED',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  OVERDUE = 'OVERDUE',
}

export enum CarbonSource {
  ELECTRICITY = 'ELECTRICITY',
  HEATING = 'HEATING',
  COOLING = 'COOLING',
  TRANSPORTATION = 'TRANSPORTATION',
  WASTE = 'WASTE',
  WATER = 'WATER',
  SUPPLY_CHAIN = 'SUPPLY_CHAIN',
  FOOD = 'FOOD',
  EQUIPMENT = 'EQUIPMENT',
}

export enum SolarPanelStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  DECOMMISSIONED = 'DECOMMISSIONED',
  ERROR = 'ERROR',
  UNDERPERFORMING = 'UNDERPERFORMING',
}

export enum EnergySavingMethod {
  LED_LIGHTING = 'LED_LIGHTING',
  MOTION_SENSORS = 'MOTION_SENSORS',
  SMART_HVAC = 'SMART_HVAC',
  INSULATION = 'INSULATION',
  SOLAR_PANELS = 'SOLAR_PANELS',
  ENERGY_AUDIT = 'ENERGY_AUDIT',
  BEHAVIORAL = 'BEHAVIORAL',
  POWER_MANAGEMENT = 'POWER_MANAGEMENT',
  NATURAL_VENTILATION = 'NATURAL_VENTILATION',
  SMART_BUILDING = 'SMART_BUILDING',
}

export enum WaterSource {
  MUNICIPAL = 'MUNICIPAL',
  WELL = 'WELL',
  RAINWATER = 'RAINWATER',
  RECYCLED = 'RECYCLED',
  RIVER = 'RIVER',
  LAKE = 'LAKE',
}

export enum ReportFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  SEMI_ANNUAL = 'SEMI_ANNUAL',
  ANNUAL = 'ANNUAL',
}

export enum RecyclingStatus {
  COLLECTED = 'COLLECTED',
  SORTED = 'SORTED',
  PROCESSED = 'PROCESSED',
  RECYCLED = 'RECYCLED',
  REJECTED = 'REJECTED',
  CONTAMINATED = 'CONTAMINATED',
}

export enum EnvironmentalGoal {
  REDUCE_CARBON = 'REDUCE_CARBON',
  INCREASE_RECYCLING = 'INCREASE_RECYCLING',
  REDUCE_WATER = 'REDUCE_WATER',
  INCREASE_SOLAR = 'INCREASE_SOLAR',
  ZERO_WASTE = 'ZERO_WASTE',
  ENERGY_EFFICIENCY = 'ENERGY_EFFICIENCY',
  BIODIVERSITY = 'BIODIVERSITY',
  SUSTAINABLE_PROCUREMENT = 'SUSTAINABLE_PROCUREMENT',
}

export enum ComplianceStatus {
  COMPLIANT = 'COMPLIANT',
  NON_COMPLIANT = 'NON_COMPLIANT',
  PARTIALLY_COMPLIANT = 'PARTIALLY_COMPLIANT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  EXEMPT = 'EXEMPT',
}

export enum WasteCategory {
  LANDFILL = 'LANDFILL',
  RECYCLING = 'RECYCLING',
  COMPOST = 'COMPOST',
  HAZARDOUS = 'HAZARDOUS',
  ELECTRONIC = 'ELECTRONIC',
  BULK = 'BULK',
}

export enum EnergySource {
  GRID = 'GRID',
  SOLAR = 'SOLAR',
  WIND = 'WIND',
  BATTERY = 'BATTERY',
  GENERATOR = 'GENERATOR',
  BIOMASS = 'BIOMASS',
  GEOTHERMAL = 'GEOTHERMAL',
}

export interface WasteManagement {
  id: string;
  school_id: string;
  waste_type: WasteType;
  waste_category: WasteCategory;
  weight_kg: number;
  volume_liters: number | null;
  collection_date: string;
  collection_point_id: string;
  building_id: string | null;
  collected_by: string;
  status: WasteStatus;
  recycling_status: RecyclingStatus | null;
  disposal_method: string;
  destination_facility: string | null;
  cost: number | null;
  notes: string | null;
  container_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface WasteManagementCreate {
  school_id: string;
  waste_type: WasteType;
  waste_category: WasteCategory;
  weight_kg: number;
  volume_liters?: number;
  collection_date: string;
  collection_point_id: string;
  building_id?: string;
  collected_by: string;
  disposal_method: string;
  destination_facility?: string;
  cost?: number;
  notes?: string;
  container_id?: string;
}

export interface WasteManagementUpdate {
  waste_type?: WasteType;
  waste_category?: WasteCategory;
  weight_kg?: number;
  volume_liters?: number;
  status?: WasteStatus;
  recycling_status?: RecyclingStatus;
  disposal_method?: string;
  destination_facility?: string;
  cost?: number;
  notes?: string;
}

export interface CarbonFootprint {
  id: string;
  school_id: string;
  source: CarbonSource;
  scope: number;
  emission_factor: number;
  activity_data: number;
  emission_kg_co2e: number;
  period_start: string;
  period_end: string;
  building_id: string | null;
  is_verified: boolean;
  verified_by: string | null;
  verified_at: string | null;
  reduction_target_kg: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CarbonFootprintCreate {
  school_id: string;
  source: CarbonSource;
  scope: number;
  emission_factor: number;
  activity_data: number;
  emission_kg_co2e: number;
  period_start: string;
  period_end: string;
  building_id?: string;
  reduction_target_kg?: number;
  notes?: string;
}

export interface SolarProduction {
  id: string;
  school_id: string;
  panel_id: string;
  panel_status: SolarPanelStatus;
  location_id: string | null;
  building_id: string | null;
  capacity_kw: number;
  current_output_kw: number;
  daily_kwh: number;
  monthly_kwh: number;
  total_lifetime_kwh: number;
  efficiency_percent: number;
  irradiance_wm2: number;
  panel_temperature_celsius: number;
  inverter_efficiency: number;
  grid_export_kwh: number;
  self_consumption_kwh: number;
  co2_avoided_kg: number;
  revenue_from_export: number;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface SolarProductionCreate {
  school_id: string;
  panel_id: string;
  panel_status: SolarPanelStatus;
  location_id?: string;
  building_id?: string;
  capacity_kw: number;
  current_output_kw?: number;
  daily_kwh?: number;
  monthly_kwh?: number;
  total_lifetime_kwh?: number;
  efficiency_percent?: number;
  irradiance_wm2?: number;
  panel_temperature_celsius?: number;
  inverter_efficiency?: number;
  grid_export_kwh?: number;
  self_consumption_kwh?: number;
  co2_avoided_kg?: number;
  revenue_from_export?: number;
  date: string;
}

export interface EnergySaving {
  id: string;
  school_id: string;
  saving_method: EnergySavingMethod;
  description: string;
  building_id: string | null;
  estimated_annual_saving_kwh: number;
  actual_saving_kwh: number;
  estimated_annual_cost_saving: number;
  actual_cost_saving: number;
  implementation_cost: number;
  payback_period_months: number;
  implementation_date: string;
  verified_by: string | null;
  verified_at: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface EnergySavingCreate {
  school_id: string;
  saving_method: EnergySavingMethod;
  description: string;
  building_id?: string;
  estimated_annual_saving_kwh: number;
  estimated_annual_cost_saving: number;
  implementation_cost: number;
  implementation_date: string;
  status?: string;
  notes?: string;
}

export interface WaterUsage {
  id: string;
  school_id: string;
  water_source: WaterSource;
  meter_id: string;
  building_id: string | null;
  consumption_liters: number;
  flow_rate_lpm: number;
  period_start: string;
  period_end: string;
  cost: number | null;
  leak_detected: boolean;
  recycled_liters: number | null;
  rainwater_harvested_liters: number | null;
  efficiency_score: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface WaterUsageCreate {
  school_id: string;
  water_source: WaterSource;
  meter_id: string;
  building_id?: string;
  consumption_liters: number;
  flow_rate_lpm?: number;
  period_start: string;
  period_end: string;
  cost?: number;
  leak_detected?: boolean;
  recycled_liters?: number;
  rainwater_harvested_liters?: number;
  notes?: string;
}

export interface EnvironmentalReport {
  id: string;
  school_id: string;
  title: string;
  report_type: string;
  report_frequency: ReportFrequency;
  period_start: string;
  period_end: string;
  carbon_summary: CarbonSummary;
  energy_summary: EnergySummary;
  water_summary: WaterSummary;
  waste_summary: WasteSummary2;
  solar_summary: SolarSummary;
  compliance_status: ComplianceStatus;
  goals_progress: GoalProgress[];
  recommendations: string[];
  generated_at: string;
  generated_by: string;
}

export interface EnvironmentalReportCreate {
  school_id: string;
  title: string;
  report_type: string;
  report_frequency: ReportFrequency;
  period_start: string;
  period_end: string;
  generated_by: string;
}

export interface CarbonSummary {
  total_emissions_kg: number;
  scope1_kg: number;
  scope2_kg: number;
  scope3_kg: number;
  by_source: Record<CarbonSource, number>;
  comparison_previous_period_percent: number;
  reduction_target_kg: number | null;
  reduction_achieved_kg: number | null;
}

export interface EnergySummary {
  total_consumption_kwh: number;
  renewable_kwh: number;
  renewable_percentage: number;
  solar_production_kwh: number;
  grid_import_kwh: number;
  grid_export_kwh: number;
  cost_total: number;
  cost_per_kwh: number;
  by_source: Record<EnergySource, number>;
  comparison_previous_period_percent: number;
}

export interface WaterSummary {
  total_consumption_liters: number;
  recycled_liters: number;
  recycled_percentage: number;
  rainwater_harvested_liters: number;
  leak_count: number;
  cost_total: number;
  cost_per_liter: number;
  comparison_previous_period_percent: number;
}

export interface WasteSummary2 {
  total_weight_kg: number;
  by_type: Record<WasteType, number>;
  by_category: Record<WasteCategory, number>;
  recycling_rate_percent: number;
  diversion_rate_percent: number;
  landfill_weight_kg: number;
  hazardous_weight_kg: number;
  cost_total: number;
  comparison_previous_period_percent: number;
}

export interface SolarSummary {
  total_production_kwh: number;
  total_capacity_kw: number;
  average_efficiency_percent: number;
  total_co2_avoided_kg: number;
  total_revenue_from_export: number;
  panel_count: number;
  active_panel_count: number;
}

export interface GoalProgress {
  goal: EnvironmentalGoal;
  target_value: number;
  current_value: number;
  unit: string;
  progress_percent: number;
  on_track: boolean;
  expected_completion_date: string | null;
}

export interface EnvironmentFilter {
  school_id: string;
  search?: string;
  source?: CarbonSource;
  building_id?: string;
  date_from?: string;
  date_to?: string;
  waste_type?: WasteType;
  waste_category?: WasteCategory;
  water_source?: WaterSource;
  energy_source?: EnergySource;
  compliance_status?: ComplianceStatus;
  min_emissions?: number;
  max_emissions?: number;
}

export interface EnvironmentalAnalytics {
  school_id: string;
  total_carbon_emissions_kg: number;
  carbon_by_source: Record<CarbonSource, number>;
  carbon_by_building: Record<string, number>;
  total_energy_kwh: number;
  energy_by_source: Record<EnergySource, number>;
  renewable_percentage: number;
  total_water_liters: number;
  water_recycled_percentage: number;
  total_waste_kg: number;
  waste_recycling_rate: number;
  waste_diversion_rate: number;
  total_solar_production_kwh: number;
  solar_co2_avoided_kg: number;
  energy_savings_kwh: number;
  cost_savings: number;
  compliance_score: number;
  goals_on_track_count: number;
  goals_total_count: number;
  period_start: string;
  period_end: string;
}

export interface EnvironmentalGoal2 {
  id: string;
  school_id: string;
  goal_type: EnvironmentalGoal;
  title: string;
  description: string;
  target_value: number;
  current_value: number;
  unit: string;
  start_date: string;
  target_date: string;
  progress_percent: number;
  on_track: boolean;
  milestones: EnvironmentalMilestone[];
  assigned_to: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentalGoalCreate {
  school_id: string;
  goal_type: EnvironmentalGoal;
  title: string;
  description: string;
  target_value: number;
  unit: string;
  start_date: string;
  target_date: string;
  assigned_to: string;
  milestones?: EnvironmentalMilestone[];
  notes?: string;
}

export interface EnvironmentalMilestone {
  milestone_id: string;
  title: string;
  target_date: string;
  target_value: number;
  current_value: number;
  is_completed: boolean;
  completed_at: string | null;
}

export interface EnvironmentalCompliance {
  id: string;
  school_id: string;
  regulation_name: string;
  regulation_body: string;
  regulation_type: string;
  description: string;
  compliance_status: ComplianceStatus;
  required_actions: string[];
  completed_actions: string[];
  evidence_documents: string[];
  last_audit_date: string;
  next_audit_date: string;
  deadline_date: string | null;
  penalty_amount: number | null;
  assigned_to: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentalComplianceCreate {
  school_id: string;
  regulation_name: string;
  regulation_body: string;
  regulation_type: string;
  description: string;
  compliance_status: ComplianceStatus;
  required_actions: string[];
  last_audit_date: string;
  next_audit_date: string;
  deadline_date?: string;
  penalty_amount?: number;
  assigned_to: string;
  notes?: string;
}

export interface WasteSchedule {
  id: string;
  school_id: string;
  waste_type: WasteType;
  waste_category: WasteCategory;
  collection_day: number;
  collection_time: string;
  collection_point_id: string;
  building_ids: string[];
  container_count: number;
  container_size_liters: number;
  is_active: boolean;
  provider_name: string | null;
  estimated_weight_kg: number;
  last_collected: string | null;
  next_collection: string;
  created_at: string;
  updated_at: string;
}

export interface EnergyAudit {
  id: string;
  school_id: string;
  audit_date: string;
  auditor_name: string;
  auditor_organization: string;
  overall_rating: string;
  total_energy_kwh: number;
  energy_cost: number;
  building_audits: BuildingEnergyAudit[];
  findings: string[];
  recommendations: EnergyAuditRecommendation[];
  potential_savings_kwh: number;
  potential_cost_savings: number;
  implementation_cost_estimate: number;
  payback_period_months: number;
  report_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BuildingEnergyAudit {
  building_id: string;
  building_name: string;
  energy_kwh: number;
  energy_per_sqm: number;
  rating: string;
  inefficiencies: string[];
}

export interface EnergyAuditRecommendation {
  recommendation_id: string;
  description: string;
  priority: string;
  estimated_saving_kwh: number;
  estimated_cost_saving: number;
  implementation_cost: number;
  payback_months: number;
}

export interface WaterAudit {
  id: string;
  school_id: string;
  audit_date: string;
  auditor_name: string;
  total_consumption_liters: number;
  total_cost: number;
  building_audits: BuildingWaterAudit[];
  leak_detection_results: LeakDetectionResult[];
  findings: string[];
  recommendations: WaterAuditRecommendation[];
  potential_savings_liters: number;
  potential_cost_savings: number;
  report_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BuildingWaterAudit {
  building_id: string;
  building_name: string;
  consumption_liters: number;
  cost: number;
  leak_count: number;
  efficiency_score: number;
}

export interface LeakDetectionResult {
  location: string;
  building_id: string;
  leak_detected: boolean;
  severity: string;
  estimated_loss_liters: number;
  repair_recommended: boolean;
}

export interface WaterAuditRecommendation {
  recommendation_id: string;
  description: string;
  priority: string;
  estimated_saving_liters: number;
  estimated_cost_saving: number;
  implementation_cost: number;
}

export interface CarbonOffset {
  id: string;
  school_id: string;
  offset_project: string;
  project_type: string;
  provider: string;
  offset_amount_tonnes: number;
  cost_per_tonne: number;
  total_cost: number;
  purchase_date: string;
  retirement_date: string | null;
  certificate_number: string;
  verification_standard: string;
  vintage_year: number;
  is_retired: boolean;
  retirement_serial: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface GreenInitiative {
  id: string;
  school_id: string;
  initiative_name: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string | null;
  budget: number;
  actual_cost: number;
  estimated_impact: string;
  actual_impact: string | null;
  status: string;
  participants_count: number;
  target_participants: number;
  coordinator_id: string;
  department_id: string | null;
  partnerships: string[];
  achievements: string[];
  media_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface EnvironmentalDashboard {
  id: string;
  school_id: string;
  name: string;
  description: string;
  widgets: EnvironmentalDashboardWidget[];
  is_default: boolean;
  refresh_interval_seconds: number;
  last_refreshed: string;
  shared_with: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentalDashboardWidget {
  widget_id: string;
  widget_type: string;
  title: string;
  data_source: string;
  metric: string;
  position: EnvironmentalWidgetPosition;
  size: EnvironmentalWidgetSize;
  config: Record<string, string>;
}

export interface EnvironmentalWidgetPosition {
  x: number;
  y: number;
}

export interface EnvironmentalWidgetSize {
  width: number;
  height: number;
}

export interface EnvironmentalConfig {
  id: string;
  school_id: string;
  carbon_reporting_enabled: boolean;
  carbon_scope: number[];
  energy_monitoring_enabled: boolean;
  water_monitoring_enabled: boolean;
  waste_tracking_enabled: boolean;
  solar_monitoring_enabled: boolean;
  reporting_frequency: ReportFrequency;
  alert_thresholds: EnvironmentalAlertThresholds;
  data_retention_days: number;
  auto_report_generation: boolean;
  compliance_tracking_enabled: boolean;
  goals_tracking_enabled: boolean;
  dashboard_refresh_seconds: number;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentalAlertThresholds {
  co2_emission_increase_percent: number;
  energy_consumption_increase_percent: number;
  water_consumption_increase_percent: number;
  waste_increase_percent: number;
  solar_efficiency_drop_percent: number;
}

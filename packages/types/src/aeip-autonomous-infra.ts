export enum BuildingType {
  MAIN = "MAIN",
  CLASSROOM_WING = "CLASSROOM_WING",
  LABORATORY = "LABORATORY",
  LIBRARY = "LIBRARY",
  ADMINISTRATION = "ADMINISTRATION",
  AUDITORIUM = "AUDITORIUM",
  GYMNASIUM = "GYMNASIUM",
  CAFETERIA = "CAFETERIA",
  DORMITORY = "DORMITORY",
  WORKSHOP = "WORKSHOP",
  SPORTS_FACILITY = "SPORTS_FACILITY",
  MEDICAL_CENTER = "MEDICAL_CENTER",
  MAINTENANCE = "MAINTENANCE",
}

export enum ClassroomConfig {
  STANDARD = "STANDARD",
  COMPUTER_LAB = "COMPUTER_LAB",
  SCIENCE_LAB = "SCIENCE_LAB",
  ART_ROOM = "ART_ROOM",
  MUSIC_ROOM = "MUSIC_ROOM",
  LIBRARY = "LIBRARY",
  CONFERENCE = "CONFERENCE",
  SMART_ROOM = "SMART_ROOM",
  FLEXIBLE = "FLEXIBLE",
  OUTDOOR = "OUTDOOR",
}

export enum FleetStatus {
  ACTIVE = "ACTIVE",
  IDLE = "IDLE",
  MAINTENANCE = "MAINTENANCE",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
  RESERVED = "RESERVED",
  IN_TRANSIT = "IN_TRANSIT",
  RETURNED = "RETURNED",
}

export enum MaintenanceType {
  PREVENTIVE = "PREVENTIVE",
  CORRECTIVE = "CORRECTIVE",
  PREDICTIVE = "PREDICTIVE",
  EMERGENCY = "EMERGENCY",
  ROUTINE = "ROUTINE",
  INSPECTION = "INSPECTION",
  OVERHAUL = "OVERHAUL",
}

export enum MaintenancePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY",
}

export enum EnergySource {
  GRID = "GRID",
  SOLAR = "SOLAR",
  WIND = "WIND",
  BATTERY = "BATTERY",
  GENERATOR = "GENERATOR",
  HYBRID = "HYBRID",
  GEOTHERMAL = "GEOTHERMAL",
}

export enum SecurityLevel {
  PUBLIC = "PUBLIC",
  RESTRICTED = "RESTRICTED",
  CONFIDENTIAL = "CONFIDENTIAL",
  SECRET = "SECRET",
  HIGH_SECURITY = "HIGH_SECURITY",
}

export enum IoTDeviceType {
  SENSOR = "SENSOR",
  ACTUATOR = "ACTUATOR",
  CAMERA = "CAMERA",
  THERMOSTAT = "THERMOSTAT",
  LIGHT_CONTROLLER = "LIGHT_CONTROLLER",
  DOOR_LOCK = "DOOR_LOCK",
  ENVIRONMENTAL_MONITOR = "ENVIRONMENTAL_MONITOR",
  ENERGY_METER = "ENERGY_METER",
  WATER_METER = "WATER_METER",
  PRESENCE_DETECTOR = "PRESENCE_DETECTOR",
  AIR_QUALITY = "AIR_QUALITY",
  NOISE_MONITOR = "NOISE_MONITOR",
}

export enum IoTProtocol {
  MQTT = "MQTT",
  COAP = "COAP",
  HTTP = "HTTP",
  WEBSOCKET = "WEBSOCKET",
  ZIGBEE = "ZIGBEE",
  ZWAVE = "ZWAVE",
  BLUETOOTH = "BLUETOOTH",
  LORA = "LORA",
  NB_IOT = "NB_IOT",
  WIFI = "WIFI",
}

export enum OptimizationMode {
  ENERGY_EFFICIENCY = "ENERGY_EFFICIENCY",
  COST_REDUCTION = "COST_REDUCTION",
  COMFORT = "COMFORT",
  SAFETY = "SAFETY",
  SUSTAINABILITY = "SUSTAINABILITY",
  PERFORMANCE = "PERFORMANCE",
  BALANCED = "BALANCED",
}

export enum PredictiveModel {
  LINEAR_REGRESSION = "LINEAR_REGRESSION",
  RANDOM_FOREST = "RANDOM_FOREST",
  NEURAL_NETWORK = "NEURAL_NETWORK",
  SVM = "SVM",
  GRADIENT_BOOSTING = "GRADIENT_BOOSTING",
  LSTM = "LSTM",
  ENSEMBLE = "ENSEMBLE",
}

export enum AlertSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY",
}

export enum ZoneType {
  CLASSROOM = "CLASSROOM",
  OFFICE = "OFFICE",
  CORRIDOR = "CORRIDOR",
  ENTRANCE = "ENTRANCE",
  PARKING = "PARKING",
  PLAYGROUND = "PLAYGROUND",
  GARDEN = "GARDEN",
  RESTRICTED = "RESTRICTED",
}

export enum VehicleType {
  BUS = "BUS",
  MINIBUS = "MINIBUS",
  VAN = "VAN",
  CAR = "CAR",
  TRUCK = "TRUCK",
  BICYCLE = "BICYCLE",
  MOTORCYCLE = "MOTORCYCLE",
}

export enum RouteStatus {
  PLANNED = "PLANNED",
  ACTIVE = "ACTIVE",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DELAYED = "DELAYED",
  CANCELLED = "CANCELLED",
}

export enum WeatherCondition {
  CLEAR = "CLEAR",
  CLOUDY = "CLOUDY",
  RAIN = "RAIN",
  HEAVY_RAIN = "HEAVY_RAIN",
  STORM = "STORM",
  FOG = "FOG",
  SNOW = "SNOW",
  EXTREME_HEAT = "EXTREME_HEAT",
}

export enum EnvironmentalMetric {
  TEMPERATURE = "TEMPERATURE",
  HUMIDITY = "HUMIDITY",
  CO2 = "CO2",
  PM25 = "PM25",
  PM10 = "PM10",
  NOISE = "NOISE",
  LIGHT = "LIGHT",
  VOC = "VOC",
}

export enum AssetCategory {
  BUILDING = "BUILDING",
  VEHICLE = "VEHICLE",
  EQUIPMENT = "EQUIPMENT",
  ELECTRONICS = "ELECTRONICS",
  FURNITURE = "FURNITURE",
  HVAC = "HVAC",
  PLUMBING = "PLUMBING",
  ELECTRICAL = "ELECTRICAL",
  SAFETY = "SAFETY",
  LANDSCAPING = "LANDSCAPING",
}

export enum InfrastructureStatus {
  OPERATIONAL = "OPERATIONAL",
  DEGRADED = "DEGRADED",
  MAINTENANCE = "MAINTENANCE",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
  EMERGENCY = "EMERGENCY",
  PLANNED_OUTAGE = "PLANNED_OUTAGE",
}

export enum WaterSource {
  MUNICIPAL = "MUNICIPAL",
  WELL = "WELL",
  RAINWATER = "RAINWATER",
  RECYCLED = "RECYCLED",
  RIVER = "RIVER",
}

export enum WasteType {
  GENERAL = "GENERAL",
  RECYCLABLE = "RECYCLABLE",
  ORGANIC = "ORGANIC",
  HAZARDOUS = "HAZARDOUS",
  ELECTRONIC = "ELECTRONIC",
  CONSTRUCTION = "CONSTRUCTION",
}

export enum ParkingZone {
  STAFF = "STAFF",
  STUDENT = "STUDENT",
  VISITOR = "VISITOR",
  HANDICAPPED = "HANDICAPPED",
  EMERGENCY = "EMERGENCY",
  BICYCLE = "BICYCLE",
}

export enum AccessMethod {
  RFID = "RFID",
  BIOMETRIC = "BIOMETRIC",
  PIN = "PIN",
  KEY_CARD = "KEY_CARD",
  MOBILE = "MOBILE",
  MANUAL = "MANUAL",
}

export interface SmartBuilding {
  id: string;
  school_id: string;
  building_name: string;
  building_type: BuildingType;
  floors: number;
  total_area_sqm: number;
  year_built: number;
  systems: BuildingSystem[];
  energy_rating: string;
  sustainability_score: number;
  ai_optimization_enabled: boolean;
  last_inspection_date: string;
  created_at: string;
  updated_at: string;
}

export interface BuildingSystem {
  id: string;
  building_id: string;
  system_name: string;
  system_type: string;
  status: string;
  efficiency_score: number;
  last_maintenance: string;
  next_maintenance: string;
  energy_consumption_kwh: number;
  ai_controlled: boolean;
  parameters: Record<string, unknown>;
}

export interface ClassroomOptimization {
  id: string;
  school_id: string;
  classroom_id: string;
  classroom_config: ClassroomConfig;
  capacity: number;
  current_occupancy: number;
  optimization_score: number;
  temperature_setting: number;
  lighting_level: number;
  air_quality_index: number;
  noise_level: number;
  schedule: ClassroomScheduleSlot[];
  ai_recommendations: ClassroomRecommendation[];
  last_optimized: string;
}

export interface ClassroomScheduleSlot {
  slot_id: string;
  start_time: string;
  end_time: string;
  subject: string;
  teacher_id: string;
  class_id: string;
  expected_students: number;
  actual_students: number;
  utilization_rate: number;
}

export interface ClassroomRecommendation {
  recommendation_type: string;
  description: string;
  expected_impact: number;
  priority: string;
  auto_implement: boolean;
}

export interface ClassroomConfigData {
  id: string;
  school_id: string;
  classroom_id: string;
  config_type: ClassroomConfig;
  equipment: ClassroomEquipment[];
  layout: string;
  accessibility_features: string[];
  technology_level: string;
  maintenance_status: string;
  last_audit: string;
}

export interface ClassroomEquipment {
  equipment_id: string;
  name: string;
  type: string;
  status: string;
  quantity: number;
  last_maintenance: string;
  ai_managed: boolean;
}

export interface FleetManagement {
  id: string;
  school_id: string;
  total_vehicles: number;
  active_vehicles: number;
  vehicles: Vehicle[];
  routes: Route[];
  fleet_efficiency_score: number;
  total_distance_km: number;
  total_fuel_cost: number;
  co2_emissions_kg: number;
  optimization_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  fleet_id: string;
  vehicle_type: VehicleType;
  license_plate: string;
  model: string;
  year: number;
  capacity: number;
  current_status: FleetStatus;
  current_location: GpsLocation;
  fuel_level: number;
  mileage_km: number;
  last_service_date: string;
  next_service_date: string;
  assigned_route_id: string | null;
  driver_id: string | null;
  ai_optimized: boolean;
}

export interface GpsLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
}

export interface Route {
  id: string;
  fleet_id: string;
  route_name: string;
  status: RouteStatus;
  stops: RouteStop[];
  total_distance_km: number;
  estimated_duration_minutes: number;
  actual_duration_minutes: number | null;
  optimized_order: string[];
  weather_conditions: WeatherCondition;
  traffic_level: string;
  student_count: number;
  created_at: string;
  updated_at: string;
}

export interface RouteStop {
  stop_id: string;
  order: number;
  name: string;
  latitude: number;
  longitude: number;
  arrival_time: string;
  departure_time: string;
  students_picked_up: number;
  students_dropped_off: number;
}

export interface MaintenanceSchedule {
  id: string;
  school_id: string;
  asset_type: AssetCategory;
  asset_id: string;
  maintenance_type: MaintenanceType;
  priority: MaintenancePriority;
  scheduled_date: string;
  completed_date: string | null;
  description: string;
  assigned_to: string;
  estimated_cost: number;
  actual_cost: number | null;
  parts_required: MaintenancePart[];
  status: string;
  ai_predicted: boolean;
  created_at: string;
  updated_at: string;
}

export interface MaintenancePart {
  part_id: string;
  part_name: string;
  quantity: number;
  unit_cost: number;
  in_stock: boolean;
  supplier: string;
}

export interface PredictiveMaintenance {
  id: string;
  school_id: string;
  asset_type: AssetCategory;
  asset_id: string;
  prediction_model: PredictiveModel;
  predicted_failure_date: string;
  confidence_score: number;
  failure_probability: number;
  remaining_useful_life_days: number;
  risk_factors: string[];
  recommended_actions: string[];
  cost_of_inaction: number;
  cost_of_prevention: number;
  last_analysis: string;
  next_analysis: string;
}

export interface EnergyOptimization {
  id: string;
  school_id: string;
  building_id: string;
  optimization_mode: OptimizationMode;
  current_consumption_kwh: number;
  optimized_consumption_kwh: number;
  savings_percentage: number;
  primary_source: EnergySource;
  renewable_percentage: number;
  carbon_offset_kg: number;
  cost_savings: number;
  schedule: EnergySchedule[];
  ai_controls: EnergyAIControl[];
  generated_at: string;
  updated_at: string;
}

export interface EnergySchedule {
  time_slot: string;
  target_consumption_kwh: number;
  actual_consumption_kwh: number;
  source_mix: Record<EnergySource, number>;
  optimization_applied: boolean;
}

export interface EnergyAIControl {
  system: string;
  current_state: string;
  optimized_state: string;
  expected_savings_kwh: number;
  auto_adjust: boolean;
}

export interface EnergyConsumption {
  id: string;
  school_id: string;
  building_id: string;
  meter_id: string;
  consumption_kwh: number;
  cost: number;
  source: EnergySource;
  timestamp: string;
  temperature_outside: number;
  occupancy_count: number;
  period_type: string;
}

export interface SecurityOptimization {
  id: string;
  school_id: string;
  security_level: SecurityLevel;
  cameras: SecurityCamera[];
  access_points: AccessPoint[];
  alerts: SecurityEvent[];
  patrol_routes: PatrolRoute[];
  ai_monitoring_enabled: boolean;
  threat_level: string;
  response_time_average_seconds: number;
  incident_count_monthly: number;
  created_at: string;
  updated_at: string;
}

export interface SecurityCamera {
  camera_id: string;
  location: string;
  zone: ZoneType;
  status: string;
  ai_analytics_enabled: boolean;
  recording_enabled: boolean;
  motion_detection: boolean;
  face_detection: boolean;
  anomaly_detection: boolean;
  resolution: string;
  last_maintenance: string;
}

export interface AccessPoint {
  point_id: string;
  location: string;
  type: string;
  status: string;
  access_level: SecurityLevel;
  rfid_enabled: boolean;
  biometric_enabled: boolean;
  ai_access_control: boolean;
  daily_usage: number;
  last_inspection: string;
}

export interface SecurityEvent {
  id: string;
  school_id: string;
  event_type: string;
  severity: AlertSeverity;
  location: string;
  zone: ZoneType;
  description: string;
  detected_at: string;
  resolved_at: string | null;
  response_time_seconds: number | null;
  assigned_to: string;
  camera_ids: string[];
  ai_confidence: number;
  status: string;
}

export interface PatrolRoute {
  route_id: string;
  route_name: string;
  checkpoints: PatrolCheckpoint[];
  frequency: string;
  assigned_guard: string;
  average_duration_minutes: number;
  completion_rate: number;
  ai_optimized: boolean;
}

export interface PatrolCheckpoint {
  checkpoint_id: string;
  location: string;
  order: number;
  expected_time: string;
  actual_time: string | null;
  status: string;
  notes: string;
}

export interface IoTDevice {
  id: string;
  school_id: string;
  building_id: string;
  device_type: IoTDeviceType;
  protocol: IoTProtocol;
  name: string;
  location: string;
  zone: ZoneType;
  status: string;
  firmware_version: string;
  battery_level: number;
  signal_strength: number;
  last_seen: string;
  ai_managed: boolean;
  configuration: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface IoTData {
  id: string;
  device_id: string;
  metric_type: EnvironmentalMetric;
  value: number;
  unit: string;
  timestamp: string;
  quality_score: number;
  is_anomaly: boolean;
  ai_processed: boolean;
}

export interface IoTAlert {
  id: string;
  device_id: string;
  alert_type: string;
  severity: AlertSeverity;
  message: string;
  metric_value: number;
  threshold: number;
  triggered_at: string;
  acknowledged_at: string | null;
  resolved_at: string | null;
  assigned_to: string;
  auto_resolved: boolean;
  ai_recommended_action: string;
}

export interface InfrastructureMetrics {
  id: string;
  school_id: string;
  period: string;
  building_count: number;
  classroom_count: number;
  total_area_sqm: number;
  energy_efficiency_score: number;
  water_efficiency_score: number;
  maintenance_score: number;
  security_score: number;
  iot_device_count: number;
  iot_uptime_percentage: number;
  total_energy_consumption_kwh: number;
  total_water_consumption_liters: number;
  total_waste_kg: number;
  sustainability_score: number;
  cost_optimization_savings: number;
  ai_optimization_score: number;
  generated_at: string;
}

export interface SmartBuildingConfig {
  id: string;
  school_id: string;
  building_id: string;
  automation_level: string;
  ai_optimization_enabled: boolean;
  energy_target_kwh: number;
  comfort_temperature_range: ComfortRange;
  lighting_automation: boolean;
  hvac_automation: boolean;
  security_automation: boolean;
  access_control_automation: boolean;
  emergency_protocols: EmergencyProtocol[];
  created_at: string;
  updated_at: string;
}

export interface ComfortRange {
  min_temperature: number;
  max_temperature: number;
  min_humidity: number;
  max_humidity: number;
}

export interface EmergencyProtocol {
  protocol_id: string;
  protocol_name: string;
  trigger_type: string;
  actions: string[];
  notification_list: string[];
  auto_execute: boolean;
  last_tested: string;
}

export interface ClassroomEnvironmentData {
  id: string;
  classroom_id: string;
  timestamp: string;
  temperature_celsius: number;
  humidity_percentage: number;
  co2_ppm: number;
  pm25_ugm3: number;
  noise_db: number;
  light_lux: number;
  occupancy_count: number;
  air_quality_index: number;
  comfort_score: number;
  ai_adjustments_made: string[];
}

export interface VehicleTracking {
  id: string;
  vehicle_id: string;
  route_id: string;
  current_location: GpsLocation;
  speed_kmh: number;
  heading: number;
  passengers_onboard: number;
  fuel_consumption_rate: number;
  eta_next_stop: string;
  deviation_from_route: boolean;
  alerts: VehicleAlert[];
  tracked_at: string;
}

export interface VehicleAlert {
  alert_id: string;
  alert_type: string;
  severity: AlertSeverity;
  message: string;
  triggered_at: string;
  speed_limit_exceeded: boolean;
  route_deviation: boolean;
}

export interface MaintenanceAnalytics {
  id: string;
  school_id: string;
  period: string;
  total_maintenance_events: number;
  preventive_count: number;
  corrective_count: number;
  emergency_count: number;
  average_downtime_hours: number;
  maintenance_cost_total: number;
  cost_per_asset: number;
  asset_utilization_rate: number;
  predictive_accuracy: number;
  ai_recommendations_accepted: number;
  generated_at: string;
}

export interface EnergyAnalytics {
  id: string;
  school_id: string;
  period: string;
  total_consumption_kwh: number;
  peak_demand_kw: number;
  renewable_percentage: number;
  carbon_emissions_kg: number;
  cost_total: number;
  cost_per_sqm: number;
  savings_from_optimization: number;
  efficiency_score: number;
  benchmark_comparison: number;
  generated_at: string;
}

export interface SecurityAnalytics {
  id: string;
  school_id: string;
  period: string;
  total_events: number;
  incidents_count: number;
  average_response_time_seconds: number;
  false_positive_rate: number;
  ai_detection_accuracy: number;
  patrol_completion_rate: number;
  access_violations: number;
  camera_uptime_percentage: number;
  threat_level: string;
  generated_at: string;
}

export interface IoTAnalytics {
  id: string;
  school_id: string;
  period: string;
  total_devices: number;
  active_devices: number;
  device_uptime_percentage: number;
  data_points_collected: number;
  anomalies_detected: number;
  alerts_triggered: number;
  auto_resolved_alerts: number;
  average_latency_ms: number;
  bandwidth_usage_gb: number;
  generated_at: string;
}

export interface InfrastructureAlert {
  id: string;
  school_id: string;
  system: string;
  alert_type: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  affected_assets: string[];
  triggered_at: string;
  acknowledged_at: string | null;
  resolved_at: string | null;
  assigned_to: string;
  resolution_notes: string;
  is_auto_resolved: boolean;
}

export interface EnvironmentalReport {
  id: string;
  school_id: string;
  period: string;
  average_temperature: number;
  average_humidity: number;
  average_co2: number;
  air_quality_status: string;
  energy_consumption_trend: number[];
  water_consumption_trend: number[];
  waste_generation_trend: number[];
  sustainability_actions: SustainabilityAction[];
  compliance_status: string;
  generated_at: string;
}

export interface SustainabilityAction {
  action_id: string;
  action_name: string;
  category: string;
  description: string;
  implementation_date: string;
  estimated_impact: number;
  actual_impact: number | null;
  status: string;
}

export interface BuildingPerformanceScore {
  id: string;
  building_id: string;
  overall_score: number;
  energy_score: number;
  comfort_score: number;
  safety_score: number;
  maintenance_score: number;
  sustainability_score: number;
  technology_score: number;
  benchmark_rank: number;
  improvement_areas: string[];
  calculated_at: string;
}

export interface WaterManagement {
  id: string;
  school_id: string;
  water_source: WaterSource;
  daily_consumption_liters: number;
  monthly_consumption_liters: number;
  cost_per_liter: number;
  leak_detected: boolean;
  recycling_percentage: number;
  irrigation_schedule: IrrigationSchedule[];
  quality_metrics: WaterQualityMetrics;
  created_at: string;
  updated_at: string;
}

export interface IrrigationSchedule {
  zone_id: string;
  zone_name: string;
  frequency: string;
  duration_minutes: number;
  water_amount_liters: number;
  ai_optimized: boolean;
  next_run: string;
}

export interface WaterQualityMetrics {
  ph_level: number;
  turbidity: number;
  chlorine_level: number;
  bacterial_count: number;
  last_tested: string;
  status: string;
}

export interface WasteManagement {
  id: string;
  school_id: string;
  waste_type: WasteType;
  daily_generation_kg: number;
  monthly_generation_kg: number;
  recycling_rate: number;
  disposal_method: string;
  collection_frequency: string;
  cost_per_kg: number;
  environmental_impact_score: number;
  created_at: string;
  updated_at: string;
}

export interface ParkingManagement {
  id: string;
  school_id: string;
  total_spaces: number;
  occupied_spaces: number;
  available_spaces: number;
  zones: ParkingZoneConfig[];
  ai_optimization_enabled: boolean;
  revenue_monthly: number;
  violation_count: number;
  created_at: string;
  updated_at: string;
}

export interface ParkingZoneConfig {
  zone: ParkingZone;
  total_spaces: number;
  occupied: number;
  rate_per_hour: number;
  time_limit_minutes: number;
}

export interface AssetManagement {
  id: string;
  school_id: string;
  asset_tag: string;
  asset_name: string;
  category: AssetCategory;
  location: string;
  purchase_date: string;
  purchase_cost: number;
  current_value: number;
  depreciation_rate: number;
  useful_life_years: number;
  status: InfrastructureStatus;
  last_maintenance: string;
  next_maintenance: string;
  warranty_expiry: string;
  assigned_to: string;
  created_at: string;
  updated_at: string;
}

export interface AccessControl {
  id: string;
  school_id: string;
  point_id: string;
  location: string;
  access_method: AccessMethod;
  security_level: SecurityLevel;
  schedule: AccessSchedule[];
  active_users: number;
  daily_transactions: number;
  last_incident: string | null;
  ai_monitoring: boolean;
  created_at: string;
  updated_at: string;
}

export interface AccessSchedule {
  day_of_week: string;
  start_time: string;
  end_time: string;
  allowed_roles: string[];
}

export interface BuildingInspection {
  id: string;
  school_id: string;
  building_id: string;
  inspection_type: string;
  inspector_id: string;
  inspection_date: string;
  findings: InspectionFinding[];
  overall_score: number;
  compliance_status: string;
  next_inspection_date: string;
  photos: string[];
  report_url: string;
}

export interface InspectionFinding {
  finding_id: string;
  category: string;
  severity: string;
  description: string;
  location: string;
  recommendation: string;
  deadline: string;
  status: string;
}

export interface ClassroomUtilization {
  id: string;
  school_id: string;
  classroom_id: string;
  period: string;
  total_slots: number;
  occupied_slots: number;
  utilization_rate: number;
  peak_hours: string[];
  empty_hours: string[];
  average_occupancy: number;
  ai_optimization_suggestions: string[];
  generated_at: string;
}

export interface SecurityIncident {
  id: string;
  school_id: string;
  incident_type: string;
  severity: AlertSeverity;
  location: string;
  zone: ZoneType;
  description: string;
  reported_by: string;
  reported_at: string;
  responded_at: string | null;
  resolved_at: string | null;
  witnesses: string[];
  evidence: string[];
  actions_taken: string[];
  status: string;
  follow_up_required: boolean;
}

export interface EmergencyEvacuation {
  id: string;
  school_id: string;
  evacuation_type: string;
  triggered_at: string;
  completed_at: string | null;
  total_occupants: number;
  evacuated_count: number;
  safe_count: number;
  missing_count: number;
  assembly_points: AssemblyPoint[];
  routes_used: string[];
  response_time_seconds: number;
  status: string;
}

export interface AssemblyPoint {
  point_id: string;
  name: string;
  location: string;
  capacity: number;
  assigned_buildings: string[];
  headcount_completed: boolean;
}

export interface InfrastructureCapacity {
  id: string;
  school_id: string;
  building_id: string;
  max_capacity: number;
  current_usage: number;
  utilization_percentage: number;
  expansion_possible: boolean;
  growth_projection: number;
  bottleneck_areas: string[];
  recommended_upgrades: string[];
  assessed_at: string;
}

export interface DigitalInfrastructure {
  id: string;
  school_id: string;
  network_speed_mbps: number;
  wifi_coverage_percentage: number;
  bandwidth_utilization: number;
  connected_devices: number;
  max_devices_supported: number;
  uptime_percentage: number;
  cybersecurity_score: number;
  backup_status: string;
  disaster_recovery_score: number;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceWorkOrder {
  id: string;
  school_id: string;
  work_order_number: string;
  asset_id: string;
  asset_category: AssetCategory;
  priority: MaintenancePriority;
  description: string;
  requested_by: string;
  assigned_to: string;
  created_at: string;
  scheduled_date: string;
  started_at: string | null;
  completed_at: string | null;
  estimated_hours: number;
  actual_hours: number | null;
  estimated_cost: number;
  actual_cost: number | null;
  parts_used: MaintenancePart[];
  status: string;
  quality_rating: number | null;
}

export interface InfrastructureHealthDashboard {
  id: string;
  school_id: string;
  overall_health_score: number;
  building_scores: BuildingHealthScore[];
  fleet_status_summary: FleetStatusSummary;
  energy_status: EnergyStatusSummary;
  security_status: SecurityStatusSummary;
  iot_status: IoTStatusSummary;
  alerts_active: number;
  maintenance_pending: number;
  generated_at: string;
}

export interface BuildingHealthScore {
  building_id: string;
  building_name: string;
  health_score: number;
  issues_count: number;
  last_inspection: string;
  next_maintenance: string;
}

export interface FleetStatusSummary {
  total_vehicles: number;
  active: number;
  maintenance: number;
  out_of_service: number;
  average_age_years: number;
  fuel_efficiency_score: number;
}

export interface EnergyStatusSummary {
  current_demand_kw: number;
  renewable_percentage: number;
  cost_today: number;
  efficiency_score: number;
  alerts: number;
}

export interface SecurityStatusSummary {
  cameras_online: number;
  cameras_total: number;
  access_points_active: number;
  incidents_today: number;
  threat_level: string;
}

export interface IoTStatusSummary {
  devices_online: number;
  devices_total: number;
  alerts_pending: number;
  data_volume_today_gb: number;
  avg_latency_ms: number;
}

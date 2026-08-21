export enum EmergencyPlanType {
  FIRE = 'FIRE',
  EARTHQUAKE = 'EARTHQUAKE',
  FLOOD = 'FLOOD',
  CHEMICAL_SPILL = 'CHEMICAL_SPILL',
  LOCKDOWN = 'LOCKDOWN',
  EVACUATION = 'EVACUATION',
  MEDICAL = 'MEDICAL',
  ACTIVE_THREAT = 'ACTIVE_THREAT',
  SEVERE_WEATHER = 'SEVERE_WEATHER',
  POWER_OUTAGE = 'POWER_OUTAGE',
  STRUCTURAL = 'STRUCTURAL',
  GENERAL = 'GENERAL',
}

export enum EvacuationStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  PARTIAL = 'PARTIAL',
  CANCELLED = 'CANCELLED',
  HOLD = 'HOLD',
}

export enum FireIncidentType {
  ALARM = 'ALARM',
  SMALL_FIRE = 'SMALL_FIRE',
  LARGE_FIRE = 'LARGE_FIRE',
  CHEMICAL_FIRE = 'CHEMICAL_FIRE',
  ELECTRICAL_FIRE = 'ELECTRICAL_FIRE',
  FALSE_ALARM = 'FALSE_ALARM',
  SMOKE_DETECTED = 'SMOKE_DETECTED',
}

export enum SecurityIncidentType {
  THEFT = 'THEFT',
  VANDALISM = 'VANDALISM',
  UNAUTHORIZED_ACCESS = 'UNAUTHORIZED_ACCESS',
  ASSAULT = 'ASSAULT',
  TRESPASSING = 'TRESPASSING',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  GROUND_DISTURBANCE = 'GROUND_DISTURBANCE',
  CYBERSECURITY = 'CYBERSECURITY',
  EQUIPMENT_DAMAGE = 'EQUIPMENT_DAMAGE',
}

export enum GuardStatus {
  ON_DUTY = 'ON_DUTY',
  OFF_DUTY = 'OFF_DUTY',
  ON_BREAK = 'ON_BREAK',
  EMERGENCY = 'EMERGENCY',
  PATROLLING = 'PATROLLING',
  ASSIGNED = 'ASSIGNED',
}

export enum CCTVStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RECORDING = 'RECORDING',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE',
  TAMPERED = 'TAMPERED',
}

export enum AlertLevel2 {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  INFORMATIONAL = 'INFORMATIONAL',
}

export enum CrisisLevel {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  LEVEL_3 = 'LEVEL_3',
  LEVEL_4 = 'LEVEL_4',
  LEVEL_5 = 'LEVEL_5',
}

export enum IncidentSeverity {
  MINOR = 'MINOR',
  MODERATE = 'MODERATE',
  MAJOR = 'MAJOR',
  SEVERE = 'SEVERE',
  CRITICAL = 'CRITICAL',
}

export enum ResponseStatus {
  PENDING = 'PENDING',
  DISPATCHED = 'DISPATCHED',
  EN_ROUTE = 'EN_ROUTE',
  ON_SCENE = 'ON_SCENE',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

export enum DrillType {
  FIRE_DRILL = 'FIRE_DRILL',
  EARTHQUAKE_DRILL = 'EARTHQUAKE_DRILL',
  LOCKDOWN_DRILL = 'LOCKDOWN_DRILL',
  EVACUATION_DRILL = 'EVACUATION_DRILL',
  SHELTER_IN_PLACE = 'SHELTER_IN_PLACE',
  MEDICAL_EMERGENCY = 'MEDICAL_EMERGENCY',
  HAZMAT = 'HAZMAT',
}

export enum SafetyRating {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  SATISFACTORY = 'SATISFACTORY',
  NEEDS_IMPROVEMENT = 'NEEDS_IMPROVEMENT',
  POOR = 'POOR',
}

export interface EmergencyPlan {
  id: string;
  school_id: string;
  plan_name: string;
  plan_type: EmergencyPlanType;
  description: string;
  version: string;
  is_active: boolean;
  effective_date: string;
  expiry_date: string;
  review_date: string;
  approved_by: string;
  approved_at: string;
  procedures: EmergencyProcedure[];
  contacts: EmergencyContact3[];
  evacuation_routes: EvacuationRoute[];
  assembly_points: AssemblyPoint[];
  resources_needed: string[];
  attachments: string[];
  created_at: string;
  updated_at: string;
}

export interface EmergencyPlanCreate {
  school_id: string;
  plan_name: string;
  plan_type: EmergencyPlanType;
  description: string;
  version: string;
  is_active?: boolean;
  effective_date: string;
  expiry_date: string;
  review_date: string;
  approved_by: string;
  procedures?: EmergencyProcedure[];
  contacts?: EmergencyContact3[];
  evacuation_routes?: EvacuationRoute[];
  assembly_points?: AssemblyPoint[];
  resources_needed?: string[];
  attachments?: string[];
}

export interface EmergencyPlanUpdate {
  plan_name?: string;
  plan_type?: EmergencyPlanType;
  description?: string;
  version?: string;
  is_active?: boolean;
  effective_date?: string;
  expiry_date?: string;
  review_date?: string;
  approved_by?: string;
  procedures?: EmergencyProcedure[];
  contacts?: EmergencyContact3[];
  evacuation_routes?: EvacuationRoute[];
  assembly_points?: AssemblyPoint[];
  resources_needed?: string[];
  attachments?: string[];
}

export interface EmergencyProcedure {
  procedure_id: string;
  step_number: number;
  title: string;
  description: string;
  responsible_role: string;
  time_limit_seconds: number | null;
  dependencies: string[];
  escalation_required: boolean;
}

export interface EvacuationRoute {
  route_id: string;
  route_name: string;
  building_id: string;
  floor: number;
  start_point: string;
  end_point: string;
  exit_doors: string[];
  stairs_required: boolean;
  accessibility_notes: string | null;
  estimated_time_seconds: number;
  max_capacity: number;
  is_primary: boolean;
}

export interface AssemblyPoint {
  point_id: string;
  name: string;
  location_description: string;
  latitude: number;
  longitude: number;
  capacity: number;
  assigned_buildings: string[];
  has_shelter: boolean;
  has_first_aid: boolean;
}

export interface EmergencyPlanUpdate2 {
  plan_id: string;
  version: string;
  change_description: string;
  changed_by: string;
  changed_at: string;
}

export interface Evacuation {
  id: string;
  school_id: string;
  plan_id: string;
  triggered_by: string;
  trigger_reason: string;
  status: EvacuationStatus;
  start_time: string;
  end_time: string | null;
  total_occupants: number;
  evacuated_count: number;
  missing_count: number;
  injuries_count: number;
  building_statuses: BuildingEvacuationStatus[];
  assembly_point_results: AssemblyPointResult[];
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface EvacuationCreate {
  school_id: string;
  plan_id: string;
  triggered_by: string;
  trigger_reason: string;
  total_occupants: number;
}

export interface BuildingEvacuationStatus {
  building_id: string;
  building_name: string;
  status: EvacuationStatus;
  floor_statuses: FloorEvacuationStatus[];
  evacuated_count: number;
  missing_count: number;
}

export interface FloorEvacuationStatus {
  floor: number;
  status: EvacuationStatus;
  evacuated_count: number;
  cleared_at: string | null;
  cleared_by: string | null;
}

export interface AssemblyPointResult {
  point_id: string;
  point_name: string;
  arrived_count: number;
  expected_count: number;
  missing_count: number;
}

export interface FireIncident {
  id: string;
  school_id: string;
  incident_type: FireIncidentType;
  severity: IncidentSeverity;
  location_id: string | null;
  building_id: string;
  floor: number | null;
  room_id: string | null;
  description: string;
  fire_detected_at: string;
  alarm_triggered_at: string | null;
  response_team_arrived_at: string | null;
  fire_extinguished_at: string | null;
  reported_by: string;
  response_team_members: string[];
  equipment_used: string[];
  damage_estimate: number | null;
  injuries_count: number;
  displaced_occupants: number;
  is_contained: boolean;
  fire_department_notified: boolean;
  fire_department_arrived_at: string | null;
  root_cause: string | null;
  follow_up_required: boolean;
  created_at: string;
  updated_at: string;
}

export interface FireIncidentCreate {
  school_id: string;
  incident_type: FireIncidentType;
  severity: IncidentSeverity;
  building_id: string;
  floor?: number;
  room_id?: string;
  description: string;
  fire_detected_at: string;
  reported_by: string;
  injuries_count?: number;
  displaced_occupants?: number;
}

export interface SecurityIncident {
  id: string;
  school_id: string;
  incident_type: SecurityIncidentType;
  severity: IncidentSeverity;
  title: string;
  description: string;
  location_id: string | null;
  building_id: string | null;
  floor: number | null;
  reported_by: string;
  reported_at: string;
  incident_time: string;
  witnesses: string[];
  evidence_items: EvidenceItem[];
  response_status: ResponseStatus;
  responding_personnel: string[];
  resolution_notes: string | null;
  resolved_by: string | null;
  resolved_at: string | null;
  is_police_reported: boolean;
  police_report_number: string | null;
  estimated_loss: number | null;
  follow_up_required: boolean;
  follow_up_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SecurityIncidentCreate {
  school_id: string;
  incident_type: SecurityIncidentType;
  severity: IncidentSeverity;
  title: string;
  description: string;
  location_id?: string;
  building_id?: string;
  floor?: number;
  reported_by: string;
  incident_time: string;
  witnesses?: string[];
}

export interface EvidenceItem {
  evidence_id: string;
  type: string;
  description: string;
  file_url: string | null;
  collected_by: string;
  collected_at: string;
}

export interface Guard {
  id: string;
  school_id: string;
  user_id: string;
  name: string;
  badge_number: string;
  status: GuardStatus;
  shift_start: string;
  shift_end: string;
  assigned_zone: string;
  assigned_building_ids: string[];
  patrol_route_id: string | null;
  radio_channel: string | null;
  phone_number: string | null;
  certifications: string[];
  last_patrol_check: string | null;
  location_latitude: number | null;
  location_longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface GuardCreate {
  school_id: string;
  user_id: string;
  name: string;
  badge_number: string;
  shift_start: string;
  shift_end: string;
  assigned_zone: string;
  assigned_building_ids: string[];
  patrol_route_id?: string;
  radio_channel?: string;
  phone_number?: string;
  certifications?: string[];
}

export interface CCTV {
  id: string;
  school_id: string;
  device_id: string;
  camera_name: string;
  status: CCTVStatus;
  building_id: string;
  floor: number | null;
  location_description: string;
  latitude: number | null;
  longitude: number | null;
  resolution: string;
  fps: number;
  night_vision: boolean;
  motion_detection: boolean;
  recording_enabled: boolean;
  storage_days: number;
  stream_url: string;
  covering_areas: string[];
  last_motion_detected: string | null;
  last_maintenance: string | null;
  created_at: string;
  updated_at: string;
}

export interface CCTVCreate {
  school_id: string;
  device_id: string;
  camera_name: string;
  building_id: string;
  floor?: number;
  location_description: string;
  latitude?: number;
  longitude?: number;
  resolution: string;
  fps?: number;
  night_vision?: boolean;
  motion_detection?: boolean;
  recording_enabled?: boolean;
  storage_days?: number;
  stream_url: string;
  covering_areas?: string[];
}

export interface EmergencyNotification {
  id: string;
  school_id: string;
  plan_id: string | null;
  title: string;
  message: string;
  alert_level: AlertLevel2;
  notification_type: string;
  recipients: NotificationRecipient[];
  channels: string[];
  sent_by: string;
  sent_at: string;
  acknowledged_count: number;
  total_recipients: number;
  escalation_level: number;
  follow_up_message: string | null;
  is_broadcast: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmergencyNotificationCreate {
  school_id: string;
  plan_id?: string;
  title: string;
  message: string;
  alert_level: AlertLevel2;
  notification_type: string;
  recipients: NotificationRecipient[];
  channels: string[];
  sent_by: string;
  is_broadcast?: boolean;
}

export interface NotificationRecipient {
  user_id: string;
  name: string;
  role: string;
  phone: string | null;
  email: string | null;
}

export interface CrisisManagement {
  id: string;
  school_id: string;
  crisis_level: CrisisLevel;
  crisis_type: string;
  title: string;
  description: string;
  activated_by: string;
  activated_at: string;
  deactivated_at: string | null;
  incident_id: string | null;
  command_center_location: string;
  incident_commander: string;
  response_team: CrisisTeamMember[];
  active_operations: CrisisOperation[];
  resource_allocations: ResourceAllocation[];
  media_statements: MediaStatement[];
  status: string;
  resolution_notes: string | null;
  resolution_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface CrisisManagementCreate {
  school_id: string;
  crisis_level: CrisisLevel;
  crisis_type: string;
  title: string;
  description: string;
  activated_by: string;
  command_center_location: string;
  incident_commander: string;
  response_team?: CrisisTeamMember[];
}

export interface CrisisTeamMember {
  user_id: string;
  name: string;
  role: string;
  contact_phone: string;
  assigned_responsibilities: string[];
}

export interface CrisisOperation {
  operation_id: string;
  name: string;
  description: string;
  assigned_to: string[];
  status: string;
  start_time: string;
  end_time: string | null;
  resources_used: string[];
  notes: string | null;
}

export interface ResourceAllocation {
  resource_id: string;
  resource_type: string;
  description: string;
  quantity: number;
  allocated_to: string;
  allocated_at: string;
  returned_at: string | null;
  condition: string;
}

export interface MediaStatement {
  statement_id: string;
  statement_text: string;
  approved_by: string;
  approved_at: string;
  released_at: string | null;
  media_outlets: string[];
  spokesperson: string;
}

export interface SecurityFilter {
  school_id: string;
  search?: string;
  incident_type?: SecurityIncidentType;
  severity?: IncidentSeverity;
  response_status?: ResponseStatus;
  building_id?: string;
  date_from?: string;
  date_to?: string;
  reported_by?: string;
  is_police_reported?: boolean;
  follow_up_required?: boolean;
}

export interface SecurityAnalytics {
  school_id: string;
  total_incidents: number;
  incidents_by_type: Record<SecurityIncidentType, number>;
  incidents_by_severity: Record<IncidentSeverity, number>;
  incidents_by_building: Record<string, number>;
  average_response_time_minutes: number;
  average_resolution_time_hours: number;
  resolution_rate: number;
  escalation_rate: number;
  fire_incidents_count: number;
  evacuation_count: number;
  drill_count: number;
  guard_patrol_compliance: number;
  cctv_uptime_percentage: number;
  monthly_trend: MonthlyIncidentTrend[];
  period_start: string;
  period_end: string;
}

export interface MonthlyIncidentTrend {
  month: string;
  incident_count: number;
  severity_breakdown: Record<IncidentSeverity, number>;
}

export interface SecurityReport {
  id: string;
  school_id: string;
  title: string;
  report_type: string;
  period_start: string;
  period_end: string;
  analytics: SecurityAnalytics;
  incident_summary: IncidentSummary[];
  response_summary: ResponseSummary;
  recommendations: string[];
  generated_at: string;
  generated_by: string;
}

export interface IncidentSummary {
  incident_id: string;
  incident_type: SecurityIncidentType;
  severity: IncidentSeverity;
  title: string;
  location: string;
  reported_at: string;
  status: ResponseStatus;
  resolution_time_hours: number | null;
}

export interface ResponseSummary {
  average_dispatch_time_minutes: number;
  average_on_scene_time_minutes: number;
  total_emergency_responses: number;
  successful_resolutions: number;
  pending_investigations: number;
}

export interface SafetyDrill {
  id: string;
  school_id: string;
  drill_type: DrillType;
  title: string;
  description: string;
  scheduled_date: string;
  actual_date: string | null;
  planned_duration_minutes: number;
  actual_duration_minutes: number | null;
  participants_count: number;
  expected_participants: number;
  participation_rate: number;
  buildings_covered: string[];
  safety_rating: SafetyRating;
  strengths: string[];
  weaknesses: string[];
  improvement_actions: ImprovementAction[];
  conducted_by: string;
  evaluated_by: string | null;
  report_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SafetyDrillCreate {
  school_id: string;
  drill_type: DrillType;
  title: string;
  description: string;
  scheduled_date: string;
  planned_duration_minutes: number;
  expected_participants: number;
  buildings_covered: string[];
  conducted_by: string;
}

export interface ImprovementAction {
  action_id: string;
  description: string;
  assigned_to: string;
  due_date: string;
  status: string;
  completed_at: string | null;
}

export interface AccessLog {
  id: string;
  school_id: string;
  user_id: string | null;
  visitor_name: string | null;
  door_access_id: string;
  building_id: string;
  floor: number | null;
  access_method: string;
  access_granted: boolean;
  denial_reason: string | null;
  badge_id: string | null;
  timestamp: string;
  created_at: string;
}

export interface AccessLogCreate {
  school_id: string;
  user_id?: string;
  visitor_name?: string;
  door_access_id: string;
  building_id: string;
  floor?: number;
  access_method: string;
  access_granted: boolean;
  denial_reason?: string;
  badge_id?: string;
  timestamp: string;
}

export interface SafetyEquipment {
  id: string;
  school_id: string;
  equipment_type: string;
  name: string;
  building_id: string;
  floor: number | null;
  location_description: string;
  serial_number: string | null;
  installation_date: string;
  last_inspection: string | null;
  next_inspection: string | null;
  expiry_date: string | null;
  status: string;
  is_functional: boolean;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface SafetyInspection {
  id: string;
  school_id: string;
  inspection_type: string;
  building_id: string;
  floor: number | null;
  inspector_name: string;
  inspector_id: string;
  inspection_date: string;
  overall_rating: SafetyRating;
  items_checked: InspectionItem[];
  findings: string[];
  corrective_actions: ImprovementAction[];
  report_url: string | null;
  next_inspection_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface SafetyInspectionCreate {
  school_id: string;
  inspection_type: string;
  building_id: string;
  floor?: number;
  inspector_name: string;
  inspector_id: string;
  inspection_date: string;
  overall_rating: SafetyRating;
  items_checked: InspectionItem[];
  findings?: string[];
}

export interface InspectionItem {
  item_id: string;
  category: string;
  description: string;
  status: string;
  notes: string | null;
  photo_url: string | null;
}

export interface EmergencyContact3 {
  id: string;
  school_id: string;
  contact_name: string;
  role: string;
  organization: string;
  phone_primary: string;
  phone_secondary: string | null;
  email: string;
  availability: string;
  specialty: string | null;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmergencyProtocol {
  id: string;
  school_id: string;
  protocol_name: string;
  emergency_type: EmergencyPlanType;
  description: string;
  steps: ProtocolStep[];
  required_resources: string[];
  notification_chain: string[];
  estimated_response_time_minutes: number;
  is_active: boolean;
  last_reviewed: string;
  version: string;
  created_at: string;
  updated_at: string;
}

export interface ProtocolStep {
  step_id: string;
  step_number: number;
  action: string;
  responsible_role: string;
  time_limit_seconds: number | null;
  escalation_required: boolean;
  dependencies: string[];
}

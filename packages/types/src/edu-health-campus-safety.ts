export enum CampusZoneType {
  CLASSROOM = "classroom",
  ADMINISTRATIVE = "administrative",
  SPORTS = "sports",
  COMMON_AREA = "common_area",
  PARKING = "parking",
  PLAYGROUND = "playground",
  CAFETERIA = "cafeteria",
  LIBRARY = "library",
  LABORATORY = "laboratory",
  RESTRICTED = "restricted",
  PERIMETER = "perimeter",
  ENTRY_POINT = "entry_point",
}

export enum AccessControlLevel {
  PUBLIC = "public",
  STAFF_ONLY = "staff_only",
  STUDENT_RESTRICTED = "student_restricted",
  ADMIN_ONLY = "admin_only",
  EMERGENCY_ACCESS = "emergency_access",
  VIP_ACCESS = "vip_access",
  RESTRICTED = "restricted",
}

export enum VisitorStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DENIED = "denied",
  CHECKED_IN = "checked_in",
  CHECKED_OUT = "checked_out",
  ESCORTED = "escorted",
  BANNED = "banned",
}

export enum TransportSafetyType {
  BUS = "bus",
  WALKING = "walking",
  CYCLING = "cycling",
  PRIVATE_VEHICLE = "private_vehicle",
  PUBLIC_TRANSPORT = "public_transport",
  SCHOOL_VAN = "school_van",
}

export enum InspectionType {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  QUARTERLY = "quarterly",
  ANNUAL = "annual",
  INCIDENT_BASED = "incident_based",
  REGULATORY = "regulatory",
}

export enum SafetyAuditStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  FOLLOW_UP_REQUIRED = "follow_up_required",
  OVERDUE = "overdue",
}

export enum ComplianceStatus {
  COMPLIANT = "compliant",
  NON_COMPLIANT = "non_compliant",
  PARTIALLY_COMPLIANT = "partially_compliant",
  UNDER_REVIEW = "under_review",
  EXEMPT = "exempt",
}

export enum RiskMapLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum SecurityPolicyType {
  ACCESS_CONTROL = "access_control",
  VISITOR_MANAGEMENT = "visitor_management",
  EMERGENCY_RESPONSE = "emergency_response",
  SURVEILLANCE = "surveillance",
  INCIDENT_REPORTING = "incident_reporting",
  PATROL = "patrol",
  COMMUNICATION = "communication",
}

export enum WeatherAlertLevel {
  ADVISORY = "advisory",
  WATCH = "watch",
  WARNING = "warning",
  EMERGENCY = "emergency",
}

export interface CampusSafety {
  id: string;
  school_id: string;
  campus_name: string;
  campus_address: string;
  campus_area_sqm: number;
  number_of_buildings: number;
  number_of_exits: number;
  number_of_cctv_cameras: number;
  security_personnel_count: number;
  emergency_exits: EmergencyExit[];
  safe_zones: SafeZone[];
  restricted_zones: RestrictedZone[];
  access_controls: AccessControl[];
  overall_risk_level: RiskMapLevel;
  last_safety_audit: string;
  next_safety_audit: string;
  safety_score: number;
  compliance_status: ComplianceStatus;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SafeZone {
  id: string;
  school_id: string;
  zone_name: string;
  zone_type: CampusZoneType;
  building: string;
  floor: number;
  room_numbers: string[];
  capacity: number;
  current_occupancy: number;
  emergency_assembly: boolean;
  shelter_capable: boolean;
  fire_extinguishers: number;
  first_aid_kits: number;
  exit_routes: string[];
  lighting_quality: string;
  condition: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface RestrictedZone {
  id: string;
  school_id: string;
  zone_name: string;
  zone_type: string;
  access_level: AccessControlLevel;
  authorized_personnel: string[];
  building: string;
  floor: number;
  rooms: string[];
  security_camera_coverage: boolean;
  alarm_system: boolean;
  sign_required: boolean;
  escort_required: boolean;
  access_hours: string;
  purpose: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AccessControl {
  id: string;
  school_id: string;
  control_point: string;
  control_type: string;
  location: string;
  access_level: AccessControlLevel;
  authorized_roles: string[];
  operating_hours: string;
  requires_badge: boolean;
  requires_pin: boolean;
  requires_biometric: boolean;
  camera_monitored: boolean;
  alarm_equipped: boolean;
  backup_power: boolean;
  maintenance_schedule: string;
  last_maintenance: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorSafety {
  id: string;
  school_id: string;
  visitor_id: string;
  visitor_name: string;
  visitor_type: string;
  status: VisitorStatus;
  purpose: string;
  host_person: string;
  host_department: string;
  arrival_time: string;
  departure_time: string;
  badge_number: string;
  escort_required: boolean;
  escort_name: string;
  zones_accessed: string[];
  identification_verified: boolean;
  identification_type: string;
  background_check_completed: boolean;
  photo_captured: boolean;
  vehicle_information: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface TransportSafety {
  id: string;
  school_id: string;
  transport_type: TransportSafetyType;
  vehicle_id: string;
  vehicle_type: string;
  route_name: string;
  driver_name: string;
  driver_license: string;
  driver_phone: string;
  capacity: number;
  current_passengers: number;
  safety_equipment: string[];
  first_aid_kit: boolean;
  fire_extinguisher: boolean;
  emergency_contact: string;
  gps_tracking: boolean;
  insurance_valid: boolean;
  inspection_date: string;
  next_inspection: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyExit {
  id: string;
  school_id: string;
  exit_name: string;
  building: string;
  floor: number;
  location: string;
  exit_type: string;
  width_meters: number;
  illuminated: boolean;
  sign照明: boolean;
  alarm_equipped: boolean;
  push_bar: boolean;
  opens_outward: boolean;
  blocked: boolean;
  blockage_reason: string;
  last_inspection: string;
  next_inspection: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafetyInspectionCampus {
  id: string;
  school_id: string;
  inspection_type: InspectionType;
  inspection_date: string;
  inspector_name: string;
  inspector_organization: string;
  areas_inspected: string[];
  findings: string[];
  violations_found: number;
  critical_violations: number;
  recommendations: string[];
  compliance_status: ComplianceStatus;
  follow_up_required: boolean;
  follow_up_date: string;
  report_url: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafetyIncident {
  id: string;
  school_id: string;
  incident_type: string;
  severity: string;
  location: string;
  building: string;
  floor: number;
  description: string;
  date_time: string;
  reported_by: string;
  witnesses: string[];
  injuries: string[];
  property_damage: string;
  emergency_response: string;
  investigation_required: boolean;
  investigation_status: string;
  root_cause: string;
  corrective_actions: string[];
  preventive_actions: string[];
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SecurityAlert {
  id: string;
  school_id: string;
  alert_type: string;
  severity: string;
  alert_source: string;
  description: string;
  location: string;
  date_time: string;
  triggered_by: string;
  affected_zones: string[];
  response_team_notified: boolean;
  response_actions: string[];
  resolved: boolean;
  resolved_by: string;
  resolved_at: string;
  false_alarm: boolean;
  false_alarm_reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CampusRiskMap {
  id: string;
  school_id: string;
  map_name: string;
  map_date: string;
  generated_by: string;
  risk_areas: Array<{
    zone_name: string;
    risk_level: RiskMapLevel;
    risk_types: string[];
    mitigation_measures: string[];
  }>;
  overall_risk_level: RiskMapLevel;
  total_risk_areas: number;
  high_risk_areas: number;
  improvement_areas: string[];
  recommendations: string[];
  map_url: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafetyAudit {
  id: string;
  school_id: string;
  audit_type: string;
  audit_date: string;
  auditor_name: string;
  auditor_organization: string;
  scope: string[];
  status: SafetyAuditStatus;
  findings: string[];
  compliance_scores: Record<string, number>;
  overall_compliance: number;
  non_compliance_areas: string[];
  recommendations: string[];
  corrective_actions: string[];
  deadline: string;
  follow_up_date: string;
  report_url: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SafetyCompliance {
  id: string;
  school_id: string;
  regulation_name: string;
  regulation_type: string;
  governing_body: string;
  compliance_status: ComplianceStatus;
  last_audit_date: string;
  next_audit_date: string;
  compliance_score: number;
  requirements: string[];
  met_requirements: string[];
  unmet_requirements: string[];
  corrective_actions: string[];
  documentation_url: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SecurityPolicy {
  id: string;
  school_id: string;
  policy_name: string;
  policy_type: SecurityPolicyType;
  version: string;
  effective_date: string;
  review_date: string;
  approved_by: string;
  approved_date: string;
  content: string;
  applicable_to: string[];
  key_provisions: string[];
  procedures: string[];
  penalties: string[];
  training_required: boolean;
  training_frequency: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SafetyInspectionSchedule {
  id: string;
  school_id: string;
  inspection_type: InspectionType;
  frequency: string;
  next_inspection_date: string;
  last_inspection_date: string;
  assigned_to: string;
  areas_to_inspect: string[];
  checklist_items: string[];
  notification_days_before: number;
  auto_reminder: boolean;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

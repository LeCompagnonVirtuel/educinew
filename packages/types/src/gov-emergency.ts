export enum CrisisType {
  NATURAL_DISASTER = 'natural_disaster',
  PANDEMIC = 'pandemic',
  SECURITY_THREAT = 'security_threat',
  INFRASTRUCTURE_FAILURE = 'infrastructure_failure',
  ENVIRONMENTAL = 'environmental',
  SOCIO_POLITICAL = 'socio_political',
  TECHNOLOGICAL = 'technological',
  ECONOMIC = 'economic',
  HEALTH_EMERGENCY = 'health_emergency',
}

export enum CrisisLevel {
  LEVEL_1 = 'level_1',
  LEVEL_2 = 'level_2',
  LEVEL_3 = 'level_3',
  LEVEL_4 = 'level_4',
  LEVEL_5 = 'level_5',
}

export enum DisasterType {
  FLOOD = 'flood',
  DROUGHT = 'drought',
  EARTHQUAKE = 'earthquake',
  WINDSTORM = 'windstorm',
  LANDSLIDE = 'landslide',
  WILDFIRE = 'wildfire',
  TORNADO = 'tornado',
  VOLCANIC = 'volcanic',
  TSUNAMI = 'tsunami',
  FAMINE = 'famine',
}

export enum PandemicPhase {
  PHASE_1 = 'phase_1',
  PHASE_2 = 'phase_2',
  PHASE_3 = 'phase_3',
  PHASE_4 = 'phase_4',
  PHASE_5 = 'phase_5',
  PHASE_6 = 'phase_6',
  POST_PANDEMIC = 'post_pandemic',
}

export enum AlertType {
  WEATHER = 'weather',
  SECURITY = 'security',
  HEALTH = 'health',
  INFRASTRUCTURE = 'infrastructure',
  ENVIRONMENTAL = 'environmental',
  EVACUATION = 'evacuation',
  LOCKDOWN = 'lockdown',
  ALL_CLEAR = 'all_clear',
}

export enum ClosureType {
  FULL = 'full',
  PARTIAL = 'partial',
  REGIONAL = 'regional',
  TEMPORARY = 'temporary',
  EXTENDED = 'extended',
  VOLUNTARY = 'voluntary',
}

export enum ContinuityStatus {
  DRAFT = 'draft',
  APPROVED = 'approved',
  ACTIVE = 'active',
  EXERCISED = 'exercised',
  UNDER_REVIEW = 'under_review',
  EXPIRED = 'expired',
}

export enum CommunicationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  PHONE = 'phone',
  RADIO = 'radio',
  TELEVISION = 'television',
  SOCIAL_MEDIA = 'social_media',
  WEB = 'web',
  SIREN = 'siren',
  LOUDSPEAKER = 'loudspeaker',
}

export enum ResponseStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ON_HOLD = 'on_hold',
}

export enum EmergencyPhase {
  PREPAREDNESS = 'preparedness',
  RESPONSE = 'response',
  RECOVERY = 'recovery',
  MITIGATION = 'mitigation',
}

export enum ResourceStatus {
  AVAILABLE = 'available',
  DEPLOYED = 'deployed',
  DEPLETED = 'depleted',
  MAINTENANCE = 'maintenance',
  ORDERED = 'ordered',
}

export enum SeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
  CATASTROPHIC = 'catastrophic',
}

export enum ActivationLevel {
  MONITORING = 'monitoring',
  ADVISORY = 'advisory',
  PARTIAL = 'partial',
  FULL = 'full',
  MAXIMUM = 'maximum',
}

export enum EvacuationStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  PARTIAL = 'partial',
  CANCELLED = 'cancelled',
}

export enum ShelterStatus {
  OPEN = 'open',
  FULL = 'full',
  CLOSED = 'closed',
  PREPARING = 'preparing',
}

export enum DamageAssessment {
  NONE = 'none',
  MINOR = 'minor',
  MODERATE = 'moderate',
  SEVERE = 'severe',
  DESTROYED = 'destroyed',
}

export enum RecoveryStatus {
  NOT_STARTED = 'not_started',
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold',
}

export enum DrillType {
  EVACUATION = 'evacuation',
  LOCKDOWN = 'lockdown',
  FIRE = 'fire',
  EARTHQUAKE = 'earthquake',
  FLOOD = 'flood',
  PANDEMIC = 'pandemic',
}

export enum DrillStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export enum SupplyCategory {
  MEDICAL = 'medical',
  FOOD = 'food',
  WATER = 'water',
  SHELTER = 'shelter',
  CLOTHING = 'clothing',
  HYGIENE = 'hygiene',
  TOOLS = 'tools',
  COMMUNICATION = 'communication',
}

export enum MedicalPriority {
  IMMEDIATE = 'immediate',
  DELAYED = 'delayed',
  MINIMAL = 'minimal',
  EXPECTANT = 'expectant',
}

export enum CoordinationLevel {
  SCHOOL = 'school',
  DISTRICT = 'district',
  REGIONAL = 'regional',
  NATIONAL = 'national',
  INTERNATIONAL = 'international',
}

export enum ThreatSource {
  NATURAL = 'natural',
  HUMAN_MADE = 'human_made',
  TECHNOLOGICAL = 'technological',
  BIOLOGICAL = 'biological',
  CHEMICAL = 'chemical',
  NUCLEAR = 'nuclear',
}

export enum ContactRole {
  EMERGENCY_MANAGER = 'emergency_manager',
  SCHOOL_PRINCIPAL = 'school_principal',
  LOCAL_AUTHORITY = 'local_authority',
  HEALTH_OFFICER = 'health_officer',
  SECURITY_OFFICER = 'security_officer',
  COMMUNICATION_OFFICER = 'communication_officer',
}

export enum WeatherAlertType {
  THUNDERSTORM = 'thunderstorm',
  FLOOD_WARNING = 'flood_warning',
  DROUGHT_WARNING = 'drought_warning',
  HEAT_WAVE = 'heat_wave',
  COLD_WAVE = 'cold_wave',
  WIND = 'wind',
  TORNADO = 'tornado',
}

export enum SecurityThreatLevel {
  GREEN = 'green',
  YELLOW = 'yellow',
  AMBER = 'amber',
  RED = 'red',
  BLACK = 'black',
}

export enum InfrastructureDamage {
  NONE = 'none',
  POWER = 'power',
  WATER = 'water',
  ROAD = 'road',
  BUILDING = 'building',
  COMMUNICATION = 'communication',
  MULTIPLE = 'multiple',
}

export enum AidType {
  FINANCIAL = 'financial',
  IN_KIND = 'in_kind',
  TECHNICAL = 'technical',
  HUMANITARIAN = 'humanitarian',
  MEDICAL = 'medical',
}

export enum EmergencyTestStatus {
  PASSED = 'passed',
  FAILED = 'failed',
  PARTIAL = 'partial',
  SCHEDULED = 'scheduled',
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum RecoveryPhase {
  IMMEDIATE = 'immediate',
  SHORT_TERM = 'short_term',
  MEDIUM_TERM = 'medium_term',
  LONG_TERM = 'long_term',
}

export enum ContinuityPlanType {
  ACADEMIC = 'academic',
  ADMINISTRATIVE = 'administrative',
  FINANCIAL = 'financial',
  COMMUNICATION = 'communication',
  TECHNOLOGY = 'technology',
  TRANSPORTATION = 'transportation',
}

export enum EmergencyUserRole {
  INCIDENT_COMMANDER = 'incident_commander',
  OPERATIONS = 'operations',
  PLANNING = 'planning',
  LOGISTICS = 'logistics',
  FINANCE = 'finance',
  PUBLIC_INFO = 'public_info',
  SAFETY = 'safety',
  LIAISON = 'liaison',
}

export enum CrisisDuration {
  SHORT_TERM = 'short_term',
  MEDIUM_TERM = 'medium_term',
  LONG_TERM = 'long_term',
  PROLONGED = 'prolonged',
}

export enum PopulationImpact {
  NONE = 'none',
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  SEVERE = 'severe',
}

export enum CommunicationStatus {
  OPERATIONAL = 'operational',
  DEGRADED = 'degraded',
  OFFLINE = 'offline',
  TESTING = 'testing',
}

export enum PandemicSeverity {
  MILD = 'mild',
  MODERATE = 'moderate',
  SEVERE = 'severe',
  EXTREME = 'extreme',
}

export enum EmergencyProtocol {
  STANDARD = 'standard',
  ENHANCED = 'enhanced',
  MAXIMUM = 'maximum',
  CUSTOM = 'custom',
}

export enum SchoolSafetyStatus {
  SAFE = 'safe',
  UNSAFE = 'unsafe',
  CONDITIONAL = 'conditional',
  UNDER_ASSESSMENT = 'under_assessment',
}

export enum EmergencyOperationMode {
  NORMAL = 'normal',
  ELEVATED = 'elevated',
  HIGH = 'high',
  EMERGENCY = 'emergency',
}

export enum ResourceAllocationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DELIVERED = 'delivered',
  DISTRIBUTED = 'distributed',
  CANCELLED = 'cancelled',
}

export enum DamageReportStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  VERIFIED = 'verified',
  APPROVED = 'approved',
}

export enum EmergencyContactType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  EMERGENCY = 'emergency',
}

export enum ContingencyTrigger {
  WEATHER = 'weather',
  SECURITY = 'security',
  HEALTH = 'health',
  INFRASTRUCTURE = 'infrastructure',
  MANUAL = 'manual',
}

export enum SchoolReopeningStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  OPEN = 'open',
  DELAYED = 'delayed',
  CANCELLED = 'cancelled',
}

export enum EmergencyResourceType {
  HUMAN = 'human',
  EQUIPMENT = 'equipment',
  SUPPLIES = 'supplies',
  VEHICLE = 'vehicle',
  FACILITY = 'facility',
  FUND = 'fund',
}

export interface CrisisCenter {
  id: string;
  name: string;
  code: string;
  description: string;
  level: CoordinationLevel;
  region_id: string | null;
  department_id: string | null;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  email: string;
  capacity: number;
  current_occupancy: number;
  status: ActivationLevel;
  activation_level: ActivationLevel;
  commander_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Crisis {
  id: string;
  center_id: string;
  name: string;
  code: string;
  type: CrisisType;
  level: CrisisLevel;
  severity: SeverityLevel;
  duration: CrisisDuration;
  population_impact: PopulationImpact;
  description: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  start_date: string;
  end_date: string | null;
  estimated_end_date: string | null;
  status: ResponseStatus;
  activation_level: ActivationLevel;
  affected_schools: string[];
  affected_students: number;
  affected_teachers: number;
  casualties: number;
  injuries: number;
  displaced: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CrisisResponse {
  id: string;
  crisis_id: string;
  responder_id: string;
  role: EmergencyUserRole;
  action: string;
  description: string;
  start_time: string;
  end_time: string | null;
  status: ResponseStatus;
  resources_used: EmergencyResource[];
  outcome: string;
  lessons_learned: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmergencyResource {
  id: string;
  name: string;
  type: EmergencyResourceType;
  category: SupplyCategory;
  quantity: number;
  unit: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  status: ResourceStatus;
  allocation_status: ResourceAllocationStatus;
  assigned_to: string | null;
  cost: number;
  source: string;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Disaster {
  id: string;
  crisis_id: string;
  type: DisasterType;
  severity: SeverityLevel;
  latitude: number;
  longitude: number;
  radius_km: number;
  affected_area_km2: number;
  start_time: string;
  end_time: string | null;
  is_ongoing: boolean;
  damage_assessment: DamageAssessment;
  infrastructure_damage: InfrastructureDamage;
  casualties: number;
  injuries: number;
  displaced: number;
  estimated_cost: number;
  weather_alert_type: WeatherAlertType | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DisasterPlan {
  id: string;
  name: string;
  code: string;
  description: string;
  disaster_type: DisasterType;
  region_id: string | null;
  school_id: string | null;
  coordination_level: CoordinationLevel;
  evacuation_routes: EvacuationRoute[];
  shelter_locations: ShelterLocation[];
  emergency_contacts: EmergencyContact[];
  resource_inventories: ResourceInventory[];
  communication_plan: CommunicationPlan;
  review_date: string;
  approval_date: string;
  status: ContinuityStatus;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EvacuationRoute {
  id: string;
  plan_id: string;
  name: string;
  description: string;
  origin: string;
  destination: string;
  distance_km: number;
  estimated_time_minutes: number;
  capacity: number;
  is_accessible: boolean;
  waypoints: Record<string, unknown>[];
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface ShelterLocation {
  id: string;
  plan_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  current_occupancy: number;
  status: ShelterStatus;
  facilities: string[];
  contact_person: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyContact {
  id: string;
  plan_id: string;
  name: string;
  role: ContactRole;
  phone: string;
  email: string;
  secondary_phone: string | null;
  contact_type: EmergencyContactType;
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResourceInventory {
  id: string;
  plan_id: string;
  category: SupplyCategory;
  item_name: string;
  quantity: number;
  unit: string;
  location: string;
  minimum_required: number;
  expiry_date: string | null;
  last_checked: string;
  status: ResourceStatus;
  created_at: string;
  updated_at: string;
}

export interface CommunicationPlan {
  id: string;
  plan_id: string;
  primary_channels: CommunicationChannel[];
  secondary_channels: CommunicationChannel[];
  emergency_broadcast: boolean;
  notification_tree: NotificationTreeNode[];
  message_templates: MessageTemplate[];
  language_support: string[];
  created_at: string;
  updated_at: string;
}

export interface NotificationTreeNode {
  id: string;
  contact_id: string;
  level: number;
  parent_id: string | null;
  child_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  alert_type: AlertType;
  severity: SeverityLevel;
  language: string;
  variables: string[];
  created_at: string;
  updated_at: string;
}

export interface PandemicResponse {
  id: string;
  crisis_id: string;
  phase: PandemicPhase;
  severity: PandemicSeverity;
  disease_name: string;
  transmission_rate: number;
  mortality_rate: number;
  incubation_period_days: number;
  total_cases: number;
  active_cases: number;
  recovered: number;
  deaths: number;
  schools_affected: number;
  students_affected: number;
  staff_affected: number;
  vaccination_rate: number;
  testing_capacity: number;
  contact_tracing_active: boolean;
  quarantine_measures: string[];
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PandemicMetric {
  id: string;
  pandemic_id: string;
  date: string;
  new_cases: number;
  total_cases: number;
  active_cases: number;
  new_deaths: number;
  total_deaths: number;
  recovery_rate: number;
  positivity_rate: number;
  hospitalization_rate: number;
  icu_occupancy: number;
  testing_rate: number;
  vaccination_rate: number;
  r_effective: number;
  created_at: string;
  updated_at: string;
}

export interface SecurityAlert {
  id: string;
  center_id: string;
  alert_type: AlertType;
  threat_level: SecurityThreatLevel;
  threat_source: ThreatSource;
  title: string;
  description: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  start_time: string;
  end_time: string | null;
  is_active: boolean;
  affected_schools: string[];
  response_actions: string[];
  reported_by: string;
  verified_by: string | null;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SchoolClosure {
  id: string;
  school_id: string;
  center_id: string;
  crisis_id: string;
  closure_type: ClosureType;
  reason: string;
  start_date: string;
  end_date: string | null;
  estimated_duration_days: number;
  affected_students: number;
  affected_teachers: number;
  alternative_arrangements: string;
  reopening_status: SchoolReopeningStatus;
  reopening_date: string | null;
  conditions_for_reopening: string[];
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ContinuityPlan {
  id: string;
  name: string;
  code: string;
  description: string;
  plan_type: ContinuityPlanType;
  school_id: string | null;
  region_id: string | null;
  crisis_type: CrisisType;
  activation_triggers: ContingencyTrigger[];
  actions: ContinuityAction[];
  resource_requirements: string[];
  responsible_person: string;
  review_frequency: string;
  last_tested: string | null;
  test_result: EmergencyTestStatus | null;
  status: ContinuityStatus;
  version: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ContinuityAction {
  id: string;
  plan_id: string;
  name: string;
  description: string;
  priority: number;
  responsible_role: EmergencyUserRole;
  estimated_duration_hours: number;
  dependencies: string[];
  resources_needed: string[];
  success_criteria: string;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyCommunication {
  id: string;
  center_id: string;
  crisis_id: string;
  channel: CommunicationChannel;
  priority: NotificationPriority;
  subject: string;
  body: string;
  sender: string;
  recipients: string[];
  recipient_count: number;
  sent_at: string;
  delivered_at: string | null;
  read_at: string | null;
  status: CommunicationStatus;
  language: string;
  translation_required: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CommunicationMessage {
  id: string;
  communication_id: string;
  template_id: string | null;
  content: string;
  language: string;
  format: string;
  attachments: string[];
  version: number;
  created_at: string;
  updated_at: string;
}

export interface EmergencyConfig {
  id: string;
  name: string;
  description: string;
  auto_activation: boolean;
  default_protocol: EmergencyProtocol;
  notification_channels: CommunicationChannel[];
  escalation_timeout_minutes: number;
  max_response_time_minutes: number;
  required_drills_per_year: number;
  drill_reminder_days: number;
  resource_check_frequency_days: number;
  plan_review_frequency_days: number;
  created_at: string;
  updated_at: string;
}

export interface EmergencyMetrics {
  id: string;
  total_crises: number;
  active_crises: number;
  total_alerts: number;
  active_alerts: number;
  total_school_closures: number;
  active_closures: number;
  average_response_time_minutes: number;
  total_drills_conducted: number;
  last_drill_date: string | null;
  preparedness_score: number;
  recovery_score: number;
  communication_effectiveness: number;
  created_at: string;
  updated_at: string;
}

export interface EmergencyDrill {
  id: string;
  name: string;
  description: string;
  drill_type: DrillType;
  school_id: string | null;
  region_id: string | null;
  scheduled_date: string;
  actual_date: string | null;
  duration_minutes: number;
  participants_count: number;
  status: DrillStatus;
  evaluation_score: number | null;
  issues_identified: string[];
  recommendations: string[];
  conducted_by: string;
  evaluated_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EmergencyScenario {
  id: string;
  name: string;
  description: string;
  crisis_type: CrisisType;
  disaster_type: DisasterType | null;
  severity: SeverityLevel;
  affected_population: number;
  affected_schools: string[];
  affected_infrastructure: string[];
  timeline: ScenarioTimelineStep[];
  expected_outcomes: string[];
  required_resources: string[];
  status: ContinuityStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ScenarioTimelineStep {
  order: number;
  time_offset_minutes: number;
  event: string;
  description: string;
  responsible_role: EmergencyUserRole;
  expected_action: string;
}

export interface DamageReport {
  id: string;
  crisis_id: string;
  school_id: string;
  reported_by: string;
  assessment_date: string;
  infrastructure_damage: InfrastructureDamage;
  damage_details: DamageDetail[];
  estimated_repair_cost: number;
  total_damage_cost: number;
  photos: string[];
  status: DamageReportStatus;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DamageDetail {
  facility_type: string;
  damage_level: DamageAssessment;
  description: string;
  repair_cost: number;
}

export interface EmergencyRecovery {
  id: string;
  crisis_id: string;
  recovery_phase: RecoveryPhase;
  name: string;
  description: string;
  objectives: string[];
  milestones: RecoveryMilestone[];
  budget: number;
  spent: number;
  timeline_months: number;
  start_date: string;
  end_date: string | null;
  responsible_entity: string;
  status: RecoveryStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface RecoveryMilestone {
  id: string;
  recovery_id: string;
  name: string;
  description: string;
  target_date: string;
  completion_date: string | null;
  is_completed: boolean;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyAudit {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  changes: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
}

export interface CrisisTimeline {
  id: string;
  crisis_id: string;
  events: CrisisTimelineEvent[];
  total_events: number;
  created_at: string;
  updated_at: string;
}

export interface CrisisTimelineEvent {
  timestamp: string;
  event_type: string;
  description: string;
  actor: string;
  severity: SeverityLevel;
}

export interface EmergencyResourceRequest {
  id: string;
  crisis_id: string;
  requesting_entity: string;
  resource_type: EmergencyResourceType;
  quantity: number;
  urgency: NotificationPriority;
  status: ResourceAllocationStatus;
  approved_by: string | null;
  fulfilled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmergencyTraining {
  id: string;
  name: string;
  description: string;
  training_type: string;
  target_role: EmergencyUserRole;
  duration_hours: number;
  participants_count: number;
  completion_rate: number;
  next_session: string;
  instructor: string;
  status: DrillStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyEquipment {
  id: string;
  name: string;
  type: EmergencyResourceType;
  serial_number: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  status: ResourceStatus;
  last_maintenance: string;
  next_maintenance: string;
  expiry_date: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface CrisisImpactAssessment {
  id: string;
  crisis_id: string;
  assessment_date: string;
  schools_affected: number;
  students_affected: number;
  teachers_affected: number;
  infrastructure_damage_cost: number;
  educational_disruption_days: number;
  recovery_estimated_days: number;
  overall_impact: SeverityLevel;
  detailed_findings: string[];
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface EmergencyVulnerability {
  id: string;
  region_id: string;
  school_id: string | null;
  vulnerability_type: string;
  risk_score: number;
  exposure_level: RiskLevel;
  adaptive_capacity: RiskLevel;
  overall_vulnerability: RiskLevel;
  factors: string[];
  mitigation_measures: string[];
  last_assessment: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolEmergencyProfile {
  id: string;
  school_id: string;
  emergency_manager: string;
  emergency_phone: string;
  assembly_points: AssemblyPoint[];
  fire_extinguishers: number;
  first_aid_kits: number;
  emergency_exits: number;
  evacuation_capacity: number;
  last_drill_date: string | null;
  emergency_supplies: ResourceInventory[];
  risk_assessment: string;
  status: SchoolSafetyStatus;
  created_at: string;
  updated_at: string;
}

export interface AssemblyPoint {
  name: string;
  latitude: number;
  longitude: number;
  capacity: number;
  accessibility: boolean;
}

export interface EmergencyBudget {
  id: string;
  crisis_id: string | null;
  fiscal_year: number;
  allocated_budget: number;
  spent_amount: number;
  remaining_budget: number;
  execution_rate: number;
  allocations: EmergencyBudgetAllocation[];
  status: BudgetStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyBudgetAllocation {
  category: string;
  allocated: number;
  spent: number;
  percentage: number;
}

export interface EmergencyPerformanceMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  target_value: number;
  unit: string;
  period: string;
  trend: string;
  created_at: string;
  updated_at: string;
}

export interface CrisisStakeholder {
  id: string;
  crisis_id: string;
  organization_name: string;
  role: string;
  contact_person: string;
  contact_phone: string;
  contact_email: string;
  resources_available: string[];
  coordination_status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyLessonPlan {
  id: string;
  name: string;
  description: string;
  crisis_type: CrisisType;
  target_audience: string;
  objectives: string[];
  activities: string[];
  duration_minutes: number;
  materials_needed: string[];
  assessment_method: string;
  status: ContinuityStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyMonitoringDashboard {
  id: string;
  name: string;
  crisis_id: string | null;
  widgets: EmergencyDashboardWidget[];
  refresh_interval: number;
  access_level: PermissionLevel;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmergencyDashboardWidget {
  id: string;
  dashboard_id: string;
  widget_type: string;
  title: string;
  data_source: string;
  config: Record<string, unknown>;
  position: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface EmergencySupplyChain {
  id: string;
  name: string;
  supplier: string;
  category: SupplyCategory;
  items: SupplyItem[];
  lead_time_days: number;
  minimum_order: number;
  status: ResourceStatus;
  created_at: string;
  updated_at: string;
}

export interface SupplyItem {
  name: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
}

export interface EmergencyAfterAction {
  id: string;
  crisis_id: string;
  review_date: string;
  attendees: string[];
  what_went_well: string[];
  what_needs_improvement: string[];
  action_items: AfterActionItem[];
  overall_rating: string;
  created_at: string;
  updated_at: string;
}

export interface AfterActionItem {
  item: string;
  responsible: string;
  deadline: string;
  status: ResponseStatus;
}

export interface EmergencyGeofence {
  id: string;
  name: string;
  crisis_id: string;
  center_lat: number;
  center_lng: number;
  radius_km: number;
  boundary: Record<string, unknown>;
  schools_inside: string[];
  population_inside: number;
  status: ActivationLevel;
  created_at: string;
  updated_at: string;
}

export interface EmergencyContactDirectory {
  id: string;
  region_id: string;
  contacts: EmergencyDirectoryContact[];
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyDirectoryContact {
  name: string;
  role: ContactRole;
  organization: string;
  phone: string;
  email: string;
  availability: string;
}

export interface EmergencySimulationResult {
  id: string;
  scenario_id: string;
  simulation_date: string;
  duration_minutes: number;
  participants_count: number;
  evacuation_time_seconds: number;
  response_time_seconds: number;
  issues_identified: string[];
  score: number;
  improvements_recommended: string[];
  created_at: string;
  updated_at: string;
}

export interface CrisisResourcePool {
  id: string;
  pool_name: string;
  region_id: string;
  resources: CrisisPoolResource[];
  shared_with: string[];
  status: ResourceStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisPoolResource {
  resource_type: EmergencyResourceType;
  quantity: number;
  available_quantity: number;
  unit: string;
}

export interface EmergencyHealthCheck {
  id: string;
  system_name: string;
  status: CommunicationStatus;
  response_time_ms: number;
  last_checked: string;
  uptime_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface EmergencyIncidentReport {
  id: string;
  crisis_id: string;
  incident_type: string;
  description: string;
  location: string;
  latitude: number | null;
  longitude: number | null;
  reported_by: string;
  reported_at: string;
  severity: SeverityLevel;
  status: ResponseStatus;
  response_actions: string[];
  created_at: string;
  updated_at: string;
}

export interface EmergencyMassNotification {
  id: string;
  crisis_id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  channels: CommunicationChannel[];
  target_audience: string;
  recipient_count: number;
  sent_count: number;
  delivered_count: number;
  read_count: number;
  sent_at: string;
  status: CommunicationStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyRiskMatrix {
  id: string;
  name: string;
  risks: EmergencyRisk[];
  last_assessment: string;
  next_assessment: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyRisk {
  risk_id: string;
  description: string;
  likelihood: RiskLevel;
  impact: RiskLevel;
  overall_risk: RiskLevel;
  mitigation: string;
  owner: string;
}

export interface EmergencyRecoveryTracker {
  id: string;
  crisis_id: string;
  recovery_phase: RecoveryPhase;
  milestones: RecoveryMilestone[];
  overall_progress: number;
  budget_remaining: number;
  estimated_completion: string;
  status: RecoveryStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyInventoryItem {
  id: string;
  name: string;
  category: SupplyCategory;
  quantity: number;
  minimum_quantity: number;
  unit: string;
  location: string;
  expiry_date: string | null;
  condition: string;
  status: ResourceStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisCommunicationLog {
  id: string;
  crisis_id: string;
  channel: CommunicationChannel;
  direction: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  status: CommunicationStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyPlanVersion {
  id: string;
  plan_id: string;
  version: number;
  changes: string[];
  approved_by: string;
  approved_at: string;
  status: ContinuityStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyResponseTeam {
  id: string;
  name: string;
  crisis_id: string;
  commander: string;
  members: EmergencyTeamMember[];
  total_members: number;
  on_duty_count: number;
  shift_schedule: Record<string, unknown>;
  status: ActivationLevel;
  created_at: string;
  updated_at: string;
}

export interface EmergencyTeamMember {
  user_id: string;
  name: string;
  role: EmergencyUserRole;
  phone: string;
  email: string;
  on_duty: boolean;
}

export interface EmergencyShelter {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  current_occupancy: number;
  available_beds: number;
  status: ShelterStatus;
  facilities: string[];
  contact_person: string;
  contact_phone: string;
  supplies: EmergencyInventoryItem[];
  created_at: string;
  updated_at: string;
}

export interface EmergencyWeatherMonitor {
  id: string;
  region_id: string;
  weather_type: WeatherAlertType;
  current_condition: string;
  temperature_celsius: number;
  wind_speed_kmh: number;
  precipitation_mm: number;
  visibility_km: number;
  alert_level: SecurityThreatLevel;
  forecast_hours: number;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export enum EmergencyOperationMode2 {
  STANDBY = 'standby',
  ACTIVE = 'active',
  OVERDRIVE = 'overdrive',
}

export enum CrisisPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum EvacuationPriority {
  CHILDREN = 'children',
  ELDERLY = 'elderly',
  DISABLED = 'disabled',
  GENERAL = 'general',
}

export enum EmergencyResourceCategory {
  PREPOSITIONED = 'prepositioned',
  ON_DEMAND = 'on_demand',
  MUTUAL_AID = 'mutual_aid',
  INTERNATIONAL = 'international',
}

export enum CrisisImpactArea {
  ACADEMIC = 'academic',
  INFRASTRUCTURE = 'infrastructure',
  PSYCHOSOCIAL = 'psychosocial',
  FINANCIAL = 'financial',
  OPERATIONAL = 'operational',
}

export enum EmergencyResponseTier {
  TIER_1 = 'tier_1',
  TIER_2 = 'tier_2',
  TIER_3 = 'tier_3',
}

export enum CrisisEscalationTrigger {
  TIME_BASED = 'time_based',
  THRESHOLD_BASED = 'threshold_based',
  MANUAL = 'manual',
  AUTOMATED = 'automated',
}

export interface EmergencyResponseTierConfig {
  id: string;
  tier: EmergencyResponseTier;
  description: string;
  required_personnel: number;
  response_time_minutes: number;
  resources_required: string[];
  activation_criteria: string[];
  created_at: string;
  updated_at: string;
}

export interface CrisisEscalationMatrix {
  id: string;
  crisis_type: CrisisType;
  trigger: CrisisEscalationTrigger;
  current_level: CrisisLevel;
  next_level: CrisisLevel;
  escalation_conditions: string[];
  notification_recipients: string[];
  auto_escalate: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmergencyMutualAid {
  id: string;
  requesting_entity: string;
  providing_entity: string;
  crisis_id: string;
  resource_type: EmergencyResourceType;
  quantity: number;
  agreement_type: string;
  request_date: string;
  fulfillment_date: string | null;
  status: ResourceAllocationStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyPsychosocial {
  id: string;
  crisis_id: string;
  school_id: string;
  affected_students: number;
  affected_teachers: number;
  counseling_sessions: number;
  counselors_deployed: number;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisLessonsLearned {
  id: string;
  crisis_id: string;
  lesson_category: string;
  description: string;
  impact: string;
  recommendation: string;
  implemented: boolean;
  implemented_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmergencyInfrastructureCheck {
  id: string;
  school_id: string;
  check_date: string;
  building_integrity: DamageAssessment;
  electrical_system: DamageAssessment;
  water_system: DamageAssessment;
  structural_safety: DamageAssessment;
  overall_status: SchoolSafetyStatus;
  inspector_name: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyCostEstimate {
  id: string;
  crisis_id: string;
  category: string;
  description: string;
  estimated_cost: number;
  actual_cost: number | null;
  variance: number | null;
  funding_source: string;
  status: ResourceAllocationStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisMediaRelease {
  id: string;
  crisis_id: string;
  title: string;
  content: string;
  release_date: string;
  media_type: string;
  spokesperson: string;
  approved_by: string;
  distribution_channels: CommunicationChannel[];
  status: CommunicationStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencySocialMedia {
  id: string;
  crisis_id: string;
  platform: string;
  message: string;
  posted_at: string;
  engagement_count: number;
  reach_count: number;
  sentiment: string;
  status: CommunicationStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyCommandCenter {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  capacity: number;
  current_occupancy: number;
  equipment: string[];
  communication_lines: number;
  backup_power: boolean;
  status: ActivationLevel;
  created_at: string;
  updated_at: string;
}

export interface CrisisDependencyGraph {
  id: string;
  crisis_id: string;
  dependencies: CrisisDependency[];
  critical_path: string[];
  total_dependencies: number;
  created_at: string;
  updated_at: string;
}

export interface CrisisDependency {
  source_event: string;
  target_event: string;
  dependency_type: string;
  critical: boolean;
}

export interface EmergencyDonation {
  id: string;
  crisis_id: string;
  donor_name: string;
  donation_type: AidType;
  amount: number;
  currency: string;
  items_description: string;
  received_date: string;
  acknowledged: boolean;
  status: ResourceAllocationStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisLogisticsPlan {
  id: string;
  crisis_id: string;
  supply_chain: EmergencySupplyChain[];
  distribution_points: DistributionPoint[];
  transport_routes: string[];
  estimated_delivery_time: number;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface DistributionPoint {
  name: string;
  location: string;
  capacity: number;
  latitude: number;
  longitude: number;
}

export interface EmergencyLegalFramework {
  id: string;
  crisis_type: CrisisType;
  legal_basis: string;
  authority_level: string;
  emergency_powers: string[];
  limitations: string[];
  review_date: string;
  status: ContinuityStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyVolunteer {
  id: string;
  name: string;
  phone: string;
  email: string;
  skills: string[];
  availability: string;
  assigned_crisis_id: string | null;
  assigned_role: string;
  hours贡献: number;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisEnvironmentalImpact {
  id: string;
  crisis_id: string;
  impact_type: string;
  affected_area_km2: number;
  description: string;
  remediation_cost: number;
  remediation_timeline: string;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyInsuranceClaim {
  id: string;
  crisis_id: string;
  school_id: string;
  insurance_provider: string;
  policy_number: string;
  claim_amount: number;
  approved_amount: number | null;
  claim_status: string;
  filed_date: string;
  resolved_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmergencyAcademicRecovery {
  id: string;
  crisis_id: string;
  school_id: string;
  original_end_date: string;
  new_end_date: string;
  additional_days_needed: number;
  recovery_strategies: string[];
  catch_up_plans: AcademicCatchUpPlan[];
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface AcademicCatchUpPlan {
  subject: string;
  hours_needed: number;
  strategy: string;
  responsible: string;
}

export interface EmergencyDataBackup {
  id: string;
  system_name: string;
  backup_type: string;
  backup_location: string;
  backup_size_gb: number;
  last_backup: string;
  next_scheduled: string;
  retention_days: number;
  status: ResourceStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisDependencyGraph {
  id: string;
  crisis_id: string;
  dependencies: CrisisDependency[];
  critical_path: string[];
  total_dependencies: number;
  created_at: string;
  updated_at: string;
}

export interface CrisisDependency {
  source_event: string;
  target_event: string;
  dependency_type: string;
  critical: boolean;
}

export interface EmergencyDonation {
  id: string;
  crisis_id: string;
  donor_name: string;
  donation_type: AidType;
  amount: number;
  currency: string;
  items_description: string;
  received_date: string;
  acknowledged: boolean;
  status: ResourceAllocationStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisLogisticsPlan {
  id: string;
  crisis_id: string;
  supply_chain: EmergencySupplyChain[];
  distribution_points: DistributionPoint[];
  transport_routes: string[];
  estimated_delivery_time: number;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface DistributionPoint {
  name: string;
  location: string;
  capacity: number;
  latitude: number;
  longitude: number;
}

export interface EmergencyLegalFramework {
  id: string;
  crisis_type: CrisisType;
  legal_basis: string;
  authority_level: string;
  emergency_powers: string[];
  limitations: string[];
  review_date: string;
  status: ContinuityStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyVolunteer {
  id: string;
  name: string;
  phone: string;
  email: string;
  skills: string[];
  availability: string;
  assigned_crisis_id: string | null;
  assigned_role: string;
  hours_contributed: number;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisEnvironmentalImpact {
  id: string;
  crisis_id: string;
  impact_type: string;
  affected_area_km2: number;
  description: string;
  remediation_cost: number;
  remediation_timeline: string;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyInsuranceClaim {
  id: string;
  crisis_id: string;
  school_id: string;
  insurance_provider: string;
  policy_number: string;
  claim_amount: number;
  approved_amount: number | null;
  claim_status: string;
  filed_date: string;
  resolved_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmergencyAcademicRecovery {
  id: string;
  crisis_id: string;
  school_id: string;
  original_end_date: string;
  new_end_date: string;
  additional_days_needed: number;
  recovery_strategies: string[];
  catch_up_plans: AcademicCatchUpPlan[];
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface AcademicCatchUpPlan {
  subject: string;
  hours_needed: number;
  strategy: string;
  responsible: string;
}

export interface EmergencyFamilyReunification {
  id: string;
  crisis_id: string;
  school_id: string;
  student_id: string;
  guardian_name: string;
  guardian_phone: string;
  pickup_time: string | null;
  pickup_location: string;
  verified: boolean;
  verified_by: string | null;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisPublicInformation {
  id: string;
  crisis_id: string;
  information_type: string;
  title: string;
  content: string;
  target_audience: string;
  channels: CommunicationChannel[];
  frequency: string;
  responsible_person: string;
  status: CommunicationStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencySecurityPerimeter {
  id: string;
  crisis_id: string;
  perimeter_name: string;
  perimeter_type: string;
  coordinates: Record<string, unknown>[];
  access_level: string;
  authorized_personnel: string[];
  checkpoints: SecurityCheckpoint[];
  status: ActivationLevel;
  created_at: string;
  updated_at: string;
}

export interface SecurityCheckpoint {
  name: string;
  location: string;
  staffed: boolean;
  equipment: string[];
}

export interface EmergencySituationalAwareness {
  id: string;
  crisis_id: string;
  assessment_time: string;
  overall_situation: string;
  threat_level: SecurityThreatLevel;
  weather_conditions: string;
  infrastructure_status: string;
  resource_status: string;
  population_status: string;
  next_update: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyCommunicationProtocol {
  id: string;
  protocol_name: string;
  crisis_type: CrisisType;
  severity_level: SeverityLevel;
  communication_channels: CommunicationChannel[];
  message_templates: MessageTemplate[];
  escalation_procedure: string[];
  backup_channels: CommunicationChannel[];
  status: ContinuityStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyCriticalInfrastructure {
  id: string;
  infrastructure_name: string;
  infrastructure_type: string;
  location: string;
  latitude: number;
  longitude: number;
  importance_level: RiskLevel;
  current_status: string;
  damage_assessment: DamageAssessment;
  restoration_priority: number;
  estimated_restoration_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmergencyMassCasualty {
  id: string;
  crisis_id: string;
  total_casualties: number;
  fatalities: number;
  serious_injuries: number;
  minor_injuries: number;
  missing: number;
  hospitals_notified: number;
  ambulances_dispatched: number;
  medical_teams_deployed: number;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisResourceAllocation {
  id: string;
  crisis_id: string;
  resource_type: EmergencyResourceType;
  quantity_allocated: number;
  allocated_to: string;
  allocation_date: string;
  return_date: string | null;
  condition_on_return: string;
  status: ResourceAllocationStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyPowerSystem {
  id: string;
  facility_id: string;
  primary_source: string;
  backup_source: string;
  capacity_kw: number;
  current_load_kw: number;
  fuel_level_percentage: number;
  estimated_runtime_hours: number;
  status: ResourceStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencyWaterSupply {
  id: string;
  facility_id: string;
  source_type: string;
  daily_capacity_liters: number;
  current_level_liters: number;
  quality_status: string;
  treatment_required: boolean;
  estimated_days_remaining: number;
  status: ResourceStatus;
  created_at: string;
  updated_at: string;
}

export interface CrisisLearningLoss {
  id: string;
  crisis_id: string;
  school_id: string;
  total_students: number;
  days_lost: number;
  estimated_learning_loss_weeks: number;
  affected_subjects: string[];
  recovery_cost_estimate: number;
  mitigation_strategies: string[];
  created_at: string;
  updated_at: string;
}

export interface EmergencyNutritionSupport {
  id: string;
  crisis_id: string;
  shelter_id: string;
  meals_provided: number;
  beneficiaries_fed: number;
  nutrition_type: string;
  dietary_requirements_met: boolean;
  food_safety_compliant: boolean;
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

export interface EmergencySecurityPersonnel {
  id: string;
  crisis_id: string;
  personnel_type: string;
  deployment_count: number;
  deployment_location: string;
  shift_start: string;
  shift_end: string;
  equipment_issued: string[];
  status: ResponseStatus;
  created_at: string;
  updated_at: string;
}

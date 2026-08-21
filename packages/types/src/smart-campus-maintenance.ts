export enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  ON_HOLD = "ON_HOLD",
  PENDING_PARTS = "PENDING_PARTS",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
  REOPENED = "REOPENED",
  CANCELLED = "CANCELLED",
}

export enum TicketPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY",
}

export enum MaintenanceType3 {
  PREVENTIVE = "PREVENTIVE",
  CORRECTIVE = "CORRECTIVE",
  PREDICTIVE = "PREDICTIVE",
  CONDITION_BASED = "CONDITION_BASED",
  EMERGENCY = "EMERGENCY",
  INSPECTION = "INSPECTION",
}

export enum WorkOrderStatus {
  DRAFT = "DRAFT",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  IN_PROGRESS = "IN_PROGRESS",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REJECTED = "REJECTED",
}

export enum ContractType {
  FULL_SERVICE = "FULL_SERVICE",
  TIME_AND_MATERIAL = "TIME_AND_MATERIAL",
  WARRANTY = "WARRANTY",
  SCHEDULED = "SCHEDULED",
  ON_CALL = "ON_CALL",
  FIXED_PRICE = "FIXED_PRICE",
}

export enum TechnicianStatus {
  AVAILABLE = "AVAILABLE",
  BUSY = "BUSY",
  ON_LEAVE = "ON_LEAVE",
  OFF_DUTY = "OFF_DUTY",
  IN_TRANSIT = "IN_TRANSIT",
}

export enum SparePartStatus {
  IN_STOCK = "IN_STOCK",
  LOW_STOCK = "LOW_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  ON_ORDER = "ON_ORDER",
  DISCONTINUED = "DISCONTINUED",
}

export enum ScheduleFrequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  BIWEEKLY = "BIWEEKLY",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  SEMI_ANNUAL = "SEMI_ANNUAL",
  ANNUAL = "ANNUAL",
  CUSTOM = "CUSTOM",
}

export enum EscalationLevel {
  NONE = "NONE",
  LEVEL_1 = "LEVEL_1",
  LEVEL_2 = "LEVEL_2",
  LEVEL_3 = "LEVEL_3",
  MANAGEMENT = "MANAGEMENT",
}

export enum MaintenanceCategory {
  ELECTRICAL = "ELECTRICAL",
  PLUMBING = "PLUMBING",
  HVAC = "HVAC",
  STRUCTURAL = "STRUCTURAL",
  PAINTING = "PAINTING",
  LANDSCAPING = "LANDSCAPING",
  CLEANING = "CLEANING",
  SECURITY = "SECURITY",
  SAFETY = "SAFETY",
  GENERAL = "GENERAL",
}

export enum ApprovalStatus2 {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export enum QualityCheckStatus {
  PENDING = "PENDING",
  PASSED = "PASSED",
  FAILED = "FAILED",
  CONDITIONAL = "CONDITIONAL",
  NOT_REQUIRED = "NOT_REQUIRED",
}

export interface MaintenanceTicket {
  id: string;
  school_id: string;
  ticket_number: string;
  title: string;
  description: string;
  category: MaintenanceCategory;
  maintenance_type: MaintenanceType3;
  priority: TicketPriority;
  status: TicketStatus;
  location_id: string;
  location_name: string;
  building_id: string;
  building_name: string;
  room_id: string | null;
  room_number: string | null;
  asset_id: string | null;
  asset_name: string | null;
  reported_by: string;
  reported_by_name: string;
  reported_date: string;
  assigned_to: string | null;
  assigned_to_name: string | null;
  assigned_date: string | null;
  estimated_start_date: string | null;
  estimated_completion_date: string | null;
  actual_start_date: string | null;
  actual_completion_date: string | null;
  due_date: string | null;
  sla_due_date: string | null;
  escalation_level: EscalationLevel;
  root_cause: string | null;
  resolution: string | null;
  notes: string;
  images: string[];
  documents: string[];
  comments: TicketComment[];
  time_entries: TimeEntry[];
  parts_used: PartUsage[];
  estimated_cost: number;
  actual_cost: number;
  labor_hours: number;
  is_recurring: boolean;
  recurring_ticket_id: string | null;
  parent_ticket_id: string | null;
  satisfaction_rating: number | null;
  satisfaction_feedback: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceTicketCreate {
  school_id: string;
  title: string;
  description: string;
  category: MaintenanceCategory;
  maintenance_type: MaintenanceType3;
  priority: TicketPriority;
  location_id: string;
  location_name: string;
  building_id: string;
  building_name: string;
  room_id: string | null;
  room_number: string | null;
  asset_id: string | null;
  asset_name: string | null;
  reported_by: string;
  reported_by_name: string;
  assigned_to: string | null;
  assigned_to_name: string | null;
  estimated_start_date: string | null;
  estimated_completion_date: string | null;
  due_date: string | null;
  estimated_cost: number;
  notes: string;
  images: string[];
  documents: string[];
  is_recurring: boolean;
  parent_ticket_id: string | null;
}

export interface MaintenanceTicketUpdate {
  title?: string;
  description?: string;
  category?: MaintenanceCategory;
  maintenance_type?: MaintenanceType3;
  priority?: TicketPriority;
  status?: TicketStatus;
  assigned_to?: string | null;
  assigned_to_name?: string | null;
  assigned_date?: string | null;
  estimated_start_date?: string | null;
  estimated_completion_date?: string | null;
  actual_start_date?: string | null;
  actual_completion_date?: string | null;
  due_date?: string | null;
  escalation_level?: EscalationLevel;
  root_cause?: string | null;
  resolution?: string | null;
  notes?: string;
  images?: string[];
  documents?: string[];
  estimated_cost?: number;
  actual_cost?: number;
  labor_hours?: number;
  satisfaction_rating?: number | null;
  satisfaction_feedback?: string | null;
}

export interface PreventiveMaintenance {
  id: string;
  school_id: string;
  plan_name: string;
  description: string;
  asset_id: string | null;
  asset_name: string | null;
  location_id: string;
  location_name: string;
  building_id: string;
  category: MaintenanceCategory;
  frequency: ScheduleFrequency;
  custom_frequency_days: number | null;
  start_date: string;
  end_date: string | null;
  next_execution: string;
  last_execution: string | null;
  assigned_team: string[];
  assigned_to: string[];
  estimated_duration: number;
  estimated_cost: number;
  checklist: ChecklistItem[];
  required_parts: RequiredPart[];
  instructions: string;
  priority: TicketPriority;
  is_active: boolean;
  auto_generate_ticket: boolean;
  advance_notice_days: number;
  total_executions: number;
  compliance_rate: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PreventiveMaintenanceCreate {
  school_id: string;
  plan_name: string;
  description: string;
  asset_id: string | null;
  asset_name: string | null;
  location_id: string;
  location_name: string;
  building_id: string;
  category: MaintenanceCategory;
  frequency: ScheduleFrequency;
  custom_frequency_days: number | null;
  start_date: string;
  end_date: string | null;
  assigned_team: string[];
  assigned_to: string[];
  estimated_duration: number;
  estimated_cost: number;
  checklist: ChecklistItem[];
  required_parts: RequiredPart[];
  instructions: string;
  priority: TicketPriority;
  auto_generate_ticket: boolean;
  advance_notice_days: number;
  notes: string;
}

export interface CorrectiveMaintenance {
  id: string;
  school_id: string;
  ticket_id: string;
  root_cause: string;
  failure_type: string;
  failure_mode: string;
  corrective_action: string;
  preventive_action: string | null;
  parts_replaced: PartReplacement[];
  labor_hours: number;
  downtime_hours: number;
  before_condition: string;
  after_condition: string;
  cost_breakdown: CostBreakdown;
  findings: string;
  recommendations: string[];
  photos_before: string[];
  photos_after: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CorrectiveMaintenanceCreate {
  school_id: string;
  ticket_id: string;
  root_cause: string;
  failure_type: string;
  failure_mode: string;
  corrective_action: string;
  preventive_action: string | null;
  parts_replaced: PartReplacement[];
  labor_hours: number;
  downtime_hours: number;
  before_condition: string;
  after_condition: string;
  cost_breakdown: CostBreakdown;
  findings: string;
  recommendations: string[];
  photos_before: string[];
  photos_after: string[];
  notes: string;
}

export interface Technician {
  id: string;
  school_id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo_url: string;
  specializations: string[];
  certifications: Certification[];
  status: TechnicianStatus;
  current_location_id: string | null;
  current_location_name: string | null;
  skill_level: string;
  hourly_rate: number;
  max_concurrent_tickets: number;
  current_ticket_count: number;
  average_rating: number;
  total_jobs_completed: number;
  total_jobs_assigned: number;
  availability: TechnicianAvailability[];
  is_active: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface TechnicianCreate {
  school_id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo_url: string;
  specializations: string[];
  certifications: Certification[];
  hourly_rate: number;
  max_concurrent_tickets: number;
  skill_level: string;
  notes: string;
}

export interface WorkOrder {
  id: string;
  school_id: string;
  work_order_number: string;
  title: string;
  description: string;
  ticket_id: string | null;
  category: MaintenanceCategory;
  maintenance_type: MaintenanceType3;
  priority: TicketPriority;
  status: WorkOrderStatus;
  location_id: string;
  location_name: string;
  building_id: string;
  building_name: string;
  room_id: string | null;
  room_number: string | null;
  asset_id: string | null;
  asset_name: string | null;
  requested_by: string;
  requested_by_name: string;
  requested_date: string;
  assigned_to: string[];
  assigned_to_names: string[];
  assigned_date: string | null;
  approved_by: string | null;
  approved_by_name: string | null;
  approved_date: string | null;
  scheduled_start_date: string;
  scheduled_end_date: string;
  actual_start_date: string | null;
  actual_end_date: string | null;
  estimated_hours: number;
  actual_hours: number | null;
  estimated_cost: number;
  actual_cost: number | null;
  parts: WorkOrderPart[];
  tools_required: string[];
  safety_requirements: string[];
  instructions: string;
  notes: string;
  images: string[];
  documents: string[];
  quality_check_id: string | null;
  is_emergency: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkOrderCreate {
  school_id: string;
  title: string;
  description: string;
  ticket_id: string | null;
  category: MaintenanceCategory;
  maintenance_type: MaintenanceType3;
  priority: TicketPriority;
  location_id: string;
  location_name: string;
  building_id: string;
  building_name: string;
  room_id: string | null;
  room_number: string | null;
  asset_id: string | null;
  asset_name: string | null;
  requested_by: string;
  requested_by_name: string;
  assigned_to: string[];
  assigned_to_names: string[];
  scheduled_start_date: string;
  scheduled_end_date: string;
  estimated_hours: number;
  estimated_cost: number;
  parts: WorkOrderPart[];
  tools_required: string[];
  safety_requirements: string[];
  instructions: string;
  notes: string;
  is_emergency: boolean;
}

export interface MaintenanceContract {
  id: string;
  school_id: string;
  contract_number: string;
  contract_name: string;
  vendor_id: string;
  vendor_name: string;
  contract_type: ContractType;
  description: string;
  scope: string;
  category: MaintenanceCategory;
  start_date: string;
  end_date: string;
  renewal_date: string | null;
  auto_renew: boolean;
  total_value: number;
  monthly_cost: number;
  payment_terms: string;
  sla_terms: SLATerms;
  coverage_hours: CoverageHours;
  max_response_time: number;
  max_resolution_time: number;
  penalty_clause: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  documents: string[];
  status: string;
  tickets_covered: number;
  tickets_used: number;
  remaining_value: number;
  performance_score: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceContractCreate {
  school_id: string;
  contract_number: string;
  contract_name: string;
  vendor_id: string;
  vendor_name: string;
  contract_type: ContractType;
  description: string;
  scope: string;
  category: MaintenanceCategory;
  start_date: string;
  end_date: string;
  renewal_date: string | null;
  auto_renew: boolean;
  total_value: number;
  monthly_cost: number;
  payment_terms: string;
  sla_terms: SLATerms;
  coverage_hours: CoverageHours;
  max_response_time: number;
  max_resolution_time: number;
  penalty_clause: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  documents: string[];
  notes: string;
}

export interface SparePart {
  id: string;
  school_id: string;
  part_number: string;
  name: string;
  description: string;
  category: MaintenanceCategory;
  brand: string;
  model: string;
  compatible_assets: string[];
  unit_cost: number;
  quantity_in_stock: number;
  minimum_stock: number;
  maximum_stock: number;
  reorder_point: number;
  reorder_quantity: number;
  status: SparePartStatus;
  location: string;
  warehouse_id: string | null;
  warehouse_name: string | null;
  bin_location: string | null;
  supplier_id: string;
  supplier_name: string;
  lead_time_days: number;
  last_restocked: string | null;
  last_issued: string | null;
  total_issued: number;
  total_received: number;
  total_cost: number;
  images: string[];
  documents: string[];
  barcode: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SparePartCreate {
  school_id: string;
  part_number: string;
  name: string;
  description: string;
  category: MaintenanceCategory;
  brand: string;
  model: string;
  compatible_assets: string[];
  unit_cost: number;
  quantity_in_stock: number;
  minimum_stock: number;
  maximum_stock: number;
  reorder_point: number;
  reorder_quantity: number;
  location: string;
  warehouse_id: string | null;
  warehouse_name: string | null;
  bin_location: string | null;
  supplier_id: string;
  supplier_name: string;
  lead_time_days: number;
  images: string[];
  documents: string[];
  barcode: string;
  notes: string;
}

export interface MaintenanceCalendar {
  id: string;
  school_id: string;
  event_title: string;
  event_type: string;
  description: string;
  category: MaintenanceCategory;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  location_id: string | null;
  location_name: string | null;
  building_id: string | null;
  building_name: string | null;
  asset_id: string | null;
  asset_name: string | null;
  ticket_id: string | null;
  work_order_id: string | null;
  preventive_maintenance_id: string | null;
  assigned_to: string[];
  assigned_to_names: string[];
  assigned_team: string[];
  attendees: string[];
  is_recurring: boolean;
  recurrence_pattern: string | null;
  recurrence_end_date: string | null;
  reminder_minutes: number[];
  color: string;
  is_blocked: boolean;
  block_reason: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceCalendarCreate {
  school_id: string;
  event_title: string;
  event_type: string;
  description: string;
  category: MaintenanceCategory;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  all_day: boolean;
  location_id: string | null;
  location_name: string | null;
  building_id: string | null;
  building_name: string | null;
  asset_id: string | null;
  asset_name: string | null;
  ticket_id: string | null;
  work_order_id: string | null;
  preventive_maintenance_id: string | null;
  assigned_to: string[];
  assigned_to_names: string[];
  assigned_team: string[];
  attendees: string[];
  is_recurring: boolean;
  recurrence_pattern: string | null;
  recurrence_end_date: string | null;
  reminder_minutes: number[];
  color: string;
  notes: string;
}

export interface MaintenanceFilter {
  school_id?: string;
  category?: MaintenanceCategory;
  maintenance_type?: MaintenanceType3;
  priority?: TicketPriority;
  status?: TicketStatus;
  building_id?: string;
  room_id?: string;
  asset_id?: string;
  assigned_to?: string;
  reported_by?: string;
  date_from?: string;
  date_to?: string;
  due_date_from?: string;
  due_date_to?: string;
  search?: string;
  is_emergency?: boolean;
  escalation_level?: EscalationLevel;
}

export interface MaintenanceAnalytics {
  total_tickets: number;
  open_tickets: number;
  in_progress_tickets: number;
  resolved_tickets: number;
  closed_tickets: number;
  overdue_tickets: number;
  average_resolution_time: number;
  average_first_response_time: number;
  tickets_by_category: TicketCategoryStat[];
  tickets_by_priority: TicketPriorityStat[];
  tickets_by_status: TicketStatusStat[];
  tickets_by_building: BuildingTicketStat[];
  technician_performance: TechnicianPerformanceStat[];
  cost_summary: MaintenanceCostSummary;
  sla_compliance: SLACompliance;
  monthly_trends: MaintenanceMonthlyTrend[];
  top_issues: TopIssue[];
}

export interface MaintenanceReport {
  id: string;
  school_id: string;
  title: string;
  description: string;
  report_type: string;
  generated_by: string;
  date_from: string;
  date_to: string;
  filters: MaintenanceFilter;
  data: MaintenanceAnalytics;
  format: string;
  file_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceSchedule {
  id: string;
  school_id: string;
  schedule_name: string;
  description: string;
  category: MaintenanceCategory;
  frequency: ScheduleFrequency;
  custom_frequency_days: number | null;
  preferred_day: string | null;
  preferred_time: string | null;
  start_date: string;
  end_date: string | null;
  next_execution: string;
  last_execution: string | null;
  building_ids: string[];
  room_ids: string[];
  asset_ids: string[];
  assigned_team: string[];
  assigned_to: string[];
  estimated_duration: number;
  estimated_cost: number;
  instructions: string;
  checklist: ChecklistItem[];
  required_parts: RequiredPart[];
  is_active: boolean;
  auto_generate_work_order: boolean;
  advance_notice_days: number;
  total_executions: number;
  compliance_rate: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceSLA {
  id: string;
  school_id: string;
  sla_name: string;
  description: string;
  category: MaintenanceCategory;
  priority: TicketPriority;
  max_response_time_hours: number;
  max_resolution_time_hours: number;
  escalation_threshold_percentage: number;
  business_hours_only: boolean;
  exclude_weekends: boolean;
  exclude_holidays: boolean;
  holiday_list: string[];
  penalties: SLAPenalty[];
  notifications: SLANotification[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceCost {
  id: string;
  school_id: string;
  cost_type: string;
  category: MaintenanceCategory;
  building_id: string | null;
  building_name: string | null;
  asset_id: string | null;
  asset_name: string | null;
  ticket_id: string | null;
  work_order_id: string | null;
  description: string;
  amount: number;
  labor_cost: number;
  parts_cost: number;
  external_cost: number;
  date: string;
  period: string;
  approved_by: string | null;
  approved_by_name: string | null;
  invoice_number: string | null;
  payment_status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface QualityCheck {
  id: string;
  school_id: string;
  work_order_id: string;
  ticket_id: string;
  inspector_id: string;
  inspector_name: string;
  inspection_date: string;
  status: QualityCheckStatus;
  checklist: QualityCheckItem[];
  overall_score: number;
  passed_items: number;
  failed_items: number;
  total_items: number;
  issues_found: QualityIssue[];
  corrective_actions: string[];
  photos: string[];
  documents: string[];
  notes: string;
  approved_by: string | null;
  approved_by_name: string | null;
  approved_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceHistory {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  performed_by: string;
  performed_by_name: string;
  timestamp: string;
  changes: HistoryChange[];
  old_status: string | null;
  new_status: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  author_id: string;
  author_name: string;
  content: string;
  is_internal: boolean;
  attachments: string[];
  created_at: string;
  updated_at: string;
}

export interface TimeEntry {
  id: string;
  ticket_id: string;
  technician_id: string;
  technician_name: string;
  date: string;
  start_time: string;
  end_time: string;
  hours: number;
  description: string;
  is_billable: boolean;
  hourly_rate: number;
  created_at: string;
  updated_at: string;
}

export interface PartUsage {
  part_id: string;
  part_name: string;
  part_number: string;
  quantity_used: number;
  unit_cost: number;
  total_cost: number;
  notes: string;
}

export interface ChecklistItem {
  id: string;
  description: string;
  is_mandatory: boolean;
  expected_value: string | null;
  notes: string;
}

export interface RequiredPart {
  part_id: string;
  part_name: string;
  part_number: string;
  quantity_required: number;
  is_optional: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  certificate_number: string;
  document_url: string | null;
}

export interface TechnicianAvailability {
  day: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface PartReplacement {
  part_id: string;
  part_name: string;
  part_number: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
}

export interface CostBreakdown {
  labor_cost: number;
  parts_cost: number;
  external_cost: number;
  other_cost: number;
  total_cost: number;
}

export interface WorkOrderPart {
  part_id: string;
  part_name: string;
  part_number: string;
  quantity: number;
  unit_cost: number;
  total_cost: number;
  status: string;
}

export interface SLATerms {
  response_time_hours: number;
  resolution_time_hours: number;
  uptime_percentage: number;
  penalty_per_hour: number;
  max_penalty_amount: number;
}

export interface CoverageHours {
  start_time: string;
  end_time: string;
  days: string[];
  is_24_7: boolean;
}

export interface SLAPenalty {
  breach_type: string;
  penalty_amount: number;
  max_penalty: number;
  description: string;
}

export interface SLANotification {
  threshold_percentage: number;
  notification_type: string;
  recipient_ids: string[];
}

export interface TicketCategoryStat {
  category: MaintenanceCategory;
  count: number;
  percentage: number;
  average_resolution_time: number;
}

export interface TicketPriorityStat {
  priority: TicketPriority;
  count: number;
  percentage: number;
  average_resolution_time: number;
}

export interface TicketStatusStat {
  status: TicketStatus;
  count: number;
  percentage: number;
}

export interface BuildingTicketStat {
  building_id: string;
  building_name: string;
  total_tickets: number;
  open_tickets: number;
  average_resolution_time: number;
}

export interface TechnicianPerformanceStat {
  technician_id: string;
  technician_name: string;
  total_assigned: number;
  total_completed: number;
  average_rating: number;
  average_resolution_time: number;
  total_labor_hours: number;
}

export interface MaintenanceCostSummary {
  total_cost: number;
  labor_cost: number;
  parts_cost: number;
  external_cost: number;
  cost_by_category: CategoryCostStat[];
  cost_by_building: BuildingCostStat[];
  monthly_costs: MonthlyCostStat[];
}

export interface SLACompliance {
  overall_compliance: number;
  response_time_compliance: number;
  resolution_time_compliance: number;
  compliance_by_priority: PriorityCompliance[];
  violations: SLAViolation[];
}

export interface MaintenanceMonthlyTrend {
  month: string;
  total_tickets: number;
  resolved_tickets: number;
  average_resolution_time: number;
  total_cost: number;
}

export interface TopIssue {
  category: MaintenanceCategory;
  description: string;
  count: number;
  average_resolution_time: number;
  total_cost: number;
}

export interface CategoryCostStat {
  category: MaintenanceCategory;
  total_cost: number;
  percentage: number;
}

export interface BuildingCostStat {
  building_id: string;
  building_name: string;
  total_cost: number;
  percentage: number;
}

export interface MonthlyCostStat {
  month: string;
  total_cost: number;
  labor_cost: number;
  parts_cost: number;
}

export interface PriorityCompliance {
  priority: TicketPriority;
  compliance_rate: number;
  target_compliance: number;
}

export interface SLAViolation {
  ticket_id: string;
  ticket_number: string;
  violation_type: string;
  expected_date: string;
  actual_date: string | null;
  hours_overdue: number;
  penalty_amount: number;
}

export interface QualityCheckItem {
  id: string;
  description: string;
  status: QualityCheckStatus;
  score: number;
  notes: string;
  photos: string[];
}

export interface QualityIssue {
  id: string;
  description: string;
  severity: string;
  category: string;
  corrective_action: string;
  assigned_to: string;
  due_date: string;
  status: string;
}

export interface HistoryChange {
  field: string;
  old_value: string;
  new_value: string;
}

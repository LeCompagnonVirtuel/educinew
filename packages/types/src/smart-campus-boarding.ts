export enum BuildingType {
  DORMITORY = "DORMITORY",
  HOSTEL = "HOSTEL",
  APARTMENT = "APARTMENT",
  FAMILY_HOUSING = "FAMILY_HOUSING",
  STAFF_QUARTERS = "STAFF_QUARTERS",
  GUEST_HOUSE = "GUEST_HOUSE",
}

export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  TRIPLE = "TRIPLE",
  QUAD = "QUAD",
  DORMITORY = "DORMITORY",
  SUITE = "SUITE",
  STUDIO = "STUDIO",
  FAMILY = "FAMILY",
}

export enum BedStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  RESERVED = "RESERVED",
  MAINTENANCE = "MAINTENANCE",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
}

export enum OccupancyStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CHECKED_OUT = "CHECKED_OUT",
  PENDING = "PENDING",
  EXTENDED = "EXTENDED",
  TERMINATED = "TERMINATED",
}

export enum AssignmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum NightReportStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  REVIEWED = "REVIEWED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum VisitorStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
  BLOCKED = "BLOCKED",
}

export enum DisciplineStatus {
  PENDING = "PENDING",
  UNDER_INVESTIGATION = "UNDER_INVESTIGATION",
  RESOLVED = "RESOLVED",
  ESCALATED = "ESCALATED",
  CLOSED = "CLOSED",
}

export enum MaintenanceStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD",
  CANCELLED = "CANCELLED",
}

export enum CheckInOutStatus {
  SCHEDULED = "SCHEDULED",
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
  OVERDUE = "OVERDUE",
  CANCELLED = "CANCELLED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  ANY = "ANY",
}

export enum RoomCapacity {
  SINGLE = 1,
  DOUBLE = 2,
  TRIPLE = 3,
  QUAD = 4,
  DORMITORY = 8,
  LARGE_DORMITORY = 16,
}

export enum BuildingStatus {
  ACTIVE = "ACTIVE",
  UNDER_RENOVATION = "UNDER_RENOVATION",
  CLOSED = "CLOSED",
  PLANNED = "PLANNED",
}

export enum VisitorType {
  STUDENT_VISITOR = "STUDENT_VISITOR",
  PARENT = "PARENT",
  GUEST = "GUEST",
  VENDOR = "VENDOR",
  CONTRACTOR = "CONTRACTOR",
  STAFF = "STAFF",
}

export enum ReportType {
  NIGHT_REPORT = "NIGHT_REPORT",
  INCIDENT_REPORT = "INCIDENT_REPORT",
  MAINTENANCE_REPORT = "MAINTENANCE_REPORT",
  DISCIPLINE_REPORT = "DISCIPLINE_REPORT",
  ATTENDANCE_REPORT = "ATTENDANCE_REPORT",
  GENERAL_REPORT = "GENERAL_REPORT",
}

export interface Building {
  id: string;
  school_id: string;
  name: string;
  code: string;
  type: BuildingType;
  status: BuildingStatus;
  address: string;
  floors: number;
  total_rooms: number;
  total_beds: number;
  occupied_beds: number;
  warden_id: string | null;
  contact_phone: string;
  amenities: string[];
  rules: string[];
  description: string;
  images: string[];
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface BuildingCreate {
  school_id: string;
  name: string;
  code: string;
  type: BuildingType;
  status: BuildingStatus;
  address: string;
  floors: number;
  total_rooms: number;
  total_beds: number;
  warden_id: string | null;
  contact_phone: string;
  amenities: string[];
  rules: string[];
  description: string;
  images: string[];
  latitude: number | null;
  longitude: number | null;
}

export interface BuildingUpdate {
  name?: string;
  code?: string;
  type?: BuildingType;
  status?: BuildingStatus;
  address?: string;
  floors?: number;
  total_rooms?: number;
  total_beds?: number;
  warden_id?: string | null;
  contact_phone?: string;
  amenities?: string[];
  rules?: string[];
  description?: string;
  images?: string[];
  latitude?: number | null;
  longitude?: number | null;
}

export interface Room {
  id: string;
  school_id: string;
  building_id: string;
  number: string;
  floor: number;
  type: RoomType;
  capacity: number;
  occupied: number;
  gender: Gender;
  status: OccupancyStatus;
  amenities: string[];
  monthly_rate: number;
  description: string;
  images: string[];
  is_accessible: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoomCreate {
  school_id: string;
  building_id: string;
  number: string;
  floor: number;
  type: RoomType;
  capacity: number;
  gender: Gender;
  amenities: string[];
  monthly_rate: number;
  description: string;
  images: string[];
  is_accessible: boolean;
}

export interface RoomUpdate {
  number?: string;
  floor?: number;
  type?: RoomType;
  capacity?: number;
  gender?: Gender;
  status?: OccupancyStatus;
  amenities?: string[];
  monthly_rate?: number;
  description?: string;
  images?: string[];
  is_accessible?: boolean;
}

export interface Bed {
  id: string;
  school_id: string;
  room_id: string;
  label: string;
  position: string;
  status: BedStatus;
  assigned_to: string | null;
  assigned_at: string | null;
  monthly_rate: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface BedCreate {
  school_id: string;
  room_id: string;
  label: string;
  position: string;
  monthly_rate: number;
  description: string;
}

export interface BedUpdate {
  label?: string;
  position?: string;
  status?: BedStatus;
  assigned_to?: string | null;
  assigned_at?: string | null;
  monthly_rate?: number;
  description?: string;
}

export interface Occupancy {
  id: string;
  school_id: string;
  bed_id: string;
  room_id: string;
  building_id: string;
  student_id: string;
  check_in_date: string;
  check_out_date: string | null;
  expected_check_out_date: string | null;
  status: OccupancyStatus;
  monthly_rate: number;
  total_paid: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface OccupancyCreate {
  school_id: string;
  bed_id: string;
  room_id: string;
  building_id: string;
  student_id: string;
  check_in_date: string;
  check_out_date: string | null;
  expected_check_out_date: string | null;
  monthly_rate: number;
  total_paid: number;
  notes: string;
}

export interface RoomAssignment {
  id: string;
  school_id: string;
  room_id: string;
  bed_id: string;
  student_id: string;
  status: AssignmentStatus;
  start_date: string;
  end_date: string | null;
  approved_by: string | null;
  approved_at: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface RoomAssignmentCreate {
  school_id: string;
  room_id: string;
  bed_id: string;
  student_id: string;
  start_date: string;
  end_date: string | null;
  notes: string;
}

export interface BoardingAttendance {
  id: string;
  school_id: string;
  student_id: string;
  building_id: string;
  room_id: string;
  date: string;
  time_in: string | null;
  time_out: string | null;
  status: CheckInOutStatus;
  recorded_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BoardingAttendanceCreate {
  school_id: string;
  student_id: string;
  building_id: string;
  room_id: string;
  date: string;
  time_in: string | null;
  time_out: string | null;
  status: CheckInOutStatus;
  recorded_by: string;
  notes: string;
}

export interface NightReport {
  id: string;
  school_id: string;
  building_id: string;
  report_date: string;
  shift: NightShift;
  reporter_id: string;
  status: NightReportStatus;
  total_students: number;
  present: number;
  absent: number;
  late: number;
  visitors_count: number;
  incidents: IncidentEntry[];
  maintenance_issues: string[];
  notes: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NightReportCreate {
  school_id: string;
  building_id: string;
  report_date: string;
  shift: NightShift;
  reporter_id: string;
  total_students: number;
  present: number;
  absent: number;
  late: number;
  visitors_count: number;
  incidents: IncidentEntry[];
  maintenance_issues: string[];
  notes: string;
}

export interface Visitor {
  id: string;
  school_id: string;
  building_id: string;
  visitor_name: string;
  visitor_type: VisitorType;
  id_type: string;
  id_number: string;
  phone: string;
  email: string;
  photo_url: string;
  purpose: string;
  student_id: string | null;
  host_name: string;
  check_in_time: string;
  check_out_time: string | null;
  status: VisitorStatus;
  badge_number: string | null;
  vehicle_plate: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorCreate {
  school_id: string;
  building_id: string;
  visitor_name: string;
  visitor_type: VisitorType;
  id_type: string;
  id_number: string;
  phone: string;
  email: string;
  photo_url: string;
  purpose: string;
  student_id: string | null;
  host_name: string;
  vehicle_plate: string | null;
  notes: string;
}

export interface Discipline {
  id: string;
  school_id: string;
  building_id: string;
  student_id: string;
  incident_date: string;
  incident_type: string;
  description: string;
  severity: string;
  status: DisciplineStatus;
  reported_by: string;
  witnesses: string[];
  action_taken: string;
  follow_up_date: string | null;
  resolved_by: string | null;
  resolved_at: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface DisciplineCreate {
  school_id: string;
  building_id: string;
  student_id: string;
  incident_date: string;
  incident_type: string;
  description: string;
  severity: string;
  reported_by: string;
  witnesses: string[];
  action_taken: string;
  follow_up_date: string | null;
  notes: string;
}

export interface BuildingMaintenance {
  id: string;
  school_id: string;
  building_id: string;
  room_id: string | null;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: MaintenanceStatus;
  reported_by: string;
  assigned_to: string | null;
  reported_date: string;
  scheduled_date: string | null;
  completed_date: string | null;
  estimated_cost: number;
  actual_cost: number | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BuildingMaintenanceCreate {
  school_id: string;
  building_id: string;
  room_id: string | null;
  title: string;
  description: string;
  category: string;
  priority: string;
  reported_by: string;
  assigned_to: string | null;
  scheduled_date: string | null;
  estimated_cost: number;
  notes: string;
}

export interface RoomFilter {
  school_id?: string;
  building_id?: string;
  type?: RoomType;
  gender?: Gender;
  status?: OccupancyStatus;
  min_capacity?: number;
  max_capacity?: number;
  min_rate?: number;
  max_rate?: number;
  is_accessible?: boolean;
  has_vacancy?: boolean;
}

export interface BoardingAnalytics {
  total_buildings: number;
  total_rooms: number;
  total_beds: number;
  occupied_beds: number;
  available_beds: number;
  occupancy_rate: number;
  total_students: number;
  check_in_rate: number;
  average_stay_duration: number;
  total_revenue: number;
  pending_maintenance: number;
  active_violations: number;
  visitors_today: number;
  building_occupancy: BuildingOccupancyStat[];
  room_type_distribution: RoomTypeDistribution[];
  monthly_trends: MonthlyTrend[];
}

export interface BoardingReport {
  id: string;
  school_id: string;
  report_type: ReportType;
  title: string;
  description: string;
  generated_by: string;
  date_from: string;
  date_to: string;
  filters: RoomFilter;
  data: BoardingAnalytics;
  format: string;
  file_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface BuildingFilter {
  school_id?: string;
  type?: BuildingType;
  status?: BuildingStatus;
  warden_id?: string;
  min_beds?: number;
  max_beds?: number;
  has_vacancy?: boolean;
}

export interface RoomEquipment {
  id: string;
  school_id: string;
  room_id: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  serial_number: string;
  condition: string;
  purchase_date: string;
  warranty_expiry: string | null;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BedAllocation {
  id: string;
  school_id: string;
  bed_id: string;
  student_id: string;
  allocated_by: string;
  allocation_date: string;
  start_date: string;
  end_date: string | null;
  is_permanent: boolean;
  notes: string;
  created_at: string;
  updated_at: string;
}

export enum NightShift {
  EVENING = "EVENING",
  NIGHT = "NIGHT",
  OVERNIGHT = "OVERNIGHT",
}

export interface IncidentEntry {
  time: string;
  type: string;
  description: string;
  severity: string;
  action_taken: string;
}

export interface VisitorLog {
  id: string;
  school_id: string;
  visitor_id: string;
  building_id: string;
  action: string;
  timestamp: string;
  recorded_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BuildingOccupancyStat {
  building_id: string;
  building_name: string;
  total_beds: number;
  occupied_beds: number;
  occupancy_rate: number;
}

export interface RoomTypeDistribution {
  type: RoomType;
  count: number;
  total_beds: number;
  occupied_beds: number;
}

export interface MonthlyTrend {
  month: string;
  total_beds: number;
  occupied_beds: number;
  new_assignments: number;
  check_outs: number;
  revenue: number;
}

// Smart Campus Enterprise Types - Transport Scolaire
// Phase 2.8 - EduCI Platform

// =============================================================================
// ENUMS
// =============================================================================

export enum BusStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  MAINTENANCE = "maintenance",
  OUT_OF_SERVICE = "out_of_service",
  RETIRED = "retired",
}

export enum BusType {
  STANDARD = "standard",
  MINI = "mini",
  LARGE = "large",
  ELECTRIC = "electric",
  ACCESSIBLE = "accessible",
}

export enum RouteStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  DISCONTINUED = "discontinued",
}

export enum TripStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  DELAYED = "delayed",
}

export enum DriverStatus {
  AVAILABLE = "available",
  ON_DUTY = "on_duty",
  OFF_DUTY = "off_duty",
  ON_LEAVE = "on_leave",
  SUSPENDED = "suspended",
}

export enum AssistantStatus {
  AVAILABLE = "available",
  ON_DUTY = "on_duty",
  OFF_DUTY = "off_duty",
  ON_LEAVE = "on_leave",
  SUSPENDED = "suspended",
}

export enum StudentAssignmentStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  CANCELLED = "cancelled",
  TRANSFERRED = "transferred",
}

export enum TrackingStatus {
  ACTIVE = "active",
  PAUSED = "paused",
  STOPPED = "stopped",
  LOST_SIGNAL = "lost_signal",
}

export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
  LATE = "late",
  EXCUSED = "excused",
  BOARDED = "boarded",
  DISEMBARKED = "disembarked",
}

export enum CheckInMethod {
  RFID = "rfid",
  QR_CODE = "qr_code",
  MANUAL = "manual",
  BIOMETRIC = "biometric",
  NFC = "nfc",
}

export enum FuelType {
  DIESEL = "diesel",
  GASOLINE = "gasoline",
  ELECTRIC = "electric",
  HYBRID = "hybrid",
  CNG = "cng",
  LPG = "lpg",
}

export enum MaintenanceType {
  PREVENTIVE = "preventive",
  CORRECTIVE = "corrective",
  EMERGENCY = "emergency",
  ROUTINE = "routine",
  INSPECTION = "inspection",
}

export enum InsuranceStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  PENDING_RENEWAL = "pending_renewal",
  CANCELLED = "cancelled",
  SUSPENDED = "suspended",
}

export enum IncidentType {
  ACCIDENT = "accident",
  BREAKDOWN = "breakdown",
  MEDICAL = "medical",
  BEHAVIORAL = "behavioral",
  MECHANICAL = "mechanical",
  WEATHER = "weather",
  SECURITY = "security",
}

export enum AlertLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
  EMERGENCY = "emergency",
}

export enum NotificationType {
  SMS = "sms",
  EMAIL = "email",
  PUSH = "push",
  IN_APP = "in_app",
  PHONE_CALL = "phone_call",
}

export enum FuelStatus {
  FULL = "full",
  THREE_QUARTERS = "three_quarters",
  HALF = "half",
  QUARTER = "quarter",
  LOW = "low",
  EMPTY = "empty",
}

export enum MaintenanceStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  DELAYED = "delayed",
}

export enum TripType {
  MORNING = "morning",
  EVENING = "evening",
  FIELD_TRIP = "field_trip",
  EXTRA = "extra",
  EMERGENCY = "emergency",
}

export enum RouteType {
  REGULAR = "regular",
  EXPRESS = "express",
  CIRCULAR = "circular",
  SPECIAL = "special",
}

// =============================================================================
// INTERFACES
// =============================================================================

export interface Bus {
  id: string;
  school_id: string;
  plate_number: string;
  brand: string;
  model: string;
  year: number;
  capacity: number;
  color: string;
  fuel_type: FuelType;
  type: BusType;
  status: BusStatus;
  gps_device_id: string;
  insurance_number: string;
  insurance_expiry: string;
  last_maintenance_date: string;
  next_maintenance_date: string;
  total_km: number;
  photo_url: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BusCreate {
  school_id: string;
  plate_number: string;
  brand: string;
  model: string;
  year: number;
  capacity: number;
  color: string;
  fuel_type: FuelType;
  type: BusType;
  gps_device_id: string;
  insurance_number: string;
  insurance_expiry: string;
  photo_url: string;
  notes: string;
}

export interface BusUpdate {
  plate_number?: string;
  brand?: string;
  model?: string;
  year?: number;
  capacity?: number;
  color?: string;
  fuel_type?: FuelType;
  type?: BusType;
  status?: BusStatus;
  gps_device_id?: string;
  insurance_number?: string;
  insurance_expiry?: string;
  last_maintenance_date?: string;
  next_maintenance_date?: string;
  total_km?: number;
  photo_url?: string;
  notes?: string;
}

export interface BusQuery {
  school_id: string;
  status?: BusStatus;
  type?: BusType;
  fuel_type?: FuelType;
  search?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface BusStop {
  id: string;
  school_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  zone: string;
  is_active: boolean;
  capacity: number;
  shelter_type: string;
  created_at: string;
  updated_at: string;
}

export interface BusStopCreate {
  school_id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  zone: string;
  capacity: number;
  shelter_type: string;
}

export interface BusRoute {
  id: string;
  school_id: string;
  name: string;
  code: string;
  type: RouteType;
  status: RouteStatus;
  start_location: string;
  end_location: string;
  estimated_duration: number;
  distance_km: number;
  fare: number;
  stops: string[];
  created_at: string;
  updated_at: string;
}

export interface BusRouteCreate {
  school_id: string;
  name: string;
  code: string;
  type: RouteType;
  start_location: string;
  end_location: string;
  estimated_duration: number;
  distance_km: number;
  fare: number;
  stops: string[];
}

export interface BusTrip {
  id: string;
  school_id: string;
  route_id: string;
  bus_id: string;
  driver_id: string;
  assistant_id: string;
  type: TripType;
  status: TripStatus;
  scheduled_start: string;
  scheduled_end: string;
  actual_start: string;
  actual_end: string;
  passenger_count: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BusTripCreate {
  school_id: string;
  route_id: string;
  bus_id: string;
  driver_id: string;
  assistant_id: string;
  type: TripType;
  scheduled_start: string;
  scheduled_end: string;
  notes: string;
}

export interface BusDriver {
  id: string;
  school_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  license_number: string;
  license_expiry: string;
  date_of_birth: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  status: DriverStatus;
  photo_url: string;
  years_experience: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface BusDriverCreate {
  school_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  license_number: string;
  license_expiry: string;
  date_of_birth: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  photo_url: string;
  years_experience: number;
}

export interface BusAssistant {
  id: string;
  school_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  status: AssistantStatus;
  photo_url: string;
  certification: string;
  created_at: string;
  updated_at: string;
}

export interface BusAssistantCreate {
  school_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  date_of_birth: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  photo_url: string;
  certification: string;
}

export interface BusStudentAssignment {
  id: string;
  school_id: string;
  student_id: string;
  student_name: string;
  bus_id: string;
  route_id: string;
  stop_id: string;
  status: StudentAssignmentStatus;
  academic_year: string;
  pickup_time: string;
  dropoff_time: string;
  parent_id: string;
  parent_phone: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BusStudentAssignmentCreate {
  school_id: string;
  student_id: string;
  student_name: string;
  bus_id: string;
  route_id: string;
  stop_id: string;
  academic_year: string;
  pickup_time: string;
  dropoff_time: string;
  parent_id: string;
  parent_phone: string;
  notes: string;
}

export interface GPSLocation {
  latitude: number;
  longitude: number;
  altitude: number;
  accuracy: number;
  speed: number;
  heading: number;
  timestamp: string;
}

export interface GPSTracking {
  id: string;
  school_id: string;
  bus_id: string;
  trip_id: string;
  location: GPSLocation;
  status: TrackingStatus;
  battery_level: number;
  signal_strength: number;
  odometer: number;
  created_at: string;
  updated_at: string;
}

export interface LiveTracking {
  bus_id: string;
  plate_number: string;
  route_name: string;
  driver_name: string;
  current_location: GPSLocation;
  next_stop: string;
  estimated_arrival: string;
  passenger_count: number;
  speed: number;
  heading: number;
  status: TripStatus;
}

export interface BusAttendance {
  id: string;
  school_id: string;
  trip_id: string;
  student_id: string;
  student_name: string;
  status: AttendanceStatus;
  check_in_time: string;
  check_out_time: string;
  check_in_method: CheckInMethod;
  check_out_method: CheckInMethod;
  stop_id: string;
  stop_name: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BusCheckIn {
  id: string;
  school_id: string;
  student_id: string;
  trip_id: string;
  stop_id: string;
  method: CheckInMethod;
  timestamp: string;
  location: GPSLocation;
  verified_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BusCheckOut {
  id: string;
  school_id: string;
  student_id: string;
  trip_id: string;
  stop_id: string;
  method: CheckInMethod;
  timestamp: string;
  location: GPSLocation;
  verified_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ParentNotification {
  id: string;
  school_id: string;
  parent_id: string;
  student_id: string;
  bus_id: string;
  trip_id: string;
  type: NotificationType;
  title: string;
  message: string;
  sent_at: string;
  delivered_at: string;
  read_at: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface FuelRecord {
  id: string;
  school_id: string;
  bus_id: string;
  fuel_type: FuelType;
  quantity: number;
  cost: number;
  station: string;
  odometer: number;
  status: FuelStatus;
  receipt_number: string;
  notes: string;
  recorded_by: string;
  created_at: string;
  updated_at: string;
}

export interface FuelRecordCreate {
  school_id: string;
  bus_id: string;
  fuel_type: FuelType;
  quantity: number;
  cost: number;
  station: string;
  odometer: number;
  receipt_number: string;
  notes: string;
  recorded_by: string;
}

export interface MaintenanceRecord {
  id: string;
  school_id: string;
  bus_id: string;
  type: MaintenanceType;
  status: MaintenanceStatus;
  description: string;
  start_date: string;
  end_date: string;
  cost: number;
  garage: string;
  mechanic_name: string;
  parts_replaced: string[];
  next_maintenance_km: number;
  next_maintenance_date: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface MaintenanceRecordCreate {
  school_id: string;
  bus_id: string;
  type: MaintenanceType;
  description: string;
  start_date: string;
  end_date: string;
  cost: number;
  garage: string;
  mechanic_name: string;
  parts_replaced: string[];
  next_maintenance_km: number;
  next_maintenance_date: string;
  notes: string;
}

export interface BusInsurance {
  id: string;
  school_id: string;
  bus_id: string;
  policy_number: string;
  provider: string;
  coverage_type: string;
  start_date: string;
  end_date: string;
  premium: number;
  status: InsuranceStatus;
  documents: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BusInsuranceCreate {
  school_id: string;
  bus_id: string;
  policy_number: string;
  provider: string;
  coverage_type: string;
  start_date: string;
  end_date: string;
  premium: number;
  documents: string[];
  notes: string;
}

export interface BusIncident {
  id: string;
  school_id: string;
  bus_id: string;
  trip_id: string;
  type: IncidentType;
  severity: AlertLevel;
  description: string;
  location: GPSLocation;
  address: string;
  date_time: string;
  reported_by: string;
  witnesses: string[];
  injuries: string[];
  damage_description: string;
  police_report_number: string;
  insurance_claim_number: string;
  status: string;
  photos: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BusIncidentCreate {
  school_id: string;
  bus_id: string;
  trip_id: string;
  type: IncidentType;
  severity: AlertLevel;
  description: string;
  latitude: number;
  longitude: number;
  address: string;
  date_time: string;
  reported_by: string;
  witnesses: string[];
  injuries: string[];
  damage_description: string;
  police_report_number: string;
  insurance_claim_number: string;
  photos: string[];
  notes: string;
}

export interface EmergencyAlert {
  id: string;
  school_id: string;
  bus_id: string;
  trip_id: string;
  alert_level: AlertLevel;
  message: string;
  location: GPSLocation;
  address: string;
  triggered_by: string;
  triggered_at: string;
  resolved_at: string;
  is_resolved: boolean;
  response_actions: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyAlertCreate {
  school_id: string;
  bus_id: string;
  trip_id: string;
  alert_level: AlertLevel;
  message: string;
  latitude: number;
  longitude: number;
  address: string;
  triggered_by: string;
  response_actions: string[];
  notes: string;
}

export interface BusFilter {
  school_id: string;
  status?: BusStatus[];
  type?: BusType[];
  fuel_type?: FuelType[];
  min_capacity?: number;
  max_capacity?: number;
  min_year?: number;
  max_year?: number;
  search?: string;
  maintenance_due?: boolean;
  insurance_expiring?: boolean;
}

export interface BusAnalytics {
  total_buses: number;
  active_buses: number;
  maintenance_buses: number;
  total_routes: number;
  active_routes: number;
  total_drivers: number;
  available_drivers: number;
  total_trips_today: number;
  completed_trips: number;
  total_students: number;
  average_occupancy: number;
  total_fuel_cost: number;
  total_maintenance_cost: number;
  on_time_percentage: number;
  safety_incidents: number;
}

export interface BusReport {
  id: string;
  school_id: string;
  report_type: string;
  period_start: string;
  period_end: string;
  generated_at: string;
  generated_by: string;
  data: Record<string, unknown>;
  summary: string;
  recommendations: string[];
  created_at: string;
  updated_at: string;
}

export interface BusSchedule {
  id: string;
  school_id: string;
  route_id: string;
  bus_id: string;
  day_of_week: number;
  pickup_time: string;
  dropoff_time: string;
  is_active: boolean;
  academic_year: string;
  semester: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BusMaintenanceSchedule {
  id: string;
  school_id: string;
  bus_id: string;
  maintenance_type: MaintenanceType;
  scheduled_date: string;
  scheduled_km: number;
  description: string;
  estimated_cost: number;
  garage: string;
  status: MaintenanceStatus;
  is_recurring: boolean;
  recurrence_interval_days: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface BusFuelReport {
  id: string;
  school_id: string;
  period_start: string;
  period_end: string;
  total_liters: number;
  total_cost: number;
  average_cost_per_liter: number;
  consumption_by_bus: Array<{
    bus_id: string;
    plate_number: string;
    liters: number;
    cost: number;
    km_per_liter: number;
  }>;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

export interface BusAttendanceReport {
  id: string;
  school_id: string;
  period_start: string;
  period_end: string;
  total_trips: number;
  total_boardings: number;
  total_disembarkings: number;
  average_daily_boardings: number;
  attendance_by_stop: Array<{
    stop_id: string;
    stop_name: string;
    boardings: number;
    disembarkings: number;
  }>;
  attendance_by_route: Array<{
    route_id: string;
    route_name: string;
    boardings: number;
    disembarkings: number;
  }>;
  generated_at: string;
  created_at: string;
  updated_at: string;
}

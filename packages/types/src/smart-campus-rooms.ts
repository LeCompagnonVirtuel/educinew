export enum RoomType3 {
  CLASSROOM = 'CLASSROOM',
  LECTURE_HALL = 'LECTURE_HALL',
  LABORATORY = 'LABORATORY',
  CONFERENCE_ROOM = 'CONFERENCE_ROOM',
  MEETING_ROOM = 'MEETING_ROOM',
  STUDY_ROOM = 'STUDY_ROOM',
  LIBRARY = 'LIBRARY',
  COMPUTER_LAB = 'COMPUTER_LAB',
  ART_STUDIO = 'ART_STUDIO',
  MUSIC_ROOM = 'MUSIC_ROOM',
  GYMNASIUM = 'GYMNASIUM',
  AUDITORIUM = 'AUDITORIUM',
  CAFETERIA = 'CAFETERIA',
  OFFICE = 'OFFICE',
  WORKSHOP = 'WORKSHOP',
  SIMULATION_ROOM = 'SIMULATION_ROOM',
  RESEARCH_LAB = 'RESEARCH_LAB',
  COMMON_AREA = 'COMMON_AREA',
}

export enum RoomStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  MAINTENANCE = 'MAINTENANCE',
  CLOSED = 'CLOSED',
  CLEANING = 'CLEANING',
  OUT_OF_ORDER = 'OUT_OF_ORDER',
}

export enum ReservationStatus2 {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  CHECKED_IN = 'CHECKED_IN',
  EXTENDED = 'EXTENDED',
}

export enum EquipmentType2 {
  PROJECTOR = 'PROJECTOR',
  SCREEN = 'SCREEN',
  WHITEBOARD = 'WHITEBOARD',
  DIGITAL_BOARD = 'DIGITAL_BOARD',
  SPEAKER = 'SPEAKER',
  MICROPHONE = 'MICROPHONE',
  WEBCAM = 'WEBCAM',
  VIDEO_CONFERENCE = 'VIDEO_CONFERENCE',
  COMPUTER = 'COMPUTER',
  PRINTER = 'PRINTER',
  SCANNER = 'SCANNER',
  AIR_CONDITIONING = 'AIR_CONDITIONING',
  HEATING = 'HEATING',
  LIGHTING = 'LIGHTING',
  CURTAIN = 'CURTAIN',
  DESK = 'DESK',
  CHAIR = 'CHAIR',
  STORAGE = 'STORAGE',
}

export enum SchedulingType {
  ONE_TIME = 'ONE_TIME',
  RECURRING_DAILY = 'RECURRING_DAILY',
  RECURRING_WEEKLY = 'RECURRING_WEEKLY',
  RECURRING_MONTHLY = 'RECURRING_MONTHLY',
  SEMESTER = 'SEMESTER',
  ACADEMIC_YEAR = 'ACADEMIC_YEAR',
}

export enum OccupancyStatus2 {
  EMPTY = 'EMPTY',
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH',
  FULL = 'FULL',
  OVERCAPACITY = 'OVERCAPACITY',
}

export enum BookingStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  WAITLISTED = 'WAITLISTED',
  BLOCKED = 'BLOCKED',
  TENTATIVE = 'TENTATIVE',
}

export enum RoomFeature {
  PROJECTOR = 'PROJECTOR',
  WHITEBOARD = 'WHITEBOARD',
  VIDEO_CONFERENCE = 'VIDEO_CONFERENCE',
  AIR_CONDITIONING = 'AIR_CONDITIONING',
  HEATING = 'HEATING',
  DISABLED_ACCESS = 'DISABLED_ACCESS',
  INTERNET = 'INTERNET',
  POWER_OUTLETS = 'POWER_OUTLETS',
  NATURAL_LIGHT = 'NATURAL_LIGHT',
  SOUND_PROOFING = 'SOUND_PROOFING',
  RECORDING_EQUIPMENT = 'RECORDING_EQUIPMENT',
  SMART_BOARD = 'SMART_BOARD',
  PODIUM = 'PODIUM',
  LAB_BENCHES = 'LAB_BENCHES',
  FUME_HOOD = 'FUME_HOOD',
}

export enum AvailabilityStatus {
  FREE = 'FREE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  PARTIALLY_RESERVED = 'PARTIALLY_RESERVED',
  UNAVAILABLE = 'UNAVAILABLE',
}

export enum UsageType {
  LECTURE = 'LECTURE',
  SEMINAR = 'SEMINAR',
  WORKSHOP = 'WORKSHOP',
  EXAM = 'EXAM',
  MEETING = 'MEETING',
  STUDY_SESSION = 'STUDY_SESSION',
  EVENT = 'EVENT',
  RESEARCH = 'RESEARCH',
  PRACTICAL = 'PRACTICAL',
}

export enum RoomCondition {
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
  POOR = 'POOR',
  NEEDS_REPAIR = 'NEEDS_REPAIR',
}

export enum AccessLevel2 {
  PUBLIC = 'PUBLIC',
  STAFF_ONLY = 'STAFF_ONLY',
  STUDENT_RESTRICTED = 'STUDENT_RESTRICTED',
  ADMIN_ONLY = 'ADMIN_ONLY',
  RESTRICTED = 'RESTRICTED',
}

export interface SmartRoom {
  id: string;
  school_id: string;
  name: string;
  room_code: string;
  room_type: RoomType3;
  status: RoomStatus;
  building_id: string;
  floor: number;
  wing: string | null;
  capacity: number;
  area_sqm: number;
  access_level: AccessLevel2;
  condition: RoomCondition;
  features: RoomFeature[];
  description: string | null;
  image_url: string | null;
  hourly_rate: number | null;
  is_reservable: boolean;
  auto_lighting: boolean;
  auto_climate: boolean;
  iot_enabled: boolean;
  camera_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface SmartRoomCreate {
  school_id: string;
  name: string;
  room_code: string;
  room_type: RoomType3;
  building_id: string;
  floor: number;
  wing?: string;
  capacity: number;
  area_sqm?: number;
  access_level?: AccessLevel2;
  condition?: RoomCondition;
  features?: RoomFeature[];
  description?: string;
  image_url?: string;
  hourly_rate?: number;
  is_reservable?: boolean;
  auto_lighting?: boolean;
  auto_climate?: boolean;
  iot_enabled?: boolean;
  camera_enabled?: boolean;
}

export interface SmartRoomUpdate {
  name?: string;
  room_code?: string;
  room_type?: RoomType3;
  status?: RoomStatus;
  floor?: number;
  wing?: string;
  capacity?: number;
  area_sqm?: number;
  access_level?: AccessLevel2;
  condition?: RoomCondition;
  features?: RoomFeature[];
  description?: string;
  image_url?: string;
  hourly_rate?: number;
  is_reservable?: boolean;
  auto_lighting?: boolean;
  auto_climate?: boolean;
  iot_enabled?: boolean;
  camera_enabled?: boolean;
}

export interface RoomCapacity2 {
  id: string;
  school_id: string;
  room_id: string;
  max_capacity: number;
  current_occupancy: number;
  social_distancing_capacity: number | null;
  exam_capacity: number | null;
  wheelchair_accessible_seats: number;
  standing_capacity: number | null;
  overflow_allowed: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoomCapacityCreate {
  school_id: string;
  room_id: string;
  max_capacity: number;
  social_distancing_capacity?: number;
  exam_capacity?: number;
  wheelchair_accessible_seats?: number;
  standing_capacity?: number;
  overflow_allowed?: boolean;
}

export interface RoomReservation {
  id: string;
  school_id: string;
  room_id: string;
  user_id: string;
  title: string;
  description: string | null;
  usage_type: UsageType;
  start_time: string;
  end_time: string;
  status: ReservationStatus2;
  attendees_count: number;
  is_recurring: boolean;
  recurrence_rule: string | null;
  booking_reference: string;
  notes: string | null;
  approved_by: string | null;
  approved_at: string | null;
  cancelled_at: string | null;
  cancellation_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoomReservationCreate {
  school_id: string;
  room_id: string;
  user_id: string;
  title: string;
  description?: string;
  usage_type: UsageType;
  start_time: string;
  end_time: string;
  attendees_count?: number;
  is_recurring?: boolean;
  recurrence_rule?: string;
  notes?: string;
}

export interface RoomAvailability {
  id: string;
  school_id: string;
  room_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: AvailabilityStatus;
  reservation_id: string | null;
  blocked_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoomAvailabilityCreate {
  school_id: string;
  room_id: string;
  date: string;
  start_time: string;
  end_time: string;
  status: AvailabilityStatus;
  reservation_id?: string;
  blocked_reason?: string;
}

export interface RoomEquipment2 {
  id: string;
  school_id: string;
  room_id: string;
  equipment_type: EquipmentType2;
  name: string;
  description: string | null;
  manufacturer: string | null;
  model: string | null;
  serial_number: string | null;
  is_working: boolean;
  last_maintenance: string | null;
  next_maintenance: string | null;
  purchase_date: string | null;
  warranty_expiry: string | null;
  replacement_cost: number | null;
  created_at: string;
  updated_at: string;
}

export interface RoomEquipmentCreate {
  school_id: string;
  room_id: string;
  equipment_type: EquipmentType2;
  name: string;
  description?: string;
  manufacturer?: string;
  model?: string;
  serial_number?: string;
  is_working?: boolean;
  purchase_date?: string;
  warranty_expiry?: string;
  replacement_cost?: number;
}

export interface RoomScheduling {
  id: string;
  school_id: string;
  room_id: string;
  scheduling_type: SchedulingType;
  name: string;
  term_id: string | null;
  semester: string | null;
  academic_year: string | null;
  day_of_week: number | null;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  course_id: string | null;
  instructor_id: string | null;
  recurring: boolean;
  priority: number;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoomSchedulingCreate {
  school_id: string;
  room_id: string;
  scheduling_type: SchedulingType;
  name: string;
  term_id?: string;
  semester?: string;
  academic_year?: string;
  day_of_week?: number;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  course_id?: string;
  instructor_id?: string;
  recurring?: boolean;
  priority?: number;
}

export interface RoomOccupancy {
  id: string;
  school_id: string;
  room_id: string;
  current_count: number;
  max_capacity: number;
  occupancy_status: OccupancyStatus2;
  occupancy_percentage: number;
  timestamp: string;
  sensor_device_id: string | null;
  detected_by: string;
  created_at: string;
  updated_at: string;
}

export interface RoomOccupancyCreate {
  school_id: string;
  room_id: string;
  current_count: number;
  max_capacity: number;
  occupancy_status: OccupancyStatus2;
  occupancy_percentage: number;
  timestamp: string;
  sensor_device_id?: string;
  detected_by: string;
}

export interface RoomUsageAnalytics {
  id: string;
  school_id: string;
  room_id: string;
  period_start: string;
  period_end: string;
  total_hours_used: number;
  total_hours_available: number;
  utilization_rate: number;
  average_occupancy: number;
  peak_occupancy: number;
  total_reservations: number;
  cancelled_reservations: number;
  no_show_count: number;
  average_reservation_duration_hours: number;
  most_used_by_type: Record<UsageType, number>;
  hourly_usage_pattern: HourlyUsage[];
  daily_usage_pattern: DailyUsage[];
  generated_at: string;
}

export interface RoomUsageAnalyticsCreate {
  school_id: string;
  room_id: string;
  period_start: string;
  period_end: string;
}

export interface HourlyUsage {
  hour: number;
  average_occupancy: number;
  reservation_count: number;
}

export interface DailyUsage {
  day_of_week: number;
  average_occupancy: number;
  reservation_count: number;
}

export interface RoomFilter {
  school_id: string;
  search?: string;
  room_type?: RoomType3;
  status?: RoomStatus;
  building_id?: string;
  floor?: number;
  min_capacity?: number;
  max_capacity?: number;
  features?: RoomFeature[];
  access_level?: AccessLevel2;
  condition?: RoomCondition;
  available_from?: string;
  available_to?: string;
  iot_enabled?: boolean;
  is_reservable?: boolean;
}

export interface RoomReport {
  id: string;
  school_id: string;
  title: string;
  report_type: string;
  period_start: string;
  period_end: string;
  total_rooms: number;
  available_rooms: number;
  occupied_rooms: number;
  maintenance_rooms: number;
  average_utilization: number;
  total_reservations: number;
  room_type_breakdown: RoomTypeBreakdown[];
  building_breakdown: BuildingRoomBreakdown[];
  top_used_rooms: TopUsedRoom[];
  recommendations: string[];
  generated_at: string;
}

export interface RoomTypeBreakdown {
  room_type: RoomType3;
  total_count: number;
  average_utilization: number;
  total_reservations: number;
}

export interface BuildingRoomBreakdown {
  building_id: string;
  building_name: string;
  total_rooms: number;
  average_utilization: number;
}

export interface TopUsedRoom {
  room_id: string;
  room_name: string;
  utilization_rate: number;
  total_reservations: number;
}

export interface RoomConfig {
  id: string;
  school_id: string;
  default_booking_duration_minutes: number;
  max_booking_duration_minutes: number;
  advance_booking_days: number;
  allow_same_day_booking: boolean;
  require_approval: boolean;
  auto_cancel_minutes: number;
  default_capacity_limit_percent: number;
  enable_smart_lighting: boolean;
  enable_smart_climate: boolean;
  enable_occupancy_detection: boolean;
  enable_auto_lock: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoomBooking {
  id: string;
  school_id: string;
  room_id: string;
  user_id: string;
  title: string;
  booking_status: BookingStatus;
  start_time: string;
  end_time: string;
  attendees: BookingAttendee[];
  equipment_needed: EquipmentType2[];
  special_requests: string | null;
  check_in_time: string | null;
  check_out_time: string | null;
  actual_duration_minutes: number | null;
  feedback_rating: number | null;
  feedback_comment: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingAttendee {
  user_id: string;
  name: string;
  email: string;
  rsvp_status: string;
}

export interface RoomMaintenance2 {
  id: string;
  school_id: string;
  room_id: string;
  maintenance_type: string;
  description: string;
  priority: string;
  status: string;
  scheduled_date: string;
  completed_date: string | null;
  assigned_to: string | null;
  cost: number | null;
  notes: string | null;
  equipment_ids: string[];
  created_at: string;
  updated_at: string;
}

export interface RoomFeature2 {
  id: string;
  school_id: string;
  room_id: string;
  feature: RoomFeature;
  is_functional: boolean;
  last_checked: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoomLayout {
  id: string;
  school_id: string;
  room_id: string;
  layout_name: string;
  capacity: number;
  desk_arrangement: string;
  has_podium: boolean;
  has_projector: boolean;
  has_screen: boolean;
  has_whiteboard: boolean;
  has_smartboard: boolean;
  power_outlet_count: number;
  network_port_count: number;
  floor_plan_url: string | null;
  zones: RoomZone[];
  created_at: string;
  updated_at: string;
}

export interface RoomZone {
  zone_id: string;
  name: string;
  zone_type: string;
  capacity: number;
  features: string[];
}

export interface RoomDisplay {
  id: string;
  school_id: string;
  room_id: string;
  device_id: string;
  display_type: string;
  content_url: string | null;
  schedule_shown: boolean;
  current_reservation: string | null;
  next_reservation: string | null;
  brightness: number;
  is_active: boolean;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface RoomSensor {
  id: string;
  school_id: string;
  room_id: string;
  device_id: string;
  sensor_type: string;
  current_value: number;
  unit: string;
  is_active: boolean;
  last_reading: string;
  created_at: string;
  updated_at: string;
}

export interface RoomEnvironment {
  id: string;
  school_id: string;
  room_id: string;
  temperature_celsius: number;
  humidity_percent: number;
  co2_ppm: number;
  light_lux: number;
  noise_db: number;
  air_quality_index: number;
  timestamp: string;
  comfort_score: number;
  hvac_status: string;
  lighting_status: string;
  created_at: string;
  updated_at: string;
}

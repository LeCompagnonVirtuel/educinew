export enum VisitorType2 {
  PARENT = "PARENT",
  GUARDIAN = "GUARDIAN",
  STUDENT_VISITOR = "STUDENT_VISITOR",
  VENDOR = "VENDOR",
  CONTRACTOR = "CONTRACTOR",
  DELIVERY = "DELIVERY",
  GUEST_SPEAKER = "GUEST_SPEAKER",
  INSPECTOR = "INSPECTOR",
  MEDICAL = "MEDICAL",
  GOVERNMENT = "GOVERNMENT",
  ALUMNI = "ALUMNI",
  OTHER = "OTHER",
}

export enum BadgeStatus {
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  LOST = "LOST",
  PENDING = "PENDING",
}

export enum AccessLevel {
  LOBBY = "LOBBY",
  FLOOR = "FLOOR",
  WING = "WING",
  BUILDING = "BUILDING",
  CAMPUS = "CAMPUS",
  RESTRICTED = "RESTRICTED",
}

export enum ApprovalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum IDType {
  NATIONAL_ID = "NATIONAL_ID",
  PASSPORT = "PASSPORT",
  DRIVER_LICENSE = "DRIVER_LICENSE",
  SCHOOL_ID = "SCHOOL_ID",
  EMPLOYEE_ID = "EMPLOYEE_ID",
  MILITARY_ID = "MILITARY_ID",
  OTHER = "OTHER",
}

export enum VisitPurpose {
  PARENT_TEACHER_MEETING = "PARENT_TEACHER_MEETING",
  ADMISSION = "ADMISSION",
  TOUR = "TOUR",
  DELIVERY = "DELIVERY",
  MAINTENANCE = "MAINTENANCE",
  EVENT = "EVENT",
  MEETING = "MEETING",
  PICKUP = "PICKUP",
  DROPOFF = "DROPOFF",
  MEDICAL = "MEDICAL",
  OTHER = "OTHER",
}

export enum BlacklistReason {
  SECURITY_THREAT = "SECURITY_THREAT",
  DISRUPTION = "DISRUPTION",
  POLICY_VIOLATION = "POLICY_VIOLATION",
  FRAUD = "FRAUD",
  LEGAL = "LEGAL",
  OTHER = "OTHER",
}

export enum CheckInOutType {
  MANUAL = "MANUAL",
  QR_CODE = "QR_CODE",
  FACE_RECOGNITION = "FACE_RECOGNITION",
  BADGE_SCAN = "BADGE_SCAN",
  MOBILE_APP = "MOBILE_APP",
}

export enum QRCodeStatus {
  ACTIVE = "ACTIVE",
  USED = "USED",
  EXPIRED = "EXPIRED",
  REVOKED = "REVOKED",
  PENDING = "PENDING",
}

export enum InvitationStatus {
  SENT = "SENT",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

export enum IdentityVerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
  NOT_REQUIRED = "NOT_REQUIRED",
}

export enum VisitStatus2 {
  PLANNED = "PLANNED",
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
  CANCELLED = "CANCELLED",
  NO_SHOW = "NO_SHOW",
  EXTENDED = "EXTENDED",
}

export interface VisitorRegistration {
  id: string;
  school_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  id_type: IDType;
  id_number: string;
  id_expiry: string;
  photo_url: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  visitor_type: VisitorType2;
  occupation: string;
  organization: string;
  is_blacklisted: boolean;
  blacklist_reason: BlacklistReason | null;
  total_visits: number;
  last_visit_date: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorRegistrationCreate {
  school_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  id_type: IDType;
  id_number: string;
  id_expiry: string;
  photo_url: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  visitor_type: VisitorType2;
  occupation: string;
  organization: string;
  notes: string;
}

export interface VisitorRegistrationUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  id_type?: IDType;
  id_number?: string;
  id_expiry?: string;
  photo_url?: string;
  date_of_birth?: string;
  gender?: string;
  nationality?: string;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  visitor_type?: VisitorType2;
  occupation?: string;
  organization?: string;
  is_blacklisted?: boolean;
  blacklist_reason?: BlacklistReason | null;
  notes?: string;
}

export interface VisitorBadge {
  id: string;
  school_id: string;
  visitor_id: string;
  badge_number: string;
  badge_type: string;
  access_level: AccessLevel;
  status: BadgeStatus;
  issued_date: string;
  expiry_date: string;
  issued_by: string;
  revoked_by: string | null;
  revoked_at: string | null;
  revoke_reason: string;
  return_date: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorBadgeCreate {
  school_id: string;
  visitor_id: string;
  badge_type: string;
  access_level: AccessLevel;
  issued_date: string;
  expiry_date: string;
  issued_by: string;
  notes: string;
}

export interface VisitorQR {
  id: string;
  school_id: string;
  visitor_id: string;
  qr_code: string;
  qr_data: string;
  status: QRCodeStatus;
  visit_purpose: VisitPurpose;
  host_name: string;
  host_id: string;
  building_ids: string[];
  floor_access: number[];
  valid_from: string;
  valid_until: string;
  max_uses: number;
  current_uses: number;
  generated_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorQRCreate {
  school_id: string;
  visitor_id: string;
  visit_purpose: VisitPurpose;
  host_name: string;
  host_id: string;
  building_ids: string[];
  floor_access: number[];
  valid_from: string;
  valid_until: string;
  max_uses: number;
  generated_by: string;
  notes: string;
}

export interface VisitorInvitation {
  id: string;
  school_id: string;
  inviter_id: string;
  inviter_name: string;
  visitor_email: string;
  visitor_name: string;
  visitor_phone: string;
  visit_purpose: VisitPurpose;
  visit_date: string;
  visit_time: string;
  building_ids: string[];
  floor_access: number[];
  status: InvitationStatus;
  qr_code_id: string | null;
  notes: string;
  sent_at: string;
  responded_at: string | null;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorInvitationCreate {
  school_id: string;
  inviter_id: string;
  inviter_name: string;
  visitor_email: string;
  visitor_name: string;
  visitor_phone: string;
  visit_purpose: VisitPurpose;
  visit_date: string;
  visit_time: string;
  building_ids: string[];
  floor_access: number[];
  notes: string;
}

export interface VisitorApproval {
  id: string;
  school_id: string;
  visitor_id: string;
  visit_id: string;
  approver_id: string;
  approver_name: string;
  status: ApprovalStatus;
  decision_date: string | null;
  reason: string;
  conditions: string[];
  valid_from: string;
  valid_until: string;
  access_level: AccessLevel;
  building_ids: string[];
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorApprovalCreate {
  school_id: string;
  visitor_id: string;
  visit_id: string;
  approver_id: string;
  approver_name: string;
  status: ApprovalStatus;
  reason: string;
  conditions: string[];
  valid_from: string;
  valid_until: string;
  access_level: AccessLevel;
  building_ids: string[];
  notes: string;
}

export interface IdentityVerification {
  id: string;
  school_id: string;
  visitor_id: string;
  verification_type: string;
  id_document_url: string;
  selfie_url: string;
  status: IdentityVerificationStatus;
  verified_by: string | null;
  verified_at: string | null;
  rejection_reason: string | null;
  confidence_score: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface IdentityVerificationCreate {
  school_id: string;
  visitor_id: string;
  verification_type: string;
  id_document_url: string;
  selfie_url: string;
  notes: string;
}

export interface VisitorBlacklist {
  id: string;
  school_id: string;
  visitor_id: string;
  reason: BlacklistReason;
  description: string;
  added_by: string;
  added_at: string;
  expires_at: string | null;
  is_permanent: boolean;
  removed_by: string | null;
  removed_at: string | null;
  removal_reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorBlacklistCreate {
  school_id: string;
  visitor_id: string;
  reason: BlacklistReason;
  description: string;
  added_by: string;
  expires_at: string | null;
  is_permanent: boolean;
  notes: string;
}

export interface VisitHistory {
  id: string;
  school_id: string;
  visitor_id: string;
  visit_purpose: VisitPurpose;
  host_name: string;
  host_id: string;
  building_id: string;
  building_name: string;
  floor_access: number[];
  check_in_time: string;
  check_out_time: string | null;
  check_in_method: CheckInOutType;
  check_out_method: CheckInOutType | null;
  badge_number: string | null;
  qr_code: string | null;
  status: VisitStatus2;
  visitor_count: number;
  vehicle_plate: string | null;
  parking_spot: string | null;
  photo_check_in: string | null;
  photo_check_out: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitHistoryCreate {
  school_id: string;
  visitor_id: string;
  visit_purpose: VisitPurpose;
  host_name: string;
  host_id: string;
  building_id: string;
  building_name: string;
  floor_access: number[];
  check_in_time: string;
  check_in_method: CheckInOutType;
  badge_number: string | null;
  qr_code: string | null;
  visitor_count: number;
  vehicle_plate: string | null;
  parking_spot: string | null;
  photo_check_in: string | null;
  notes: string;
}

export interface VisitorFilter {
  school_id?: string;
  visitor_type?: VisitorType2;
  id_type?: IDType;
  status?: BadgeStatus;
  is_blacklisted?: boolean;
  date_from?: string;
  date_to?: string;
  building_id?: string;
  host_id?: string;
  search?: string;
  access_level?: AccessLevel;
}

export interface VisitorAnalytics {
  total_visitors: number;
  active_visitors: number;
  checked_in_today: number;
  checked_out_today: number;
  pending_approvals: number;
  total_badges_issued: number;
  active_badges: number;
  blacklisted_count: number;
  average_visit_duration: number;
  visitors_by_type: VisitorTypeStat[];
  visitors_by_purpose: VisitPurposeStat[];
  daily_trends: DailyVisitorTrend[];
  peak_hours: PeakHourStat[];
  building_visits: BuildingVisitStat[];
}

export interface VisitorReport {
  id: string;
  school_id: string;
  title: string;
  description: string;
  generated_by: string;
  date_from: string;
  date_to: string;
  filters: VisitorFilter;
  data: VisitorAnalytics;
  format: string;
  file_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface VisitorCheckIn {
  id: string;
  school_id: string;
  visitor_id: string;
  visit_id: string;
  check_in_time: string;
  check_in_method: CheckInOutType;
  building_id: string;
  floor_access: number[];
  badge_number: string | null;
  qr_code: string | null;
  vehicle_plate: string | null;
  parking_spot: string | null;
  photo_url: string | null;
  temperature: number | null;
  health_declaration: boolean;
  escorted_by: string | null;
  destination: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorCheckOut {
  id: string;
  school_id: string;
  visitor_id: string;
  visit_id: string;
  check_in_id: string;
  check_out_time: string;
  check_out_method: CheckInOutType;
  badge_returned: boolean;
  badge_return_condition: string | null;
  photo_url: string | null;
  total_duration: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorPass {
  id: string;
  school_id: string;
  visitor_id: string;
  pass_number: string;
  pass_type: string;
  access_level: AccessLevel;
  building_ids: string[];
  floor_access: number[];
  valid_from: string;
  valid_until: string;
  is_single_use: boolean;
  status: string;
  issued_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorLog2 {
  id: string;
  school_id: string;
  visitor_id: string;
  visit_id: string;
  action: string;
  location: string;
  timestamp: string;
  recorded_by: string;
  device_id: string | null;
  ip_address: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorNotification {
  id: string;
  school_id: string;
  visitor_id: string;
  visit_id: string | null;
  notification_type: string;
  title: string;
  message: string;
  channel: string;
  sent_at: string;
  delivered: boolean;
  read: boolean;
  read_at: string | null;
  metadata: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface VisitorConfig {
  id: string;
  school_id: string;
  require_approval: boolean;
  auto_approve_parents: boolean;
  max_visit_duration: number;
  max_daily_visits: number;
  require_id_verification: boolean;
  allow_self_check_in: boolean;
  qr_code_validity: number;
  badge_validity: number;
  notification_enabled: boolean;
  notification_channels: string[];
  blacklisted_auto_block: boolean;
  visitor_photo_required: boolean;
  vehicle_registration_required: boolean;
  health_screening_required: boolean;
  restricted_buildings: string[];
  restricted_floors: string[];
  created_at: string;
  updated_at: string;
}

export interface VisitorTypeStat {
  type: VisitorType2;
  count: number;
  percentage: number;
}

export interface VisitPurposeStat {
  purpose: VisitPurpose;
  count: number;
  percentage: number;
}

export interface DailyVisitorTrend {
  date: string;
  total_visitors: number;
  checked_in: number;
  checked_out: number;
}

export interface PeakHourStat {
  hour: number;
  visitor_count: number;
  average_duration: number;
}

export interface BuildingVisitStat {
  building_id: string;
  building_name: string;
  total_visits: number;
  average_duration: number;
  unique_visitors: number;
}

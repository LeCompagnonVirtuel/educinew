export enum ExamType {
  BEPC = 'bepc',
  BAC = 'bac',
  CEPE = 'cepe',
  BTS = 'bts',
  UNIVERSITY_ENTRANCE = 'university_entrance',
  COMPETITIVE = 'competitive',
  CERTIFICATION = 'certification',
  PROFESSIONAL = 'professional',
}

export enum ExamSession {
  JUNE = 'june',
  DECEMBER = 'december',
  MARCH = 'march',
  SEPTEMBER = 'september',
  SPECIAL = 'special',
}

export enum ExamStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  POSTPONED = 'postponed',
}

export enum SubjectCategory {
  MATHEMATICS = 'mathematics',
  SCIENCE = 'science',
  LANGUAGE = 'language',
  HUMANITIES = 'humanities',
  TECHNICAL = 'technical',
  VOCATIONAL = 'vocational',
  PHYSICAL_EDUCATION = 'physical_education',
  ARTS = 'arts',
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  ESSAY = 'essay',
  PROBLEM_SOLVING = 'problem_solving',
  PRACTICAL = 'practical',
  ORAL = 'oral',
}

export enum MarkingType {
  MANUAL = 'manual',
  DIGITAL = 'digital',
  AI = 'ai',
  HYBRID = 'hybrid',
}

export enum AppealStatus {
  PENDING = 'pending',
  UNDER_REVIEW = 'under_review',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

export enum CertificateType {
  BEPC = 'bepc',
  BAC = 'bac',
  CEPE = 'cepe',
  BTS = 'bts',
  PROFICIENCY = 'proficiency',
  MERIT = 'merit',
  HONORS = 'honors',
  DISTINCTION = 'distinction',
}

export enum RankingType {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  SCHOOL = 'school',
  CLASS = 'class',
  SUBJECT = 'subject',
}

export enum CenterType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  INTERNATIONAL = 'international',
  TECHNICAL = 'technical',
  VOCATIONAL = 'vocational',
}

export enum SupervisorRole {
  CHIEF_SUPERVISOR = 'chief_supervisor',
  SUPERVISOR = 'supervisor',
  DEPUTY_SUPERVISOR = 'deputy_supervisor',
  ROOM_SUPERVISOR = 'room_supervisor',
  INVIGILATOR = 'invigilator',
}

export enum CandidateStatus {
  REGISTERED = 'registered',
  CONFIRMED = 'confirmed',
  ADMITTED = 'admitted',
  ATTENDED = 'attended',
  ABSENT = 'absent',
  DISQUALIFIED = 'disqualified',
  WITHDRAWN = 'withdrawn',
  PASSED = 'passed',
  FAILED = 'failed',
}

export enum ExamLevel {
  PRIMARY = 'primary',
  JUNIOR_SECONDARY = 'junior_secondary',
  SENIOR_SECONDARY = 'senior_secondary',
  TECHNICAL = 'technical',
  VOCATIONAL = 'vocational',
  UNIVERSITY = 'university',
}

export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  VERY_HARD = 'very_hard',
}

export enum ExamDuration {
  ONE_HOUR = '1h',
  TWO_HOURS = '2h',
  THREE_HOURS = '3h',
  FOUR_HOURS = '4h',
  CUSTOM = 'custom',
}

export enum ExamMedium {
  PAPER = 'paper',
  COMPUTER = 'computer',
  ONLINE = 'online',
  HYBRID = 'hybrid',
}

export enum SecurityLevel {
  STANDARD = 'standard',
  HIGH = 'high',
  MAXIMUM = 'maximum',
}

export enum GradingScale {
  PERCENTAGE = 'percentage',
  LETTER = 'letter',
  GPA = 'gpa',
  POINTS = 'points',
  PASS_FAIL = 'pass_fail',
}

export enum ResultStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  VERIFIED = 'verified',
  PUBLISHED = 'published',
  CONTESTED = 'contested',
  FINAL = 'final',
}

export enum CertificateStatus {
  PENDING = 'pending',
  ISSUED = 'issued',
  REVOKED = 'revoked',
  EXPIRED = 'expired',
  REPLACED = 'replaced',
  LOST = 'lost',
}

export enum ExamFeeType {
  REGISTRATION = 'registration',
  LATE_REGISTRATION = 'late_registration',
  REWRITE = 'rewrite',
  CERTIFICATE = 'certificate',
  TRANSCRIPT = 'transcript',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIAL = 'partial',
}

export enum ExamPeriod {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  NIGHT = 'night',
}

export enum RoomType {
  EXAM = 'exam',
  VIP = 'vip',
  SPECIAL_NEEDS = 'special_needs',
  ISOLATION = 'isolation',
}

export enum SecurityCheck {
  IDENTITY = 'identity',
  BIOMETRIC = 'biometric',
  METAL_DETECTOR = 'metal_detector',
  CAMERA = 'camera',
  PROCTOR = 'proctor',
}

export enum QuestionSource {
  BANK = 'bank',
  CUSTOM = 'custom',
  IMPORTED = 'imported',
  AI_GENERATED = 'ai_generated',
}

export enum ExamLanguage {
  FRENCH = 'french',
  ENGLISH = 'english',
  ARABIC = 'arabic',
  LOCAL = 'local',
}

export enum DisabilityType {
  VISUAL = 'visual',
  HEARING = 'hearing',
  MOTOR = 'motor',
  COGNITIVE = 'cognitive',
  MULTIPLE = 'multiple',
}

export enum AccommodationType {
  EXTRA_TIME = 'extra_time',
  SEPARATE_ROOM = 'separate_room',
  ASSISTANT = 'assistant',
  SPECIAL_EQUIPMENT = 'special_equipment',
  MODIFIED_FORMAT = 'modified_format',
}

export enum ExamScheduleType {
  REGULAR = 'regular',
  MAKEUP = 'makeup',
  RESCHEDULED = 'rescheduled',
  SPECIAL = 'special',
}

export enum VenueStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
  CLOSED = 'closed',
}

export enum InvigilatorRole {
  CHIEF = 'chief',
  ASSISTANT = 'assistant',
  MONITOR = 'monitor',
  RELIEF = 'relief',
}

export enum QuestionPaperStatus {
  DRAFT = 'draft',
  APPROVED = 'approved',
  PRINTED = 'printed',
  DISTRIBUTED = 'distributed',
  COLLECTED = 'collected',
  ARCHIVED = 'archived',
}

export enum ExamResultType {
  PASS = 'pass',
  FAIL = 'fail',
  DISTINCTION = 'distinction',
  MERIT = 'merit',
  HONORS = 'honors',
  CREDIT = 'credit',
}

export enum Grade {
  A_PLUS = 'a_plus',
  A = 'a',
  B_PLUS = 'b_plus',
  B = 'b',
  C_PLUS = 'c_plus',
  C = 'c',
  D_PLUS = 'd_plus',
  D = 'd',
  E = 'e',
  F = 'f',
}

export enum ExamAppealType {
  RE_MARKING = 're_marking',
  MISSING_RESULT = 'missing_result',
  CLERICAL_ERROR = 'clerical_error',
  PROCEDURAL = 'procedural',
}

export enum ExamNotificationType {
  REGISTRATION = 'registration',
  SCHEDULE = 'schedule',
  RESULT = 'result',
  CERTIFICATE = 'certificate',
  REMINDER = 'reminder',
}

export enum ExamDocumentType {
  ADMIT_CARD = 'admit_card',
  RESULT_SLIP = 'result_slip',
  CERTIFICATE = 'certificate',
  TRANSCRIPT = 'transcript',
  VERIFICATION = 'verification',
}

export enum CenterCapacity {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra_large',
}

export enum QuestionDistributionMethod {
  RANDOM = 'random',
  SEQUENTIAL = 'sequential',
  ZONE = 'zone',
  CUSTOM = 'custom',
}

export enum ExamIntegrityCheck {
  NONE = 'none',
  BASIC = 'basic',
  ADVANCED = 'advanced',
  COMPREHENSIVE = 'comprehensive',
}

export enum ExamReportingLevel {
  NONE = 'none',
  BASIC = 'basic',
  DETAILED = 'detailed',
  COMPREHENSIVE = 'comprehensive',
}

export enum ExamDataRetention {
  ONE_YEAR = 'one_year',
  THREE_YEARS = 'three_years',
  FIVE_YEARS = 'five_years',
  TEN_YEARS = 'ten_years',
  PERMANENT = 'permanent',
}

export enum ExamCompliance {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  INTERNATIONAL = 'international',
  CUSTOM = 'custom',
}

export enum ExamAuditLevel {
  NONE = 'none',
  BASIC = 'basic',
  DETAILED = 'detailed',
  COMPREHENSIVE = 'comprehensive',
}

export enum ExamBackupFrequency {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  REAL_TIME = 'real_time',
}

export enum ExamRecoveryLevel {
  NONE = 'none',
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  ENTERPRISE = 'enterprise',
}

export enum ExamEncryptionLevel {
  NONE = 'none',
  STANDARD = 'standard',
  ADVANCED = 'advanced',
  MILITARY = 'military',
}

export enum ExamAccessControl {
  NONE = 'none',
  BASIC = 'basic',
  ROLE_BASED = 'role_based',
  ATTRIBUTE_BASED = 'attribute_based',
  MULTI_FACTOR = 'multi_factor',
}

export enum ExamApiVersion {
  V1 = 'v1',
  V2 = 'v2',
  V3 = 'v3',
}

export enum ExamFormat {
  JSON = 'json',
  XML = 'xml',
  CSV = 'csv',
  PDF = 'pdf',
  EXCEL = 'excel',
}

export enum ExamSortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ExamPaginationType {
  OFFSET = 'offset',
  CURSOR = 'cursor',
}

export enum ExamCacheStrategy {
  NONE = 'none',
  MEMORY = 'memory',
  REDIS = 'redis',
  CDN = 'cdn',
}

export enum ExamRateLimitType {
  NONE = 'none',
  IP_BASED = 'ip_based',
  USER_BASED = 'user_based',
  API_KEY = 'api_key',
}

export enum ExamWebhookEvent {
  REGISTRATION = 'registration',
  RESULT_PUBLISHED = 'result_published',
  CERTIFICATE_ISSUED = 'certificate_issued',
  APPEAL_RECEIVED = 'appeal_received',
}

export enum ExamIntegrationType {
  NONE = 'none',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  BOTH = 'both',
}

export enum ExamMonitoringLevel {
  NONE = 'none',
  BASIC = 'basic',
  DETAILED = 'detailed',
  REAL_TIME = 'real_time',
}

export enum ExamAlertLevel {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ExamTrendType {
  IMPROVING = 'improving',
  DECLINING = 'declining',
  STABLE = 'stable',
  VOLATILE = 'volatile',
}

export enum ExamBenchmarkType {
  NATIONAL_AVERAGE = 'national_average',
  REGIONAL_AVERAGE = 'regional_average',
  SCHOOL_AVERAGE = 'school_average',
  HISTORICAL = 'historical',
}

export enum ExamPredictionModel {
  LINEAR = 'linear',
  POLYNOMIAL = 'polynomial',
  NEURAL_NETWORK = 'neural_network',
  ENSEMBLE = 'ensemble',
}

export enum ExamDataQuality {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  HIGH = 'high',
  ENTERPRISE = 'enterprise',
}

export enum ExamGovernanceLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  ADVANCED = 'advanced',
  ENTERPRISE = 'enterprise',
}

export interface NationalExam {
  id: string;
  exam_type: ExamType;
  exam_name: string;
  exam_code: string;
  description: string;
  level: ExamLevel;
  session: ExamSession;
  academic_year: string;
  start_date: string;
  end_date: string;
  registration_start: string;
  registration_end: string;
  fee_amount: number;
  currency: string;
  status: ExamStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalExamCreate {
  exam_type: ExamType;
  exam_name: string;
  exam_code: string;
  description: string;
  level: ExamLevel;
  session: ExamSession;
  academic_year: string;
  start_date: string;
  end_date: string;
  registration_start: string;
  registration_end: string;
  fee_amount: number;
  currency: string;
  status: ExamStatus;
}

export interface NationalExamUpdate {
  exam_type?: ExamType;
  exam_name?: string;
  exam_code?: string;
  description?: string;
  level?: ExamLevel;
  session?: ExamSession;
  academic_year?: string;
  start_date?: string;
  end_date?: string;
  registration_start?: string;
  registration_end?: string;
  fee_amount?: number;
  currency?: string;
  status?: ExamStatus;
}

export interface NationalExamQuery {
  search?: string;
  exam_type?: ExamType;
  level?: ExamLevel;
  session?: ExamSession;
  academic_year?: string;
  status?: ExamStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamSessionData {
  id: string;
  exam_id: string;
  session_name: string;
  session_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  status: ExamStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamSessionCreate {
  exam_id: string;
  session_name: string;
  session_date: string;
  start_time: string;
  end_time: string;
  venue: string;
  status: ExamStatus;
}

export interface ExamSessionUpdate {
  session_name?: string;
  session_date?: string;
  start_time?: string;
  end_time?: string;
  venue?: string;
  status?: ExamStatus;
}

export interface ExamSessionQuery {
  exam_id?: string;
  search?: string;
  session_date?: string;
  status?: ExamStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamSubject {
  id: string;
  exam_id: string;
  subject_name: string;
  subject_code: string;
  category: SubjectCategory;
  max_score: number;
  pass_score: number;
  duration_minutes: number;
  weight: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamSubjectCreate {
  exam_id: string;
  subject_name: string;
  subject_code: string;
  category: SubjectCategory;
  max_score: number;
  pass_score: number;
  duration_minutes: number;
  weight: number;
  status: string;
}

export interface ExamSubjectUpdate {
  subject_name?: string;
  subject_code?: string;
  category?: SubjectCategory;
  max_score?: number;
  pass_score?: number;
  duration_minutes?: number;
  weight?: number;
  status?: string;
}

export interface ExamSubjectQuery {
  exam_id?: string;
  search?: string;
  category?: SubjectCategory;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface Question {
  id: string;
  subject_id: string;
  question_text: string;
  question_type: QuestionType;
  difficulty: QuestionDifficulty;
  marks: number;
  options: string[];
  correct_answer: string;
  explanation: string;
  source: QuestionSource;
  language: ExamLanguage;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionCreate {
  subject_id: string;
  question_text: string;
  question_type: QuestionType;
  difficulty: QuestionDifficulty;
  marks: number;
  options: string[];
  correct_answer: string;
  explanation: string;
  source: QuestionSource;
  language: ExamLanguage;
  status: string;
}

export interface QuestionUpdate {
  question_text?: string;
  question_type?: QuestionType;
  difficulty?: QuestionDifficulty;
  marks?: number;
  options?: string[];
  correct_answer?: string;
  explanation?: string;
  source?: QuestionSource;
  language?: ExamLanguage;
  status?: string;
}

export interface QuestionQuery {
  subject_id?: string;
  search?: string;
  question_type?: QuestionType;
  difficulty?: QuestionDifficulty;
  source?: QuestionSource;
  language?: ExamLanguage;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface QuestionPaper {
  id: string;
  exam_id: string;
  subject_id: string;
  paper_code: string;
  total_marks: number;
  total_questions: number;
  duration_minutes: number;
  instructions: string;
  status: QuestionPaperStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface QuestionPaperCreate {
  exam_id: string;
  subject_id: string;
  paper_code: string;
  total_marks: number;
  total_questions: number;
  duration_minutes: number;
  instructions: string;
  status: QuestionPaperStatus;
}

export interface QuestionPaperUpdate {
  paper_code?: string;
  total_marks?: number;
  total_questions?: number;
  duration_minutes?: number;
  instructions?: string;
  status?: QuestionPaperStatus;
}

export interface QuestionPaperQuery {
  exam_id?: string;
  subject_id?: string;
  search?: string;
  status?: QuestionPaperStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface Candidate {
  id: string;
  student_id: string;
  exam_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  school_id: string;
  school_name: string;
  registration_number: string;
  photo_url: string;
  status: CandidateStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CandidateCreate {
  student_id: string;
  exam_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  school_id: string;
  school_name: string;
  registration_number: string;
  photo_url: string;
  status: CandidateStatus;
}

export interface CandidateUpdate {
  student_id?: string;
  exam_id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  school_id?: string;
  school_name?: string;
  registration_number?: string;
  photo_url?: string;
  status?: CandidateStatus;
}

export interface CandidateQuery {
  exam_id?: string;
  search?: string;
  school_id?: string;
  status?: CandidateStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface CandidateRegistration {
  id: string;
  candidate_id: string;
  exam_id: string;
  registration_date: string;
  fee_paid: number;
  payment_reference: string;
  payment_status: PaymentStatus;
  registration_number: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CandidateRegistrationCreate {
  candidate_id: string;
  exam_id: string;
  registration_date: string;
  fee_paid: number;
  payment_reference: string;
  payment_status: PaymentStatus;
  registration_number: string;
  status: string;
}

export interface CandidateRegistrationUpdate {
  registration_date?: string;
  fee_paid?: number;
  payment_reference?: string;
  payment_status?: PaymentStatus;
  registration_number?: string;
  status?: string;
}

export interface CandidateRegistrationQuery {
  candidate_id?: string;
  exam_id?: string;
  payment_status?: PaymentStatus;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamCenter {
  id: string;
  center_name: string;
  center_code: string;
  center_type: CenterType;
  region: string;
  department: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  capacity: number;
  rooms_count: number;
  supervisor_id: string;
  status: VenueStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ExamCenterCreate {
  center_name: string;
  center_code: string;
  center_type: CenterType;
  region: string;
  department: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  capacity: number;
  rooms_count: number;
  supervisor_id: string;
  status: VenueStatus;
}

export interface ExamCenterUpdate {
  center_name?: string;
  center_code?: string;
  center_type?: CenterType;
  region?: string;
  department?: string;
  district?: string;
  address?: string;
  phone?: string;
  email?: string;
  capacity?: number;
  rooms_count?: number;
  supervisor_id?: string;
  status?: VenueStatus;
}

export interface ExamCenterQuery {
  search?: string;
  center_type?: CenterType;
  region?: string;
  department?: string;
  district?: string;
  status?: VenueStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface Supervisor {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  center_id: string;
  role: SupervisorRole;
  assigned_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SupervisorCreate {
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  center_id: string;
  role: SupervisorRole;
  assigned_date: string;
  status: string;
}

export interface SupervisorUpdate {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  center_id?: string;
  role?: SupervisorRole;
  assigned_date?: string;
  status?: string;
}

export interface SupervisorQuery {
  center_id?: string;
  search?: string;
  role?: SupervisorRole;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface Invigilator {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  center_id: string;
  room_id: string;
  role: InvigilatorRole;
  assigned_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface InvigilatorCreate {
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  center_id: string;
  room_id: string;
  role: InvigilatorRole;
  assigned_date: string;
  status: string;
}

export interface InvigilatorUpdate {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  center_id?: string;
  room_id?: string;
  role?: InvigilatorRole;
  assigned_date?: string;
  status?: string;
}

export interface InvigilatorQuery {
  center_id?: string;
  room_id?: string;
  search?: string;
  role?: InvigilatorRole;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface QuestionDistribution {
  id: string;
  exam_id: string;
  center_id: string;
  paper_id: string;
  quantity: number;
  method: QuestionDistributionMethod;
  distribution_date: string;
  distributed_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionDistributionCreate {
  exam_id: string;
  center_id: string;
  paper_id: string;
  quantity: number;
  method: QuestionDistributionMethod;
  distribution_date: string;
  distributed_by: string;
  status: string;
}

export interface QuestionDistributionUpdate {
  center_id?: string;
  paper_id?: string;
  quantity?: number;
  method?: QuestionDistributionMethod;
  distribution_date?: string;
  distributed_by?: string;
  status?: string;
}

export interface QuestionDistributionQuery {
  exam_id?: string;
  center_id?: string;
  paper_id?: string;
  method?: QuestionDistributionMethod;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface DigitalMarking {
  id: string;
  exam_id: string;
  paper_id: string;
  candidate_id: string;
  marker_id: string;
  marks: number;
  marking_date: string;
  time_spent_minutes: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DigitalMarkingCreate {
  exam_id: string;
  paper_id: string;
  candidate_id: string;
  marker_id: string;
  marks: number;
  marking_date: string;
  time_spent_minutes: number;
  status: string;
}

export interface DigitalMarkingUpdate {
  paper_id?: string;
  candidate_id?: string;
  marker_id?: string;
  marks?: number;
  marking_date?: string;
  time_spent_minutes?: number;
  status?: string;
}

export interface DigitalMarkingQuery {
  exam_id?: string;
  paper_id?: string;
  candidate_id?: string;
  marker_id?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface AIMarking {
  id: string;
  exam_id: string;
  paper_id: string;
  candidate_id: string;
  model_version: string;
  confidence_score: number;
  ai_marks: number;
  human_review_required: boolean;
  human_marks: number | null;
  final_marks: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AIMarkingCreate {
  exam_id: string;
  paper_id: string;
  candidate_id: string;
  model_version: string;
  confidence_score: number;
  ai_marks: number;
  human_review_required: boolean;
  human_marks: number | null;
  final_marks: number;
  status: string;
}

export interface AIMarkingUpdate {
  paper_id?: string;
  candidate_id?: string;
  model_version?: string;
  confidence_score?: number;
  ai_marks?: number;
  human_review_required?: boolean;
  human_marks?: number | null;
  final_marks?: number;
  status?: string;
}

export interface AIMarkingQuery {
  exam_id?: string;
  paper_id?: string;
  candidate_id?: string;
  human_review_required?: boolean;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface Appeal {
  id: string;
  candidate_id: string;
  exam_id: string;
  subject_id: string;
  appeal_type: ExamAppealType;
  description: string;
  evidence_url: string | null;
  appeal_fee: number;
  payment_status: PaymentStatus;
  status: AppealStatus;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  decision: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppealCreate {
  candidate_id: string;
  exam_id: string;
  subject_id: string;
  appeal_type: ExamAppealType;
  description: string;
  evidence_url: string | null;
  appeal_fee: number;
  payment_status: PaymentStatus;
  status: AppealStatus;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  decision: string | null;
}

export interface AppealUpdate {
  candidate_id?: string;
  exam_id?: string;
  subject_id?: string;
  appeal_type?: ExamAppealType;
  description?: string;
  evidence_url?: string | null;
  appeal_fee?: number;
  payment_status?: PaymentStatus;
  status?: AppealStatus;
  submitted_at?: string;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  decision?: string | null;
}

export interface AppealQuery {
  candidate_id?: string;
  exam_id?: string;
  subject_id?: string;
  appeal_type?: ExamAppealType;
  status?: AppealStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamCertificate {
  id: string;
  candidate_id: string;
  exam_id: string;
  certificate_type: CertificateType;
  certificate_number: string;
  issue_date: string;
  expiry_date: string | null;
  qr_code: string;
  digital_signature: string;
  status: CertificateStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ExamCertificateCreate {
  candidate_id: string;
  exam_id: string;
  certificate_type: CertificateType;
  certificate_number: string;
  issue_date: string;
  expiry_date: string | null;
  qr_code: string;
  digital_signature: string;
  status: CertificateStatus;
}

export interface ExamCertificateUpdate {
  candidate_id?: string;
  exam_id?: string;
  certificate_type?: CertificateType;
  certificate_number?: string;
  issue_date?: string;
  expiry_date?: string | null;
  qr_code?: string;
  digital_signature?: string;
  status?: CertificateStatus;
}

export interface ExamCertificateQuery {
  candidate_id?: string;
  exam_id?: string;
  certificate_type?: CertificateType;
  status?: CertificateStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface NationalRanking {
  id: string;
  exam_id: string;
  ranking_type: RankingType;
  rank: number;
  candidate_id: string;
  candidate_name: string;
  school_id: string;
  school_name: string;
  total_score: number;
  percentage: number;
  grade: Grade;
  region: string;
  department: string;
  academic_year: string;
  created_at: string;
  updated_at: string;
}

export interface NationalRankingCreate {
  exam_id: string;
  ranking_type: RankingType;
  rank: number;
  candidate_id: string;
  candidate_name: string;
  school_id: string;
  school_name: string;
  total_score: number;
  percentage: number;
  grade: Grade;
  region: string;
  department: string;
  academic_year: string;
}

export interface NationalRankingUpdate {
  ranking_type?: RankingType;
  rank?: number;
  candidate_id?: string;
  candidate_name?: string;
  school_id?: string;
  school_name?: string;
  total_score?: number;
  percentage?: number;
  grade?: Grade;
  region?: string;
  department?: string;
  academic_year?: string;
}

export interface NationalRankingQuery {
  exam_id?: string;
  ranking_type?: RankingType;
  candidate_id?: string;
  school_id?: string;
  region?: string;
  department?: string;
  academic_year?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamConfig {
  id: string;
  exam_id: string;
  key: string;
  value: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ExamConfigCreate {
  exam_id: string;
  key: string;
  value: string;
  description: string;
}

export interface ExamConfigUpdate {
  key?: string;
  value?: string;
  description?: string;
}

export interface ExamConfigQuery {
  exam_id?: string;
  key?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamMetrics {
  id: string;
  exam_id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  period_start: string;
  period_end: string;
  created_at: string;
  updated_at: string;
}

export interface ExamMetricsCreate {
  exam_id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  period_start: string;
  period_end: string;
}

export interface ExamMetricsUpdate {
  metric_name?: string;
  metric_value?: number;
  metric_unit?: string;
  period_start?: string;
  period_end?: string;
}

export interface ExamMetricsQuery {
  exam_id?: string;
  metric_name?: string;
  period_start?: string;
  period_end?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamAuditLog {
  id: string;
  exam_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  details: string;
  ip_address: string;
  timestamp: string;
  created_at: string;
}

export interface ExamAuditLogCreate {
  exam_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  user_id: string;
  details: string;
  ip_address: string;
  timestamp: string;
}

export interface ExamAuditLogQuery {
  exam_id?: string;
  action?: string;
  entity_type?: string;
  user_id?: string;
  timestamp?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamNotification {
  id: string;
  exam_id: string;
  title: string;
  message: string;
  type: ExamNotificationType;
  priority: string;
  read: boolean;
  created_at: string;
}

export interface ExamNotificationCreate {
  exam_id: string;
  title: string;
  message: string;
  type: ExamNotificationType;
  priority: string;
}

export interface ExamNotificationUpdate {
  read?: boolean;
}

export interface ExamNotificationQuery {
  exam_id?: string;
  type?: ExamNotificationType;
  priority?: string;
  read?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamDocument {
  id: string;
  exam_id: string;
  document_type: ExamDocumentType;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

export interface ExamDocumentCreate {
  exam_id: string;
  document_type: ExamDocumentType;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
}

export interface ExamDocumentUpdate {
  document_type?: ExamDocumentType;
  title?: string;
  description?: string;
  file_url?: string;
  file_type?: string;
  file_size?: number;
  uploaded_by?: string;
}

export interface ExamDocumentQuery {
  exam_id?: string;
  document_type?: ExamDocumentType;
  search?: string;
  uploaded_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamFee {
  id: string;
  exam_id: string;
  fee_type: ExamFeeType;
  amount: number;
  currency: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamFeeCreate {
  exam_id: string;
  fee_type: ExamFeeType;
  amount: number;
  currency: string;
  description: string;
  status: string;
}

export interface ExamFeeUpdate {
  fee_type?: ExamFeeType;
  amount?: number;
  currency?: string;
  description?: string;
  status?: string;
}

export interface ExamFeeQuery {
  exam_id?: string;
  fee_type?: ExamFeeType;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamPayment {
  id: string;
  candidate_id: string;
  exam_id: string;
  fee_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_reference: string;
  payment_date: string;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamPaymentCreate {
  candidate_id: string;
  exam_id: string;
  fee_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_reference: string;
  payment_date: string;
  status: PaymentStatus;
}

export interface ExamPaymentUpdate {
  candidate_id?: string;
  exam_id?: string;
  fee_id?: string;
  amount?: number;
  currency?: string;
  payment_method?: string;
  payment_reference?: string;
  payment_date?: string;
  status?: PaymentStatus;
}

export interface ExamPaymentQuery {
  candidate_id?: string;
  exam_id?: string;
  fee_id?: string;
  status?: PaymentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamRoom {
  id: string;
  center_id: string;
  room_name: string;
  room_number: string;
  room_type: RoomType;
  capacity: number;
  current_occupancy: number;
  floor: string;
  status: VenueStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamRoomCreate {
  center_id: string;
  room_name: string;
  room_number: string;
  room_type: RoomType;
  capacity: number;
  current_occupancy: number;
  floor: string;
  status: VenueStatus;
}

export interface ExamRoomUpdate {
  center_id?: string;
  room_name?: string;
  room_number?: string;
  room_type?: RoomType;
  capacity?: number;
  current_occupancy?: number;
  floor?: string;
  status?: VenueStatus;
}

export interface ExamRoomQuery {
  center_id?: string;
  search?: string;
  room_type?: RoomType;
  status?: VenueStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamSeat {
  id: string;
  room_id: string;
  seat_number: string;
  candidate_id: string | null;
  row: string;
  column: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamSeatCreate {
  room_id: string;
  seat_number: string;
  candidate_id: string | null;
  row: string;
  column: number;
  status: string;
}

export interface ExamSeatUpdate {
  room_id?: string;
  seat_number?: string;
  candidate_id?: string | null;
  row?: string;
  column?: number;
  status?: string;
}

export interface ExamSeatQuery {
  room_id?: string;
  candidate_id?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamSecurity {
  id: string;
  exam_id: string;
  center_id: string;
  security_level: SecurityLevel;
  checks_required: SecurityCheck[];
  security_personnel: number;
  cctv_required: boolean;
  biometric_required: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamSecurityCreate {
  exam_id: string;
  center_id: string;
  security_level: SecurityLevel;
  checks_required: SecurityCheck[];
  security_personnel: number;
  cctv_required: boolean;
  biometric_required: boolean;
  status: string;
}

export interface ExamSecurityUpdate {
  center_id?: string;
  security_level?: SecurityLevel;
  checks_required?: SecurityCheck[];
  security_personnel?: number;
  cctv_required?: boolean;
  biometric_required?: boolean;
  status?: string;
}

export interface ExamSecurityQuery {
  exam_id?: string;
  center_id?: string;
  security_level?: SecurityLevel;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamSchedule {
  id: string;
  exam_id: string;
  subject_id: string;
  schedule_type: ExamScheduleType;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  notes: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamScheduleCreate {
  exam_id: string;
  subject_id: string;
  schedule_type: ExamScheduleType;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  notes: string;
  status: string;
}

export interface ExamScheduleUpdate {
  subject_id?: string;
  schedule_type?: ExamScheduleType;
  date?: string;
  start_time?: string;
  end_time?: string;
  venue?: string;
  notes?: string;
  status?: string;
}

export interface ExamScheduleQuery {
  exam_id?: string;
  subject_id?: string;
  schedule_type?: ExamScheduleType;
  date?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamResult {
  id: string;
  candidate_id: string;
  exam_id: string;
  subject_id: string;
  marks: number;
  max_marks: number;
  percentage: number;
  grade: Grade;
  result_type: ExamResultType;
  remarks: string;
  status: ResultStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamResultCreate {
  candidate_id: string;
  exam_id: string;
  subject_id: string;
  marks: number;
  max_marks: number;
  percentage: number;
  grade: Grade;
  result_type: ExamResultType;
  remarks: string;
  status: ResultStatus;
}

export interface ExamResultUpdate {
  candidate_id?: string;
  exam_id?: string;
  subject_id?: string;
  marks?: number;
  max_marks?: number;
  percentage?: number;
  grade?: Grade;
  result_type?: ExamResultType;
  remarks?: string;
  status?: ResultStatus;
}

export interface ExamResultQuery {
  candidate_id?: string;
  exam_id?: string;
  subject_id?: string;
  grade?: Grade;
  result_type?: ExamResultType;
  status?: ResultStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamTranscript {
  id: string;
  candidate_id: string;
  exam_id: string;
  transcript_number: string;
  issue_date: string;
  total_marks: number;
  total_max_marks: number;
  overall_percentage: number;
  overall_grade: Grade;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamTranscriptCreate {
  candidate_id: string;
  exam_id: string;
  transcript_number: string;
  issue_date: string;
  total_marks: number;
  total_max_marks: number;
  overall_percentage: number;
  overall_grade: Grade;
  status: string;
}

export interface ExamTranscriptUpdate {
  transcript_number?: string;
  issue_date?: string;
  total_marks?: number;
  total_max_marks?: number;
  overall_percentage?: number;
  overall_grade?: Grade;
  status?: string;
}

export interface ExamTranscriptQuery {
  candidate_id?: string;
  exam_id?: string;
  overall_grade?: Grade;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamStatistics {
  id: string;
  exam_id: string;
  stat_name: string;
  stat_value: number;
  stat_unit: string;
  period: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface ExamStatisticsCreate {
  exam_id: string;
  stat_name: string;
  stat_value: number;
  stat_unit: string;
  period: string;
  category: string;
}

export interface ExamStatisticsUpdate {
  stat_name?: string;
  stat_value?: number;
  stat_unit?: string;
  period?: string;
  category?: string;
}

export interface ExamStatisticsQuery {
  exam_id?: string;
  stat_name?: string;
  period?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamReport {
  id: string;
  exam_id: string;
  report_name: string;
  report_type: string;
  description: string;
  generated_by: string;
  generated_at: string;
  file_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamReportCreate {
  exam_id: string;
  report_name: string;
  report_type: string;
  description: string;
  generated_by: string;
  generated_at: string;
  file_url: string;
  status: string;
}

export interface ExamReportUpdate {
  report_name?: string;
  report_type?: string;
  description?: string;
  generated_by?: string;
  generated_at?: string;
  file_url?: string;
  status?: string;
}

export interface ExamReportQuery {
  exam_id?: string;
  search?: string;
  report_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamFeedback {
  id: string;
  exam_id: string;
  candidate_id: string;
  feedback_type: string;
  feedback_text: string;
  rating: number;
  submitted_at: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamFeedbackCreate {
  exam_id: string;
  candidate_id: string;
  feedback_type: string;
  feedback_text: string;
  rating: number;
  submitted_at: string;
  status: string;
}

export interface ExamFeedbackUpdate {
  feedback_type?: string;
  feedback_text?: string;
  rating?: number;
  submitted_at?: string;
  status?: string;
}

export interface ExamFeedbackQuery {
  exam_id?: string;
  candidate_id?: string;
  feedback_type?: string;
  rating?: number;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamIncident {
  id: string;
  exam_id: string;
  center_id: string;
  incident_type: string;
  description: string;
  severity: string;
  reported_by: string;
  reported_at: string;
  resolved: boolean;
  resolved_by: string | null;
  resolved_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamIncidentCreate {
  exam_id: string;
  center_id: string;
  incident_type: string;
  description: string;
  severity: string;
  reported_by: string;
  reported_at: string;
  resolved: boolean;
  resolved_by: string | null;
  resolved_at: string | null;
  status: string;
}

export interface ExamIncidentUpdate {
  center_id?: string;
  incident_type?: string;
  description?: string;
  severity?: string;
  reported_by?: string;
  reported_at?: string;
  resolved?: boolean;
  resolved_by?: string | null;
  resolved_at?: string | null;
  status?: string;
}

export interface ExamIncidentQuery {
  exam_id?: string;
  center_id?: string;
  incident_type?: string;
  severity?: string;
  resolved?: boolean;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamAccommodation {
  id: string;
  candidate_id: string;
  exam_id: string;
  disability_type: DisabilityType;
  accommodation_type: AccommodationType;
  description: string;
  evidence_url: string | null;
  approved: boolean;
  approved_by: string | null;
  approved_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamAccommodationCreate {
  candidate_id: string;
  exam_id: string;
  disability_type: DisabilityType;
  accommodation_type: AccommodationType;
  description: string;
  evidence_url: string | null;
  approved: boolean;
  approved_by: string | null;
  approved_at: string | null;
  status: string;
}

export interface ExamAccommodationUpdate {
  candidate_id?: string;
  exam_id?: string;
  disability_type?: DisabilityType;
  accommodation_type?: AccommodationType;
  description?: string;
  evidence_url?: string | null;
  approved?: boolean;
  approved_by?: string | null;
  approved_at?: string | null;
  status?: string;
}

export interface ExamAccommodationQuery {
  candidate_id?: string;
  exam_id?: string;
  disability_type?: DisabilityType;
  accommodation_type?: AccommodationType;
  approved?: boolean;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamIntegrity {
  id: string;
  exam_id: string;
  candidate_id: string;
  check_type: SecurityCheck;
  check_result: string;
  details: string;
  checked_at: string;
  checked_by: string;
  status: string;
  created_at: string;
}

export interface ExamIntegrityCreate {
  exam_id: string;
  candidate_id: string;
  check_type: SecurityCheck;
  check_result: string;
  details: string;
  checked_at: string;
  checked_by: string;
  status: string;
}

export interface ExamIntegrityUpdate {
  candidate_id?: string;
  check_type?: SecurityCheck;
  check_result?: string;
  details?: string;
  checked_at?: string;
  checked_by?: string;
  status?: string;
}

export interface ExamIntegrityQuery {
  exam_id?: string;
  candidate_id?: string;
  check_type?: SecurityCheck;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamProctor {
  id: string;
  exam_id: string;
  center_id: string;
  room_id: string;
  proctor_id: string;
  proctor_name: string;
  assigned_at: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamProctorCreate {
  exam_id: string;
  center_id: string;
  room_id: string;
  proctor_id: string;
  proctor_name: string;
  assigned_at: string;
  status: string;
}

export interface ExamProctorUpdate {
  center_id?: string;
  room_id?: string;
  proctor_id?: string;
  proctor_name?: string;
  assigned_at?: string;
  status?: string;
}

export interface ExamProctorQuery {
  exam_id?: string;
  center_id?: string;
  room_id?: string;
  proctor_id?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamAttendance {
  id: string;
  candidate_id: string;
  exam_id: string;
  subject_id: string;
  room_id: string;
  seat_number: string;
  check_in_time: string;
  check_out_time: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamAttendanceCreate {
  candidate_id: string;
  exam_id: string;
  subject_id: string;
  room_id: string;
  seat_number: string;
  check_in_time: string;
  check_out_time: string | null;
  status: string;
}

export interface ExamAttendanceUpdate {
  candidate_id?: string;
  exam_id?: string;
  subject_id?: string;
  room_id?: string;
  seat_number?: string;
  check_in_time?: string;
  check_out_time?: string | null;
  status?: string;
}

export interface ExamAttendanceQuery {
  candidate_id?: string;
  exam_id?: string;
  subject_id?: string;
  room_id?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamQuestionBank {
  id: string;
  subject_id: string;
  question_text: string;
  question_type: QuestionType;
  difficulty: QuestionDifficulty;
  marks: number;
  options: string[];
  correct_answer: string;
  explanation: string;
  source: QuestionSource;
  language: ExamLanguage;
  usage_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamQuestionBankCreate {
  subject_id: string;
  question_text: string;
  question_type: QuestionType;
  difficulty: QuestionDifficulty;
  marks: number;
  options: string[];
  correct_answer: string;
  explanation: string;
  source: QuestionSource;
  language: ExamLanguage;
  usage_count: number;
  status: string;
}

export interface ExamQuestionBankUpdate {
  subject_id?: string;
  question_text?: string;
  question_type?: QuestionType;
  difficulty?: QuestionDifficulty;
  marks?: number;
  options?: string[];
  correct_answer?: string;
  explanation?: string;
  source?: QuestionSource;
  language?: ExamLanguage;
  usage_count?: number;
  status?: string;
}

export interface ExamQuestionBankQuery {
  subject_id?: string;
  search?: string;
  question_type?: QuestionType;
  difficulty?: QuestionDifficulty;
  source?: QuestionSource;
  language?: ExamLanguage;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamAnswerSheet {
  id: string;
  candidate_id: string;
  exam_id: string;
  subject_id: string;
  paper_id: string;
  room_id: string;
  seat_number: string;
  file_url: string;
  file_type: string;
  scanned_at: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamAnswerSheetCreate {
  candidate_id: string;
  exam_id: string;
  subject_id: string;
  paper_id: string;
  room_id: string;
  seat_number: string;
  file_url: string;
  file_type: string;
  scanned_at: string;
  status: string;
}

export interface ExamAnswerSheetUpdate {
  candidate_id?: string;
  exam_id?: string;
  subject_id?: string;
  paper_id?: string;
  room_id?: string;
  seat_number?: string;
  file_url?: string;
  file_type?: string;
  scanned_at?: string;
  status?: string;
}

export interface ExamAnswerSheetQuery {
  candidate_id?: string;
  exam_id?: string;
  subject_id?: string;
  paper_id?: string;
  room_id?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamGradingScale {
  id: string;
  exam_id: string;
  grade_name: string;
  min_percentage: number;
  max_percentage: number;
  gpa: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ExamGradingScaleCreate {
  exam_id: string;
  grade_name: string;
  min_percentage: number;
  max_percentage: number;
  gpa: number;
  description: string;
}

export interface ExamGradingScaleUpdate {
  grade_name?: string;
  min_percentage?: number;
  max_percentage?: number;
  gpa?: number;
  description?: string;
}

export interface ExamGradingScaleQuery {
  exam_id?: string;
  grade_name?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamMarkingScheme {
  id: string;
  subject_id: string;
  question_id: string;
  max_marks: number;
  marking_criteria: string;
  sample_answer: string;
  created_at: string;
  updated_at: string;
}

export interface ExamMarkingSchemeCreate {
  subject_id: string;
  question_id: string;
  max_marks: number;
  marking_criteria: string;
  sample_answer: string;
}

export interface ExamMarkingSchemeUpdate {
  subject_id?: string;
  question_id?: string;
  max_marks?: number;
  marking_criteria?: string;
  sample_answer?: string;
}

export interface ExamMarkingSchemeQuery {
  subject_id?: string;
  question_id?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamMarker {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  subject_id: string;
  qualifications: string;
  experience_years: number;
  assigned_papers: number;
  marked_papers: number;
  average_time_minutes: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamMarkerCreate {
  user_id: string;
  first_name: string;
  last_name: string;
  subject_id: string;
  qualifications: string;
  experience_years: number;
  assigned_papers: number;
  marked_papers: number;
  average_time_minutes: number;
  status: string;
}

export interface ExamMarkerUpdate {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  subject_id?: string;
  qualifications?: string;
  experience_years?: number;
  assigned_papers?: number;
  marked_papers?: number;
  average_time_minutes?: number;
  status?: string;
}

export interface ExamMarkerQuery {
  subject_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamQualityAssurance {
  id: string;
  exam_id: string;
  subject_id: string;
  qa_type: string;
  description: string;
  sample_size: number;
  issues_found: number;
  qa_date: string;
  qa_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamQualityAssuranceCreate {
  exam_id: string;
  subject_id: string;
  qa_type: string;
  description: string;
  sample_size: number;
  issues_found: number;
  qa_date: string;
  qa_by: string;
  status: string;
}

export interface ExamQualityAssuranceUpdate {
  subject_id?: string;
  qa_type?: string;
  description?: string;
  sample_size?: number;
  issues_found?: number;
  qa_date?: string;
  qa_by?: string;
  status?: string;
}

export interface ExamQualityAssuranceQuery {
  exam_id?: string;
  subject_id?: string;
  qa_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamVerification {
  id: string;
  certificate_id: string;
  verification_code: string;
  verified_by: string;
  verification_date: string;
  is_authentic: boolean;
  notes: string;
  created_at: string;
}

export interface ExamVerificationCreate {
  certificate_id: string;
  verification_code: string;
  verified_by: string;
  verification_date: string;
  is_authentic: boolean;
  notes: string;
}

export interface ExamVerificationUpdate {
  verification_code?: string;
  verified_by?: string;
  verification_date?: string;
  is_authentic?: boolean;
  notes?: string;
}

export interface ExamVerificationQuery {
  certificate_id?: string;
  verification_code?: string;
  verified_by?: string;
  is_authentic?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamReplacement {
  id: string;
  original_certificate_id: string;
  replacement_certificate_id: string;
  reason: string;
  requested_by: string;
  request_date: string;
  approved_by: string | null;
  approved_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamReplacementCreate {
  original_certificate_id: string;
  replacement_certificate_id: string;
  reason: string;
  requested_by: string;
  request_date: string;
  approved_by: string | null;
  approved_date: string | null;
  status: string;
}

export interface ExamReplacementUpdate {
  original_certificate_id?: string;
  replacement_certificate_id?: string;
  reason?: string;
  requested_by?: string;
  request_date?: string;
  approved_by?: string | null;
  approved_date?: string | null;
  status?: string;
}

export interface ExamReplacementQuery {
  original_certificate_id?: string;
  replacement_certificate_id?: string;
  requested_by?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamArchive {
  id: string;
  exam_id: string;
  archive_type: string;
  archive_date: string;
  retention_years: number;
  location: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamArchiveCreate {
  exam_id: string;
  archive_type: string;
  archive_date: string;
  retention_years: number;
  location: string;
  status: string;
}

export interface ExamArchiveUpdate {
  archive_type?: string;
  archive_date?: string;
  retention_years?: number;
  location?: string;
  status?: string;
}

export interface ExamArchiveQuery {
  exam_id?: string;
  archive_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamBackup {
  id: string;
  exam_id: string;
  backup_name: string;
  backup_type: string;
  backup_size: number;
  backup_location: string;
  backup_date: string;
  retention_days: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamBackupCreate {
  exam_id: string;
  backup_name: string;
  backup_type: string;
  backup_size: number;
  backup_location: string;
  backup_date: string;
  retention_days: number;
  status: string;
}

export interface ExamBackupUpdate {
  backup_name?: string;
  backup_type?: string;
  backup_size?: number;
  backup_location?: string;
  backup_date?: string;
  retention_days?: number;
  status?: string;
}

export interface ExamBackupQuery {
  exam_id?: string;
  search?: string;
  backup_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamRecovery {
  id: string;
  exam_id: string;
  backup_id: string;
  recovery_type: string;
  recovery_date: string;
  recovered_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamRecoveryCreate {
  exam_id: string;
  backup_id: string;
  recovery_type: string;
  recovery_date: string;
  recovered_by: string;
  status: string;
}

export interface ExamRecoveryUpdate {
  backup_id?: string;
  recovery_type?: string;
  recovery_date?: string;
  recovered_by?: string;
  status?: string;
}

export interface ExamRecoveryQuery {
  exam_id?: string;
  backup_id?: string;
  recovery_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamMonitoring {
  id: string;
  exam_id: string;
  center_id: string;
  monitoring_type: string;
  status: string;
  alert_level: string;
  details: string;
  monitored_at: string;
  monitored_by: string;
  created_at: string;
  updated_at: string;
}

export interface ExamMonitoringCreate {
  exam_id: string;
  center_id: string;
  monitoring_type: string;
  status: string;
  alert_level: string;
  details: string;
  monitored_at: string;
  monitored_by: string;
}

export interface ExamMonitoringUpdate {
  center_id?: string;
  monitoring_type?: string;
  status?: string;
  alert_level?: string;
  details?: string;
  monitored_at?: string;
  monitored_by?: string;
}

export interface ExamMonitoringQuery {
  exam_id?: string;
  center_id?: string;
  monitoring_type?: string;
  status?: string;
  alert_level?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamAlert {
  id: string;
  exam_id: string;
  center_id: string;
  alert_type: string;
  alert_message: string;
  alert_level: string;
  alert_date: string;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExamAlertCreate {
  exam_id: string;
  center_id: string;
  alert_type: string;
  alert_message: string;
  alert_level: string;
  alert_date: string;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_date: string | null;
}

export interface ExamAlertUpdate {
  center_id?: string;
  alert_type?: string;
  alert_message?: string;
  alert_level?: string;
  alert_date?: string;
  acknowledged?: boolean;
  acknowledged_by?: string | null;
  acknowledged_date?: string | null;
}

export interface ExamAlertQuery {
  exam_id?: string;
  center_id?: string;
  alert_type?: string;
  alert_level?: string;
  acknowledged?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamPerformance {
  id: string;
  exam_id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  measurement_date: string;
  created_at: string;
  updated_at: string;
}

export interface ExamPerformanceCreate {
  exam_id: string;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  measurement_date: string;
}

export interface ExamPerformanceUpdate {
  metric_name?: string;
  metric_value?: number;
  metric_unit?: string;
  measurement_date?: string;
}

export interface ExamPerformanceQuery {
  exam_id?: string;
  metric_name?: string;
  measurement_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamPrediction {
  id: string;
  exam_id: string;
  prediction_type: string;
  prediction_model: string;
  predicted_value: number;
  confidence_interval: number;
  prediction_date: string;
  created_at: string;
  updated_at: string;
}

export interface ExamPredictionCreate {
  exam_id: string;
  prediction_type: string;
  prediction_model: string;
  predicted_value: number;
  confidence_interval: number;
  prediction_date: string;
}

export interface ExamPredictionUpdate {
  prediction_type?: string;
  prediction_model?: string;
  predicted_value?: number;
  confidence_interval?: number;
  prediction_date?: string;
}

export interface ExamPredictionQuery {
  exam_id?: string;
  prediction_type?: string;
  prediction_model?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamTrend {
  id: string;
  exam_id: string;
  trend_type: string;
  trend_direction: string;
  trend_value: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface ExamTrendCreate {
  exam_id: string;
  trend_type: string;
  trend_direction: string;
  trend_value: number;
  period: string;
}

export interface ExamTrendUpdate {
  trend_type?: string;
  trend_direction?: string;
  trend_value?: number;
  period?: string;
}

export interface ExamTrendQuery {
  exam_id?: string;
  trend_type?: string;
  trend_direction?: string;
  period?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamBenchmark {
  id: string;
  exam_id: string;
  benchmark_type: string;
  benchmark_name: string;
  benchmark_value: number;
  current_value: number;
  variance: number;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface ExamBenchmarkCreate {
  exam_id: string;
  benchmark_type: string;
  benchmark_name: string;
  benchmark_value: number;
  current_value: number;
  variance: number;
  period: string;
}

export interface ExamBenchmarkUpdate {
  benchmark_type?: string;
  benchmark_name?: string;
  benchmark_value?: number;
  current_value?: number;
  variance?: number;
  period?: string;
}

export interface ExamBenchmarkQuery {
  exam_id?: string;
  benchmark_type?: string;
  benchmark_name?: string;
  period?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamAudit {
  id: string;
  exam_id: string;
  audit_type: string;
  audit_date: string;
  auditor_name: string;
  findings: string;
  recommendations: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamAuditCreate {
  exam_id: string;
  audit_type: string;
  audit_date: string;
  auditor_name: string;
  findings: string;
  recommendations: string;
  status: string;
}

export interface ExamAuditUpdate {
  audit_type?: string;
  audit_date?: string;
  auditor_name?: string;
  findings?: string;
  recommendations?: string;
  status?: string;
}

export interface ExamAuditQuery {
  exam_id?: string;
  audit_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamComplianceData {
  id: string;
  exam_id: string;
  compliance_type: string;
  compliance_status: string;
  assessment_date: string;
  assessed_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ExamComplianceCreate {
  exam_id: string;
  compliance_type: string;
  compliance_status: string;
  assessment_date: string;
  assessed_by: string;
  notes: string;
}

export interface ExamComplianceUpdate {
  compliance_type?: string;
  compliance_status?: string;
  assessment_date?: string;
  assessed_by?: string;
  notes?: string;
}

export interface ExamComplianceQuery {
  exam_id?: string;
  compliance_type?: string;
  compliance_status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}

export interface ExamDataQualityData {
  id: string;
  exam_id: string;
  quality_type: string;
  quality_score: number;
  issues_found: number;
  assessment_date: string;
  assessed_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamDataQualityCreate {
  exam_id: string;
  quality_type: string;
  quality_score: number;
  issues_found: number;
  assessment_date: string;
  assessed_by: string;
  status: string;
}

export interface ExamDataQualityUpdate {
  quality_type?: string;
  quality_score?: number;
  issues_found?: number;
  assessment_date?: string;
  assessed_by?: string;
  status?: string;
}

export interface ExamDataQualityQuery {
  exam_id?: string;
  quality_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: ExamSortOrder;
}
export enum RegistryType {
  SCHOOL = 'school',
  STUDENT = 'student',
  TEACHER = 'teacher',
  STAFF = 'staff',
  DIPLOMA = 'diploma',
  CERTIFICATION = 'certification',
  INSTITUTION = 'institution',
  PROGRAM = 'program',
  CURRICULUM = 'curriculum',
  ACCREDITATION = 'accreditation',
}

export enum RegistryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  SUSPENDED = 'suspended',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

export enum RegistryLevel {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  DISTRICT = 'district',
  SCHOOL = 'school',
}

export enum SchoolCategory {
  PUBLIC = 'public',
  PRIVATE = 'private',
  INTERNATIONAL = 'international',
  COMMUNITY = 'community',
  RELIGIOUS = 'religious',
  TECHNICAL = 'technical',
  VOCATIONAL = 'vocational',
}

export enum StudentStatus {
  ENROLLED = 'enrolled',
  GRADUATED = 'graduated',
  TRANSFERRED = 'transferred',
  SUSPENDED = 'suspended',
  EXPULLED = 'expelled',
  DROPOUT = 'dropout',
  DECEASED = 'deceased',
  ALUMNI = 'alumni',
}

export enum TeacherStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  RETIRED = 'retired',
  RESIGNED = 'resigned',
  TERMINATED = 'terminated',
  ON_LEAVE = 'on_leave',
  PROBATION = 'probation',
}

export enum StaffCategory {
  ADMINISTRATIVE = 'administrative',
  TECHNICAL = 'technical',
  SUPPORT = 'support',
  MANAGEMENT = 'management',
  CONSULTANT = 'consultant',
  INTERN = 'intern',
}

export enum DiplomaType {
  PRIMARY = 'primary',
  JUNIOR_SECONDARY = 'junior_secondary',
  SENIOR_SECONDARY = 'senior_secondary',
  TECHNICAL = 'technical',
  VOCATIONAL = 'vocational',
  BACHELOR = 'bachelor',
  MASTER = 'master',
  DOCTORATE = 'doctorate',
  PROFESSIONAL = 'professional',
}

export enum CertificationType {
  TEACHING = 'teaching',
  ADMINISTRATIVE = 'administrative',
  TECHNICAL = 'technical',
  PROFESSIONAL = 'professional',
  VOCATIONAL = 'vocational',
  LANGUAGE = 'language',
  COMPUTER = 'computer',
  SAFETY = 'safety',
}

export enum InstitutionType {
  UNIVERSITY = 'university',
  COLLEGE = 'college',
  INSTITUTE = 'institute',
  SCHOOL = 'school',
  ACADEMY = 'academy',
  TRAINING_CENTER = 'training_center',
  RESEARCH_CENTER = 'research_center',
}

export enum ProgramType {
  ACADEMIC = 'academic',
  TECHNICAL = 'technical',
  VOCATIONAL = 'vocational',
  PROFESSIONAL = 'professional',
  RESEARCH = 'research',
  CONTINUING_EDUCATION = 'continuing_education',
}

export enum CurriculumType {
  NATIONAL = 'national',
  INTERNATIONAL = 'international',
  REGIONAL = 'regional',
  SCHOOL_BASED = 'school_based',
  SPECIALIZED = 'specialized',
}

export enum AccreditationStatus {
  ACCREDITED = 'accredited',
  PROBATIONARY = 'probationary',
  PENDING = 'pending',
  REVOKED = 'revoked',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended',
}

export enum RegistryPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  CRITICAL = 'critical',
}

export enum RegistryFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum RegistryCategory {
  ACADEMIC = 'academic',
  ADMINISTRATIVE = 'administrative',
  FINANCIAL = 'financial',
  TECHNICAL = 'technical',
  STATISTICAL = 'statistical',
}

export enum RegistryScope {
  NATIONAL = 'national',
  REGIONAL = 'regional',
  DEPARTMENTAL = 'departmental',
  DISTRICT = 'district',
  SCHOOL = 'school',
}

export enum RegistryValidation {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  UNDER_REVIEW = 'under_review',
}

export enum RegistryAccess {
  PUBLIC = 'public',
  PRIVATE = 'private',
  RESTRICTED = 'restricted',
  CONFIDENTIAL = 'confidential',
}

export enum RegistryFormat {
  JSON = 'json',
  XML = 'xml',
  CSV = 'csv',
  PDF = 'pdf',
  EXCEL = 'excel',
}

export enum RegistrySource {
  MANUAL = 'manual',
  AUTOMATED = 'automated',
  IMPORTED = 'imported',
  API = 'api',
  BATCH = 'batch',
}

export enum RegistryUpdateFrequency {
  REAL_TIME = 'real_time',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}

export enum RegistryRetention {
  PERMANENT = 'permanent',
  TEMPORARY = 'temporary',
  LIMITED = 'limited',
  ARCHIVED = 'archived',
}

export enum RegistryCompliance {
  COMPLIANT = 'compliant',
  NON_COMPLIANT = 'non_compliant',
  PARTIALLY_COMPLIANT = 'partially_compliant',
  UNDER_REVIEW = 'under_review',
}

export enum RegistryEncryption {
  NONE = 'none',
  STANDARD = 'standard',
  ADVANCED = 'advanced',
  MILITARY = 'military',
}

export enum RegistryBackup {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  REAL_TIME = 'real_time',
}

export enum RegistryRecovery {
  NONE = 'none',
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  ENTERPRISE = 'enterprise',
}

export enum RegistryAuditLevel {
  NONE = 'none',
  BASIC = 'basic',
  DETAILED = 'detailed',
  COMPREHENSIVE = 'comprehensive',
}

export enum RegistryReporting {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

export enum RegistryIntegration {
  NONE = 'none',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  BOTH = 'both',
}

export enum RegistryLanguage {
  FRENCH = 'french',
  ENGLISH = 'english',
  ARABIC = 'arabic',
  LOCAL = 'local',
}

export enum RegistryCurrency {
  XOF = 'xof',
  XAF = 'xaf',
  NGN = 'ngn',
  GHS = 'ghs',
  KES = 'kes',
  USD = 'usd',
  EUR = 'eur',
}

export enum RegistryTimeZone {
  UTC = 'utc',
  GMT = 'gmt',
  LOCAL = 'local',
}

export enum RegistryStatusIndicator {
  GREEN = 'green',
  YELLOW = 'yellow',
  RED = 'red',
  GRAY = 'gray',
}

export enum RegistryTrend {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
  VOLATILE = 'volatile',
}

export enum RegistryAlert {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum RegistryNotification {
  NONE = 'none',
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  IN_APP = 'in_app',
  ALL = 'all',
}

export enum RegistryExport {
  NONE = 'none',
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  PDF = 'pdf',
  EXCEL = 'excel',
}

export enum RegistryImport {
  NONE = 'none',
  CSV = 'csv',
  JSON = 'json',
  XML = 'xml',
  EXCEL = 'excel',
}

export enum RegistrySearch {
  NONE = 'none',
  BASIC = 'basic',
  ADVANCED = 'advanced',
  FULL_TEXT = 'full_text',
}

export enum RegistryFilter {
  NONE = 'none',
  BASIC = 'basic',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

export enum RegistrySort {
  NONE = 'none',
  ASC = 'asc',
  DESC = 'desc',
  CUSTOM = 'custom',
}

export enum RegistryPagination {
  NONE = 'none',
  OFFSET = 'offset',
  CURSOR = 'cursor',
  PAGE = 'page',
}

export enum RegistryRateLimit {
  NONE = 'none',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  UNLIMITED = 'unlimited',
}

export enum RegistryCache {
  NONE = 'none',
  MEMORY = 'memory',
  REDIS = 'redis',
  MEMCACHED = 'memcached',
  FILE = 'file',
}

export enum RegistryCompression {
  NONE = 'none',
  GZIP = 'gzip',
  DEFLATE = 'deflate',
  BROTLI = 'brotli',
}

export enum RegistryVersioning {
  NONE = 'none',
  SIMPLE = 'simple',
  DETAILED = 'detailed',
  FULL = 'full',
}

export enum RegistrySchema {
  NONE = 'none',
  STRICT = 'strict',
  FLEXIBLE = 'flexible',
  CUSTOM = 'custom',
}

export enum RegistryValidationLevel {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  STRICT = 'strict',
}

export enum RegistrySanitization {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  STRICT = 'strict',
}

export enum RegistryNormalization {
  NONE = 'none',
  BASIC = 'basic',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

export enum RegistryDeduplication {
  NONE = 'none',
  BASIC = 'basic',
  ADVANCED = 'advanced',
  FUZZY = 'fuzzy',
}

export enum RegistryMerge {
  NONE = 'none',
  AUTOMATIC = 'automatic',
  MANUAL = 'manual',
  HYBRID = 'hybrid',
}

export enum RegistrySplit {
  NONE = 'none',
  AUTOMATIC = 'automatic',
  MANUAL = 'manual',
  HYBRID = 'hybrid',
}

export enum RegistryArchive {
  NONE = 'none',
  AUTOMATIC = 'automatic',
  MANUAL = 'manual',
  SCHEDULED = 'scheduled',
}

export enum RegistryRestore {
  NONE = 'none',
  AUTOMATIC = 'automatic',
  MANUAL = 'manual',
  POINT_IN_TIME = 'point_in_time',
}

export enum RegistryMigration {
  NONE = 'none',
  ONE_TIME = 'one_time',
  ONGOING = 'ongoing',
  SCHEDULED = 'scheduled',
}

export enum RegistryTransformation {
  NONE = 'none',
  BASIC = 'basic',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

export enum RegistryEnrichment {
  NONE = 'none',
  BASIC = 'basic',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

export enum RegistryQuality {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  HIGH = 'high',
  ENTERPRISE = 'enterprise',
}

export enum RegistryGovernance {
  NONE = 'none',
  BASIC = 'basic',
  STANDARD = 'standard',
  ADVANCED = 'advanced',
  ENTERPRISE = 'enterprise',
}

export interface NationalSchoolRegistry {
  id: string;
  school_id: string;
  school_name: string;
  school_code: string;
  category: SchoolCategory;
  region: string;
  department: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  principal_name: string;
  student_count: number;
  teacher_count: number;
  staff_count: number;
  status: RegistryStatus;
  level: RegistryLevel;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalSchoolRegistryCreate {
  school_id: string;
  school_name: string;
  school_code: string;
  category: SchoolCategory;
  region: string;
  department: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  principal_name: string;
  student_count: number;
  teacher_count: number;
  staff_count: number;
  status: RegistryStatus;
  level: RegistryLevel;
}

export interface NationalSchoolRegistryUpdate {
  school_id?: string;
  school_name?: string;
  school_code?: string;
  category?: SchoolCategory;
  region?: string;
  department?: string;
  district?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  principal_name?: string;
  student_count?: number;
  teacher_count?: number;
  staff_count?: number;
  status?: RegistryStatus;
  level?: RegistryLevel;
}

export interface NationalSchoolRegistryQuery {
  search?: string;
  category?: SchoolCategory;
  region?: string;
  department?: string;
  district?: string;
  status?: RegistryStatus;
  level?: RegistryLevel;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalStudentRegistry {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  region: string;
  department: string;
  district: string;
  school_id: string;
  school_name: string;
  grade_level: string;
  enrollment_date: string;
  graduation_date: string | null;
  status: StudentStatus;
  gpa: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalStudentRegistryCreate {
  student_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  region: string;
  department: string;
  district: string;
  school_id: string;
  school_name: string;
  grade_level: string;
  enrollment_date: string;
  graduation_date: string | null;
  status: StudentStatus;
  gpa: number | null;
}

export interface NationalStudentRegistryUpdate {
  student_id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  nationality?: string;
  region?: string;
  department?: string;
  district?: string;
  school_id?: string;
  school_name?: string;
  grade_level?: string;
  enrollment_date?: string;
  graduation_date?: string | null;
  status?: StudentStatus;
  gpa?: number | null;
}

export interface NationalStudentRegistryQuery {
  search?: string;
  gender?: string;
  nationality?: string;
  region?: string;
  department?: string;
  district?: string;
  school_id?: string;
  grade_level?: string;
  status?: StudentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalTeacherRegistry {
  id: string;
  teacher_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  region: string;
  department: string;
  district: string;
  school_id: string;
  school_name: string;
  subject_area: string;
  qualification: string;
  years_of_experience: number;
  hire_date: string;
  status: TeacherStatus;
  certification_expiry: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalTeacherRegistryCreate {
  teacher_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  region: string;
  department: string;
  district: string;
  school_id: string;
  school_name: string;
  subject_area: string;
  qualification: string;
  years_of_experience: number;
  hire_date: string;
  status: TeacherStatus;
  certification_expiry: string | null;
}

export interface NationalTeacherRegistryUpdate {
  teacher_id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  nationality?: string;
  region?: string;
  department?: string;
  district?: string;
  school_id?: string;
  school_name?: string;
  subject_area?: string;
  qualification?: string;
  years_of_experience?: number;
  hire_date?: string;
  status?: TeacherStatus;
  certification_expiry?: string | null;
}

export interface NationalTeacherRegistryQuery {
  search?: string;
  gender?: string;
  nationality?: string;
  region?: string;
  department?: string;
  district?: string;
  school_id?: string;
  subject_area?: string;
  qualification?: string;
  status?: TeacherStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalStaffRegistry {
  id: string;
  staff_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  region: string;
  department: string;
  district: string;
  school_id: string;
  school_name: string;
  position: string;
  category: StaffCategory;
  hire_date: string;
  salary: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalStaffRegistryCreate {
  staff_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  region: string;
  department: string;
  district: string;
  school_id: string;
  school_name: string;
  position: string;
  category: StaffCategory;
  hire_date: string;
  salary: number;
  status: string;
}

export interface NationalStaffRegistryUpdate {
  staff_id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  nationality?: string;
  region?: string;
  department?: string;
  district?: string;
  school_id?: string;
  school_name?: string;
  position?: string;
  category?: StaffCategory;
  hire_date?: string;
  salary?: number;
  status?: string;
}

export interface NationalStaffRegistryQuery {
  search?: string;
  gender?: string;
  nationality?: string;
  region?: string;
  department?: string;
  district?: string;
  school_id?: string;
  position?: string;
  category?: StaffCategory;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalDiplomaRegistry {
  id: string;
  diploma_id: string;
  student_id: string;
  student_name: string;
  school_id: string;
  school_name: string;
  diploma_type: DiplomaType;
  specialization: string;
  issue_date: string;
  graduation_year: number;
  final_grade: string;
  honors: string | null;
  serial_number: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalDiplomaRegistryCreate {
  diploma_id: string;
  student_id: string;
  student_name: string;
  school_id: string;
  school_name: string;
  diploma_type: DiplomaType;
  specialization: string;
  issue_date: string;
  graduation_year: number;
  final_grade: string;
  honors: string | null;
  serial_number: string;
  status: string;
}

export interface NationalDiplomaRegistryUpdate {
  diploma_id?: string;
  student_id?: string;
  student_name?: string;
  school_id?: string;
  school_name?: string;
  diploma_type?: DiplomaType;
  specialization?: string;
  issue_date?: string;
  graduation_year?: number;
  final_grade?: string;
  honors?: string | null;
  serial_number?: string;
  status?: string;
}

export interface NationalDiplomaRegistryQuery {
  search?: string;
  student_id?: string;
  school_id?: string;
  diploma_type?: DiplomaType;
  graduation_year?: number;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalCertificationRegistry {
  id: string;
  certification_id: string;
  holder_id: string;
  holder_name: string;
  certification_type: CertificationType;
  certification_name: string;
  issuing_body: string;
  issue_date: string;
  expiry_date: string;
  serial_number: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalCertificationRegistryCreate {
  certification_id: string;
  holder_id: string;
  holder_name: string;
  certification_type: CertificationType;
  certification_name: string;
  issuing_body: string;
  issue_date: string;
  expiry_date: string;
  serial_number: string;
  status: string;
}

export interface NationalCertificationRegistryUpdate {
  certification_id?: string;
  holder_id?: string;
  holder_name?: string;
  certification_type?: CertificationType;
  certification_name?: string;
  issuing_body?: string;
  issue_date?: string;
  expiry_date?: string;
  serial_number?: string;
  status?: string;
}

export interface NationalCertificationRegistryQuery {
  search?: string;
  holder_id?: string;
  certification_type?: CertificationType;
  issuing_body?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalInstitutionRegistry {
  id: string;
  institution_id: string;
  institution_name: string;
  institution_code: string;
  institution_type: InstitutionType;
  region: string;
  department: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  accreditation_status: AccreditationStatus;
  accreditation_expiry: string | null;
  student_capacity: number;
  current_enrollment: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalInstitutionRegistryCreate {
  institution_id: string;
  institution_name: string;
  institution_code: string;
  institution_type: InstitutionType;
  region: string;
  department: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  accreditation_status: AccreditationStatus;
  accreditation_expiry: string | null;
  student_capacity: number;
  current_enrollment: number;
  status: string;
}

export interface NationalInstitutionRegistryUpdate {
  institution_id?: string;
  institution_name?: string;
  institution_code?: string;
  institution_type?: InstitutionType;
  region?: string;
  department?: string;
  district?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  accreditation_status?: AccreditationStatus;
  accreditation_expiry?: string | null;
  student_capacity?: number;
  current_enrollment?: number;
  status?: string;
}

export interface NationalInstitutionRegistryQuery {
  search?: string;
  institution_type?: InstitutionType;
  region?: string;
  department?: string;
  district?: string;
  accreditation_status?: AccreditationStatus;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalProgramRegistry {
  id: string;
  program_id: string;
  program_name: string;
  program_code: string;
  program_type: ProgramType;
  institution_id: string;
  institution_name: string;
  duration_years: number;
  duration_months: number;
  credits: number;
  start_date: string;
  end_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalProgramRegistryCreate {
  program_id: string;
  program_name: string;
  program_code: string;
  program_type: ProgramType;
  institution_id: string;
  institution_name: string;
  duration_years: number;
  duration_months: number;
  credits: number;
  start_date: string;
  end_date: string | null;
  status: string;
}

export interface NationalProgramRegistryUpdate {
  program_id?: string;
  program_name?: string;
  program_code?: string;
  program_type?: ProgramType;
  institution_id?: string;
  institution_name?: string;
  duration_years?: number;
  duration_months?: number;
  credits?: number;
  start_date?: string;
  end_date?: string | null;
  status?: string;
}

export interface NationalProgramRegistryQuery {
  search?: string;
  program_type?: ProgramType;
  institution_id?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalCurriculumRegistry {
  id: string;
  curriculum_id: string;
  curriculum_name: string;
  curriculum_code: string;
  curriculum_type: CurriculumType;
  education_level: string;
  version: string;
  effective_date: string;
  expiry_date: string | null;
  total_hours: number;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalCurriculumRegistryCreate {
  curriculum_id: string;
  curriculum_name: string;
  curriculum_code: string;
  curriculum_type: CurriculumType;
  education_level: string;
  version: string;
  effective_date: string;
  expiry_date: string | null;
  total_hours: number;
  status: string;
}

export interface NationalCurriculumRegistryUpdate {
  curriculum_id?: string;
  curriculum_name?: string;
  curriculum_code?: string;
  curriculum_type?: CurriculumType;
  education_level?: string;
  version?: string;
  effective_date?: string;
  expiry_date?: string | null;
  total_hours?: number;
  status?: string;
}

export interface NationalCurriculumRegistryQuery {
  search?: string;
  curriculum_type?: CurriculumType;
  education_level?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalAccreditationRegistry {
  id: string;
  accreditation_id: string;
  institution_id: string;
  institution_name: string;
  accreditation_body: string;
  accreditation_type: string;
  issue_date: string;
  expiry_date: string;
  status: AccreditationStatus;
  scope: string;
  conditions: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface NationalAccreditationRegistryCreate {
  accreditation_id: string;
  institution_id: string;
  institution_name: string;
  accreditation_body: string;
  accreditation_type: string;
  issue_date: string;
  expiry_date: string;
  status: AccreditationStatus;
  scope: string;
  conditions: string | null;
}

export interface NationalAccreditationRegistryUpdate {
  accreditation_id?: string;
  institution_id?: string;
  institution_name?: string;
  accreditation_body?: string;
  accreditation_type?: string;
  issue_date?: string;
  expiry_date?: string;
  status?: AccreditationStatus;
  scope?: string;
  conditions?: string | null;
}

export interface NationalAccreditationRegistryQuery {
  search?: string;
  institution_id?: string;
  accreditation_body?: string;
  accreditation_type?: string;
  status?: AccreditationStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryConfig {
  id: string;
  registry_type: RegistryType;
  key: string;
  value: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryConfigCreate {
  registry_type: RegistryType;
  key: string;
  value: string;
  description: string;
}

export interface RegistryConfigUpdate {
  registry_type?: RegistryType;
  key?: string;
  value?: string;
  description?: string;
}

export interface RegistryConfigQuery {
  registry_type?: RegistryType;
  key?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryMetrics {
  id: string;
  registry_type: RegistryType;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  period_start: string;
  period_end: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryMetricsCreate {
  registry_type: RegistryType;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  period_start: string;
  period_end: string;
}

export interface RegistryMetricsUpdate {
  registry_type?: RegistryType;
  metric_name?: string;
  metric_value?: number;
  metric_unit?: string;
  period_start?: string;
  period_end?: string;
}

export interface RegistryMetricsQuery {
  registry_type?: RegistryType;
  metric_name?: string;
  period_start?: string;
  period_end?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryAudit {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  action: string;
  user_id: string;
  user_name: string;
  details: string;
  ip_address: string;
  timestamp: string;
  created_at: string;
}

export interface RegistryAuditCreate {
  registry_type: RegistryType;
  entity_id: string;
  action: string;
  user_id: string;
  user_name: string;
  details: string;
  ip_address: string;
  timestamp: string;
}

export interface RegistryAuditQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  action?: string;
  user_id?: string;
  timestamp?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryNotificationData {
  id: string;
  registry_type: RegistryType;
  title: string;
  message: string;
  type: string;
  priority: string;
  read: boolean;
  created_at: string;
}

export interface RegistryNotificationCreate {
  registry_type: RegistryType;
  title: string;
  message: string;
  type: string;
  priority: string;
}

export interface RegistryNotificationUpdate {
  read?: boolean;
}

export interface RegistryNotificationQuery {
  registry_type?: RegistryType;
  type?: string;
  priority?: string;
  read?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryDocument {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryDocumentCreate {
  registry_type: RegistryType;
  entity_id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
}

export interface RegistryDocumentUpdate {
  title?: string;
  description?: string;
}

export interface RegistryDocumentQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  search?: string;
  file_type?: string;
  uploaded_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryReport {
  id: string;
  registry_type: RegistryType;
  report_name: string;
  description: string;
  report_type: string;
  period_start: string;
  period_end: string;
  generated_by: string;
  file_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryReportCreate {
  registry_type: RegistryType;
  report_name: string;
  description: string;
  report_type: string;
  period_start: string;
  period_end: string;
  generated_by: string;
  file_url: string;
  status: string;
}

export interface RegistryReportUpdate {
  report_name?: string;
  description?: string;
  report_type?: string;
  period_start?: string;
  period_end?: string;
  generated_by?: string;
  file_url?: string;
  status?: string;
}

export interface RegistryReportQuery {
  registry_type?: RegistryType;
  search?: string;
  report_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryStatistics {
  id: string;
  registry_type: RegistryType;
  stat_name: string;
  stat_value: number;
  stat_unit: string;
  period: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryStatisticsCreate {
  registry_type: RegistryType;
  stat_name: string;
  stat_value: number;
  stat_unit: string;
  period: string;
  category: string;
}

export interface RegistryStatisticsUpdate {
  registry_type?: RegistryType;
  stat_name?: string;
  stat_value?: number;
  stat_unit?: string;
  period?: string;
  category?: string;
}

export interface RegistryStatisticsQuery {
  registry_type?: RegistryType;
  stat_name?: string;
  period?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryValidationData {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  validation_type: string;
  validator_id: string;
  validator_name: string;
  status: RegistryValidation;
  comments: string;
  validation_date: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryValidationCreate {
  registry_type: RegistryType;
  entity_id: string;
  validation_type: string;
  validator_id: string;
  validator_name: string;
  status: RegistryValidation;
  comments: string;
  validation_date: string;
}

export interface RegistryValidationUpdate {
  validation_type?: string;
  validator_id?: string;
  validator_name?: string;
  status?: RegistryValidation;
  comments?: string;
  validation_date?: string;
}

export interface RegistryValidationQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  validation_type?: string;
  status?: RegistryValidation;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistrySync {
  id: string;
  source_registry: RegistryType;
  target_registry: RegistryType;
  sync_type: string;
  last_sync_date: string;
  next_sync_date: string | null;
  records_synced: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistrySyncCreate {
  source_registry: RegistryType;
  target_registry: RegistryType;
  sync_type: string;
  last_sync_date: string;
  next_sync_date: string | null;
  records_synced: number;
  status: string;
}

export interface RegistrySyncUpdate {
  source_registry?: RegistryType;
  target_registry?: RegistryType;
  sync_type?: string;
  last_sync_date?: string;
  next_sync_date?: string | null;
  records_synced?: number;
  status?: string;
}

export interface RegistrySyncQuery {
  source_registry?: RegistryType;
  target_registry?: RegistryType;
  sync_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryBackupData {
  id: string;
  registry_type: RegistryType;
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

export interface RegistryBackupCreate {
  registry_type: RegistryType;
  backup_name: string;
  backup_type: string;
  backup_size: number;
  backup_location: string;
  backup_date: string;
  retention_days: number;
  status: string;
}

export interface RegistryBackupUpdate {
  backup_name?: string;
  backup_type?: string;
  backup_size?: number;
  backup_location?: string;
  backup_date?: string;
  retention_days?: number;
  status?: string;
}

export interface RegistryBackupQuery {
  registry_type?: RegistryType;
  search?: string;
  backup_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryMigrationData {
  id: string;
  source_registry: RegistryType;
  target_registry: RegistryType;
  migration_type: string;
  records_migrated: number;
  start_date: string;
  end_date: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryMigrationCreate {
  source_registry: RegistryType;
  target_registry: RegistryType;
  migration_type: string;
  records_migrated: number;
  start_date: string;
  end_date: string | null;
  status: string;
}

export interface RegistryMigrationUpdate {
  source_registry?: RegistryType;
  target_registry?: RegistryType;
  migration_type?: string;
  records_migrated?: number;
  start_date?: string;
  end_date?: string | null;
  status?: string;
}

export interface RegistryMigrationQuery {
  source_registry?: RegistryType;
  target_registry?: RegistryType;
  migration_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryImportData {
  id: string;
  registry_type: RegistryType;
  import_name: string;
  file_url: string;
  file_type: string;
  records_imported: number;
  records_failed: number;
  import_date: string;
  imported_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryImportCreate {
  registry_type: RegistryType;
  import_name: string;
  file_url: string;
  file_type: string;
  records_imported: number;
  records_failed: number;
  import_date: string;
  imported_by: string;
  status: string;
}

export interface RegistryImportUpdate {
  import_name?: string;
  file_url?: string;
  file_type?: string;
  records_imported?: number;
  records_failed?: number;
  import_date?: string;
  imported_by?: string;
  status?: string;
}

export interface RegistryImportQuery {
  registry_type?: RegistryType;
  search?: string;
  file_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryExportData {
  id: string;
  registry_type: RegistryType;
  export_name: string;
  export_type: string;
  file_url: string;
  records_exported: number;
  export_date: string;
  exported_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryExportCreate {
  registry_type: RegistryType;
  export_name: string;
  export_type: string;
  file_url: string;
  records_exported: number;
  export_date: string;
  exported_by: string;
  status: string;
}

export interface RegistryExportUpdate {
  export_name?: string;
  export_type?: string;
  file_url?: string;
  records_exported?: number;
  export_date?: string;
  exported_by?: string;
  status?: string;
}

export interface RegistryExportQuery {
  registry_type?: RegistryType;
  search?: string;
  export_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryQualityData {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  quality_score: number;
  quality_issues: string;
  assessment_date: string;
  assessed_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryQualityCreate {
  registry_type: RegistryType;
  entity_id: string;
  quality_score: number;
  quality_issues: string;
  assessment_date: string;
  assessed_by: string;
  status: string;
}

export interface RegistryQualityUpdate {
  entity_id?: string;
  quality_score?: number;
  quality_issues?: string;
  assessment_date?: string;
  assessed_by?: string;
  status?: string;
}

export interface RegistryQualityQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  quality_score?: number;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryComplianceData {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  compliance_type: string;
  compliance_score: number;
  compliance_issues: string;
  assessment_date: string;
  assessed_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryComplianceCreate {
  registry_type: RegistryType;
  entity_id: string;
  compliance_type: string;
  compliance_score: number;
  compliance_issues: string;
  assessment_date: string;
  assessed_by: string;
  status: string;
}

export interface RegistryComplianceUpdate {
  entity_id?: string;
  compliance_type?: string;
  compliance_score?: number;
  compliance_issues?: string;
  assessment_date?: string;
  assessed_by?: string;
  status?: string;
}

export interface RegistryComplianceQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  compliance_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryAlertData {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
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

export interface RegistryAlertCreate {
  registry_type: RegistryType;
  entity_id: string;
  alert_type: string;
  alert_message: string;
  alert_level: string;
  alert_date: string;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_date: string | null;
}

export interface RegistryAlertUpdate {
  entity_id?: string;
  alert_type?: string;
  alert_message?: string;
  alert_level?: string;
  alert_date?: string;
  acknowledged?: boolean;
  acknowledged_by?: string | null;
  acknowledged_date?: string | null;
}

export interface RegistryAlertQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  alert_type?: string;
  alert_level?: string;
  acknowledged?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryTimeline {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  event_name: string;
  event_description: string;
  event_date: string;
  event_type: string;
  performed_by: string;
  created_at: string;
}

export interface RegistryTimelineCreate {
  registry_type: RegistryType;
  entity_id: string;
  event_name: string;
  event_description: string;
  event_date: string;
  event_type: string;
  performed_by: string;
}

export interface RegistryTimelineUpdate {
  event_name?: string;
  event_description?: string;
  event_date?: string;
  event_type?: string;
  performed_by?: string;
}

export interface RegistryTimelineQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  event_type?: string;
  performed_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistrySearchData {
  id: string;
  registry_type: RegistryType;
  search_query: string;
  search_results: number;
  search_date: string;
  searched_by: string;
  created_at: string;
}

export interface RegistrySearchCreate {
  registry_type: RegistryType;
  search_query: string;
  search_results: number;
  search_date: string;
  searched_by: string;
}

export interface RegistrySearchUpdate {
  search_query?: string;
  search_results?: number;
  search_date?: string;
  searched_by?: string;
}

export interface RegistrySearchQuery {
  registry_type?: RegistryType;
  search_query?: string;
  searched_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryAccessLog {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  user_id: string;
  user_name: string;
  access_type: string;
  access_date: string;
  ip_address: string;
  created_at: string;
}

export interface RegistryAccessLogCreate {
  registry_type: RegistryType;
  entity_id: string;
  user_id: string;
  user_name: string;
  access_type: string;
  access_date: string;
  ip_address: string;
}

export interface RegistryAccessLogUpdate {
  entity_id?: string;
  user_id?: string;
  user_name?: string;
  access_type?: string;
  access_date?: string;
  ip_address?: string;
}

export interface RegistryAccessLogQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  user_id?: string;
  access_type?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryPerformance {
  id: string;
  registry_type: RegistryType;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  measurement_date: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryPerformanceCreate {
  registry_type: RegistryType;
  metric_name: string;
  metric_value: number;
  metric_unit: string;
  measurement_date: string;
}

export interface RegistryPerformanceUpdate {
  metric_name?: string;
  metric_value?: number;
  metric_unit?: string;
  measurement_date?: string;
}

export interface RegistryPerformanceQuery {
  registry_type?: RegistryType;
  metric_name?: string;
  measurement_date?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryError {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  error_type: string;
  error_message: string;
  error_date: string;
  resolved: boolean;
  resolved_by: string | null;
  resolved_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegistryErrorCreate {
  registry_type: RegistryType;
  entity_id: string;
  error_type: string;
  error_message: string;
  error_date: string;
  resolved: boolean;
  resolved_by: string | null;
  resolved_date: string | null;
}

export interface RegistryErrorUpdate {
  entity_id?: string;
  error_type?: string;
  error_message?: string;
  error_date?: string;
  resolved?: boolean;
  resolved_by?: string | null;
  resolved_date?: string | null;
}

export interface RegistryErrorQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  error_type?: string;
  resolved?: boolean;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryChangeLog {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  field_name: string;
  old_value: string;
  new_value: string;
  change_date: string;
  changed_by: string;
  created_at: string;
}

export interface RegistryChangeLogCreate {
  registry_type: RegistryType;
  entity_id: string;
  field_name: string;
  old_value: string;
  new_value: string;
  change_date: string;
  changed_by: string;
}

export interface RegistryChangeLogUpdate {
  entity_id?: string;
  field_name?: string;
  old_value?: string;
  new_value?: string;
  change_date?: string;
  changed_by?: string;
}

export interface RegistryChangeLogQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  field_name?: string;
  changed_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryVersion {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  version_number: number;
  version_data: string;
  created_by: string;
  created_at: string;
}

export interface RegistryVersionCreate {
  registry_type: RegistryType;
  entity_id: string;
  version_number: number;
  version_data: string;
  created_by: string;
}

export interface RegistryVersionUpdate {
  entity_id?: string;
  version_number?: number;
  version_data?: string;
  created_by?: string;
}

export interface RegistryVersionQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  version_number?: number;
  created_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryDependency {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  dependency_type: string;
  dependency_entity_id: string;
  dependency_registry: RegistryType;
  relationship: string;
  created_at: string;
}

export interface RegistryDependencyCreate {
  registry_type: RegistryType;
  entity_id: string;
  dependency_type: string;
  dependency_entity_id: string;
  dependency_registry: RegistryType;
  relationship: string;
}

export interface RegistryDependencyUpdate {
  entity_id?: string;
  dependency_type?: string;
  dependency_entity_id?: string;
  dependency_registry?: RegistryType;
  relationship?: string;
}

export interface RegistryDependencyQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  dependency_type?: string;
  dependency_registry?: RegistryType;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryRelationship {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  relationship_type: string;
  related_entity_id: string;
  related_registry: RegistryType;
  relationship_strength: number;
  created_at: string;
}

export interface RegistryRelationshipCreate {
  registry_type: RegistryType;
  entity_id: string;
  relationship_type: string;
  related_entity_id: string;
  related_registry: RegistryType;
  relationship_strength: number;
}

export interface RegistryRelationshipUpdate {
  entity_id?: string;
  relationship_type?: string;
  related_entity_id?: string;
  related_registry?: RegistryType;
  relationship_strength?: number;
}

export interface RegistryRelationshipQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  relationship_type?: string;
  related_registry?: RegistryType;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryTag {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  tag_name: string;
  tag_value: string;
  created_by: string;
  created_at: string;
}

export interface RegistryTagCreate {
  registry_type: RegistryType;
  entity_id: string;
  tag_name: string;
  tag_value: string;
  created_by: string;
}

export interface RegistryTagUpdate {
  entity_id?: string;
  tag_name?: string;
  tag_value?: string;
  created_by?: string;
}

export interface RegistryTagQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  tag_name?: string;
  tag_value?: string;
  created_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryComment {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  comment_text: string;
  comment_by: string;
  comment_date: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryCommentCreate {
  registry_type: RegistryType;
  entity_id: string;
  comment_text: string;
  comment_by: string;
  comment_date: string;
}

export interface RegistryCommentUpdate {
  comment_text?: string;
  comment_by?: string;
  comment_date?: string;
}

export interface RegistryCommentQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  comment_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryAttachment {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
}

export interface RegistryAttachmentCreate {
  registry_type: RegistryType;
  entity_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
}

export interface RegistryAttachmentUpdate {
  file_name?: string;
  file_url?: string;
  file_type?: string;
  file_size?: number;
  uploaded_by?: string;
}

export interface RegistryAttachmentQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  file_type?: string;
  uploaded_by?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryWorkflow {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  workflow_name: string;
  workflow_step: string;
  assigned_to: string;
  due_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryWorkflowCreate {
  registry_type: RegistryType;
  entity_id: string;
  workflow_name: string;
  workflow_step: string;
  assigned_to: string;
  due_date: string;
  status: string;
}

export interface RegistryWorkflowUpdate {
  entity_id?: string;
  workflow_name?: string;
  workflow_step?: string;
  assigned_to?: string;
  due_date?: string;
  status?: string;
}

export interface RegistryWorkflowQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  workflow_name?: string;
  assigned_to?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryApproval {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  approval_type: string;
  approver_id: string;
  approver_name: string;
  approval_date: string;
  approval_status: string;
  comments: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryApprovalCreate {
  registry_type: RegistryType;
  entity_id: string;
  approval_type: string;
  approver_id: string;
  approver_name: string;
  approval_date: string;
  approval_status: string;
  comments: string;
}

export interface RegistryApprovalUpdate {
  entity_id?: string;
  approval_type?: string;
  approver_id?: string;
  approver_name?: string;
  approval_date?: string;
  approval_status?: string;
  comments?: string;
}

export interface RegistryApprovalQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  approval_type?: string;
  approver_id?: string;
  approval_status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryReview {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  review_type: string;
  reviewer_id: string;
  reviewer_name: string;
  review_date: string;
  review_score: number;
  review_comments: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryReviewCreate {
  registry_type: RegistryType;
  entity_id: string;
  review_type: string;
  reviewer_id: string;
  reviewer_name: string;
  review_date: string;
  review_score: number;
  review_comments: string;
  status: string;
}

export interface RegistryReviewUpdate {
  entity_id?: string;
  review_type?: string;
  reviewer_id?: string;
  reviewer_name?: string;
  review_date?: string;
  review_score?: number;
  review_comments?: string;
  status?: string;
}

export interface RegistryReviewQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  review_type?: string;
  reviewer_id?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryFeedback {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  feedback_type: string;
  feedback_text: string;
  feedback_by: string;
  feedback_date: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface RegistryFeedbackCreate {
  registry_type: RegistryType;
  entity_id: string;
  feedback_type: string;
  feedback_text: string;
  feedback_by: string;
  feedback_date: string;
  rating: number;
}

export interface RegistryFeedbackUpdate {
  entity_id?: string;
  feedback_type?: string;
  feedback_text?: string;
  feedback_by?: string;
  feedback_date?: string;
  rating?: number;
}

export interface RegistryFeedbackQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  feedback_type?: string;
  feedback_by?: string;
  rating?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistrySupport {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  support_type: string;
  support_description: string;
  support_by: string;
  support_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistrySupportCreate {
  registry_type: RegistryType;
  entity_id: string;
  support_type: string;
  support_description: string;
  support_by: string;
  support_date: string;
  status: string;
}

export interface RegistrySupportUpdate {
  entity_id?: string;
  support_type?: string;
  support_description?: string;
  support_by?: string;
  support_date?: string;
  status?: string;
}

export interface RegistrySupportQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  support_type?: string;
  support_by?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryIncident {
  id: string;
  registry_type: RegistryType;
  entity_id: string;
  incident_type: string;
  incident_description: string;
  incident_date: string;
  reported_by: string;
  severity: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryIncidentCreate {
  registry_type: RegistryType;
  entity_id: string;
  incident_type: string;
  incident_description: string;
  incident_date: string;
  reported_by: string;
  severity: string;
  status: string;
}

export interface RegistryIncidentUpdate {
  entity_id?: string;
  incident_type?: string;
  incident_description?: string;
  incident_date?: string;
  reported_by?: string;
  severity?: string;
  status?: string;
}

export interface RegistryIncidentQuery {
  registry_type?: RegistryType;
  entity_id?: string;
  incident_type?: string;
  reported_by?: string;
  severity?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegistryMaintenance {
  id: string;
  registry_type: RegistryType;
  maintenance_type: string;
  maintenance_description: string;
  scheduled_date: string;
  completed_date: string | null;
  performed_by: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegistryMaintenanceCreate {
  registry_type: RegistryType;
  maintenance_type: string;
  maintenance_description: string;
  scheduled_date: string;
  completed_date: string | null;
  performed_by: string;
  status: string;
}

export interface RegistryMaintenanceUpdate {
  maintenance_type?: string;
  maintenance_description?: string;
  scheduled_date?: string;
  completed_date?: string | null;
  performed_by?: string;
  status?: string;
}

export interface RegistryMaintenanceQuery {
  registry_type?: RegistryType;
  maintenance_type?: string;
  performed_by?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}
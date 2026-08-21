// Government & National Governance Enterprise Types - Core
// Phase 2.9 - EduCI Platform

// =============================================================================
// MODULE 1 - MINISTRY MANAGEMENT
// =============================================================================

// =============================================================================
// ENUMS
// =============================================================================

export const MinistryStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISSOLVED: 'dissolved',
  PENDING: 'pending',
} as const;
export type MinistryStatus = (typeof MinistryStatus)[keyof typeof MinistryStatus];

export const DepartmentStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  RESTRUCTURED: 'restructured',
  DISSOLVED: 'dissolved',
} as const;
export type DepartmentStatus = (typeof DepartmentStatus)[keyof typeof DepartmentStatus];

export const DirectorateStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISSOLVED: 'dissolved',
  PENDING: 'pending',
} as const;
export type DirectorateStatus = (typeof DirectorateStatus)[keyof typeof DirectorateStatus];

export const PolicyStatus = {
  DRAFT: 'draft',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  ACTIVE: 'active',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
} as const;
export type PolicyStatus = (typeof PolicyStatus)[keyof typeof PolicyStatus];

export const PolicyCategory = {
  CURRICULUM: 'curriculum',
  ASSESSMENT: 'assessment',
  INFRASTRUCTURE: 'infrastructure',
  TEACHER_TRAINING: 'teacher_training',
  FINANCE: 'finance',
  EQUITY: 'equity',
  TECHNOLOGY: 'technology',
  SAFETY: 'safety',
} as const;
export type PolicyCategory = (typeof PolicyCategory)[keyof typeof PolicyCategory];

export const ProgramStatus = {
  PLANNING: 'planning',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
export type ProgramStatus = (typeof ProgramStatus)[keyof typeof ProgramStatus];

export const StrategyStatus = {
  DRAFT: 'draft',
  APPROVED: 'approved',
  ACTIVE: 'active',
  REVIEW: 'review',
  COMPLETED: 'completed',
} as const;
export type StrategyStatus = (typeof StrategyStatus)[keyof typeof StrategyStatus];

export const CircularStatus = {
  DRAFT: 'draft',
  ISSUED: 'issued',
  ACTIVE: 'active',
  SUPERSEDED: 'superseded',
  REVOKED: 'revoked',
} as const;
export type CircularStatus = (typeof CircularStatus)[keyof typeof CircularStatus];

export const CircularPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
  CRITICAL: 'critical',
} as const;
export type CircularPriority = (typeof CircularPriority)[keyof typeof CircularPriority];

export const DocumentType = {
  POLICY: 'policy',
  REGULATION: 'regulation',
  GUIDELINE: 'guideline',
  MEMORANDUM: 'memorandum',
  ORDER: 'order',
  RESOLUTION: 'resolution',
  REPORT: 'report',
  MANUAL: 'manual',
} as const;
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const DocumentClassification = {
  PUBLIC: 'public',
  INTERNAL: 'internal',
  CONFIDENTIAL: 'confidential',
  SECRET: 'secret',
  TOP_SECRET: 'top_secret',
} as const;
export type DocumentClassification = (typeof DocumentClassification)[keyof typeof DocumentClassification];

export const CalendarStatus = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
} as const;
export type CalendarStatus = (typeof CalendarStatus)[keyof typeof CalendarStatus];

export const StatisticCategory = {
  ENROLLMENT: 'enrollment',
  GRADUATION: 'graduation',
  LITERACY: 'literacy',
  INFRASTRUCTURE: 'infrastructure',
  FINANCE: 'finance',
  TEACHER: 'teacher',
  PERFORMANCE: 'performance',
} as const;
export type StatisticCategory = (typeof StatisticCategory)[keyof typeof StatisticCategory];

export const UserRole = {
  ADMIN: 'admin',
  ANALYST: 'analyst',
  MANAGER: 'manager',
  VIEWER: 'viewer',
  AUDITOR: 'auditor',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// =============================================================================
// ENTITIES
// =============================================================================

export interface Ministry {
  id: string;
  name: string;
  country: string;
  code: string;
  minister_name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  status: MinistryStatus;
  created_at: string;
  updated_at: string;
}

export interface MinistryCreate {
  name: string;
  country: string;
  code: string;
  minister_name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  status: MinistryStatus;
}

export interface MinistryUpdate {
  name?: string;
  country?: string;
  code?: string;
  minister_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo_url?: string;
  status?: MinistryStatus;
}

export interface MinistryQuery {
  search?: string;
  country?: string;
  status?: MinistryStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryDepartment {
  id: string;
  ministry_id: string;
  name: string;
  code: string;
  description: string;
  head_name: string;
  phone: string;
  email: string;
  budget: number;
  status: DepartmentStatus;
  created_at: string;
  updated_at: string;
}

export interface MinistryDepartmentCreate {
  ministry_id: string;
  name: string;
  code: string;
  description: string;
  head_name: string;
  phone: string;
  email: string;
  budget: number;
  status: DepartmentStatus;
}

export interface MinistryDepartmentUpdate {
  ministry_id?: string;
  name?: string;
  code?: string;
  description?: string;
  head_name?: string;
  phone?: string;
  email?: string;
  budget?: number;
  status?: DepartmentStatus;
}

export interface MinistryDepartmentQuery {
  ministry_id?: string;
  search?: string;
  status?: DepartmentStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Directorate {
  id: string;
  department_id: string;
  name: string;
  code: string;
  director_name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  status: DirectorateStatus;
  created_at: string;
  updated_at: string;
}

export interface DirectorateCreate {
  department_id: string;
  name: string;
  code: string;
  director_name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  status: DirectorateStatus;
}

export interface DirectorateUpdate {
  department_id?: string;
  name?: string;
  code?: string;
  director_name?: string;
  region?: string;
  address?: string;
  phone?: string;
  email?: string;
  status?: DirectorateStatus;
}

export interface DirectorateQuery {
  department_id?: string;
  search?: string;
  region?: string;
  status?: DirectorateStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface EducationPolicy {
  id: string;
  ministry_id: string;
  title: string;
  code: string;
  description: string;
  category: PolicyCategory;
  effective_date: string;
  expiry_date: string;
  status: PolicyStatus;
  version: string;
  created_by: string;
  approved_by: string;
  approved_at: string;
  created_at: string;
  updated_at: string;
}

export interface EducationPolicyCreate {
  ministry_id: string;
  title: string;
  code: string;
  description: string;
  category: PolicyCategory;
  effective_date: string;
  expiry_date: string;
  status: PolicyStatus;
  version: string;
  created_by: string;
  approved_by: string;
  approved_at: string;
}

export interface EducationPolicyUpdate {
  ministry_id?: string;
  title?: string;
  code?: string;
  description?: string;
  category?: PolicyCategory;
  effective_date?: string;
  expiry_date?: string;
  status?: PolicyStatus;
  version?: string;
  created_by?: string;
  approved_by?: string;
  approved_at?: string;
}

export interface EducationPolicyQuery {
  ministry_id?: string;
  search?: string;
  category?: PolicyCategory;
  status?: PolicyStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalProgram {
  id: string;
  ministry_id: string;
  title: string;
  code: string;
  description: string;
  target_audience: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: ProgramStatus;
  created_at: string;
  updated_at: string;
}

export interface NationalProgramCreate {
  ministry_id: string;
  title: string;
  code: string;
  description: string;
  target_audience: string;
  budget: number;
  start_date: string;
  end_date: string;
  status: ProgramStatus;
}

export interface NationalProgramUpdate {
  ministry_id?: string;
  title?: string;
  code?: string;
  description?: string;
  target_audience?: string;
  budget?: number;
  start_date?: string;
  end_date?: string;
  status?: ProgramStatus;
}

export interface NationalProgramQuery {
  ministry_id?: string;
  search?: string;
  status?: ProgramStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface EducationStrategy {
  id: string;
  ministry_id: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
  objectives: string;
  budget: number;
  start_year: number;
  end_year: number;
  status: StrategyStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationStrategyCreate {
  ministry_id: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
  objectives: string;
  budget: number;
  start_year: number;
  end_year: number;
  status: StrategyStatus;
}

export interface EducationStrategyUpdate {
  ministry_id?: string;
  title?: string;
  description?: string;
  vision?: string;
  mission?: string;
  objectives?: string;
  budget?: number;
  start_year?: number;
  end_year?: number;
  status?: StrategyStatus;
}

export interface EducationStrategyQuery {
  ministry_id?: string;
  search?: string;
  status?: StrategyStatus;
  start_year?: number;
  end_year?: number;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Circular {
  id: string;
  ministry_id: string;
  title: string;
  number: string;
  subject: string;
  content: string;
  issued_by: string;
  issued_date: string;
  effective_date: string;
  status: CircularStatus;
  category: string;
  priority: CircularPriority;
  created_at: string;
  updated_at: string;
}

export interface CircularCreate {
  ministry_id: string;
  title: string;
  number: string;
  subject: string;
  content: string;
  issued_by: string;
  issued_date: string;
  effective_date: string;
  status: CircularStatus;
  category: string;
  priority: CircularPriority;
}

export interface CircularUpdate {
  ministry_id?: string;
  title?: string;
  number?: string;
  subject?: string;
  content?: string;
  issued_by?: string;
  issued_date?: string;
  effective_date?: string;
  status?: CircularStatus;
  category?: string;
  priority?: CircularPriority;
}

export interface CircularQuery {
  ministry_id?: string;
  search?: string;
  status?: CircularStatus;
  priority?: CircularPriority;
  category?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface OfficialDocument {
  id: string;
  ministry_id: string;
  title: string;
  reference: string;
  type: DocumentType;
  content: string;
  author: string;
  published_date: string;
  classification: DocumentClassification;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OfficialDocumentCreate {
  ministry_id: string;
  title: string;
  reference: string;
  type: DocumentType;
  content: string;
  author: string;
  published_date: string;
  classification: DocumentClassification;
  status: string;
}

export interface OfficialDocumentUpdate {
  ministry_id?: string;
  title?: string;
  reference?: string;
  type?: DocumentType;
  content?: string;
  author?: string;
  published_date?: string;
  classification?: DocumentClassification;
  status?: string;
}

export interface OfficialDocumentQuery {
  ministry_id?: string;
  search?: string;
  type?: DocumentType;
  classification?: DocumentClassification;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface EducationCalendar {
  id: string;
  ministry_id: string;
  academic_year: string;
  term_name: string;
  start_date: string;
  end_date: string;
  holidays: string;
  exam_periods: string;
  status: CalendarStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationCalendarCreate {
  ministry_id: string;
  academic_year: string;
  term_name: string;
  start_date: string;
  end_date: string;
  holidays: string;
  exam_periods: string;
  status: CalendarStatus;
}

export interface EducationCalendarUpdate {
  ministry_id?: string;
  academic_year?: string;
  term_name?: string;
  start_date?: string;
  end_date?: string;
  holidays?: string;
  exam_periods?: string;
  status?: CalendarStatus;
}

export interface EducationCalendarQuery {
  ministry_id?: string;
  academic_year?: string;
  search?: string;
  status?: CalendarStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NationalStatistic {
  id: string;
  ministry_id: string;
  year: number;
  category: StatisticCategory;
  metric_name: string;
  value: number;
  unit: string;
  source: string;
  region_id: string;
  district_id: string;
  created_at: string;
  updated_at: string;
}

export interface NationalStatisticCreate {
  ministry_id: string;
  year: number;
  category: StatisticCategory;
  metric_name: string;
  value: number;
  unit: string;
  source: string;
  region_id: string;
  district_id: string;
}

export interface NationalStatisticUpdate {
  ministry_id?: string;
  year?: number;
  category?: StatisticCategory;
  metric_name?: string;
  value?: number;
  unit?: string;
  source?: string;
  region_id?: string;
  district_id?: string;
}

export interface NationalStatisticQuery {
  ministry_id?: string;
  year?: number;
  category?: StatisticCategory;
  search?: string;
  region_id?: string;
  district_id?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryUser {
  id: string;
  ministry_id: string;
  user_id: string;
  role: UserRole;
  permissions: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryUserCreate {
  ministry_id: string;
  user_id: string;
  role: UserRole;
  permissions: string;
  status: string;
}

export interface MinistryUserUpdate {
  ministry_id?: string;
  user_id?: string;
  role?: UserRole;
  permissions?: string;
  status?: string;
}

export interface MinistryUserQuery {
  ministry_id?: string;
  search?: string;
  role?: UserRole;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface MinistryNotification {
  id: string;
  ministry_id: string;
  title: string;
  message: string;
  type: string;
  priority: CircularPriority;
  target_roles: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MinistryNotificationCreate {
  ministry_id: string;
  title: string;
  message: string;
  type: string;
  priority: CircularPriority;
  target_roles: string;
  status: string;
}

export interface MinistryNotificationUpdate {
  ministry_id?: string;
  title?: string;
  message?: string;
  type?: string;
  priority?: CircularPriority;
  target_roles?: string;
  status?: string;
}

export interface MinistryNotificationQuery {
  ministry_id?: string;
  search?: string;
  type?: string;
  priority?: CircularPriority;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// =============================================================================
// MODULE 2 - REGIONAL EDUCATION
// =============================================================================

// =============================================================================
// ENUMS
// =============================================================================

export const RegionStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  REORGANIZED: 'reorganized',
  DISSOLVED: 'dissolved',
} as const;
export type RegionStatus = (typeof RegionStatus)[keyof typeof RegionStatus];

export const DistrictStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MERGED: 'merged',
  DISSOLVED: 'dissolved',
} as const;
export type DistrictStatus = (typeof DistrictStatus)[keyof typeof DistrictStatus];

export const AcademyType = {
  UNIVERSITY: 'university',
  POLYTECHNIC: 'polytechnic',
  VOCATIONAL: 'vocational',
  TEACHER_TRAINING: 'teacher_training',
  RESEARCH: 'research',
} as const;
export type AcademyType = (typeof AcademyType)[keyof typeof AcademyType];

export const AcademyStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  ACCREDITATION_PENDING: 'accreditation_pending',
} as const;
export type AcademyStatus = (typeof AcademyStatus)[keyof typeof AcademyStatus];

export const InspectorStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ON_LEAVE: 'on_leave',
  RETIRED: 'retired',
} as const;
export type InspectorStatus = (typeof InspectorStatus)[keyof typeof InspectorStatus];

export const VisitStatus = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  RESCHEDULED: 'rescheduled',
} as const;
export type VisitStatus = (typeof VisitStatus)[keyof typeof VisitStatus];

export const InspectionVisitPurpose = {
  ROUTINE: 'routine',
  SPECIAL: 'special',
  FOLLOW_UP: 'follow_up',
  COMPLAINT: 'complaint',
  AUDIT: 'audit',
  TRAINING: 'training',
} as const;
export type InspectionVisitPurpose = (typeof InspectionVisitPurpose)[keyof typeof InspectionVisitPurpose];

export const ReportType = {
  ANNUAL: 'annual',
  QUARTERLY: 'quarterly',
  MONTHLY: 'monthly',
  SPECIAL: 'special',
  AD_HOC: 'ad_hoc',
} as const;
export type ReportType = (typeof ReportType)[keyof typeof ReportType];

export const ReportStatus = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  REVIEWED: 'reviewed',
  APPROVED: 'approved',
  PUBLISHED: 'published',
} as const;
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];

export const KpiCategory = {
  ACADEMIC: 'academic',
  FINANCIAL: 'financial',
  INFRASTRUCTURE: 'infrastructure',
  HUMAN_RESOURCE: 'human_resource',
  STUDENT: 'student',
  COMMUNITY: 'community',
} as const;
export type KpiCategory = (typeof KpiCategory)[keyof typeof KpiCategory];

export const KpiTrend = {
  IMPROVING: 'improving',
  STABLE: 'stable',
  DECLINING: 'declining',
  VOLATILE: 'volatile',
} as const;
export type KpiTrend = (typeof KpiTrend)[keyof typeof KpiTrend];

// =============================================================================
// ENTITIES
// =============================================================================

export interface EducationRegion {
  id: string;
  ministry_id: string;
  name: string;
  code: string;
  capital: string;
  area_km2: number;
  population: number;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  governor_name: string;
  status: RegionStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationRegionCreate {
  ministry_id: string;
  name: string;
  code: string;
  capital: string;
  area_km2: number;
  population: number;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  governor_name: string;
  status: RegionStatus;
}

export interface EducationRegionUpdate {
  ministry_id?: string;
  name?: string;
  code?: string;
  capital?: string;
  area_km2?: number;
  population?: number;
  total_schools?: number;
  total_students?: number;
  total_teachers?: number;
  governor_name?: string;
  status?: RegionStatus;
}

export interface EducationRegionQuery {
  ministry_id?: string;
  search?: string;
  status?: RegionStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface EducationDistrict {
  id: string;
  region_id: string;
  name: string;
  code: string;
  capital: string;
  area_km2: number;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  inspector_name: string;
  status: DistrictStatus;
  created_at: string;
  updated_at: string;
}

export interface EducationDistrictCreate {
  region_id: string;
  name: string;
  code: string;
  capital: string;
  area_km2: number;
  total_schools: number;
  total_students: number;
  total_teachers: number;
  inspector_name: string;
  status: DistrictStatus;
}

export interface EducationDistrictUpdate {
  region_id?: string;
  name?: string;
  code?: string;
  capital?: string;
  area_km2?: number;
  total_schools?: number;
  total_students?: number;
  total_teachers?: number;
  inspector_name?: string;
  status?: DistrictStatus;
}

export interface EducationDistrictQuery {
  region_id?: string;
  search?: string;
  status?: DistrictStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Academy {
  id: string;
  region_id: string;
  district_id: string;
  name: string;
  code: string;
  type: AcademyType;
  address: string;
  phone: string;
  email: string;
  website: string;
  rector_name: string;
  total_students: number;
  total_teachers: number;
  accreditation_status: string;
  status: AcademyStatus;
  created_at: string;
  updated_at: string;
}

export interface AcademyCreate {
  region_id: string;
  district_id: string;
  name: string;
  code: string;
  type: AcademyType;
  address: string;
  phone: string;
  email: string;
  website: string;
  rector_name: string;
  total_students: number;
  total_teachers: number;
  accreditation_status: string;
  status: AcademyStatus;
}

export interface AcademyUpdate {
  region_id?: string;
  district_id?: string;
  name?: string;
  code?: string;
  type?: AcademyType;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  rector_name?: string;
  total_students?: number;
  total_teachers?: number;
  accreditation_status?: string;
  status?: AcademyStatus;
}

export interface AcademyQuery {
  region_id?: string;
  district_id?: string;
  search?: string;
  type?: AcademyType;
  status?: AcademyStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegionalDirectorate {
  id: string;
  region_id: string;
  name: string;
  code: string;
  director_name: string;
  address: string;
  phone: string;
  email: string;
  budget: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegionalDirectorateCreate {
  region_id: string;
  name: string;
  code: string;
  director_name: string;
  address: string;
  phone: string;
  email: string;
  budget: number;
  status: string;
}

export interface RegionalDirectorateUpdate {
  region_id?: string;
  name?: string;
  code?: string;
  director_name?: string;
  address?: string;
  phone?: string;
  email?: string;
  budget?: number;
  status?: string;
}

export interface RegionalDirectorateQuery {
  region_id?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface Inspector {
  id: string;
  district_id: string;
  name: string;
  code: string;
  specialization: string;
  qualification: string;
  experience_years: number;
  phone: string;
  email: string;
  status: InspectorStatus;
  assigned_schools: string;
  created_at: string;
  updated_at: string;
}

export interface InspectorCreate {
  district_id: string;
  name: string;
  code: string;
  specialization: string;
  qualification: string;
  experience_years: number;
  phone: string;
  email: string;
  status: InspectorStatus;
  assigned_schools: string;
}

export interface InspectorUpdate {
  district_id?: string;
  name?: string;
  code?: string;
  specialization?: string;
  qualification?: string;
  experience_years?: number;
  phone?: string;
  email?: string;
  status?: InspectorStatus;
  assigned_schools?: string;
}

export interface InspectorQuery {
  district_id?: string;
  search?: string;
  specialization?: string;
  status?: InspectorStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface InspectionVisit {
  id: string;
  inspector_id: string;
  school_id: string;
  scheduled_date: string;
  actual_date: string;
  purpose: InspectionVisitPurpose;
  status: VisitStatus;
  score: number;
  summary: string;
  created_at: string;
  updated_at: string;
}

export interface InspectionVisitCreate {
  inspector_id: string;
  school_id: string;
  scheduled_date: string;
  actual_date: string;
  purpose: InspectionVisitPurpose;
  status: VisitStatus;
  score: number;
  summary: string;
}

export interface InspectionVisitUpdate {
  inspector_id?: string;
  school_id?: string;
  scheduled_date?: string;
  actual_date?: string;
  purpose?: InspectionVisitPurpose;
  status?: VisitStatus;
  score?: number;
  summary?: string;
}

export interface InspectionVisitQuery {
  inspector_id?: string;
  school_id?: string;
  search?: string;
  purpose?: InspectionVisitPurpose;
  status?: VisitStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegionalReport {
  id: string;
  region_id: string;
  title: string;
  type: ReportType;
  period_start: string;
  period_end: string;
  content: string;
  metrics: string;
  submitted_by: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

export interface RegionalReportCreate {
  region_id: string;
  title: string;
  type: ReportType;
  period_start: string;
  period_end: string;
  content: string;
  metrics: string;
  submitted_by: string;
  status: ReportStatus;
}

export interface RegionalReportUpdate {
  region_id?: string;
  title?: string;
  type?: ReportType;
  period_start?: string;
  period_end?: string;
  content?: string;
  metrics?: string;
  submitted_by?: string;
  status?: ReportStatus;
}

export interface RegionalReportQuery {
  region_id?: string;
  search?: string;
  type?: ReportType;
  status?: ReportStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegionalKpi {
  id: string;
  region_id: string;
  name: string;
  code: string;
  category: KpiCategory;
  value: number;
  target: number;
  unit: string;
  period: string;
  trend: KpiTrend;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegionalKpiCreate {
  region_id: string;
  name: string;
  code: string;
  category: KpiCategory;
  value: number;
  target: number;
  unit: string;
  period: string;
  trend: KpiTrend;
  status: string;
}

export interface RegionalKpiUpdate {
  region_id?: string;
  name?: string;
  code?: string;
  category?: KpiCategory;
  value?: number;
  target?: number;
  unit?: string;
  period?: string;
  trend?: KpiTrend;
  status?: string;
}

export interface RegionalKpiQuery {
  region_id?: string;
  search?: string;
  category?: KpiCategory;
  trend?: KpiTrend;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface DistrictReport {
  id: string;
  district_id: string;
  title: string;
  type: ReportType;
  period_start: string;
  period_end: string;
  content: string;
  metrics: string;
  submitted_by: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

export interface DistrictReportCreate {
  district_id: string;
  title: string;
  type: ReportType;
  period_start: string;
  period_end: string;
  content: string;
  metrics: string;
  submitted_by: string;
  status: ReportStatus;
}

export interface DistrictReportUpdate {
  district_id?: string;
  title?: string;
  type?: ReportType;
  period_start?: string;
  period_end?: string;
  content?: string;
  metrics?: string;
  submitted_by?: string;
  status?: ReportStatus;
}

export interface DistrictReportQuery {
  district_id?: string;
  search?: string;
  type?: ReportType;
  status?: ReportStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface RegionUser {
  id: string;
  region_id: string;
  user_id: string;
  role: UserRole;
  permissions: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RegionUserCreate {
  region_id: string;
  user_id: string;
  role: UserRole;
  permissions: string;
  status: string;
}

export interface RegionUserUpdate {
  region_id?: string;
  user_id?: string;
  role?: UserRole;
  permissions?: string;
  status?: string;
}

export interface RegionUserQuery {
  region_id?: string;
  search?: string;
  role?: UserRole;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// =============================================================================
// MODULE 3 - MULTI-CAMPUS
// =============================================================================

// =============================================================================
// ENUMS
// =============================================================================

export const CampusStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  UNDER_CONSTRUCTION: 'under_construction',
  CLOSED: 'closed',
  SUSPENDED: 'suspended',
} as const;
export type CampusStatus = (typeof CampusStatus)[keyof typeof CampusStatus];

export const CampusType = {
  MAIN: 'main',
  BRANCH: 'branch',
  SATELLITE: 'satellite',
  VIRTUAL: 'virtual',
} as const;
export type CampusType = (typeof CampusType)[keyof typeof CampusType];

export const GroupRole = {
  ADMIN: 'admin',
  MEMBER: 'member',
  OBSERVER: 'observer',
  AUDITOR: 'auditor',
} as const;
export type GroupRole = (typeof GroupRole)[keyof typeof GroupRole];

export const ResourceStatus = {
  AVAILABLE: 'available',
  BOOKED: 'booked',
  MAINTENANCE: 'maintenance',
  RETIRED: 'retired',
  RESTRICTED: 'restricted',
} as const;
export type ResourceStatus = (typeof ResourceStatus)[keyof typeof ResourceStatus];

export const ResourceType = {
  VEHICLE: 'vehicle',
  EQUIPMENT: 'equipment',
  FACILITY: 'facility',
  LAB: 'lab',
  LIBRARY: 'library',
  SPORTS: 'sports',
} as const;
export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];

export const BookingStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export const TransferStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;
export type TransferStatus = (typeof TransferStatus)[keyof typeof TransferStatus];

export const TransferReason = {
  ACADEMIC: 'academic',
  PERSONAL: 'personal',
  DISCIPLINARY: 'disciplinary',
  RELOCATION: 'relocation',
  MEDICAL: 'medical',
} as const;
export type TransferReason = (typeof TransferReason)[keyof typeof TransferReason];

export const AdministrationType = {
  ACADEMIC: 'academic',
  FINANCE: 'finance',
  HR: 'hr',
  LOGISTICS: 'logistics',
  TECHNOLOGY: 'technology',
} as const;
export type AdministrationType = (typeof AdministrationType)[keyof typeof AdministrationType];

// =============================================================================
// ENTITIES
// =============================================================================

export interface Campus {
  id: string;
  school_id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  region: string;
  district: string;
  phone: string;
  email: string;
  principal_name: string;
  capacity: number;
  type: CampusType;
  status: CampusStatus;
  created_at: string;
  updated_at: string;
}

export interface CampusCreate {
  school_id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  region: string;
  district: string;
  phone: string;
  email: string;
  principal_name: string;
  capacity: number;
  type: CampusType;
  status: CampusStatus;
}

export interface CampusUpdate {
  school_id?: string;
  name?: string;
  code?: string;
  address?: string;
  city?: string;
  region?: string;
  district?: string;
  phone?: string;
  email?: string;
  principal_name?: string;
  capacity?: number;
  type?: CampusType;
  status?: CampusStatus;
}

export interface CampusQuery {
  school_id?: string;
  search?: string;
  region?: string;
  district?: string;
  type?: CampusType;
  status?: CampusStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface CampusGroup {
  id: string;
  name: string;
  code: string;
  description: string;
  headquarters: string;
  total_campuses: number;
  total_students: number;
  president_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CampusGroupCreate {
  name: string;
  code: string;
  description: string;
  headquarters: string;
  total_campuses: number;
  total_students: number;
  president_name: string;
  status: string;
}

export interface CampusGroupUpdate {
  name?: string;
  code?: string;
  description?: string;
  headquarters?: string;
  total_campuses?: number;
  total_students?: number;
  president_name?: string;
  status?: string;
}

export interface CampusGroupQuery {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface CampusGroupMember {
  id: string;
  group_id: string;
  campus_id: string;
  role: GroupRole;
  joined_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CampusGroupMemberCreate {
  group_id: string;
  campus_id: string;
  role: GroupRole;
  joined_date: string;
  status: string;
}

export interface CampusGroupMemberUpdate {
  group_id?: string;
  campus_id?: string;
  role?: GroupRole;
  joined_date?: string;
  status?: string;
}

export interface CampusGroupMemberQuery {
  group_id?: string;
  campus_id?: string;
  search?: string;
  role?: GroupRole;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SharedResource {
  id: string;
  group_id: string;
  name: string;
  type: ResourceType;
  description: string;
  location: string;
  availability: string;
  cost_per_use: number;
  status: ResourceStatus;
  created_at: string;
  updated_at: string;
}

export interface SharedResourceCreate {
  group_id: string;
  name: string;
  type: ResourceType;
  description: string;
  location: string;
  availability: string;
  cost_per_use: number;
  status: ResourceStatus;
}

export interface SharedResourceUpdate {
  group_id?: string;
  name?: string;
  type?: ResourceType;
  description?: string;
  location?: string;
  availability?: string;
  cost_per_use?: number;
  status?: ResourceStatus;
}

export interface SharedResourceQuery {
  group_id?: string;
  search?: string;
  type?: ResourceType;
  status?: ResourceStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SharedResourceBooking {
  id: string;
  resource_id: string;
  campus_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  purpose: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

export interface SharedResourceBookingCreate {
  resource_id: string;
  campus_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  purpose: string;
  status: BookingStatus;
}

export interface SharedResourceBookingUpdate {
  resource_id?: string;
  campus_id?: string;
  user_id?: string;
  start_date?: string;
  end_date?: string;
  purpose?: string;
  status?: BookingStatus;
}

export interface SharedResourceBookingQuery {
  resource_id?: string;
  campus_id?: string;
  search?: string;
  status?: BookingStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface CrossCampusUser {
  id: string;
  user_id: string;
  primary_campus_id: string;
  role: GroupRole;
  permissions: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CrossCampusUserCreate {
  user_id: string;
  primary_campus_id: string;
  role: GroupRole;
  permissions: string;
  status: string;
}

export interface CrossCampusUserUpdate {
  user_id?: string;
  primary_campus_id?: string;
  role?: GroupRole;
  permissions?: string;
  status?: string;
}

export interface CrossCampusUserQuery {
  search?: string;
  role?: GroupRole;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface CampusTransfer {
  id: string;
  student_id: string;
  from_campus_id: string;
  to_campus_id: string;
  reason: TransferReason;
  request_date: string;
  approval_date: string;
  approved_by: string;
  status: TransferStatus;
  created_at: string;
  updated_at: string;
}

export interface CampusTransferCreate {
  student_id: string;
  from_campus_id: string;
  to_campus_id: string;
  reason: TransferReason;
  request_date: string;
  approval_date: string;
  approved_by: string;
  status: TransferStatus;
}

export interface CampusTransferUpdate {
  student_id?: string;
  from_campus_id?: string;
  to_campus_id?: string;
  reason?: TransferReason;
  request_date?: string;
  approval_date?: string;
  approved_by?: string;
  status?: TransferStatus;
}

export interface CampusTransferQuery {
  search?: string;
  reason?: TransferReason;
  status?: TransferStatus;
  from_campus_id?: string;
  to_campus_id?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface CentralizedAdministration {
  id: string;
  group_id: string;
  name: string;
  type: AdministrationType;
  director_name: string;
  budget: number;
  responsibilities: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CentralizedAdministrationCreate {
  group_id: string;
  name: string;
  type: AdministrationType;
  director_name: string;
  budget: number;
  responsibilities: string;
  status: string;
}

export interface CentralizedAdministrationUpdate {
  group_id?: string;
  name?: string;
  type?: AdministrationType;
  director_name?: string;
  budget?: number;
  responsibilities?: string;
  status?: string;
}

export interface CentralizedAdministrationQuery {
  group_id?: string;
  search?: string;
  type?: AdministrationType;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface CampusAnalytics {
  id: string;
  campus_id: string;
  metric_name: string;
  value: number;
  period: string;
  comparison: string;
  trend: KpiTrend;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CampusAnalyticsCreate {
  campus_id: string;
  metric_name: string;
  value: number;
  period: string;
  comparison: string;
  trend: KpiTrend;
  status: string;
}

export interface CampusAnalyticsUpdate {
  campus_id?: string;
  metric_name?: string;
  value?: number;
  period?: string;
  comparison?: string;
  trend?: KpiTrend;
  status?: string;
}

export interface CampusAnalyticsQuery {
  campus_id?: string;
  search?: string;
  trend?: KpiTrend;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface InterCampusCommunication {
  id: string;
  sender_campus_id: string;
  receiver_campus_id: string;
  subject: string;
  message: string;
  type: string;
  priority: CircularPriority;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface InterCampusCommunicationCreate {
  sender_campus_id: string;
  receiver_campus_id: string;
  subject: string;
  message: string;
  type: string;
  priority: CircularPriority;
  status: string;
}

export interface InterCampusCommunicationUpdate {
  sender_campus_id?: string;
  receiver_campus_id?: string;
  subject?: string;
  message?: string;
  type?: string;
  priority?: CircularPriority;
  status?: string;
}

export interface InterCampusCommunicationQuery {
  search?: string;
  type?: string;
  priority?: CircularPriority;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// =============================================================================
// MODULE 4 - SCHOOL NETWORKS
// =============================================================================

// =============================================================================
// ENUMS
// =============================================================================

export const NetworkType = {
  FRANCHISE: 'franchise',
  ASSOCIATION: 'association',
  CONSORTIUM: 'consortium',
  RELIGIOUS: 'religious',
  PRIVATE: 'private',
  NGO: 'ngo',
  INTERNATIONAL: 'international',
} as const;
export type NetworkType = (typeof NetworkType)[keyof typeof NetworkType];

export const NetworkStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  DISSOLVED: 'dissolved',
} as const;
export type NetworkStatus = (typeof NetworkStatus)[keyof typeof NetworkStatus];

export const NetworkRole = {
  ADMIN: 'admin',
  MEMBER: 'member',
  OBSERVER: 'observer',
  AUDITOR: 'auditor',
} as const;
export type NetworkRole = (typeof NetworkRole)[keyof typeof NetworkRole];

export const ChainModel = {
  FRANCHISE: 'franchise',
  LICENSE: 'license',
  PARTNERSHIP: 'partnership',
  JOINT_VENTURE: 'joint_venture',
} as const;
export type ChainModel = (typeof ChainModel)[keyof typeof ChainModel];

export const FranchiseStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  TERMINATED: 'terminated',
  EXPIRED: 'expired',
} as const;
export type FranchiseStatus = (typeof FranchiseStatus)[keyof typeof FranchiseStatus];

export const MembershipStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired',
  PENDING: 'pending',
} as const;
export type MembershipStatus = (typeof MembershipStatus)[keyof typeof MembershipStatus];

export const AgreementType = {
  MEMBERSHIP: 'membership',
  FRANCHISE: 'franchise',
  PARTNERSHIP: 'partnership',
  SERVICE: 'service',
  NDA: 'nda',
} as const;
export type AgreementType = (typeof AgreementType)[keyof typeof AgreementType];

export const ReportCategory = {
  FINANCIAL: 'financial',
  ACADEMIC: 'academic',
  OPERATIONAL: 'operational',
  COMPLIANCE: 'compliance',
  MARKETING: 'marketing',
} as const;
export type ReportCategory = (typeof ReportCategory)[keyof typeof ReportCategory];

// =============================================================================
// ENTITIES
// =============================================================================

export interface SchoolNetwork {
  id: string;
  name: string;
  code: string;
  type: NetworkType;
  description: string;
  headquarters: string;
  website: string;
  logo_url: string;
  total_schools: number;
  total_students: number;
  founder_name: string;
  status: NetworkStatus;
  created_at: string;
  updated_at: string;
}

export interface SchoolNetworkCreate {
  name: string;
  code: string;
  type: NetworkType;
  description: string;
  headquarters: string;
  website: string;
  logo_url: string;
  total_schools: number;
  total_students: number;
  founder_name: string;
  status: NetworkStatus;
}

export interface SchoolNetworkUpdate {
  name?: string;
  code?: string;
  type?: NetworkType;
  description?: string;
  headquarters?: string;
  website?: string;
  logo_url?: string;
  total_schools?: number;
  total_students?: number;
  founder_name?: string;
  status?: NetworkStatus;
}

export interface SchoolNetworkQuery {
  search?: string;
  type?: NetworkType;
  status?: NetworkStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NetworkMember {
  id: string;
  network_id: string;
  school_id: string;
  role: NetworkRole;
  joined_date: string;
  membership_fee: number;
  status: MembershipStatus;
  created_at: string;
  updated_at: string;
}

export interface NetworkMemberCreate {
  network_id: string;
  school_id: string;
  role: NetworkRole;
  joined_date: string;
  membership_fee: number;
  status: MembershipStatus;
}

export interface NetworkMemberUpdate {
  network_id?: string;
  school_id?: string;
  role?: NetworkRole;
  joined_date?: string;
  membership_fee?: number;
  status?: MembershipStatus;
}

export interface NetworkMemberQuery {
  network_id?: string;
  search?: string;
  role?: NetworkRole;
  status?: MembershipStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SchoolChain {
  id: string;
  name: string;
  code: string;
  description: string;
  model: ChainModel;
  headquarters: string;
  total_schools: number;
  franchise_fee: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolChainCreate {
  name: string;
  code: string;
  description: string;
  model: ChainModel;
  headquarters: string;
  total_schools: number;
  franchise_fee: number;
  status: string;
}

export interface SchoolChainUpdate {
  name?: string;
  code?: string;
  description?: string;
  model?: ChainModel;
  headquarters?: string;
  total_schools?: number;
  franchise_fee?: number;
  status?: string;
}

export interface SchoolChainQuery {
  search?: string;
  model?: ChainModel;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SchoolFranchise {
  id: string;
  chain_id: string;
  school_id: string;
  franchisee_name: string;
  territory: string;
  start_date: string;
  end_date: string;
  royalty_rate: number;
  status: FranchiseStatus;
  created_at: string;
  updated_at: string;
}

export interface SchoolFranchiseCreate {
  chain_id: string;
  school_id: string;
  franchisee_name: string;
  territory: string;
  start_date: string;
  end_date: string;
  royalty_rate: number;
  status: FranchiseStatus;
}

export interface SchoolFranchiseUpdate {
  chain_id?: string;
  school_id?: string;
  franchisee_name?: string;
  territory?: string;
  start_date?: string;
  end_date?: string;
  royalty_rate?: number;
  status?: FranchiseStatus;
}

export interface SchoolFranchiseQuery {
  chain_id?: string;
  search?: string;
  territory?: string;
  status?: FranchiseStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface ReligiousSchoolGroup {
  id: string;
  name: string;
  code: string;
  religion: string;
  denomination: string;
  headquarters: string;
  total_schools: number;
  total_students: number;
  leader_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ReligiousSchoolGroupCreate {
  name: string;
  code: string;
  religion: string;
  denomination: string;
  headquarters: string;
  total_schools: number;
  total_students: number;
  leader_name: string;
  status: string;
}

export interface ReligiousSchoolGroupUpdate {
  name?: string;
  code?: string;
  religion?: string;
  denomination?: string;
  headquarters?: string;
  total_schools?: number;
  total_students?: number;
  leader_name?: string;
  status?: string;
}

export interface ReligiousSchoolGroupQuery {
  search?: string;
  religion?: string;
  denomination?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface PrivateSchoolGroup {
  id: string;
  name: string;
  code: string;
  description: string;
  headquarters: string;
  owner_name: string;
  total_schools: number;
  total_students: number;
  annual_revenue: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PrivateSchoolGroupCreate {
  name: string;
  code: string;
  description: string;
  headquarters: string;
  owner_name: string;
  total_schools: number;
  total_students: number;
  annual_revenue: number;
  status: string;
}

export interface PrivateSchoolGroupUpdate {
  name?: string;
  code?: string;
  description?: string;
  headquarters?: string;
  owner_name?: string;
  total_schools?: number;
  total_students?: number;
  annual_revenue?: number;
  status?: string;
}

export interface PrivateSchoolGroupQuery {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NgoSchoolGroup {
  id: string;
  name: string;
  code: string;
  description: string;
  headquarters: string;
  director_name: string;
  total_schools: number;
  total_students: number;
  funding_source: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface NgoSchoolGroupCreate {
  name: string;
  code: string;
  description: string;
  headquarters: string;
  director_name: string;
  total_schools: number;
  total_students: number;
  funding_source: string;
  status: string;
}

export interface NgoSchoolGroupUpdate {
  name?: string;
  code?: string;
  description?: string;
  headquarters?: string;
  director_name?: string;
  total_schools?: number;
  total_students?: number;
  funding_source?: string;
  status?: string;
}

export interface NgoSchoolGroupQuery {
  search?: string;
  funding_source?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface InternationalSchoolGroup {
  id: string;
  name: string;
  code: string;
  description: string;
  headquarters: string;
  country_of_origin: string;
  curriculum_type: string;
  total_schools: number;
  total_students: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface InternationalSchoolGroupCreate {
  name: string;
  code: string;
  description: string;
  headquarters: string;
  country_of_origin: string;
  curriculum_type: string;
  total_schools: number;
  total_students: number;
  status: string;
}

export interface InternationalSchoolGroupUpdate {
  name?: string;
  code?: string;
  description?: string;
  headquarters?: string;
  country_of_origin?: string;
  curriculum_type?: string;
  total_schools?: number;
  total_students?: number;
  status?: string;
}

export interface InternationalSchoolGroupQuery {
  search?: string;
  country_of_origin?: string;
  curriculum_type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NetworkAgreement {
  id: string;
  network_id: string;
  school_id: string;
  type: AgreementType;
  terms: string;
  signed_date: string;
  expiry_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface NetworkAgreementCreate {
  network_id: string;
  school_id: string;
  type: AgreementType;
  terms: string;
  signed_date: string;
  expiry_date: string;
  status: string;
}

export interface NetworkAgreementUpdate {
  network_id?: string;
  school_id?: string;
  type?: AgreementType;
  terms?: string;
  signed_date?: string;
  expiry_date?: string;
  status?: string;
}

export interface NetworkAgreementQuery {
  network_id?: string;
  search?: string;
  type?: AgreementType;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface NetworkReport {
  id: string;
  network_id: string;
  title: string;
  type: ReportType;
  period_start: string;
  period_end: string;
  content: string;
  metrics: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

export interface NetworkReportCreate {
  network_id: string;
  title: string;
  type: ReportType;
  period_start: string;
  period_end: string;
  content: string;
  metrics: string;
  status: ReportStatus;
}

export interface NetworkReportUpdate {
  network_id?: string;
  title?: string;
  type?: ReportType;
  period_start?: string;
  period_end?: string;
  content?: string;
  metrics?: string;
  status?: ReportStatus;
}

export interface NetworkReportQuery {
  network_id?: string;
  search?: string;
  type?: ReportType;
  status?: ReportStatus;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

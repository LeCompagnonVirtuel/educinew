// Government & National Governance Enterprise Types - Exams, Inspection & Accreditation
// Phase 2.9 - EduCI Platform

// =============================================================================
// MODULE 5 - NATIONAL EXAMS
// =============================================================================

export enum ExamLevel {
  PRIMARY = 'primary',
  JUNIOR_SECONDARY = 'junior_secondary',
  SENIOR_SECONDARY = 'senior_secondary',
  TECHNICAL = 'technical',
  VOCATIONAL = 'vocational',
  UNIVERSITY_ENTRANCE = 'university_entrance',
}

export enum ExamStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum ExamSessionStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  POSTPONED = 'postponed',
}

export enum CandidateStatus {
  REGISTERED = 'registered',
  CONFIRMED = 'confirmed',
  ATTENDED = 'attended',
  ABSENT = 'absent',
  DISQUALIFIED = 'disqualified',
  WITHDRAWN = 'withdrawn',
}

export enum SupervisorRole {
  CHIEF_SUPERVISOR = 'chief_supervisor',
  SUPERVISOR = 'supervisor',
  DEPUTY_SUPERVISOR = 'deputy_supervisor',
  ROOM_SUPERVISOR = 'room_supervisor',
  INVIGILATOR = 'invigilator',
}

export enum CenterStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  UNDER_MAINTENANCE = 'under_maintenance',
  SUSPENDED = 'suspended',
}

export enum ResultStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  VERIFIED = 'verified',
  PUBLISHED = 'published',
  CONTESTED = 'contested',
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

export enum CertificateType {
  COMPLETION = 'completion',
  PROFICIENCY = 'proficiency',
  MERIT = 'merit',
  HONORS = 'honors',
  DISTINCTION = 'distinction',
}

export enum CertificateStatus {
  PENDING = 'pending',
  ISSUED = 'issued',
  REVOKED = 'revoked',
  EXPIRED = 'expired',
  REPLACED = 'replaced',
}

export enum DiplomaType {
  ORDINARY = 'ordinary',
  HONORS = 'honors',
  DISTINCTION = 'distinction',
  POSTGRADUATE = 'postgraduate',
  PROFESSIONAL = 'professional',
}

export enum DiplomaStatus {
  PENDING = 'pending',
  ISSUED = 'issued',
  REVOKED = 'revoked',
  SUSPENDED = 'suspended',
  REPLACED = 'replaced',
}

export enum FraudType {
  CHEATING = 'cheating',
  IMPERSONATION = 'impersonation',
  PAPER_LEAK = 'paper_leak',
  ANSWER_SCRIPT_TAMPERING = 'answer_script_tampering',
  COLLUSION = 'collusion',
  TECHNICAL_FRAUD = 'technical_fraud',
}

export enum FraudSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum FraudStatus {
  REPORTED = 'reported',
  UNDER_INVESTIGATION = 'under_investigation',
  CONFIRMED = 'confirmed',
  DISMISSED = 'dismissed',
  RESOLVED = 'resolved',
}

export enum AppealType {
  RECHECKING = 'rechecking',
  RETOTALING = 'retotaling',
  RESULT_DISPUTE = 'result_dispute',
  CANDIDATE_DISPUTE = 'candidate_dispute',
  PROCEDURAL = 'procedural',
}

export enum AppealStatus {
  FILED = 'filed',
  UNDER_REVIEW = 'under_review',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  RESOLVED = 'resolved',
}

export interface NationalExam {
  id: string;
  name: string;
  code: string;
  level: ExamLevel;
  subject: string;
  ministry_id: string;
  academic_year: string;
  session_name: string;
  total_marks: number;
  pass_marks: number;
  duration_minutes: number;
  exam_date: string;
  status: ExamStatus;
  created_at: string;
  updated_at: string;
}

export interface NationalExamCreate {
  name: string;
  code: string;
  level: ExamLevel;
  subject: string;
  ministry_id: string;
  academic_year: string;
  session_name: string;
  total_marks: number;
  pass_marks: number;
  duration_minutes: number;
  exam_date: string;
  status: ExamStatus;
}

export interface NationalExamUpdate {
  name?: string;
  code?: string;
  level?: ExamLevel;
  subject?: string;
  ministry_id?: string;
  academic_year?: string;
  session_name?: string;
  total_marks?: number;
  pass_marks?: number;
  duration_minutes?: number;
  exam_date?: string;
  status?: ExamStatus;
}

export interface NationalExamQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ExamCenter {
  id: string;
  name: string;
  code: string;
  address: string;
  region_id: string;
  district_id: string;
  capacity: number;
  contact_person: string;
  phone: string;
  email: string;
  facilities: string;
  status: CenterStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamCenterCreate {
  name: string;
  code: string;
  address: string;
  region_id: string;
  district_id: string;
  capacity: number;
  contact_person: string;
  phone: string;
  email: string;
  facilities: string;
  status: CenterStatus;
}

export interface ExamCenterUpdate {
  name?: string;
  code?: string;
  address?: string;
  region_id?: string;
  district_id?: string;
  capacity?: number;
  contact_person?: string;
  phone?: string;
  email?: string;
  facilities?: string;
  status?: CenterStatus;
}

export interface ExamCenterQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ExamCandidate {
  id: string;
  student_id: string;
  exam_id: string;
  center_id: string;
  registration_number: string;
  candidate_number: string;
  school_id: string;
  session: string;
  status: CandidateStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamCandidateCreate {
  student_id: string;
  exam_id: string;
  center_id: string;
  registration_number: string;
  candidate_number: string;
  school_id: string;
  session: string;
  status: CandidateStatus;
}

export interface ExamCandidateUpdate {
  student_id?: string;
  exam_id?: string;
  center_id?: string;
  registration_number?: string;
  candidate_number?: string;
  school_id?: string;
  session?: string;
  status?: CandidateStatus;
}

export interface ExamCandidateQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ExamSupervisor {
  id: string;
  user_id: string;
  exam_id: string;
  center_id: string;
  role: SupervisorRole;
  qualification: string;
  experience: string;
  assigned_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamSupervisorCreate {
  user_id: string;
  exam_id: string;
  center_id: string;
  role: SupervisorRole;
  qualification: string;
  experience: string;
  assigned_date: string;
  status: string;
}

export interface ExamSupervisorUpdate {
  user_id?: string;
  exam_id?: string;
  center_id?: string;
  role?: SupervisorRole;
  qualification?: string;
  experience?: string;
  assigned_date?: string;
  status?: string;
}

export interface ExamSupervisorQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ExamSession {
  id: string;
  exam_id: string;
  center_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  subject: string;
  room: string;
  total_candidates: number;
  actual_candidates: number;
  irregularities: string;
  status: ExamSessionStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamSessionCreate {
  exam_id: string;
  center_id: string;
  session_date: string;
  start_time: string;
  end_time: string;
  subject: string;
  room: string;
  total_candidates: number;
  actual_candidates: number;
  irregularities: string;
  status: ExamSessionStatus;
}

export interface ExamSessionUpdate {
  exam_id?: string;
  center_id?: string;
  session_date?: string;
  start_time?: string;
  end_time?: string;
  subject?: string;
  room?: string;
  total_candidates?: number;
  actual_candidates?: number;
  irregularities?: string;
  status?: ExamSessionStatus;
}

export interface ExamSessionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface MarkingCenter {
  id: string;
  name: string;
  code: string;
  address: string;
  region_id: string;
  capacity: number;
  coordinator_name: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface MarkingCenterCreate {
  name: string;
  code: string;
  address: string;
  region_id: string;
  capacity: number;
  coordinator_name: string;
  start_date: string;
  end_date: string;
  status: string;
}

export interface MarkingCenterUpdate {
  name?: string;
  code?: string;
  address?: string;
  region_id?: string;
  capacity?: number;
  coordinator_name?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
}

export interface MarkingCenterQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ExamResult {
  id: string;
  candidate_id: string;
  exam_id: string;
  center_id: string;
  marks_obtained: number;
  grade: Grade;
  percentage: number;
  rank: number;
  status: ResultStatus;
  verified_by: string;
  verified_at: string;
  created_at: string;
  updated_at: string;
}

export interface ExamResultCreate {
  candidate_id: string;
  exam_id: string;
  center_id: string;
  marks_obtained: number;
  grade: Grade;
  percentage: number;
  rank: number;
  status: ResultStatus;
  verified_by: string;
  verified_at: string;
}

export interface ExamResultUpdate {
  candidate_id?: string;
  exam_id?: string;
  center_id?: string;
  marks_obtained?: number;
  grade?: Grade;
  percentage?: number;
  rank?: number;
  status?: ResultStatus;
  verified_by?: string;
  verified_at?: string;
}

export interface ExamResultQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface Certificate {
  id: string;
  student_id: string;
  exam_id: string;
  certificate_number: string;
  certificate_type: CertificateType;
  issued_date: string;
  issued_by: string;
  institution: string;
  validity: string;
  status: CertificateStatus;
  created_at: string;
  updated_at: string;
}

export interface CertificateCreate {
  student_id: string;
  exam_id: string;
  certificate_number: string;
  certificate_type: CertificateType;
  issued_date: string;
  issued_by: string;
  institution: string;
  validity: string;
  status: CertificateStatus;
}

export interface CertificateUpdate {
  student_id?: string;
  exam_id?: string;
  certificate_number?: string;
  certificate_type?: CertificateType;
  issued_date?: string;
  issued_by?: string;
  institution?: string;
  validity?: string;
  status?: CertificateStatus;
}

export interface CertificateQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface Diploma {
  id: string;
  student_id: string;
  exam_id: string;
  diploma_number: string;
  diploma_type: DiplomaType;
  field_of_study: string;
  institution: string;
  graduation_date: string;
  honors: string;
  status: DiplomaStatus;
  created_at: string;
  updated_at: string;
}

export interface DiplomaCreate {
  student_id: string;
  exam_id: string;
  diploma_number: string;
  diploma_type: DiplomaType;
  field_of_study: string;
  institution: string;
  graduation_date: string;
  honors: string;
  status: DiplomaStatus;
}

export interface DiplomaUpdate {
  student_id?: string;
  exam_id?: string;
  diploma_number?: string;
  diploma_type?: DiplomaType;
  field_of_study?: string;
  institution?: string;
  graduation_date?: string;
  honors?: string;
  status?: DiplomaStatus;
}

export interface DiplomaQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ExamFraud {
  id: string;
  candidate_id: string;
  exam_id: string;
  center_id: string;
  fraud_type: FraudType;
  description: string;
  evidence: string;
  detected_by: string;
  detected_date: string;
  severity: FraudSeverity;
  status: FraudStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamFraudCreate {
  candidate_id: string;
  exam_id: string;
  center_id: string;
  fraud_type: FraudType;
  description: string;
  evidence: string;
  detected_by: string;
  detected_date: string;
  severity: FraudSeverity;
  status: FraudStatus;
}

export interface ExamFraudUpdate {
  candidate_id?: string;
  exam_id?: string;
  center_id?: string;
  fraud_type?: FraudType;
  description?: string;
  evidence?: string;
  detected_by?: string;
  detected_date?: string;
  severity?: FraudSeverity;
  status?: FraudStatus;
}

export interface ExamFraudQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ExamAppeal {
  id: string;
  candidate_id: string;
  exam_id: string;
  appeal_type: AppealType;
  reason: string;
  supporting_documents: string;
  filed_date: string;
  reviewed_by: string;
  decision: string;
  decision_date: string;
  status: AppealStatus;
  created_at: string;
  updated_at: string;
}

export interface ExamAppealCreate {
  candidate_id: string;
  exam_id: string;
  appeal_type: AppealType;
  reason: string;
  supporting_documents: string;
  filed_date: string;
  reviewed_by: string;
  decision: string;
  decision_date: string;
  status: AppealStatus;
}

export interface ExamAppealUpdate {
  candidate_id?: string;
  exam_id?: string;
  appeal_type?: AppealType;
  reason?: string;
  supporting_documents?: string;
  filed_date?: string;
  reviewed_by?: string;
  decision?: string;
  decision_date?: string;
  status?: AppealStatus;
}

export interface ExamAppealQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ExamStatistics {
  id: string;
  exam_id: string;
  center_id: string;
  region_id: string;
  total_candidates: number;
  total_passed: number;
  total_failed: number;
  pass_rate: number;
  average_marks: number;
  highest_marks: number;
  lowest_marks: number;
  created_at: string;
  updated_at: string;
}

export interface ExamStatisticsCreate {
  exam_id: string;
  center_id: string;
  region_id: string;
  total_candidates: number;
  total_passed: number;
  total_failed: number;
  pass_rate: number;
  average_marks: number;
  highest_marks: number;
  lowest_marks: number;
}

export interface ExamStatisticsUpdate {
  exam_id?: string;
  center_id?: string;
  region_id?: string;
  total_candidates?: number;
  total_passed?: number;
  total_failed?: number;
  pass_rate?: number;
  average_marks?: number;
  highest_marks?: number;
  lowest_marks?: number;
}

export interface ExamStatisticsQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

// =============================================================================
// MODULE 6 - INSPECTION PLATFORM
// =============================================================================

export enum MissionType {
  ROUTINE = 'routine',
  COMPREHENSIVE = 'comprehensive',
  FOLLOW_UP = 'follow_up',
  EMERGENCY = 'emergency',
  SPECIAL = 'special',
}

export enum MissionStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  POSTPONED = 'postponed',
}

export enum ReportStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  REVIEWED = 'reviewed',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum RecommendationCategory {
  ACADEMIC = 'academic',
  INFRASTRUCTURE = 'infrastructure',
  MANAGEMENT = 'management',
  SAFETY = 'safety',
  FINANCE = 'finance',
  STAFFING = 'staffing',
  CURRICULUM = 'curriculum',
  DISCIPLINE = 'discipline',
}

export enum RecommendationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum RecommendationStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

export enum ComplianceStatus {
  COMPLIANT = 'compliant',
  PARTIALLY_COMPLIANT = 'partially_compliant',
  NON_COMPLIANT = 'non_compliant',
  NOT_ASSESSED = 'not_assessed',
}

export enum CorrectiveActionType {
  IMMEDIATE = 'immediate',
  SHORT_TERM = 'short_term',
  LONG_TERM = 'long_term',
  STRATEGIC = 'strategic',
}

export enum CorrectiveActionStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue',
  VERIFIED = 'verified',
}

export enum CalendarStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RESCHEDULED = 'rescheduled',
}

export enum RatingGrade {
  A_PLUS = 'a_plus',
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
  E = 'e',
  F = 'f',
}

export enum ChecklistStatus {
  PASS = 'pass',
  FAIL = 'fail',
  PARTIAL = 'partial',
  NOT_APPLICABLE = 'not_applicable',
}

export enum ChecklistCategory {
  ACADEMIC = 'academic',
  INFRASTRUCTURE = 'infrastructure',
  ADMINISTRATION = 'administration',
  SAFETY = 'safety',
  WELFARE = 'welfare',
  FINANCE = 'finance',
  GOVERNANCE = 'governance',
}

export enum PerformanceStatus {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  SATISFACTORY = 'satisfactory',
  NEEDS_IMPROVEMENT = 'needs_improvement',
  POOR = 'poor',
}

export enum TrendDirection {
  IMPROVING = 'improving',
  STABLE = 'stable',
  DECLINING = 'declining',
}

export interface InspectionMission {
  id: string;
  name: string;
  code: string;
  type: MissionType;
  inspector_id: string;
  district_id: string;
  purpose: string;
  scope: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: MissionStatus;
  created_at: string;
  updated_at: string;
}

export interface InspectionMissionCreate {
  name: string;
  code: string;
  type: MissionType;
  inspector_id: string;
  district_id: string;
  purpose: string;
  scope: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: MissionStatus;
}

export interface InspectionMissionUpdate {
  name?: string;
  code?: string;
  type?: MissionType;
  inspector_id?: string;
  district_id?: string;
  purpose?: string;
  scope?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  status?: MissionStatus;
}

export interface InspectionMissionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface InspectionReport {
  id: string;
  mission_id: string;
  school_id: string;
  inspector_id: string;
  visit_date: string;
  overall_score: number;
  strengths: string;
  weaknesses: string;
  recommendations_count: number;
  compliance_status: ComplianceStatus;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

export interface InspectionReportCreate {
  mission_id: string;
  school_id: string;
  inspector_id: string;
  visit_date: string;
  overall_score: number;
  strengths: string;
  weaknesses: string;
  recommendations_count: number;
  compliance_status: ComplianceStatus;
  status: ReportStatus;
}

export interface InspectionReportUpdate {
  mission_id?: string;
  school_id?: string;
  inspector_id?: string;
  visit_date?: string;
  overall_score?: number;
  strengths?: string;
  weaknesses?: string;
  recommendations_count?: number;
  compliance_status?: ComplianceStatus;
  status?: ReportStatus;
}

export interface InspectionReportQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface InspectionRecommendation {
  id: string;
  report_id: string;
  school_id: string;
  category: RecommendationCategory;
  title: string;
  description: string;
  priority: RecommendationPriority;
  deadline: string;
  responsible_person: string;
  status: RecommendationStatus;
  created_at: string;
  updated_at: string;
}

export interface InspectionRecommendationCreate {
  report_id: string;
  school_id: string;
  category: RecommendationCategory;
  title: string;
  description: string;
  priority: RecommendationPriority;
  deadline: string;
  responsible_person: string;
  status: RecommendationStatus;
}

export interface InspectionRecommendationUpdate {
  report_id?: string;
  school_id?: string;
  category?: RecommendationCategory;
  title?: string;
  description?: string;
  priority?: RecommendationPriority;
  deadline?: string;
  responsible_person?: string;
  status?: RecommendationStatus;
}

export interface InspectionRecommendationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface SchoolCompliance {
  id: string;
  school_id: string;
  report_id: string;
  category: string;
  requirement: string;
  status: ComplianceStatus;
  evidence: string;
  verified_by: string;
  verified_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolComplianceCreate {
  school_id: string;
  report_id: string;
  category: string;
  requirement: string;
  status: ComplianceStatus;
  evidence: string;
  verified_by: string;
  verified_at: string;
  notes: string;
}

export interface SchoolComplianceUpdate {
  school_id?: string;
  report_id?: string;
  category?: string;
  requirement?: string;
  status?: ComplianceStatus;
  evidence?: string;
  verified_by?: string;
  verified_at?: string;
  notes?: string;
}

export interface SchoolComplianceQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface CorrectiveAction {
  id: string;
  recommendation_id: string;
  school_id: string;
  action_type: CorrectiveActionType;
  description: string;
  responsible_person: string;
  deadline: string;
  completion_date: string;
  evidence: string;
  status: CorrectiveActionStatus;
  created_at: string;
  updated_at: string;
}

export interface CorrectiveActionCreate {
  recommendation_id: string;
  school_id: string;
  action_type: CorrectiveActionType;
  description: string;
  responsible_person: string;
  deadline: string;
  completion_date: string;
  evidence: string;
  status: CorrectiveActionStatus;
}

export interface CorrectiveActionUpdate {
  recommendation_id?: string;
  school_id?: string;
  action_type?: CorrectiveActionType;
  description?: string;
  responsible_person?: string;
  deadline?: string;
  completion_date?: string;
  evidence?: string;
  status?: CorrectiveActionStatus;
}

export interface CorrectiveActionQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface InspectionCalendar {
  id: string;
  inspector_id: string;
  school_id: string;
  scheduled_date: string;
  purpose: string;
  type: string;
  status: CalendarStatus;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InspectionCalendarCreate {
  inspector_id: string;
  school_id: string;
  scheduled_date: string;
  purpose: string;
  type: string;
  status: CalendarStatus;
  notes: string;
}

export interface InspectionCalendarUpdate {
  inspector_id?: string;
  school_id?: string;
  scheduled_date?: string;
  purpose?: string;
  type?: string;
  status?: CalendarStatus;
  notes?: string;
}

export interface InspectionCalendarQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface SchoolRating {
  id: string;
  school_id: string;
  rating_date: string;
  overall_score: number;
  academic_score: number;
  infrastructure_score: number;
  management_score: number;
  safety_score: number;
  grade: RatingGrade;
  assessor: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SchoolRatingCreate {
  school_id: string;
  rating_date: string;
  overall_score: number;
  academic_score: number;
  infrastructure_score: number;
  management_score: number;
  safety_score: number;
  grade: RatingGrade;
  assessor: string;
  status: string;
}

export interface SchoolRatingUpdate {
  school_id?: string;
  rating_date?: string;
  overall_score?: number;
  academic_score?: number;
  infrastructure_score?: number;
  management_score?: number;
  safety_score?: number;
  grade?: RatingGrade;
  assessor?: string;
  status?: string;
}

export interface SchoolRatingQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface InspectionChecklist {
  id: string;
  mission_id: string;
  category: ChecklistCategory;
  item: string;
  description: string;
  expected_standard: string;
  actual_status: ChecklistStatus;
  score: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface InspectionChecklistCreate {
  mission_id: string;
  category: ChecklistCategory;
  item: string;
  description: string;
  expected_standard: string;
  actual_status: ChecklistStatus;
  score: number;
  notes: string;
}

export interface InspectionChecklistUpdate {
  mission_id?: string;
  category?: ChecklistCategory;
  item?: string;
  description?: string;
  expected_standard?: string;
  actual_status?: ChecklistStatus;
  score?: number;
  notes?: string;
}

export interface InspectionChecklistQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface InspectorPerformance {
  id: string;
  inspector_id: string;
  period: string;
  missions_completed: number;
  reports_submitted: number;
  average_score: number;
  on_time_rate: number;
  quality_score: number;
  status: PerformanceStatus;
  created_at: string;
  updated_at: string;
}

export interface InspectorPerformanceCreate {
  inspector_id: string;
  period: string;
  missions_completed: number;
  reports_submitted: number;
  average_score: number;
  on_time_rate: number;
  quality_score: number;
  status: PerformanceStatus;
}

export interface InspectorPerformanceUpdate {
  inspector_id?: string;
  period?: string;
  missions_completed?: number;
  reports_submitted?: number;
  average_score?: number;
  on_time_rate?: number;
  quality_score?: number;
  status?: PerformanceStatus;
}

export interface InspectorPerformanceQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ComplianceTrend {
  id: string;
  school_id: string;
  category: string;
  period: string;
  previous_score: number;
  current_score: number;
  change: number;
  trend: TrendDirection;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceTrendCreate {
  school_id: string;
  category: string;
  period: string;
  previous_score: number;
  current_score: number;
  change: number;
  trend: TrendDirection;
  status: string;
}

export interface ComplianceTrendUpdate {
  school_id?: string;
  category?: string;
  period?: string;
  previous_score?: number;
  current_score?: number;
  change?: number;
  trend?: TrendDirection;
  status?: string;
}

export interface ComplianceTrendQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

// =============================================================================
// MODULE 7 - ACCREDITATION
// =============================================================================

export enum AccreditationStatus {
  APPLICATION = 'application',
  UNDER_REVIEW = 'under_review',
  PENDING_ASSESSMENT = 'pending_assessment',
  ASSESSED = 'assessed',
  ACCREDITED = 'accredited',
  PROVISIONAL = 'provisional',
  SUSPENDED = 'suspended',
  REVOKED = 'revoked',
  EXPIRED = 'expired',
}

export enum AccreditationType {
  INSTITUTIONAL = 'institutional',
  PROGRAM = 'program',
  SPECIALIZED = 'specialized',
  REGIONAL = 'regional',
  INTERNATIONAL = 'international',
}

export enum AssessmentStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REVIEWED = 'reviewed',
  CANCELLED = 'cancelled',
}

export enum CertificationType {
  INSTITUTIONAL = 'institutional',
  PROGRAM = 'program',
  STAFF = 'staff',
  FACILITY = 'facility',
  PROCESS = 'process',
}

export enum CertificationStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended',
  REVOKED = 'revoked',
  PENDING_RENEWAL = 'pending_renewal',
}

export enum RenewalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DENIED = 'denied',
  CONDITIONAL = 'conditional',
  EXPIRED = 'expired',
}

export enum AuditType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  COMPLIANCE = 'compliance',
  QUALITY = 'quality',
  SAFETY = 'safety',
}

export enum AuditStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FOLLOW_UP = 'follow_up',
  CLOSED = 'closed',
}

export enum RuleSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum IndicatorTrend {
  IMPROVING = 'improving',
  STABLE = 'stable',
  DECLINING = 'declining',
  INSUFFICIENT_DATA = 'insufficient_data',
}

export enum DocumentType {
  APPLICATION_FORM = 'application_form',
  SELF_STUDY_REPORT = 'self_study_report',
  POLICY_DOCUMENT = 'policy_document',
  ACADEMIC_RECORD = 'academic_record',
  FINANCIAL_REPORT = 'financial_report',
  COMPLIANCE_CERTIFICATE = 'compliance_certificate',
  OTHER = 'other',
}

export enum FindingSeverity {
  OBSERVATION = 'observation',
  MINOR = 'minor',
  MAJOR = 'major',
  CRITICAL = 'critical',
}

export enum FindingStatus {
  OPEN = 'open',
  ACKNOWLEDGED = 'acknowledged',
  IN_PROGRESS = 'in_progress',
  RESOLVED = 'resolved',
  VERIFIED = 'verified',
}

export interface Accreditation {
  id: string;
  school_id: string;
  accrediting_body: string;
  type: AccreditationType;
  scope: string;
  application_date: string;
  issue_date: string;
  expiry_date: string;
  status: AccreditationStatus;
  conditions: string;
  created_at: string;
  updated_at: string;
}

export interface AccreditationCreate {
  school_id: string;
  accrediting_body: string;
  type: AccreditationType;
  scope: string;
  application_date: string;
  issue_date: string;
  expiry_date: string;
  status: AccreditationStatus;
  conditions: string;
}

export interface AccreditationUpdate {
  school_id?: string;
  accrediting_body?: string;
  type?: AccreditationType;
  scope?: string;
  application_date?: string;
  issue_date?: string;
  expiry_date?: string;
  status?: AccreditationStatus;
  conditions?: string;
}

export interface AccreditationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface AccreditationStandard {
  id: string;
  accrediting_body: string;
  name: string;
  code: string;
  category: string;
  description: string;
  weight: number;
  required_score: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AccreditationStandardCreate {
  accrediting_body: string;
  name: string;
  code: string;
  category: string;
  description: string;
  weight: number;
  required_score: number;
  status: string;
}

export interface AccreditationStandardUpdate {
  accrediting_body?: string;
  name?: string;
  code?: string;
  category?: string;
  description?: string;
  weight?: number;
  required_score?: number;
  status?: string;
}

export interface AccreditationStandardQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface AccreditationAssessment {
  id: string;
  accreditation_id: string;
  school_id: string;
  standard_id: string;
  score: number;
  evidence: string;
  assessor: string;
  assessment_date: string;
  status: AssessmentStatus;
  created_at: string;
  updated_at: string;
}

export interface AccreditationAssessmentCreate {
  accreditation_id: string;
  school_id: string;
  standard_id: string;
  score: number;
  evidence: string;
  assessor: string;
  assessment_date: string;
  status: AssessmentStatus;
}

export interface AccreditationAssessmentUpdate {
  accreditation_id?: string;
  school_id?: string;
  standard_id?: string;
  score?: number;
  evidence?: string;
  assessor?: string;
  assessment_date?: string;
  status?: AssessmentStatus;
}

export interface AccreditationAssessmentQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface Certification {
  id: string;
  school_id: string;
  certifying_body: string;
  name: string;
  code: string;
  type: CertificationType;
  issue_date: string;
  expiry_date: string;
  scope: string;
  status: CertificationStatus;
  created_at: string;
  updated_at: string;
}

export interface CertificationCreate {
  school_id: string;
  certifying_body: string;
  name: string;
  code: string;
  type: CertificationType;
  issue_date: string;
  expiry_date: string;
  scope: string;
  status: CertificationStatus;
}

export interface CertificationUpdate {
  school_id?: string;
  certifying_body?: string;
  name?: string;
  code?: string;
  type?: CertificationType;
  issue_date?: string;
  expiry_date?: string;
  scope?: string;
  status?: CertificationStatus;
}

export interface CertificationQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface Renewal {
  id: string;
  accreditation_id: string;
  school_id: string;
  renewal_date: string;
  new_expiry_date: string;
  conditions: string;
  approved_by: string;
  status: RenewalStatus;
  created_at: string;
  updated_at: string;
}

export interface RenewalCreate {
  accreditation_id: string;
  school_id: string;
  renewal_date: string;
  new_expiry_date: string;
  conditions: string;
  approved_by: string;
  status: RenewalStatus;
}

export interface RenewalUpdate {
  accreditation_id?: string;
  school_id?: string;
  renewal_date?: string;
  new_expiry_date?: string;
  conditions?: string;
  approved_by?: string;
  status?: RenewalStatus;
}

export interface RenewalQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface QualityAudit {
  id: string;
  school_id: string;
  audit_type: AuditType;
  auditor: string;
  scheduled_date: string;
  actual_date: string;
  scope: string;
  findings_count: number;
  overall_score: number;
  status: AuditStatus;
  created_at: string;
  updated_at: string;
}

export interface QualityAuditCreate {
  school_id: string;
  audit_type: AuditType;
  auditor: string;
  scheduled_date: string;
  actual_date: string;
  scope: string;
  findings_count: number;
  overall_score: number;
  status: AuditStatus;
}

export interface QualityAuditUpdate {
  school_id?: string;
  audit_type?: AuditType;
  auditor?: string;
  scheduled_date?: string;
  actual_date?: string;
  scope?: string;
  findings_count?: number;
  overall_score?: number;
  status?: AuditStatus;
}

export interface QualityAuditQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface ComplianceRule {
  id: string;
  accrediting_body: string;
  name: string;
  code: string;
  category: string;
  description: string;
  severity: RuleSeverity;
  penalty: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ComplianceRuleCreate {
  accrediting_body: string;
  name: string;
  code: string;
  category: string;
  description: string;
  severity: RuleSeverity;
  penalty: string;
  status: string;
}

export interface ComplianceRuleUpdate {
  accrediting_body?: string;
  name?: string;
  code?: string;
  category?: string;
  description?: string;
  severity?: RuleSeverity;
  penalty?: string;
  status?: string;
}

export interface ComplianceRuleQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface QualityIndicator {
  id: string;
  school_id: string;
  indicator_name: string;
  category: string;
  value: number;
  target: number;
  unit: string;
  period: string;
  trend: IndicatorTrend;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface QualityIndicatorCreate {
  school_id: string;
  indicator_name: string;
  category: string;
  value: number;
  target: number;
  unit: string;
  period: string;
  trend: IndicatorTrend;
  status: string;
}

export interface QualityIndicatorUpdate {
  school_id?: string;
  indicator_name?: string;
  category?: string;
  value?: number;
  target?: number;
  unit?: string;
  period?: string;
  trend?: IndicatorTrend;
  status?: string;
}

export interface QualityIndicatorQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface AccreditationDocument {
  id: string;
  accreditation_id: string;
  name: string;
  type: DocumentType;
  file_url: string;
  uploaded_by: string;
  uploaded_at: string;
  verified: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AccreditationDocumentCreate {
  accreditation_id: string;
  name: string;
  type: DocumentType;
  file_url: string;
  uploaded_by: string;
  uploaded_at: string;
  verified: boolean;
  status: string;
}

export interface AccreditationDocumentUpdate {
  accreditation_id?: string;
  name?: string;
  type?: DocumentType;
  file_url?: string;
  uploaded_by?: string;
  uploaded_at?: string;
  verified?: boolean;
  status?: string;
}

export interface AccreditationDocumentQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

export interface AuditFinding {
  id: string;
  audit_id: string;
  school_id: string;
  category: string;
  severity: FindingSeverity;
  description: string;
  evidence: string;
  recommendation: string;
  responsible_person: string;
  deadline: string;
  status: FindingStatus;
  created_at: string;
  updated_at: string;
}

export interface AuditFindingCreate {
  audit_id: string;
  school_id: string;
  category: string;
  severity: FindingSeverity;
  description: string;
  evidence: string;
  recommendation: string;
  responsible_person: string;
  deadline: string;
  status: FindingStatus;
}

export interface AuditFindingUpdate {
  audit_id?: string;
  school_id?: string;
  category?: string;
  severity?: FindingSeverity;
  description?: string;
  evidence?: string;
  recommendation?: string;
  responsible_person?: string;
  deadline?: string;
  status?: FindingStatus;
}

export interface AuditFindingQuery {
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
  search: string;
}

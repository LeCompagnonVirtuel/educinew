export enum CertificateType {
  DIGITAL = 'DIGITAL',
  BLOCKCHAIN = 'BLOCKCHAIN',
  ACADEMIC = 'ACADEMIC',
  PROFESSIONAL = 'PROFESSIONAL',
  MICRO_CREDENTIAL = 'MICRO_CREDENTIAL',
  ACHIEVEMENT = 'ACHIEVEMENT',
  COMPLETION = 'COMPLETION',
}

export enum CertificateStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
}

export enum CertificateFormat {
  PDF = 'PDF',
  PNG = 'PNG',
  SVG = 'SVG',
  JSON = 'JSON',
  BLOCKCHAIN_TX = 'BLOCKCHAIN_TX',
}

export enum VerificationMethod {
  QR_CODE = 'QR_CODE',
  PUBLIC_URL = 'PUBLIC_URL',
  API = 'API',
  BLOCKCHAIN = 'BLOCKCHAIN',
  EMAIL = 'EMAIL',
}

export enum TemplateType {
  ACADEMIC = 'ACADEMIC',
  PROFESSIONAL = 'PROFESSIONAL',
  CUSTOM = 'CUSTOM',
  MINIMAL = 'MINIMAL',
  CLASSIC = 'CLASSIC',
  MODERN = 'MODERN',
}

export enum CredentialLevel {
  FOUNDATION = 'FOUNDATION',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
  MASTERY = 'MASTERY',
}

export enum BadgeType {
  SKILL = 'SKILL',
  ACHIEVEMENT = 'ACHIEVEMENT',
  PARTICIPATION = 'PARTICIPATION',
  MASTERY = 'MASTERY',
  LEADERSHIP = 'LEADERSHIP',
}

export enum TranscriptFormat {
  PDF = 'PDF',
  HTML = 'HTML',
  JSON = 'JSON',
  XML = 'XML',
}

export enum RenewalStatus {
  NOT_REQUIRED = 'NOT_REQUIRED',
  DUE = 'DUE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
}

export enum CompetencyTestType {
  PRACTICAL = 'PRACTICAL',
  WRITTEN = 'WRITTEN',
  ORAL = 'ORAL',
  PORTFOLIO = 'PORTFOLIO',
  PEER = 'PEER',
  SELF = 'SELF',
  EXTERNAL = 'EXTERNAL',
}

export enum PortfolioType {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  COMPETENCY = 'COMPETENCY',
  PROJECT = 'PROJECT',
}

export enum AssessmentMethod {
  DIRECT_OBSERVATION = 'DIRECT_OBSERVATION',
  PRODUCT_ASSESSMENT = 'PRODUCT_ASSESSMENT',
  PORTFOLIO = 'PORTFOLIO',
  PEER = 'PEER',
  SELF = 'SELF',
  EXTERNAL = 'EXTERNAL',
}

export enum CompetencyGapSeverity {
  NONE = 'NONE',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum SkillMatrixLevel {
  NOT_DEVELOPING = 'NOT_DEVELOPING',
  DEVELOPING = 'DEVELOPING',
  PROFICIENT = 'PROFICIENT',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export enum AssessmentFrequency {
  ONCE = 'ONCE',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  ANNUAL = 'ANNUAL',
}

export enum NationalExamType {
  BEPC = 'BEPC',
  BAC = 'BAC',
  CONCOURS = 'CONCOURS',
  CERTIFICATE = 'CERTIFICATE',
  DIPLOMA = 'DIPLOMA',
}

export enum ExamCenterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  FULL = 'FULL',
  MAINTENANCE = 'MAINTENANCE',
}

export enum SeatAllocationStatus {
  AVAILABLE = 'AVAILABLE',
  ALLOCATED = 'ALLOCATED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export enum CandidateRegistrationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum ExamDistributionStatus {
  PENDING = 'PENDING',
  DISTRIBUTED = 'DISTRIBUTED',
  COLLECTED = 'COLLECTED',
  SECURED = 'SECURED',
}

export enum SecurePrintStatus {
  PENDING = 'PENDING',
  PRINTING = 'PRINTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum CorrectionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REVIEWED = 'REVIEWED',
  MODERATED = 'MODERATED',
}

export enum MarkerAssignmentStatus {
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
}

export enum DoubleMarkingStatus {
  PENDING = 'PENDING',
  FIRST_MARK = 'FIRST_MARK',
  SECOND_MARK = 'SECOND_MARK',
  RECONCILED = 'RECONCILED',
  ESCALATED = 'ESCALATED',
}

export enum ModerationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  APPEALED = 'APPEALED',
}

export enum AppealStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  UPHELD = 'UPHELD',
  REJECTED = 'REJECTED',
  RESOLVED = 'RESOLVED',
}

export enum ResultsPublicationStatus {
  DRAFT = 'DRAFT',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum RankingType {
  NATIONAL = 'NATIONAL',
  REGIONAL = 'REGIONAL',
  DEPARTMENTAL = 'DEPARTMENTAL',
  SCHOOL = 'SCHOOL',
  CLASS = 'CLASS',
}

// ============================================================================
// Module 3 - Certification Platform Interfaces
// ============================================================================

export interface Certificate {
  id: string;
  school_id: string;
  student_id: string;
  certificate_type: CertificateType;
  title: string;
  description: string;
  issuer: string;
  issued_at: string;
  expires_at: string | null;
  status: CertificateStatus;
  template_id: string;
  verification_code: string;
  digital_url: string | null;
  blockchain_tx: string | null;
  created_at: string;
  updated_at: string;
}

export interface DigitalCertificate {
  id: string;
  certificate_id: string;
  file_url: string;
  file_format: CertificateFormat;
  file_size_bytes: number;
  checksum: string;
  created_at: string;
}

export interface BlockchainCertificate {
  id: string;
  certificate_id: string;
  blockchain_network: string;
  transaction_hash: string;
  block_number: number;
  smart_contract_address: string;
  ipfs_hash: string;
  created_at: string;
}

export interface QRVerification {
  id: string;
  certificate_id: string;
  qr_code_url: string;
  verification_url: string;
  scan_count: number;
  last_scanned_at: string | null;
  created_at: string;
}

export interface PublicVerification {
  id: string;
  certificate_id: string;
  public_url: string;
  view_count: number;
  last_viewed_at: string | null;
  share_enabled: boolean;
  created_at: string;
}

export interface CertificateTemplate {
  id: string;
  school_id: string;
  name: string;
  type: TemplateType;
  layout: Record<string, unknown>;
  styles: Record<string, unknown>;
  preview_url: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CertificateBranding {
  id: string;
  school_id: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  signature_url: string;
  seal_url: string;
  created_at: string;
}

export interface CertificateExpiration {
  id: string;
  certificate_id: string;
  issued_at: string;
  expires_at: string;
  renewal_required: boolean;
  renewal_status: RenewalStatus;
  reminder_dates: string[];
  created_at: string;
}

export interface CertificateRenewal {
  id: string;
  certificate_id: string;
  renewal_date: string;
  requirements: string[];
  status: RenewalStatus;
  completed_at: string | null;
  created_at: string;
}

export interface CertificateValidation {
  id: string;
  certificate_id: string;
  validated_by: string;
  validated_at: string;
  is_valid: boolean;
  reason: string | null;
}

export interface CertificateRevocation {
  id: string;
  certificate_id: string;
  revoked_by: string;
  revoked_at: string;
  reason: string;
  revoked_certificate_url: string | null;
}

export interface CertificateRegistry {
  id: string;
  school_id: string;
  certificate_type: CertificateType;
  total_issued: number;
  active_count: number;
  expired_count: number;
  revoked_count: number;
  last_updated: string;
}

export interface MicroCredential {
  id: string;
  school_id: string;
  student_id: string;
  name: string;
  description: string;
  skill_ids: string[];
  criteria: string[];
  issued_at: string;
  expires_at: string | null;
  status: CertificateStatus;
  created_at: string;
}

export interface SkillBadge {
  id: string;
  school_id: string;
  student_id: string;
  badge_type: BadgeType;
  name: string;
  description: string;
  icon_url: string;
  skill_id: string;
  level: CredentialLevel;
  earned_at: string;
  created_at: string;
}

export interface OpenBadge {
  id: string;
  badge_id: string;
  name: string;
  description: string;
  image_url: string;
  criteria: string[];
  issuer_url: string;
  alignment: string[];
  created_at: string;
}

export interface AchievementCertificate {
  id: string;
  school_id: string;
  student_id: string;
  achievement_name: string;
  description: string;
  date: string;
  certificate_id: string;
  created_at: string;
}

export interface AcademicCertificate {
  id: string;
  school_id: string;
  student_id: string;
  program: string;
  degree: string;
  specialization: string;
  graduation_date: string;
  gpa: number;
  honors: string;
  certificate_id: string;
  created_at: string;
}

export interface ProfessionalCertificate {
  id: string;
  school_id: string;
  teacher_id: string;
  certification_body: string;
  certification_name: string;
  issued_at: string;
  expires_at: string | null;
  certificate_id: string;
  created_at: string;
}

export interface TranscriptGenerator {
  id: string;
  school_id: string;
  student_id: string;
  academic_year: string;
  format: TranscriptFormat;
  file_url: string | null;
  generated_at: string;
  created_at: string;
}

export interface DigitalDiploma {
  id: string;
  school_id: string;
  student_id: string;
  diploma_type: string;
  program: string;
  institution: string;
  graduation_date: string;
  diploma_url: string;
  verification_code: string;
  created_at: string;
}

// ============================================================================
// Module 4 - Competency Assessment Interfaces
// ============================================================================

export interface CompetencyTestCriteria {
  id: string;
  name: string;
  description: string;
  weight: number;
  max_score: number;
}

export interface CompetencyTest {
  id: string;
  school_id: string;
  competency_id: string;
  test_type: CompetencyTestType;
  title: string;
  description: string;
  criteria: CompetencyTestCriteria[];
  max_score: number;
  passing_score: number;
  duration_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface SkillMatrixEntry {
  skill_id: string;
  skill_name: string;
  level: SkillMatrixLevel;
  score: number;
  evidence: string;
  assessed_at: string;
  assessor_id: string;
}

export interface SkillMatrix {
  id: string;
  school_id: string;
  student_id: string;
  skills: SkillMatrixEntry[];
  overall_level: SkillMatrixLevel;
  last_assessed: string;
  created_at: string;
  updated_at: string;
}

export interface CompetencyLevelDef {
  level: number;
  name: string;
  description: string;
  criteria: string[];
}

export interface CompetencyLevelConfig {
  id: string;
  school_id: string;
  framework_id: string;
  levels: CompetencyLevelDef[];
  created_at: string;
}

export interface RubricLevel {
  score: number;
  label: string;
  description: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  levels: RubricLevel[];
  weight: number;
}

export interface CompetencyRubric {
  id: string;
  school_id: string;
  competency_id: string;
  title: string;
  criteria: RubricCriterion[];
  max_score: number;
  created_at: string;
  updated_at: string;
}

export interface PerformanceCriterion {
  name: string;
  description: string;
  weight: number;
  indicators: string[];
}

export interface PerformanceRubric {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  criteria: PerformanceCriterion[];
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: string;
  file_url: string | null;
  evidence_type: string;
  created_at: string;
}

export interface Portfolio {
  id: string;
  school_id: string;
  student_id: string;
  portfolio_type: PortfolioType;
  title: string;
  description: string;
  items: PortfolioItem[];
  shared: boolean;
  public_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PeerScore {
  criteria: string;
  score: number;
  comment: string;
}

export interface PeerAssessment {
  id: string;
  school_id: string;
  assessor_id: string;
  assessee_id: string;
  competency_id: string;
  scores: PeerScore[];
  comments: string;
  anonymous: boolean;
  created_at: string;
}

export interface SelfScore {
  criteria: string;
  score: number;
  justification: string;
}

export interface SelfAssessment {
  id: string;
  school_id: string;
  student_id: string;
  competency_id: string;
  self_scores: SelfScore[];
  reflection: string;
  goals: string[];
  created_at: string;
}

export interface TeacherScore {
  criteria: string;
  score: number;
  feedback: string;
}

export interface TeacherAssessment {
  id: string;
  school_id: string;
  teacher_id: string;
  student_id: string;
  competency_id: string;
  scores: TeacherScore[];
  comments: string;
  evidence: string[];
  created_at: string;
}

export interface ExternalAssessment {
  id: string;
  school_id: string;
  student_id: string;
  external_body: string;
  assessment_name: string;
  score: number;
  max_score: number;
  certificate_url: string | null;
  assessed_at: string;
  created_at: string;
}

export interface CompetencyReportEntry {
  competency_id: string;
  name: string;
  score: number;
  level: string;
  trend: string;
  gaps: string[];
}

export interface CompetencyReport {
  id: string;
  school_id: string;
  student_id: string;
  framework_id: string;
  competencies: CompetencyReportEntry[];
  overall_score: number;
  overall_level: string;
  generated_at: string;
}

export interface GapItem {
  skill: string;
  current_score: number;
  target_score: number;
  priority: string;
}

export interface GapAnalysis {
  id: string;
  school_id: string;
  student_id: string;
  current_level: string;
  target_level: string;
  gaps: GapItem[];
  recommendations: string[];
  created_at: string;
}

export interface SuggestedPath {
  path_id: string;
  path_name: string;
  match_score: number;
  estimated_duration: string;
}

export interface LearningPathSuggestion {
  id: string;
  school_id: string;
  student_id: string;
  suggested_paths: SuggestedPath[];
  based_on: string;
  created_at: string;
}

export interface CertificationEligibility {
  id: string;
  school_id: string;
  student_id: string;
  certification_id: string;
  eligible: boolean;
  requirements_met: string[];
  requirements_pending: string[];
  created_at: string;
}

export interface SkillEvolutionPoint {
  date: string;
  score: number;
  level: string;
  assessment_type: string;
}

export interface SkillEvolutionTracking {
  id: string;
  school_id: string;
  student_id: string;
  skill_id: string;
  history: SkillEvolutionPoint[];
  current_level: string;
  trend: string;
  created_at: string;
}

// ============================================================================
// Module 5 - National Examination Interfaces
// ============================================================================

export interface NationalExam {
  id: string;
  school_id: string;
  exam_type: NationalExamType;
  title: string;
  year: number;
  session: string;
  subjects: string[];
  total_marks: number;
  duration_minutes: number;
  status: string;
  created_at: string;
}

export interface ExamCenter {
  id: string;
  school_id: string;
  name: string;
  address: string;
  capacity: number;
  current_allocations: number;
  status: ExamCenterStatus;
  contact_person: string;
  phone: string;
  created_at: string;
}

export interface SeatAllocation {
  id: string;
  exam_id: string;
  center_id: string;
  candidate_id: string;
  seat_number: string;
  status: SeatAllocationStatus;
  allocated_at: string;
}

export interface CandidateRegistration {
  id: string;
  exam_id: string;
  student_id: string;
  registration_number: string;
  anonymous_number: string;
  status: CandidateRegistrationStatus;
  registered_at: string;
  created_at: string;
}

export interface AnonymousNumber {
  id: string;
  registration_id: string;
  anonymous_number: string;
  barcode: string;
  assigned_at: string;
}

export interface ExamDistribution {
  id: string;
  exam_id: string;
  center_id: string;
  subject: string;
  copies_count: number;
  status: ExamDistributionStatus;
  distributed_at: string | null;
}

export interface SecurePrinting {
  id: string;
  exam_id: string;
  center_id: string;
  document_type: string;
  copies_count: number;
  status: SecurePrintStatus;
  printed_at: string | null;
}

export interface CorrectionCenter {
  id: string;
  school_id: string;
  name: string;
  subjects: string[];
  markers_count: number;
  status: string;
  created_at: string;
}

export interface MarkerAssignment {
  id: string;
  exam_id: string;
  marker_id: string;
  center_id: string;
  subject: string;
  copies_count: number;
  status: MarkerAssignmentStatus;
  assigned_at: string;
  deadline: string;
}

export interface DoubleMarking {
  id: string;
  attempt_id: string;
  subject: string;
  first_marker_id: string;
  second_marker_id: string;
  first_score: number | null;
  second_score: number | null;
  final_score: number | null;
  status: DoubleMarkingStatus;
  created_at: string;
}

export interface ModerationAdjustment {
  student_id: string;
  original_score: number;
  adjusted_score: number;
  reason: string;
}

export interface Moderation {
  id: string;
  exam_id: string;
  moderator_id: string;
  subject: string;
  status: ModerationStatus;
  adjustments: ModerationAdjustment[];
  comments: string;
  created_at: string;
}

export interface Appeal {
  id: string;
  exam_id: string;
  student_id: string;
  subject: string;
  reason: string;
  status: AppealStatus;
  evidence: string[];
  decision: string | null;
  decided_by: string | null;
  decided_at: string | null;
  created_at: string;
}

export interface ResultsPublication {
  id: string;
  exam_id: string;
  status: ResultsPublicationStatus;
  published_at: string | null;
  published_by: string | null;
  created_at: string;
}

export interface RankingEntry {
  rank: number;
  student_id: string;
  anonymous_number: string;
  total_score: number;
  grade: string;
}

export interface ExamRanking {
  id: string;
  exam_id: string;
  ranking_type: RankingType;
  scope_id: string;
  rankings: RankingEntry[];
  generated_at: string;
}

export interface SubjectAnalytics {
  subject: string;
  average_score: number;
  pass_rate: number;
  highest_score: number;
  lowest_score: number;
}

export interface NationalAnalytics {
  id: string;
  exam_id: string;
  total_candidates: number;
  pass_rate: number;
  average_score: number;
  highest_score: number;
  lowest_score: number;
  subject_analytics: SubjectAnalytics[];
  generated_at: string;
}

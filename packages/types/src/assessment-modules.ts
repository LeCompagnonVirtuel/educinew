import { Certificate, SkillBadge } from './assessment-certification';

// ============================================================================
// Module 6 - Accreditation & Compliance
// ============================================================================

export enum AccreditationType {
  SCHOOL = 'SCHOOL',
  TEACHER = 'TEACHER',
  PROGRAM = 'PROGRAM',
  INSTITUTION = 'INSTITUTION',
}

export enum AccreditationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  ACCREDITED = 'ACCREDITED',
  DENIED = 'DENIED',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
}

export enum ComplianceStatus {
  COMPLIANT = 'COMPLIANT',
  NON_COMPLIANT = 'NON_COMPLIANT',
  PARTIAL = 'PARTIAL',
  PENDING_REVIEW = 'PENDING_REVIEW',
}

export enum AuditStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FOLLOW_UP = 'FOLLOW_UP',
}

export enum EvidenceStatus {
  SUBMITTED = 'SUBMITTED',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

export enum RecommendationType {
  MANDATORY = 'MANDATORY',
  RECOMMENDED = 'RECOMMENDED',
  OPTIONAL = 'OPTIONAL',
}

export enum CorrectiveActionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  OVERDUE = 'OVERDUE',
}

export interface SchoolAccreditation {
  id: string;
  school_id: string;
  accrediting_body: string;
  accreditation_type: AccreditationType;
  standards: AccreditationStandard[];
  status: AccreditationStatus;
  validity_start: string;
  validity_end: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccreditationStandard {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  score: number | null;
  status: ComplianceStatus;
}

export interface TeacherAccreditation {
  id: string;
  teacher_id: string;
  school_id: string;
  certification_body: string;
  certification_name: string;
  issued_at: string;
  expires_at: string | null;
  status: AccreditationStatus;
  created_at: string;
}

export interface ProgramAccreditation {
  id: string;
  school_id: string;
  program_name: string;
  accrediting_body: string;
  status: AccreditationStatus;
  standards: AccreditationStandard[];
  validity_start: string;
  validity_end: string | null;
  created_at: string;
}

export interface AuditFramework {
  id: string;
  school_id: string;
  name: string;
  framework_type: string;
  sections: AuditSection[];
  created_at: string;
}

export interface AuditSection {
  name: string;
  items: AuditItem[];
}

export interface AuditItem {
  id: string;
  description: string;
  evidence_required: boolean;
  compliance_status: ComplianceStatus;
}

export interface ComplianceCheck {
  id: string;
  school_id: string;
  framework_id: string;
  section: string;
  item: string;
  status: ComplianceStatus;
  evidence: string[];
  notes: string;
  checked_at: string;
  checked_by: string;
}

export interface EvidenceCollection {
  id: string;
  compliance_check_id: string;
  school_id: string;
  document_url: string;
  document_type: string;
  description: string;
  status: EvidenceStatus;
  submitted_at: string;
  verified_at: string | null;
}

export interface AccreditationReport {
  id: string;
  school_id: string;
  accreditation_id: string;
  overall_score: number;
  standards_results: StandardResult[];
  recommendations: string[];
  created_at: string;
}

export interface StandardResult {
  standard: string;
  score: number;
  status: ComplianceStatus;
  findings: string[];
}

export interface AccreditationRecommendation {
  id: string;
  report_id: string;
  type: RecommendationType;
  description: string;
  priority: string;
  deadline: string | null;
  created_at: string;
}

export interface CorrectiveAction {
  id: string;
  school_id: string;
  recommendation_id: string;
  description: string;
  responsible: string;
  deadline: string;
  status: CorrectiveActionStatus;
  evidence: string[];
  completed_at: string | null;
  created_at: string;
}

export interface RenewalWorkflow {
  id: string;
  accreditation_id: string;
  school_id: string;
  renewal_date: string;
  requirements: string[];
  status: string;
  created_at: string;
}

// ============================================================================
// Module 7 - Academic Integrity & AI Detection
// ============================================================================

export enum PlagiarismStatus {
  CLEAN = 'CLEAN',
  SUSPECTED = 'SUSPECTED',
  CONFIRMED = 'CONFIRMED',
  PARTIAL = 'PARTIAL',
}

export enum AIContentDetectionStatus {
  HUMAN = 'HUMAN',
  AI_GENERATED = 'AI_GENERATED',
  MIXED = 'MIXED',
  UNKNOWN = 'UNKNOWN',
}

export enum IntegrityRiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum IntegrityReportType {
  PLAGIARISM = 'PLAGIARISM',
  AI_DETECTION = 'AI_DETECTION',
  CHEATING = 'CHEATING',
  FORGERY = 'FORGERY',
  IDENTITY = 'IDENTITY',
}

export enum BehaviorAnomalyType {
  NONE = 'NONE',
  TAB_SWITCH = 'TAB_SWITCH',
  COPY_PASTE = 'COPY_PASTE',
  TIME_ANOMALY = 'TIME_ANOMALY',
  PATTERN_ANOMALY = 'PATTERN_ANOMALY',
}

export enum FraudType {
  IDENTITY_FRAUD = 'IDENTITY_FRAUD',
  CONTENT_FRAUD = 'CONTENT_FRAUD',
  COLLUSION = 'COLLUSION',
  IMPERSONATION = 'IMPERSONATION',
  TECHNICAL = 'TECHNICAL',
}

export interface PlagiarismDetection {
  id: string;
  school_id: string;
  student_id: string;
  submission_id: string;
  overall_score: number;
  sources: PlagiarismSource[];
  status: PlagiarismStatus;
  created_at: string;
}

export interface PlagiarismSource {
  url: string;
  title: string;
  match_percentage: number;
  matched_text: string;
  similarity_score: number;
}

export interface SimilarityDetection {
  id: string;
  school_id: string;
  document_a_id: string;
  document_b_id: string;
  similarity_score: number;
  matching_segments: string[];
  created_at: string;
}

export interface AIGeneratedContentDetection {
  id: string;
  school_id: string;
  submission_id: string;
  ai_probability: number;
  detected_sections: AISection[];
  model_used: string;
  status: AIContentDetectionStatus;
  created_at: string;
}

export interface AISection {
  text: string;
  ai_probability: number;
  start_offset: number;
  end_offset: number;
}

export interface CitationChecker {
  id: string;
  school_id: string;
  submission_id: string;
  citations: CitationItem[];
  missing_citations: string[];
  format_errors: string[];
  score: number;
  created_at: string;
}

export interface CitationItem {
  text: string;
  source: string;
  is_valid: boolean;
  format_correct: boolean;
}

export interface AcademicIntegrity {
  id: string;
  school_id: string;
  student_id: string;
  violation_type: string;
  description: string;
  evidence: string[];
  severity: IntegrityRiskLevel;
  reported_by: string;
  reported_at: string;
  status: string;
  resolved_at: string | null;
}

export interface FraudDetection {
  id: string;
  school_id: string;
  entity_type: string;
  entity_id: string;
  fraud_type: FraudType;
  confidence: number;
  evidence: string[];
  detected_at: string;
  reviewed: boolean;
}

export interface ForgeryDetection {
  id: string;
  school_id: string;
  document_type: string;
  document_url: string;
  is_genuine: boolean;
  confidence: number;
  indicators: string[];
  detected_at: string;
}

export interface IdentityVerification {
  id: string;
  school_id: string;
  student_id: string;
  verification_method: string;
  photo_url: string;
  id_document_url: string;
  matched: boolean;
  confidence: number;
  verified_at: string;
}

export interface BehaviorAnalysis {
  id: string;
  session_id: string;
  student_id: string;
  anomalies: BehaviorAnomaly[];
  risk_score: number;
  analysis: string;
  created_at: string;
}

export interface BehaviorAnomaly {
  type: BehaviorAnomalyType;
  timestamp: string;
  description: string;
  severity: string;
}

export interface IntegrityRiskScore {
  id: string;
  school_id: string;
  student_id: string;
  overall_score: number;
  factors: RiskFactor[];
  level: IntegrityRiskLevel;
  calculated_at: string;
}

export interface RiskFactor {
  factor: string;
  weight: number;
  score: number;
  description: string;
}

export interface IntegrityReport {
  id: string;
  school_id: string;
  report_type: IntegrityReportType;
  title: string;
  summary: string;
  findings: IntegrityFinding[];
  generated_at: string;
}

export interface IntegrityFinding {
  description: string;
  evidence: string[];
  severity: string;
  recommendation: string;
}

// ============================================================================
// Module 8 - Student Portfolio & Evidence
// ============================================================================

export enum PortfolioItemType {
  DOCUMENT = 'DOCUMENT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  PDF = 'PDF',
  CODE = 'CODE',
  LINK = 'LINK',
  CERTIFICATE = 'CERTIFICATE',
  PROJECT = 'PROJECT',
  RESEARCH = 'RESEARCH',
}

export enum PortfolioVisibility {
  PRIVATE = 'PRIVATE',
  SCHOOL = 'SCHOOL',
  PUBLIC = 'PUBLIC',
  SHARED = 'SHARED',
}

export enum PortfolioStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum MediaFormat {
  JPEG = 'JPEG',
  PNG = 'PNG',
  MP4 = 'MP4',
  MP3 = 'MP3',
  PDF = 'PDF',
  DOCX = 'DOCX',
}

export interface StudentPortfolio {
  id: string;
  school_id: string;
  student_id: string;
  title: string;
  description: string;
  items: PortfolioItemEntity[];
  visibility: PortfolioVisibility;
  status: PortfolioStatus;
  public_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PortfolioItemEntity {
  id: string;
  title: string;
  description: string;
  item_type: PortfolioItemType;
  file_url: string | null;
  tags: string[];
  created_at: string;
}

export interface TeacherPortfolio {
  id: string;
  school_id: string;
  teacher_id: string;
  title: string;
  items: PortfolioItemEntity[];
  qualifications: string[];
  experience: string[];
  publications: string[];
  created_at: string;
}

export interface CompetencyPortfolio {
  id: string;
  school_id: string;
  student_id: string;
  competency_id: string;
  evidence: PortfolioItemEntity[];
  reflections: string[];
  assessed: boolean;
  assessed_by: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  school_id: string;
  student_id: string;
  title: string;
  description: string;
  skills_demonstrated: string[];
  collaborators: string[];
  start_date: string;
  end_date: string | null;
  status: string;
  created_at: string;
}

export interface ResearchEntry {
  id: string;
  school_id: string;
  student_id: string;
  title: string;
  abstract: string;
  keywords: string[];
  file_url: string;
  supervisor: string;
  status: string;
  created_at: string;
}

export interface Internship {
  id: string;
  school_id: string;
  student_id: string;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string;
  supervisor: string;
  evaluation: string | null;
  created_at: string;
}

export interface MediaItem {
  id: string;
  school_id: string;
  student_id: string;
  title: string;
  media_type: MediaFormat;
  file_url: string;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  created_at: string;
}

export interface PortfolioSharing {
  id: string;
  portfolio_id: string;
  shared_with: string;
  permission: 'view' | 'edit';
  expires_at: string | null;
  created_at: string;
}

export interface PublicPortfolio {
  id: string;
  portfolio_id: string;
  public_url: string;
  view_count: number;
  last_viewed_at: string | null;
  created_at: string;
}

export interface PortfolioExport {
  id: string;
  portfolio_id: string;
  format: string;
  file_url: string | null;
  status: string;
  generated_at: string;
}

// ============================================================================
// Module 9 - Research & Innovation
// ============================================================================

export enum ResearchProjectStatus {
  PROPOSAL = 'PROPOSAL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum PublicationType {
  JOURNAL = 'JOURNAL',
  CONFERENCE = 'CONFERENCE',
  BOOK = 'BOOK',
  CHAPTER = 'CHAPTER',
  THESIS = 'THESIS',
  PATENT = 'PATENT',
}

export enum ResearchGrantStatus {
  APPLIED = 'APPLIED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  FUNDED = 'FUNDED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export enum CollaborationType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
  INTERNATIONAL = 'INTERNATIONAL',
  INDUSTRY = 'INDUSTRY',
}

export enum InnovationLabStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

export interface ResearchProject {
  id: string;
  school_id: string;
  title: string;
  description: string;
  principal_investigator: string;
  team_members: string[];
  start_date: string;
  end_date: string | null;
  budget: number;
  status: ResearchProjectStatus;
  created_at: string;
}

export interface InnovationLab {
  id: string;
  school_id: string;
  name: string;
  description: string;
  focus_areas: string[];
  equipment: string[];
  status: InnovationLabStatus;
  manager_id: string;
  created_at: string;
}

export interface Publication {
  id: string;
  school_id: string;
  title: string;
  authors: string[];
  publication_type: PublicationType;
  journal: string;
  volume: string;
  pages: string;
  doi: string;
  year: number;
  abstract: string;
  created_at: string;
}

export interface ResearchRepository {
  id: string;
  school_id: string;
  publications: Publication[];
  total_papers: number;
  total_citations: number;
  last_updated: string;
}

export interface ResearchGrant {
  id: string;
  school_id: string;
  title: string;
  funding_body: string;
  amount: number;
  currency: string;
  start_date: string;
  end_date: string;
  status: ResearchGrantStatus;
  project_id: string;
  created_at: string;
}

export interface ResearchTeam {
  id: string;
  school_id: string;
  name: string;
  leader_id: string;
  members: string[];
  research_areas: string[];
  created_at: string;
}

export interface ResearchAnalytics {
  id: string;
  school_id: string;
  total_projects: number;
  active_projects: number;
  total_publications: number;
  total_citations: number;
  h_index: number;
  funding_total: number;
  collaboration_count: number;
  generated_at: string;
}

export interface ResearchKPI {
  id: string;
  school_id: string;
  kpi_name: string;
  target: number;
  actual: number;
  unit: string;
  period: string;
  created_at: string;
}

export interface PatentTracking {
  id: string;
  school_id: string;
  title: string;
  inventors: string[];
  filing_date: string;
  grant_date: string | null;
  patent_number: string | null;
  status: string;
  created_at: string;
}

export interface ResearchCollaboration {
  id: string;
  school_id: string;
  partner_institution: string;
  collaboration_type: CollaborationType;
  project_id: string;
  start_date: string;
  end_date: string | null;
  status: string;
  created_at: string;
}

// ============================================================================
// Module 10 - International Standards & Recognition
// ============================================================================

export enum InternationalExamType {
  CAMBRIDGE = 'CAMBRIDGE',
  IB = 'IB',
  PEARSON = 'PEARSON',
  TOEFL = 'TOEFL',
  IELTS = 'IELTS',
  DELF = 'DELF',
  DALF = 'DALF',
  SAT = 'SAT',
  ACT = 'ACT',
}

export enum CreditSystem {
  ECTS = 'ECTS',
  US_CREDIT = 'US_CREDIT',
  UK_CREDIT = 'UK_CREDIT',
  NATIONAL = 'NATIONAL',
  CUSTOM = 'CUSTOM',
}

export enum RecognitionStatus {
  PENDING = 'PENDING',
  RECOGNIZED = 'RECOGNIZED',
  PARTIALLY_RECOGNIZED = 'PARTIALLY_RECOGNIZED',
  NOT_RECOGNIZED = 'NOT_RECOGNIZED',
}

export enum CreditTransferStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PARTIAL = 'PARTIAL',
}

export interface InternationalExam {
  id: string;
  school_id: string;
  exam_type: InternationalExamType;
  title: string;
  year: number;
  session: string;
  score: number;
  max_score: number;
  grade: string;
  certificate_url: string | null;
  created_at: string;
}

export interface InternationalCredits {
  id: string;
  school_id: string;
  student_id: string;
  credit_system: CreditSystem;
  total_credits: number;
  earned_credits: number;
  gpa: number;
  created_at: string;
}

export interface CreditTransfer {
  id: string;
  school_id: string;
  student_id: string;
  from_institution: string;
  to_institution: string;
  credits_transferred: number;
  status: CreditTransferStatus;
  evaluated_at: string | null;
  created_at: string;
}

export interface RecognitionEngine {
  id: string;
  school_id: string;
  student_id: string;
  qualification: string;
  issuing_body: string;
  country: string;
  recognition_status: RecognitionStatus;
  equivalent_local: string | null;
  evaluated_at: string;
  created_at: string;
}

// ============================================================================
// Module 11 - AI-Powered Assessment Features
// ============================================================================

export enum AssessmentAIAction {
  FEEDBACK = 'FEEDBACK',
  WEAKNESS_DETECTION = 'WEAKNESS_DETECTION',
  SUGGESTION = 'SUGGESTION',
  DIFFICULTY_ADJUSTMENT = 'DIFFICULTY_ADJUSTMENT',
  PREDICTION = 'PREDICTION',
  RISK_DETECTION = 'RISK_DETECTION',
}

export enum FeedbackType {
  IMMEDIATE = 'IMMEDIATE',
  DELAYED = 'DELAYED',
  DETAILED = 'DETAILED',
  SUMMARY = 'SUMMARY',
  CORRECTIVE = 'CORRECTIVE',
}

export enum PredictionType {
  EXAM_RESULT = 'EXAM_RESULT',
  CERTIFICATION_SUCCESS = 'CERTIFICATION_SUCCESS',
  RISK = 'RISK',
  PERFORMANCE = 'PERFORMANCE',
}

export enum ModerationAIType {
  CONTENT_REVIEW = 'CONTENT_REVIEW',
  GRADING_REVIEW = 'GRADING_REVIEW',
  INTEGRITY_CHECK = 'INTEGRITY_CHECK',
  BIAS_DETECTION = 'BIAS_DETECTION',
}

export enum InvigilatorAIAction {
  FACE_CHECK = 'FACE_CHECK',
  BEHAVIOR_SCAN = 'BEHAVIOR_SCAN',
  ANOMALY_ALERT = 'ANOMALY_ALERT',
  SCREEN_CHECK = 'SCREEN_CHECK',
  AUDIO_CHECK = 'AUDIO_CHECK',
}

export interface AssessmentAI {
  id: string;
  school_id: string;
  action: AssessmentAIAction;
  entity_type: string;
  entity_id: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  confidence: number;
  model_used: string;
  created_at: string;
}

export interface AutoFeedback {
  id: string;
  school_id: string;
  student_id: string;
  submission_id: string;
  feedback_text: string;
  feedback_type: FeedbackType;
  criteria_scores: FeedbackCriteria[];
  generated_at: string;
}

export interface FeedbackCriteria {
  criteria: string;
  score: number;
  feedback: string;
}

export interface AIWeaknessDetection {
  id: string;
  school_id: string;
  student_id: string;
  weaknesses: AIWeakness[];
  overall_risk: string;
  created_at: string;
}

export interface AIWeakness {
  topic: string;
  severity: string;
  evidence: string;
  recommendation: string;
}

export interface LearningSuggestion {
  id: string;
  school_id: string;
  student_id: string;
  suggestions: SuggestionItem[];
  based_on: string;
  created_at: string;
}

export interface SuggestionItem {
  type: string;
  title: string;
  description: string;
  resource_url: string | null;
  priority: number;
}

export interface ExamPrediction {
  id: string;
  school_id: string;
  student_id: string;
  exam_id: string;
  predicted_score: number;
  confidence: number;
  factors: string[];
  created_at: string;
}

export interface CertificationRecommendation {
  id: string;
  school_id: string;
  student_id: string;
  recommended_certifications: RecommendedCert[];
  based_on: string;
  created_at: string;
}

export interface RecommendedCert {
  certification_id: string;
  name: string;
  match_score: number;
  reason: string;
}

export interface PerformanceForecast {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  forecast_score: number;
  confidence: number;
  trend: string;
  factors: string[];
  created_at: string;
}

export interface RiskDetectionAI {
  id: string;
  school_id: string;
  student_id: string;
  risk_type: string;
  probability: number;
  factors: string[];
  mitigation: string[];
  created_at: string;
}

export interface SmartRubric {
  id: string;
  school_id: string;
  title: string;
  criteria: SmartRubricCriterion[];
  ai_generated: boolean;
  created_at: string;
}

export interface SmartRubricCriterion {
  name: string;
  description: string;
  weight: number;
  levels: string[];
  ai_suggested: boolean;
}

export interface AIModeration {
  id: string;
  exam_id: string;
  moderation_type: ModerationAIType;
  results: ModerationResult[];
  overall_score: number;
  created_at: string;
}

export interface ModerationResult {
  item: string;
  score: number;
  status: string;
  details: string;
}

export interface AIInvigilator {
  id: string;
  exam_id: string;
  session_id: string;
  actions: InvigilatorAction[];
  alerts: InvigilatorAlert[];
  created_at: string;
}

export interface InvigilatorAction {
  action: InvigilatorAIAction;
  timestamp: string;
  result: string;
  confidence: number;
}

export interface InvigilatorAlert {
  type: string;
  severity: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

// ============================================================================
// Mobile + Shared Interfaces
// ============================================================================

export interface AssessmentDashboard {
  id: string;
  school_id: string;
  total_exams: number;
  active_exams: number;
  total_students: number;
  average_score: number;
  pass_rate: number;
  recent_assessments: RecentAssessment[];
  generated_at: string;
}

export interface RecentAssessment {
  exam_id: string;
  title: string;
  date: string;
  score: number | null;
  status: string;
}

export interface ExamTakingState {
  exam_id: string;
  student_id: string;
  current_question_index: number;
  answers: Record<string, string>;
  time_remaining_seconds: number;
  is_paused: boolean;
  started_at: string;
}

export interface CertificateWallet {
  student_id: string;
  certificates: Certificate[];
  badges: SkillBadge[];
  total_credits: number;
  last_updated: string;
}

export interface IntegrityDashboard {
  school_id: string;
  total_checks: number;
  violations_found: number;
  high_risk_students: number;
  recent_reports: IntegrityReport[];
  generated_at: string;
}

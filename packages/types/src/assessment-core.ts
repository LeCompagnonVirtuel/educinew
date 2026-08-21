export enum ExamType {
  ADAPTIVE = 'ADAPTIVE',
  STATIC = 'STATIC',
  DIAGNOSTIC = 'DIAGNOSTIC',
  FORMATIVE = 'FORMATIVE',
  SUMMATIVE = 'SUMMATIVE',
  CERTIFICATION = 'CERTIFICATION',
  NATIONAL = 'NATIONAL',
}

export enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
  FILL_BLANK = 'FILL_BLANK',
  SHORT_ANSWER = 'SHORT_ANSWER',
  ESSAY = 'ESSAY',
  CODING = 'CODING',
  PRACTICAL = 'PRACTICAL',
  ORAL = 'ORAL',
  MATCHING = 'MATCHING',
  ORDERING = 'ORDERING',
  DIAGRAM = 'DIAGRAM',
  CASE_STUDY = 'CASE_STUDY',
}

export enum DifficultyLevel {
  VERY_EASY = 'VERY_EASY',
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  VERY_HARD = 'VERY_HARD',
  ADAPTIVE = 'ADAPTIVE',
}

export enum GradingMethod {
  AUTO = 'AUTO',
  SEMI_AUTO = 'SEMI_AUTO',
  MANUAL = 'MANUAL',
  AI_POWERED = 'AI_POWERED',
  RUBRIC_BASED = 'RUBRIC_BASED',
}

export enum ExamStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED',
}

export enum AttemptStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  GRADED = 'GRADED',
  REVIEWED = 'REVIEWED',
  APPEALED = 'APPEALED',
}

export enum ProctoringMode {
  NONE = 'NONE',
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED',
  AI_SUPERVISED = 'AI_SUPERVISED',
}

export enum CheatingIndicator {
  NONE = 'NONE',
  SUSPICIOUS = 'SUSPICIOUS',
  CONFIRMED = 'CONFIRMED',
  FALSE_POSITIVE = 'FALSE_POSITIVE',
}

export enum SecureBrowserLevel {
  NONE = 'NONE',
  BASIC = 'BASIC',
  LOCKDOWN = 'LOCKDOWN',
  FULL_ISOLATION = 'FULL_ISOLATION',
}

export enum QuestionDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EXPERT = 'EXPERT',
  AUTO_ADAPTIVE = 'AUTO_ADAPTIVE',
}

export enum ExamSessionStatus {
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum QuestionStatus {
  DRAFT = 'DRAFT',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ARCHIVED = 'ARCHIVED',
}

export enum QuestionApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REVISION_NEEDED = 'REVISION_NEEDED',
}

export enum QuestionSource {
  AI_GENERATED = 'AI_GENERATED',
  TEACHER_CREATED = 'TEACHER_CREATED',
  BANK_IMPORTED = 'BANK_IMPORTED',
  OCR_SCANNED = 'OCR_SCANNED',
  TRANSLATED = 'TRANSLATED',
}

export enum QuestionFormat {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
  INTERACTIVE = 'INTERACTIVE',
  CODE = 'CODE',
  LATEX = 'LATEX',
}

export enum QuestionCategory {
  ACADEMIC = 'ACADEMIC',
  PROFESSIONAL = 'PROFESSIONAL',
  CERTIFICATION = 'CERTIFICATION',
  NATIONAL = 'NATIONAL',
  CUSTOM = 'CUSTOM',
}

export enum QuestionTagType {
  TOPIC = 'TOPIC',
  SKILL = 'SKILL',
  COMPETENCY = 'COMPETENCY',
  BLOOM_LEVEL = 'BLOOM_LEVEL',
  DIFFICULTY = 'DIFFICULTY',
  SOURCE = 'SOURCE',
}

export enum QuestionVersionStatus {
  DRAFT = 'DRAFT',
  CURRENT = 'CURRENT',
  DEPRECATED = 'DEPRECATED',
  ARCHIVED = 'ARCHIVED',
}

export enum QuestionReviewStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ImportFormat {
  CSV = 'CSV',
  EXCEL = 'EXCEL',
  JSON = 'JSON',
  QTI = 'QTI',
  DOCX = 'DOCX',
  PDF = 'PDF',
  IMAGE = 'IMAGE',
}

export enum ExportFormat {
  CSV = 'CSV',
  EXCEL = 'EXCEL',
  JSON = 'JSON',
  QTI = 'QTI',
  PDF = 'PDF',
  DOCX = 'DOCX',
}

export enum BulkOperationType {
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  MOVE = 'MOVE',
  TAG = 'TAG',
  DIFFICULTY = 'DIFFICULTY',
  STATUS = 'STATUS',
}

export enum OCRStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum TranslationStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REVIEW_NEEDED = 'REVIEW_NEEDED',
}

export enum DuplicateStatus {
  NONE = 'NONE',
  SUSPECTED = 'SUSPECTED',
  CONFIRMED = 'CONFIRMED',
  UNIQUE = 'UNIQUE',
}

export interface AIQuestionGenerator {
  id: string;
  school_id: string;
  subject_id: string;
  topic: string;
  question_type: QuestionType;
  difficulty: QuestionDifficulty;
  count: number;
  generated_questions: GeneratedQuestion[];
  model_used: string;
  created_at: string;
}

export interface GeneratedQuestion {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  correct_answer: string;
  difficulty: QuestionDifficulty;
  explanation: string;
  points: number;
  topic_id: string;
  bloom_level: string;
  confidence: number;
}

export interface AdaptiveExam {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  description: string;
  exam_type: ExamType;
  max_questions: number;
  time_limit_minutes: number;
  passing_score: number;
  difficulty_range: [number, number];
  algorithm: string;
  status: ExamStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface DynamicQuestionDifficulty {
  id: string;
  exam_id: string;
  student_id: string;
  current_difficulty: number;
  adjustment_history: DifficultyAdjustment[];
  algorithm_version: string;
  created_at: string;
}

export interface DifficultyAdjustment {
  timestamp: string;
  previous: number;
  new_difficulty: number;
  reason: string;
  score: number;
}

export interface AutomaticGrading {
  id: string;
  exam_id: string;
  attempt_id: string;
  student_id: string;
  total_score: number;
  max_score: number;
  percentage: number;
  grade: string;
  breakdown: GradingBreakdown[];
  graded_at: string;
  method: GradingMethod;
}

export interface GradingBreakdown {
  section: string;
  score: number;
  max_score: number;
  feedback: string;
}

export interface EssayEvaluationAI {
  id: string;
  school_id: string;
  student_id: string;
  essay_text: string;
  criteria: EssayCriteriaResult[];
  overall_score: number;
  overall_feedback: string;
  grammar_score: number;
  vocabulary_score: number;
  structure_score: number;
  argument_score: number;
  creativity_score: number;
  evaluated_at: string;
}

export interface EssayCriteriaResult {
  criteria: string;
  score: number;
  max_score: number;
  feedback: string;
}

export interface CodingAssessment {
  id: string;
  school_id: string;
  student_id: string;
  problem_statement: string;
  language: string;
  solution_code: string;
  test_results: TestResult[];
  score: number;
  execution_time_ms: number;
  memory_usage_mb: number;
  evaluated_at: string;
}

export interface TestResult {
  test_id: string;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  execution_time_ms: number;
}

export interface PracticalAssessment {
  id: string;
  school_id: string;
  student_id: string;
  activity: string;
  criteria: PracticalCriteriaResult[];
  overall_score: number;
  evidence_urls: string[];
  feedback: string;
  evaluated_at: string;
}

export interface PracticalCriteriaResult {
  criteria: string;
  score: number;
  max_score: number;
  feedback: string;
  evidence: string;
}

export interface OralExamination {
  id: string;
  school_id: string;
  student_id: string;
  topic: string;
  duration_minutes: number;
  questions: OralQuestion[];
  criteria: OralCriteriaResult[];
  overall_score: number;
  feedback: string;
  recorded_audio_url: string;
  evaluated_at: string;
}

export interface OralQuestion {
  question: string;
  student_answer: string;
  score: number;
  feedback: string;
}

export interface OralCriteriaResult {
  criteria: string;
  score: number;
  max_score: number;
  feedback: string;
}

export interface ExamBlueprint {
  id: string;
  school_id: string;
  exam_id: string;
  sections: BlueprintSection[];
  total_points: number;
  total_duration_minutes: number;
  created_at: string;
}

export interface BlueprintSection {
  name: string;
  question_type: QuestionType;
  question_count: number;
  points_per_question: number;
  difficulty_distribution: Record<string, number>;
}

export interface QuestionRandomizer {
  id: string;
  exam_id: string;
  student_id: string;
  randomized_questions: string[];
  seed: number;
  created_at: string;
}

export interface QuestionPool {
  id: string;
  school_id: string;
  name: string;
  subject_id: string;
  description: string;
  question_count: number;
  difficulty_range: [number, number];
  created_at: string;
  updated_at: string;
}

export interface ExamSession {
  id: string;
  exam_id: string;
  student_id: string;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number;
  status: ExamSessionStatus;
  proctor_id: string | null;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export interface ExamAttempt {
  id: string;
  exam_id: string;
  student_id: string;
  session_id: string;
  answers: AttemptAnswer[];
  score: number | null;
  max_score: number;
  percentage: number | null;
  grade: string | null;
  started_at: string;
  submitted_at: string | null;
  status: AttemptStatus;
  created_at: string;
}

export interface AttemptAnswer {
  question_id: string;
  answer: string;
  is_correct: boolean | null;
  score: number | null;
  time_spent_seconds: number;
  hints_used: number;
}

export interface ExamReplay {
  id: string;
  attempt_id: string;
  student_id: string;
  answers: AttemptAnswer[];
  timestamp: string;
  duration_seconds: number;
}

export interface SecureBrowser {
  id: string;
  exam_id: string;
  level: SecureBrowserLevel;
  blocked_apps: string[];
  blocked_urls: string[];
  clipboard_disabled: boolean;
  screen_capture_disabled: boolean;
  created_at: string;
}

export interface ProctoringAI {
  id: string;
  exam_id: string;
  session_id: string;
  mode: ProctoringMode;
  face_detection_enabled: boolean;
  eye_tracking_enabled: boolean;
  audio_monitoring_enabled: boolean;
  screen_recording_enabled: boolean;
  alerts: ProctoringAlert[];
  created_at: string;
}

export interface ProctoringAlert {
  id: string;
  type: string;
  severity: string;
  description: string;
  timestamp: string;
  screenshot_url: string | null;
}

export interface CheatingDetection {
  id: string;
  exam_id: string;
  student_id: string;
  indicators: CheatingIndicator;
  confidence: number;
  evidence: string[];
  description: string;
  detected_at: string;
  reviewed: boolean;
  reviewed_by: string | null;
  reviewed_at: string | null;
}

export interface FaceVerification {
  id: string;
  student_id: string;
  exam_id: string;
  photo_url: string;
  matched: boolean;
  confidence: number;
  verified_at: string;
}

export interface ScreenMonitoring {
  id: string;
  session_id: string;
  screenshots: ScreenCapture[];
  tab_switches: number;
  fullscreen_violations: number;
  created_at: string;
}

export interface ScreenCapture {
  url: string;
  timestamp: string;
  active_window: string;
}

export interface MicrophoneMonitoring {
  id: string;
  session_id: string;
  noise_level: number;
  voice_detected: boolean;
  anomaly_detected: boolean;
  recordings: string[];
  created_at: string;
}

export interface ExamLockdown {
  id: string;
  exam_id: string;
  enabled: boolean;
  block_copy_paste: boolean;
  block_new_tabs: boolean;
  block_right_click: boolean;
  time_limit_enforced: boolean;
  created_at: string;
}

export interface QuestionCategoryEntity {
  id: string;
  school_id: string;
  name: string;
  description: string;
  parent_id: string | null;
  question_count: number;
  created_at: string;
  updated_at: string;
}

export interface QuestionTag {
  id: string;
  school_id: string;
  name: string;
  type: QuestionTagType;
  color: string;
  usage_count: number;
  created_at: string;
}

export interface QuestionDifficultyConfig {
  id: string;
  school_id: string;
  subject_id: string;
  difficulty_levels: DifficultyConfig[];
  adaptive_enabled: boolean;
  created_at: string;
}

export interface DifficultyConfig {
  level: string;
  min_score: number;
  max_score: number;
  label: string;
}

export interface QuestionMetadata {
  id: string;
  question_id: string;
  bloom_level: string;
  estimated_time_seconds: number;
  success_rate: number;
  average_score: number;
  times_used: number;
  last_used_at: string | null;
  created_at: string;
}

export interface QuestionLearningObjective {
  id: string;
  question_id: string;
  objective_id: string;
  objective_name: string;
  weight: number;
}

export interface QuestionCompetencyMapping {
  id: string;
  question_id: string;
  competency_id: string;
  competency_name: string;
  level: string;
  weight: number;
}

export interface QuestionBloomTaxonomy {
  id: string;
  question_id: string;
  level: string;
  cognitive_process: string;
  description: string;
}

export interface QuestionVersion {
  id: string;
  question_id: string;
  version_number: number;
  content: Record<string, unknown>;
  created_by: string;
  created_at: string;
  status: QuestionVersionStatus;
}

export interface QuestionApprovalWorkflow {
  id: string;
  question_id: string;
  submitted_by: string;
  submitted_at: string;
  reviewers: QuestionReviewer[];
  status: QuestionApprovalStatus;
  current_step: number;
  created_at: string;
}

export interface QuestionReviewer {
  reviewer_id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_at: string | null;
  comments: string;
}

export interface QuestionReview {
  id: string;
  question_id: string;
  reviewer_id: string;
  rating: number;
  comments: string;
  suggestions: string[];
  created_at: string;
}

export interface QuestionStatistics {
  id: string;
  question_id: string;
  times_used: number;
  correct_rate: number;
  average_score: number;
  average_time_seconds: number;
  discrimination_index: number;
  difficulty_index: number;
  last_analyzed_at: string;
}

export interface QuestionReuseLog {
  id: string;
  question_id: string;
  reused_in_exam_id: string;
  reused_at: string;
  times_reused: number;
}

export interface ImportQuestionJob {
  id: string;
  school_id: string;
  file_name: string;
  format: ImportFormat;
  total_questions: number;
  imported: number;
  failed: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  errors: string[];
  created_at: string;
}

export interface ExportQuestionJob {
  id: string;
  school_id: string;
  format: ExportFormat;
  question_ids: string[];
  file_url: string | null;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

export interface BulkEditJob {
  id: string;
  school_id: string;
  operation: BulkOperationType;
  question_ids: string[];
  changes: Record<string, unknown>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

export interface OCRQuestionImport {
  id: string;
  school_id: string;
  image_url: string;
  extracted_questions: GeneratedQuestion[];
  status: OCRStatus;
  confidence: number;
  created_at: string;
}

export interface AIQuestionGeneration {
  id: string;
  school_id: string;
  prompt: string;
  subject_id: string;
  count: number;
  generated_questions: GeneratedQuestion[];
  model_used: string;
  tokens_used: number;
  created_at: string;
}

export interface QuestionTranslation {
  id: string;
  question_id: string;
  source_language: string;
  target_language: string;
  translated_text: string;
  status: TranslationStatus;
  translated_by: string | null;
  created_at: string;
}

export interface QuestionValidation {
  id: string;
  question_id: string;
  is_valid: boolean;
  errors: string[];
  warnings: string[];
  validated_at: string;
}

export interface DuplicateDetection {
  id: string;
  school_id: string;
  question_id: string;
  duplicate_of: string | null;
  similarity_score: number;
  status: DuplicateStatus;
  detected_at: string;
}

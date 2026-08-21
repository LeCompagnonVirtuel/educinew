// ============================================================================
// Phase 3.2 – Modules 6-9: Adaptive Recommendations, Competency Framework,
// Learning Content Engine, Assessment Intelligence
// ============================================================================

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export enum RecommendationCategory {
  LESSON = 'lesson',
  VIDEO = 'video',
  BOOK = 'book',
  EXERCISE = 'exercise',
  PROJECT = 'project',
  GROUP = 'group',
  TUTOR = 'tutor',
  EXAM = 'exam',
}

export enum RecommendationReason {
  WEAKNESS = 'weakness',
  INTEREST = 'interest',
  GOAL = 'goal',
  PEER_CHOICE = 'peer_choice',
  TEACHER_PICK = 'teacher_pick',
  ALGORITHM = 'algorithm',
}

export enum ContentFormat {
  TEXT = 'text',
  VIDEO = 'video',
  AUDIO = 'audio',
  INTERACTIVE = 'interactive',
  PDF = 'pdf',
  IMAGE = 'image',
  SIMULATION = 'simulation',
  VR = 'vr',
  AR = 'ar',
}

export enum FrameworkType {
  CBC = 'cbc',
  APC = 'apc',
  BLOOM = 'bloom',
  UNESCO = 'unesco',
  CAMBRIDGE = 'cambridge',
  IB = 'ib',
  NATIONAL = 'national',
  CUSTOM = 'custom',
}

export enum CompetencyCategory {
  KNOWLEDGE = 'knowledge',
  SKILL = 'skill',
  ATTITUDE = 'attitude',
  VALUES = 'values',
  DISPOSITION = 'disposition',
}

export enum FrameworkLevel {
  FOUNDATION = 'foundation',
  DEVELOPING = 'developing',
  PROFICIENT = 'proficient',
  ADVANCED = 'advanced',
  MASTERY = 'mastery',
}

export enum FrameworkSubject {
  MATHEMATICS = 'mathematics',
  SCIENCE = 'science',
  ENGLISH = 'english',
  FRENCH = 'french',
  SOCIAL_STUDIES = 'social_studies',
  CREATIVE_ARTS = 'creative_arts',
  TECHNICAL = 'technical',
  LIFESKILLS = 'lifeskills',
}

export enum ContentType {
  DIGITAL_LESSON = 'digital_lesson',
  INTERACTIVE_LESSON = 'interactive_lesson',
  SIMULATION = 'simulation',
  VIRTUAL_LAB = 'virtual_lab',
  AR_LESSON = 'ar_lesson',
  VR_LESSON = 'vr_lesson',
  VIDEO = 'video',
  AUDIO_LESSON = 'audio_lesson',
  PODCAST = 'podcast',
  INTERACTIVE_PDF = 'interactive_pdf',
  FLASHCARD = 'flashcard',
  MIND_MAP = 'mind_map',
}

export enum LessonFormat {
  SLIDE = 'slide',
  VIDEO = 'video',
  SCORM = 'scorm',
  H5P = 'h5p',
  HTML5 = 'html5',
  PDF = 'pdf',
}

export enum SimulationType {
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  BIOLOGY = 'biology',
  MATH = 'math',
  ENGINEERING = 'engineering',
  LANGUAGE = 'language',
}

export enum AssessmentType {
  ADAPTIVE = 'adaptive',
  COMPETENCY = 'competency',
  AI_CORRECTION = 'ai_correction',
  RUBRIC = 'rubric',
  AUTO_GRADING = 'auto_grading',
  ESSAY = 'essay',
  ORAL = 'oral',
  PRACTICAL = 'practical',
}

export enum GradingMethod {
  AUTO = 'auto',
  SEMI_AUTO = 'semi_auto',
  MANUAL = 'manual',
  AI_POWERED = 'ai_powered',
}

export enum RubricType {
  ANALYTIC = 'analytic',
  HOLISTIC = 'holistic',
  SINGLE_SCALE_CHECKLIST = 'single_scale_checklist',
}

export enum QuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
  EXPERT = 'expert',
  AUTO = 'auto',
}

export enum ExamFormat {
  MCQ = 'mcq',
  ESSAY = 'essay',
  MIXED = 'mixed',
  ADAPTIVE = 'adaptive',
  OPEN_BOOK = 'open_book',
}

export enum EssayCriteria {
  GRAMMAR = 'grammar',
  VOCABULARY = 'vocabulary',
  STRUCTURE = 'structure',
  ARGUMENT = 'argument',
  CREATIVITY = 'creativity',
  COHERENCE = 'coherence',
}

export enum OralCriteria {
  FLUENCY = 'fluency',
  ACCURACY = 'accuracy',
  VOCABULARY = 'vocabulary',
  PRONUNCIATION = 'pronunciation',
  COMPREHENSION = 'comprehension',
}

export enum PracticalCriteria {
  PROCEDURE = 'procedure',
  ACCURACY = 'accuracy',
  SAFETY = 'safety',
  EFFICIENCY = 'efficiency',
  REPORT = 'report',
}

// ---------------------------------------------------------------------------
// Module 6 – Smart Recommendations
// ---------------------------------------------------------------------------

export interface RecommendedLesson {
  id: string;
  school_id: string;
  student_id: string;
  lesson_id: string;
  title: string;
  subject: string;
  reason: RecommendationReason;
  confidence_score: number;
  priority: number;
  format: ContentFormat;
  created_at: string;
}

export interface RecommendedVideo {
  id: string;
  school_id: string;
  student_id: string;
  video_id: string;
  title: string;
  subject: string;
  duration_minutes: number;
  reason: RecommendationReason;
  confidence_score: number;
  created_at: string;
}

export interface RecommendedBook {
  id: string;
  school_id: string;
  student_id: string;
  book_id: string;
  title: string;
  author: string;
  subject: string;
  reason: RecommendationReason;
  created_at: string;
}

export interface RecommendedExercise {
  id: string;
  school_id: string;
  student_id: string;
  exercise_id: string;
  title: string;
  skill_id: string;
  difficulty: QuestionDifficulty;
  reason: RecommendationReason;
  estimated_minutes: number;
  created_at: string;
}

export interface RecommendedProject {
  id: string;
  school_id: string;
  student_id: string;
  project_id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: QuestionDifficulty;
  estimated_hours: number;
  created_at: string;
}

export interface RecommendedGroup {
  id: string;
  school_id: string;
  student_id: string;
  group_id: string;
  group_name: string;
  members_count: number;
  compatibility_score: number;
  reason: RecommendationReason;
  created_at: string;
}

export interface RecommendedTutor {
  id: string;
  school_id: string;
  student_id: string;
  tutor_id: string;
  tutor_name: string;
  subject: string;
  match_score: number;
  reason: RecommendationReason;
  created_at: string;
}

export interface RecommendedExam {
  id: string;
  school_id: string;
  student_id: string;
  exam_id: string;
  title: string;
  subject: string;
  difficulty: QuestionDifficulty;
  reason: RecommendationReason;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Module 7 – Competency Framework
// ---------------------------------------------------------------------------

export interface CompetencyFramework {
  id: string;
  school_id: string;
  name: string;
  framework_type: FrameworkType;
  subjects: FrameworkSubject[];
  levels: FrameworkLevel[];
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FrameworkCompetency {
  id: string;
  framework_id: string;
  name: string;
  code: string;
  description: string;
  category: CompetencyCategory;
  subject: FrameworkSubject;
  level: FrameworkLevel;
  indicators: string[];
  created_at: string;
}

export interface FrameworkProgress {
  id: string;
  framework_id: string;
  student_id: string;
  competencies_completed: number;
  competencies_total: number;
  percentage: number;
  level_achieved: FrameworkLevel;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Module 8 – Learning Content Engine
// ---------------------------------------------------------------------------

export interface DigitalLesson {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  grade_level: string;
  format: LessonFormat;
  content_url: string;
  duration_minutes: number;
  difficulty: QuestionDifficulty;
  learning_objectives: string[];
  created_at: string;
  updated_at: string;
}

export interface InteractiveComponent {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
}

export interface InteractiveLesson {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  components: InteractiveComponent[];
  estimated_minutes: number;
  difficulty: QuestionDifficulty;
  created_at: string;
}

export interface Simulation {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  simulation_type: SimulationType;
  parameters: Record<string, unknown>;
  difficulty: QuestionDifficulty;
  created_at: string;
}

export interface VirtualLab {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  lab_type: string;
  experiments: string[];
  equipment_needed: string[];
  created_at: string;
}

export interface ARLesson {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  ar_model_url: string;
  instructions: string;
  learning_objectives: string[];
  created_at: string;
}

export interface VRLesson {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  vr_scene_url: string;
  duration_minutes: number;
  learning_objectives: string[];
  created_at: string;
}

export interface VideoChapter {
  title: string;
  start_time_seconds: number;
  end_time_seconds: number;
}

export interface VideoLesson {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  video_url: string;
  duration_minutes: number;
  subtitles: boolean;
  chapters: VideoChapter[];
  created_at: string;
}

export interface AudioLesson {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  audio_url: string;
  duration_minutes: number;
  transcript: string;
  created_at: string;
}

export interface Podcast {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  episode_number: number;
  audio_url: string;
  duration_minutes: number;
  description: string;
  created_at: string;
}

export interface InteractivePDF {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  pdf_url: string;
  interactive_elements: string[];
  created_at: string;
}

export interface Flashcard {
  id: string;
  school_id: string;
  front: string;
  back: string;
  subject_id: string;
  tags: string[];
  difficulty: QuestionDifficulty;
  created_at: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface MindMapEdge {
  source: string;
  target: string;
}

export interface MindMap {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  created_at: string;
}

// ---------------------------------------------------------------------------
// Module 9 – Assessment Intelligence
// ---------------------------------------------------------------------------

export type QuestionType = 'mcq' | 'essay' | 'practical' | 'oral' | 'coding' | 'fill_blank' | 'true_false';

export interface AssessmentQuestion {
  id: string;
  question_text: string;
  type: QuestionType;
  options: string[];
  correct_answer: string;
  difficulty: QuestionDifficulty;
  points: number;
  estimated_seconds: number;
  topic_id: string;
}

export interface AdaptiveExam {
  id: string;
  school_id: string;
  title: string;
  subject_id: string;
  student_id: string;
  questions: AssessmentQuestion[];
  current_difficulty: QuestionDifficulty;
  algorithm: string;
  status: string;
  score: number;
  created_at: string;
  completed_at: string;
}

export interface CompetencyExamResult {
  competency_id: string;
  score: number;
  level: string;
  evidence: string;
}

export interface CompetencyExam {
  id: string;
  school_id: string;
  title: string;
  framework_id: string;
  competencies: string[];
  student_id: string;
  results: CompetencyExamResult[];
  created_at: string;
}

export interface CriteriaScore {
  criteria: string;
  score: number;
  max_score: number;
  feedback: string;
}

export interface AICorrection {
  id: string;
  exam_id: string;
  question_id: string;
  student_answer: string;
  score: number;
  max_score: number;
  feedback: string;
  criteria_scores: CriteriaScore[];
  corrected_at: string;
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

export interface Rubric {
  id: string;
  school_id: string;
  title: string;
  type: RubricType;
  criteria: RubricCriterion[];
  created_at: string;
  updated_at: string;
}

export interface GradeBreakdown {
  section: string;
  score: number;
  max_score: number;
  percentage: number;
}

export interface AutoGradingResult {
  id: string;
  exam_id: string;
  student_id: string;
  total_score: number;
  max_score: number;
  percentage: number;
  grade: string;
  breakdown: GradeBreakdown[];
  generated_at: string;
}

export interface EssayCriteriaResult {
  criteria: EssayCriteria;
  score: number;
  max_score: number;
  feedback: string;
}

export interface EssayEvaluation {
  id: string;
  school_id: string;
  student_id: string;
  essay_text: string;
  criteria: EssayCriteriaResult[];
  overall_score: number;
  overall_feedback: string;
  evaluated_at: string;
}

export interface OralCriteriaResult {
  criteria: OralCriteria;
  score: number;
  max_score: number;
  feedback: string;
}

export interface OralEvaluation {
  id: string;
  school_id: string;
  student_id: string;
  topic: string;
  duration_minutes: number;
  criteria: OralCriteriaResult[];
  overall_score: number;
  feedback: string;
  evaluated_at: string;
}

export interface PracticalCriteriaResult {
  criteria: PracticalCriteria;
  score: number;
  max_score: number;
  feedback: string;
}

export interface PracticalEvaluation {
  id: string;
  school_id: string;
  student_id: string;
  activity: string;
  criteria: PracticalCriteriaResult[];
  overall_score: number;
  feedback: string;
  evaluated_at: string;
}

// Phase 3.2: Student Intelligence & Personalized Exercises

// ==========================================
// Module 2: Student Intelligence Enums
// ==========================================

export enum CognitiveProfileType {
  ANALYTICAL = "ANALYTICAL",
  CREATIVE = "CREATIVE",
  PRACTICAL = "PRACTICAL",
  THEORETICAL = "THEORETICAL",
  BALANCED = "BALANCED",
}

export enum MemoryRetentionLevel {
  VERY_LOW = "VERY_LOW",
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  VERY_HIGH = "VERY_HIGH",
}

export enum AttentionLevel {
  VERY_DISTRACTED = "VERY_DISTRACTED",
  DISTRACTED = "DISTRACTED",
  MODERATE = "MODERATE",
  FOCUSED = "FOCUSED",
  HIGHLY_FOCUSED = "HIGHLY_FOCUSED",
}

export enum MotivationType {
  INTRINSIC = "INTRINSIC",
  EXTRINSIC = "EXTRINSIC",
  ACHIEVEMENT = "ACHIEVEMENT",
  SOCIAL = "SOCIAL",
  COMPETENCE = "COMPETENCE",
  AUTONOMY = "AUTONOMY",
}

export enum EngagementLevel {
  DISENGAGED = "DISENGAGED",
  PASSIVE = "PASSIVE",
  MODERATE = "MODERATE",
  ACTIVE = "ACTIVE",
  HIGHLY_ENGAGED = "HIGHLY_ENGAGED",
}

export enum BehaviourPattern {
  CONSISTENT = "CONSISTENT",
  ERRATIC = "ERRATIC",
  IMPROVING = "IMPROVING",
  DECLINING = "DECLINING",
  STABLE = "STABLE",
}

export enum EmotionalState {
  NEUTRAL = "NEUTRAL",
  ANXIOUS = "ANXIOUS",
  CONFIDENT = "CONFIDENT",
  FRUSTRATED = "FRUSTRATED",
  MOTIVATED = "MOTIVATED",
  BORED = "BORED",
  EXCITED = "EXCITED",
}

export enum BurnoutLevel {
  NONE = "NONE",
  MILD = "MILD",
  MODERATE = "MODERATE",
  SEVERE = "SEVERE",
  CRITICAL = "CRITICAL",
}

export enum InterventionType {
  ACADEMIC = "ACADEMIC",
  BEHAVIOURAL = "BEHAVIOURAL",
  EMOTIONAL = "EMOTIONAL",
  SOCIAL = "SOCIAL",
  HEALTH = "HEALTH",
}

export enum RiskLevel {
  MINIMAL = "MINIMAL",
  LOW = "LOW",
  MODERATE = "MODERATE",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum AttentionScoreCategory {
  POOR = "POOR",
  BELOW_AVERAGE = "BELOW_AVERAGE",
  AVERAGE = "AVERAGE",
  ABOVE_AVERAGE = "ABOVE_AVERAGE",
  EXCELLENT = "EXCELLENT",
}

export enum LearningSpeedType {
  VERY_SLOW = "VERY_SLOW",
  SLOW = "SLOW",
  AVERAGE = "AVERAGE",
  FAST = "FAST",
  VERY_FAST = "VERY_FAST",
}

// ==========================================
// Module 3: Personalized Exercises Enums
// ==========================================

export enum ExerciseType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  FILL_BLANK = "FILL_BLANK",
  SHORT_ANSWER = "SHORT_ANSWER",
  ESSAY = "ESSAY",
  PRACTICAL = "PRACTICAL",
  CODING = "CODING",
  MATH = "MATH",
  MATCHING = "MATCHING",
  ORDERING = "ORDERING",
}

export enum QuizMode {
  TIMED = "TIMED",
  UNTIMED = "UNTIMED",
  ADAPTIVE = "ADAPTIVE",
  PRACTICE = "PRACTICE",
  EXAM = "EXAM",
}

export enum HintLevel {
  NONE = "NONE",
  BASIC = "BASIC",
  DETAILED = "DETAILED",
  STEP_BY_STEP = "STEP_BY_STEP",
}

export enum ExplanationType {
  TEXT = "TEXT",
  VIDEO = "VIDEO",
  DIAGRAM = "DIAGRAM",
  INTERACTIVE = "INTERACTIVE",
  ANALOGY = "ANALOGY",
}

export enum DifficultyAdaptation {
  AUTO = "AUTO",
  MANUAL = "MANUAL",
  FIXED = "FIXED",
  PROGRESSIVE = "PROGRESSIVE",
}

export enum ErrorPattern {
  CONCEPTUAL_MISUNDERSTANDING = "CONCEPTUAL_MISUNDERSTANDING",
  CALCULATION_ERROR = "CALCULATION_ERROR",
  CARELESS_MISTAKE = "CARELESS_MISTAKE",
  KNOWLEDGE_GAP = "KNOWLEDGE_GAP",
  PROCEDURAL_ERROR = "PROCEDURAL_ERROR",
}

export enum RevisionStrategy {
  SPACED_REPETITION = "SPACED_REPETITION",
  ACTIVE_RECALL = "ACTIVE_RECALL",
  INTERLEAVING = "INTERLEAVING",
  ELABORATIVE_INTERROGATION = "ELABORATIVE_INTERROGATION",
  RETRIEVAL_PRACTICE = "RETRIEVAL_PRACTICE",
}

export enum QuestionSource {
  AI_GENERATED = "AI_GENERATED",
  TEACHER_CREATED = "TEACHER_CREATED",
  BANK = "BANK",
  ADAPTED = "ADAPTED",
  STUDENT_REQUESTED = "STUDENT_REQUESTED",
}

// ==========================================
// Shared Types
// ==========================================

export type DifficultyLevel = "easy" | "medium" | "hard" | "expert";

// ==========================================
// Module 2: Student Intelligence Interfaces
// ==========================================

export interface CognitiveProfile {
  id: string;
  school_id: string;
  student_id: string;
  profile_type: CognitiveProfileType;
  strengths: string[];
  weaknesses: string[];
  learning_preferences: string[];
  processing_speed: number;
  working_memory_capacity: number;
  created_at: string;
  updated_at: string;
}

export interface MemoryRetention {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  retention_rate: number;
  decay_rate: number;
  optimal_review_interval: number;
  last_reviewed_at: string;
  next_review_at: string;
  retention_curve: number[];
  created_at: string;
  updated_at: string;
}

export interface AttentionScore {
  id: string;
  school_id: string;
  student_id: string;
  score: number;
  category: AttentionScoreCategory;
  session_duration_minutes: number;
  distractions_count: number;
  peak_focus_time: string;
  created_at: string;
}

export interface MotivationIndex {
  id: string;
  school_id: string;
  student_id: string;
  overall_score: number;
  motivation_type: MotivationType;
  intrinsic_score: number;
  extrinsic_score: number;
  achievement_score: number;
  social_score: number;
  created_at: string;
  updated_at: string;
}

export interface EngagementIndex {
  id: string;
  school_id: string;
  student_id: string;
  score: number;
  level: EngagementLevel;
  login_frequency: number;
  session_duration_avg: number;
  interaction_count: number;
  assignment_completion_rate: number;
  created_at: string;
  updated_at: string;
}

export interface LearningSpeed {
  id: string;
  school_id: string;
  student_id: string;
  speed_type: LearningSpeedType;
  concepts_per_hour: number;
  average_time_per_topic: number;
  acceleration_rate: number;
  created_at: string;
  updated_at: string;
}

export interface LearningCurvePoint {
  date: string;
  score: number;
  time_spent_minutes: number;
  concepts_learned: number;
}

export interface LearningCurve {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  data_points: LearningCurvePoint[];
  overall_trend: "improving" | "stable" | "declining";
  created_at: string;
}

export interface BehaviourPrediction {
  id: string;
  school_id: string;
  student_id: string;
  prediction_type: BehaviourPattern;
  confidence: number;
  factors: string[];
  predicted_date: string;
  created_at: string;
}

export interface AcademicRisk {
  id: string;
  school_id: string;
  student_id: string;
  risk_level: RiskLevel;
  score: number;
  factors: string[];
  trend: "improving" | "stable" | "worsening";
  intervention_recommended: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmotionalIndicator {
  id: string;
  school_id: string;
  student_id: string;
  state: EmotionalState;
  intensity: number;
  context: string;
  detected_at: string;
  source: "self_report" | "ai_detected" | "teacher_observed";
}

export interface BurnoutDetection {
  id: string;
  school_id: string;
  student_id: string;
  level: BurnoutLevel;
  score: number;
  symptoms: string[];
  risk_factors: string[];
  recommended_actions: string[];
  detected_at: string;
  created_at: string;
}

export interface InterventionSuggestion {
  id: string;
  school_id: string;
  student_id: string;
  intervention_type: InterventionType;
  title: string;
  description: string;
  urgency: "low" | "medium" | "high" | "critical";
  suggested_by: "ai" | "teacher" | "system";
  created_at: string;
}

export interface StudentLearningSummary {
  student_id: string;
  school_id: string;
  overall_score: number;
  strengths: string[];
  weaknesses: string[];
  recommended_actions: string[];
  risk_level: RiskLevel;
  engagement_level: EngagementLevel;
  last_updated: string;
}

// ==========================================
// Module 3: Personalized Exercises Interfaces
// ==========================================

export interface QuizQuestion {
  id: string;
  question_text: string;
  exercise_type: ExerciseType;
  options: string[];
  correct_answer: string;
  difficulty: DifficultyLevel;
  hint_available: boolean;
  explanation: string;
  points: number;
  topic_id: string;
}

export interface DynamicQuiz {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  questions: QuizQuestion[];
  mode: QuizMode;
  difficulty: DifficultyLevel;
  time_limit_minutes: number;
  status: string;
  score: number;
  created_at: string;
  completed_at: string | null;
}

export interface HomeworkExercise {
  id: string;
  question_text: string;
  exercise_type: ExerciseType;
  options: string[];
  correct_answer: string;
  student_answer: string | null;
  is_correct: boolean | null;
  hints_used: number;
  difficulty: DifficultyLevel;
  topic_id: string;
}

export interface AdaptiveHomework {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  title: string;
  exercises: HomeworkExercise[];
  due_date: string;
  difficulty: DifficultyLevel;
  estimated_minutes: number;
  status: string;
  created_at: string;
}

export interface PersonalizedExercise {
  id: string;
  school_id: string;
  student_id: string;
  skill_id: string;
  exercise_type: ExerciseType;
  content: Record<string, unknown>;
  difficulty: DifficultyLevel;
  hints: string[];
  explanation: string;
  estimated_minutes: number;
  created_at: string;
}

export interface RevisionTopic {
  topic_id: string;
  name: string;
  mastery_level: number;
  priority: number;
  last_reviewed_at: string;
  next_review_at: string;
  revision_count: number;
}

export interface SmartRevision {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  topics: RevisionTopic[];
  strategy: RevisionStrategy;
  scheduled_date: string;
  estimated_duration_minutes: number;
  status: string;
  created_at: string;
}

export interface AIQuestionGenerator {
  id: string;
  school_id: string;
  topic_id: string;
  question_type: ExerciseType;
  difficulty: DifficultyLevel;
  count: number;
  generated_questions: QuizQuestion[];
  created_at: string;
}

export interface DifficultyRecord {
  date: string;
  difficulty: DifficultyLevel;
  score: number;
  time_taken_seconds: number;
}

export interface DifficultyScaling {
  id: string;
  student_id: string;
  skill_id: string;
  current_difficulty: DifficultyLevel;
  history: DifficultyRecord[];
  created_at: string;
  updated_at: string;
}

export interface HintUsage {
  id: string;
  exercise_id: string;
  student_id: string;
  hint_level: HintLevel;
  hints_used: number;
  final_answer_correct: boolean;
  created_at: string;
}

export interface ResolutionStep {
  step_number: number;
  content: string;
  is_correct: boolean;
  student_input: string | null;
  time_spent_seconds: number;
}

export interface StepByStepResolution {
  id: string;
  exercise_id: string;
  steps: ResolutionStep[];
  final_answer: string;
  completed: boolean;
}

export interface AutomaticExplanation {
  id: string;
  exercise_id: string;
  explanation_type: ExplanationType;
  content: string;
  student_id: string;
  created_at: string;
}

export interface ErrorAnalysis {
  id: string;
  school_id: string;
  student_id: string;
  exercise_id: string;
  error_pattern: ErrorPattern;
  concept_involved: string;
  frequency: number;
  severity: number;
  recommendation: string;
  created_at: string;
}

export interface ConceptReinforcement {
  id: string;
  school_id: string;
  student_id: string;
  concept_id: string;
  reinforcement_type: "practice" | "review" | "tutoring" | "assessment";
  exercises_completed: number;
  success_rate: number;
  next_action: string;
  created_at: string;
}

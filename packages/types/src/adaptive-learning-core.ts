export enum LearningProfileType {
  VISUAL = 'VISUAL',
  AUDITORY = 'AUDITORY',
  KINESTHETIC = 'KINESTHETIC',
  READING_WRITING = 'READING_WRITING',
  MULTIMODAL = 'MULTIMODAL',
}

export enum SkillLevel {
  BEGINNER = 'BEGINNER',
  ELEMENTARY = 'ELEMENTARY',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
  MASTERY = 'MASTERY',
}

export enum CompetencyStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROACHING = 'APPROACHING',
  PROFICIENT = 'PROFICIENT',
  ADVANCED = 'ADVANCED',
  MASTERY = 'MASTERY',
}

export enum MasteryLevel {
  NOVICE = 'NOVICE',
  ADVANCED_BEGINNER = 'ADVANCED_BEGINNER',
  COMPETENT = 'COMPETENT',
  PROFICIENT = 'PROFICIENT',
  EXPERT = 'EXPERT',
}

export enum BloomLevel {
  REMEMBER = 'REMEMBER',
  UNDERSTAND = 'UNDERSTAND',
  APPLY = 'APPLY',
  ANALYZE = 'ANALYZE',
  EVALUATE = 'EVALUATE',
  CREATE = 'CREATE',
}

export enum LearningPathStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
  ARCHIVED = 'ARCHIVED',
  LOCKED = 'LOCKED',
}

export enum DifficultyLevel {
  VERY_EASY = 'VERY_EASY',
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  VERY_HARD = 'VERY_HARD',
  ADAPTIVE = 'ADAPTIVE',
}

export enum LearningStyle {
  ANALYTICAL = 'ANALYTICAL',
  CREATIVE = 'CREATIVE',
  PRACTICAL = 'PRACTICAL',
  THEORETICAL = 'THEORETICAL',
  COLLABORATIVE = 'COLLABORATIVE',
  INDEPENDENT = 'INDEPENDENT',
}

export enum RemediationType {
  VIDEO = 'VIDEO',
  EXERCISE = 'EXERCISE',
  READING = 'READING',
  TUTORING = 'TUTORING',
  PRACTICE = 'PRACTICE',
  ASSESSMENT = 'ASSESSMENT',
}

export enum ObjectiveStatus {
  NOT_MET = 'NOT_MET',
  PARTIALLY_MET = 'PARTIALLY_MET',
  MET = 'MET',
  EXCEEDED = 'EXCEEDED',
}

export enum AdaptiveAlgorithm {
  BAYESIAN = 'BAYESIAN',
  COLLABORATIVE_FILTER = 'COLLABORATIVE_FILTER',
  CONTENT_BASED = 'CONTENT_BASED',
  HYBRID = 'HYBRID',
  KNOWLEDGE_TRACING = 'KNOWLEDGE_TRACING',
  DEEP_LEARNING = 'DEEP_LEARNING',
}

export enum SequencingMode {
  LINEAR = 'LINEAR',
  BRANCHING = 'BRANCHING',
  MASTERY_BASED = 'MASTERY_BASED',
  TIME_BASED = 'TIME_BASED',
  ADAPTIVE = 'ADAPTIVE',
}

export enum KnowledgeState {
  UNKNOWN = 'UNKNOWN',
  LEARNING = 'LEARNING',
  REVIEWED = 'REVIEWED',
  MASTERED = 'MASTERED',
  FORGOTTEN = 'FORGOTTEN',
}

export enum CurriculumStandard {
  CBC = 'CBC',
  APC = 'APC',
  BLOOM = 'BLOOM',
  UNESCO = 'UNESCO',
  CAMBRIDGE = 'CAMBRIDGE',
  IB = 'IB',
  NATIONAL = 'NATIONAL',
  CUSTOM = 'CUSTOM',
}

export enum LearningOutcome {
  IMPROVED = 'IMPROVED',
  MAINTAINED = 'MAINTAINED',
  DECLINED = 'DECLINED',
  NOT_ASSESSED = 'NOT_ASSESSED',
}

export enum WeaknessCategory {
  CONCEPTUAL = 'CONCEPTUAL',
  PROCEDURAL = 'PROCEDURAL',
  FACTUAL = 'FACTUAL',
  STRATEGIC = 'STRATEGIC',
  METACOGNITIVE = 'METACOGNITIVE',
}

export enum StrengthCategory {
  QUICK_LEARNER = 'QUICK_LEARNER',
  CONSISTENT = 'CONSISTENT',
  CREATIVE = 'CREATIVE',
  ANALYTICAL = 'ANALYTICAL',
  PRACTICAL = 'PRACTICAL',
}

export enum DifficultyAdjustment {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  MAINTAIN = 'MAINTAIN',
  SKIP = 'SKIP',
  REVIEW = 'REVIEW',
}

export enum PaceType {
  SELF_PACED = 'SELF_PACED',
  INSTRUCTOR_PACED = 'INSTRUCTOR_PACED',
  ADAPTIVE_PACED = 'ADAPTIVE_PACED',
  DEADLINE_DRIVEN = 'DEADLINE_DRIVEN',
}

export enum LearningObjectiveType {
  KNOWLEDGE = 'KNOWLEDGE',
  SKILL = 'SKILL',
  COMPETENCY = 'COMPETENCY',
  DISPOSITION = 'DISPOSITION',
  TRANSFER = 'TRANSFER',
}

export interface LearningProfile {
  id: string;
  school_id: string;
  student_id: string;
  learning_style: LearningStyle;
  profile_type: LearningProfileType;
  preferred_difficulty: DifficultyLevel;
  optimal_session_minutes: number;
  attention_span_minutes: number;
  retention_rate: number;
  created_at: string;
  updated_at: string;
}

export interface SkillGraph {
  id: string;
  school_id: string;
  name: string;
  description: string;
  subject_id: string;
  grade_level: string;
  nodes: SkillNode[];
  edges: SkillEdge[];
  created_at: string;
  updated_at: string;
}

export interface SkillNode {
  id: string;
  skill_name: string;
  skill_code: string;
  level: SkillLevel;
  subject: string;
  prerequisites: string[];
  estimated_hours: number;
  bloom_level: BloomLevel;
}

export interface SkillEdge {
  source_id: string;
  target_id: string;
  relationship: 'prerequisite' | 'related' | 'builds_on';
  weight: number;
}

export interface Competency {
  id: string;
  school_id: string;
  name: string;
  code: string;
  description: string;
  framework: CurriculumStandard;
  subject_id: string;
  grade_level: string;
  bloom_level: BloomLevel;
  status: CompetencyStatus;
  mastery_level: MasteryLevel;
  created_at: string;
  updated_at: string;
}

export interface CompetencyProgression {
  id: string;
  competency_id: string;
  student_id: string;
  previous_level: MasteryLevel;
  current_level: MasteryLevel;
  progress_percentage: number;
  assessments_count: number;
  last_assessed_at: string;
  created_at: string;
}

export interface MasteryTracking {
  id: string;
  school_id: string;
  student_id: string;
  skill_id: string;
  mastery_level: MasteryLevel;
  score: number;
  attempts: number;
  last_practiced_at: string;
  streak: number;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeMap {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  nodes: KnowledgeNode[];
  overall_mastery: number;
  knowledge_states: Record<string, KnowledgeState>;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeNode {
  id: string;
  concept_name: string;
  concept_code: string;
  mastery: number;
  state: KnowledgeState;
  last_reviewed_at: string;
  next_review_at: string;
  confidence: number;
}

export interface LearningObjective {
  id: string;
  school_id: string;
  name: string;
  description: string;
  bloom_level: BloomLevel;
  competency_id: string;
  subject_id: string;
  grade_level: string;
  status: ObjectiveStatus;
  target_date: string;
  created_at: string;
  updated_at: string;
}

export interface LearningPath {
  id: string;
  school_id: string;
  student_id: string;
  name: string;
  description: string;
  objectives: string[];
  current_objective_index: number;
  status: LearningPathStatus;
  estimated_duration_hours: number;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface AdaptiveSequencing {
  id: string;
  path_id: string;
  algorithm: AdaptiveAlgorithm;
  sequence: SequencingItem[];
  current_index: number;
  adjustments_made: number;
  created_at: string;
  updated_at: string;
}

export interface SequencingItem {
  objective_id: string;
  order: number;
  difficulty: DifficultyLevel;
  estimated_minutes: number;
  status: 'pending' | 'active' | 'completed' | 'skipped';
}

export interface AdaptiveRecommendation {
  id: string;
  school_id: string;
  student_id: string;
  type: 'lesson' | 'exercise' | 'video' | 'tutor' | 'assessment';
  title: string;
  description: string;
  reason: string;
  confidence_score: number;
  priority: number;
  created_at: string;
}

export interface WeaknessDetection {
  id: string;
  school_id: string;
  student_id: string;
  skill_id: string;
  weakness_type: WeaknessCategory;
  severity: number;
  description: string;
  suggested_remediation: RemediationType;
  detected_at: string;
  resolved_at: string | null;
}

export interface StrengthDetection {
  id: string;
  school_id: string;
  student_id: string;
  skill_id: string;
  strength_type: StrengthCategory;
  evidence: string;
  score: number;
  detected_at: string;
}

export interface DifficultyAdjustmentRecord {
  id: string;
  student_id: string;
  skill_id: string;
  previous_difficulty: DifficultyLevel;
  new_difficulty: DifficultyLevel;
  adjustment: DifficultyAdjustment;
  reason: string;
  adjusted_at: string;
}

export interface LearningPace {
  id: string;
  school_id: string;
  student_id: string;
  pace_type: PaceType;
  current_pace: number;
  average_pace: number;
  optimal_pace: number;
  deviation: number;
  created_at: string;
  updated_at: string;
}

export interface PersonalizedCurriculum {
  id: string;
  school_id: string;
  student_id: string;
  name: string;
  framework: CurriculumStandard;
  subjects: CurriculumSubject[];
  start_date: string;
  end_date: string;
  status: LearningPathStatus;
  created_at: string;
  updated_at: string;
}

export interface CurriculumSubject {
  subject_id: string;
  name: string;
  objectives: string[];
  weekly_hours: number;
  priority: number;
}

export interface RemediationPlan {
  id: string;
  school_id: string;
  student_id: string;
  weakness_id: string;
  steps: RemediationStep[];
  status: 'active' | 'completed' | 'paused';
  estimated_duration_days: number;
  created_at: string;
  updated_at: string;
}

export interface RemediationStep {
  order: number;
  type: RemediationType;
  title: string;
  description: string;
  estimated_minutes: number;
  completed: boolean;
}

export interface LearningObjectiveProgress {
  id: string;
  objective_id: string;
  student_id: string;
  status: ObjectiveStatus;
  score: number;
  evidence: string;
  assessed_at: string;
}

export interface SkillAssessment {
  id: string;
  school_id: string;
  student_id: string;
  skill_id: string;
  score: number;
  max_score: number;
  assessment_type: string;
  assessed_at: string;
  assessor_id: string;
}

export interface AdaptiveLearningConfig {
  algorithm: AdaptiveAlgorithm;
  difficulty_range: [number, number];
  pace_adjustment_threshold: number;
  mastery_threshold: number;
  review_interval_days: number;
  max_recommendations_per_day: number;
}

import { SupabaseClient } from '@supabase/supabase-js';
import { AppError, NotFoundError, ValidationError } from '@educi/errors';
import { CrudRepository, CrudRepositoryImpl, createCrudRepository } from './aeip-base.repository';

// ═══════════════════════════════════════════════════════════════════════
// AEIP-9 AUTONOMOUS ACADEMIC — Repository
// Pédagogie, curriculum, enseignement, évaluation, suivi, orientation
// Table prefix: aac
// ═══════════════════════════════════════════════════════════════════════

// ── Curriculum ──
export interface AacCurriculum {
  id: string;
  school_id: string;
  curriculum_name: string;
  curriculum_type: 'national' | 'international' | 'custom' | 'hybrid';
  education_level: string;
  version: string;
  effective_year: number;
  status: 'draft' | 'active' | 'deprecated';
  subjects_count: number;
  total_hours: number;
  objectives: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacSubject {
  id: string;
  school_id: string;
  curriculum_id: string;
  subject_code: string;
  subject_name: string;
  subject_name_en: string | null;
  category: 'core' | 'elective' | 'complementary' | 'extracurricular';
  grade_levels: string[];
  hours_per_week: number;
  total_hours: number;
  credits: number;
  coefficient: number;
  is_mandatory: boolean;
  has_lab: boolean;
  has_practical: boolean;
  assessment_methods: string[];
  description: string;
  objectives: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacSubjectTopic {
  id: string;
  school_id: string;
  subject_id: string;
  topic_name: string;
  topic_code: string;
  parent_id: string | null;
  level: number;
  order_index: number;
  hours_allocated: number;
  description: string;
  learning_objectives: string[];
  prerequisites: string[];
  resources: Record<string, unknown>[];
  assessment_criteria: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacLessonPlan {
  id: string;
  school_id: string;
  subject_id: string;
  topic_id: string;
  teacher_id: string;
  class_id: string;
  title: string;
  date: string;
  period: string;
  duration_minutes: number;
  objectives: string[];
  prerequisites: string[];
  teaching_methods: string[];
  resources_needed: string[];
  activities: Record<string, unknown>[];
  assessment_formative: string;
  notes: string;
  ai_generated: boolean;
  ai_confidence: number;
  status: 'draft' | 'ready' | 'taught' | 'reviewed';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacLessonPlanResource {
  id: string;
  school_id: string;
  lesson_plan_id: string;
  resource_type: 'document' | 'video' | 'audio' | 'image' | 'interactive' | 'link' | 'physical';
  resource_name: string;
  resource_url: string | null;
  resource_path: string | null;
  description: string;
  is_required: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Teaching ──
export interface AacTeachingSession {
  id: string;
  school_id: string;
  lesson_plan_id: string;
  class_id: string;
  teacher_id: string;
  subject_id: string;
  date: string;
  start_time: string;
  end_time: string;
  room_id: string | null;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled' | 'substitute';
  substitute_teacher_id: string | null;
  attendance_taken: boolean;
  attendance_rate: number;
  students_present: number;
  students_absent: number;
  activities_completed: Record<string, unknown>[];
  notes: string;
  ai_observed: boolean;
  ai_feedback: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacTeachingObservation {
  id: string;
  school_id: string;
  session_id: string;
  observer_id: string;
  observation_type: 'peer' | 'supervisor' | 'ai_assisted' | 'self';
  focus_areas: string[];
  ratings: Record<string, number>;
  strengths: string[];
  areas_for_improvement: string[];
  recommendations: string[];
  overall_score: number;
  recommendations_score: number;
  report_url: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacTeachingMaterial {
  id: string;
  school_id: string;
  subject_id: string;
  topic_id: string | null;
  material_type: 'textbook' | 'workbook' | 'lab_manual' | 'reference' | 'digital_resource' | 'video' | 'simulation';
  title: string;
  author: string;
  publisher: string;
  edition: string;
  isbn: string | null;
  file_url: string | null;
  cover_url: string | null;
  language: string;
  is_primary: boolean;
  is_digital: boolean;
  cost: number;
  quantity_available: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Assessment ──
export interface AacAssessment {
  id: string;
  school_id: string;
  assessment_name: string;
  assessment_type: 'quiz' | 'test' | 'exam' | 'project' | 'oral' | 'practical' | 'portfolio' | 'participation' | 'competency';
  subject_id: string;
  class_id: string;
  teacher_id: string;
  date: string;
  duration_minutes: number;
  total_marks: number;
  passing_marks: number;
  weight_percent: number;
  instructions: string;
  topics_covered: string[];
  difficulty_level: 'easy' | 'medium' | 'hard' | 'mixed';
  ai_generated: boolean;
  ai_questions_count: number;
  ai_rubric: Record<string, unknown>;
  status: 'draft' | 'published' | 'in_progress' | 'grading' | 'completed' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacAssessmentQuestion {
  id: string;
  school_id: string;
  assessment_id: string;
  question_number: number;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'matching' | 'fill_blank' | 'practical' | 'oral';
  question_text: string;
  question_html: string;
  question_image_url: string | null;
  marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic_id: string | null;
  learning_objective: string;
  options: Record<string, unknown>[] | null;
  correct_answer: string;
  explanation: string;
  hints: string[];
  ai_generated: boolean;
  ai_difficulty_prediction: number;
  bloom_level: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacExamResult {
  id: string;
  school_id: string;
  assessment_id: string;
  student_id: string;
  class_id: string;
  total_score: number;
  percentage: number;
  grade: string;
  rank: number | null;
  status: 'submitted' | 'graded' | 'reviewed' | 'finalized' | 'contested';
  submitted_at: string;
  graded_at: string | null;
  graded_by: string | null;
  ai_graded: boolean;
  ai_score: number | null;
  ai_confidence: number;
  teacher_override_score: number | null;
  feedback: string;
  answers: Record<string, unknown>[];
  time_taken_seconds: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacExamResultLine {
  id: string;
  school_id: string;
  exam_result_id: string;
  question_id: string;
  student_answer: string;
  is_correct: boolean | null;
  score_awarded: number;
  max_score: number;
  feedback: string;
  time_spent_seconds: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacGradingScale {
  id: string;
  school_id: string;
  scale_name: string;
  scale_type: 'letter' | 'percentage' | 'gpa' | 'competency' | 'custom';
  grades: Record<string, unknown>[];
  min_percentage: number;
  max_percentage: number;
  gpa_scale: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacGradingRubric {
  id: string;
  school_id: string;
  rubric_name: string;
  subject_id: string;
  assessment_type: string;
  criteria: Record<string, unknown>[];
  performance_levels: Record<string, unknown>[];
  total_points: number;
  ai_generated: boolean;
  usage_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacGradeBook {
  id: string;
  school_id: string;
  class_id: string;
  subject_id: string;
  teacher_id: string;
  academic_period: string;
  assessment_ids: string[];
  final_grades: Record<string, unknown>[];
  class_average: number;
  class_median: number;
  class_mode: number;
  standard_deviation: number;
  status: 'active' | 'finalized' | 'archived';
  finalized_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacGradeEntry {
  id: string;
  school_id: string;
  grade_book_id: string;
  student_id: string;
  assessment_id: string;
  raw_score: number;
  weighted_score: number;
  percentage: number;
  grade: string;
  comment: string;
  is_missing: boolean;
  is_excused: boolean;
  ai_detected_anomaly: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Student Progress ──
export interface AacStudentProgress {
  id: string;
  school_id: string;
  student_id: string;
  class_id: string;
  subject_id: string;
  academic_period: string;
  overall_grade: string;
  overall_percentage: number;
  rank_in_class: number;
  rank_in_subject: number;
  attendance_rate: number;
  participation_score: number;
  behavior_score: number;
  assignment_completion_rate: number;
  quiz_average: number;
  test_average: number;
  exam_score: number;
  project_score: number;
  lab_score: number | null;
  oral_score: number | null;
  trend: 'improving' | 'stable' | 'declining';
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  ai_risk_factors: Record<string, unknown>[];
  ai_recommendations: string[];
  strengths: string[];
  weaknesses: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacLearningOutcome {
  id: string;
  school_id: string;
  subject_id: string;
  topic_id: string | null;
  outcome_code: string;
  outcome_description: string;
  bloom_level: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
  assessment_methods: string[];
  mastery_threshold: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacStudentOutcomeMastery {
  id: string;
  school_id: string;
  student_id: string;
  outcome_id: string;
  assessment_id: string;
  score: number;
  mastery_level: 'not_started' | 'developing' | 'approaching' | 'meeting' | 'exceeding';
  evidence: string[];
  attempts: number;
  last_assessed: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacCompetencyTrack {
  id: string;
  school_id: string;
  student_id: string;
  class_id: string;
  competency_area: string;
  sub_competencies: Record<string, unknown>[];
  overall_level: number;
  max_level: number;
  progress_percent: number;
  last_assessed: string;
  evidence_items: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── AI Pedagogy ──
export interface AacAIPedagogyModel {
  id: string;
  school_id: string;
  model_name: string;
  model_type: 'learning_analytics' | 'content_recommendation' | 'difficulty_adaptation' | 'engagement_prediction' | 'risk_detection';
  algorithm: string;
  version: string;
  training_data_hash: string;
  accuracy: number;
  f1_score: number;
  precision_score: number;
  recall_score: number;
  features_used: string[];
  is_active: boolean;
  last_trained_at: string;
  next_retrain_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacAILearningPath {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  model_id: string;
  current_level: number;
  target_level: number;
  path_nodes: Record<string, unknown>[];
  estimated_completion_hours: number;
  difficulty_curve: Record<string, unknown>;
  adaptive_parameters: Record<string, unknown>;
  is_active: boolean;
  progress_percent: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacAIContentRecommendation {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  model_id: string;
  recommendation_type: 'review' | 'advance' | 'challenge' | 'remediation' | 'exploration';
  content_type: string;
  content_id: string;
  content_title: string;
  relevance_score: number;
  difficulty_match: number;
  reasoning: string;
  status: 'pending' | 'viewed' | 'completed' | 'dismissed' | 'expired';
  expires_at: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacAIDifficultyAdaptation {
  id: string;
  school_id: string;
  student_id: string;
  subject_id: string;
  model_id: string;
  current_difficulty: number;
  optimal_difficulty: number;
  adaptation_history: Record<string, unknown>[];
  engagement_score: number;
  frustration_index: number;
  flow_state: 'bored' | 'optimal' | 'struggling' | 'overwhelmed';
  recommendations: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacAIEngagementPrediction {
  id: string;
  school_id: string;
  student_id: string;
  class_id: string;
  session_date: string;
  engagement_probability: number;
  predicted_participation: number;
  risk_of_disengagement: number;
  factors: Record<string, unknown>[];
  intervention_suggested: boolean;
  intervention_type: string | null;
  model_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacAIClassAnalytics {
  id: string;
  school_id: string;
  class_id: string;
  subject_id: string;
  analysis_date: string;
  class_average: number;
  class_median: number;
  std_deviation: number;
  distribution: Record<string, number>;
  struggling_students: string[];
  advanced_students: string[];
  topic_difficulties: Record<string, unknown>[];
  engagement_metrics: Record<string, unknown>;
  recommendations: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Orientation ──
export interface AacOrientationProfile {
  id: string;
  school_id: string;
  student_id: string;
  assessment_date: string;
  interests: string[];
  strengths: string[];
  aptitudes: Record<string, number>;
  learning_style: string;
  personality_type: string | null;
  career_preferences: string[];
  academic_performance: Record<string, unknown>;
  ai_suggested_paths: Record<string, unknown>[];
  counselor_id: string | null;
  counselor_notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacOrientationPath {
  id: string;
  school_id: string;
  profile_id: string;
  path_name: string;
  path_type: 'academic' | 'vocational' | 'professional' | 'entrepreneurial';
  match_score: number;
  required_subjects: string[];
  required_grades: Record<string, number>;
  career_outcomes: string[];
  further_education: string[];
  description: string;
  ai_confidence: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacOrientationSession {
  id: string;
  school_id: string;
  student_id: string;
  counselor_id: string;
  session_date: string;
  session_type: 'academic' | 'career' | 'personal' | 'assessment_review';
  discussion_points: string[];
  decisions_made: string[];
  action_items: Record<string, unknown>[];
  follow_up_date: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Research & Innovation ──
export interface AacResearchProject {
  id: string;
  school_id: string;
  project_name: string;
  research_type: 'pedagogical' | 'student' | 'collaborative' | 'ai_experiment';
  description: string;
  principal_investigator_id: string;
  team_member_ids: string[];
  subject_area: string;
  methodology: string;
  status: 'proposal' | 'active' | 'data_collection' | 'analysis' | 'completed' | 'published';
  start_date: string;
  end_date: string | null;
  budget: number;
  ai_tools_used: string[];
  outcomes: string[];
  publications: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacResearchDataPoint {
  id: string;
  school_id: string;
  project_id: string;
  data_type: 'quantitative' | 'qualitative' | 'mixed';
  source: string;
  collection_method: string;
  data_payload: Record<string, unknown>;
  collected_at: string;
  collected_by: string;
  verified: boolean;
  verified_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacInnovationExperiment {
  id: string;
  school_id: string;
  experiment_name: string;
  hypothesis: string;
  variables: Record<string, unknown>;
  control_group_id: string | null;
  treatment_group_id: string | null;
  methodology: string;
  status: 'design' | 'running' | 'analysis' | 'concluded';
  start_date: string;
  end_date: string | null;
  results: Record<string, unknown>;
  conclusion: string;
  effect_size: number;
  statistical_significance: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Academic Calendar ──
export interface AacAcademicTerm {
  id: string;
  school_id: string;
  term_name: string;
  term_number: number;
  academic_year: string;
  start_date: string;
  end_date: string;
  weeks_count: number;
  status: 'upcoming' | 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacAcademicWeek {
  id: string;
  school_id: string;
  term_id: string;
  week_number: number;
  start_date: string;
  end_date: string;
  theme: string | null;
  is_break: boolean;
  break_name: string | null;
  teaching_days: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AacAcademicEvent {
  id: string;
  school_id: string;
  term_id: string | null;
  event_name: string;
  event_type: 'exam' | 'holiday' | 'conference' | 'field_trip' | 'assembly' | 'parent_meeting' | 'deadline' | 'ceremony';
  start_date: string;
  end_date: string | null;
  description: string;
  affected_classes: string[];
  is_recurring: boolean;
  recurrence_rule: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ── Table Name Map ──
export const AAC_TABLE_NAMES = {
  CURRICULUM: 'aac_curricula',
  SUBJECT: 'aac_subjects',
  SUBJECT_TOPIC: 'aac_subject_topics',
  LESSON_PLAN: 'aac_lesson_plans',
  LESSON_PLAN_RESOURCE: 'aac_lesson_plan_resources',
  TEACHING_SESSION: 'aac_teaching_sessions',
  TEACHING_OBSERVATION: 'aac_teaching_observations',
  TEACHING_MATERIAL: 'aac_teaching_materials',
  ASSESSMENT: 'aac_assessments',
  ASSESSMENT_QUESTION: 'aac_assessment_questions',
  EXAM_RESULT: 'aac_exam_results',
  EXAM_RESULT_LINE: 'aac_exam_result_lines',
  GRADING_SCALE: 'aac_grading_scales',
  GRADING_RUBRIC: 'aac_grading_rubrics',
  GRADE_BOOK: 'aac_grade_books',
  GRADE_ENTRY: 'aac_grade_entries',
  STUDENT_PROGRESS: 'aac_student_progresses',
  LEARNING_OUTCOME: 'aac_learning_outcomes',
  STUDENT_OUTCOME_MASTERY: 'aac_student_outcome_masteries',
  COMPETENCY_TRACK: 'aac_competency_tracks',
  AI_PEDAGOGY_MODEL: 'aac_ai_pedagogy_models',
  AI_LEARNING_PATH: 'aac_ai_learning_paths',
  AI_CONTENT_RECOMMENDATION: 'aac_ai_content_recommendations',
  AI_DIFFICULTY_ADAPTATION: 'aac_ai_difficulty_adaptations',
  AI_ENGAGEMENT_PREDICTION: 'aac_ai_engagement_predictions',
  AI_CLASS_ANALYTICS: 'aac_ai_class_analytics',
  ORIENTATION_PROFILE: 'aac_orientation_profiles',
  ORIENTATION_PATH: 'aac_orientation_paths',
  ORIENTATION_SESSION: 'aac_orientation_sessions',
  RESEARCH_PROJECT: 'aac_research_projects',
  RESEARCH_DATA_POINT: 'aac_research_data_points',
  INNOVATION_EXPERIMENT: 'aac_innovation_experiments',
  ACADEMIC_TERM: 'aac_academic_terms',
  ACADEMIC_WEEK: 'aac_academic_weeks',
  ACADEMIC_EVENT: 'aac_academic_events',
} as const;

// ── Repository Interface ──
export interface AEIP9Repository {
  curricula: CrudRepository<AacCurriculum>;
  subjects: CrudRepository<AacSubject>;
  subjectTopics: CrudRepository<AacSubjectTopic>;
  lessonPlans: CrudRepository<AacLessonPlan>;
  lessonPlanResources: CrudRepository<AacLessonPlanResource>;
  teachingSessions: CrudRepository<AacTeachingSession>;
  teachingObservations: CrudRepository<AacTeachingObservation>;
  teachingMaterials: CrudRepository<AacTeachingMaterial>;
  assessments: CrudRepository<AacAssessment>;
  assessmentQuestions: CrudRepository<AacAssessmentQuestion>;
  examResults: CrudRepository<AacExamResult>;
  examResultLines: CrudRepository<AacExamResultLine>;
  gradingScales: CrudRepository<AacGradingScale>;
  gradingRubrics: CrudRepository<AacGradingRubric>;
  gradeBooks: CrudRepository<AacGradeBook>;
  gradeEntries: CrudRepository<AacGradeEntry>;
  studentProgresses: CrudRepository<AacStudentProgress>;
  learningOutcomes: CrudRepository<AacLearningOutcome>;
  studentOutcomeMasteries: CrudRepository<AacStudentOutcomeMastery>;
  competencyTracks: CrudRepository<AacCompetencyTrack>;
  aiPedagogyModels: CrudRepository<AacAIPedagogyModel>;
  aiLearningPaths: CrudRepository<AacAILearningPath>;
  aiContentRecommendations: CrudRepository<AacAIContentRecommendation>;
  aiDifficultyAdaptations: CrudRepository<AacAIDifficultyAdaptation>;
  aiEngagementPredictions: CrudRepository<AacAIEngagementPrediction>;
  aiClassAnalytics: CrudRepository<AacAIClassAnalytics>;
  orientationProfiles: CrudRepository<AacOrientationProfile>;
  orientationPaths: CrudRepository<AacOrientationPath>;
  orientationSessions: CrudRepository<AacOrientationSession>;
  researchProjects: CrudRepository<AacResearchProject>;
  researchDataPoints: CrudRepository<AacResearchDataPoint>;
  innovationExperiments: CrudRepository<AacInnovationExperiment>;
  academicTerms: CrudRepository<AacAcademicTerm>;
  academicWeeks: CrudRepository<AacAcademicWeek>;
  academicEvents: CrudRepository<AacAcademicEvent>;
}

// ── Factory Function ──
export function createAEIP9Repository(supabase: SupabaseClient): AEIP9Repository {
  return {
    curricula: createCrudRepository<AacCurriculum>(supabase, AAC_TABLE_NAMES.CURRICULUM),
    subjects: createCrudRepository<AacSubject>(supabase, AAC_TABLE_NAMES.SUBJECT),
    subjectTopics: createCrudRepository<AacSubjectTopic>(supabase, AAC_TABLE_NAMES.SUBJECT_TOPIC),
    lessonPlans: createCrudRepository<AacLessonPlan>(supabase, AAC_TABLE_NAMES.LESSON_PLAN),
    lessonPlanResources: createCrudRepository<AacLessonPlanResource>(supabase, AAC_TABLE_NAMES.LESSON_PLAN_RESOURCE),
    teachingSessions: createCrudRepository<AacTeachingSession>(supabase, AAC_TABLE_NAMES.TEACHING_SESSION),
    teachingObservations: createCrudRepository<AacTeachingObservation>(supabase, AAC_TABLE_NAMES.TEACHING_OBSERVATION),
    teachingMaterials: createCrudRepository<AacTeachingMaterial>(supabase, AAC_TABLE_NAMES.TEACHING_MATERIAL),
    assessments: createCrudRepository<AacAssessment>(supabase, AAC_TABLE_NAMES.ASSESSMENT),
    assessmentQuestions: createCrudRepository<AacAssessmentQuestion>(supabase, AAC_TABLE_NAMES.ASSESSMENT_QUESTION),
    examResults: createCrudRepository<AacExamResult>(supabase, AAC_TABLE_NAMES.EXAM_RESULT),
    examResultLines: createCrudRepository<AacExamResultLine>(supabase, AAC_TABLE_NAMES.EXAM_RESULT_LINE),
    gradingScales: createCrudRepository<AacGradingScale>(supabase, AAC_TABLE_NAMES.GRADING_SCALE),
    gradingRubrics: createCrudRepository<AacGradingRubric>(supabase, AAC_TABLE_NAMES.GRADING_RUBRIC),
    gradeBooks: createCrudRepository<AacGradeBook>(supabase, AAC_TABLE_NAMES.GRADE_BOOK),
    gradeEntries: createCrudRepository<AacGradeEntry>(supabase, AAC_TABLE_NAMES.GRADE_ENTRY),
    studentProgresses: createCrudRepository<AacStudentProgress>(supabase, AAC_TABLE_NAMES.STUDENT_PROGRESS),
    learningOutcomes: createCrudRepository<AacLearningOutcome>(supabase, AAC_TABLE_NAMES.LEARNING_OUTCOME),
    studentOutcomeMasteries: createCrudRepository<AacStudentOutcomeMastery>(supabase, AAC_TABLE_NAMES.STUDENT_OUTCOME_MASTERY),
    competencyTracks: createCrudRepository<AacCompetencyTrack>(supabase, AAC_TABLE_NAMES.COMPETENCY_TRACK),
    aiPedagogyModels: createCrudRepository<AacAIPedagogyModel>(supabase, AAC_TABLE_NAMES.AI_PEDAGOGY_MODEL),
    aiLearningPaths: createCrudRepository<AacAILearningPath>(supabase, AAC_TABLE_NAMES.AI_LEARNING_PATH),
    aiContentRecommendations: createCrudRepository<AacAIContentRecommendation>(supabase, AAC_TABLE_NAMES.AI_CONTENT_RECOMMENDATION),
    aiDifficultyAdaptations: createCrudRepository<AacAIDifficultyAdaptation>(supabase, AAC_TABLE_NAMES.AI_DIFFICULTY_ADAPTATION),
    aiEngagementPredictions: createCrudRepository<AacAIEngagementPrediction>(supabase, AAC_TABLE_NAMES.AI_ENGAGEMENT_PREDICTION),
    aiClassAnalytics: createCrudRepository<AacAIClassAnalytics>(supabase, AAC_TABLE_NAMES.AI_CLASS_ANALYTICS),
    orientationProfiles: createCrudRepository<AacOrientationProfile>(supabase, AAC_TABLE_NAMES.ORIENTATION_PROFILE),
    orientationPaths: createCrudRepository<AacOrientationPath>(supabase, AAC_TABLE_NAMES.ORIENTATION_PATH),
    orientationSessions: createCrudRepository<AacOrientationSession>(supabase, AAC_TABLE_NAMES.ORIENTATION_SESSION),
    researchProjects: createCrudRepository<AacResearchProject>(supabase, AAC_TABLE_NAMES.RESEARCH_PROJECT),
    researchDataPoints: createCrudRepository<AacResearchDataPoint>(supabase, AAC_TABLE_NAMES.RESEARCH_DATA_POINT),
    innovationExperiments: createCrudRepository<AacInnovationExperiment>(supabase, AAC_TABLE_NAMES.INNOVATION_EXPERIMENT),
    academicTerms: createCrudRepository<AacAcademicTerm>(supabase, AAC_TABLE_NAMES.ACADEMIC_TERM),
    academicWeeks: createCrudRepository<AacAcademicWeek>(supabase, AAC_TABLE_NAMES.ACADEMIC_WEEK),
    academicEvents: createCrudRepository<AacAcademicEvent>(supabase, AAC_TABLE_NAMES.ACADEMIC_EVENT),
  };
}

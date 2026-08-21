import { z } from 'zod';

const learningStyleEnum = z.enum(['visual', 'auditory', 'kinesthetic', 'reading_writing', 'multimodal']);
const skillLevelEnum = z.enum(['beginner', 'elementary', 'intermediate', 'advanced', 'expert']);
const masteryLevelEnum = z.enum(['novice', 'developing', 'proficient', 'advanced', 'mastery']);
const difficultyEnum = z.enum(['easy', 'medium', 'hard', 'very_hard']);
const pathStatusEnum = z.enum(['draft', 'active', 'paused', 'completed', 'archived']);
const assessmentTypeEnum = z.enum(['diagnostic', 'formative', 'summative', 'adaptive']);
const learningModeEnum = z.enum(['synchronous', 'asynchronous', 'hybrid']);
const contentTypeEnum = z.enum(['lesson', 'exercise', 'quiz', 'project', 'discussion', 'lab', 'video']);
const sequencingStrategyEnum = z.enum(['linear', 'branching', 'spiral', 'mastery_based', 'prerequisite_based']);

// Learning Profile
export const learningProfileCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  learning_style: learningStyleEnum,
  preferred_difficulty: difficultyEnum.optional(),
  preferred_content_types: z.array(contentTypeEnum).optional(),
  language_preference: z.string().max(10).optional(),
  study_hours_per_day: z.number().min(0).max(24).optional(),
  goals: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const learningProfileUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  learning_style: learningStyleEnum.optional(),
  preferred_difficulty: difficultyEnum.optional(),
  preferred_content_types: z.array(contentTypeEnum).optional(),
  language_preference: z.string().max(10).optional(),
  study_hours_per_day: z.number().min(0).max(24).optional(),
  goals: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Skill Graph
export const skillGraphCreateSchema = z.object({
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  skills: z.array(z.object({
    skill_id: z.string().uuid(),
    name: z.string().max(200),
    level: skillLevelEnum,
    prerequisites: z.array(z.string().uuid()).optional(),
  })).min(1),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const skillGraphUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  skills: z.array(z.object({
    skill_id: z.string().uuid(),
    name: z.string().max(200),
    level: skillLevelEnum,
    prerequisites: z.array(z.string().uuid()).optional(),
  })).optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Competency
export const competencyCreateSchema = z.object({
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100),
  category: z.string().max(100).optional(),
  level: skillLevelEnum,
  parent_competency_id: z.string().uuid().optional(),
  assessment_criteria: z.array(z.string().max(500)).optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const competencyUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100).optional(),
  category: z.string().max(100).optional(),
  level: skillLevelEnum.optional(),
  parent_competency_id: z.string().uuid().optional(),
  assessment_criteria: z.array(z.string().max(500)).optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Competency Progression
export const competencyProgressionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  competency_id: z.string().uuid(),
  current_level: masteryLevelEnum,
  target_level: masteryLevelEnum,
  progress_percentage: z.number().min(0).max(100),
  evidence: z.array(z.string().max(500)).optional(),
  teacher_notes: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const competencyProgressionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  current_level: masteryLevelEnum.optional(),
  target_level: masteryLevelEnum.optional(),
  progress_percentage: z.number().min(0).max(100).optional(),
  evidence: z.array(z.string().max(500)).optional(),
  teacher_notes: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Mastery Tracking
export const masteryTrackingCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  overall_mastery: z.number().min(0).max(100),
  skill_scores: z.record(z.number().min(0).max(100)),
  last_assessment_date: z.string().datetime(),
  trend: z.enum(['improving', 'stable', 'declining']),
  metadata: z.record(z.unknown()).optional(),
});

export const masteryTrackingUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  overall_mastery: z.number().min(0).max(100).optional(),
  skill_scores: z.record(z.number().min(0).max(100)).optional(),
  last_assessment_date: z.string().datetime().optional(),
  trend: z.enum(['improving', 'stable', 'declining']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Knowledge Map
export const knowledgeMapCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  concepts: z.array(z.object({
    concept_id: z.string().uuid(),
    name: z.string().max(200),
    understanding_level: z.number().min(0).max(1),
    connections: z.array(z.string().uuid()).optional(),
  })).min(1),
  overall_coverage: z.number().min(0).max(100),
  metadata: z.record(z.unknown()).optional(),
});

export const knowledgeMapUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  concepts: z.array(z.object({
    concept_id: z.string().uuid(),
    name: z.string().max(200),
    understanding_level: z.number().min(0).max(1),
    connections: z.array(z.string().uuid()).optional(),
  })).optional(),
  overall_coverage: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Learning Objective
export const learningObjectiveCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  bloom_level: z.enum(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']),
  competencies: z.array(z.string().uuid()).optional(),
  assessment_methods: z.array(z.enum(['quiz', 'project', 'presentation', 'observation', 'portfolio'])).optional(),
  estimated_hours: z.number().min(0).max(100).optional(),
  is_mandatory: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const learningObjectiveUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  bloom_level: z.enum(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']).optional(),
  competencies: z.array(z.string().uuid()).optional(),
  assessment_methods: z.array(z.enum(['quiz', 'project', 'presentation', 'observation', 'portfolio'])).optional(),
  estimated_hours: z.number().min(0).max(100).optional(),
  is_mandatory: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Learning Path
export const learningPathCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100),
  status: pathStatusEnum,
  objectives: z.array(z.string().uuid()).min(1),
  estimated_duration_hours: z.number().min(0).max(500),
  difficulty: difficultyEnum,
  is_adaptive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const learningPathUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100).optional(),
  status: pathStatusEnum.optional(),
  objectives: z.array(z.string().uuid()).optional(),
  estimated_duration_hours: z.number().min(0).max(500).optional(),
  difficulty: difficultyEnum.optional(),
  is_adaptive: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Adaptive Sequencing
export const adaptiveSequencingCreateSchema = z.object({
  school_id: z.string().uuid(),
  path_id: z.string().uuid(),
  student_id: z.string().uuid(),
  strategy: sequencingStrategyEnum,
  current_position: z.number().int().min(0),
  total_items: z.number().int().min(1),
  completed_items: z.number().int().min(0),
  next_items: z.array(z.string().uuid()).optional(),
  adaptation_rules: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const adaptiveSequencingUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  strategy: sequencingStrategyEnum.optional(),
  current_position: z.number().int().min(0).optional(),
  completed_items: z.number().int().min(0).optional(),
  next_items: z.array(z.string().uuid()).optional(),
  adaptation_rules: z.record(z.unknown()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Adaptive Recommendation
export const adaptiveRecommendationCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  type: z.enum(['lesson', 'exercise', 'resource', 'activity', 'assessment']),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  reason: z.string().max(500),
  confidence: z.number().min(0).max(1),
  priority: z.number().int().min(1).max(10),
  content_id: z.string().uuid().optional(),
  estimated_time_minutes: z.number().int().min(0).optional(),
  is_dismissed: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const adaptiveRecommendationUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  is_dismissed: z.boolean().optional(),
  is_completed: z.boolean().optional(),
  feedback_rating: z.number().int().min(1).max(5).optional(),
  feedback_comment: z.string().max(500).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Weakness Detection
export const weaknessDetectionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  skill_id: z.string().uuid(),
  skill_name: z.string().max(200),
  weakness_score: z.number().min(0).max(1),
  error_patterns: z.array(z.string().max(200)).optional(),
  detected_from: z.array(z.string().max(200)).optional(),
  recommended_actions: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const weaknessDetectionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  weakness_score: z.number().min(0).max(1).optional(),
  error_patterns: z.array(z.string().max(200)).optional(),
  recommended_actions: z.array(z.string().max(500)).optional(),
  is_resolved: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Strength Detection
export const strengthDetectionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  skill_id: z.string().uuid(),
  skill_name: z.string().max(200),
  strength_score: z.number().min(0).max(1),
  evidence: z.array(z.string().max(200)).optional(),
  enhancement_suggestions: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const strengthDetectionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  strength_score: z.number().min(0).max(1).optional(),
  evidence: z.array(z.string().max(200)).optional(),
  enhancement_suggestions: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Difficulty Adjustment
export const difficultyAdjustmentCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  current_difficulty: difficultyEnum,
  recommended_difficulty: difficultyEnum,
  adjustment_reason: z.string().max(500),
  performance_score: z.number().min(0).max(100),
  time_spent_minutes: z.number().int().min(0),
  metadata: z.record(z.unknown()).optional(),
});

export const difficultyAdjustmentUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  recommended_difficulty: difficultyEnum.optional(),
  adjustment_reason: z.string().max(500).optional(),
  is_applied: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Learning Pace
export const learningPaceCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  pace_rating: z.enum(['very_slow', 'slow', 'average', 'fast', 'very_fast']),
  sessions_per_week: z.number().int().min(0).max(50),
  avg_session_duration_minutes: z.number().int().min(0).max(480),
  completion_rate: z.number().min(0).max(100),
  last_activity_date: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const learningPaceUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  pace_rating: z.enum(['very_slow', 'slow', 'average', 'fast', 'very_fast']).optional(),
  sessions_per_week: z.number().int().min(0).max(50).optional(),
  avg_session_duration_minutes: z.number().int().min(0).max(480).optional(),
  completion_rate: z.number().min(0).max(100).optional(),
  last_activity_date: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Personalized Curriculum
export const personalizedCurriculumCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  grade_level: z.number().int().min(1).max(12),
  subjects: z.array(z.string().max(100)).min(1),
  learning_objectives: z.array(z.string().uuid()).min(1),
  adaptation_rules: z.record(z.unknown()).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const personalizedCurriculumUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  subjects: z.array(z.string().max(100)).optional(),
  learning_objectives: z.array(z.string().uuid()).optional(),
  adaptation_rules: z.record(z.unknown()).optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Remediation Plan
export const remediationPlanCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  weakness_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  activities: z.array(z.object({
    activity_type: z.enum(['lesson', 'exercise', 'quiz', 'video', 'practice']),
    content_id: z.string().uuid(),
    estimated_time_minutes: z.number().int().min(1),
    order: z.number().int().min(1),
  })).min(1),
  target_date: z.string().datetime().optional(),
  status: z.enum(['draft', 'active', 'in_progress', 'completed', 'cancelled']),
  metadata: z.record(z.unknown()).optional(),
});

export const remediationPlanUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  activities: z.array(z.object({
    activity_type: z.enum(['lesson', 'exercise', 'quiz', 'video', 'practice']),
    content_id: z.string().uuid(),
    estimated_time_minutes: z.number().int().min(1),
    order: z.number().int().min(1),
  })).optional(),
  target_date: z.string().datetime().optional(),
  status: z.enum(['draft', 'active', 'in_progress', 'completed', 'cancelled']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Skill Assessment
export const skillAssessmentCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  skill_id: z.string().uuid(),
  skill_name: z.string().max(200),
  assessment_type: assessmentTypeEnum,
  score: z.number().min(0).max(100),
  level_achieved: skillLevelEnum,
  questions_attempted: z.number().int().min(0),
  questions_correct: z.number().int().min(0),
  time_taken_minutes: z.number().int().min(0),
  feedback: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const skillAssessmentUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  score: z.number().min(0).max(100).optional(),
  level_achieved: skillLevelEnum.optional(),
  questions_attempted: z.number().int().min(0).optional(),
  questions_correct: z.number().int().min(0).optional(),
  time_taken_minutes: z.number().int().min(0).optional(),
  feedback: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

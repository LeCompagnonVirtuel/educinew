import { z } from 'zod';

const cognitiveTypeEnum = z.enum(['visual_spatial', 'logical_mathematical', 'verbal_linguistic', 'bodily_kinesthetic', 'musical', 'interpersonal', 'intrapersonal', 'naturalistic']);
const engagementLevelEnum = z.enum(['disengaged', 'low', 'moderate', 'high', 'very_high']);
const motivationSourceEnum = z.enum(['intrinsic', 'extrinsic', 'mixed']);
const emotionalStateEnum = z.enum(['positive', 'neutral', 'negative', 'anxious', 'frustrated', 'bored', 'excited', 'confused']);
const riskLevelEnum = z.enum(['low', 'medium', 'high', 'critical']);
const interventionTypeEnum = z.enum(['content_adjustment', 'pace_change', 'tutoring', 'motivation_boost', 'peer_support', 'rest_break']);
const questionTypeEnum = z.enum(['multiple_choice', 'true_false', 'fill_blank', 'short_answer', 'essay', 'matching', 'ordering', 'interactive']);

// Cognitive Profile
export const cognitiveProfileCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  dominant_type: cognitiveTypeEnum,
  cognitive_scores: z.record(z.number().min(0).max(100)),
  working_memory_capacity: z.number().int().min(0).max(100),
  processing_speed: z.number().min(0).max(100),
  attention_span_minutes: z.number().int().min(1).max(180),
  metadata: z.record(z.unknown()).optional(),
});

export const cognitiveProfileUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  dominant_type: cognitiveTypeEnum.optional(),
  cognitive_scores: z.record(z.number().min(0).max(100)).optional(),
  working_memory_capacity: z.number().int().min(0).max(100).optional(),
  processing_speed: z.number().min(0).max(100).optional(),
  attention_span_minutes: z.number().int().min(1).max(180).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Memory Retention
export const memoryRetentionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  concept_id: z.string().uuid(),
  retention_rate: z.number().min(0).max(1),
  review_count: z.number().int().min(0),
  last_review_date: z.string().datetime(),
  next_review_date: z.string().datetime(),
  forgetting_curve_data: z.array(z.object({
    days_since_learning: z.number().int().min(0),
    retention: z.number().min(0).max(1),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const memoryRetentionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  retention_rate: z.number().min(0).max(1).optional(),
  review_count: z.number().int().min(0).optional(),
  last_review_date: z.string().datetime().optional(),
  next_review_date: z.string().datetime().optional(),
  forgetting_curve_data: z.array(z.object({
    days_since_learning: z.number().int().min(0),
    retention: z.number().min(0).max(1),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Attention Score
export const attentionScoreCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  session_id: z.string().uuid(),
  score: z.number().min(0).max(100),
  duration_minutes: z.number().int().min(1),
  focus_periods: z.number().int().min(0),
  distraction_events: z.number().int().min(0),
  attention_pattern: z.array(z.number().min(0).max(100)).optional(),
  peak_attention_time: z.string().max(50).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const attentionScoreUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  score: z.number().min(0).max(100).optional(),
  focus_periods: z.number().int().min(0).optional(),
  distraction_events: z.number().int().min(0).optional(),
  attention_pattern: z.array(z.number().min(0).max(100)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Motivation Index
export const motivationIndexCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  overall_score: z.number().min(0).max(100),
  source: motivationSourceEnum,
  goal_clarity: z.number().min(0).max(100),
  self_efficacy: z.number().min(0).max(100),
  interest_level: z.number().min(0).max(100),
  persistence_score: z.number().min(0).max(100),
  factors: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const motivationIndexUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  overall_score: z.number().min(0).max(100).optional(),
  source: motivationSourceEnum.optional(),
  goal_clarity: z.number().min(0).max(100).optional(),
  self_efficacy: z.number().min(0).max(100).optional(),
  interest_level: z.number().min(0).max(100).optional(),
  persistence_score: z.number().min(0).max(100).optional(),
  factors: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Engagement Index
export const engagementIndexCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  level: engagementLevelEnum,
  score: z.number().min(0).max(100),
  time_on_task_minutes: z.number().int().min(0),
  interaction_count: z.number().int().min(0),
  completion_rate: z.number().min(0).max(100),
  participation_score: z.number().min(0).max(100),
  session_date: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const engagementIndexUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  level: engagementLevelEnum.optional(),
  score: z.number().min(0).max(100).optional(),
  time_on_task_minutes: z.number().int().min(0).optional(),
  interaction_count: z.number().int().min(0).optional(),
  completion_rate: z.number().min(0).max(100).optional(),
  participation_score: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Learning Speed
export const learningSpeedCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  speed_rating: z.enum(['very_slow', 'slow', 'average', 'fast', 'very_fast']),
  concepts_per_hour: z.number().min(0).max(50),
  avg_time_to_mastery_hours: z.number().min(0).max(100),
  efficiency_score: z.number().min(0).max(100),
  comparison_to_peers: z.number().min(-100).max(100),
  metadata: z.record(z.unknown()).optional(),
});

export const learningSpeedUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  speed_rating: z.enum(['very_slow', 'slow', 'average', 'fast', 'very_fast']).optional(),
  concepts_per_hour: z.number().min(0).max(50).optional(),
  avg_time_to_mastery_hours: z.number().min(0).max(100).optional(),
  efficiency_score: z.number().min(0).max(100).optional(),
  comparison_to_peers: z.number().min(-100).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Learning Curve
export const learningCurveCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  curve_type: z.enum(['exponential', 'linear', 'logarithmic', 's_shaped']),
  data_points: z.array(z.object({
    session_number: z.number().int().min(1),
    performance: z.number().min(0).max(100),
    time_spent_minutes: z.number().int().min(0),
  })).min(1),
  predicted_mastery_date: z.string().datetime().optional(),
  confidence_interval: z.number().min(0).max(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const learningCurveUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  curve_type: z.enum(['exponential', 'linear', 'logarithmic', 's_shaped']).optional(),
  data_points: z.array(z.object({
    session_number: z.number().int().min(1),
    performance: z.number().min(0).max(100),
    time_spent_minutes: z.number().int().min(0),
  })).optional(),
  predicted_mastery_date: z.string().datetime().optional(),
  confidence_interval: z.number().min(0).max(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Behaviour Prediction
export const behaviourPredictionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  prediction_type: z.enum(['dropout_risk', 'low_performance', 'absenteeism', 'disengagement', 'academic_improvement']),
  probability: z.number().min(0).max(1),
  confidence: z.number().min(0).max(1),
  risk_factors: z.array(z.string().max(200)).optional(),
  protective_factors: z.array(z.string().max(200)).optional(),
  recommended_interventions: z.array(z.string().max(500)).optional(),
  prediction_date: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const behaviourPredictionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  probability: z.number().min(0).max(1).optional(),
  confidence: z.number().min(0).max(1).optional(),
  risk_factors: z.array(z.string().max(200)).optional(),
  protective_factors: z.array(z.string().max(200)).optional(),
  recommended_interventions: z.array(z.string().max(500)).optional(),
  is_resolved: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Academic Risk
export const academicRiskCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  risk_level: riskLevelEnum,
  risk_score: z.number().min(0).max(100),
  contributing_factors: z.array(z.object({
    factor: z.string().max(200),
    weight: z.number().min(0).max(1),
  })).optional(),
  early_warning_indicators: z.array(z.string().max(200)).optional(),
  assessment_date: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const academicRiskUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  risk_level: riskLevelEnum.optional(),
  risk_score: z.number().min(0).max(100).optional(),
  contributing_factors: z.array(z.object({
    factor: z.string().max(200),
    weight: z.number().min(0).max(1),
  })).optional(),
  early_warning_indicators: z.array(z.string().max(200)).optional(),
  is_mitigated: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Emotional Indicator
export const emotionalIndicatorCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  state: emotionalStateEnum,
  confidence: z.number().min(0).max(1),
  source: z.enum(['self_report', 'behavioral', 'text_analysis', 'facial_expression']),
  context: z.string().max(500).optional(),
  indicators: z.array(z.string().max(200)).optional(),
  recorded_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const emotionalIndicatorUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  state: emotionalStateEnum.optional(),
  confidence: z.number().min(0).max(1).optional(),
  context: z.string().max(500).optional(),
  indicators: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Burnout Detection
export const burnoutDetectionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  burnout_score: z.number().min(0).max(100),
  risk_level: riskLevelEnum,
  emotional_exhaustion: z.number().min(0).max(100),
  academic_burnout: z.number().min(0).max(100),
  social_burnout: z.number().min(0).max(100),
  symptoms: z.array(z.string().max(200)).optional(),
  recommended_actions: z.array(z.string().max(500)).optional(),
  assessment_date: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const burnoutDetectionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  burnout_score: z.number().min(0).max(100).optional(),
  risk_level: riskLevelEnum.optional(),
  emotional_exhaustion: z.number().min(0).max(100).optional(),
  academic_burnout: z.number().min(0).max(100).optional(),
  social_burnout: z.number().min(0).max(100).optional(),
  symptoms: z.array(z.string().max(200)).optional(),
  recommended_actions: z.array(z.string().max(500)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Intervention Suggestion
export const interventionSuggestionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  intervention_type: interventionTypeEnum,
  title: z.string().min(1).max(200),
  description: z.string().max(1000),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  confidence: z.number().min(0).max(1),
  trigger_reason: z.string().max(500),
  expected_outcome: z.string().max(500).optional(),
  assigned_to: z.string().uuid().optional(),
  due_date: z.string().datetime().optional(),
  status: z.enum(['suggested', 'accepted', 'in_progress', 'completed', 'rejected']),
  metadata: z.record(z.unknown()).optional(),
});

export const interventionSuggestionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  assigned_to: z.string().uuid().optional(),
  due_date: z.string().datetime().optional(),
  status: z.enum(['suggested', 'accepted', 'in_progress', 'completed', 'rejected']).optional(),
  outcome_notes: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Dynamic Quiz
export const dynamicQuizCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  title: z.string().min(1).max(200),
  questions: z.array(z.object({
    question_type: questionTypeEnum,
    content: z.string().min(1).max(2000),
    options: z.array(z.string().max(500)).optional(),
    correct_answer: z.string().max(1000),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    skill_id: z.string().uuid().optional(),
    time_limit_seconds: z.number().int().min(0).optional(),
    hints: z.array(z.string().max(500)).optional(),
  })).min(1),
  adaptive_rules: z.record(z.unknown()).optional(),
  total_time_minutes: z.number().int().min(1),
  passing_score: z.number().min(0).max(100),
  metadata: z.record(z.unknown()).optional(),
});

export const dynamicQuizUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  questions: z.array(z.object({
    question_type: questionTypeEnum,
    content: z.string().min(1).max(2000),
    options: z.array(z.string().max(500)).optional(),
    correct_answer: z.string().max(1000),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    skill_id: z.string().uuid().optional(),
    time_limit_seconds: z.number().int().min(0).optional(),
    hints: z.array(z.string().max(500)).optional(),
  })).optional(),
  adaptive_rules: z.record(z.unknown()).optional(),
  total_time_minutes: z.number().int().min(1).optional(),
  passing_score: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Adaptive Homework
export const adaptiveHomeworkCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  tasks: z.array(z.object({
    task_type: z.enum(['reading', 'exercise', 'project', 'research', 'practice']),
    content_id: z.string().uuid().optional(),
    instructions: z.string().max(1000),
    estimated_minutes: z.number().int().min(1),
    difficulty: z.enum(['easy', 'medium', 'hard']),
  })).min(1),
  deadline: z.string().datetime(),
  is_adaptive: z.boolean().optional(),
  max_attempts: z.number().int().min(1).max(10).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const adaptiveHomeworkUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  tasks: z.array(z.object({
    task_type: z.enum(['reading', 'exercise', 'project', 'research', 'practice']),
    content_id: z.string().uuid().optional(),
    instructions: z.string().max(1000),
    estimated_minutes: z.number().int().min(1),
    difficulty: z.enum(['easy', 'medium', 'hard']),
  })).optional(),
  deadline: z.string().datetime().optional(),
  is_adaptive: z.boolean().optional(),
  max_attempts: z.number().int().min(1).max(10).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Personalized Exercise
export const personalizedExerciseCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  skill_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  exercise_type: z.enum(['drill', 'problem_solving', 'creative', 'collaborative', 'simulation']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  content: z.record(z.unknown()),
  hints: z.array(z.string().max(500)).optional(),
  solution: z.string().max(2000).optional(),
  time_limit_minutes: z.number().int().min(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const personalizedExerciseUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  exercise_type: z.enum(['drill', 'problem_solving', 'creative', 'collaborative', 'simulation']).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  content: z.record(z.unknown()).optional(),
  hints: z.array(z.string().max(500)).optional(),
  solution: z.string().max(2000).optional(),
  time_limit_minutes: z.number().int().min(1).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Smart Revision
export const smartRevisionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  revision_items: z.array(z.object({
    concept_id: z.string().uuid(),
    concept_name: z.string().max(200),
    last_studied: z.string().datetime(),
    mastery_level: z.number().min(0).max(1),
    revision_priority: z.number().int().min(1).max(10),
  })).min(1),
  algorithm: z.enum(['spaced_retrieval', 'interleaving', 'elaborative_interrogation', 'practice_testing']),
  schedule: z.array(z.object({
    date: z.string().datetime(),
    concepts: z.array(z.string().uuid()),
    estimated_minutes: z.number().int().min(1),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const smartRevisionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  revision_items: z.array(z.object({
    concept_id: z.string().uuid(),
    concept_name: z.string().max(200),
    last_studied: z.string().datetime(),
    mastery_level: z.number().min(0).max(1),
    revision_priority: z.number().int().min(1).max(10),
  })).optional(),
  algorithm: z.enum(['spaced_retrieval', 'interleaving', 'elaborative_interrogation', 'practice_testing']).optional(),
  schedule: z.array(z.object({
    date: z.string().datetime(),
    concepts: z.array(z.string().uuid()),
    estimated_minutes: z.number().int().min(1),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// AI Question Generator
export const aiQuestionGeneratorCreateSchema = z.object({
  school_id: z.string().uuid(),
  subject: z.string().max(100),
  topic: z.string().max(200),
  question_type: questionTypeEnum,
  difficulty: z.enum(['easy', 'medium', 'hard']),
  count: z.number().int().min(1).max(50),
  context: z.string().max(2000).optional(),
  learning_objectives: z.array(z.string().uuid()).optional(),
  language: z.enum(['fr', 'en']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const aiQuestionGeneratorUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  topic: z.string().max(200).optional(),
  question_type: questionTypeEnum.optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  count: z.number().int().min(1).max(50).optional(),
  context: z.string().max(2000).optional(),
  learning_objectives: z.array(z.string().uuid()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Hint Usage
export const hintUsageCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  question_id: z.string().uuid(),
  hint_level: z.number().int().min(1).max(5),
  hint_content: z.string().max(1000),
  used_at: z.string().datetime(),
  time_to_answer_after_hint_seconds: z.number().int().min(0).optional(),
  answered_correctly_after_hint: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const hintUsageUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  time_to_answer_after_hint_seconds: z.number().int().min(0).optional(),
  answered_correctly_after_hint: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Error Analysis
export const errorAnalysisCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  question_id: z.string().uuid(),
  subject: z.string().max(100),
  skill_id: z.string().uuid(),
  error_type: z.enum(['conceptual', 'procedural', 'careless', 'misread', 'time_pressure', 'knowledge_gap']),
  student_answer: z.string().max(2000),
  correct_answer: z.string().max(2000),
  error_description: z.string().max(1000),
  misconception: z.string().max(500).optional(),
  suggested_remediation: z.string().max(1000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const errorAnalysisUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  error_type: z.enum(['conceptual', 'procedural', 'careless', 'misread', 'time_pressure', 'knowledge_gap']).optional(),
  misconception: z.string().max(500).optional(),
  suggested_remediation: z.string().max(1000).optional(),
  is_addressed: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Concept Reinforcement
export const conceptReinforcementCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  concept_id: z.string().uuid(),
  concept_name: z.string().max(200),
  subject: z.string().max(100),
  current_mastery: z.number().min(0).max(1),
  target_mastery: z.number().min(0).max(1),
  reinforcement_method: z.enum(['practice', 'explanation', 'example', 'analogy', 'visualization', 'discussion']),
  resources: z.array(z.object({
    type: z.enum(['video', 'article', 'exercise', 'quiz', 'interactive']),
    content_id: z.string().uuid(),
    title: z.string().max(200),
  })).min(1),
  estimated_time_minutes: z.number().int().min(1),
  status: z.enum(['pending', 'in_progress', 'completed']),
  metadata: z.record(z.unknown()).optional(),
});

export const conceptReinforcementUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  current_mastery: z.number().min(0).max(1).optional(),
  reinforcement_method: z.enum(['practice', 'explanation', 'example', 'analogy', 'visualization', 'discussion']).optional(),
  resources: z.array(z.object({
    type: z.enum(['video', 'article', 'exercise', 'quiz', 'interactive']),
    content_id: z.string().uuid(),
    title: z.string().max(200),
  })).optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

import { z } from 'zod';

const tutorSpecialtyEnum = z.enum(['math', 'science', 'language', 'history', 'programming', 'arts', 'general']);
const conversationTypeEnum = z.enum(['homework_help', 'concept_explanation', 'practice', 'exam_prep', 'general']);
const solverTypeEnum = z.enum(['algebra', 'geometry', 'calculus', 'statistics', 'word_problems']);
const scienceDomainEnum = z.enum(['physics', 'chemistry', 'biology', 'earth_science', 'environmental']);
const programmingLanguageEnum = z.enum(['python', 'javascript', 'java', 'c_cpp', 'html_css', 'sql', 'scratch']);
const essayTypeEnum = z.enum(['narrative', 'argumentative', 'expository', 'descriptive', 'persuasive']);
const dashboardTypeEnum = z.enum(['student', 'teacher', 'parent', 'school']);
const insightCategoryEnum = z.enum(['performance', 'progress', 'engagement', 'behavior', 'risk', 'achievement']);
const reportFormatEnum = z.enum(['pdf', 'html', 'json', 'csv']);

// AI Tutor
export const aiTutorCreateSchema = z.object({
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  specialty: tutorSpecialtyEnum,
  subjects: z.array(z.string().max(100)).min(1),
  grade_levels: z.array(z.number().int().min(1).max(12)).min(1),
  personality: z.enum(['friendly', 'strict', 'encouraging', 'patient', 'enthusiastic']),
  language: z.enum(['fr', 'en', 'bilingual']),
  capabilities: z.array(z.enum(['explanation', 'practice', 'assessment', 'motivation', 'parental_update'])).optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const aiTutorUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  specialty: tutorSpecialtyEnum.optional(),
  subjects: z.array(z.string().max(100)).optional(),
  grade_levels: z.array(z.number().int().min(1).max(12)).optional(),
  personality: z.enum(['friendly', 'strict', 'encouraging', 'patient', 'enthusiastic']).optional(),
  language: z.enum(['fr', 'en', 'bilingual']).optional(),
  capabilities: z.array(z.enum(['explanation', 'practice', 'assessment', 'motivation', 'parental_update'])).optional(),
  is_active: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Tutor Conversation
export const tutorConversationCreateSchema = z.object({
  school_id: z.string().uuid(),
  tutor_id: z.string().uuid(),
  student_id: z.string().uuid(),
  conversation_type: conversationTypeEnum,
  subject: z.string().max(100),
  messages: z.array(z.object({
    role: z.enum(['student', 'tutor']),
    content: z.string().max(5000),
    timestamp: z.string().datetime(),
    attachments: z.array(z.string().max(500)).optional(),
  })).min(1),
  started_at: z.string().datetime(),
  ended_at: z.string().datetime().optional(),
  satisfaction_rating: z.number().int().min(1).max(5).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const tutorConversationUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  messages: z.array(z.object({
    role: z.enum(['student', 'tutor']),
    content: z.string().max(5000),
    timestamp: z.string().datetime(),
    attachments: z.array(z.string().max(500)).optional(),
  })).optional(),
  ended_at: z.string().datetime().optional(),
  satisfaction_rating: z.number().int().min(1).max(5).optional(),
  summary: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Homework Assistance
export const homeworkAssistanceCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  tutor_id: z.string().uuid().optional(),
  subject: z.string().max(100),
  assignment_title: z.string().max(200),
  questions: z.array(z.object({
    question_text: z.string().max(2000),
    student_attempt: z.string().max(2000).optional(),
    assistance_provided: z.string().max(2000),
    is_resolved: z.boolean(),
    explanation: z.string().max(2000).optional(),
  })).min(1),
  total_time_minutes: z.number().int().min(0),
  assistance_level: z.enum(['hint', 'guided', 'detailed', 'full']),
  metadata: z.record(z.unknown()).optional(),
});

export const homeworkAssistanceUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  questions: z.array(z.object({
    question_text: z.string().max(2000),
    student_attempt: z.string().max(2000).optional(),
    assistance_provided: z.string().max(2000),
    is_resolved: z.boolean(),
    explanation: z.string().max(2000).optional(),
  })).optional(),
  total_time_minutes: z.number().int().min(0).optional(),
  assistance_level: z.enum(['hint', 'guided', 'detailed', 'full']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Concept Explanation
export const conceptExplanationCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  tutor_id: z.string().uuid().optional(),
  concept: z.string().min(1).max(200),
  subject: z.string().max(100),
  explanation_text: z.string().min(1).max(5000),
  explanation_type: z.enum(['simple', 'detailed', 'analogical', 'visual', 'step_by_step']),
  examples: z.array(z.string().max(1000)).optional(),
  prerequisites: z.array(z.string().max(200)).optional(),
  student_feedback: z.enum(['understood', 'partially_understood', 'confused', 'needs_more']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const conceptExplanationUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  explanation_text: z.string().min(1).max(5000).optional(),
  explanation_type: z.enum(['simple', 'detailed', 'analogical', 'visual', 'step_by_step']).optional(),
  examples: z.array(z.string().max(1000)).optional(),
  student_feedback: z.enum(['understood', 'partially_understood', 'confused', 'needs_more']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Conversation Memory
export const conversationMemoryCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  tutor_id: z.string().uuid(),
  conversation_id: z.string().uuid(),
  key_topics: z.array(z.string().max(200)).min(1),
  learned_preferences: z.array(z.string().max(200)).optional(),
  common_misconceptions: z.array(z.string().max(200)).optional(),
  progress_notes: z.string().max(2000).optional(),
  next_session_focus: z.array(z.string().max(200)).optional(),
  created_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const conversationMemoryUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  key_topics: z.array(z.string().max(200)).optional(),
  learned_preferences: z.array(z.string().max(200)).optional(),
  common_misconceptions: z.array(z.string().max(200)).optional(),
  progress_notes: z.string().max(2000).optional(),
  next_session_focus: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Math Solver
export const mathSolverCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  problem_text: z.string().min(1).max(3000),
  solver_type: solverTypeEnum,
  solution_steps: z.array(z.object({
    step_number: z.number().int().min(1),
    description: z.string().max(500),
    formula: z.string().max(500).optional(),
    result: z.string().max(200),
  })).min(1),
  final_answer: z.string().max(500),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  time_to_solve_seconds: z.number().int().min(0),
  metadata: z.record(z.unknown()).optional(),
});

export const mathSolverUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  solution_steps: z.array(z.object({
    step_number: z.number().int().min(1),
    description: z.string().max(500),
    formula: z.string().max(500).optional(),
    result: z.string().max(200),
  })).optional(),
  final_answer: z.string().max(500).optional(),
  student_rating: z.number().int().min(1).max(5).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Science Solver
export const scienceSolverCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  question: z.string().min(1).max(3000),
  domain: scienceDomainEnum,
  answer: z.string().min(1).max(3000),
  explanation: z.string().min(1).max(5000),
  key_concepts: z.array(z.string().max(200)).min(1),
  related_formulas: z.array(z.string().max(500)).optional(),
  diagrams: z.array(z.string().max(500)).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  metadata: z.record(z.unknown()).optional(),
});

export const scienceSolverUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  answer: z.string().min(1).max(3000).optional(),
  explanation: z.string().min(1).max(5000).optional(),
  key_concepts: z.array(z.string().max(200)).optional(),
  related_formulas: z.array(z.string().max(500)).optional(),
  diagrams: z.array(z.string().max(500)).optional(),
  student_rating: z.number().int().min(1).max(5).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Programming Tutor
export const programmingTutorCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  language: programmingLanguageEnum,
  exercise_title: z.string().min(1).max(200),
  problem_description: z.string().min(1).max(3000),
  student_code: z.string().max(10000),
  feedback: z.string().max(5000),
  suggestions: z.array(z.string().max(500)).optional(),
  code_quality_score: z.number().int().min(0).max(100).optional(),
  concepts_practiced: z.array(z.string().max(200)).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  metadata: z.record(z.unknown()).optional(),
});

export const programmingTutorUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  feedback: z.string().max(5000).optional(),
  suggestions: z.array(z.string().max(500)).optional(),
  code_quality_score: z.number().int().min(0).max(100).optional(),
  concepts_practiced: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Essay Assistant
export const essayAssistantCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  essay_type: essayTypeEnum,
  subject: z.string().max(100),
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(20000),
  language: z.enum(['fr', 'en']),
  feedback: z.object({
    grammar_score: z.number().int().min(0).max(100),
    vocabulary_score: z.number().int().min(0).max(100),
    structure_score: z.number().int().min(0).max(100),
    argumentation_score: z.number().int().min(0).max(100),
    overall_score: z.number().int().min(0).max(100),
    suggestions: z.array(z.string().max(500)),
    corrected_version: z.string().max(20000).optional(),
  }),
  word_count: z.number().int().min(0),
  reading_level: z.enum(['elementary', 'intermediate', 'advanced', 'expert']),
  metadata: z.record(z.unknown()).optional(),
});

export const essayAssistantUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  content: z.string().min(1).max(20000).optional(),
  feedback: z.object({
    grammar_score: z.number().int().min(0).max(100),
    vocabulary_score: z.number().int().min(0).max(100),
    structure_score: z.number().int().min(0).max(100),
    argumentation_score: z.number().int().min(0).max(100),
    overall_score: z.number().int().min(0).max(100),
    suggestions: z.array(z.string().max(500)),
    corrected_version: z.string().max(20000).optional(),
  }).optional(),
  word_count: z.number().int().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Mastery Dashboard
export const masteryDashboardCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  dashboard_type: dashboardTypeEnum,
  overall_mastery_score: z.number().min(0).max(100),
  subject_scores: z.record(z.number().min(0).max(100)),
  competency_breakdown: z.array(z.object({
    competency: z.string().max(200),
    score: z.number().min(0).max(100),
    trend: z.enum(['improving', 'stable', 'declining']),
  })).min(1),
  strengths: z.array(z.string().max(200)).optional(),
  weaknesses: z.array(z.string().max(200)).optional(),
  period: z.enum(['weekly', 'monthly', 'quarterly', 'annual']),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const masteryDashboardUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  overall_mastery_score: z.number().min(0).max(100).optional(),
  subject_scores: z.record(z.number().min(0).max(100)).optional(),
  competency_breakdown: z.array(z.object({
    competency: z.string().max(200),
    score: z.number().min(0).max(100),
    trend: z.enum(['improving', 'stable', 'declining']),
  })).optional(),
  strengths: z.array(z.string().max(200)).optional(),
  weaknesses: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Competency Dashboard
export const competencyDashboardCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  dashboard_type: dashboardTypeEnum,
  competencies: z.array(z.object({
    name: z.string().max(200),
    level: z.enum(['novice', 'developing', 'proficient', 'advanced', 'mastery']),
    score: z.number().min(0).max(100),
    evidence_count: z.number().int().min(0),
    last_assessed: z.string().datetime().optional(),
  })).min(1),
  overall_readiness: z.number().min(0).max(100),
  graduation_progress: z.number().min(0).max(100).optional(),
  period: z.enum(['weekly', 'monthly', 'quarterly', 'annual']),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const competencyDashboardUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  competencies: z.array(z.object({
    name: z.string().max(200),
    level: z.enum(['novice', 'developing', 'proficient', 'advanced', 'mastery']),
    score: z.number().min(0).max(100),
    evidence_count: z.number().int().min(0),
    last_assessed: z.string().datetime().optional(),
  })).optional(),
  overall_readiness: z.number().min(0).max(100).optional(),
  graduation_progress: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Knowledge Heatmap
export const knowledgeHeatmapCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  heatmap_data: z.array(z.object({
    topic: z.string().max(200),
    mastery_level: z.number().min(0).max(1),
    time_invested_hours: z.number().min(0),
    assessment_count: z.number().int().min(0),
    color_code: z.enum(['red', 'orange', 'yellow', 'light_green', 'dark_green']),
  })).min(1),
  period: z.enum(['weekly', 'monthly', 'quarterly']),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const knowledgeHeatmapUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  heatmap_data: z.array(z.object({
    topic: z.string().max(200),
    mastery_level: z.number().min(0).max(1),
    time_invested_hours: z.number().min(0),
    assessment_count: z.number().int().min(0),
    color_code: z.enum(['red', 'orange', 'yellow', 'light_green', 'dark_green']),
  })).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Learning Timeline
export const learningTimelineCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  events: z.array(z.object({
    event_type: z.enum(['lesson', 'assessment', 'project', 'milestone', 'intervention']),
    title: z.string().max(200),
    date: z.string().datetime(),
    subject: z.string().max(100).optional(),
    score: z.number().min(0).max(100).optional(),
    notes: z.string().max(500).optional(),
  })).min(1),
  period_start: z.string().datetime(),
  period_end: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const learningTimelineUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  events: z.array(z.object({
    event_type: z.enum(['lesson', 'assessment', 'project', 'milestone', 'intervention']),
    title: z.string().max(200),
    date: z.string().datetime(),
    subject: z.string().max(100).optional(),
    score: z.number().min(0).max(100).optional(),
    notes: z.string().max(500).optional(),
  })).optional(),
  period_start: z.string().datetime().optional(),
  period_end: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Skill Evolution
export const skillEvolutionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  skill_id: z.string().uuid(),
  skill_name: z.string().max(200),
  subject: z.string().max(100),
  evolution_data: z.array(z.object({
    date: z.string().datetime(),
    level: z.enum(['novice', 'developing', 'proficient', 'advanced', 'mastery']),
    score: z.number().min(0).max(100),
  })).min(2),
  current_level: z.enum(['novice', 'developing', 'proficient', 'advanced', 'mastery']),
  growth_rate: z.number().min(-100).max(100),
  metadata: z.record(z.unknown()).optional(),
});

export const skillEvolutionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  evolution_data: z.array(z.object({
    date: z.string().datetime(),
    level: z.enum(['novice', 'developing', 'proficient', 'advanced', 'mastery']),
    score: z.number().min(0).max(100),
  })).optional(),
  current_level: z.enum(['novice', 'developing', 'proficient', 'advanced', 'mastery']).optional(),
  growth_rate: z.number().min(-100).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Weak Topics Report
export const weakTopicsReportCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  weak_topics: z.array(z.object({
    topic: z.string().max(200),
    mastery_level: z.number().min(0).max(1),
    error_count: z.number().int().min(0),
    common_errors: z.array(z.string().max(200)).optional(),
    recommended_resources: z.array(z.string().max(200)).optional(),
  })).min(1),
  overall_weakness_score: z.number().min(0).max(100),
  priority_topics: z.array(z.string().max(200)).optional(),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const weakTopicsReportUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  weak_topics: z.array(z.object({
    topic: z.string().max(200),
    mastery_level: z.number().min(0).max(1),
    error_count: z.number().int().min(0),
    common_errors: z.array(z.string().max(200)).optional(),
    recommended_resources: z.array(z.string().max(200)).optional(),
  })).optional(),
  overall_weakness_score: z.number().min(0).max(100).optional(),
  priority_topics: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Strong Topics Report
export const strongTopicsReportCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  strong_topics: z.array(z.object({
    topic: z.string().max(200),
    mastery_level: z.number().min(0).max(1),
    assessment_count: z.number().int().min(0),
    consistency_score: z.number().min(0).max(100),
  })).min(1),
  overall_strength_score: z.number().min(0).max(100),
  leadership_potential: z.array(z.string().max(200)).optional(),
  enrichment_suggestions: z.array(z.string().max(200)).optional(),
  generated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const strongTopicsReportUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  strong_topics: z.array(z.object({
    topic: z.string().max(200),
    mastery_level: z.number().min(0).max(1),
    assessment_count: z.number().int().min(0),
    consistency_score: z.number().min(0).max(100),
  })).optional(),
  overall_strength_score: z.number().min(0).max(100).optional(),
  leadership_potential: z.array(z.string().max(200)).optional(),
  enrichment_suggestions: z.array(z.string().max(200)).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Teacher Insights
export const teacherInsightsCreateSchema = z.object({
  school_id: z.string().uuid(),
  teacher_id: z.string().uuid(),
  class_id: z.string().uuid(),
  insight_category: insightCategoryEnum,
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  affected_students: z.array(z.string().uuid()).optional(),
  recommended_actions: z.array(z.string().max(500)).optional(),
  confidence: z.number().min(0).max(1),
  data_source: z.string().max(200).optional(),
  generated_at: z.string().datetime(),
  is_read: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const teacherInsightsUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  affected_students: z.array(z.string().uuid()).optional(),
  recommended_actions: z.array(z.string().max(500)).optional(),
  is_read: z.boolean().optional(),
  is_archived: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Parent Insights
export const parentInsightsCreateSchema = z.object({
  school_id: z.string().uuid(),
  parent_id: z.string().uuid(),
  student_id: z.string().uuid(),
  insight_category: insightCategoryEnum,
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  home_recommendations: z.array(z.string().max(500)).optional(),
  encouragement_points: z.array(z.string().max(200)).optional(),
  concern_areas: z.array(z.string().max(200)).optional(),
  confidence: z.number().min(0).max(1),
  generated_at: z.string().datetime(),
  is_read: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const parentInsightsUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  home_recommendations: z.array(z.string().max(500)).optional(),
  encouragement_points: z.array(z.string().max(200)).optional(),
  concern_areas: z.array(z.string().max(200)).optional(),
  is_read: z.boolean().optional(),
  is_archived: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// School Insights
export const schoolInsightsCreateSchema = z.object({
  school_id: z.string().uuid(),
  insight_category: insightCategoryEnum,
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  scope: z.enum(['class', 'grade', 'school']),
  affected_entity_ids: z.array(z.string().uuid()).optional(),
  metrics: z.record(z.number()).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  confidence: z.number().min(0).max(1),
  data_sources: z.array(z.string().max(200)).optional(),
  generated_at: z.string().datetime(),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  metadata: z.record(z.unknown()).optional(),
});

export const schoolInsightsUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(5000).optional(),
  affected_entity_ids: z.array(z.string().uuid()).optional(),
  metrics: z.record(z.number()).optional(),
  recommendations: z.array(z.string().max(500)).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  is_archived: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Analytics Report
export const analyticsReportCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  report_type: z.enum(['student_performance', 'class_overview', 'school_analytics', 'predictive', 'comparative']),
  format: reportFormatEnum,
  date_range: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  filters: z.record(z.unknown()).optional(),
  sections: z.array(z.object({
    title: z.string().max(200),
    type: z.enum(['chart', 'table', 'text', 'metric']),
    data: z.record(z.unknown()),
  })).optional(),
  recipients: z.array(z.string().email()).optional(),
  schedule: z.enum(['once', 'daily', 'weekly', 'monthly']).optional(),
  generated_at: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const analyticsReportUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  filters: z.record(z.unknown()).optional(),
  sections: z.array(z.object({
    title: z.string().max(200),
    type: z.enum(['chart', 'table', 'text', 'metric']),
    data: z.record(z.unknown()),
  })).optional(),
  recipients: z.array(z.string().email()).optional(),
  schedule: z.enum(['once', 'daily', 'weekly', 'monthly']).optional(),
  is_archived: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

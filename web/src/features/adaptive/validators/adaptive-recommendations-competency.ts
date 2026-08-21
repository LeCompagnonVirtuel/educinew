import { z } from 'zod';

const lessonTypeEnum = z.enum(['lecture', 'tutorial', 'workshop', 'seminar', 'lab', 'field_trip']);
const videoFormatEnum = z.enum(['mp4', 'webm', 'mkv', 'mov']);
const exerciseFormatEnum = z.enum(['worksheet', 'interactive', 'practical', 'collaborative']);
const digitalLessonTypeEnum = z.enum(['interactive_presentation', 'simulated_lab', 'gamified_lesson', 'adaptive_module']);
const examFormatEnum = z.enum(['mcq', 'short_answer', 'essay', 'practical', 'oral', 'mixed']);
const gradingTypeEnum = z.enum(['auto', 'manual', 'hybrid']);
const evaluationTypeEnum = z.enum(['formative', 'summative', 'diagnostic', 'peer']);

// Recommended Lesson
export const recommendedLessonCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  lesson_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  lesson_type: lessonTypeEnum,
  difficulty: z.enum(['easy', 'medium', 'hard']),
  estimated_duration_minutes: z.number().int().min(1),
  reason: z.string().max(500),
  confidence: z.number().min(0).max(1),
  priority: z.number().int().min(1).max(10),
  tags: z.array(z.string().max(50)).optional(),
  is_dismissed: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedLessonUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  reason: z.string().max(500).optional(),
  confidence: z.number().min(0).max(1).optional(),
  priority: z.number().int().min(1).max(10).optional(),
  is_dismissed: z.boolean().optional(),
  is_completed: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedVideoCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  video_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  topic: z.string().max(200),
  duration_seconds: z.number().int().min(1),
  format: videoFormatEnum,
  url: z.string().url(),
  thumbnail_url: z.string().url().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  reason: z.string().max(500),
  confidence: z.number().min(0).max(1),
  key_concepts: z.array(z.string().max(200)).optional(),
  is_watched: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedVideoUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  reason: z.string().max(500).optional(),
  confidence: z.number().min(0).max(1).optional(),
  key_concepts: z.array(z.string().max(200)).optional(),
  is_watched: z.boolean().optional(),
  watch_progress_seconds: z.number().int().min(0).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedBookCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  book_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  author: z.string().max(200),
  subject: z.string().max(100),
  isbn: z.string().max(20).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  reason: z.string().max(500),
  confidence: z.number().min(0).max(1),
  genre: z.string().max(100).optional(),
  page_count: z.number().int().min(1).optional(),
  reading_level: z.enum(['elementary', 'intermediate', 'advanced', 'expert']).optional(),
  is_read: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedBookUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  reason: z.string().max(500).optional(),
  confidence: z.number().min(0).max(1).optional(),
  is_read: z.boolean().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  notes: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedExerciseCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  exercise_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  skill_id: z.string().uuid(),
  exercise_format: exerciseFormatEnum,
  difficulty: z.enum(['easy', 'medium', 'hard']),
  estimated_minutes: z.number().int().min(1),
  reason: z.string().max(500),
  confidence: z.number().min(0).max(1),
  learning_objectives: z.array(z.string().max(200)).optional(),
  is_completed: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedExerciseUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  reason: z.string().max(500).optional(),
  confidence: z.number().min(0).max(1).optional(),
  is_completed: z.boolean().optional(),
  score: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedProjectCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  project_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  description: z.string().max(2000),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  estimated_hours: z.number().min(1),
  reason: z.string().max(500),
  confidence: z.number().min(0).max(1),
  skills_developed: z.array(z.string().max(200)).optional(),
  deliverables: z.array(z.string().max(200)).optional(),
  is_started: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedProjectUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  reason: z.string().max(500).optional(),
  confidence: z.number().min(0).max(1).optional(),
  skills_developed: z.array(z.string().max(200)).optional(),
  deliverables: z.array(z.string().max(200)).optional(),
  is_started: z.boolean().optional(),
  progress_percentage: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedGroupCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  group_id: z.string().uuid(),
  group_name: z.string().min(1).max(200),
  subject: z.string().max(100),
  activity_type: z.enum(['study_group', 'project_team', 'peer_tutoring', 'discussion']),
  member_count: z.number().int().min(2),
  reason: z.string().max(500),
  confidence: z.number().min(0).max(1),
  skill_complementarity: z.number().min(0).max(100).optional(),
  schedule: z.string().max(200).optional(),
  is_joined: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedGroupUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  reason: z.string().max(500).optional(),
  confidence: z.number().min(0).max(1).optional(),
  skill_complementarity: z.number().min(0).max(100).optional(),
  schedule: z.string().max(200).optional(),
  is_joined: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedTutorCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  tutor_id: z.string().uuid(),
  tutor_name: z.string().min(1).max(200),
  subject: z.string().max(100),
  specialty: z.string().max(200),
  availability: z.array(z.enum(['morning', 'afternoon', 'evening', 'weekend'])),
  rating: z.number().min(0).max(5),
  reason: z.string().max(500),
  confidence: z.number().min(0).max(1),
  teaching_style: z.enum(['patient', 'challenging', 'interactive', 'structured']).optional(),
  is_contacted: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedTutorUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  availability: z.array(z.enum(['morning', 'afternoon', 'evening', 'weekend'])).optional(),
  rating: z.number().min(0).max(5).optional(),
  reason: z.string().max(500).optional(),
  confidence: z.number().min(0).max(1).optional(),
  is_contacted: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedExamCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  exam_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  exam_format: examFormatEnum,
  difficulty: z.enum(['easy', 'medium', 'hard']),
  duration_minutes: z.number().int().min(1),
  reason: z.string().max(500),
  confidence: z.number().min(0).max(1),
  topics_covered: z.array(z.string().max(200)).optional(),
  practice_count: z.number().int().min(0).optional(),
  is_attempted: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const recommendedExamUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  reason: z.string().max(500).optional(),
  confidence: z.number().min(0).max(1).optional(),
  is_attempted: z.boolean().optional(),
  best_score: z.number().min(0).max(100).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Competency Framework
export const competencyFrameworkCreateSchema = z.object({
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  version: z.string().max(50),
  grade_levels: z.array(z.number().int().min(1).max(12)).min(1),
  subjects: z.array(z.string().max(100)).min(1),
  total_competencies: z.number().int().min(1),
  is_active: z.boolean().optional(),
  effective_date: z.string().datetime().optional(),
  expiry_date: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const competencyFrameworkUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  version: z.string().max(50).optional(),
  grade_levels: z.array(z.number().int().min(1).max(12)).optional(),
  subjects: z.array(z.string().max(100)).optional(),
  total_competencies: z.number().int().min(1).optional(),
  is_active: z.boolean().optional(),
  effective_date: z.string().datetime().optional(),
  expiry_date: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Framework Competency
export const frameworkCompetencyCreateSchema = z.object({
  school_id: z.string().uuid(),
  framework_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  level: z.enum(['novice', 'developing', 'proficient', 'advanced', 'mastery']),
  parent_competency_id: z.string().uuid().optional(),
  assessment_criteria: z.array(z.string().max(500)).min(1),
  weight: z.number().min(0).max(100).optional(),
  is_mandatory: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const frameworkCompetencyUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  level: z.enum(['novice', 'developing', 'proficient', 'advanced', 'mastery']).optional(),
  parent_competency_id: z.string().uuid().optional(),
  assessment_criteria: z.array(z.string().max(500)).optional(),
  weight: z.number().min(0).max(100).optional(),
  is_mandatory: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Framework Progress
export const frameworkProgressCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  framework_id: z.string().uuid(),
  overall_progress: z.number().min(0).max(100),
  competencies_completed: z.number().int().min(0),
  total_competencies: z.number().int().min(1),
  competency_details: z.array(z.object({
    competency_id: z.string().uuid(),
    status: z.enum(['not_started', 'in_progress', 'achieved', 'advanced']),
    score: z.number().min(0).max(100).optional(),
    last_assessed: z.string().datetime().optional(),
  })).min(1),
  last_updated: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const frameworkProgressUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  overall_progress: z.number().min(0).max(100).optional(),
  competencies_completed: z.number().int().min(0).optional(),
  competency_details: z.array(z.object({
    competency_id: z.string().uuid(),
    status: z.enum(['not_started', 'in_progress', 'achieved', 'advanced']),
    score: z.number().min(0).max(100).optional(),
    last_assessed: z.string().datetime().optional(),
  })).optional(),
  last_updated: z.string().datetime().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Digital Lesson
export const digitalLessonCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  lesson_type: digitalLessonTypeEnum,
  difficulty: z.enum(['easy', 'medium', 'hard']),
  duration_minutes: z.number().int().min(1),
  content_url: z.string().url().optional(),
  learning_objectives: z.array(z.string().max(200)).min(1),
  interactivity_level: z.enum(['low', 'medium', 'high']),
  accessibility_features: z.array(z.enum(['subtitles', 'screen_reader', 'high_contrast', 'keyboard_navigation'])).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const digitalLessonUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  duration_minutes: z.number().int().min(1).optional(),
  content_url: z.string().url().optional(),
  learning_objectives: z.array(z.string().max(200)).optional(),
  interactivity_level: z.enum(['low', 'medium', 'high']).optional(),
  accessibility_features: z.array(z.enum(['subtitles', 'screen_reader', 'high_contrast', 'keyboard_navigation'])).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Interactive Lesson
export const interactiveLessonCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  interaction_type: z.enum(['drag_drop', 'click_explore', 'branching_scenario', 'collaborative', 'quiz_based']),
  content: z.array(z.object({
    step_number: z.number().int().min(1),
    instruction: z.string().max(1000),
    interaction: z.record(z.unknown()),
    feedback: z.string().max(500).optional(),
  })).min(1),
  estimated_minutes: z.number().int().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const interactiveLessonUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  interaction_type: z.enum(['drag_drop', 'click_explore', 'branching_scenario', 'collaborative', 'quiz_based']).optional(),
  content: z.array(z.object({
    step_number: z.number().int().min(1),
    instruction: z.string().max(1000),
    interaction: z.record(z.unknown()),
    feedback: z.string().max(500).optional(),
  })).optional(),
  estimated_minutes: z.number().int().min(1).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Simulation
export const simulationCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100),
  simulation_type: z.enum(['virtual_lab', 'scenario', 'modeling', 'game_based']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  estimated_minutes: z.number().int().min(1),
  learning_objectives: z.array(z.string().max(200)).min(1),
  parameters: z.record(z.unknown()).optional(),
  max_participants: z.number().int().min(1).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const simulationUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100).optional(),
  simulation_type: z.enum(['virtual_lab', 'scenario', 'modeling', 'game_based']).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  estimated_minutes: z.number().int().min(1).optional(),
  learning_objectives: z.array(z.string().max(200)).optional(),
  parameters: z.record(z.unknown()).optional(),
  max_participants: z.number().int().min(1).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Virtual Lab
export const virtualLabCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.enum(['physics', 'chemistry', 'biology', 'environmental_science']),
  lab_type: z.enum(['experiment', 'demonstration', 'exploration', 'data_collection']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  estimated_minutes: z.number().int().min(1),
  equipment: z.array(z.string().max(200)).optional(),
  safety_warnings: z.array(z.string().max(200)).optional(),
  learning_objectives: z.array(z.string().max(200)).min(1),
  assessment_criteria: z.array(z.string().max(500)).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const virtualLabUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.enum(['physics', 'chemistry', 'biology', 'environmental_science']).optional(),
  lab_type: z.enum(['experiment', 'demonstration', 'exploration', 'data_collection']).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  estimated_minutes: z.number().int().min(1).optional(),
  equipment: z.array(z.string().max(200)).optional(),
  safety_warnings: z.array(z.string().max(200)).optional(),
  learning_objectives: z.array(z.string().max(200)).optional(),
  assessment_criteria: z.array(z.string().max(500)).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// AR Lesson
export const arLessonCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  ar_type: z.enum(['marker_based', 'markerless', 'location_based', 'projection']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  estimated_minutes: z.number().int().min(1),
  compatible_devices: z.array(z.enum(['ios', 'android', 'web'])).min(1),
  model_urls: z.array(z.string().max(500)).optional(),
  learning_objectives: z.array(z.string().max(200)).min(1),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const arLessonUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  ar_type: z.enum(['marker_based', 'markerless', 'location_based', 'projection']).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  estimated_minutes: z.number().int().min(1).optional(),
  compatible_devices: z.array(z.enum(['ios', 'android', 'web'])).optional(),
  model_urls: z.array(z.string().max(500)).optional(),
  learning_objectives: z.array(z.string().max(200)).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// VR Lesson
export const vrLessonCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  vr_type: z.enum(['immersive', 'semi_immersive', 'non_immersive', '360_video']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  estimated_minutes: z.number().int().min(1),
  compatible_headsets: z.array(z.enum(['oculus', 'htc_vive', 'psvr', 'mobile_vr', 'web_xr'])).min(1),
  environment: z.record(z.unknown()).optional(),
  learning_objectives: z.array(z.string().max(200)).min(1),
  safety_guidelines: z.array(z.string().max(200)).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const vrLessonUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  vr_type: z.enum(['immersive', 'semi_immersive', 'non_immersive', '360_video']).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  estimated_minutes: z.number().int().min(1).optional(),
  compatible_headsets: z.array(z.enum(['oculus', 'htc_vive', 'psvr', 'mobile_vr', 'web_xr'])).optional(),
  environment: z.record(z.unknown()).optional(),
  learning_objectives: z.array(z.string().max(200)).optional(),
  safety_guidelines: z.array(z.string().max(200)).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Video Lesson
export const videoLessonCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  video_url: z.string().url(),
  duration_seconds: z.number().int().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  chapters: z.array(z.object({
    title: z.string().max(200),
    start_seconds: z.number().int().min(0),
    end_seconds: z.number().int().min(0),
  })).optional(),
  subtitles_available: z.array(z.enum(['fr', 'en', 'ar'])).optional(),
  learning_objectives: z.array(z.string().max(200)).min(1),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const videoLessonUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  video_url: z.string().url().optional(),
  duration_seconds: z.number().int().min(1).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  chapters: z.array(z.object({
    title: z.string().max(200),
    start_seconds: z.number().int().min(0),
    end_seconds: z.number().int().min(0),
  })).optional(),
  subtitles_available: z.array(z.enum(['fr', 'en', 'ar'])).optional(),
  learning_objectives: z.array(z.string().max(200)).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Audio Lesson
export const audioLessonCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  audio_url: z.string().url(),
  duration_seconds: z.number().int().min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  narrator: z.string().max(200).optional(),
  language: z.enum(['fr', 'en', 'ar']),
  learning_objectives: z.array(z.string().max(200)).min(1),
  transcript: z.string().max(10000).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const audioLessonUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  audio_url: z.string().url().optional(),
  duration_seconds: z.number().int().min(1).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  narrator: z.string().max(200).optional(),
  language: z.enum(['fr', 'en', 'ar']).optional(),
  learning_objectives: z.array(z.string().max(200)).optional(),
  transcript: z.string().max(10000).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Podcast
export const podcastCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  episode_number: z.number().int().min(1),
  audio_url: z.string().url(),
  duration_seconds: z.number().int().min(1),
  host: z.string().max(200).optional(),
  guests: z.array(z.string().max(200)).optional(),
  topics: z.array(z.string().max(200)).min(1),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  language: z.enum(['fr', 'en', 'ar']),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const podcastUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  episode_number: z.number().int().min(1).optional(),
  audio_url: z.string().url().optional(),
  duration_seconds: z.number().int().min(1).optional(),
  host: z.string().max(200).optional(),
  guests: z.array(z.string().max(200)).optional(),
  topics: z.array(z.string().max(200)).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  language: z.enum(['fr', 'en', 'ar']).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Flashcard
export const flashcardCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid().optional(),
  deck_name: z.string().min(1).max(200),
  subject: z.string().max(100),
  cards: z.array(z.object({
    front: z.string().min(1).max(1000),
    back: z.string().min(1).max(1000),
    hint: z.string().max(500).optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    tags: z.array(z.string().max(50)).optional(),
  })).min(1),
  learning_algorithm: z.enum(['spaced_repetition', 'leitner', 'sm2']),
  is_public: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const flashcardUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  deck_name: z.string().min(1).max(200).optional(),
  subject: z.string().max(100).optional(),
  cards: z.array(z.object({
    front: z.string().min(1).max(1000),
    back: z.string().min(1).max(1000),
    hint: z.string().max(500).optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    tags: z.array(z.string().max(50)).optional(),
  })).optional(),
  learning_algorithm: z.enum(['spaced_repetition', 'leitner', 'sm2']).optional(),
  is_public: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Mind Map
export const mindMapCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  central_topic: z.string().min(1).max(200),
  branches: z.array(z.object({
    branch_id: z.string().uuid(),
    label: z.string().max(200),
    parent_id: z.string().uuid().optional(),
    description: z.string().max(500).optional(),
    color: z.string().max(20).optional(),
  })).min(1),
  connections: z.array(z.object({
    from: z.string().uuid(),
    to: z.string().uuid(),
    label: z.string().max(100).optional(),
  })).optional(),
  is_public: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const mindMapUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  subject: z.string().max(100).optional(),
  central_topic: z.string().min(1).max(200).optional(),
  branches: z.array(z.object({
    branch_id: z.string().uuid(),
    label: z.string().max(200),
    parent_id: z.string().uuid().optional(),
    description: z.string().max(500).optional(),
    color: z.string().max(20).optional(),
  })).optional(),
  connections: z.array(z.object({
    from: z.string().uuid(),
    to: z.string().uuid(),
    label: z.string().max(100).optional(),
  })).optional(),
  is_public: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Adaptive Exam
export const adaptiveExamCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  grade_level: z.number().int().min(1).max(12),
  format: examFormatEnum,
  difficulty_range: z.object({
    min: z.enum(['easy', 'medium', 'hard']),
    max: z.enum(['easy', 'medium', 'hard']),
  }),
  total_questions: z.number().int().min(1),
  time_limit_minutes: z.number().int().min(1),
  passing_score: z.number().min(0).max(100),
  adaptive_algorithm: z.enum(['cat', 'multi_stage', 'variable_length']),
  question_bank: z.array(z.string().uuid()).min(1),
  learning_objectives: z.array(z.string().max(200)).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const adaptiveExamUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  subject: z.string().max(100).optional(),
  grade_level: z.number().int().min(1).max(12).optional(),
  format: examFormatEnum.optional(),
  difficulty_range: z.object({
    min: z.enum(['easy', 'medium', 'hard']),
    max: z.enum(['easy', 'medium', 'hard']),
  }).optional(),
  total_questions: z.number().int().min(1).optional(),
  time_limit_minutes: z.number().int().min(1).optional(),
  passing_score: z.number().min(0).max(100).optional(),
  adaptive_algorithm: z.enum(['cat', 'multi_stage', 'variable_length']).optional(),
  question_bank: z.array(z.string().uuid()).optional(),
  learning_objectives: z.array(z.string().max(200)).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Competency Exam
export const competencyExamCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  framework_id: z.string().uuid(),
  competencies_assessed: z.array(z.object({
    competency_id: z.string().uuid(),
    weight: z.number().min(0).max(100),
    passing_score: z.number().min(0).max(100),
  })).min(1),
  format: examFormatEnum,
  duration_minutes: z.number().int().min(1),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const competencyExamUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  subject: z.string().max(100).optional(),
  framework_id: z.string().uuid().optional(),
  competencies_assessed: z.array(z.object({
    competency_id: z.string().uuid(),
    weight: z.number().min(0).max(100),
    passing_score: z.number().min(0).max(100),
  })).optional(),
  format: examFormatEnum.optional(),
  duration_minutes: z.number().int().min(1).optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// AI Correction
export const aiCorrectionCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  assignment_id: z.string().uuid(),
  subject: z.string().max(100),
  original_text: z.string().min(1).max(20000),
  corrected_text: z.string().min(1).max(20000),
  corrections: z.array(z.object({
    original: z.string().max(500),
    corrected: z.string().max(500),
    type: z.enum(['grammar', 'spelling', 'punctuation', 'style', 'structure', 'content']),
    explanation: z.string().max(500),
    location: z.object({
      start: z.number().int().min(0),
      end: z.number().int().min(0),
    }),
  })).min(1),
  overall_score: z.number().int().min(0).max(100),
  confidence: z.number().min(0).max(1),
  language: z.enum(['fr', 'en']),
  metadata: z.record(z.unknown()).optional(),
});

export const aiCorrectionUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  corrected_text: z.string().min(1).max(20000).optional(),
  corrections: z.array(z.object({
    original: z.string().max(500),
    corrected: z.string().max(500),
    type: z.enum(['grammar', 'spelling', 'punctuation', 'style', 'structure', 'content']),
    explanation: z.string().max(500),
    location: z.object({
      start: z.number().int().min(0),
      end: z.number().int().min(0),
    }),
  })).optional(),
  overall_score: z.number().int().min(0).max(100).optional(),
  student_feedback: z.enum(['helpful', 'partially_helpful', 'not_helpful']).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Rubric
export const rubricCreateSchema = z.object({
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  subject: z.string().max(100),
  assessment_type: z.enum(['essay', 'project', 'presentation', 'practical', 'portfolio']),
  criteria: z.array(z.object({
    name: z.string().max(200),
    description: z.string().max(500),
    weight: z.number().min(0).max(100),
    levels: z.array(z.object({
      level: z.number().int().min(1),
      label: z.string().max(100),
      description: z.string().max(500),
      points: z.number().int().min(0),
    })).min(2),
  })).min(1),
  total_points: z.number().int().min(1),
  is_ai_assisted: z.boolean().optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const rubricUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  subject: z.string().max(100).optional(),
  assessment_type: z.enum(['essay', 'project', 'presentation', 'practical', 'portfolio']).optional(),
  criteria: z.array(z.object({
    name: z.string().max(200),
    description: z.string().max(500),
    weight: z.number().min(0).max(100),
    levels: z.array(z.object({
      level: z.number().int().min(1),
      label: z.string().max(100),
      description: z.string().max(500),
      points: z.number().int().min(0),
    })).min(2),
  })).optional(),
  total_points: z.number().int().min(1).optional(),
  is_ai_assisted: z.boolean().optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Auto Grading Result
export const autoGradingResultCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  assignment_id: z.string().uuid(),
  subject: z.string().max(100),
  grading_type: gradingTypeEnum,
  total_score: z.number().min(0).max(100),
  max_score: z.number().min(1),
  grade: z.string().max(10),
  criteria_scores: z.array(z.object({
    criteria: z.string().max(200),
    score: z.number().min(0).max(100),
    feedback: z.string().max(500).optional(),
  })).min(1),
  ai_confidence: z.number().min(0).max(1),
  graded_at: z.string().datetime(),
  teacher_reviewed: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const autoGradingResultUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  total_score: z.number().min(0).max(100).optional(),
  grade: z.string().max(10).optional(),
  criteria_scores: z.array(z.object({
    criteria: z.string().max(200),
    score: z.number().min(0).max(100),
    feedback: z.string().max(500).optional(),
  })).optional(),
  teacher_reviewed: z.boolean().optional(),
  teacher_comments: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Essay Evaluation
export const essayEvaluationCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  essay_id: z.string().uuid(),
  subject: z.string().max(100),
  evaluation_type: evaluationTypeEnum,
  criteria: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    feedback: z.string().max(500).optional(),
    evidence: z.array(z.string().max(500)).optional(),
  })).min(1),
  overall_score: z.number().min(0).max(100),
  grade: z.string().max(10),
  ai_confidence: z.number().min(0).max(1),
  language: z.enum(['fr', 'en']),
  word_count: z.number().int().min(0),
  evaluated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const essayEvaluationUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  criteria: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    feedback: z.string().max(500).optional(),
    evidence: z.array(z.string().max(500)).optional(),
  })).optional(),
  overall_score: z.number().min(0).max(100).optional(),
  grade: z.string().max(10).optional(),
  teacher_feedback: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Oral Evaluation
export const oralEvaluationCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  topic: z.string().max(200),
  evaluation_type: evaluationTypeEnum,
  criteria: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    max_score: z.number().int().min(1),
    feedback: z.string().max(500).optional(),
  })).min(1),
  overall_score: z.number().min(0).max(100),
  grade: z.string().max(10),
  duration_minutes: z.number().int().min(1),
  questions_asked: z.number().int().min(0),
  correct_answers: z.number().int().min(0),
  evaluator_notes: z.string().max(2000).optional(),
  recording_url: z.string().url().optional(),
  evaluated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const oralEvaluationUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  criteria: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    max_score: z.number().int().min(1),
    feedback: z.string().max(500).optional(),
  })).optional(),
  overall_score: z.number().min(0).max(100).optional(),
  grade: z.string().max(10).optional(),
  evaluator_notes: z.string().max(2000).optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Practical Evaluation
export const practicalEvaluationCreateSchema = z.object({
  school_id: z.string().uuid(),
  student_id: z.string().uuid(),
  subject: z.string().max(100),
  task_title: z.string().max(200),
  evaluation_type: evaluationTypeEnum,
  criteria: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    max_score: z.number().int().min(1),
    feedback: z.string().max(500).optional(),
    observation_notes: z.string().max(500).optional(),
  })).min(1),
  overall_score: z.number().min(0).max(100),
  grade: z.string().max(10),
  time_taken_minutes: z.number().int().min(0),
  materials_used: z.array(z.string().max(200)).optional(),
  photos_urls: z.array(z.string().url()).optional(),
  rubric_id: z.string().uuid().optional(),
  evaluated_at: z.string().datetime(),
  metadata: z.record(z.unknown()).optional(),
});

export const practicalEvaluationUpdateSchema = z.object({
  id: z.string().uuid(),
  school_id: z.string().uuid(),
  criteria: z.array(z.object({
    name: z.string().max(200),
    score: z.number().min(0).max(100),
    max_score: z.number().int().min(1),
    feedback: z.string().max(500).optional(),
    observation_notes: z.string().max(500).optional(),
  })).optional(),
  overall_score: z.number().min(0).max(100).optional(),
  grade: z.string().max(10).optional(),
  materials_used: z.array(z.string().max(200)).optional(),
  photos_urls: z.array(z.string().url()).optional(),
  metadata: z.record(z.unknown()).optional(),
});

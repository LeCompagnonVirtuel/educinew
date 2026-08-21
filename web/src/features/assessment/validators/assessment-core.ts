import { z } from 'zod';

const schoolId = z.string().uuid();

// ── AI Question Generator ──────────────────────────────────────────────────

export const aiQuestionGeneratorCreateSchema = z.object({
  school_id: schoolId,
  subject: z.string().min(1).max(200),
  topic: z.string().min(1).max(200),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert']),
  question_type: z.enum(['multiple_choice', 'true_false', 'short_answer', 'essay', 'coding']),
  count: z.number().int().min(1).max(100),
  language: z.string().min(2).max(10).optional(),
  context: z.string().max(5000).optional(),
  bloom_level: z.enum(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']).optional(),
  generated_by: z.string().uuid().optional(),
});

export const aiQuestionGeneratorUpdateSchema = z.object({
  school_id: schoolId,
  subject: z.string().min(1).max(200).optional(),
  topic: z.string().min(1).max(200).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert']).optional(),
  question_type: z.enum(['multiple_choice', 'true_false', 'short_answer', 'essay', 'coding']).optional(),
  count: z.number().int().min(1).max(100).optional(),
  language: z.string().min(2).max(10).optional(),
  context: z.string().max(5000).optional(),
  bloom_level: z.enum(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']).optional(),
  generated_by: z.string().uuid().optional(),
});

// ── Adaptive Exam ──────────────────────────────────────────────────────────

export const adaptiveExamCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  algorithm: z.enum(['IRT', 'CAT', 'bayesian', 'item_bank']),
  starting_difficulty: z.number().min(0).max(1),
  max_items: z.number().int().min(1).max(200),
  min_items: z.number().int().min(1).max(200),
  target_se: z.number().min(0).max(1).optional(),
  time_limit_minutes: z.number().int().min(1).max(600).optional(),
  stop_condition: z.enum(['max_items', 'target_se', 'time_limit', 'confidence']).optional(),
  branching_rules: z.record(z.unknown()).optional(),
});

export const adaptiveExamUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  algorithm: z.enum(['IRT', 'CAT', 'bayesian', 'item_bank']).optional(),
  starting_difficulty: z.number().min(0).max(1).optional(),
  max_items: z.number().int().min(1).max(200).optional(),
  min_items: z.number().int().min(1).max(200).optional(),
  target_se: z.number().min(0).max(1).optional(),
  time_limit_minutes: z.number().int().min(1).max(600).optional(),
  stop_condition: z.enum(['max_items', 'target_se', 'time_limit', 'confidence']).optional(),
  branching_rules: z.record(z.unknown()).optional(),
});

// ── Dynamic Question Difficulty ────────────────────────────────────────────

export const dynamicQuestionDifficultyCreateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid(),
  base_difficulty: z.number().min(0).max(1),
  discrimination: z.number().min(0).max(2),
  guessing: z.number().min(0).max(1).optional(),
  upper_asymptote: z.number().min(0).max(1).optional(),
  irt_model: z.enum(['1PL', '2PL', '3PL', '4PL']).optional(),
  calibration_data: z.record(z.unknown()).optional(),
  last_calibrated: z.string().datetime().optional(),
});

export const dynamicQuestionDifficultyUpdateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid().optional(),
  base_difficulty: z.number().min(0).max(1).optional(),
  discrimination: z.number().min(0).max(2).optional(),
  guessing: z.number().min(0).max(1).optional(),
  upper_asymptote: z.number().min(0).max(1).optional(),
  irt_model: z.enum(['1PL', '2PL', '3PL', '4PL']).optional(),
  calibration_data: z.record(z.unknown()).optional(),
  last_calibrated: z.string().datetime().optional(),
});

// ── Automatic Grading ─────────────────────────────────────────────────────

export const automaticGradingCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  grading_type: z.enum(['auto', 'hybrid', 'ai_assisted']),
  rubric_id: z.string().uuid().optional(),
  partial_credit: z.boolean().optional(),
  penalty_enabled: z.boolean().optional(),
  penalty_per_wrong: z.number().min(0).max(1).optional(),
  confidence_threshold: z.number().min(0).max(1).optional(),
  model_version: z.string().max(50).optional(),
  enabled_question_types: z.array(z.string()).optional(),
});

export const automaticGradingUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  grading_type: z.enum(['auto', 'hybrid', 'ai_assisted']).optional(),
  rubric_id: z.string().uuid().optional(),
  partial_credit: z.boolean().optional(),
  penalty_enabled: z.boolean().optional(),
  penalty_per_wrong: z.number().min(0).max(1).optional(),
  confidence_threshold: z.number().min(0).max(1).optional(),
  model_version: z.string().max(50).optional(),
  enabled_question_types: z.array(z.string()).optional(),
});

// ── Essay Evaluation AI ────────────────────────────────────────────────────

export const essayEvaluationAICreateSchema = z.object({
  school_id: schoolId,
  rubric_id: z.string().uuid(),
  criteria: z.array(z.object({
    name: z.string().min(1).max(100),
    weight: z.number().min(0).max(1),
    description: z.string().max(500).optional(),
  })),
  min_words: z.number().int().min(0).optional(),
  max_words: z.number().int().min(1).optional(),
  plagiarism_check: z.boolean().optional(),
  grammar_check: z.boolean().optional(),
  vocabulary_check: z.boolean().optional(),
  coherence_analysis: z.boolean().optional(),
  model_name: z.string().max(100).optional(),
});

export const essayEvaluationAIUpdateSchema = z.object({
  school_id: schoolId,
  rubric_id: z.string().uuid().optional(),
  criteria: z.array(z.object({
    name: z.string().min(1).max(100),
    weight: z.number().min(0).max(1),
    description: z.string().max(500).optional(),
  })).optional(),
  min_words: z.number().int().min(0).optional(),
  max_words: z.number().int().min(1).optional(),
  plagiarism_check: z.boolean().optional(),
  grammar_check: z.boolean().optional(),
  vocabulary_check: z.boolean().optional(),
  coherence_analysis: z.boolean().optional(),
  model_name: z.string().max(100).optional(),
});

// ── Coding Assessment ──────────────────────────────────────────────────────

export const codingAssessmentCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  programming_language: z.string().min(1).max(50),
  execution_timeout: z.number().int().min(1).max(300).optional(),
  memory_limit_mb: z.number().int().min(32).max(2048).optional(),
  test_cases_hidden: z.boolean().optional(),
  starter_code: z.string().max(50000).optional(),
  solution_template: z.string().max(50000).optional(),
  auto_test: z.boolean().optional(),
  partial_scoring: z.boolean().optional(),
  sandbox_image: z.string().max(200).optional(),
});

export const codingAssessmentUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  programming_language: z.string().min(1).max(50).optional(),
  execution_timeout: z.number().int().min(1).max(300).optional(),
  memory_limit_mb: z.number().int().min(32).max(2048).optional(),
  test_cases_hidden: z.boolean().optional(),
  starter_code: z.string().max(50000).optional(),
  solution_template: z.string().max(50000).optional(),
  auto_test: z.boolean().optional(),
  partial_scoring: z.boolean().optional(),
  sandbox_image: z.string().max(200).optional(),
});

// ── Practical Assessment ───────────────────────────────────────────────────

export const practicalAssessmentCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  assessment_type: z.enum(['lab', 'workshop', 'fieldwork', 'simulation', 'project']),
  instructions: z.string().max(10000).optional(),
  rubric_id: z.string().uuid().optional(),
  resources_required: z.array(z.string()).optional(),
  max_duration_minutes: z.number().int().min(1).max(600).optional(),
  group_assessment: z.boolean().optional(),
  max_group_size: z.number().int().min(2).max(20).optional(),
  evidence_types: z.array(z.enum(['photo', 'video', 'document', 'code', 'model'])).optional(),
});

export const practicalAssessmentUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  assessment_type: z.enum(['lab', 'workshop', 'fieldwork', 'simulation', 'project']).optional(),
  instructions: z.string().max(10000).optional(),
  rubric_id: z.string().uuid().optional(),
  resources_required: z.array(z.string()).optional(),
  max_duration_minutes: z.number().int().min(1).max(600).optional(),
  group_assessment: z.boolean().optional(),
  max_group_size: z.number().int().min(2).max(20).optional(),
  evidence_types: z.array(z.enum(['photo', 'video', 'document', 'code', 'model'])).optional(),
});

// ── Oral Examination ───────────────────────────────────────────────────────

export const oralExaminationCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  panel_members: z.array(z.string().uuid()).min(1),
  max_duration_minutes: z.number().int().min(5).max(300),
  question_count: z.number().int().min(1).max(100).optional(),
  recording_enabled: z.boolean().optional(),
  transcription_enabled: z.boolean().optional(),
  rubric_id: z.string().uuid().optional(),
  preparation_time_minutes: z.number().int().min(0).max(60).optional(),
  presentation_allowed: z.boolean().optional(),
});

export const oralExaminationUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  panel_members: z.array(z.string().uuid()).min(1).optional(),
  max_duration_minutes: z.number().int().min(5).max(300).optional(),
  question_count: z.number().int().min(1).max(100).optional(),
  recording_enabled: z.boolean().optional(),
  transcription_enabled: z.boolean().optional(),
  rubric_id: z.string().uuid().optional(),
  preparation_time_minutes: z.number().int().min(0).max(60).optional(),
  presentation_allowed: z.boolean().optional(),
});

// ── Exam Blueprint ─────────────────────────────────────────────────────────

export const examBlueprintCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  total_questions: z.number().int().min(1).max(500),
  total_points: z.number().int().min(1).max(10000),
  sections: z.array(z.object({
    name: z.string().min(1).max(200),
    question_count: z.number().int().min(1).max(100),
    point_value: z.number().int().min(1).max(5000),
    difficulty_distribution: z.object({
      easy: z.number().min(0).max(1),
      medium: z.number().min(0).max(1),
      hard: z.number().min(0).max(1),
    }).optional(),
    topic_distribution: z.record(z.number()).optional(),
  })),
  time_limit_minutes: z.number().int().min(1).max(600).optional(),
  passing_score: z.number().min(0).max(100).optional(),
  negative_marking: z.boolean().optional(),
});

export const examBlueprintUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  total_questions: z.number().int().min(1).max(500).optional(),
  total_points: z.number().int().min(1).max(10000).optional(),
  sections: z.array(z.object({
    name: z.string().min(1).max(200),
    question_count: z.number().int().min(1).max(100),
    point_value: z.number().int().min(1).max(5000),
    difficulty_distribution: z.object({
      easy: z.number().min(0).max(1),
      medium: z.number().min(0).max(1),
      hard: z.number().min(0).max(1),
    }).optional(),
    topic_distribution: z.record(z.number()).optional(),
  })).optional(),
  time_limit_minutes: z.number().int().min(1).max(600).optional(),
  passing_score: z.number().min(0).max(100).optional(),
  negative_marking: z.boolean().optional(),
});

// ── Question Randomizer ────────────────────────────────────────────────────

export const questionRandomizerCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  randomization_type: z.enum(['question_order', 'answer_order', 'both', 'none']),
  seed: z.number().int().optional(),
  pool_per_section: z.record(z.number()).optional(),
  preserve_difficulty_order: z.boolean().optional(),
  unique_variants: z.number().int().min(1).max(100).optional(),
});

export const questionRandomizerUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  randomization_type: z.enum(['question_order', 'answer_order', 'both', 'none']).optional(),
  seed: z.number().int().optional(),
  pool_per_section: z.record(z.number()).optional(),
  preserve_difficulty_order: z.boolean().optional(),
  unique_variants: z.number().int().min(1).max(100).optional(),
});

// ── Question Pool ──────────────────────────────────────────────────────────

export const questionPoolCreateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  subject: z.string().min(1).max(200),
  total_questions: z.number().int().min(0).optional(),
  difficulty_range: z.object({
    min: z.number().min(0).max(1),
    max: z.number().min(0).max(1),
  }).optional(),
  access_level: z.enum(['private', 'school', 'public']).optional(),
  created_by: z.string().uuid().optional(),
});

export const questionPoolUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  subject: z.string().min(1).max(200).optional(),
  total_questions: z.number().int().min(0).optional(),
  difficulty_range: z.object({
    min: z.number().min(0).max(1),
    max: z.number().min(0).max(1),
  }).optional(),
  access_level: z.enum(['private', 'school', 'public']).optional(),
  created_by: z.string().uuid().optional(),
});

// ── Exam Session ───────────────────────────────────────────────────────────

export const examSessionCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  session_name: z.string().min(1).max(200),
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  max_participants: z.number().int().min(1).max(10000).optional(),
  room: z.string().max(200).optional(),
  proctor_id: z.string().uuid().optional(),
  timezone: z.string().max(50).optional(),
  allow_late_start: z.boolean().optional(),
  grace_period_minutes: z.number().int().min(0).max(60).optional(),
});

export const examSessionUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  session_name: z.string().min(1).max(200).optional(),
  start_time: z.string().datetime().optional(),
  end_time: z.string().datetime().optional(),
  max_participants: z.number().int().min(1).max(10000).optional(),
  room: z.string().max(200).optional(),
  proctor_id: z.string().uuid().optional(),
  timezone: z.string().max(50).optional(),
  allow_late_start: z.boolean().optional(),
  grace_period_minutes: z.number().int().min(0).max(60).optional(),
});

// ── Exam Attempt ───────────────────────────────────────────────────────────

export const examAttemptCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  student_id: z.string().uuid(),
  session_id: z.string().uuid().optional(),
  started_at: z.string().datetime().optional(),
  ip_address: z.string().max(45).optional(),
  user_agent: z.string().max(500).optional(),
  device_info: z.record(z.unknown()).optional(),
});

export const examAttemptUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  student_id: z.string().uuid().optional(),
  session_id: z.string().uuid().optional(),
  started_at: z.string().datetime().optional(),
  completed_at: z.string().datetime().optional(),
  score: z.number().min(0).optional(),
  status: z.enum(['in_progress', 'completed', 'abandoned', 'flagged']).optional(),
  ip_address: z.string().max(45).optional(),
  user_agent: z.string().max(500).optional(),
  device_info: z.record(z.unknown()).optional(),
});

// ── Exam Replay ────────────────────────────────────────────────────────────

export const examReplayCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  attempt_id: z.string().uuid(),
  replay_type: z.enum(['student_review', 'appeal', 'audit', 'training']),
  requested_by: z.string().uuid().optional(),
  reason: z.string().max(2000).optional(),
  show_scores: z.boolean().optional(),
  show_correct_answers: z.boolean().optional(),
  show_explanations: z.boolean().optional(),
});

export const examReplayUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  attempt_id: z.string().uuid().optional(),
  replay_type: z.enum(['student_review', 'appeal', 'audit', 'training']).optional(),
  requested_by: z.string().uuid().optional(),
  reason: z.string().max(2000).optional(),
  show_scores: z.boolean().optional(),
  show_correct_answers: z.boolean().optional(),
  show_explanations: z.boolean().optional(),
});

// ── Secure Browser ─────────────────────────────────────────────────────────

export const secureBrowserCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  enabled: z.boolean(),
  allow_copy_paste: z.boolean().optional(),
  allow_print: z.boolean().optional(),
  allow_download: z.boolean().optional(),
  block_tabs: z.boolean().optional(),
  block_apps: z.array(z.string()).optional(),
  full_screen_required: z.boolean().optional(),
  webcam_required: z.boolean().optional(),
  microphone_required: z.boolean().optional(),
  lock_down_level: z.enum(['basic', 'moderate', 'strict']).optional(),
});

export const secureBrowserUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
  allow_copy_paste: z.boolean().optional(),
  allow_print: z.boolean().optional(),
  allow_download: z.boolean().optional(),
  block_tabs: z.boolean().optional(),
  block_apps: z.array(z.string()).optional(),
  full_screen_required: z.boolean().optional(),
  webcam_required: z.boolean().optional(),
  microphone_required: z.boolean().optional(),
  lock_down_level: z.enum(['basic', 'moderate', 'strict']).optional(),
});

// ── Proctoring AI ──────────────────────────────────────────────────────────

export const proctoringAICreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  enabled: z.boolean(),
  face_detection: z.boolean().optional(),
  gaze_tracking: z.boolean().optional(),
  head_pose_estimation: z.boolean().optional(),
  object_detection: z.boolean().optional(),
  audio_analysis: z.boolean().optional(),
  alert_threshold: z.number().min(0).max(1).optional(),
  recording_resolution: z.enum(['480p', '720p', '1080p']).optional(),
  storage_days: z.number().int().min(1).max(365).optional(),
  notification_webhook: z.string().url().optional(),
});

export const proctoringAIUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
  face_detection: z.boolean().optional(),
  gaze_tracking: z.boolean().optional(),
  head_pose_estimation: z.boolean().optional(),
  object_detection: z.boolean().optional(),
  audio_analysis: z.boolean().optional(),
  alert_threshold: z.number().min(0).max(1).optional(),
  recording_resolution: z.enum(['480p', '720p', '1080p']).optional(),
  storage_days: z.number().int().min(1).max(365).optional(),
  notification_webhook: z.string().url().optional(),
});

// ── Cheating Detection ─────────────────────────────────────────────────────

export const cheatingDetectionCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  enabled: z.boolean(),
  tab_switch_detection: z.boolean().optional(),
  copy_paste_detection: z.boolean().optional(),
  unusual_time_patterns: z.boolean().optional(),
  answer_pattern_analysis: z.boolean().optional(),
  ip_change_detection: z.boolean().optional(),
  browser_fingerprint: z.boolean().optional(),
  sensitivity: z.number().min(0).max(1).optional(),
  auto_flag: z.boolean().optional(),
});

export const cheatingDetectionUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
  tab_switch_detection: z.boolean().optional(),
  copy_paste_detection: z.boolean().optional(),
  unusual_time_patterns: z.boolean().optional(),
  answer_pattern_analysis: z.boolean().optional(),
  ip_change_detection: z.boolean().optional(),
  browser_fingerprint: z.boolean().optional(),
  sensitivity: z.number().min(0).max(1).optional(),
  auto_flag: z.boolean().optional(),
});

// ── Face Verification ──────────────────────────────────────────────────────

export const faceVerificationCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  enabled: z.boolean(),
  reference_photo_id: z.string().uuid().optional(),
  verification_interval_seconds: z.number().int().min(10).max(300).optional(),
  confidence_threshold: z.number().min(0).max(1).optional(),
  liveness_detection: z.boolean().optional(),
  spoofing_protection: z.boolean().optional(),
  alert_on_mismatch: z.boolean().optional(),
  max_failed_attempts: z.number().int().min(1).max(10).optional(),
});

export const faceVerificationUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
  reference_photo_id: z.string().uuid().optional(),
  verification_interval_seconds: z.number().int().min(10).max(300).optional(),
  confidence_threshold: z.number().min(0).max(1).optional(),
  liveness_detection: z.boolean().optional(),
  spoofing_protection: z.boolean().optional(),
  alert_on_mismatch: z.boolean().optional(),
  max_failed_attempts: z.number().int().min(1).max(10).optional(),
});

// ── Screen Monitoring ──────────────────────────────────────────────────────

export const screenMonitoringCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  enabled: z.boolean(),
  screenshot_interval_seconds: z.number().int().min(5).max(300).optional(),
  screen_recording: z.boolean().optional(),
  multi_monitor_detection: z.boolean().optional(),
  virtual_machine_detection: z.boolean().optional(),
  remote_desktop_detection: z.boolean().optional(),
  storage_days: z.number().int().min(1).max(365).optional(),
  compression_quality: z.number().int().min(1).max(100).optional(),
});

export const screenMonitoringUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
  screenshot_interval_seconds: z.number().int().min(5).max(300).optional(),
  screen_recording: z.boolean().optional(),
  multi_monitor_detection: z.boolean().optional(),
  virtual_machine_detection: z.boolean().optional(),
  remote_desktop_detection: z.boolean().optional(),
  storage_days: z.number().int().min(1).max(365).optional(),
  compression_quality: z.number().int().min(1).max(100).optional(),
});

// ── Microphone Monitoring ──────────────────────────────────────────────────

export const microphoneMonitoringCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  enabled: z.boolean(),
  noise_detection: z.boolean().optional(),
  voice_detection: z.boolean().optional(),
  background_voice_detection: z.boolean().optional(),
  noise_threshold_db: z.number().min(0).max(120).optional(),
  recording_enabled: z.boolean().optional(),
  transcription_enabled: z.boolean().optional(),
  storage_days: z.number().int().min(1).max(365).optional(),
});

export const microphoneMonitoringUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
  noise_detection: z.boolean().optional(),
  voice_detection: z.boolean().optional(),
  background_voice_detection: z.boolean().optional(),
  noise_threshold_db: z.number().min(0).max(120).optional(),
  recording_enabled: z.boolean().optional(),
  transcription_enabled: z.boolean().optional(),
  storage_days: z.number().int().min(1).max(365).optional(),
});

// ── Exam Lockdown ──────────────────────────────────────────────────────────

export const examLockdownCreateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid(),
  enabled: z.boolean(),
  lockdown_level: z.enum(['browser_only', 'full_desktop', 'kiosk_mode']),
  blocked_urls: z.array(z.string().url()).optional(),
  blocked_applications: z.array(z.string()).optional(),
  allowed_applications: z.array(z.string()).optional(),
  disable_right_click: z.boolean().optional(),
  disable_keyboard_shortcuts: z.boolean().optional(),
  disable_task_manager: z.boolean().optional(),
  usb_blocked: z.boolean().optional(),
  bluetooth_blocked: z.boolean().optional(),
});

export const examLockdownUpdateSchema = z.object({
  school_id: schoolId,
  exam_id: z.string().uuid().optional(),
  enabled: z.boolean().optional(),
  lockdown_level: z.enum(['browser_only', 'full_desktop', 'kiosk_mode']).optional(),
  blocked_urls: z.array(z.string().url()).optional(),
  blocked_applications: z.array(z.string()).optional(),
  allowed_applications: z.array(z.string()).optional(),
  disable_right_click: z.boolean().optional(),
  disable_keyboard_shortcuts: z.boolean().optional(),
  disable_task_manager: z.boolean().optional(),
  usb_blocked: z.boolean().optional(),
  bluetooth_blocked: z.boolean().optional(),
});

// ── Question Category ──────────────────────────────────────────────────────

export const questionCategoryCreateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  parent_id: z.string().uuid().optional(),
  subject: z.string().min(1).max(200),
  sort_order: z.number().int().min(0).optional(),
  icon: z.string().max(100).optional(),
  color: z.string().max(7).optional(),
});

export const questionCategoryUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  parent_id: z.string().uuid().optional(),
  subject: z.string().min(1).max(200).optional(),
  sort_order: z.number().int().min(0).optional(),
  icon: z.string().max(100).optional(),
  color: z.string().max(7).optional(),
});

// ── Question Tag ───────────────────────────────────────────────────────────

export const questionTagCreateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  color: z.string().max(7).optional(),
  category: z.string().max(100).optional(),
  usage_count: z.number().int().min(0).optional(),
});

export const questionTagUpdateSchema = z.object({
  school_id: schoolId,
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  color: z.string().max(7).optional(),
  category: z.string().max(100).optional(),
  usage_count: z.number().int().min(0).optional(),
});

// ── Question Difficulty Config ─────────────────────────────────────────────

export const questionDifficultyConfigCreateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid(),
  difficulty_level: z.enum(['easy', 'medium', 'hard', 'expert']),
  estimated_time_seconds: z.number().int().min(1).max(3600).optional(),
  success_rate_target: z.number().min(0).max(1).optional(),
  discrimination_target: z.number().min(0).max(2).optional(),
  bloom_level: z.enum(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']).optional(),
  cognitive_load: z.enum(['low', 'medium', 'high']).optional(),
});

export const questionDifficultyConfigUpdateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid().optional(),
  difficulty_level: z.enum(['easy', 'medium', 'hard', 'expert']).optional(),
  estimated_time_seconds: z.number().int().min(1).max(3600).optional(),
  success_rate_target: z.number().min(0).max(1).optional(),
  discrimination_target: z.number().min(0).max(2).optional(),
  bloom_level: z.enum(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']).optional(),
  cognitive_load: z.enum(['low', 'medium', 'high']).optional(),
});

// ── Question Metadata ──────────────────────────────────────────────────────

export const questionMetadataCreateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid(),
  author: z.string().max(200).optional(),
  version: z.string().max(50).optional(),
  source: z.string().max(200).optional(),
  license: z.string().max(100).optional(),
  language: z.string().min(2).max(10).optional(),
  keywords: z.array(z.string()).optional(),
  standards: z.array(z.string()).optional(),
  estimated_time_seconds: z.number().int().min(0).optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const questionMetadataUpdateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid().optional(),
  author: z.string().max(200).optional(),
  version: z.string().max(50).optional(),
  source: z.string().max(200).optional(),
  license: z.string().max(100).optional(),
  language: z.string().min(2).max(10).optional(),
  keywords: z.array(z.string()).optional(),
  standards: z.array(z.string()).optional(),
  estimated_time_seconds: z.number().int().min(0).optional(),
  updated_at: z.string().datetime().optional(),
});

// ── Question Version ───────────────────────────────────────────────────────

export const questionVersionCreateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid(),
  version_number: z.number().int().min(1),
  content: z.record(z.unknown()),
  changelog: z.string().max(2000).optional(),
  created_by: z.string().uuid().optional(),
  is_published: z.boolean().optional(),
  parent_version_id: z.string().uuid().optional(),
});

export const questionVersionUpdateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid().optional(),
  version_number: z.number().int().min(1).optional(),
  content: z.record(z.unknown()).optional(),
  changelog: z.string().max(2000).optional(),
  created_by: z.string().uuid().optional(),
  is_published: z.boolean().optional(),
  parent_version_id: z.string().uuid().optional(),
});

// ── Question Approval Workflow ─────────────────────────────────────────────

export const questionApprovalWorkflowCreateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid(),
  status: z.enum(['draft', 'pending_review', 'under_review', 'approved', 'rejected', 'revision_needed']),
  submitted_by: z.string().uuid().optional(),
  reviewer_id: z.string().uuid().optional(),
  review_notes: z.string().max(5000).optional(),
  approval_date: z.string().datetime().optional(),
  expiry_date: z.string().datetime().optional(),
  required_reviewers: z.number().int().min(1).max(10).optional(),
});

export const questionApprovalWorkflowUpdateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid().optional(),
  status: z.enum(['draft', 'pending_review', 'under_review', 'approved', 'rejected', 'revision_needed']).optional(),
  submitted_by: z.string().uuid().optional(),
  reviewer_id: z.string().uuid().optional(),
  review_notes: z.string().max(5000).optional(),
  approval_date: z.string().datetime().optional(),
  expiry_date: z.string().datetime().optional(),
  required_reviewers: z.number().int().min(1).max(10).optional(),
});

// ── Question Review ────────────────────────────────────────────────────────

export const questionReviewCreateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid(),
  reviewer_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  accuracy_score: z.number().int().min(1).max(5).optional(),
  clarity_score: z.number().int().min(1).max(5).optional(),
  relevance_score: z.number().int().min(1).max(5).optional(),
  difficulty_assessment: z.enum(['too_easy', 'appropriate', 'too_hard']).optional(),
  comments: z.string().max(5000).optional(),
  suggested_improvements: z.string().max(5000).optional(),
});

export const questionReviewUpdateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid().optional(),
  reviewer_id: z.string().uuid().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  accuracy_score: z.number().int().min(1).max(5).optional(),
  clarity_score: z.number().int().min(1).max(5).optional(),
  relevance_score: z.number().int().min(1).max(5).optional(),
  difficulty_assessment: z.enum(['too_easy', 'appropriate', 'too_hard']).optional(),
  comments: z.string().max(5000).optional(),
  suggested_improvements: z.string().max(5000).optional(),
});

// ── Question Statistics ────────────────────────────────────────────────────

export const questionStatisticsCreateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid(),
  total_attempts: z.number().int().min(0).optional(),
  correct_attempts: z.number().int().min(0).optional(),
  average_time_seconds: z.number().min(0).optional(),
  median_time_seconds: z.number().min(0).optional(),
  discrimination_index: z.number().min(-1).max(1).optional(),
  point_biserial: z.number().min(-1).max(1).optional(),
  p_value: z.number().min(0).max(1).optional(),
  last_analyzed: z.string().datetime().optional(),
  sample_size: z.number().int().min(0).optional(),
});

export const questionStatisticsUpdateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid().optional(),
  total_attempts: z.number().int().min(0).optional(),
  correct_attempts: z.number().int().min(0).optional(),
  average_time_seconds: z.number().min(0).optional(),
  median_time_seconds: z.number().min(0).optional(),
  discrimination_index: z.number().min(-1).max(1).optional(),
  point_biserial: z.number().min(-1).max(1).optional(),
  p_value: z.number().min(0).max(1).optional(),
  last_analyzed: z.string().datetime().optional(),
  sample_size: z.number().int().min(0).optional(),
});

// ── Import Question Job ────────────────────────────────────────────────────

export const importQuestionJobCreateSchema = z.object({
  school_id: schoolId,
  source_format: z.enum(['csv', 'json', 'xml', 'qti', 'moodle', 'blackboard']),
  file_name: z.string().min(1).max(500),
  file_size: z.number().int().min(1).optional(),
  subject: z.string().min(1).max(200).optional(),
  category_id: z.string().uuid().optional(),
  default_difficulty: z.enum(['easy', 'medium', 'hard', 'expert']).optional(),
  overwrite_existing: z.boolean().optional(),
  validate_only: z.boolean().optional(),
  imported_by: z.string().uuid().optional(),
});

export const importQuestionJobUpdateSchema = z.object({
  school_id: schoolId,
  source_format: z.enum(['csv', 'json', 'xml', 'qti', 'moodle', 'blackboard']).optional(),
  file_name: z.string().min(1).max(500).optional(),
  file_size: z.number().int().min(1).optional(),
  subject: z.string().min(1).max(200).optional(),
  category_id: z.string().uuid().optional(),
  default_difficulty: z.enum(['easy', 'medium', 'hard', 'expert']).optional(),
  overwrite_existing: z.boolean().optional(),
  validate_only: z.boolean().optional(),
  imported_by: z.string().uuid().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  error_log: z.string().max(10000).optional(),
});

// ── Export Question Job ────────────────────────────────────────────────────

export const exportQuestionJobCreateSchema = z.object({
  school_id: schoolId,
  target_format: z.enum(['csv', 'json', 'xml', 'qti', 'pdf', 'word']),
  question_ids: z.array(z.string().uuid()).optional(),
  pool_id: z.string().uuid().optional(),
  category_id: z.string().uuid().optional(),
  subject: z.string().max(200).optional(),
  include_metadata: z.boolean().optional(),
  include_explanations: z.boolean().optional(),
  exported_by: z.string().uuid().optional(),
});

export const exportQuestionJobUpdateSchema = z.object({
  school_id: schoolId,
  target_format: z.enum(['csv', 'json', 'xml', 'qti', 'pdf', 'word']).optional(),
  question_ids: z.array(z.string().uuid()).optional(),
  pool_id: z.string().uuid().optional(),
  category_id: z.string().uuid().optional(),
  subject: z.string().max(200).optional(),
  include_metadata: z.boolean().optional(),
  include_explanations: z.boolean().optional(),
  exported_by: z.string().uuid().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  output_file_url: z.string().url().optional(),
});

// ── Bulk Edit Job ──────────────────────────────────────────────────────────

export const bulkEditJobCreateSchema = z.object({
  school_id: schoolId,
  question_ids: z.array(z.string().uuid()).min(1),
  operation: z.enum(['update_difficulty', 'update_category', 'add_tag', 'remove_tag', 'archive', 'delete']),
  parameters: z.record(z.unknown()),
  performed_by: z.string().uuid().optional(),
});

export const bulkEditJobUpdateSchema = z.object({
  school_id: schoolId,
  question_ids: z.array(z.string().uuid()).min(1).optional(),
  operation: z.enum(['update_difficulty', 'update_category', 'add_tag', 'remove_tag', 'archive', 'delete']).optional(),
  parameters: z.record(z.unknown()).optional(),
  performed_by: z.string().uuid().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  affected_count: z.number().int().min(0).optional(),
  error_log: z.string().max(10000).optional(),
});

// ── OCR Question Import ────────────────────────────────────────────────────

export const oCRQuestionImportCreateSchema = z.object({
  school_id: schoolId,
  file_name: z.string().min(1).max(500),
  file_url: z.string().url().optional(),
  language: z.string().min(2).max(10).optional(),
  subject: z.string().max(200).optional(),
  auto_parse: z.boolean().optional(),
  review_required: z.boolean().optional(),
  imported_by: z.string().uuid().optional(),
});

export const oCRQuestionImportUpdateSchema = z.object({
  school_id: schoolId,
  file_name: z.string().min(1).max(500).optional(),
  file_url: z.string().url().optional(),
  language: z.string().min(2).max(10).optional(),
  subject: z.string().max(200).optional(),
  auto_parse: z.boolean().optional(),
  review_required: z.boolean().optional(),
  imported_by: z.string().uuid().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  ocr_confidence: z.number().min(0).max(1).optional(),
  parsed_questions: z.number().int().min(0).optional(),
});

// ── AI Question Generation ─────────────────────────────────────────────────

export const aIQuestionGenerationCreateSchema = z.object({
  school_id: schoolId,
  prompt: z.string().min(1).max(10000),
  subject: z.string().min(1).max(200),
  question_type: z.enum(['multiple_choice', 'true_false', 'short_answer', 'essay', 'coding']),
  count: z.number().int().min(1).max(50),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert']).optional(),
  model: z.string().max(100).optional(),
  temperature: z.number().min(0).max(2).optional(),
  context_documents: z.array(z.string().url()).optional(),
  generated_by: z.string().uuid().optional(),
});

export const aIQuestionGenerationUpdateSchema = z.object({
  school_id: schoolId,
  prompt: z.string().min(1).max(10000).optional(),
  subject: z.string().min(1).max(200).optional(),
  question_type: z.enum(['multiple_choice', 'true_false', 'short_answer', 'essay', 'coding']).optional(),
  count: z.number().int().min(1).max(50).optional(),
  difficulty: z.enum(['easy', 'medium', 'hard', 'expert']).optional(),
  model: z.string().max(100).optional(),
  temperature: z.number().min(0).max(2).optional(),
  context_documents: z.array(z.string().url()).optional(),
  generated_by: z.string().uuid().optional(),
  status: z.enum(['pending', 'generating', 'completed', 'failed']).optional(),
  generated_count: z.number().int().min(0).optional(),
});

// ── Question Translation ───────────────────────────────────────────────────

export const questionTranslationCreateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid(),
  source_language: z.string().min(2).max(10),
  target_language: z.string().min(2).max(10),
  translated_content: z.record(z.unknown()),
  translation_quality: z.enum(['machine', 'reviewed', 'certified']).optional(),
  translator_id: z.string().uuid().optional(),
  reviewed_by: z.string().uuid().optional(),
});

export const questionTranslationUpdateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid().optional(),
  source_language: z.string().min(2).max(10).optional(),
  target_language: z.string().min(2).max(10).optional(),
  translated_content: z.record(z.unknown()).optional(),
  translation_quality: z.enum(['machine', 'reviewed', 'certified']).optional(),
  translator_id: z.string().uuid().optional(),
  reviewed_by: z.string().uuid().optional(),
});

// ── Question Validation ────────────────────────────────────────────────────

export const questionValidationCreateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid(),
  validation_rules: z.array(z.enum([
    'format_check', 'answer_check', 'image_check', 'length_check',
    'duplicate_check', 'bias_check', 'accessibility_check', 'standard_check',
  ])),
  auto_fix: z.boolean().optional(),
  strict_mode: z.boolean().optional(),
  validated_by: z.string().uuid().optional(),
});

export const questionValidationUpdateSchema = z.object({
  school_id: schoolId,
  question_id: z.string().uuid().optional(),
  validation_rules: z.array(z.enum([
    'format_check', 'answer_check', 'image_check', 'length_check',
    'duplicate_check', 'bias_check', 'accessibility_check', 'standard_check',
  ])).optional(),
  auto_fix: z.boolean().optional(),
  strict_mode: z.boolean().optional(),
  validated_by: z.string().uuid().optional(),
  status: z.enum(['pending', 'passed', 'failed', 'warnings']).optional(),
  results: z.record(z.unknown()).optional(),
});

// ── Duplicate Detection ────────────────────────────────────────────────────

export const duplicateDetectionCreateSchema = z.object({
  school_id: schoolId,
  question_ids: z.array(z.string().uuid()).min(2),
  similarity_threshold: z.number().min(0).max(1).optional(),
  detection_method: z.enum(['text', 'semantic', 'structural', 'combined']).optional(),
  ignore_whitespace: z.boolean().optional(),
  ignore_case: z.boolean().optional(),
  scope: z.enum(['exact', 'similar', 'semantic']).optional(),
  run_by: z.string().uuid().optional(),
});

export const duplicateDetectionUpdateSchema = z.object({
  school_id: schoolId,
  question_ids: z.array(z.string().uuid()).min(2).optional(),
  similarity_threshold: z.number().min(0).max(1).optional(),
  detection_method: z.enum(['text', 'semantic', 'structural', 'combined']).optional(),
  ignore_whitespace: z.boolean().optional(),
  ignore_case: z.boolean().optional(),
  scope: z.enum(['exact', 'similar', 'semantic']).optional(),
  run_by: z.string().uuid().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).optional(),
  duplicates_found: z.number().int().min(0).optional(),
});

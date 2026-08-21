// Adaptive Learning Intelligence Configuration
// Phase 3.2 - EduCI Platform

// ─────────────────────────────────────────────────────────────────────────────
// Domain 1 - Adaptive Learning Engine
// ─────────────────────────────────────────────────────────────────────────────

export const ADAPTIVE_ENGINE_CONFIG = {
  DEFAULT_ALGORITHM: "bayesian_knowledge_tracing",
  DIFFICULTY_RANGE_MIN: 0.1,
  DIFFICULTY_RANGE_MAX: 0.9,
  PACE_ADJUSTMENT_THRESHOLD: 0.15,
  MASTERY_THRESHOLD: 0.85,
  REVIEW_INTERVAL_DAYS: [1, 3, 7, 14, 30] as readonly number[],
  MAX_RECOMMENDATIONS_PER_DAY: 10,
  MAX_CONCEPTS_PER_SESSION: 8,
  MIN_SESSION_MINUTES: 15,
  MAX_SESSION_MINUTES: 120,
  CONFIDENCE_THRESHOLD: 0.75,
  MIN_EXERCISES_FOR_ASSESSMENT: 5,
  ADAPTIVE_DELAY_MS: 500,
  CACHE_TTL_SECONDS: 180,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 2 - Competency Framework
// ─────────────────────────────────────────────────────────────────────────────

export const COMPETENCY_FRAMEWORK_CONFIG = {
  SUPPORTED_FRAMEWORKS: ["CBC", "APC", "Cambridge", "IB", "Common_Core", "National_Kenya"] as readonly string[],
  DEFAULT_FRAMEWORK: "CBC",
  MAX_COMPETENCIES_PER_SUBJECT: 20,
  MAX_INDICATORS_PER_COMPETENCY: 10,
  PROGRESS_UPDATE_INTERVAL_MINUTES: 30,
  MASTERY_SCORE_THRESHOLD: 0.8,
  REASSESSMENT_INTERVAL_DAYS: 14,
  FRAMEWORK_CACHE_TTL: 3600,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 3 - AI Tutor System
// ─────────────────────────────────────────────────────────────────────────────

export const AI_TUTOR_CONFIG = {
  MAX_CONCURRENT_SESSIONS: 500,
  MAX_MESSAGES_PER_SESSION: 200,
  RESPONSE_TIMEOUT_SECONDS: 30,
  MAX_RETRIES: 3,
  SUPPORTED_LANGUAGES: ["en", "sw", "fr", "ar", "ha", "yo"] as readonly string[],
  DEFAULT_LANGUAGE: "en",
  VOICE_ENABLED: true,
  IMAGE_ENABLED: true,
  WHITEBOARD_ENABLED: true,
  MAX_CONTEXT_LENGTH: 8000,
  MEMORY_RETENTION_DAYS: 30,
  SATISFACTION_THRESHOLD: 4.0,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 4 - Learning Path Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const LEARNING_PATH_CONFIG = {
  MAX_OBJECTIVES_PER_PATH: 50,
  MAX_PATHS_PER_STUDENT: 10,
  AUTO_ADVANCE_THRESHOLD: 0.8,
  DEADLINE_BUFFER_HOURS: 48,
  MAX_EXTENSIONS: 3,
  COMPLETION_BONUS_XP: 500,
  PATH_CACHE_TTL: 600,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 5 - Gamification Engine
// ─────────────────────────────────────────────────────────────────────────────

export const GAMIFICATION_CONFIG = {
  XP_PER_LESSON: 25,
  XP_PER_EXERCISE: 10,
  XP_PER_ASSESSMENT: 50,
  XP_STREAK_BONUS: 15,
  MAX_DAILY_XP: 500,
  LEVEL_THRESHOLDS: [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 10000] as readonly number[],
  ACHIEVEMENT_UNLOCK_XP: 100,
  MISSION_XP_RANGE: { MIN: 50, MAX: 200 },
  LEADERBOARD_REFRESH_INTERVAL_MINUTES: 15,
  MAX_TEAM_SIZE: 10,
  DAILY_CHALLENGE_COUNT: 3,
  WEEKLY_CHALLENGE_COUNT: 5,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 6 - Assessment Engine
// ─────────────────────────────────────────────────────────────────────────────

export const ASSESSMENT_CONFIG = {
  MAX_QUESTIONS_PER_EXAM: 50,
  TIME_LIMIT_MINUTES: 60,
  PASSING_SCORE: 50,
  MAX_ATTEMPTS: 3,
  AUTO_SUBMIT_ENABLED: true,
  RUBRIC_MAX_CRITERIA: 10,
  ESSAY_MIN_WORDS: 200,
  ORAL_MINUTES: 10,
  PRACTICAL_CHECKLIST_ITEMS: 15,
  ADAPTIVE_QUESTION_BATCH_SIZE: 10,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 7 - Content Intelligence
// ─────────────────────────────────────────────────────────────────────────────

export const CONTENT_CONFIG = {
  MAX_LESSON_DURATION_MINUTES: 45,
  SUPPORTED_VIDEO_FORMATS: ["mp4", "webm", "avi", "mov", "mkv"] as readonly string[],
  SUPPORTED_AUDIO_FORMATS: ["mp3", "wav", "ogg", "aac", "flac"] as readonly string[],
  MAX_FILE_SIZE_MB: 500,
  INTERACTIVE_COMPONENTS_LIMIT: 20,
  VR_MIN_DURATION_MINUTES: 5,
  AR_MIN_DURATION_MINUTES: 3,
  FLASHCARD_LIMIT: 500,
  MIND_MAP_NODE_LIMIT: 100,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 8 - Analytics Dashboard
// ─────────────────────────────────────────────────────────────────────────────

export const ANALYTICS_CONFIG = {
  REFRESH_INTERVAL_SECONDS: 30,
  MAX_TIMELINE_EVENTS: 1000,
  HEATMAP_GRANULARITY: "daily",
  REPORT_RETENTION_DAYS: 365,
  INSIGHT_CONFIDENCE_THRESHOLD: 0.7,
  PREDICTION_HORIZON_DAYS: 90,
  COMPARISON_MIN_SAMPLES: 30,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 9 - Recommendation Engine
// ─────────────────────────────────────────────────────────────────────────────

export const RECOMMENDATION_CONFIG = {
  MAX_RECOMMENDATIONS_PER_TYPE: 5,
  CONFIDENCE_THRESHOLD: 0.65,
  DIVERSITY_FACTOR: 0.3,
  RECENCY_WEIGHT: 0.2,
  FEEDBACK_WEIGHT: 0.4,
  MIN_RATINGS_FOR_COLLABORATIVE: 10,
  CONTENT_SIMILARITY_THRESHOLD: 0.5,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 10 - Exercise Engine
// ─────────────────────────────────────────────────────────────────────────────

export const EXERCISE_CONFIG = {
  MAX_HINTS_PER_EXERCISE: 3,
  HINT_PENALTY_PERCENT: 10,
  MAX_DIFFICULTY_ADJUSTMENTS: 5,
  SPACED_REPETITION_INTERVALS: [1, 3, 7, 14, 30, 60] as readonly number[],
  ACTIVE_RECALL_ENABLED: true,
  INTERLEAVING_ENABLED: true,
  MAX_EXERCISES_PER_SESSION: 20,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 11 - Parent AI Dashboard
// ─────────────────────────────────────────────────────────────────────────────

export const PARENT_AI_CONFIG = {
  ALERT_FREQUENCIES: ["real_time", "daily_digest", "weekly_summary"] as readonly string[],
  REPORT_DAY: "monday",
  COACHING_TIPS_PER_WEEK: 5,
  MAX_HOME_ACTIVITIES: 10,
  NOTIFICATION_METHODS: ["email", "sms", "push", "in_app"] as readonly string[],
  DASHBOARD_REFRESH_INTERVAL_MINUTES: 10,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 12 - Teacher Assistant AI
// ─────────────────────────────────────────────────────────────────────────────

export const TEACHER_ASSISTANT_CONFIG = {
  MAX_LESSON_PLANS_PER_DAY: 5,
  EXAM_TEMPLATE_QUESTIONS_RANGE: { MIN: 10, MAX: 50 },
  HOMEWORK_EXERCISES_RANGE: { MIN: 5, MAX: 20 },
  INSIGHTS_GENERATION_INTERVAL_MINUTES: 60,
  INTERVENTION_PRIORITY_LEVELS: ["low", "medium", "high", "urgent"] as readonly string[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 13 - Admin Intelligence
// ─────────────────────────────────────────────────────────────────────────────

export const ADMIN_INTELLIGENCE_CONFIG = {
  PERFORMANCE_CALCULATION_INTERVAL_HOURS: 6,
  RISK_PREDICTION_HORIZON_DAYS: 90,
  RESOURCE_ALLOCATION_REFRESH_MINUTES: 30,
  NATIONAL_COMPARISON_FREQUENCY_WEEKLY: 1,
  CURRICULUM_ANALYSIS_INTERVAL_MONTHS: 3,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 14 - Bloom's Taxonomy Integration
// ─────────────────────────────────────────────────────────────────────────────

export const BLOOM_TAXONOMY_CONFIG = {
  LEVELS: ["remember", "understand", "apply", "analyze", "evaluate", "create"] as readonly string[],
  LEVEL_DESCRIPTIONS: {
    remember: "Recall facts and basic concepts",
    understand: "Explain ideas or concepts",
    apply: "Use information in new situations",
    analyze: "Draw connections among ideas",
    evaluate: "Justify a stand or decision",
    create: "Produce new or original work",
  },
  ASSESSMENT_MAPPING: {
    remember: ["multiple_choice", "true_false", "fill_blank"],
    understand: ["short_answer", "matching", "explain"],
    apply: ["problem_solving", "demonstration", "case_study"],
    analyze: ["compare_contrast", "classification", "decomposition"],
    evaluate: ["argumentation", "peer_review", "critique"],
    create: ["project", "portfolio", "research"],
  },
  COGNITIVE_PROCESS_DIMENSIONS: ["factual", "conceptual", "procedural", "metacognitive"] as readonly string[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 15 - Curriculum Standards
// ─────────────────────────────────────────────────────────────────────────────

export const CURRICULUM_CONFIG = {
  SUPPORTED_STANDARDS: ["CBC", "APC", "Cambridge", "IB", "Common_Core", "National_Kenya", "South_Africa_CAPS"] as readonly string[],
  CBC_SUBJECTS: ["mathematics", "english", "kiswahili", "science", "social_studies", "creative_arts", "physical_education", "religious_education"] as readonly string[],
  APC_SUBJECTS: ["mathematics", "physics", "chemistry", "biology", "computer_science", "economics", "literature"] as readonly string[],
  CAMBRIDGE_SUBJECTS: ["mathematics", "further_mathematics", "physics", "chemistry", "biology", "computer_science", "economics", "business", "english", "history"] as readonly string[],
  IB_SUBJECTS: ["mathematics", "physics", "chemistry", "biology", "computer_science", "economics", "business_management", "english_a", "history", "geography"] as readonly string[],
  GRADE_LEVELS: ["pre_primary", "grade_1", "grade_2", "grade_3", "grade_4", "grade_5", "grade_6", "grade_7", "grade_8", "grade_9", "grade_10", "grade_11", "grade_12"] as readonly string[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 16 - Knowledge Tracing
// ─────────────────────────────────────────────────────────────────────────────

export const KNOWLEDGE_TRACING_CONFIG = {
  ALGORITHM_VERSION: "2.0",
  STATE_SPACE_SIZE: 100,
  TRANSITION_PROBABILITIES: { LEARNING: 0.4, FORGETTING: 0.1, SLIPPING: 0.05, GUESSING: 0.2 },
  LEARNING_RATE: 0.01,
  BATCH_SIZE: 32,
  EPOCHS: 50,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 17 - Spaced Repetition
// ─────────────────────────────────────────────────────────────────────────────

export const SPACED_REPETITION_CONFIG = {
  INITIAL_INTERVALS: [1, 2, 4, 7, 15] as readonly number[],
  EASE_FACTOR_MIN: 1.3,
  EASE_FACTOR_MAX: 3.0,
  INTERVAL_MULTIPLIERS: { EASY: 2.5, GOOD: 2.0, HARD: 1.2, AGAIN: 0.5 },
  REVIEW_WEIGHTS: { NEW: 0.3, LEARNING: 0.4, REVIEW: 0.2, RELEARNING: 0.1 },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 18 - Natural Language Processing
// ─────────────────────────────────────────────────────────────────────────────

export const NATURAL_LANGUAGE_CONFIG = {
  MAX_TOKENS: 2048,
  TEMPERATURE: 0.7,
  TOP_P: 0.9,
  FREQUENCY_PENALTY: 0.0,
  PRESENCE_PENALTY: 0.0,
  SUPPORTED_TASKS: ["summarization", "translation", "question_answering", "text_generation", "sentiment_analysis", "entity_extraction", "paraphrasing", "simplification"] as readonly string[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 19 - Voice Integration
// ─────────────────────────────────────────────────────────────────────────────

export const VOICE_CONFIG = {
  SUPPORTED_LANGUAGES: ["en", "sw", "fr", "ar", "ha", "yo", "zu", "am"] as readonly string[],
  SAMPLE_RATE: 16000,
  MAX_DURATION_SECONDS: 300,
  SILENCE_THRESHOLD: 500,
  WORD_ERROR_RATE_TARGET: 0.05,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 20 - Image Processing
// ─────────────────────────────────────────────────────────────────────────────

export const IMAGE_CONFIG = {
  SUPPORTED_FORMATS: ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp", "svg"] as readonly string[],
  MAX_RESOLUTION: { WIDTH: 4096, HEIGHT: 4096 },
  OCR_LANGUAGES: ["en", "sw", "fr", "ar", "ha", "yo"] as readonly string[],
  IMAGE_ANALYSIS_MODELS: ["object_detection", "ocr", "image_classification", "face_detection", "diagram_analysis"] as readonly string[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 21 - Math Solver
// ─────────────────────────────────────────────────────────────────────────────

export const MATH_SOLVER_CONFIG = {
  SUPPORTED_OPERATIONS: ["addition", "subtraction", "multiplication", "division", "exponents", "roots", "logarithms", "trigonometry", "calculus", "linear_algebra", "statistics", "probability"] as readonly string[],
  MAX_STEPS: 50,
  CAS_ENABLED: true,
  GRAPH_RENDERING: true,
  LATEX_SUPPORT: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 22 - Science Solver
// ─────────────────────────────────────────────────────────────────────────────

export const SCIENCE_SOLVER_CONFIG = {
  SUPPORTED_BRANCHES: ["physics", "chemistry", "biology", "earth_science", "environmental_science"] as readonly string[],
  FORMULA_DATABASE_SIZE: 10000,
  SIMULATION_ENABLED: true,
  PERIODIC_TABLE_DATA: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 23 - Programming Tutor
// ─────────────────────────────────────────────────────────────────────────────

export const PROGRAMMING_TUTOR_CONFIG = {
  SUPPORTED_LANGUAGES: ["python", "javascript", "java", "c", "cpp", "csharp", "ruby", "go", "rust", "typescript", "sql", "html", "css"] as readonly string[],
  CODE_EXECUTION_TIMEOUT_MS: 10000,
  SANDBOX_ENABLED: true,
  MAX_CODE_LENGTH: 5000,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 24 - Essay Assistant
// ─────────────────────────────────────────────────────────────────────────────

export const ESSAY_ASSISTANT_CONFIG = {
  MIN_WORDS: 200,
  MAX_WORDS: 5000,
  GRAMMAR_ENGINE: "language_tool",
  PLAGIARISM_CHECK: true,
  CITATION_FORMATS: ["APA", "MLA", "Chicago", "Harvard", "IEEE"] as readonly string[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Export All Adaptive Learning Configs
// ─────────────────────────────────────────────────────────────────────────────

export const ADAPTIVE_LEARNING_CONFIG = {
  ENGINE: ADAPTIVE_ENGINE_CONFIG,
  COMPETENCY_FRAMEWORK: COMPETENCY_FRAMEWORK_CONFIG,
  AI_TUTOR: AI_TUTOR_CONFIG,
  LEARNING_PATH: LEARNING_PATH_CONFIG,
  GAMIFICATION: GAMIFICATION_CONFIG,
  ASSESSMENT: ASSESSMENT_CONFIG,
  CONTENT: CONTENT_CONFIG,
  ANALYTICS: ANALYTICS_CONFIG,
  RECOMMENDATION: RECOMMENDATION_CONFIG,
  EXERCISE: EXERCISE_CONFIG,
  PARENT_AI: PARENT_AI_CONFIG,
  TEACHER_ASSISTANT: TEACHER_ASSISTANT_CONFIG,
  ADMIN_INTELLIGENCE: ADMIN_INTELLIGENCE_CONFIG,
  BLOOM_TAXONOMY: BLOOM_TAXONOMY_CONFIG,
  CURRICULUM: CURRICULUM_CONFIG,
  KNOWLEDGE_TRACING: KNOWLEDGE_TRACING_CONFIG,
  SPACED_REPETITION: SPACED_REPETITION_CONFIG,
  NATURAL_LANGUAGE: NATURAL_LANGUAGE_CONFIG,
  VOICE: VOICE_CONFIG,
  IMAGE: IMAGE_CONFIG,
  MATH_SOLVER: MATH_SOLVER_CONFIG,
  SCIENCE_SOLVER: SCIENCE_SOLVER_CONFIG,
  PROGRAMMING_TUTOR: PROGRAMMING_TUTOR_CONFIG,
  ESSAY_ASSISTANT: ESSAY_ASSISTANT_CONFIG,
} as const;

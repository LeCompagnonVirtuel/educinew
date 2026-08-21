// Education Intelligence Platform Configuration
// Phase 3.1 - EduCI Platform

// ─────────────────────────────────────────────────────────────────────────────
// Domain 1 - Intelligence Engine Core
// ─────────────────────────────────────────────────────────────────────────────

export const INT_ENGINE_GENERAL_CONFIG = {
  ENGINE_NAME: "EduCI Intelligence Engine",
  ENGINE_VERSION: "3.1.0",
  MAX_CONCURRENT_PIPELINES: 100,
  PIPELINE_TIMEOUT_SECONDS: 300,
  MAX_DATA_SOURCES: 50,
  DATA_INGESTION_ENABLED: true,
  REAL_TIME_PROCESSING_ENABLED: true,
  BATCH_PROCESSING_ENABLED: true,
  CACHE_TTL_SECONDS: 300,
  HEALTH_CHECK_INTERVAL_SECONDS: 30,
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
} as const;

export const INT_DATA_SOURCE_CONFIG = {
  SOURCE_TYPES: ["academic", "attendance", "finance", "hr", "lxp", "smart_campus", "communication", "documents", "analytics", "national_governance", "enterprise"] as readonly string[],
  MAX_SOURCES_PER_SCHOOL: 50,
  SYNC_INTERVAL_MINUTES: 15,
  BATCH_SIZE: 1000,
  MAX_CONCURRENT_SYNCS: 5,
  DATA_RETENTION_DAYS: 365,
  COMPRESSION_ENABLED: true,
  ENCRYPTION_ENABLED: true,
  VALIDATION_ENABLED: true,
  DEDUPLICATION_ENABLED: true,
  ERROR_HANDLING: "SKIP_AND_LOG" as const,
} as const;

export const INT_PIPELINE_CONFIG = {
  PIPELINE_TYPES: ["ETL", "STREAM", "BATCH", "REAL_TIME"] as readonly string[],
  MAX_PIPELINES_PER_SCHOOL: 20,
  MAX_PARALLEL_STEPS: 10,
  STEP_TIMEOUT_SECONDS: 60,
  CHECKPOINT_INTERVAL_SECONDS: 30,
  ROLLBACK_ENABLED: true,
  MONITORING_ENABLED: true,
  ALERT_ON_FAILURE: true,
  AUTO_RESTART_ON_FAILURE: true,
  MAX_FAILURE_RETRIES: 3,
} as const;

export const INT_MODEL_CONFIG = {
  MODEL_TYPES: ["CLASSIFICATION", "REGRESSION", "CLUSTERING", "ANOMALY_DETECTION", "TIME_SERIES", "NLP"] as readonly string[],
  MAX_MODELS_PER_SCHOOL: 10,
  TRAINING_ENABLED: true,
  AUTO_ML_ENABLED: true,
  MODEL_VERSIONING_ENABLED: true,
  A_B_TESTING_ENABLED: true,
  CANARY_DEPLOYMENT_ENABLED: true,
  MODEL_REGISTRY_ENABLED: true,
  MAX_TRAINING_TIME_MINUTES: 60,
  MIN_TRAINING_SAMPLES: 100,
  CROSS_VALIDATION_FOLDS: 5,
} as const;

export const INT_SCORING_CONFIG = {
  SCORE_TYPES: ["education_intelligence", "school_health", "academic_health", "financial_health", "teacher_performance", "student_success", "campus_efficiency", "risk", "compliance", "ai_confidence"] as readonly string[],
  SCORE_RANGE: { MIN: 0, MAX: 100 },
  DEFAULT_WEIGHTS: {
    education_intelligence: 0.25,
    school_health: 0.20,
    academic_health: 0.20,
    financial_health: 0.15,
    teacher_performance: 0.10,
    student_success: 0.10,
  },
  UPDATE_INTERVAL_MINUTES: 15,
  HISTORICAL_DATA_DAYS: 365,
  TREND_ANALYSIS_ENABLED: true,
  BENCHMARK_COMPARISON_ENABLED: true,
} as const;

export const INT_ALERT_CONFIG = {
  SEVERITY_LEVELS: ["info", "warning", "critical", "emergency"] as readonly string[],
  STATUSES: ["active", "acknowledged", "resolved", "escalated"] as readonly string[],
  MAX_ALERTS_PER_SCHOOL: 100,
  ALERT_COOLDOWN_MINUTES: 15,
  ESCALATION_TIMEOUT_MINUTES: 30,
  AUTO_RESOLVE_ENABLED: true,
  AUTO_RESOLVE_AFTER_HOURS: 24,
  NOTIFICATION_CHANNELS: ["email", "sms", "push", "in_app"] as readonly string[],
  BATCH_SIZE: 100,
  RETENTION_DAYS: 90,
} as const;

export const INT_RECOMMENDATION_CONFIG = {
  TYPES: ["improvement", "remediation", "pedagogical", "financial", "hr", "investment", "infrastructure", "program"] as readonly string[],
  PRIORITIES: ["low", "medium", "high", "critical"] as readonly string[],
  STATUSES: ["pending", "accepted", "in_progress", "completed", "rejected"] as readonly string[],
  MAX_RECOMMENDATIONS_PER_SCHOOL: 50,
  AUTO_GENERATE_ENABLED: true,
  CONFIDENCE_THRESHOLD: 0.7,
  FEEDBACK_COLLECTION_ENABLED: true,
  IMPACT_TRACKING_ENABLED: true,
  MAX_DISPLAY_PER_PAGE: 20,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 2 - Executive Intelligence Dashboard
// ─────────────────────────────────────────────────────────────────────────────

export const INT_DASHBOARD_CONFIG = {
  WIDGET_TYPES: ["score_card", "alert_list", "trend_chart", "comparison_table", "recommendation_list", "insight_feed", "action_tracker", "kpi_grid", "risk_matrix", "performance_gauge", "map_widget", "timeline"] as readonly string[],
  MAX_WIDGETS_PER_DASHBOARD: 20,
  MAX_DASHBOARDS_PER_USER: 10,
  REFRESH_INTERVAL_SECONDS: 30,
  AUTO_REFRESH_ENABLED: true,
  DRAG_AND_DROP_ENABLED: true,
  CUSTOM_WIDGETS_ENABLED: true,
  EXPORT_ENABLED: true,
  SHARING_ENABLED: true,
  DEFAULT_LAYOUT: "grid" as const,
  RESPONSIVE_ENABLED: true,
} as const;

export const INT_KPI_CONFIG = {
  KPI_CATEGORIES: ["academic", "financial", "operational", "strategic", "compliance"] as readonly string[],
  MAX_KPIS_PER_DASHBOARD: 15,
  TREND_PERIODS: [7, 30, 90, 365] as readonly number[],
  COMPARISON_MODES: ["previous_period", "target", "benchmark", "historical"] as readonly string[],
  ALERT_THRESHOLDS_ENABLED: true,
  CUSTOM_KPIS_ENABLED: true,
  REAL_TIME_UPDATES_ENABLED: true,
  DRILL_DOWN_ENABLED: true,
  EXPORT_FORMATS: ["pdf", "excel", "csv", "json"] as readonly string[],
} as const;

export const INT_WIDGET_CONFIG = {
  MAX_DATA_POINTS: 1000,
  CACHE_TTL_SECONDS: 60,
  LAZY_LOADING_ENABLED: true,
  ANIMATION_ENABLED: true,
  RESPONSIVE_ENABLED: true,
  INTERACTIVE_ENABLED: true,
  TOOLTIP_ENABLED: true,
  LEGEND_ENABLED: true,
  ZOOM_ENABLED: true,
  EXPORT_ENABLED: true,
  PRINT_ENABLED: true,
} as const;

export const INT_INSIGHT_CONFIG = {
  INSIGHT_CATEGORIES: ["trend", "anomaly", "correlation", "prediction", "recommendation", "risk"] as readonly string[],
  MAX_INSIGHTS_PER_PAGE: 20,
  CONFIDENCE_THRESHOLD: 0.6,
  AUTO_GENERATE_ENABLED: true,
  REAL_TIME_FEED_ENABLED: true,
  PERSONALIZATION_ENABLED: true,
  FEEDBACK_COLLECTION_ENABLED: true,
  HISTORICAL_INSIGHTS_DAYS: 90,
  INSIGHT_SHARING_ENABLED: true,
} as const;

export const INT_ACTION_CONFIG = {
  STATUSES: ["pending", "in_progress", "completed", "cancelled", "blocked"] as readonly string[],
  PRIORITIES: ["low", "medium", "high", "urgent"] as readonly string[],
  MAX_ACTIONS_PER_USER: 50,
  DUE_DATE_REQUIRED: true,
  ASSIGNEE_REQUIRED: true,
  PROGRESS_TRACKING_ENABLED: true,
  NOTIFICATION_REMINDERS_ENABLED: true,
  ESCALATION_ENABLED: true,
  BULK_UPDATE_ENABLED: true,
  COMMENT_ENABLED: true,
  ATTACHMENT_ENABLED: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 3 - Decision Intelligence Center
// ─────────────────────────────────────────────────────────────────────────────

export const INT_DECISION_CONFIG = {
  DECISION_TYPES: ["strategic", "operational", "tactical", "emergency"] as readonly string[],
  STATUSES: ["draft", "pending_review", "approved", "rejected", "implemented", "archived"] as readonly string[],
  MAX_DECISIONS_PER_SCHOOL: 100,
  WORKFLOW_ENABLED: true,
  APPROVAL_CHAIN_ENABLED: true,
  VOTING_ENABLED: true,
  DOCUMENTATION_REQUIRED: true,
  IMPACT_ASSESSMENT_REQUIRED: true,
  RISK_ASSESSMENT_REQUIRED: true,
  FOLLOW_UP_TRACKING_ENABLED: true,
  DECISION_TEMPLATES_ENABLED: true,
} as const;

export const INT_WORKFLOW_CONFIG = {
  WORKFLOW_TYPES: ["approval", "review", "notification", "escalation", "delegation"] as readonly string[],
  MAX_STEPS_PER_WORKFLOW: 10,
  MAX_CONDITIONS_PER_STEP: 5,
  TIMEOUT_HANDLING: "escalate" as const,
  PARALLEL_APPROVALS_ENABLED: true,
  DELEGATION_ENABLED: true,
  COMMENT_REQUIRED_ON_REJECTION: true,
  NOTIFICATION_ON_EACH_STEP: true,
  AUDIT_TRAIL_ENABLED: true,
  WORKFLOW_TEMPLATES_ENABLED: true,
} as const;

export const INT_GOVERNANCE_CONFIG = {
  GOVERNANCE_TYPES: ["policy", "compliance", "audit", "risk", "quality"] as readonly string[],
  MAX_POLICIES_PER_SCHOOL: 50,
  REVIEW_CYCLE_DAYS: 90,
  AUTO_REMINDER_ENABLED: true,
  VERSION_CONTROL_ENABLED: true,
  APPROVAL_WORKFLOW_ENABLED: true,
  COMPLIANCE_CHECK_ENABLED: true,
  AUDIT_LOG_RETENTION_DAYS: 365,
  RISK_REGISTER_ENABLED: true,
  QUALITY_METRICS_ENABLED: true,
} as const;

export const INT_RISK_CONFIG = {
  RISK_CATEGORIES: ["academic", "financial", "operational", "compliance", "strategic", "reputational"] as readonly string[],
  RISK_LEVELS: ["low", "medium", "high", "critical"] as readonly string[],
  STATUSES: ["identified", "assessed", "mitigated", "monitoring", "closed"] as readonly string[],
  MAX_RISKS_PER_SCHOOL: 100,
  ASSESSMENT_FREQUENCY_DAYS: 30,
  AUTO_IDENTIFICATION_ENABLED: true,
  MITIGATION_PLANS_REQUIRED: true,
  ESCALATION_THRESHOLDS_ENABLED: true,
  RISK_REGISTER_PUBLISH_ENABLED: true,
  BOARD_REPORTING_ENABLED: true,
} as const;

export const INT_COMPLIANCE_CONFIG = {
  COMPLIANCE_AREAS: ["academic_standards", "financial_regulations", "safety_requirements", "data_privacy", "labor_laws", "environmental"] as readonly string[],
  STATUSES: ["compliant", "non_compliant", "partial", "pending_review", "exempt"] as readonly string[],
  CHECK_FREQUENCY_DAYS: 30,
  AUTO_CHECK_ENABLED: true,
  DOCUMENTATION_REQUIRED: true,
  EVIDENCE_COLLECTION_ENABLED: true,
  REMEDIATION_TRACKING_ENABLED: true,
  REPORT_GENERATION_ENABLED: true,
  BENCHMARK_COMPARISON_ENABLED: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 4 - Predictive AI Analytics
// ─────────────────────────────────────────────────────────────────────────────

export const INT_PREDICTIVE_CONFIG = {
  MODEL_TYPES: ["student_performance", "dropout_risk", "attendance_prediction", "financial_forecast", "resource_optimization", "teacher_retention", "enrollment_forecast"] as readonly string[],
  MAX_MODELS_PER_SCHOOL: 10,
  PREDICTION_HORIZON_DAYS: [7, 30, 90, 180, 365] as readonly number[],
  CONFIDENCE_THRESHOLD: 0.7,
  AUTO_RETRAIN_ENABLED: true,
  RETRAINING_FREQUENCY_DAYS: 7,
  MIN_DATA_POINTS: 30,
  CROSS_VALIDATION_ENABLED: true,
  FEATURE_IMPORTANCE_ENABLED: true,
  EXPLANATION_ENABLED: true,
} as const;

export const INT_STUDENT_RISK_CONFIG = {
  RISK_FACTORS: ["academic_performance", "attendance", "behavior", "financial", "social", "health", "family"] as readonly string[],
  RISK_LEVELS: ["low", "medium", "high", "critical"] as readonly string[],
  INTERVENTION_TYPES: ["counseling", "academic_support", "financial_aid", "parent_engagement", "peer_mentoring", "specialist_referral"] as readonly string[],
  MAX_RISK_SCORE: 100,
  ALERT_THRESHOLD: 70,
  AUTO_INTERVENTION_ENABLED: true,
  PARENT_NOTIFICATION_ENABLED: true,
  FOLLOW_UP_TRACKING_ENABLED: true,
  CONFIDENCE_THRESHOLD: 0.6,
  HISTORICAL_ANALYSIS_DAYS: 180,
} as const;

export const INT_EARLY_WARNING_CONFIG = {
  WARNING_TYPES: ["academic_decline", "attendance_pattern", "behavioral_change", "financial_distress", "social_isolation", "health_concern"] as readonly string[],
  SEVERITY_LEVELS: ["low", "medium", "high", "critical"] as readonly string[],
  NOTIFICATION_CHANNELS: ["email", "sms", "push", "in_app", "manager"] as readonly string[],
  AUTO_DETECTION_ENABLED: true,
  PATTERN_RECOGNITION_ENABLED: true,
  THRESHOLD_CUSTOMIZATION_ENABLED: true,
  ESCALATION_ENABLED: true,
  INTERVENTION_RECOMMENDATION_ENABLED: true,
  TRACKING_DASHBOARD_ENABLED: true,
  RETENTION_DAYS: 365,
} as const;

export const INT_OUTLOOK_CONFIG = {
  OUTLOOK_TYPES: ["student_success", "institutional_performance", "financial_health", "operational_efficiency", "strategic_alignment"] as readonly string[],
  HORIZON_PERIODS: [30, 90, 180, 365] as readonly number[],
  CONFIDENCE_INTERVALS: [0.8, 0.9, 0.95] as readonly number[],
  SCENARIO_ANALYSIS_ENABLED: true,
  MONTE_CARLO_SIMULATION_ENABLED: true,
  SENSITIVITY_ANALYSIS_ENABLED: true,
  VISUALIZATION_ENABLED: true,
  EXPORT_ENABLED: true,
  COMPARISON_ENABLED: true,
} as const;

export const INT_SCENARIO_CONFIG = {
  SCENARIO_TYPES: ["best_case", "worst_case", "base_case", "custom"] as readonly string[],
  MAX_SCENARIOS_PER_MODEL: 10,
  PARAMETER_CUSTOMIZATION_ENABLED: true,
  COMPARISON_ENABLED: true,
  VISUALIZATION_ENABLED: true,
  EXPORT_ENABLED: true,
  SHARING_ENABLED: true,
  TEMPLATE_ENABLED: true,
  WHAT_IF_ANALYSIS_ENABLED: true,
  SENSITIVITY_ANALYSIS_ENABLED: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 5 - Knowledge Base & NLP
// ─────────────────────────────────────────────────────────────────────────────

export const INT_KNOWLEDGE_BASE_CONFIG = {
  CONTENT_TYPES: ["article", "guide", "policy", "procedure", "faq", "template", "report", "research"] as readonly string[],
  MAX_ARTICLES_PER_SCHOOL: 500,
  CATEGORIES: ["academic", "administrative", "financial", "hr", "legal", "technical", "operational"] as readonly string[],
  TAGGING_ENABLED: true,
  VERSIONING_ENABLED: true,
  APPROVAL_WORKFLOW_ENABLED: true,
  SEARCH_ENABLED: true,
  FULL_TEXT_SEARCH_ENABLED: true,
  AI_SEARCH_ENABLED: true,
  RELATED_CONTENT_ENABLED: true,
  FEEDBACK_COLLECTION_ENABLED: true,
  ANALYTICS_ENABLED: true,
} as const;

export const INT_NLP_CONFIG = {
  SUPPORTED_LANGUAGES: ["fr", "en"] as readonly string[],
  FEATURES: ["sentiment_analysis", "text_classification", "entity_extraction", "summarization", "translation", "question_answering", "text_generation"] as readonly string[],
  MAX_TEXT_LENGTH: 10000,
  BATCH_SIZE: 100,
  CONFIDENCE_THRESHOLD: 0.7,
  CUSTOM_VOCABULARY_ENABLED: true,
  DOMAIN_SPECIFIC_MODELS_ENABLED: true,
  REAL_TIME_PROCESSING_ENABLED: true,
  CACHE_ENABLED: true,
  CACHE_TTL_SECONDS: 300,
} as const;

export const INT_AUTO_CLASSIFICATION_CONFIG = {
  CATEGORIES: ["student_query", "parent_complaint", "teacher_feedback", "maintenance_request", "financial_inquiry", "academic_inquiry", "hr_inquiry", "general_inquiry"] as readonly string[],
  PRIORITY_LEVELS: ["low", "medium", "high", "urgent"] as readonly string[],
  AUTO_ASSIGN_ENABLED: true,
  ROUTING_ENABLED: true,
  ESCALATION_ENABLED: true,
  FEEDBACK_LOOP_ENABLED: true,
  CONTINUOUS_LEARNING_ENABLED: true,
  CUSTOM_CATEGORY_ENABLED: true,
  BATCH_PROCESSING_ENABLED: true,
  MAX_CATEGORIES: 50,
} as const;

export const INT_SUMMARIZATION_CONFIG = {
  SUMMARIZATION_TYPES: ["executive_summary", "detailed_summary", "bullet_points", "key_insights", "action_items"] as readonly string[],
  MAX_SUMMARY_LENGTH: 1000,
  MIN_SUMMARY_LENGTH: 100,
  LANGUAGE: "fr" as const,
  INCLUDE_KEY_METRICS: true,
  INCLUDE_RECOMMENDATIONS: true,
  INCLUDE_TRENDS: true,
  CUSTOM_TEMPLATE_ENABLED: true,
  BATCH_PROCESSING_ENABLED: true,
  REAL_TIME_ENABLED: true,
} as const;

export const INT_DOCUMENT_INTELLIGENCE_CONFIG = {
  DOCUMENT_TYPES: ["pdf", "docx", "xlsx", "pptx", "txt", "csv", "json"] as readonly string[],
  FEATURES: ["ocr", "text_extraction", "entity_recognition", "sentiment_analysis", "classification", "summarization", "translation"] as readonly string[],
  MAX_DOCUMENT_SIZE_MB: 50,
  BATCH_PROCESSING_ENABLED: true,
  REAL_TIME_PROCESSING_ENABLED: true,
  CUSTOM_TEMPLATES_ENABLED: true,
  INTEGRATION_WITH_KB_ENABLED: true,
  VERSION_CONTROL_ENABLED: true,
  ACCESS_CONTROL_ENABLED: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 6 - AI Performance Analytics
// ─────────────────────────────────────────────────────────────────────────────

export const INT_MODEL_PERFORMANCE_CONFIG = {
  METRICS: ["accuracy", "precision", "recall", "f1_score", "auc_roc", "mse", "mae", "r_squared"] as readonly string[],
  EVALUATION_FREQUENCY: "daily" as const,
  DASHBOARD_ENABLED: true,
  ALERTING_ENABLED: true,
  DRIFT_DETECTION_ENABLED: true,
  BIAS_DETECTION_ENABLED: true,
  EXPLAINABILITY_ENABLED: true,
  COMPARISON_ENABLED: true,
  HISTORICAL_TRACKING_ENABLED: true,
  CUSTOM_METRICS_ENABLED: true,
} as const;

export const INT_BENCHMARK_CONFIG = {
  BENCHMARK_TYPES: ["internal", "external", "industry", "regional", "national"] as readonly string[],
  COMPARISON_DIMENSIONS: ["school", "region", "department", "grade_level", "subject"] as readonly string[],
  MAX_BENCHMARKS_PER_SCHOOL: 20,
  AUTO_UPDATE_ENABLED: true,
  VISUALIZATION_ENABLED: true,
  CUSTOM_BENCHMARKS_ENABLED: true,
  HISTORICAL_COMPARISON_ENABLED: true,
  RANKING_ENABLED: true,
  PERCENTILE_CALCULATION_ENABLED: true,
  EXPORT_ENABLED: true,
} as const;

export const INT_AI_INSIGHT_CONFIG = {
  INSIGHT_TYPES: ["performance", "trend", "anomaly", "correlation", "prediction", "recommendation", "risk", "opportunity"] as readonly string[],
  MAX_INSIGHTS_PER_PAGE: 20,
  CONFIDENCE_THRESHOLD: 0.6,
  AUTO_GENERATE_ENABLED: true,
  PERSONALIZATION_ENABLED: true,
  FEEDBACK_COLLECTION_ENABLED: true,
  SHARING_ENABLED: true,
  EXPORT_ENABLED: true,
  DASHBOARD_INTEGRATION_ENABLED: true,
  REAL_TIME_UPDATES_ENABLED: true,
} as const;

export const INT_ANALYTICS_REPORT_CONFIG = {
  REPORT_TYPES: ["daily", "weekly", "monthly", "quarterly", "annual", "custom"] as readonly string[],
  FORMATS: ["pdf", "excel", "csv", "json", "html"] as readonly string[],
  MAX_REPORTS_PER_SCHOOL: 100,
  SCHEDULING_ENABLED: true,
  AUTO_GENERATION_ENABLED: true,
  CUSTOM_TEMPLATES_ENABLED: true,
  DISTRIBUTION_ENABLED: true,
  ARCHIVING_ENABLED: true,
  COMPARISON_ENABLED: true,
  VISUALIZATION_ENABLED: true,
  INTERACTIVE_ENABLED: true,
} as const;

export const INT_VISUALIZATION_CONFIG = {
  CHART_TYPES: ["line", "bar", "pie", "scatter", "heatmap", "gauge", "funnel", "treemap", "radar", "box_plot"] as readonly string[],
  MAX_DATA_SERIES: 20,
  MAX_DATA_POINTS: 1000,
  INTERACTIVE_ENABLED: true,
  ZOOM_ENABLED: true,
  FILTER_ENABLED: true,
  EXPORT_ENABLED: true,
  PRINT_ENABLED: true,
  RESPONSIVE_ENABLED: true,
  ANIMATION_ENABLED: true,
  CUSTOM_THEMES_ENABLED: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Domain 7 - Integration & Data Connectors
// ─────────────────────────────────────────────────────────────────────────────

export const INT_CONNECTOR_CONFIG = {
  CONNECTOR_TYPES: ["database", "api", "file", "webhook", "streaming", "batch"] as readonly string[],
  MAX_CONNECTORS_PER_SCHOOL: 20,
  AUTHENTICATION_TYPES: ["api_key", "oauth2", "basic", "jwt", "certificate"] as readonly string[],
  ENCRYPTION_ENABLED: true,
  VALIDATION_ENABLED: true,
  ERROR_HANDLING: "skip_and_log" as const,
  RETRY_POLICY: {
    MAX_RETRIES: 3,
    DELAY_MS: 1000,
    BACKOFF_MULTIPLIER: 2,
  },
  MONITORING_ENABLED: true,
  ALERTING_ENABLED: true,
} as const;

export const INT_DATA_SYNC_CONFIG = {
  SYNC_TYPES: ["real_time", "near_real_time", "batch", "on_demand"] as readonly string[],
  MAX_SYNC_OPERATIONS: 10,
  CONFLICT_RESOLUTION: "server_wins" as const,
  DATA_VALIDATION_ENABLED: true,
  TRANSFORMATION_ENABLED: true,
  MAPPING_ENABLED: true,
  SCHEDULING_ENABLED: true,
  MONITORING_ENABLED: true,
  ROLLBACK_ENABLED: true,
  AUDIT_TRAIL_ENABLED: true,
} as const;

export const INT_API_CONFIG = {
  API_VERSION: "v1",
  RATE_LIMIT: 100,
  RATE_LIMIT_WINDOW_MS: 60000,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE_SIZE: 20,
  PAGINATION_ENABLED: true,
  FILTERING_ENABLED: true,
  SORTING_ENABLED: true,
  FIELD_SELECTION_ENABLED: true,
  COMPRESSION_ENABLED: true,
  CACHING_ENABLED: true,
  CACHE_TTL_SECONDS: 60,
} as const;

export const INT_SECURITY_CONFIG = {
  AUTHENTICATION_REQUIRED: true,
  AUTHORIZATION_ENABLED: true,
  API_KEY_ROTATION_DAYS: 90,
  ENCRYPTION_AT_REST: true,
  ENCRYPTION_IN_TRANSIT: true,
  DATA_MASKING_ENABLED: true,
  AUDIT_LOGGING_ENABLED: true,
  RATE_LIMITING_ENABLED: true,
  IP_WHITELISTING_ENABLED: false,
  WEBHOOK_SIGNATURE_VERIFICATION: true,
  MAX_SESSION_DURATION_MINUTES: 480,
} as const;

export const INT_MONITORING_CONFIG = {
  METRICS_COLLECTION_ENABLED: true,
  LOGGING_ENABLED: true,
  TRACING_ENABLED: true,
  ALERTING_ENABLED: true,
  HEALTH_CHECK_ENABLED: true,
  HEALTH_CHECK_INTERVAL_SECONDS: 30,
  UPTIME_MONITORING_ENABLED: true,
  PERFORMANCE_MONITORING_ENABLED: true,
  ERROR_TRACKING_ENABLED: true,
  RESOURCE_USAGE_MONITORING_ENABLED: true,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Export All Intelligence Configs
// ─────────────────────────────────────────────────────────────────────────────

export const INTELLIGENCE_CONFIG = {
  ENGINE: INT_ENGINE_GENERAL_CONFIG,
  DATA_SOURCE: INT_DATA_SOURCE_CONFIG,
  PIPELINE: INT_PIPELINE_CONFIG,
  MODEL: INT_MODEL_CONFIG,
  SCORING: INT_SCORING_CONFIG,
  ALERT: INT_ALERT_CONFIG,
  RECOMMENDATION: INT_RECOMMENDATION_CONFIG,
  DASHBOARD: INT_DASHBOARD_CONFIG,
  KPI: INT_KPI_CONFIG,
  WIDGET: INT_WIDGET_CONFIG,
  INSIGHT: INT_INSIGHT_CONFIG,
  ACTION: INT_ACTION_CONFIG,
  DECISION: INT_DECISION_CONFIG,
  WORKFLOW: INT_WORKFLOW_CONFIG,
  GOVERNANCE: INT_GOVERNANCE_CONFIG,
  RISK: INT_RISK_CONFIG,
  COMPLIANCE: INT_COMPLIANCE_CONFIG,
  PREDICTIVE: INT_PREDICTIVE_CONFIG,
  STUDENT_RISK: INT_STUDENT_RISK_CONFIG,
  EARLY_WARNING: INT_EARLY_WARNING_CONFIG,
  OUTLOOK: INT_OUTLOOK_CONFIG,
  SCENARIO: INT_SCENARIO_CONFIG,
  KNOWLEDGE_BASE: INT_KNOWLEDGE_BASE_CONFIG,
  NLP: INT_NLP_CONFIG,
  AUTO_CLASSIFICATION: INT_AUTO_CLASSIFICATION_CONFIG,
  SUMMARIZATION: INT_SUMMARIZATION_CONFIG,
  DOCUMENT_INTELLIGENCE: INT_DOCUMENT_INTELLIGENCE_CONFIG,
  MODEL_PERFORMANCE: INT_MODEL_PERFORMANCE_CONFIG,
  BENCHMARK: INT_BENCHMARK_CONFIG,
  AI_INSIGHT: INT_AI_INSIGHT_CONFIG,
  ANALYTICS_REPORT: INT_ANALYTICS_REPORT_CONFIG,
  VISUALIZATION: INT_VISUALIZATION_CONFIG,
  CONNECTOR: INT_CONNECTOR_CONFIG,
  DATA_SYNC: INT_DATA_SYNC_CONFIG,
  API: INT_API_CONFIG,
  SECURITY: INT_SECURITY_CONFIG,
  MONITORING: INT_MONITORING_CONFIG,
} as const;

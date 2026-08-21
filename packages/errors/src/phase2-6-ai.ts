import { AppError } from './AppError';

// ==================== AI CORE (25) ====================

export class AiModelNotFoundError extends AppError {
  constructor(message = 'Modèle IA introuvable') {
    super(message, 'AI_MODEL_NOT_FOUND_ERROR', 404);
  }
}

export class AiModelCreateError extends AppError {
  constructor(message = 'Impossible de créer le modèle IA') {
    super(message, 'AI_MODEL_CREATE_ERROR', 500);
  }
}

export class AiModelUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le modèle IA') {
    super(message, 'AI_MODEL_UPDATE_ERROR', 500);
  }
}

export class AiModelDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le modèle IA') {
    super(message, 'AI_MODEL_DELETE_ERROR', 500);
  }
}

export class AiModelUnavailableError extends AppError {
  constructor(message = 'Modèle IA indisponible') {
    super(message, 'AI_MODEL_UNAVAILABLE_ERROR', 503);
  }
}

export class AiModelRateLimitError extends AppError {
  constructor(message = 'Limite de débit du modèle IA atteinte') {
    super(message, 'AI_MODEL_RATE_LIMIT_ERROR', 429);
  }
}

export class AiModelConfigError extends AppError {
  constructor(message = 'Configuration du modèle IA invalide') {
    super(message, 'AI_MODEL_CONFIG_ERROR', 400);
  }
}

export class AiModelHealthError extends AppError {
  constructor(message = 'Santé du modèle IA dégradée') {
    super(message, 'AI_MODEL_HEALTH_ERROR', 502);
  }
}

export class AiSessionNotFoundError extends AppError {
  constructor(message = 'Session IA introuvable') {
    super(message, 'AI_SESSION_NOT_FOUND_ERROR', 404);
  }
}

export class AiSessionCreateError extends AppError {
  constructor(message = 'Impossible de créer la session IA') {
    super(message, 'AI_SESSION_CREATE_ERROR', 500);
  }
}

export class AiSessionExpiredError extends AppError {
  constructor(message = 'Session IA expirée') {
    super(message, 'AI_SESSION_EXPIRED_ERROR', 410);
  }
}

export class AiSessionLimitError extends AppError {
  constructor(message = 'Limite de sessions IA atteinte') {
    super(message, 'AI_SESSION_LIMIT_ERROR', 429);
  }
}

export class AiConversationNotFoundError extends AppError {
  constructor(message = 'Conversation IA introuvable') {
    super(message, 'AI_CONVERSATION_NOT_FOUND_ERROR', 404);
  }
}

export class AiConversationCreateError extends AppError {
  constructor(message = 'Impossible de créer la conversation IA') {
    super(message, 'AI_CONVERSATION_CREATE_ERROR', 500);
  }
}

export class AiMessageError extends AppError {
  constructor(message = 'Erreur de message IA') {
    super(message, 'AI_MESSAGE_ERROR', 500);
  }
}

export class AiMessageStreamError extends AppError {
  constructor(message = 'Erreur de streaming du message IA') {
    super(message, 'AI_MESSAGE_STREAM_ERROR', 500);
  }
}

export class AiPromptNotFoundError extends AppError {
  constructor(message = 'Prompt IA introuvable') {
    super(message, 'AI_PROMPT_NOT_FOUND_ERROR', 404);
  }
}

export class AiPromptCreateError extends AppError {
  constructor(message = 'Impossible de créer le prompt IA') {
    super(message, 'AI_PROMPT_CREATE_ERROR', 500);
  }
}

export class AiPromptValidationError extends AppError {
  constructor(message = 'Prompt IA invalide') {
    super(message, 'AI_PROMPT_VALIDATION_ERROR', 400);
  }
}

export class AiPromptExecutionError extends AppError {
  constructor(message = 'Erreur d\'exécution du prompt IA') {
    super(message, 'AI_PROMPT_EXECUTION_ERROR', 500);
  }
}

export class AiTokenLimitExceededError extends AppError {
  constructor(message = 'Limite de tokens IA dépassée') {
    super(message, 'AI_TOKEN_LIMIT_EXCEEDED_ERROR', 429);
  }
}

export class AiCostLimitExceededError extends AppError {
  constructor(message = 'Limite de coût IA dépassée') {
    super(message, 'AI_COST_LIMIT_EXCEEDED_ERROR', 429);
  }
}

export class AiBudgetExhaustedError extends AppError {
  constructor(message = 'Budget IA épuisé') {
    super(message, 'AI_BUDGET_EXHAUSTED_ERROR', 429);
  }
}

export class AiContextError extends AppError {
  constructor(message = 'Erreur de contexte IA') {
    super(message, 'AI_CONTEXT_ERROR', 500);
  }
}

export class AiRoutingError extends AppError {
  constructor(message = 'Erreur de routage IA') {
    super(message, 'AI_ROUTING_ERROR', 500);
  }
}

// ==================== AI AGENTS (25) ====================

export class AiAgentNotFoundError extends AppError {
  constructor(message = 'Agent IA introuvable') {
    super(message, 'AI_AGENT_NOT_FOUND_ERROR', 404);
  }
}

export class AiAgentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'agent IA') {
    super(message, 'AI_AGENT_CREATE_ERROR', 500);
  }
}

export class AiAgentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'agent IA') {
    super(message, 'AI_AGENT_UPDATE_ERROR', 500);
  }
}

export class AiAgentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'agent IA') {
    super(message, 'AI_AGENT_DELETE_ERROR', 500);
  }
}

export class AiAgentExecutionError extends AppError {
  constructor(message = 'Erreur d\'exécution de l\'agent IA') {
    super(message, 'AI_AGENT_EXECUTION_ERROR', 500);
  }
}

export class AiAgentTimeoutError extends AppError {
  constructor(message = 'Délai d\'attente de l\'agent IA dépassé') {
    super(message, 'AI_AGENT_TIMEOUT_ERROR', 504);
  }
}

export class AiAgentPermissionError extends AppError {
  constructor(message = 'Permission insuffisante pour l\'agent IA') {
    super(message, 'AI_AGENT_PERMISSION_ERROR', 403);
  }
}

export class AiAgentToolError extends AppError {
  constructor(message = 'Erreur d\'outil de l\'agent IA') {
    super(message, 'AI_AGENT_TOOL_ERROR', 500);
  }
}

export class AiAgentMemoryError extends AppError {
  constructor(message = 'Erreur de mémoire de l\'agent IA') {
    super(message, 'AI_AGENT_MEMORY_ERROR', 500);
  }
}

export class AiAgentConfigError extends AppError {
  constructor(message = 'Configuration de l\'agent IA invalide') {
    super(message, 'AI_AGENT_CONFIG_ERROR', 400);
  }
}

export class AiAgentDelegationError extends AppError {
  constructor(message = 'Erreur de délégation d\'agent IA') {
    super(message, 'AI_AGENT_DELEGATION_ERROR', 500);
  }
}

export class AiAgentConversationError extends AppError {
  constructor(message = 'Erreur de conversation d\'agent IA') {
    super(message, 'AI_AGENT_CONVERSATION_ERROR', 500);
  }
}

export class AiAgentVersionError extends AppError {
  constructor(message = 'Erreur de version d\'agent IA') {
    super(message, 'AI_AGENT_VERSION_ERROR', 500);
  }
}

export class AiAgentFeedbackError extends AppError {
  constructor(message = 'Erreur de feedback d\'agent IA') {
    super(message, 'AI_AGENT_FEEDBACK_ERROR', 500);
  }
}

export class AiAgentTemplateError extends AppError {
  constructor(message = 'Erreur de modèle d\'agent IA') {
    super(message, 'AI_AGENT_TEMPLATE_ERROR', 500);
  }
}

export class AiAgentSkillError extends AppError {
  constructor(message = 'Erreur de compétence d\'agent IA') {
    super(message, 'AI_AGENT_SKILL_ERROR', 500);
  }
}

export class AiAgentTriggerError extends AppError {
  constructor(message = 'Erreur de déclencheur d\'agent IA') {
    super(message, 'AI_AGENT_TRIGGER_ERROR', 500);
  }
}

export class AiAgentLogError extends AppError {
  constructor(message = 'Erreur de journal d\'agent IA') {
    super(message, 'AI_AGENT_LOG_ERROR', 500);
  }
}

export class AiAgentAnalyticsError extends AppError {
  constructor(message = 'Erreur d\'analyse d\'agent IA') {
    super(message, 'AI_AGENT_ANALYTICS_ERROR', 500);
  }
}

export class AiAgentVersionMismatchError extends AppError {
  constructor(message = 'Conflit de version d\'agent IA') {
    super(message, 'AI_AGENT_VERSION_MISMATCH_ERROR', 409);
  }
}

export class AiAgentDisabledError extends AppError {
  constructor(message = 'Agent IA désactivé') {
    super(message, 'AI_AGENT_DISABLED_ERROR', 403);
  }
}

export class AiAgentMaintenanceError extends AppError {
  constructor(message = 'Agent IA en maintenance') {
    super(message, 'AI_AGENT_MAINTENANCE_ERROR', 503);
  }
}

export class AiAgentCollaborationError extends AppError {
  constructor(message = 'Erreur de collaboration d\'agents IA') {
    super(message, 'AI_AGENT_COLLABORATION_ERROR', 500);
  }
}

export class AiAgentWorkflowError extends AppError {
  constructor(message = 'Erreur de flux de travail d\'agent IA') {
    super(message, 'AI_AGENT_WORKFLOW_ERROR', 500);
  }
}

export class AiAgentDependencyError extends AppError {
  constructor(message = 'Dépendance d\'agent IA manquante') {
    super(message, 'AI_AGENT_DEPENDENCY_ERROR', 400);
  }
}

// ==================== EDUCATION AI (25) ====================

export class AiLessonGenerationError extends AppError {
  constructor(message = 'Erreur de génération de leçon') {
    super(message, 'AI_LESSON_GENERATION_ERROR', 500);
  }
}

export class AiCourseGenerationError extends AppError {
  constructor(message = 'Erreur de génération de cours') {
    super(message, 'AI_COURSE_GENERATION_ERROR', 500);
  }
}

export class AiExamGenerationError extends AppError {
  constructor(message = 'Erreur de génération d\'examen') {
    super(message, 'AI_EXAM_GENERATION_ERROR', 500);
  }
}

export class AiQuizGenerationError extends AppError {
  constructor(message = 'Erreur de génération de quiz') {
    super(message, 'AI_QUIZ_GENERATION_ERROR', 500);
  }
}

export class AiHomeworkGenerationError extends AppError {
  constructor(message = 'Erreur de génération de devoir') {
    super(message, 'AI_HOMEWORK_GENERATION_ERROR', 500);
  }
}

export class AiCorrectionError extends AppError {
  constructor(message = 'Erreur de correction IA') {
    super(message, 'AI_CORRECTION_ERROR', 500);
  }
}

export class AiRubricGenerationError extends AppError {
  constructor(message = 'Erreur de génération de grille d\'évaluation') {
    super(message, 'AI_RUBRIC_GENERATION_ERROR', 500);
  }
}

export class AiBulletinCommentError extends AppError {
  constructor(message = 'Erreur de génération de commentaire de bulletin') {
    super(message, 'AI_BULLETIN_COMMENT_ERROR', 500);
  }
}

export class AiReportGenerationError extends AppError {
  constructor(message = 'Erreur de génération de rapport') {
    super(message, 'AI_REPORT_GENERATION_ERROR', 500);
  }
}

export class AiCurriculumGenerationError extends AppError {
  constructor(message = 'Erreur de génération de curriculum') {
    super(message, 'AI_CURRICULUM_GENERATION_ERROR', 500);
  }
}

export class AiCompetencyMappingError extends AppError {
  constructor(message = 'Erreur de cartographie de compétences') {
    super(message, 'AI_COMPETENCY_MAPPING_ERROR', 500);
  }
}

export class AiBloomTaxonomyError extends AppError {
  constructor(message = 'Erreur de taxonomie de Bloom') {
    super(message, 'AI_BLOOM_TAXONOMY_ERROR', 500);
  }
}

export class AiLearningObjectiveError extends AppError {
  constructor(message = 'Erreur d\'objectif d\'apprentissage') {
    super(message, 'AI_LEARNING_OBJECTIVE_ERROR', 500);
  }
}

export class AiLessonPlanError extends AppError {
  constructor(message = 'Erreur de plan de leçon') {
    super(message, 'AI_LESSON_PLAN_ERROR', 500);
  }
}

export class AiContentGenerationError extends AppError {
  constructor(message = 'Erreur de génération de contenu') {
    super(message, 'AI_CONTENT_GENERATION_ERROR', 500);
  }
}

export class AiContentImprovementError extends AppError {
  constructor(message = 'Erreur d\'amélioration de contenu') {
    super(message, 'AI_CONTENT_IMPROVEMENT_ERROR', 500);
  }
}

export class AiExerciseGenerationError extends AppError {
  constructor(message = 'Erreur de génération d\'exercice') {
    super(message, 'AI_EXERCISE_GENERATION_ERROR', 500);
  }
}

export class AiQuestionGenerationError extends AppError {
  constructor(message = 'Erreur de génération de question') {
    super(message, 'AI_QUESTION_GENERATION_ERROR', 500);
  }
}

export class AiAnswerEvaluationError extends AppError {
  constructor(message = 'Erreur d\'évaluation de réponse') {
    super(message, 'AI_ANSWER_EVALUATION_ERROR', 500);
  }
}

export class AiGradingError extends AppError {
  constructor(message = 'Erreur de notation IA') {
    super(message, 'AI_GRADING_ERROR', 500);
  }
}

export class AiPedagogyError extends AppError {
  constructor(message = 'Erreur pédagogique IA') {
    super(message, 'AI_PEDAGOGY_ERROR', 500);
  }
}

export class AiCurriculumAlignmentError extends AppError {
  constructor(message = 'Erreur d\'alignement curriculum') {
    super(message, 'AI_CURRICULUM_ALIGNMENT_ERROR', 500);
  }
}

export class AiDifficultyCalibrationError extends AppError {
  constructor(message = 'Erreur de calibrage de difficulté') {
    super(message, 'AI_DIFFICULTY_CALIBRATION_ERROR', 500);
  }
}

export class AiTopicCoverageError extends AppError {
  constructor(message = 'Erreur de couverture thématique') {
    super(message, 'AI_TOPIC_COVERAGE_ERROR', 500);
  }
}

export class AiAssessmentDesignError extends AppError {
  constructor(message = 'Erreur de conception d\'évaluation') {
    super(message, 'AI_ASSESSMENT_DESIGN_ERROR', 500);
  }
}

// ==================== STUDENT AI (25) ====================

export class AiTutorSessionError extends AppError {
  constructor(message = 'Erreur de session de tutorat IA') {
    super(message, 'AI_TUTOR_SESSION_ERROR', 500);
  }
}

export class AiTutorTimeoutError extends AppError {
  constructor(message = 'Délai d\'attente du tutorat IA dépassé') {
    super(message, 'AI_TUTOR_TIMEOUT_ERROR', 504);
  }
}

export class AiTutorTopicError extends AppError {
  constructor(message = 'Sujet de tutorat invalide') {
    super(message, 'AI_TUTOR_TOPIC_ERROR', 400);
  }
}

export class AiLearningCoachError extends AppError {
  constructor(message = 'Erreur de coach d\'apprentissage IA') {
    super(message, 'AI_LEARNING_COACH_ERROR', 500);
  }
}

export class AiRevisionPlanError extends AppError {
  constructor(message = 'Erreur de plan de révision IA') {
    super(message, 'AI_REVISION_PLAN_ERROR', 500);
  }
}

export class AiFlashcardError extends AppError {
  constructor(message = 'Erreur de flashcard IA') {
    super(message, 'AI_FLASHCARD_ERROR', 500);
  }
}

export class AiFlashcardDeckError extends AppError {
  constructor(message = 'Erreur de deck de flashcards IA') {
    super(message, 'AI_FLASHCARD_DECK_ERROR', 500);
  }
}

export class AiAdaptiveLearningError extends AppError {
  constructor(message = 'Erreur d\'apprentissage adaptatif IA') {
    super(message, 'AI_ADAPTIVE_LEARNING_ERROR', 500);
  }
}

export class AiWeaknessDetectionError extends AppError {
  constructor(message = 'Erreur de détection de faiblesses IA') {
    super(message, 'AI_WEAKNESS_DETECTION_ERROR', 500);
  }
}

export class AiRecommendationError extends AppError {
  constructor(message = 'Erreur de recommandation IA') {
    super(message, 'AI_RECOMMENDATION_ERROR', 500);
  }
}

export class AiLearningPathError extends AppError {
  constructor(message = 'Erreur de parcours d\'apprentissage IA') {
    super(message, 'AI_LEARNING_PATH_ERROR', 500);
  }
}

export class AiStudyScheduleError extends AppError {
  constructor(message = 'Erreur d\'emploi du temps d\'étude IA') {
    super(message, 'AI_STUDY_SCHEDULE_ERROR', 500);
  }
}

export class AiExamPreparationError extends AppError {
  constructor(message = 'Erreur de préparation d\'examen IA') {
    super(message, 'AI_EXAM_PREPARATION_ERROR', 500);
  }
}

export class AiProgressPredictionError extends AppError {
  constructor(message = 'Erreur de prédiction de progression IA') {
    super(message, 'AI_PROGRESS_PREDICTION_ERROR', 500);
  }
}

export class AiDropoutPredictionError extends AppError {
  constructor(message = 'Erreur de prédiction d\'abandon IA') {
    super(message, 'AI_DROPOUT_PREDICTION_ERROR', 500);
  }
}

export class AiMotivationError extends AppError {
  constructor(message = 'Erreur de motivation IA') {
    super(message, 'AI_MOTIVATION_ERROR', 500);
  }
}

export class AiStudentInsightError extends AppError {
  constructor(message = 'Erreur d\'aperçu élève IA') {
    super(message, 'AI_STUDENT_INSIGHT_ERROR', 500);
  }
}

export class AiDifficultyAssessmentError extends AppError {
  constructor(message = 'Erreur d\'évaluation de difficulté IA') {
    super(message, 'AI_DIFFICULTY_ASSESSMENT_ERROR', 500);
  }
}

export class AiLearningStyleError extends AppError {
  constructor(message = 'Erreur de style d\'apprentissage IA') {
    super(message, 'AI_LEARNING_STYLE_ERROR', 500);
  }
}

export class AiEngagementAnalysisError extends AppError {
  constructor(message = 'Erreur d\'analyse d\'engagement IA') {
    super(message, 'AI_ENGAGEMENT_ANALYSIS_ERROR', 500);
  }
}

export class AiPerformanceTrendError extends AppError {
  constructor(message = 'Erreur de tendance de performance IA') {
    super(message, 'AI_PERFORMANCE_TREND_ERROR', 500);
  }
}

export class AiStudyTechniqueError extends AppError {
  constructor(message = 'Erreur de technique d\'étude IA') {
    super(message, 'AI_STUDY_TECHNIQUE_ERROR', 500);
  }
}

export class AiKnowledgeGapError extends AppError {
  constructor(message = 'Erreur de lacune de connaissances IA') {
    super(message, 'AI_KNOWLEDGE_GAP_ERROR', 500);
  }
}

export class AiMetacognitionError extends AppError {
  constructor(message = 'Erreur de métacognition IA') {
    super(message, 'AI_METACOGNITION_ERROR', 500);
  }
}

export class AiSelfRegulationError extends AppError {
  constructor(message = 'Erreur d\'autorégulation IA') {
    super(message, 'AI_SELF_REGULATION_ERROR', 500);
  }
}

// ==================== TEACHER AI (25) ====================

export class AiTeachingAssistantError extends AppError {
  constructor(message = 'Erreur d\'assistant pédagogique IA') {
    super(message, 'AI_TEACHING_ASSISTANT_ERROR', 500);
  }
}

export class AiContentAnalysisError extends AppError {
  constructor(message = 'Erreur d\'analyse de contenu IA') {
    super(message, 'AI_CONTENT_ANALYSIS_ERROR', 500);
  }
}

export class AiExerciseDesignError extends AppError {
  constructor(message = 'Erreur de conception d\'exercice IA') {
    super(message, 'AI_EXERCISE_DESIGN_ERROR', 500);
  }
}

export class AiExamCorrectionError extends AppError {
  constructor(message = 'Erreur de correction d\'examen IA') {
    super(message, 'AI_EXAM_CORRECTION_ERROR', 500);
  }
}

export class AiAttendanceAnalysisError extends AppError {
  constructor(message = 'Erreur d\'analyse de présence IA') {
    super(message, 'AI_ATTENDANCE_ANALYSIS_ERROR', 500);
  }
}

export class AiStudentInsightError2 extends AppError {
  constructor(message = 'Erreur d\'aperçu élèves IA') {
    super(message, 'AI_STUDENT_INSIGHT_ERROR2', 500);
  }
}

export class AiClassSummaryError extends AppError {
  constructor(message = 'Erreur de résumé de classe IA') {
    super(message, 'AI_CLASS_SUMMARY_ERROR', 500);
  }
}

export class AiLessonSummaryError extends AppError {
  constructor(message = 'Erreur de résumé de leçon IA') {
    super(message, 'AI_LESSON_SUMMARY_ERROR', 500);
  }
}

export class AiAutoFeedbackError extends AppError {
  constructor(message = 'Erreur de feedback automatique IA') {
    super(message, 'AI_AUTO_FEEDBACK_ERROR', 500);
  }
}

export class AiClassroomRecommendationError extends AppError {
  constructor(message = 'Erreur de recommandation de classe IA') {
    super(message, 'AI_CLASSROOM_RECOMMENDATION_ERROR', 500);
  }
}

export class AiTeachingStrategyError extends AppError {
  constructor(message = 'Erreur de stratégie d\'enseignement IA') {
    super(message, 'AI_TEACHING_STRATEGY_ERROR', 500);
  }
}

export class AiDifferentiationError extends AppError {
  constructor(message = 'Erreur de différenciation pédagogique IA') {
    super(message, 'AI_DIFFERENTIATION_ERROR', 500);
  }
}

export class AiClassroomManagementError extends AppError {
  constructor(message = 'Erreur de gestion de classe IA') {
    super(message, 'AI_CLASSROOM_MANAGEMENT_ERROR', 500);
  }
}

export class AiParentCommunicationError extends AppError {
  constructor(message = 'Erreur de communication parent IA') {
    super(message, 'AI_PARENT_COMMUNICATION_ERROR', 500);
  }
}

export class AiProgressReportError extends AppError {
  constructor(message = 'Erreur de rapport de progression IA') {
    super(message, 'AI_PROGRESS_REPORT_ERROR', 500);
  }
}

export class AiLessonPlanningError extends AppError {
  constructor(message = 'Erreur de planification de leçon IA') {
    super(message, 'AI_LESSON_PLANNING_ERROR', 500);
  }
}

export class AiResourceRecommendationError extends AppError {
  constructor(message = 'Erreur de recommandation de ressources IA') {
    super(message, 'AI_RESOURCE_RECOMMENDATION_ERROR', 500);
  }
}

export class AiTimeManagementError extends AppError {
  constructor(message = 'Erreur de gestion du temps IA') {
    super(message, 'AI_TIME_MANAGEMENT_ERROR', 500);
  }
}

export class AiRubricApplicationError extends AppError {
  constructor(message = 'Erreur d\'application de grille IA') {
    super(message, 'AI_RUBRIC_APPLICATION_ERROR', 500);
  }
}

export class AiStudentEvaluationError extends AppError {
  constructor(message = 'Erreur d\'évaluation d\'élève IA') {
    super(message, 'AI_STUDENT_EVALUATION_ERROR', 500);
  }
}

export class AiCollaborativeLearningError extends AppError {
  constructor(message = 'Erreur d\'apprentissage collaboratif IA') {
    super(message, 'AI_COLLABORATIVE_LEARNING_ERROR', 500);
  }
}

export class AiAssessmentAnalysisError extends AppError {
  constructor(message = 'Erreur d\'analyse d\'évaluation IA') {
    super(message, 'AI_ASSESSMENT_ANALYSIS_ERROR', 500);
  }
}

export class AiInstructionalDesignError extends AppError {
  constructor(message = 'Erreur de conception pédagogique IA') {
    super(message, 'AI_INSTRUCTIONAL_DESIGN_ERROR', 500);
  }
}

export class AiPedagogicalContentError extends AppError {
  constructor(message = 'Erreur de contenu pédagogique IA') {
    super(message, 'AI_PEDAGOGICAL_CONTENT_ERROR', 500);
  }
}

export class AiClassroomInsightError extends AppError {
  constructor(message = 'Erreur d\'aperçu de classe IA') {
    super(message, 'AI_CLASSROOM_INSIGHT_ERROR', 500);
  }
}

// ==================== DOCUMENT AI (25) ====================

export class AiOCRError extends AppError {
  constructor(message = 'Erreur OCR IA') {
    super(message, 'AI_OCR_ERROR', 500);
  }
}

export class AiOCRTimeoutError extends AppError {
  constructor(message = 'Délai d\'attente OCR IA dépassé') {
    super(message, 'AI_OCR_TIMEOUT_ERROR', 504);
  }
}

export class AiOCRFormatError extends AppError {
  constructor(message = 'Format non supporté pour OCR IA') {
    super(message, 'AI_OCR_FORMAT_ERROR', 415);
  }
}

export class AiDocumentClassificationError extends AppError {
  constructor(message = 'Erreur de classification de document IA') {
    super(message, 'AI_DOCUMENT_CLASSIFICATION_ERROR', 500);
  }
}

export class AiAutoTaggingError extends AppError {
  constructor(message = 'Erreur de taggage automatique IA') {
    super(message, 'AI_AUTO_TAGGING_ERROR', 500);
  }
}

export class AiEntityExtractionError extends AppError {
  constructor(message = 'Erreur d\'extraction d\'entités IA') {
    super(message, 'AI_ENTITY_EXTRACTION_ERROR', 500);
  }
}

export class AiSummarizationError extends AppError {
  constructor(message = 'Erreur de résumé IA') {
    super(message, 'AI_SUMMARIZATION_ERROR', 500);
  }
}

export class AiSummarizationLengthError extends AppError {
  constructor(message = 'Longueur de résumé IA invalide') {
    super(message, 'AI_SUMMARIZATION_LENGTH_ERROR', 400);
  }
}

export class AiTranslationError extends AppError {
  constructor(message = 'Erreur de traduction IA') {
    super(message, 'AI_TRANSLATION_ERROR', 500);
  }
}

export class AiTranslationLanguageError extends AppError {
  constructor(message = 'Langue non supportée pour traduction IA') {
    super(message, 'AI_TRANSLATION_LANGUAGE_ERROR', 400);
  }
}

export class AiDocumentQAError extends AppError {
  constructor(message = 'Erreur de question-réponse document IA') {
    super(message, 'AI_DOCUMENT_QA_ERROR', 500);
  }
}

export class AiSemanticSearchError extends AppError {
  constructor(message = 'Erreur de recherche sémantique IA') {
    super(message, 'AI_SEMANTIC_SEARCH_ERROR', 500);
  }
}

export class AiVectorSearchError extends AppError {
  constructor(message = 'Erreur de recherche vectorielle IA') {
    super(message, 'AI_VECTOR_SEARCH_ERROR', 500);
  }
}

export class AiKnowledgeExtractionError extends AppError {
  constructor(message = 'Erreur d\'extraction de connaissances IA') {
    super(message, 'AI_KNOWLEDGE_EXTRACTION_ERROR', 500);
  }
}

export class AiDocumentComparisonError extends AppError {
  constructor(message = 'Erreur de comparaison de documents IA') {
    super(message, 'AI_DOCUMENT_COMPARISON_ERROR', 500);
  }
}

export class AiDuplicateDetectionError extends AppError {
  constructor(message = 'Erreur de détection de doublons IA') {
    super(message, 'AI_DUPLICATE_DETECTION_ERROR', 500);
  }
}

export class AiDocumentParsingError extends AppError {
  constructor(message = 'Erreur d\'analyse de document IA') {
    super(message, 'AI_DOCUMENT_PARSING_ERROR', 500);
  }
}

export class AiDocumentFormatError extends AppError {
  constructor(message = 'Format de document non supporté IA') {
    super(message, 'AI_DOCUMENT_FORMAT_ERROR', 415);
  }
}

export class AiDocumentSizeError extends AppError {
  constructor(message = 'Taille de document excessive pour IA') {
    super(message, 'AI_DOCUMENT_SIZE_ERROR', 413);
  }
}

export class AiImageAnalysisError extends AppError {
  constructor(message = 'Erreur d\'analyse d\'image IA') {
    super(message, 'AI_IMAGE_ANALYSIS_ERROR', 500);
  }
}

export class AiAudioTranscriptionError extends AppError {
  constructor(message = 'Erreur de transcription audio IA') {
    super(message, 'AI_AUDIO_TRANSCRIPTION_ERROR', 500);
  }
}

export class AiVideoAnalysisError extends AppError {
  constructor(message = 'Erreur d\'analyse vidéo IA') {
    super(message, 'AI_VIDEO_ANALYSIS_ERROR', 500);
  }
}

export class AiHandwritingRecognitionError extends AppError {
  constructor(message = 'Erreur de reconnaissance d\'écriture IA') {
    super(message, 'AI_HANDWRITING_RECOGNITION_ERROR', 500);
  }
}

export class AiBarcodeQRError extends AppError {
  constructor(message = 'Erreur de lecture de code-barres IA') {
    super(message, 'AI_BARCODE_QR_ERROR', 500);
  }
}

export class AiDocumentSigningError extends AppError {
  constructor(message = 'Erreur de signature de document IA') {
    super(message, 'AI_DOCUMENT_SIGNING_ERROR', 500);
  }
}

// ==================== KNOWLEDGE BASE (25) ====================

export class AiKnowledgeSourceError extends AppError {
  constructor(message = 'Erreur de source de connaissances IA') {
    super(message, 'AI_KNOWLEDGE_SOURCE_ERROR', 500);
  }
}

export class AiKnowledgeSourceNotFoundError extends AppError {
  constructor(message = 'Source de connaissances IA introuvable') {
    super(message, 'AI_KNOWLEDGE_SOURCE_NOT_FOUND_ERROR', 404);
  }
}

export class AiKnowledgeDocumentError extends AppError {
  constructor(message = 'Erreur de document de connaissances IA') {
    super(message, 'AI_KNOWLEDGE_DOCUMENT_ERROR', 500);
  }
}

export class AiKnowledgeDocumentNotFoundError extends AppError {
  constructor(message = 'Document de connaissances IA introuvable') {
    super(message, 'AI_KNOWLEDGE_DOCUMENT_NOT_FOUND_ERROR', 404);
  }
}

export class AiChunkingError extends AppError {
  constructor(message = 'Erreur de découpage de chunks IA') {
    super(message, 'AI_CHUNKING_ERROR', 500);
  }
}

export class AiEmbeddingError extends AppError {
  constructor(message = 'Erreur d\'embedding IA') {
    super(message, 'AI_EMBEDDING_ERROR', 500);
  }
}

export class AiEmbeddingDimensionError extends AppError {
  constructor(message = 'Dimension d\'embedding IA invalide') {
    super(message, 'AI_EMBEDDING_DIMENSION_ERROR', 400);
  }
}

export class AiEmbeddingModelError extends AppError {
  constructor(message = 'Modèle d\'embedding IA indisponible') {
    super(message, 'AI_EMBEDDING_MODEL_ERROR', 502);
  }
}

export class AiIndexingError extends AppError {
  constructor(message = 'Erreur d\'indexation IA') {
    super(message, 'AI_INDEXING_ERROR', 500);
  }
}

export class AiIndexingTimeoutError extends AppError {
  constructor(message = 'Délai d\'attente d\'indexation IA dépassé') {
    super(message, 'AI_INDEXING_TIMEOUT_ERROR', 504);
  }
}

export class AiRetrievalError extends AppError {
  constructor(message = 'Erreur de récupération IA') {
    super(message, 'AI_RETRIEVAL_ERROR', 500);
  }
}

export class AiRetrievalEmptyError extends AppError {
  constructor(message = 'Aucun résultat récupéré par IA') {
    super(message, 'AI_RETRIEVAL_EMPTY_ERROR', 404);
  }
}

export class AiRAGExecutionError extends AppError {
  constructor(message = 'Erreur d\'exécution RAG IA') {
    super(message, 'AI_RAG_EXECUTION_ERROR', 500);
  }
}

export class AiVectorStoreError extends AppError {
  constructor(message = 'Erreur de magasin de vecteurs IA') {
    super(message, 'AI_VECTOR_STORE_ERROR', 500);
  }
}

export class AiVectorStoreNotFoundError extends AppError {
  constructor(message = 'Magasin de vecteurs IA introuvable') {
    super(message, 'AI_VECTOR_STORE_NOT_FOUND_ERROR', 404);
  }
}

export class AiVectorStoreCapacityError extends AppError {
  constructor(message = 'Capacité du magasin de vecteurs IA dépassée') {
    super(message, 'AI_VECTOR_STORE_CAPACITY_ERROR', 507);
  }
}

export class AiCitationError extends AppError {
  constructor(message = 'Erreur de citation IA') {
    super(message, 'AI_CITATION_ERROR', 500);
  }
}

export class AiKnowledgePermissionError extends AppError {
  constructor(message = 'Permission de connaissances IA refusée') {
    super(message, 'AI_KNOWLEDGE_PERMISSION_ERROR', 403);
  }
}

export class AiKnowledgeVersionError extends AppError {
  constructor(message = 'Erreur de version de connaissances IA') {
    super(message, 'AI_KNOWLEDGE_VERSION_ERROR', 500);
  }
}

export class AiKnowledgeSyncError extends AppError {
  constructor(message = 'Erreur de synchronisation de connaissances IA') {
    super(message, 'AI_KNOWLEDGE_SYNC_ERROR', 500);
  }
}

export class AiKnowledgeConsolidationError extends AppError {
  constructor(message = 'Erreur de consolidation de connaissances IA') {
    super(message, 'AI_KNOWLEDGE_CONSOLIDATION_ERROR', 500);
  }
}

export class AiKnowledgeGraphError extends AppError {
  constructor(message = 'Erreur de graphe de connaissances IA') {
    super(message, 'AI_KNOWLEDGE_GRAPH_ERROR', 500);
  }
}

export class AiKnowledgeValidationError extends AppError {
  constructor(message = 'Validation de connaissances IA échouée') {
    super(message, 'AI_KNOWLEDGE_VALIDATION_ERROR', 400);
  }
}

export class AiKnowledgeDuplicateError extends AppError {
  constructor(message = 'Connaissance IA en double détectée') {
    super(message, 'AI_KNOWLEDGE_DUPLICATE_ERROR', 409);
  }
}

export class AiKnowledgeStaleError extends AppError {
  constructor(message = 'Connaissance IA obsolète') {
    super(message, 'AI_KNOWLEDGE_STALE_ERROR', 410);
  }
}

// ==================== SAFETY (25) ====================

export class AiModerationError extends AppError {
  constructor(message = 'Erreur de modération IA') {
    super(message, 'AI_MODERATION_ERROR', 500);
  }
}

export class AiModerationBlockedError extends AppError {
  constructor(message = 'Contenu bloqué par la modération IA') {
    super(message, 'AI_MODERATION_BLOCKED_ERROR', 403);
  }
}

export class AiContentFilterError extends AppError {
  constructor(message = 'Erreur de filtre de contenu IA') {
    super(message, 'AI_CONTENT_FILTER_ERROR', 500);
  }
}

export class AiPIIDetectionError extends AppError {
  constructor(message = 'Erreur de détection PII IA') {
    super(message, 'AI_PII_DETECTION_ERROR', 500);
  }
}

export class AiPIIFoundError extends AppError {
  constructor(message = 'PII détecté dans le contenu IA') {
    super(message, 'AI_PII_FOUND_ERROR', 400);
  }
}

export class AiBiasDetectionError extends AppError {
  constructor(message = 'Erreur de détection de biais IA') {
    super(message, 'AI_BIAS_DETECTION_ERROR', 500);
  }
}

export class AiBiasDetectedError extends AppError {
  constructor(message = 'Biais détecté dans le contenu IA') {
    super(message, 'AI_BIAS_DETECTED_ERROR', 400);
  }
}

export class AiHallucinationError extends AppError {
  constructor(message = 'Erreur de détection d\'hallucination IA') {
    super(message, 'AI_HALLUCINATION_ERROR', 500);
  }
}

export class AiHallucinationDetectedError extends AppError {
  constructor(message = 'Hallucination détectée dans la réponse IA') {
    super(message, 'AI_HALLUCINATION_DETECTED_ERROR', 400);
  }
}

export class AiInjectionError extends AppError {
  constructor(message = 'Injection de prompt IA détectée') {
    super(message, 'AI_INJECTION_ERROR', 400);
  }
}

export class AiInjectionBlockedError extends AppError {
  constructor(message = 'Attaque d\'injection IA bloquée') {
    super(message, 'AI_INJECTION_BLOCKED_ERROR', 403);
  }
}

export class AiOutputValidationError extends AppError {
  constructor(message = 'Validation de sortie IA échouée') {
    super(message, 'AI_OUTPUT_VALIDATION_ERROR', 400);
  }
}

export class AiSafetyPolicyError extends AppError {
  constructor(message = 'Violation de politique de sécurité IA') {
    super(message, 'AI_SAFETY_POLICY_ERROR', 403);
  }
}

export class AiSafetyViolationError extends AppError {
  constructor(message = 'Violation de sécurité IA détectée') {
    super(message, 'AI_SAFETY_VIOLATION_ERROR', 403);
  }
}

export class AiComplianceError extends AppError {
  constructor(message = 'Non-conformité IA détectée') {
    super(message, 'AI_COMPLIANCE_ERROR', 403);
  }
}

export class AiComplianceCheckError extends AppError {
  constructor(message = 'Erreur de vérification de conformité IA') {
    super(message, 'AI_COMPLIANCE_CHECK_ERROR', 500);
  }
}

export class AiAuditError extends AppError {
  constructor(message = 'Erreur d\'audit IA') {
    super(message, 'AI_AUDIT_ERROR', 500);
  }
}

export class AiAuditLogError extends AppError {
  constructor(message = 'Erreur d\'enregistrement d\'audit IA') {
    super(message, 'AI_AUDIT_LOG_ERROR', 500);
  }
}

export class AiSafetyDashboardError extends AppError {
  constructor(message = 'Erreur de tableau de bord de sécurité IA') {
    super(message, 'AI_SAFETY_DASHBOARD_ERROR', 500);
  }
}

export class AiSafetyIncidentError extends AppError {
  constructor(message = 'Erreur d\'incident de sécurité IA') {
    super(message, 'AI_SAFETY_INCIDENT_ERROR', 500);
  }
}

export class AiPolicyConfigError extends AppError {
  constructor(message = 'Configuration de politique IA invalide') {
    super(message, 'AI_POLICY_CONFIG_ERROR', 400);
  }
}

export class AiContentQuarantineError extends AppError {
  constructor(message = 'Erreur de quarantaine de contenu IA') {
    super(message, 'AI_CONTENT_QUARANTINE_ERROR', 500);
  }
}

export class AiSafetyReportError extends AppError {
  constructor(message = 'Erreur de rapport de sécurité IA') {
    super(message, 'AI_SAFETY_REPORT_ERROR', 500);
  }
}

export class AiTrustScoreError extends AppError {
  constructor(message = 'Erreur de score de confiance IA') {
    super(message, 'AI_TRUST_SCORE_ERROR', 500);
  }
}

export class AiExplainabilityError extends AppError {
  constructor(message = 'Erreur d\'explicabilité IA') {
    super(message, 'AI_EXPLAINABILITY_ERROR', 500);
  }
}

// ==================== MISSING AI ERRORS ====================

export class AiModelError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiUsageError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiPerformanceError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiAccessError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiAgentError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiBillingError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiCacheError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiConfigError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiConversationError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiDeploymentError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiEvaluationError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiIntegrationError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiLoggingError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiMonitoringError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiOptimizationError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiPromptError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiSafetyError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiScalingError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiSecurityError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiSessionError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiTrainingError extends AppError {
  constructor(code: string, message: string) {
    super(message, `AI_${code}`, 500);
  }
}

export class AiAlertNotFoundError extends AppError {
  constructor(message = 'Alerte IA introuvable') {
    super(message, 'AI_ALERT_NOT_FOUND_ERROR', 404);
  }
}

export class AiAnalyticsNotFoundError extends AppError {
  constructor(message = 'Analytique IA introuvable') {
    super(message, 'AI_ANALYTICS_NOT_FOUND_ERROR', 404);
  }
}

export class AiApiKeyNotFoundError extends AppError {
  constructor(message = 'Clé API IA introuvable') {
    super(message, 'AI_API_KEY_NOT_FOUND_ERROR', 404);
  }
}

export class AiAuditNotFoundError extends AppError {
  constructor(message = 'Audit IA introuvable') {
    super(message, 'AI_AUDIT_NOT_FOUND_ERROR', 404);
  }
}

export class AiAuthorizationNotFoundError extends AppError {
  constructor(message = 'Autorisation IA introuvable') {
    super(message, 'AI_AUTHORIZATION_NOT_FOUND_ERROR', 404);
  }
}

export class AiAutomationNotFoundError extends AppError {
  constructor(message = 'Automatisation IA introuvable') {
    super(message, 'AI_AUTOMATION_NOT_FOUND_ERROR', 404);
  }
}

export class AiCacheNotFoundError extends AppError {
  constructor(message = 'Cache IA introuvable') {
    super(message, 'AI_CACHE_NOT_FOUND_ERROR', 404);
  }
}

export class AiComplianceNotFoundError extends AppError {
  constructor(message = 'Conformité IA introuvable') {
    super(message, 'AI_COMPLIANCE_NOT_FOUND_ERROR', 404);
  }
}

export class AiContextNotFoundError extends AppError {
  constructor(message = 'Contexte IA introuvable') {
    super(message, 'AI_CONTEXT_NOT_FOUND_ERROR', 404);
  }
}

export class AiCurriculumNotFoundError extends AppError {
  constructor(message = 'Curriculum IA introuvable') {
    super(message, 'AI_CURRICULUM_NOT_FOUND_ERROR', 404);
  }
}

export class AiDashboardNotFoundError extends AppError {
  constructor(message = 'Tableau de bord IA introuvable') {
    super(message, 'AI_DASHBOARD_NOT_FOUND_ERROR', 404);
  }
}

export class AiDocumentProcessingNotFoundError extends AppError {
  constructor(message = 'Traitement de document IA introuvable') {
    super(message, 'AI_DOCUMENT_PROCESSING_NOT_FOUND_ERROR', 404);
  }
}

export class AiEncryptionNotFoundError extends AppError {
  constructor(message = 'Chiffrement IA introuvable') {
    super(message, 'AI_ENCRYPTION_NOT_FOUND_ERROR', 404);
  }
}

export class AiEthicsNotFoundError extends AppError {
  constructor(message = 'Éthique IA introuvable') {
    super(message, 'AI_ETHICS_NOT_FOUND_ERROR', 404);
  }
}

export class AiHealthCheckNotFoundError extends AppError {
  constructor(message = 'Vérification de santé IA introuvable') {
    super(message, 'AI_HEALTH_CHECK_NOT_FOUND_ERROR', 404);
  }
}

export class AiInsightNotFoundError extends AppError {
  constructor(message = 'Insight IA introuvable') {
    super(message, 'AI_INSIGHT_NOT_FOUND_ERROR', 404);
  }
}

export class AiIntegrationNotFoundError extends AppError {
  constructor(message = 'Intégration IA introuvable') {
    super(message, 'AI_INTEGRATION_NOT_FOUND_ERROR', 404);
  }
}

export class AiLoadBalancerNotFoundError extends AppError {
  constructor(message = 'Équilibreur de charge IA introuvable') {
    super(message, 'AI_LOAD_BALANCER_NOT_FOUND_ERROR', 404);
  }
}

export class AiLogNotFoundError extends AppError {
  constructor(message = 'Journal IA introuvable') {
    super(message, 'AI_LOG_NOT_FOUND_ERROR', 404);
  }
}

export class AiMessageNotFoundError extends AppError {
  constructor(message = 'Message IA introuvable') {
    super(message, 'AI_MESSAGE_NOT_FOUND_ERROR', 404);
  }
}

export class AiModerationNotFoundError extends AppError {
  constructor(message = 'Modération IA introuvable') {
    super(message, 'AI_MODERATION_NOT_FOUND_ERROR', 404);
  }
}

export class AiMonitorNotFoundError extends AppError {
  constructor(message = 'Moniteur IA introuvable') {
    super(message, 'AI_MONITOR_NOT_FOUND_ERROR', 404);
  }
}

export class AiNotificationNotFoundError extends AppError {
  constructor(message = 'Notification IA introuvable') {
    super(message, 'AI_NOTIFICATION_NOT_FOUND_ERROR', 404);
  }
}

export class AiParentAssistantNotFoundError extends AppError {
  constructor(message = 'Assistant parent IA introuvable') {
    super(message, 'AI_PARENT_ASSISTANT_NOT_FOUND_ERROR', 404);
  }
}

export class AiPredictionNotFoundError extends AppError {
  constructor(message = 'Prédiction IA introuvable') {
    super(message, 'AI_PREDICTION_NOT_FOUND_ERROR', 404);
  }
}

export class AiPreferenceNotFoundError extends AppError {
  constructor(message = 'Préférence IA introuvable') {
    super(message, 'AI_PREFERENCE_NOT_FOUND_ERROR', 404);
  }
}

export class AiPromptTemplateNotFoundError extends AppError {
  constructor(message = 'Modèle de prompt IA introuvable') {
    super(message, 'AI_PROMPT_TEMPLATE_NOT_FOUND_ERROR', 404);
  }
}

export class AiQualityAssuranceNotFoundError extends AppError {
  constructor(message = 'Assurance qualité IA introuvable') {
    super(message, 'AI_QUALITY_ASSURANCE_NOT_FOUND_ERROR', 404);
  }
}

export class AiRateLimitNotFoundError extends AppError {
  constructor(message = 'Limite de débit IA introuvable') {
    super(message, 'AI_RATE_LIMIT_NOT_FOUND_ERROR', 404);
  }
}

export class AiRecommendationNotFoundError extends AppError {
  constructor(message = 'Recommandation IA introuvable') {
    super(message, 'AI_RECOMMENDATION_NOT_FOUND_ERROR', 404);
  }
}

export class AiSafetyNotFoundError extends AppError {
  constructor(message = 'Sécurité IA introuvable') {
    super(message, 'AI_SAFETY_NOT_FOUND_ERROR', 404);
  }
}

export class AiScalingNotFoundError extends AppError {
  constructor(message = 'Mise à l\'échelle IA introuvable') {
    super(message, 'AI_SCALING_NOT_FOUND_ERROR', 404);
  }
}

export class AiScheduleNotFoundError extends AppError {
  constructor(message = 'Planification IA introuvable') {
    super(message, 'AI_SCHEDULE_NOT_FOUND_ERROR', 404);
  }
}

export class AiSecurityNotFoundError extends AppError {
  constructor(message = 'Sécurité IA introuvable') {
    super(message, 'AI_SECURITY_NOT_FOUND_ERROR', 404);
  }
}

export class AiStorageNotFoundError extends AppError {
  constructor(message = 'Stockage IA introuvable') {
    super(message, 'AI_STORAGE_NOT_FOUND_ERROR', 404);
  }
}

export class AiStudentAssistantNotFoundError extends AppError {
  constructor(message = 'Assistant étudiant IA introuvable') {
    super(message, 'AI_STUDENT_ASSISTANT_NOT_FOUND_ERROR', 404);
  }
}

export class AiTeacherAssistantNotFoundError extends AppError {
  constructor(message = 'Assistant enseignant IA introuvable') {
    super(message, 'AI_TEACHER_ASSISTANT_NOT_FOUND_ERROR', 404);
  }
}

export class AiVisionProcessingNotFoundError extends AppError {
  constructor(message = 'Traitement visuel IA introuvable') {
    super(message, 'AI_VISION_PROCESSING_NOT_FOUND_ERROR', 404);
  }
}

export class AiVoiceProcessingNotFoundError extends AppError {
  constructor(message = 'Traitement vocal IA introuvable') {
    super(message, 'AI_VOICE_PROCESSING_NOT_FOUND_ERROR', 404);
  }
}

export class AiWorkflowNotFoundError extends AppError {
  constructor(message = 'Flux de travail IA introuvable') {
    super(message, 'AI_WORKFLOW_NOT_FOUND_ERROR', 404);
  }
}

export class AiAdminAssistantNotFoundError extends AppError {
  constructor(message = 'Assistant administrateur IA introuvable') {
    super(message, 'AI_ADMIN_ASSISTANT_NOT_FOUND_ERROR', 404);
  }
}

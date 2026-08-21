import { AppError } from './AppError';

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 2.7 — Learning Experience Platform (LXP) Errors
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Course Management Errors ──────────────────────────────────────────────

export class LxpCourseNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Cours (${identifier}) introuvable` : 'Cours introuvable';
    super(msg, 'LXP_COURSE_NOT_FOUND', 404);
  }
}

export class LxpCourseCreateError extends AppError {
  constructor(message = 'Impossible de créer le cours') {
    super(message, 'LXP_COURSE_CREATE_ERROR', 500);
  }
}

export class LxpCourseUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le cours') {
    super(message, 'LXP_COURSE_UPDATE_ERROR', 500);
  }
}

export class LxpCourseDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le cours') {
    super(message, 'LXP_COURSE_DELETE_ERROR', 500);
  }
}

export class LxpCoursePublishError extends AppError {
  constructor(message = 'Impossible de publier le cours') {
    super(message, 'LXP_COURSE_PUBLISH_ERROR', 500);
  }
}

export class LxpCourseUnpublishError extends AppError {
  constructor(message = 'Impossible de dépublier le cours') {
    super(message, 'LXP_COURSE_UNPUBLISH_ERROR', 500);
  }
}

export class LxpCourseArchiveError extends AppError {
  constructor(message = 'Impossible d\'archiver le cours') {
    super(message, 'LXP_COURSE_ARCHIVE_ERROR', 500);
  }
}

export class LxpCourseRestoreError extends AppError {
  constructor(message = 'Impossible de restaurer le cours') {
    super(message, 'LXP_COURSE_RESTORE_ERROR', 500);
  }
}

export class LxpCourseDuplicateError extends AppError {
  constructor(message = 'Impossible de dupliquer le cours') {
    super(message, 'LXP_COURSE_DUPLICATE_ERROR', 500);
  }
}

export class LxpCourseTemplateError extends AppError {
  constructor(message = 'Impossible d\'appliquer le modèle de cours') {
    super(message, 'LXP_COURSE_TEMPLATE_ERROR', 500);
  }
}

export class LxpCourseWorkflowError extends AppError {
  constructor(message = 'Erreur dans le flux de travail du cours') {
    super(message, 'LXP_COURSE_WORKFLOW_ERROR', 500);
  }
}

export class LxpCourseVersionError extends AppError {
  constructor(message = 'Impossible de gérer la version du cours') {
    super(message, 'LXP_COURSE_VERSION_ERROR', 500);
  }
}

export class LxpCourseEnrollError extends AppError {
  constructor(message = 'Impossible de s\'inscrire au cours') {
    super(message, 'LXP_COURSE_ENROLL_ERROR', 400);
  }
}

export class LxpCourseUnenrollError extends AppError {
  constructor(message = 'Impossible de se désinscrire du cours') {
    super(message, 'LXP_COURSE_UNENROLL_ERROR', 400);
  }
}

export class LxpCourseCompleteError extends AppError {
  constructor(message = 'Impossible de marquer le cours comme terminé') {
    super(message, 'LXP_COURSE_COMPLETE_ERROR', 500);
  }
}

export class LxpCourseCategoryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Catégorie de cours (${identifier}) introuvable` : 'Catégorie de cours introuvable';
    super(msg, 'LXP_COURSE_CATEGORY_NOT_FOUND', 404);
  }
}

export class LxpCourseCategoryCreateError extends AppError {
  constructor(message = 'Impossible de créer la catégorie de cours') {
    super(message, 'LXP_COURSE_CATEGORY_CREATE_ERROR', 500);
  }
}

export class LxpCourseCategoryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la catégorie de cours') {
    super(message, 'LXP_COURSE_CATEGORY_UPDATE_ERROR', 500);
  }
}

export class LxpCourseCategoryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la catégorie de cours') {
    super(message, 'LXP_COURSE_CATEGORY_DELETE_ERROR', 500);
  }
}

export class LxpModuleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Module (${identifier}) introuvable` : 'Module introuvable';
    super(msg, 'LXP_MODULE_NOT_FOUND', 404);
  }
}

export class LxpModuleCreateError extends AppError {
  constructor(message = 'Impossible de créer le module') {
    super(message, 'LXP_MODULE_CREATE_ERROR', 500);
  }
}

export class LxpModuleUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le module') {
    super(message, 'LXP_MODULE_UPDATE_ERROR', 500);
  }
}

export class LxpModuleDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le module') {
    super(message, 'LXP_MODULE_DELETE_ERROR', 500);
  }
}

export class LxpLessonNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Leçon (${identifier}) introuvable` : 'Leçon introuvable';
    super(msg, 'LXP_LESSON_NOT_FOUND', 404);
  }
}

export class LxpLessonCreateError extends AppError {
  constructor(message = 'Impossible de créer la leçon') {
    super(message, 'LXP_LESSON_CREATE_ERROR', 500);
  }
}

export class LxpLessonUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la leçon') {
    super(message, 'LXP_LESSON_UPDATE_ERROR', 500);
  }
}

export class LxpLessonDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la leçon') {
    super(message, 'LXP_LESSON_DELETE_ERROR', 500);
  }
}

export class LxpChapterNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Chapitre (${identifier}) introuvable` : 'Chapitre introuvable';
    super(msg, 'LXP_CHAPTER_NOT_FOUND', 404);
  }
}

export class LxpChapterCreateError extends AppError {
  constructor(message = 'Impossible de créer le chapitre') {
    super(message, 'LXP_CHAPTER_CREATE_ERROR', 500);
  }
}

export class LxpChapterUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le chapitre') {
    super(message, 'LXP_CHAPTER_UPDATE_ERROR', 500);
  }
}

export class LxpChapterDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le chapitre') {
    super(message, 'LXP_CHAPTER_DELETE_ERROR', 500);
  }
}

export class LxpUnitNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Unité (${identifier}) introuvable` : 'Unité introuvable';
    super(msg, 'LXP_UNIT_NOT_FOUND', 404);
  }
}

export class LxpUnitCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'unité') {
    super(message, 'LXP_UNIT_CREATE_ERROR', 500);
  }
}

export class LxpUnitUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'unité') {
    super(message, 'LXP_UNIT_UPDATE_ERROR', 500);
  }
}

export class LxpUnitDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'unité') {
    super(message, 'LXP_UNIT_DELETE_ERROR', 500);
  }
}

export class LxpTopicNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Sujet (${identifier}) introuvable` : 'Sujet introuvable';
    super(msg, 'LXP_TOPIC_NOT_FOUND', 404);
  }
}

export class LxpTopicCreateError extends AppError {
  constructor(message = 'Impossible de créer le sujet') {
    super(message, 'LXP_TOPIC_CREATE_ERROR', 500);
  }
}

export class LxpTopicUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le sujet') {
    super(message, 'LXP_TOPIC_UPDATE_ERROR', 500);
  }
}

export class LxpTopicDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le sujet') {
    super(message, 'LXP_TOPIC_DELETE_ERROR', 500);
  }
}

export class LxpCoursePrerequisiteError extends AppError {
  constructor(message = 'Les prérequis du cours ne sont pas satisfaits') {
    super(message, 'LXP_COURSE_PREREQUISITE_ERROR', 400);
  }
}

export class LxpCourseAnalyticsError extends AppError {
  constructor(message = 'Impossible de récupérer les analyses du cours') {
    super(message, 'LXP_COURSE_ANALYTICS_ERROR', 500);
  }
}

export class LxpCourseExportError extends AppError {
  constructor(message = 'Impossible d\'exporter le cours') {
    super(message, 'LXP_COURSE_EXPORT_ERROR', 500);
  }
}

export class LxpCourseImportError extends AppError {
  constructor(message = 'Impossible d\'importer le cours') {
    super(message, 'LXP_COURSE_IMPORT_ERROR', 500);
  }
}

// ─── Digital Content Errors ────────────────────────────────────────────────

export class LxpContentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Contenu (${identifier}) introuvable` : 'Contenu introuvable';
    super(msg, 'LXP_CONTENT_NOT_FOUND', 404);
  }
}

export class LxpContentCreateError extends AppError {
  constructor(message = 'Impossible de créer le contenu') {
    super(message, 'LXP_CONTENT_CREATE_ERROR', 500);
  }
}

export class LxpContentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le contenu') {
    super(message, 'LXP_CONTENT_UPDATE_ERROR', 500);
  }
}

export class LxpContentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le contenu') {
    super(message, 'LXP_CONTENT_DELETE_ERROR', 500);
  }
}

export class LxpContentUploadError extends AppError {
  constructor(message = 'Impossible de télécharger le contenu') {
    super(message, 'LXP_CONTENT_UPLOAD_ERROR', 500);
  }
}

export class LxpContentDownloadError extends AppError {
  constructor(message = 'Impossible de télécharger le contenu') {
    super(message, 'LXP_CONTENT_DOWNLOAD_ERROR', 500);
  }
}

export class LxpContentStreamError extends AppError {
  constructor(message = 'Impossible de diffuser le contenu en continu') {
    super(message, 'LXP_CONTENT_STREAM_ERROR', 500);
  }
}

export class LxpContentOfflineError extends AppError {
  constructor(message = 'Contenu indisponible hors ligne') {
    super(message, 'LXP_CONTENT_OFFLINE_ERROR', 400);
  }
}

export class LxpContentVersionError extends AppError {
  constructor(message = 'Erreur de version du contenu') {
    super(message, 'LXP_CONTENT_VERSION_ERROR', 500);
  }
}

export class LxpContentMetadataError extends AppError {
  constructor(message = 'Impossible de récupérer les métadonnées du contenu') {
    super(message, 'LXP_CONTENT_METADATA_ERROR', 500);
  }
}

export class LxpVideoNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Vidéo (${identifier}) introuvable` : 'Vidéo introuvable';
    super(msg, 'LXP_VIDEO_NOT_FOUND', 404);
  }
}

export class LxpVideoUploadError extends AppError {
  constructor(message = 'Impossible de télécharger la vidéo') {
    super(message, 'LXP_VIDEO_UPLOAD_ERROR', 500);
  }
}

export class LxpVideoStreamingError extends AppError {
  constructor(message = 'Impossible de diffuser la vidéo en continu') {
    super(message, 'LXP_VIDEO_STREAMING_ERROR', 500);
  }
}

export class LxpVideoTranscodeError extends AppError {
  constructor(message = 'Impossible de transcoder la vidéo') {
    super(message, 'LXP_VIDEO_TRANSCODE_ERROR', 500);
  }
}

export class LxpAudioNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audio (${identifier}) introuvable` : 'Audio introuvable';
    super(msg, 'LXP_AUDIO_NOT_FOUND', 404);
  }
}

export class LxpAudioUploadError extends AppError {
  constructor(message = 'Impossible de télécharger l\'audio') {
    super(message, 'LXP_AUDIO_UPLOAD_ERROR', 500);
  }
}

export class LxpAudioStreamingError extends AppError {
  constructor(message = 'Impossible de diffuser l\'audio en continu') {
    super(message, 'LXP_AUDIO_STREAMING_ERROR', 500);
  }
}

export class LxpPDFNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `PDF (${identifier}) introuvable` : 'PDF introuvable';
    super(msg, 'LXP_PDF_NOT_FOUND', 404);
  }
}

export class LxpPDFUploadError extends AppError {
  constructor(message = 'Impossible de télécharger le PDF') {
    super(message, 'LXP_PDF_UPLOAD_ERROR', 500);
  }
}

export class LxpPDFRenderError extends AppError {
  constructor(message = 'Impossible de restituer le PDF') {
    super(message, 'LXP_PDF_RENDER_ERROR', 500);
  }
}

export class LxpSCORMNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `SCORM (${identifier}) introuvable` : 'SCORM introuvable';
    super(msg, 'LXP_SCORM_NOT_FOUND', 404);
  }
}

export class LxpSCORMImportError extends AppError {
  constructor(message = 'Impossible d\'importer le package SCORM') {
    super(message, 'LXP_SCORM_IMPORT_ERROR', 500);
  }
}

export class LxpSCORMExportError extends AppError {
  constructor(message = 'Impossible d\'exporter le package SCORM') {
    super(message, 'LXP_SCORM_EXPORT_ERROR', 500);
  }
}

export class LxpXAPINotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Statement xAPI (${identifier}) introuvable` : 'Statement xAPI introuvable';
    super(msg, 'LXP_XAPI_NOT_FOUND', 404);
  }
}

export class LxpXAPIStatementError extends AppError {
  constructor(message = 'Impossible de traiter le statement xAPI') {
    super(message, 'LXP_XAPI_STATEMENT_ERROR', 500);
  }
}

export class LxpH5PNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Contenu H5P (${identifier}) introuvable` : 'Contenu H5P introuvable';
    super(msg, 'LXP_H5P_NOT_FOUND', 404);
  }
}

export class LxpH5PImportError extends AppError {
  constructor(message = 'Impossible d\'importer le contenu H5P') {
    super(message, 'LXP_H5P_IMPORT_ERROR', 500);
  }
}

export class LxpEPUBNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `EPUB (${identifier}) introuvable` : 'EPUB introuvable';
    super(msg, 'LXP_EPUB_NOT_FOUND', 404);
  }
}

export class LxpEPUBRenderError extends AppError {
  constructor(message = 'Impossible de restituer l\'EPUB') {
    super(message, 'LXP_EPUB_RENDER_ERROR', 500);
  }
}

export class LxpZIPNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Archive ZIP (${identifier}) introuvable` : 'Archive ZIP introuvable';
    super(msg, 'LXP_ZIP_NOT_FOUND', 404);
  }
}

export class LxpZIPExtractError extends AppError {
  constructor(message = 'Impossible d\'extraire l\'archive ZIP') {
    super(message, 'LXP_ZIP_EXTRACT_ERROR', 500);
  }
}

export class LxpContentModerationError extends AppError {
  constructor(message = 'Erreur lors de la modération du contenu') {
    super(message, 'LXP_CONTENT_MODERATION_ERROR', 500);
  }
}

export class LxpContentTagError extends AppError {
  constructor(message = 'Impossible de taguer le contenu') {
    super(message, 'LXP_CONTENT_TAG_ERROR', 500);
  }
}

export class LxpContentSearchError extends AppError {
  constructor(message = 'Impossible de rechercher le contenu') {
    super(message, 'LXP_CONTENT_SEARCH_ERROR', 500);
  }
}

export class LxpContentLicenseError extends AppError {
  constructor(message = 'Licence du contenu non valide') {
    super(message, 'LXP_CONTENT_LICENSE_ERROR', 403);
  }
}

export class LxpContentRightsError extends AppError {
  constructor(message = 'Vous n\'avez pas les droits d\'accès à ce contenu') {
    super(message, 'LXP_CONTENT_RIGHTS_ERROR', 403);
  }
}

// ─── Learning Paths Errors ─────────────────────────────────────────────────

export class LxpPathNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Parcours (${identifier}) introuvable` : 'Parcours introuvable';
    super(msg, 'LXP_PATH_NOT_FOUND', 404);
  }
}

export class LxpPathCreateError extends AppError {
  constructor(message = 'Impossible de créer le parcours') {
    super(message, 'LXP_PATH_CREATE_ERROR', 500);
  }
}

export class LxpPathUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le parcours') {
    super(message, 'LXP_PATH_UPDATE_ERROR', 500);
  }
}

export class LxpPathDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le parcours') {
    super(message, 'LXP_PATH_DELETE_ERROR', 500);
  }
}

export class LxpPathEnrollError extends AppError {
  constructor(message = 'Impossible de s\'inscrire au parcours') {
    super(message, 'LXP_PATH_ENROLL_ERROR', 400);
  }
}

export class LxpPathCompleteError extends AppError {
  constructor(message = 'Impossible de marquer le parcours comme terminé') {
    super(message, 'LXP_PATH_COMPLETE_ERROR', 500);
  }
}

export class LxpPathProgressError extends AppError {
  constructor(message = 'Impossible de récupérer la progression du parcours') {
    super(message, 'LXP_PATH_PROGRESS_ERROR', 500);
  }
}

export class LxpPathPrerequisiteError extends AppError {
  constructor(message = 'Les prérequis du parcours ne sont pas satisfaits') {
    super(message, 'LXP_PATH_PREREQUISITE_ERROR', 400);
  }
}

export class LxpAdaptivePathError extends AppError {
  constructor(message = 'Impossible de générer le parcours adaptatif') {
    super(message, 'LXP_ADAPTIVE_PATH_ERROR', 500);
  }
}

export class LxpPersonalizedPathError extends AppError {
  constructor(message = 'Impossible de personnaliser le parcours') {
    super(message, 'LXP_PERSONALIZED_PATH_ERROR', 500);
  }
}

export class LxpCompetencyPathError extends AppError {
  constructor(message = 'Impossible de créer le parcours par compétence') {
    super(message, 'LXP_COMPETENCY_PATH_ERROR', 500);
  }
}

export class LxpCertificationPathError extends AppError {
  constructor(message = 'Impossible de créer le parcours de certification') {
    super(message, 'LXP_CERTIFICATION_PATH_ERROR', 500);
  }
}

export class LxpAIRecommendedPathError extends AppError {
  constructor(message = 'Impossible de générer le parcours recommandé par IA') {
    super(message, 'LXP_AI_RECOMMENDED_PATH_ERROR', 500);
  }
}

export class LxpPathDuplicateError extends AppError {
  constructor(message = 'Impossible de dupliquer le parcours') {
    super(message, 'LXP_PATH_DUPLICATE_ERROR', 500);
  }
}

export class LxpPathTemplateError extends AppError {
  constructor(message = 'Impossible d\'appliquer le modèle de parcours') {
    super(message, 'LXP_PATH_TEMPLATE_ERROR', 500);
  }
}

export class LxpPathAnalyticsError extends AppError {
  constructor(message = 'Impossible de récupérer les analyses du parcours') {
    super(message, 'LXP_PATH_ANALYTICS_ERROR', 500);
  }
}

export class LxpPathExportError extends AppError {
  constructor(message = 'Impossible d\'exporter le parcours') {
    super(message, 'LXP_PATH_EXPORT_ERROR', 500);
  }
}

export class LxpPathImportError extends AppError {
  constructor(message = 'Impossible d\'importer le parcours') {
    super(message, 'LXP_PATH_IMPORT_ERROR', 500);
  }
}

export class LxpPathVersionError extends AppError {
  constructor(message = 'Erreur de version du parcours') {
    super(message, 'LXP_PATH_VERSION_ERROR', 500);
  }
}

export class LxpPathPublishError extends AppError {
  constructor(message = 'Impossible de publier le parcours') {
    super(message, 'LXP_PATH_PUBLISH_ERROR', 500);
  }
}

export class LxpPathArchiveError extends AppError {
  constructor(message = 'Impossible d\'archiver le parcours') {
    super(message, 'LXP_PATH_ARCHIVE_ERROR', 500);
  }
}

export class LxpPathRestoreError extends AppError {
  constructor(message = 'Impossible de restaurer le parcours') {
    super(message, 'LXP_PATH_RESTORE_ERROR', 500);
  }
}

export class LxpPathShareError extends AppError {
  constructor(message = 'Impossible de partager le parcours') {
    super(message, 'LXP_PATH_SHARE_ERROR', 500);
  }
}

export class LxpPathBookmarkError extends AppError {
  constructor(message = 'Impossible d\'ajouter le parcours aux favoris') {
    super(message, 'LXP_PATH_BOOKMARK_ERROR', 500);
  }
}

// ─── Assignments Errors ────────────────────────────────────────────────────

export class LxpAssignmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Devoir (${identifier}) introuvable` : 'Devoir introuvable';
    super(msg, 'LXP_ASSIGNMENT_NOT_FOUND', 404);
  }
}

export class LxpAssignmentCreateError extends AppError {
  constructor(message = 'Impossible de créer le devoir') {
    super(message, 'LXP_ASSIGNMENT_CREATE_ERROR', 500);
  }
}

export class LxpAssignmentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le devoir') {
    super(message, 'LXP_ASSIGNMENT_UPDATE_ERROR', 500);
  }
}

export class LxpAssignmentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le devoir') {
    super(message, 'LXP_ASSIGNMENT_DELETE_ERROR', 500);
  }
}

export class LxpAssignmentPublishError extends AppError {
  constructor(message = 'Impossible de publier le devoir') {
    super(message, 'LXP_ASSIGNMENT_PUBLISH_ERROR', 500);
  }
}

export class LxpAssignmentSubmitError extends AppError {
  constructor(message = 'Impossible de soumettre le devoir') {
    super(message, 'LXP_ASSIGNMENT_SUBMIT_ERROR', 500);
  }
}

export class LxpAssignmentGradeError extends AppError {
  constructor(message = 'Impossible de noter le devoir') {
    super(message, 'LXP_ASSIGNMENT_GRADE_ERROR', 500);
  }
}

export class LxpAssignmentFeedbackError extends AppError {
  constructor(message = 'Impossible d\'ajouter un commentaire au devoir') {
    super(message, 'LXP_ASSIGNMENT_FEEDBACK_ERROR', 500);
  }
}

export class LxpHomeworkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Exercice à la maison (${identifier}) introuvable` : 'Exercice à la maison introuvable';
    super(msg, 'LXP_HOMEWORK_NOT_FOUND', 404);
  }
}

export class LxpProjectNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Projet (${identifier}) introuvable` : 'Projet introuvable';
    super(msg, 'LXP_PROJECT_NOT_FOUND', 404);
  }
}

export class LxpCaseStudyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Étude de cas (${identifier}) introuvable` : 'Étude de cas introuvable';
    super(msg, 'LXP_CASE_STUDY_NOT_FOUND', 404);
  }
}

export class LxpLabWorkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Travaux pratiques (${identifier}) introuvable` : 'Travaux pratiques introuvable';
    super(msg, 'LXP_LAB_WORK_NOT_FOUND', 404);
  }
}

export class LxpPortfolioNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Portfolio (${identifier}) introuvable` : 'Portfolio introuvable';
    super(msg, 'LXP_PORTFOLIO_NOT_FOUND', 404);
  }
}

export class LxpRubricNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Grille d\'évaluation (${identifier}) introuvable` : 'Grille d\'évaluation introuvable';
    super(msg, 'LXP_RUBRIC_NOT_FOUND', 404);
  }
}

export class LxpRubricCreateError extends AppError {
  constructor(message = 'Impossible de créer la grille d\'évaluation') {
    super(message, 'LXP_RUBRIC_CREATE_ERROR', 500);
  }
}

export class LxpRubricUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la grille d\'évaluation') {
    super(message, 'LXP_RUBRIC_UPDATE_ERROR', 500);
  }
}

export class LxpRubricCriterionError extends AppError {
  constructor(message = 'Erreur dans le critère d\'évaluation') {
    super(message, 'LXP_RUBRIC_CRITERION_ERROR', 400);
  }
}

export class LxpPeerReviewNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Évaluation par les pairs (${identifier}) introuvable` : 'Évaluation par les pairs introuvable';
    super(msg, 'LXP_PEER_REVIEW_NOT_FOUND', 404);
  }
}

export class LxpPeerReviewCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'évaluation par les pairs') {
    super(message, 'LXP_PEER_REVIEW_CREATE_ERROR', 500);
  }
}

export class LxpPeerReviewCompleteError extends AppError {
  constructor(message = 'Impossible de finaliser l\'évaluation par les pairs') {
    super(message, 'LXP_PEER_REVIEW_COMPLETE_ERROR', 500);
  }
}

export class LxpGroupAssignmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Devoir de groupe (${identifier}) introuvable` : 'Devoir de groupe introuvable';
    super(msg, 'LXP_GROUP_ASSIGNMENT_NOT_FOUND', 404);
  }
}

export class LxpGroupAssignmentCreateError extends AppError {
  constructor(message = 'Impossible de créer le devoir de groupe') {
    super(message, 'LXP_GROUP_ASSIGNMENT_CREATE_ERROR', 500);
  }
}

export class LxpLatePolicyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Politique de retard (${identifier}) introuvable` : 'Politique de retard introuvable';
    super(msg, 'LXP_LATE_POLICY_NOT_FOUND', 404);
  }
}

export class LxpLatePolicyCreateError extends AppError {
  constructor(message = 'Impossible de créer la politique de retard') {
    super(message, 'LXP_LATE_POLICY_CREATE_ERROR', 500);
  }
}

export class LxpSubmissionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Soumission (${identifier}) introuvable` : 'Soumission introuvable';
    super(msg, 'LXP_SUBMISSION_NOT_FOUND', 404);
  }
}

export class LxpSubmissionCreateError extends AppError {
  constructor(message = 'Impossible de créer la soumission') {
    super(message, 'LXP_SUBMISSION_CREATE_ERROR', 500);
  }
}

export class LxpSubmissionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la soumission') {
    super(message, 'LXP_SUBMISSION_UPDATE_ERROR', 500);
  }
}

export class LxpSubmissionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la soumission') {
    super(message, 'LXP_SUBMISSION_DELETE_ERROR', 500);
  }
}

export class LxpSubmissionGradeError extends AppError {
  constructor(message = 'Impossible de noter la soumission') {
    super(message, 'LXP_SUBMISSION_GRADE_ERROR', 500);
  }
}

// ─── Quizzes Errors ────────────────────────────────────────────────────────

export class LxpQuizNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Quiz (${identifier}) introuvable` : 'Quiz introuvable';
    super(msg, 'LXP_QUIZ_NOT_FOUND', 404);
  }
}

export class LxpQuizCreateError extends AppError {
  constructor(message = 'Impossible de créer le quiz') {
    super(message, 'LXP_QUIZ_CREATE_ERROR', 500);
  }
}

export class LxpQuizUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le quiz') {
    super(message, 'LXP_QUIZ_UPDATE_ERROR', 500);
  }
}

export class LxpQuizDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le quiz') {
    super(message, 'LXP_QUIZ_DELETE_ERROR', 500);
  }
}

export class LxpQuizPublishError extends AppError {
  constructor(message = 'Impossible de publier le quiz') {
    super(message, 'LXP_QUIZ_PUBLISH_ERROR', 500);
  }
}

export class LxpQuizStartError extends AppError {
  constructor(message = 'Impossible de démarrer le quiz') {
    super(message, 'LXP_QUIZ_START_ERROR', 500);
  }
}

export class LxpQuizSubmitError extends AppError {
  constructor(message = 'Impossible de soumettre le quiz') {
    super(message, 'LXP_QUIZ_SUBMIT_ERROR', 500);
  }
}

export class LxpQuizGradeError extends AppError {
  constructor(message = 'Impossible de noter le quiz') {
    super(message, 'LXP_QUIZ_GRADE_ERROR', 500);
  }
}

export class LxpQuizFeedbackError extends AppError {
  constructor(message = 'Impossible d\'ajouter un commentaire au quiz') {
    super(message, 'LXP_QUIZ_FEEDBACK_ERROR', 500);
  }
}

export class LxpQuizRetakeError extends AppError {
  constructor(message = 'Impossible de repasser le quiz') {
    super(message, 'LXP_QUIZ_RETAKE_ERROR', 400);
  }
}

export class LxpQuestionBankNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Banque de questions (${identifier}) introuvable` : 'Banque de questions introuvable';
    super(msg, 'LXP_QUESTION_BANK_NOT_FOUND', 404);
  }
}

export class LxpQuestionBankCreateError extends AppError {
  constructor(message = 'Impossible de créer la banque de questions') {
    super(message, 'LXP_QUESTION_BANK_CREATE_ERROR', 500);
  }
}

export class LxpQuestionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Question (${identifier}) introuvable` : 'Question introuvable';
    super(msg, 'LXP_QUESTION_NOT_FOUND', 404);
  }
}

export class LxpQuestionCreateError extends AppError {
  constructor(message = 'Impossible de créer la question') {
    super(message, 'LXP_QUESTION_CREATE_ERROR', 500);
  }
}

export class LxpQuestionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la question') {
    super(message, 'LXP_QUESTION_UPDATE_ERROR', 500);
  }
}

export class LxpQuestionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la question') {
    super(message, 'LXP_QUESTION_DELETE_ERROR', 500);
  }
}

export class LxpQuestionImportError extends AppError {
  constructor(message = 'Impossible d\'importer les questions') {
    super(message, 'LXP_QUESTION_IMPORT_ERROR', 500);
  }
}

export class LxpQuestionExportError extends AppError {
  constructor(message = 'Impossible d\'exporter les questions') {
    super(message, 'LXP_QUESTION_EXPORT_ERROR', 500);
  }
}

export class LxpRandomizationError extends AppError {
  constructor(message = 'Erreur lors de la randomisation des questions') {
    super(message, 'LXP_RANDOMIZATION_ERROR', 500);
  }
}

export class LxpAdaptiveTestNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Test adaptatif (${identifier}) introuvable` : 'Test adaptatif introuvable';
    super(msg, 'LXP_ADAPTIVE_TEST_NOT_FOUND', 404);
  }
}

export class LxpPracticeExamNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Examens blancs (${identifier}) introuvable` : 'Examens blancs introuvable';
    super(msg, 'LXP_PRACTICE_EXAM_NOT_FOUND', 404);
  }
}

export class LxpTimedExamNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Examen chronométré (${identifier}) introuvable` : 'Examen chronométré introuvable';
    super(msg, 'LXP_TIMED_EXAM_NOT_FOUND', 404);
  }
}

export class LxpAutoGradingError extends AppError {
  constructor(message = 'Erreur lors de la notation automatique') {
    super(message, 'LXP_AUTO_GRADING_ERROR', 500);
  }
}

export class LxpManualGradingError extends AppError {
  constructor(message = 'Erreur lors de la notation manuelle') {
    super(message, 'LXP_MANUAL_GRADING_ERROR', 500);
  }
}

export class LxpQuizAttemptNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tentative de quiz (${identifier}) introuvable` : 'Tentative de quiz introuvable';
    super(msg, 'LXP_QUIZ_ATTEMPT_NOT_FOUND', 404);
  }
}

export class LxpQuizAnswerNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réponse au quiz (${identifier}) introuvable` : 'Réponse au quiz introuvable';
    super(msg, 'LXP_QUIZ_ANSWER_NOT_FOUND', 404);
  }
}

export class LxpQuizDuplicateError extends AppError {
  constructor(message = 'Impossible de dupliquer le quiz') {
    super(message, 'LXP_QUIZ_DUPLICATE_ERROR', 500);
  }
}

export class LxpQuizTemplateError extends AppError {
  constructor(message = 'Impossible d\'appliquer le modèle de quiz') {
    super(message, 'LXP_QUIZ_TEMPLATE_ERROR', 500);
  }
}

export class LxpQuizAnalyticsError extends AppError {
  constructor(message = 'Impossible de récupérer les analyses du quiz') {
    super(message, 'LXP_QUIZ_ANALYTICS_ERROR', 500);
  }
}

export class LxpQuizImportError extends AppError {
  constructor(message = 'Impossible d\'importer le quiz') {
    super(message, 'LXP_QUIZ_IMPORT_ERROR', 500);
  }
}

export class LxpQuizExportError extends AppError {
  constructor(message = 'Impossible d\'exporter le quiz') {
    super(message, 'LXP_QUIZ_EXPORT_ERROR', 500);
  }
}

export class LxpQuestionPoolError extends AppError {
  constructor(message = 'Erreur dans le bassin de questions') {
    super(message, 'LXP_QUESTION_POOL_ERROR', 500);
  }
}

export class LxpQuestionCategoryError extends AppError {
  constructor(message = 'Erreur de catégorie de questions') {
    super(message, 'LXP_QUESTION_CATEGORY_ERROR', 500);
  }
}

export class LxpQuizLockError extends AppError {
  constructor(message = 'Impossible de verrouiller le quiz') {
    super(message, 'LXP_QUIZ_LOCK_ERROR', 500);
  }
}

export class LxpQuizUnlockError extends AppError {
  constructor(message = 'Impossible de déverrouiller le quiz') {
    super(message, 'LXP_QUIZ_UNLOCK_ERROR', 500);
  }
}

// ─── Certifications Errors ─────────────────────────────────────────────────

export class LxpCertificateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Certificat (${identifier}) introuvable` : 'Certificat introuvable';
    super(msg, 'LXP_CERTIFICATE_NOT_FOUND', 404);
  }
}

export class LxpCertificateCreateError extends AppError {
  constructor(message = 'Impossible de créer le certificat') {
    super(message, 'LXP_CERTIFICATE_CREATE_ERROR', 500);
  }
}

export class LxpCertificateRevokeError extends AppError {
  constructor(message = 'Impossible de révoquer le certificat') {
    super(message, 'LXP_CERTIFICATE_REVOKE_ERROR', 500);
  }
}

export class LxpCertificateVerifyError extends AppError {
  constructor(message = 'Impossible de vérifier le certificat') {
    super(message, 'LXP_CERTIFICATE_VERIFY_ERROR', 500);
  }
}

export class LxpCertificateRenewError extends AppError {
  constructor(message = 'Impossible de renouveler le certificat') {
    super(message, 'LXP_CERTIFICATE_RENEW_ERROR', 500);
  }
}

export class LxpCertificateExpireError extends AppError {
  constructor(message = 'Le certificat a expiré') {
    super(message, 'LXP_CERTIFICATE_EXPIRE_ERROR', 400);
  }
}

export class LxpBadgeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Badge (${identifier}) introuvable` : 'Badge introuvable';
    super(msg, 'LXP_BADGE_NOT_FOUND', 404);
  }
}

export class LxpBadgeCreateError extends AppError {
  constructor(message = 'Impossible de créer le badge') {
    super(message, 'LXP_BADGE_CREATE_ERROR', 500);
  }
}

export class LxpBadgeAwardError extends AppError {
  constructor(message = 'Impossible d\'attribuer le badge') {
    super(message, 'LXP_BADGE_AWARD_ERROR', 500);
  }
}

export class LxpBadgeRevokeError extends AppError {
  constructor(message = 'Impossible de révoquer le badge') {
    super(message, 'LXP_BADGE_REVOKE_ERROR', 500);
  }
}

export class LxpBadgeVerifyError extends AppError {
  constructor(message = 'Impossible de vérifier le badge') {
    super(message, 'LXP_BADGE_VERIFY_ERROR', 500);
  }
}

export class LxpMicroCredentialNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Micro-credential (${identifier}) introuvable` : 'Micro-credential introuvable';
    super(msg, 'LXP_MICRO_CREDENTIAL_NOT_FOUND', 404);
  }
}

export class LxpMicroCredentialCreateError extends AppError {
  constructor(message = 'Impossible de créer le micro-credential') {
    super(message, 'LXP_MICRO_CREDENTIAL_CREATE_ERROR', 500);
  }
}

export class LxpMicroCredentialAwardError extends AppError {
  constructor(message = 'Impossible d\'attribuer le micro-credential') {
    super(message, 'LXP_MICRO_CREDENTIAL_AWARD_ERROR', 500);
  }
}

export class LxpCompetencyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Compétence (${identifier}) introuvable` : 'Compétence introuvable';
    super(msg, 'LXP_COMPETENCY_NOT_FOUND', 404);
  }
}

export class LxpCompetencyCreateError extends AppError {
  constructor(message = 'Impossible de créer la compétence') {
    super(message, 'LXP_COMPETENCY_CREATE_ERROR', 500);
  }
}

export class LxpCompetencyAssessError extends AppError {
  constructor(message = 'Impossible d\'évaluer la compétence') {
    super(message, 'LXP_COMPETENCY_ASSESS_ERROR', 500);
  }
}

export class LxpSkillNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Compétence (${identifier}) introuvable` : 'Compétence introuvable';
    super(msg, 'LXP_SKILL_NOT_FOUND', 404);
  }
}

export class LxpSkillCreateError extends AppError {
  constructor(message = 'Impossible de créer la compétence') {
    super(message, 'LXP_SKILL_CREATE_ERROR', 500);
  }
}

export class LxpSkillAssessError extends AppError {
  constructor(message = 'Impossible d\'évaluer la compétence') {
    super(message, 'LXP_SKILL_ASSESS_ERROR', 500);
  }
}

export class LxpBlockchainNotReadyError extends AppError {
  constructor(message = 'Le réseau blockchain n\'est pas prêt') {
    super(message, 'LXP_BLOCKCHAIN_NOT_READY_ERROR', 503);
  }
}

export class LxpQRCodeGenerateError extends AppError {
  constructor(message = 'Impossible de générer le code QR') {
    super(message, 'LXP_QR_CODE_GENERATE_ERROR', 500);
  }
}

export class LxpQRCodeVerifyError extends AppError {
  constructor(message = 'Impossible de vérifier le code QR') {
    super(message, 'LXP_QR_CODE_VERIFY_ERROR', 500);
  }
}

export class LxpExpirationCheckError extends AppError {
  constructor(message = 'Erreur lors de la vérification de l\'expiration') {
    super(message, 'LXP_EXPIRATION_CHECK_ERROR', 500);
  }
}

export class LxpRenewalProcessError extends AppError {
  constructor(message = 'Erreur lors du processus de renouvellement') {
    super(message, 'LXP_RENEWAL_PROCESS_ERROR', 500);
  }
}

// ─── Live Learning Errors ──────────────────────────────────────────────────

export class LxpLiveSessionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Session en direct (${identifier}) introuvable` : 'Session en direct introuvable';
    super(msg, 'LXP_LIVE_SESSION_NOT_FOUND', 404);
  }
}

export class LxpLiveSessionCreateError extends AppError {
  constructor(message = 'Impossible de créer la session en direct') {
    super(message, 'LXP_LIVE_SESSION_CREATE_ERROR', 500);
  }
}

export class LxpLiveSessionStartError extends AppError {
  constructor(message = 'Impossible de démarrer la session en direct') {
    super(message, 'LXP_LIVE_SESSION_START_ERROR', 500);
  }
}

export class LxpLiveSessionEndError extends AppError {
  constructor(message = 'Impossible de terminer la session en direct') {
    super(message, 'LXP_LIVE_SESSION_END_ERROR', 500);
  }
}

export class LxpLiveSessionJoinError extends AppError {
  constructor(message = 'Impossible de rejoindre la session en direct') {
    super(message, 'LXP_LIVE_SESSION_JOIN_ERROR', 400);
  }
}

export class LxpLiveSessionLeaveError extends AppError {
  constructor(message = 'Impossible de quitter la session en direct') {
    super(message, 'LXP_LIVE_SESSION_LEAVE_ERROR', 500);
  }
}

export class LxpRecordingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Enregistrement (${identifier}) introuvable` : 'Enregistrement introuvable';
    super(msg, 'LXP_RECORDING_NOT_FOUND', 404);
  }
}

export class LxpRecordingStartError extends AppError {
  constructor(message = 'Impossible de démarrer l\'enregistrement') {
    super(message, 'LXP_RECORDING_START_ERROR', 500);
  }
}

export class LxpRecordingStopError extends AppError {
  constructor(message = 'Impossible d\'arrêter l\'enregistrement') {
    super(message, 'LXP_RECORDING_STOP_ERROR', 500);
  }
}

export class LxpRecordingUploadError extends AppError {
  constructor(message = 'Impossible de télécharger l\'enregistrement') {
    super(message, 'LXP_RECORDING_UPLOAD_ERROR', 500);
  }
}

export class LxpAttendanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Présence (${identifier}) introuvable` : 'Présence introuvable';
    super(msg, 'LXP_ATTENDANCE_NOT_FOUND', 404);
  }
}

export class LxpAttendanceRecordError extends AppError {
  constructor(message = 'Impossible d\'enregistrer la présence') {
    super(message, 'LXP_ATTENDANCE_RECORD_ERROR', 500);
  }
}

export class LxpWhiteboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau blanc (${identifier}) introuvable` : 'Tableau blanc introuvable';
    super(msg, 'LXP_WHITEBOARD_NOT_FOUND', 404);
  }
}

export class LxpWhiteboardCreateError extends AppError {
  constructor(message = 'Impossible de créer le tableau blanc') {
    super(message, 'LXP_WHITEBOARD_CREATE_ERROR', 500);
  }
}

export class LxpBreakoutRoomNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Salle de discussion (${identifier}) introuvable` : 'Salle de discussion introuvable';
    super(msg, 'LXP_BREAKOUT_ROOM_NOT_FOUND', 404);
  }
}

export class LxpBreakoutRoomCreateError extends AppError {
  constructor(message = 'Impossible de créer la salle de discussion') {
    super(message, 'LXP_BREAKOUT_ROOM_CREATE_ERROR', 500);
  }
}

export class LxpPollNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Sondage (${identifier}) introuvable` : 'Sondage introuvable';
    super(msg, 'LXP_POLL_NOT_FOUND', 404);
  }
}

export class LxpPollCreateError extends AppError {
  constructor(message = 'Impossible de créer le sondage') {
    super(message, 'LXP_POLL_CREATE_ERROR', 500);
  }
}

export class LxpPollVoteError extends AppError {
  constructor(message = 'Impossible d\'enregistrer le vote au sondage') {
    super(message, 'LXP_POLL_VOTE_ERROR', 500);
  }
}

export class LxpScreenShareNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Partage d\'écran (${identifier}) introuvable` : 'Partage d\'écran introuvable';
    super(msg, 'LXP_SCREEN_SHARE_NOT_FOUND', 404);
  }
}

// ─── Social Learning Errors ────────────────────────────────────────────────

export class LxpForumNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Forum (${identifier}) introuvable` : 'Forum introuvable';
    super(msg, 'LXP_FORUM_NOT_FOUND', 404);
  }
}

export class LxpForumCreateError extends AppError {
  constructor(message = 'Impossible de créer le forum') {
    super(message, 'LXP_FORUM_CREATE_ERROR', 500);
  }
}

export class LxpForumPostNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Message du forum (${identifier}) introuvable` : 'Message du forum introuvable';
    super(msg, 'LXP_FORUM_POST_NOT_FOUND', 404);
  }
}

export class LxpForumPostCreateError extends AppError {
  constructor(message = 'Impossible de créer le message du forum') {
    super(message, 'LXP_FORUM_POST_CREATE_ERROR', 500);
  }
}

export class LxpForumPostUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le message du forum') {
    super(message, 'LXP_FORUM_POST_UPDATE_ERROR', 500);
  }
}

export class LxpForumPostDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le message du forum') {
    super(message, 'LXP_FORUM_POST_DELETE_ERROR', 500);
  }
}

export class LxpForumCommentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Commentaire du forum (${identifier}) introuvable` : 'Commentaire du forum introuvable';
    super(msg, 'LXP_FORUM_COMMENT_NOT_FOUND', 404);
  }
}

export class LxpForumCommentCreateError extends AppError {
  constructor(message = 'Impossible de créer le commentaire du forum') {
    super(message, 'LXP_FORUM_COMMENT_CREATE_ERROR', 500);
  }
}

export class LxpCommunityNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Communauté (${identifier}) introuvable` : 'Communauté introuvable';
    super(msg, 'LXP_COMMUNITY_NOT_FOUND', 404);
  }
}

export class LxpCommunityCreateError extends AppError {
  constructor(message = 'Impossible de créer la communauté') {
    super(message, 'LXP_COMMUNITY_CREATE_ERROR', 500);
  }
}

export class LxpCommunityJoinError extends AppError {
  constructor(message = 'Impossible de rejoindre la communauté') {
    super(message, 'LXP_COMMUNITY_JOIN_ERROR', 400);
  }
}

export class LxpCommunityLeaveError extends AppError {
  constructor(message = 'Impossible de quitter la communauté') {
    super(message, 'LXP_COMMUNITY_LEAVE_ERROR', 500);
  }
}

export class LxpGroupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Groupe (${identifier}) introuvable` : 'Groupe introuvable';
    super(msg, 'LXP_GROUP_NOT_FOUND', 404);
  }
}

export class LxpGroupCreateError extends AppError {
  constructor(message = 'Impossible de créer le groupe') {
    super(message, 'LXP_GROUP_CREATE_ERROR', 500);
  }
}

export class LxpGroupJoinError extends AppError {
  constructor(message = 'Impossible de rejoindre le groupe') {
    super(message, 'LXP_GROUP_JOIN_ERROR', 400);
  }
}

export class LxpGroupLeaveError extends AppError {
  constructor(message = 'Impossible de quitter le groupe') {
    super(message, 'LXP_GROUP_LEAVE_ERROR', 500);
  }
}

export class LxpMentoringNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Mentorat (${identifier}) introuvable` : 'Mentorat introuvable';
    super(msg, 'LXP_MENTORING_NOT_FOUND', 404);
  }
}

export class LxpMentoringCreateError extends AppError {
  constructor(message = 'Impossible de créer le mentorat') {
    super(message, 'LXP_MENTORING_CREATE_ERROR', 500);
  }
}

export class LxpStudyGroupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Groupe d\'étude (${identifier}) introuvable` : 'Groupe d\'étude introuvable';
    super(msg, 'LXP_STUDY_GROUP_NOT_FOUND', 404);
  }
}

export class LxpStudyGroupCreateError extends AppError {
  constructor(message = 'Impossible de créer le groupe d\'étude') {
    super(message, 'LXP_STUDY_GROUP_CREATE_ERROR', 500);
  }
}

// ─── Analytics Errors ──────────────────────────────────────────────────────

export class LxpProgressNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Progression (${identifier}) introuvable` : 'Progression introuvable';
    super(msg, 'LXP_PROGRESS_NOT_FOUND', 404);
  }
}

export class LxpProgressUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la progression') {
    super(message, 'LXP_PROGRESS_UPDATE_ERROR', 500);
  }
}

export class LxpCompletionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Complétion (${identifier}) introuvable` : 'Complétion introuvable';
    super(msg, 'LXP_COMPLETION_NOT_FOUND', 404);
  }
}

export class LxpCompletionRecordError extends AppError {
  constructor(message = 'Impossible d\'enregistrer la complétion') {
    super(message, 'LXP_COMPLETION_RECORD_ERROR', 500);
  }
}

export class LxpEngagementNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Engagement (${identifier}) introuvable` : 'Engagement introuvable';
    super(msg, 'LXP_ENGAGEMENT_NOT_FOUND', 404);
  }
}

export class LxpEngagementUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'engagement') {
    super(message, 'LXP_ENGAGEMENT_UPDATE_ERROR', 500);
  }
}

export class LxpDropoutRiskNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Risque d\'abandon (${identifier}) introuvable` : 'Risque d\'abandon introuvable';
    super(msg, 'LXP_DROPOUT_RISK_NOT_FOUND', 404);
  }
}

export class LxpLearningTimeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Temps d\'apprentissage (${identifier}) introuvable` : 'Temps d\'apprentissage introuvable';
    super(msg, 'LXP_LEARNING_TIME_NOT_FOUND', 404);
  }
}

export class LxpHeatmapNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Heatmap (${identifier}) introuvable` : 'Heatmap introuvable';
    super(msg, 'LXP_HEATMAP_NOT_FOUND', 404);
  }
}

export class LxpCompetencyAnalyticsNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Analyse de compétences (${identifier}) introuvable` : 'Analyse de compétences introuvable';
    super(msg, 'LXP_COMPETENCY_ANALYTICS_NOT_FOUND', 404);
  }
}

export class LxpSkillGapNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Écart de compétences (${identifier}) introuvable` : 'Écart de compétences introuvable';
    super(msg, 'LXP_SKILL_GAP_NOT_FOUND', 404);
  }
}

export class LxpRecommendationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Recommandation (${identifier}) introuvable` : 'Recommandation introuvable';
    super(msg, 'LXP_RECOMMENDATION_NOT_FOUND', 404);
  }
}

export class LxpReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport (${identifier}) introuvable` : 'Rapport introuvable';
    super(msg, 'LXP_REPORT_NOT_FOUND', 404);
  }
}

export class LxpReportGenerateError extends AppError {
  constructor(message = 'Impossible de générer le rapport') {
    super(message, 'LXP_REPORT_GENERATE_ERROR', 500);
  }
}

export class LxpAnalyticsExportError extends AppError {
  constructor(message = 'Impossible d\'exporter les analyses') {
    super(message, 'LXP_ANALYTICS_EXPORT_ERROR', 500);
  }
}

// ─── Gamification Errors ───────────────────────────────────────────────────

export class LxpPointsNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Points (${identifier}) introuvable` : 'Points introuvable';
    super(msg, 'LXP_POINTS_NOT_FOUND', 404);
  }
}

export class LxpPointsAwardError extends AppError {
  constructor(message = 'Impossible d\'attribuer les points') {
    super(message, 'LXP_POINTS_AWARD_ERROR', 500);
  }
}

export class LxpXPNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `XP (${identifier}) introuvable` : 'XP introuvable';
    super(msg, 'LXP_XP_NOT_FOUND', 404);
  }
}

export class LxpXPAwardError extends AppError {
  constructor(message = 'Impossible d\'attribuer l\'XP') {
    super(message, 'LXP_XP_AWARD_ERROR', 500);
  }
}

export class LxpLevelNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Niveau (${identifier}) introuvable` : 'Niveau introuvable';
    super(msg, 'LXP_LEVEL_NOT_FOUND', 404);
  }
}

export class LxpLevelUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le niveau') {
    super(message, 'LXP_LEVEL_UPDATE_ERROR', 500);
  }
}

export class LxpAchievementNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réalisations (${identifier}) introuvable` : 'Réalisations introuvable';
    super(msg, 'LXP_ACHIEVEMENT_NOT_FOUND', 404);
  }
}

export class LxpAchievementAwardError extends AppError {
  constructor(message = 'Impossible d\'attribuer la réalisation') {
    super(message, 'LXP_ACHIEVEMENT_AWARD_ERROR', 500);
  }
}

export class LxpBadgeAward2Error extends AppError {
  constructor(message = 'Impossible d\'attribuer le badge (gamification)') {
    super(message, 'LXP_BADGE_AWARD_2_ERROR', 500);
  }
}

export class LxpLeaderboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Classement (${identifier}) introuvable` : 'Classement introuvable';
    super(msg, 'LXP_LEADERBOARD_NOT_FOUND', 404);
  }
}

export class LxpLeaderboardUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le classement') {
    super(message, 'LXP_LEADERBOARD_UPDATE_ERROR', 500);
  }
}

export class LxpChallengeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Défi (${identifier}) introuvable` : 'Défi introuvable';
    super(msg, 'LXP_CHALLENGE_NOT_FOUND', 404);
  }
}

export class LxpChallengeCreateError extends AppError {
  constructor(message = 'Impossible de créer le défi') {
    super(message, 'LXP_CHALLENGE_CREATE_ERROR', 500);
  }
}

export class LxpChallengeCompleteError extends AppError {
  constructor(message = 'Impossible de finaliser le défi') {
    super(message, 'LXP_CHALLENGE_COMPLETE_ERROR', 500);
  }
}

export class LxpRewardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Récompense (${identifier}) introuvable` : 'Récompense introuvable';
    super(msg, 'LXP_REWARD_NOT_FOUND', 404);
  }
}

export class LxpRewardRedeemError extends AppError {
  constructor(message = 'Impossible d\'échanger la récompense') {
    super(message, 'LXP_REWARD_REDEEM_ERROR', 500);
  }
}

// ─── Marketplace Errors ────────────────────────────────────────────────────

export class LxpMarketplaceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Place de marché (${identifier}) introuvable` : 'Place de marché introuvable';
    super(msg, 'LXP_MARKETPLACE_NOT_FOUND', 404);
  }
}

export class LxpMarketplaceCreateError extends AppError {
  constructor(message = 'Impossible de créer la place de marché') {
    super(message, 'LXP_MARKETPLACE_CREATE_ERROR', 500);
  }
}

export class LxpMarketplaceUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la place de marché') {
    super(message, 'LXP_MARKETPLACE_UPDATE_ERROR', 500);
  }
}

export class LxpTemplateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Modèle (${identifier}) introuvable` : 'Modèle introuvable';
    super(msg, 'LXP_TEMPLATE_NOT_FOUND', 404);
  }
}

export class LxpTemplateCreateError extends AppError {
  constructor(message = 'Impossible de créer le modèle') {
    super(message, 'LXP_TEMPLATE_CREATE_ERROR', 500);
  }
}

export class LxpPremiumContentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Contenu premium (${identifier}) introuvable` : 'Contenu premium introuvable';
    super(msg, 'LXP_PREMIUM_CONTENT_NOT_FOUND', 404);
  }
}

export class LxpPremiumContentCreateError extends AppError {
  constructor(message = 'Impossible de créer le contenu premium') {
    super(message, 'LXP_PREMIUM_CONTENT_CREATE_ERROR', 500);
  }
}

export class LxpPublisherNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Éditeur (${identifier}) introuvable` : 'Éditeur introuvable';
    super(msg, 'LXP_PUBLISHER_NOT_FOUND', 404);
  }
}

export class LxpPublisherApplyError extends AppError {
  constructor(message = 'Impossible de soumettre la candidature éditeur') {
    super(message, 'LXP_PUBLISHER_APPLY_ERROR', 500);
  }
}

export class LxpPublisherApproveError extends AppError {
  constructor(message = 'Impossible d\'approuver l\'éditeur') {
    super(message, 'LXP_PUBLISHER_APPROVE_ERROR', 500);
  }
}

export class LxpReviewNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Avis (${identifier}) introuvable` : 'Avis introuvable';
    super(msg, 'LXP_REVIEW_NOT_FOUND', 404);
  }
}

export class LxpReviewCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'avis') {
    super(message, 'LXP_REVIEW_CREATE_ERROR', 500);
  }
}

export class LxpLicenseNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Licence (${identifier}) introuvable` : 'Licence introuvable';
    super(msg, 'LXP_LICENSE_NOT_FOUND', 404);
  }
}

export class LxpLicenseCreateError extends AppError {
  constructor(message = 'Impossible de créer la licence') {
    super(message, 'LXP_LICENSE_CREATE_ERROR', 500);
  }
}

export class LxpRevenueShareNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Part des revenus (${identifier}) introuvable` : 'Part des revenus introuvable';
    super(msg, 'LXP_REVENUE_SHARE_NOT_FOUND', 404);
  }
}

export class LxpRevenueShareCreateError extends AppError {
  constructor(message = 'Impossible de créer la part des revenus') {
    super(message, 'LXP_REVENUE_SHARE_CREATE_ERROR', 500);
  }
}

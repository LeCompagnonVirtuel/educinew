/**
 * @educi/errors — Hiérarchie d'erreurs standardisée.
 * Toutes les erreurs métier doivent hériter d'AppError.
 */

export { AppError } from './AppError';
import { AppError } from './AppError';

export class ValidationError extends AppError {
  public readonly fields: Record<string, string>;

  constructor(message: string, fields: Record<string, string> = {}) {
    super(message, 'VALIDATION_ERROR', 400);
    this.fields = fields;
  }
}

export class AuthError extends AppError {
  constructor(message = 'Non authentifié') {
    super(message, 'AUTH_ERROR', 401);
  }
}

export class PermissionError extends AppError {
  constructor(message = 'Accès refusé') {
    super(message, 'PERMISSION_ERROR', 403);
  }
}

export class NotFoundError extends AppError {
  constructor(entity: string, id?: string) {
    const msg = id ? `${entity} (${id}) introuvable` : `${entity} introuvable`;
    super(msg, 'NOT_FOUND', 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 'CONFLICT', 409);
  }
}

export class RateLimitError extends AppError {
  public readonly retryAfterMs: number;

  constructor(retryAfterMs = 60_000) {
    super('Trop de requêtes, veuillez réessayer', 'RATE_LIMIT', 429);
    this.retryAfterMs = retryAfterMs;
  }
}

export class PaymentError extends AppError {
  public readonly provider: string;
  public readonly providerCode?: string;

  constructor(message: string, provider: string, providerCode?: string) {
    super(message, 'PAYMENT_ERROR', 402);
    this.provider = provider;
    this.providerCode = providerCode;
  }
}

export class MultiTenantError extends AppError {
  constructor(message = 'Violation d\'isolation multi-tenant') {
    super(message, 'TENANT_ISOLATION_ERROR', 403);
  }
}

// ==================== AUTH ERRORS ====================

export class AuthenticationError extends AppError {
  constructor(message = 'Authentification requise') {
    super(message, 'AUTHENTICATION_ERROR', 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Autorisation insuffisante') {
    super(message, 'AUTHORIZATION_ERROR', 403);
  }
}

export class SessionExpiredError extends AppError {
  constructor(message = 'Session expirée. Veuillez vous reconnecter.') {
    super(message, 'SESSION_EXPIRED', 401);
  }
}

export class InvalidCredentialsError extends AppError {
  constructor(message = 'Identifiants incorrects') {
    super(message, 'INVALID_CREDENTIALS', 401);
  }
}

export class EmailNotVerifiedError extends AppError {
  constructor(message = 'Email non vérifié. Vérifiez votre boîte de réception.') {
    super(message, 'EMAIL_NOT_VERIFIED', 403);
  }
}

export class PasswordPolicyError extends AppError {
  public readonly violations: string[];

  constructor(violations: string[]) {
    const message = `Politique de mot de passe non respectée: ${violations.join(', ')}`;
    super(message, 'PASSWORD_POLICY_ERROR', 400);
    this.violations = violations;
  }
}

export class TokenExpiredError extends AppError {
  constructor(message = 'Token expiré') {
    super(message, 'TOKEN_EXPIRED', 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Accès interdit à cette ressource') {
    super(message, 'FORBIDDEN', 403);
  }
}

export class AccountLockedError extends AppError {
  public readonly lockedUntil: Date;

  constructor(lockedUntil: Date) {
    const minutes = Math.ceil((lockedUntil.getTime() - Date.now()) / 60000);
    super(
      `Compte verrouillé. Réessayez dans ${minutes} minute(s).`,
      'ACCOUNT_LOCKED',
      423
    );
    this.lockedUntil = lockedUntil;
  }
}

export class TooManyAttemptsError extends AppError {
  public readonly retryAfterMs: number;

  constructor(retryAfterMs: number) {
    super(
      'Trop de tentatives. Veuillez patienter.',
      'TOO_MANY_ATTEMPTS',
      429
    );
    this.retryAfterMs = retryAfterMs;
  }
}

// ==================== SCHOOL ERRORS ====================

export class SchoolNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Établissement (${identifier}) introuvable` : 'Établissement introuvable';
    super(msg, 'SCHOOL_NOT_FOUND', 404);
  }
}

export class SchoolSlugConflictError extends AppError {
  constructor(slug: string) {
    super(`Le slug "${slug}" est déjà utilisé`, 'SCHOOL_SLUG_CONFLICT', 409);
  }
}

export class SchoolLimitExceededError extends AppError {
  public readonly limit: string;
  public readonly current: number;
  public readonly max: number;

  constructor(limit: string, current: number, max: number) {
    super(
      `Limite atteinte: ${limit} (${current}/${max})`,
      'SCHOOL_LIMIT_EXCEEDED',
      400
    );
    this.limit = limit;
    this.current = current;
    this.max = max;
  }
}

export class SchoolPlanUpgradeRequiredError extends AppError {
  public readonly currentPlan: string;
  public readonly requiredPlan: string;

  constructor(currentPlan: string, requiredPlan: string) {
    super(
      `Mise à niveau requise: plan ${currentPlan} ne supporte pas cette fonctionnalité. Plan ${requiredPlan} requis.`,
      'SCHOOL_PLAN_UPGRADE_REQUIRED',
      400
    );
    this.currentPlan = currentPlan;
    this.requiredPlan = requiredPlan;
  }
}

export class SchoolLogoError extends AppError {
  constructor(message = 'Erreur lors du traitement du logo') {
    super(message, 'SCHOOL_LOGO_ERROR', 400);
  }
}

export class SchoolArchiveError extends AppError {
  constructor(message = 'Impossible d\'archiver cet établissement') {
    super(message, 'SCHOOL_ARCHIVE_ERROR', 400);
  }
}

export class SchoolRestoreError extends AppError {
  constructor(message = 'Impossible de restaurer cet établissement') {
    super(message, 'SCHOOL_RESTORE_ERROR', 400);
  }
}

export class SchoolDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer cet établissement') {
    super(message, 'SCHOOL_DELETE_ERROR', 400);
  }
}

// ==================== ONBOARDING ERRORS ====================

export class OnboardingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Onboarding (${identifier}) introuvable` : 'Onboarding introuvable';
    super(msg, 'ONBOARDING_NOT_FOUND', 404);
  }
}

export class OnboardingAlreadyCompletedError extends AppError {
  constructor() {
    super('Cet onboarding est déjà terminé', 'ONBOARDING_ALREADY_COMPLETED', 409);
  }
}

export class OnboardingStepError extends AppError {
  public readonly step: string;
  public readonly reason: string;

  constructor(step: string, reason: string) {
    super(`Erreur à l'étape ${step}: ${reason}`, 'ONBOARDING_STEP_ERROR', 400);
    this.step = step;
    this.reason = reason;
  }
}

export class OnboardingValidationError extends AppError {
  public readonly errors: Array<{ field: string; message: string }>;

  constructor(errors: Array<{ field: string; message: string }>) {
    super(`Erreurs de validation: ${errors.length} erreur(s)`, 'ONBOARDING_VALIDATION_ERROR', 400);
    this.errors = errors;
  }
}

export class OnboardingDraftNotFoundError extends AppError {
  constructor() {
    super('Brouillon d\'onboarding introuvable', 'ONBOARDING_DRAFT_NOT_FOUND', 404);
  }
}

export class OnboardingConflictError extends AppError {
  constructor(message = 'Un onboarding est déjà en cours pour cet utilisateur') {
    super(message, 'ONBOARDING_CONFLICT', 409);
  }
}

export class OnboardingCompletionError extends AppError {
  constructor(message = 'Erreur lors de la finalisation de l\'onboarding') {
    super(message, 'ONBOARDING_COMPLETION_ERROR', 500);
  }
}

export class OnboardingRateLimitError extends AppError {
  constructor(retryAfterMs: number) {
    super('Trop de tentatives d\'onboarding. Veuillez patienter.', 'ONBOARDING_RATE_LIMIT', 429);
    this.retryAfterMs = retryAfterMs;
  }
  public readonly retryAfterMs: number;
}

// ==================== STUDENT ERRORS ====================

export class StudentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Élève (${identifier}) introuvable` : 'Élève introuvable';
    super(msg, 'STUDENT_NOT_FOUND', 404);
  }
}

export class StudentAlreadyExistsError extends AppError {
  constructor(field: string, value: string) {
    super(`Un élève avec ${field} "${value}" existe déjà`, 'STUDENT_ALREADY_EXISTS', 409);
  }
}

export class StudentInactiveError extends AppError {
  constructor(studentId?: string) {
    const msg = studentId ? `L'élève (${studentId}) est inactif` : 'Cet élève est inactif';
    super(msg, 'STUDENT_INACTIVE', 400);
  }
}

export class StudentTransferError extends AppError {
  constructor(message = 'Erreur lors du transfert de l\'élève') {
    super(message, 'STUDENT_TRANSFER_ERROR', 400);
  }
}

export class StudentPromotionError extends AppError {
  constructor(message = 'Erreur lors de la promotion de l\'élève') {
    super(message, 'STUDENT_PROMOTION_ERROR', 400);
  }
}

export class StudentArchiveError extends AppError {
  constructor(message = 'Erreur lors de l\'archivage de l\'élève') {
    super(message, 'STUDENT_ARCHIVE_ERROR', 400);
  }
}

export class StudentRestoreError extends AppError {
  constructor(message = 'Erreur lors de la restauration de l\'élève') {
    super(message, 'STUDENT_RESTORE_ERROR', 400);
  }
}

export class StudentDeleteError extends AppError {
  constructor(message = 'Erreur lors de la suppression de l\'élève') {
    super(message, 'STUDENT_DELETE_ERROR', 400);
  }
}

export class StudentPhotoError extends AppError {
  constructor(message = 'Erreur lors du traitement de la photo') {
    super(message, 'STUDENT_PHOTO_ERROR', 400);
  }
}

export class StudentQRCodeError extends AppError {
  constructor(message = 'Erreur lors de la génération du QR Code') {
    super(message, 'STUDENT_QRCODE_ERROR', 400);
  }
}

export class StudentCardError extends AppError {
  constructor(message = 'Erreur lors de la génération de la carte') {
    super(message, 'STUDENT_CARD_ERROR', 400);
  }
}

export class StudentMedicalError extends AppError {
  constructor(message = 'Erreur lors de la mise à jour du dossier médical') {
    super(message, 'STUDENT_MEDICAL_ERROR', 400);
  }
}

export class StudentGuardianError extends AppError {
  constructor(message = 'Erreur lors de la gestion du tuteur') {
    super(message, 'STUDENT_GUARDIAN_ERROR', 400);
  }
}

export class StudentImportError extends AppError {
  public readonly errors: Array<{ row: number; field: string; message: string }>;
  constructor(errors: Array<{ row: number; field: string; message: string }>) {
    super(`Erreur d'import: ${errors.length} ligne(s) en erreur`, 'STUDENT_IMPORT_ERROR', 400);
    this.errors = errors;
  }
}

export class StudentExportError extends AppError {
  constructor(message = 'Erreur lors de l\'export') {
    super(message, 'STUDENT_EXPORT_ERROR', 400);
  }
}

export class StudentValidationError extends AppError {
  public readonly errors: Array<{ field: string; message: string }>;
  constructor(errors: Array<{ field: string; message: string }>) {
    super(`Erreur de validation: ${errors.length} erreur(s)`, 'STUDENT_VALIDATION_ERROR', 400);
    this.errors = errors;
  }
}

export class StudentLimitExceededError extends AppError {
  public readonly limit: string;
  public readonly current: number;
  public readonly max: number;
  constructor(limit: string, current: number, max: number) {
    super(`Limite atteinte: ${limit} (${current}/${max})`, 'STUDENT_LIMIT_EXCEEDED', 400);
    this.limit = limit;
    this.current = current;
    this.max = max;
  }
}

// ==================== TEACHER ERRORS ====================

export class TeacherNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Enseignant (${identifier}) introuvable` : 'Enseignant introuvable';
    super(msg, 'TEACHER_NOT_FOUND', 404);
  }
}

export class TeacherAlreadyExistsError extends AppError {
  constructor(email?: string) {
    const msg = email ? `Un enseignant avec l'email ${email} existe déjà` : 'Cet enseignant existe déjà';
    super(msg, 'TEACHER_ALREADY_EXISTS', 409);
  }
}

export class TeacherInactiveError extends AppError {
  constructor() {
    super('Cet enseignant est inactif', 'TEACHER_INACTIVE', 400);
  }
}

export class TeacherAssignmentError extends AppError {
  constructor(message = 'Erreur lors de l\'affectation de l\'enseignant') {
    super(message, 'TEACHER_ASSIGNMENT_ERROR', 400);
  }
}

export class TeacherContractError extends AppError {
  constructor(message = 'Erreur avec le contrat de l\'enseignant') {
    super(message, 'TEACHER_CONTRACT_ERROR', 400);
  }
}

export class TeacherLeaveError extends AppError {
  constructor(message = 'Erreur avec la demande de congé') {
    super(message, 'TEACHER_LEAVE_ERROR', 400);
  }
}

export class TeacherScheduleConflictError extends AppError {
  constructor(message = 'Conflit d\'emploi du temps') {
    super(message, 'TEACHER_SCHEDULE_CONFLICT', 409);
  }
}

export class TeacherPayrollError extends AppError {
  constructor(message = 'Erreur de paie') {
    super(message, 'TEACHER_PAYROLL_ERROR', 400);
  }
}

export class TeacherEvaluationError extends AppError {
  constructor(message = 'Erreur lors de l\'évaluation') {
    super(message, 'TEACHER_EVALUATION_ERROR', 400);
  }
}

export class TeacherPhotoError extends AppError {
  constructor(message = 'Erreur lors du traitement de la photo') {
    super(message, 'TEACHER_PHOTO_ERROR', 400);
  }
}

export class TeacherImportError extends AppError {
  constructor(message = 'Erreur lors de l\'import') {
    super(message, 'TEACHER_IMPORT_ERROR', 400);
  }
}

export class TeacherExportError extends AppError {
  constructor(message = 'Erreur lors de l\'export') {
    super(message, 'TEACHER_EXPORT_ERROR', 400);
  }
}

export class TeacherArchiveError extends AppError {
  constructor(message = 'Impossible d\'archiver cet enseignant') {
    super(message, 'TEACHER_ARCHIVE_ERROR', 400);
  }
}

export class TeacherRestoreError extends AppError {
  constructor(message = 'Impossible de restaurer cet enseignant') {
    super(message, 'TEACHER_RESTORE_ERROR', 400);
  }
}

export class TeacherDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer cet enseignant') {
    super(message, 'TEACHER_DELETE_ERROR', 400);
  }
}

export class TeacherValidationError extends AppError {
  public readonly errors: Array<{ field: string; message: string }>;

  constructor(errors: Array<{ field: string; message: string }>) {
    super(`Erreur de validation enseignant: ${errors.length} erreur(s)`, 'TEACHER_VALIDATION_ERROR', 400);
    this.errors = errors;
  }
}

export class TeacherLimitExceededError extends AppError {
  public readonly limit: string;
  public readonly current: number;
  public readonly max: number;
  constructor(limit: string, current: number, max: number) {
    super(`Limite atteinte: ${limit} (${current}/${max})`, 'TEACHER_LIMIT_EXCEEDED', 400);
    this.limit = limit;
    this.current = current;
    this.max = max;
  }
}

// ==================== ACADEMIC ERRORS ====================

export class AcademicYearNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Année scolaire (${identifier}) introuvable` : 'Année scolaire introuvable';
    super(msg, 'ACADEMIC_YEAR_NOT_FOUND', 404);
  }
}

export class AcademicYearConflictError extends AppError {
  constructor(message = 'Conflit avec une année scolaire existante') {
    super(message, 'ACADEMIC_YEAR_CONFLICT', 409);
  }
}

export class ClassNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Classe (${identifier}) introuvable` : 'Classe introuvable';
    super(msg, 'CLASS_NOT_FOUND', 404);
  }
}

export class ClassCapacityError extends AppError {
  public readonly capacity: number;
  public readonly current: number;
  constructor(capacity: number, current: number) {
    super(`Capacité dépassée: ${current}/${capacity}`, 'CLASS_CAPACITY_EXCEEDED', 400);
    this.capacity = capacity;
    this.current = current;
  }
}

export class ClassValidationError extends AppError {
  public readonly errors: Array<{ field: string; message: string }>;
  constructor(errors: Array<{ field: string; message: string }>) {
    super(`Erreur de validation classe: ${errors.length} erreur(s)`, 'CLASS_VALIDATION_ERROR', 400);
    this.errors = errors;
  }
}

export class ClassDuplicateError extends AppError {
  constructor(name: string, levelId: string) {
    super(`Une classe "${name}" existe déjà pour ce niveau`, 'CLASS_DUPLICATE', 409);
  }
}

export class ClassDeletionError extends AppError {
  constructor(message = 'Impossible de supprimer cette classe') {
    super(message, 'CLASS_DELETION_ERROR', 400);
  }
}

export class SubjectNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Matière (${identifier}) introuvable` : 'Matière introuvable';
    super(msg, 'SUBJECT_NOT_FOUND', 404);
  }
}

export class SubjectDuplicateError extends AppError {
  constructor(code: string) {
    super(`Une matière avec le code ${code} existe déjà`, 'SUBJECT_DUPLICATE', 409);
  }
}

export class DepartmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Département (${identifier}) introuvable` : 'Département introuvable';
    super(msg, 'DEPARTMENT_NOT_FOUND', 404);
  }
}

export class LevelNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Niveau (${identifier}) introuvable` : 'Niveau introuvable';
    super(msg, 'LEVEL_NOT_FOUND', 404);
  }
}

export class SectionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Section (${identifier}) introuvable` : 'Section introuvable';
    super(msg, 'SECTION_NOT_FOUND', 404);
  }
}

export class StreamNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Série (${identifier}) introuvable` : 'Série introuvable';
    super(msg, 'STREAM_NOT_FOUND', 404);
  }
}

export class RoomNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Salle (${identifier}) introuvable` : 'Salle introuvable';
    super(msg, 'ROOM_NOT_FOUND', 404);
  }
}

export class RoomOccupiedError extends AppError {
  constructor(roomName: string, timeSlot: string) {
    super(`Salle ${roomName} occupée ${timeSlot}`, 'ROOM_OCCUPIED', 409);
  }
}

export class AssignmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Affectation (${identifier}) introuvable` : 'Affectation introuvable';
    super(msg, 'ASSIGNMENT_NOT_FOUND', 404);
  }
}

export class AssignmentConflictError extends AppError {
  constructor(message = 'Conflit d\'affectation') {
    super(message, 'ASSIGNMENT_CONFLICT', 409);
  }
}

export class ScheduleConflictError extends AppError {
  public readonly conflicts: Array<{ type: string; description: string }>;
  constructor(conflicts: Array<{ type: string; description: string }>) {
    super(`Conflit(s) détecté(s): ${conflicts.length} conflit(s)`, 'SCHEDULE_CONFLICT', 409);
    this.conflicts = conflicts;
  }
}

export class ScheduleValidationError extends AppError {
  constructor(message = 'Emploi du temps invalide') {
    super(message, 'SCHEDULE_VALIDATION_ERROR', 400);
  }
}

export class ScheduleGenerationError extends AppError {
  constructor(message = 'Erreur lors de la génération de l\'emploi du temps') {
    super(message, 'SCHEDULE_GENERATION_ERROR', 500);
  }
}

export class CalendarEventNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Événement (${identifier}) introuvable` : 'Événement introuvable';
    super(msg, 'CALENDAR_EVENT_NOT_FOUND', 404);
  }
}

export class AcademicImportError extends AppError {
  constructor(message = 'Erreur lors de l\'import académique') {
    super(message, 'ACADEMIC_IMPORT_ERROR', 400);
  }
}

export class AcademicExportError extends AppError {
  constructor(message = 'Erreur lors de l\'export académique') {
    super(message, 'ACADEMIC_EXPORT_ERROR', 400);
  }
}

export class AcademicValidationError extends AppError {
  public readonly errors: Array<{ field: string; message: string }>;
  constructor(errors: Array<{ field: string; message: string }>) {
    super(`Erreur de validation académique: ${errors.length} erreur(s)`, 'ACADEMIC_VALIDATION_ERROR', 400);
    this.errors = errors;
  }
}

// ==================== ATTENDANCE ERRORS ====================

export class AttendanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Présence (${identifier}) introuvable` : 'Présence introuvable';
    super(msg, 'ATTENDANCE_NOT_FOUND', 404);
  }
}

export class AttendanceConflictError extends AppError {
  constructor(message = 'Conflit de présence') {
    super(message, 'ATTENDANCE_CONFLICT', 409);
  }
}

export class AttendanceValidationError extends AppError {
  public readonly errors: Array<{ field: string; message: string }>;
  constructor(errors: Array<{ field: string; message: string }>) {
    super(`Erreur de validation présence: ${errors.length} erreur(s)`, 'ATTENDANCE_VALIDATION_ERROR', 400);
    this.errors = errors;
  }
}

export class AttendanceSessionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Session (${identifier}) introuvable` : 'Session de présence introuvable';
    super(msg, 'ATTENDANCE_SESSION_NOT_FOUND', 404);
  }
}

export class AttendanceSessionError extends AppError {
  constructor(message = 'Erreur de session de présence') {
    super(message, 'ATTENDANCE_SESSION_ERROR', 400);
  }
}

export class AttendanceDuplicateError extends AppError {
  constructor(date: string, studentId: string) {
    super(`Présence déjà enregistrée pour cet élève le ${date}`, 'ATTENDANCE_DUPLICATE', 409);
  }
}

export class AttendanceLateError extends AppError {
  constructor(threshold: number) {
    super(`Retard dépassant le seuil de ${threshold} minutes`, 'ATTENDANCE_LATE_THRESHOLD', 400);
  }
}

export class AttendanceJustificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Justification (${identifier}) introuvable` : 'Justification introuvable';
    super(msg, 'ATTENDANCE_JUSTIFICATION_NOT_FOUND', 404);
  }
}

export class AttendanceJustificationError extends AppError {
  constructor(message = 'Erreur de justification') {
    super(message, 'ATTENDANCE_JUSTIFICATION_ERROR', 400);
  }
}

export class AttendanceCorrectionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Correction (${identifier}) introuvable` : 'Correction introuvable';
    super(msg, 'ATTENDANCE_CORRECTION_NOT_FOUND', 404);
  }
}

export class AttendanceCorrectionError extends AppError {
  constructor(message = 'Erreur de correction') {
    super(message, 'ATTENDANCE_CORRECTION_ERROR', 400);
  }
}

export class AttendanceAlertNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Alerte (${identifier}) introuvable` : 'Alerte introuvable';
    super(msg, 'ATTENDANCE_ALERT_NOT_FOUND', 404);
  }
}

export class AttendanceNotificationError extends AppError {
  constructor(message = 'Erreur de notification') {
    super(message, 'ATTENDANCE_NOTIFICATION_ERROR', 500);
  }
}

export class AttendanceImportError extends AppError {
  constructor(message = "Erreur lors de l'import de présence") {
    super(message, 'ATTENDANCE_IMPORT_ERROR', 400);
  }
}

export class AttendanceExportError extends AppError {
  constructor(message = "Erreur lors de l'export de présence") {
    super(message, 'ATTENDANCE_EXPORT_ERROR', 400);
  }
}

export class AttendanceQRCodeError extends AppError {
  constructor(message = 'Erreur de code QR') {
    super(message, 'ATTENDANCE_QR_ERROR', 400);
  }
}

export class AttendanceQRCodeExpiredError extends AppError {
  constructor() {
    super('Code QR expiré', 'ATTENDANCE_QR_EXPIRED', 400);
  }
}

export class AttendanceGPSError extends AppError {
  constructor(message = 'Erreur de validation GPS') {
    super(message, 'ATTENDANCE_GPS_ERROR', 400);
  }
}

export class AttendanceGPSOutOfRadiusError extends AppError {
  constructor(radius: number) {
    super(`Position hors de la zone autorisée (${radius}m)`, 'ATTENDANCE_GPS_OUT_OF_RADIUS', 400);
  }
}

export class AttendanceFaceRecognitionError extends AppError {
  constructor(message = 'Erreur de reconnaissance faciale') {
    super(message, 'ATTENDANCE_FACE_ERROR', 400);
  }
}

export class AttendanceFaceNotRecognizedError extends AppError {
  constructor() {
    super('Visage non reconnu', 'ATTENDANCE_FACE_NOT_RECOGNIZED', 400);
  }
}

export class AttendanceNFCError extends AppError {
  constructor(message = 'Erreur de lecture NFC') {
    super(message, 'ATTENDANCE_NFC_ERROR', 400);
  }
}

export class AttendanceNFCNotRecognizedError extends AppError {
  constructor() {
    super('Tag NFC non reconnu', 'ATTENDANCE_NFC_NOT_RECOGNIZED', 400);
  }
}

export class AttendanceSyncError extends AppError {
  constructor(message = 'Erreur de synchronisation') {
    super(message, 'ATTENDANCE_SYNC_ERROR', 500);
  }
}

export class AttendanceSyncConflictError extends AppError {
  public readonly conflicts: number;
  constructor(conflicts: number) {
    super(`${conflicts} conflit(s) de synchronisation`, 'ATTENDANCE_SYNC_CONFLICT', 409);
    this.conflicts = conflicts;
  }
}

export class AttendancePolicyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Politique (${identifier}) introuvable` : 'Politique de présence introuvable';
    super(msg, 'ATTENDANCE_POLICY_NOT_FOUND', 404);
  }
}

export class AttendancePolicyError extends AppError {
  constructor(message = 'Erreur de politique de présence') {
    super(message, 'ATTENDANCE_POLICY_ERROR', 400);
  }
}

export class AttendanceSettingsError extends AppError {
  constructor(message = 'Erreur de configuration de présence') {
    super(message, 'ATTENDANCE_SETTINGS_ERROR', 400);
  }
}

export class AttendanceDeviceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Appareil (${identifier}) introuvable` : 'Appareil introuvable';
    super(msg, 'ATTENDANCE_DEVICE_NOT_FOUND', 404);
  }
}

export class AttendanceLocationError extends AppError {
  constructor(message = 'Erreur de localisation') {
    super(message, 'ATTENDANCE_LOCATION_ERROR', 400);
  }
}

export class AttendanceRateExceededError extends AppError {
  constructor(rate: number, threshold: number) {
    super(`Taux de présence (${rate}%) inférieur au seuil (${threshold}%)`, 'ATTENDANCE_RATE_EXCEEDED', 400);
  }
}

export class AttendanceMaxAbsencesError extends AppError {
  constructor(max: number) {
    super(`Nombre maximum de absences (${max}) dépassé`, 'ATTENDANCE_MAX_ABSENCES', 400);
  }
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}

export function toHttpResponse(err: unknown): { status: number; body: Record<string, unknown> } {
  if (isAppError(err)) {
    return { status: err.statusCode, body: err.toJSON() };
  }
  return {
    status: 500,
    body: { error: 'INTERNAL_ERROR', message: 'Erreur interne du serveur' },
  };
}

// ==================== EXAM / GRADING ERRORS ====================

export class ExamNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Examen (${identifier}) introuvable` : 'Examen introuvable';
    super(msg, 'EXAM_NOT_FOUND', 404);
  }
}

export class ExamAlreadyPublishedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `L'examen (${identifier}) est déjà publié`
      : 'Cet examen est déjà publié';
    super(msg, 'EXAM_ALREADY_PUBLISHED', 409);
  }
}

export class ExamLockedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `L'examen (${identifier}) est verrouillé`
      : 'Cet examen est verrouillé';
    super(msg, 'EXAM_LOCKED', 409);
  }
}

export class ExamNotPublishedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `L'examen (${identifier}) n'est pas publié`
      : 'Cet examen n\'est pas publié';
    super(msg, 'EXAM_NOT_PUBLISHED', 409);
  }
}

export class InvalidMarkError extends AppError {
  constructor(mark: number | string) {
    super(`Note invalide: ${mark}`, 'INVALID_MARK', 400);
  }
}

export class NegativeMarkError extends AppError {
  constructor(mark: number | string) {
    super(`Note négative non autorisée: ${mark}`, 'NEGATIVE_MARK', 400);
  }
}

export class MarkExceedsMaxError extends AppError {
  constructor(mark: number, max: number) {
    super(`La note ${mark} dépasse la note maximale ${max}`, 'MARK_EXCEEDS_MAX', 400);
  }
}

export class GradeCalculationError extends AppError {
  constructor(message = 'Erreur lors du calcul de la moyenne') {
    super(message, 'GRADE_CALCULATION_ERROR', 500);
  }
}

export class RankingCalculationError extends AppError {
  constructor(message = 'Erreur lors du calcul du classement') {
    super(message, 'RANKING_CALCULATION_ERROR', 500);
  }
}

export class BulletinGenerationError extends AppError {
  constructor(message = 'Erreur lors de la génération du bulletin') {
    super(message, 'BULLETIN_GENERATION_ERROR', 500);
  }
}

export class TranscriptGenerationError extends AppError {
  constructor(message = 'Erreur lors de la génération du relevé de notes') {
    super(message, 'TRANSCRIPT_GENERATION_ERROR', 500);
  }
}

export class CoefficientMissingError extends AppError {
  constructor(subject?: string) {
    const msg = subject
      ? `Coefficient manquant pour la matière "${subject}"`
      : 'Coefficient manquant';
    super(msg, 'COEFFICIENT_MISSING', 400);
  }
}

export class DecisionConflictError extends AppError {
  constructor(message = 'Conflit de décision') {
    super(message, 'DECISION_CONFLICT', 409);
  }
}

export class DecisionAlreadyApprovedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `La décision (${identifier}) est déjà approuvée`
      : 'Cette décision est déjà approuvée';
    super(msg, 'DECISION_ALREADY_APPROVED', 409);
  }
}

export class CompetencyCalculationError extends AppError {
  constructor(message = 'Erreur lors du calcul des compétences') {
    super(message, 'COMPETENCY_CALCULATION_ERROR', 500);
  }
}

export class CorrectionAlreadyApprovedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `La correction (${identifier}) est déjà approuvée`
      : 'Cette correction est déjà approuvée';
    super(msg, 'CORRECTION_ALREADY_APPROVED', 409);
  }
}

export class CorrectionRejectedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `La correction (${identifier}) a été rejetée`
      : 'Cette correction a été rejetée';
    super(msg, 'CORRECTION_REJECTED', 409);
  }
}

export class ReportCardLockedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `Le bulletin (${identifier}) est verrouillé`
      : 'Ce bulletin est verrouillé';
    super(msg, 'REPORT_CARD_LOCKED', 409);
  }
}

export class ReportCardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Bulletin (${identifier}) introuvable` : 'Bulletin introuvable';
    super(msg, 'REPORT_CARD_NOT_FOUND', 404);
  }
}

export class TranscriptNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `Relevé de notes (${identifier}) introuvable`
      : 'Relevé de notes introuvable';
    super(msg, 'TRANSCRIPT_NOT_FOUND', 404);
  }
}

export class TranscriptNotGeneratedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `Le relevé de notes (${identifier}) n'a pas été généré`
      : 'Le relevé de notes n\'a pas été généré';
    super(msg, 'TRANSCRIPT_NOT_GENERATED', 409);
  }
}

export class ExamImportError extends AppError {
  constructor(message = 'Erreur lors de l\'import des examens') {
    super(message, 'EXAM_IMPORT_ERROR', 400);
  }
}

export class ExamExportError extends AppError {
  constructor(message = 'Erreur lors de l\'export des examens') {
    super(message, 'EXAM_EXPORT_ERROR', 400);
  }
}

export class ExamDuplicateError extends AppError {
  constructor(name: string) {
    super(`Un examen "${name}" existe déjà`, 'EXAM_DUPLICATE', 409);
  }
}

export class ExamDateConflictError extends AppError {
  constructor(message = 'Conflit de date d\'examen') {
    super(message, 'EXAM_DATE_CONFLICT', 409);
  }
}

export class ExamSessionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `Session d'examen (${identifier}) introuvable`
      : 'Session d\'examen introuvable';
    super(msg, 'EXAM_SESSION_NOT_FOUND', 404);
  }
}

export class ExamRoomNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `Salle d'examen (${identifier}) introuvable`
      : 'Salle d\'examen introuvable';
    super(msg, 'EXAM_ROOM_NOT_FOUND', 404);
  }
}

export class ExamRoomFullError extends AppError {
  constructor(roomName: string) {
    super(`La salle "${roomName}" est complète`, 'EXAM_ROOM_FULL', 409);
  }
}

export class ExamCandidateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `Candidat d'examen (${identifier}) introuvable`
      : 'Candidat d\'examen introuvable';
    super(msg, 'EXAM_CANDIDATE_NOT_FOUND', 404);
  }
}

export class ExamCandidateAlreadyRegisteredError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `Le candidat (${identifier}) est déjà inscrit à cet examen`
      : 'Ce candidat est déjà inscrit à cet examen';
    super(msg, 'EXAM_CANDIDATE_ALREADY_REGISTERED', 409);
  }
}

export class GradeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Note (${identifier}) introuvable` : 'Note introuvable';
    super(msg, 'GRADE_NOT_FOUND', 404);
  }
}

export class GradeRuleConflictError extends AppError {
  constructor(message = 'Conflit avec une règle de notation existante') {
    super(message, 'GRADE_RULE_CONFLICT', 409);
  }
}

export class MarkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Note (${identifier}) introuvable` : 'Note introuvable';
    super(msg, 'MARK_NOT_FOUND', 404);
  }
}

export class MarkAlreadyValidatedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `La note (${identifier}) est déjà validée`
      : 'Cette note est déjà validée';
    super(msg, 'MARK_ALREADY_VALIDATED', 409);
  }
}

export class MarksNotCompleteError extends AppError {
  constructor(missing: number) {
    super(
      `${missing} note(s) manquante(s) pour finaliser le processus`,
      'MARKS_NOT_COMPLETE',
      400
    );
  }
}

export class AverageCalculationError extends AppError {
  constructor(message = 'Erreur lors du calcul de la moyenne') {
    super(message, 'AVERAGE_CALCULATION_ERROR', 500);
  }
}

export class DecisionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Décision (${identifier}) introuvable` : 'Décision introuvable';
    super(msg, 'DECISION_NOT_FOUND', 404);
  }
}

export class CompetencyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Compétence (${identifier}) introuvable` : 'Compétence introuvable';
    super(msg, 'COMPETENCY_NOT_FOUND', 404);
  }
}

export class CompetencyResultNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier
      ? `Résultat de compétence (${identifier}) introuvable`
      : 'Résultat de compétence introuvable';
    super(msg, 'COMPETENCY_RESULT_NOT_FOUND', 404);
  }
}

export class MeritNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Mention (${identifier}) introuvable` : 'Mention introuvable';
    super(msg, 'MERIT_NOT_FOUND', 404);
  }
}

export class ExamStatisticsError extends AppError {
  constructor(message = 'Erreur lors du calcul des statistiques d\'examen') {
    super(message, 'EXAM_STATISTICS_ERROR', 500);
  }
}

export class ExamDashboardError extends AppError {
  constructor(message = 'Erreur lors du chargement du tableau de bord d\'examen') {
    super(message, 'EXAM_DASHBOARD_ERROR', 500);
  }
}

export class ExamSettingsError extends AppError {
  constructor(message = 'Erreur lors de la configuration de l\'examen') {
    super(message, 'EXAM_SETTINGS_ERROR', 500);
  }
}

export class ExamNotificationError extends AppError {
  constructor(message = 'Erreur lors de l\'envoi de la notification d\'examen') {
    super(message, 'EXAM_NOTIFICATION_ERROR', 500);
  }
}

export class PublicationError extends AppError {
  constructor(message = 'Erreur lors de la publication') {
    super(message, 'PUBLICATION_ERROR', 500);
  }
}

export class ExamValidationError extends AppError {
  public readonly errors: Array<{ field: string; message: string }>;
  constructor(errors: Array<{ field: string; message: string }>) {
    super(
      `Erreur de validation examen: ${errors.length} erreur(s)`,
      'EXAM_VALIDATION_ERROR',
      400
    );
    this.errors = errors;
  }
}

// ==================== MESSAGE / COMMUNICATION ERRORS ====================

export class ConversationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Conversation (${identifier}) introuvable` : 'Conversation introuvable';
    super(msg, 'CONVERSATION_NOT_FOUND', 404);
  }
}

export class ConversationArchivedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Conversation (${identifier}) archivée` : 'Conversation archivée';
    super(msg, 'CONVERSATION_ARCHIVED', 409);
  }
}

export class ConversationAlreadyExistsError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Conversation (${identifier}) existe déjà` : 'Conversation déjà existante';
    super(msg, 'CONVERSATION_ALREADY_EXISTS', 409);
  }
}

export class MessageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Message (${identifier}) introuvable` : 'Message introuvable';
    super(msg, 'MESSAGE_NOT_FOUND', 404);
  }
}

export class MessageTooLongError extends AppError {
  constructor(maxLength: number) {
    super(`Message dépassant la longueur maximale de ${maxLength} caractères`, 'MESSAGE_TOO_LONG', 400);
  }
}

export class MessageDeletedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Message (${identifier}) supprimé` : 'Message supprimé';
    super(msg, 'MESSAGE_DELETED', 409);
  }
}

export class MessageAlreadyReadError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Message (${identifier}) déjà lu` : 'Message déjà lu';
    super(msg, 'MESSAGE_ALREADY_READ', 409);
  }
}

export class AttachmentTooLargeError extends AppError {
  constructor(maxSize: string) {
    super(`Pièce jointe dépassant la taille maximale de ${maxSize}`, 'ATTACHMENT_TOO_LARGE', 400);
  }
}

export class AttachmentUnsupportedError extends AppError {
  constructor(mimeType: string) {
    super(`Type de fichier non supporté: ${mimeType}`, 'ATTACHMENT_UNSUPPORTED', 400);
  }
}

export class AttachmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Pièce jointe (${identifier}) introuvable` : 'Pièce jointe introuvable';
    super(msg, 'ATTACHMENT_NOT_FOUND', 404);
  }
}

export class NotificationFailedError extends AppError {
  constructor(message = 'Échec de l\'envoi de la notification') {
    super(message, 'NOTIFICATION_FAILED', 500);
  }
}

export class NotificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Notification (${identifier}) introuvable` : 'Notification introuvable';
    super(msg, 'NOTIFICATION_NOT_FOUND', 404);
  }
}

export class NotificationPreferenceError extends AppError {
  constructor(message = 'Erreur de préférence de notification') {
    super(message, 'NOTIFICATION_PREFERENCE_ERROR', 400);
  }
}

export class GroupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Groupe (${identifier}) introuvable` : 'Groupe introuvable';
    super(msg, 'GROUP_NOT_FOUND', 404);
  }
}

export class GroupAlreadyExistsError extends AppError {
  constructor(name: string) {
    super(`Le groupe "${name}" existe déjà`, 'GROUP_ALREADY_EXISTS', 409);
  }
}

export class GroupFullError extends AppError {
  constructor(groupName: string) {
    super(`Le groupe "${groupName}" est complet`, 'GROUP_FULL', 409);
  }
}

export class GroupMemberNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Membre (${identifier}) introuvable` : 'Membre du groupe introuvable';
    super(msg, 'GROUP_MEMBER_NOT_FOUND', 404);
  }
}

export class GroupMemberAlreadyExistsError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Membre (${identifier}) déjà dans le groupe` : 'Membre déjà dans le groupe';
    super(msg, 'GROUP_MEMBER_ALREADY_EXISTS', 409);
  }
}

export class BroadcastFailedError extends AppError {
  constructor(message = 'Échec de la diffusion') {
    super(message, 'BROADCAST_FAILED', 500);
  }
}

export class BroadcastNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Diffusion (${identifier}) introuvable` : 'Diffusion introuvable';
    super(msg, 'BROADCAST_NOT_FOUND', 404);
  }
}

export class BroadcastAlreadySentError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Diffusion (${identifier}) déjà envoyée` : 'Diffusion déjà envoyée';
    super(msg, 'BROADCAST_ALREADY_SENT', 409);
  }
}

export class AnnouncementNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Annonce (${identifier}) introuvable` : 'Annonce introuvable';
    super(msg, 'ANNOUNCEMENT_NOT_FOUND', 404);
  }
}

export class AnnouncementAlreadyPublishedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Annonce (${identifier}) déjà publiée` : 'Annonce déjà publiée';
    super(msg, 'ANNOUNCEMENT_ALREADY_PUBLISHED', 409);
  }
}

export class AnnouncementExpiredError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Annonce (${identifier}) expirée` : 'Annonce expirée';
    super(msg, 'ANNOUNCEMENT_EXPIRED', 409);
  }
}

export class PermissionDeniedError extends AppError {
  constructor(message = 'Permission refusée') {
    super(message, 'PERMISSION_DENIED', 403);
  }
}

export class DuplicateConversationError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Conversation (${identifier}) en double` : 'Conversation en double';
    super(msg, 'DUPLICATE_CONVERSATION', 409);
  }
}

export class RealtimeDisconnectedError extends AppError {
  constructor(message = 'Déconnexion du canal temps réel') {
    super(message, 'REALTIME_DISCONNECTED', 503);
  }
}

export class RateLimitExceededError extends AppError {
  public readonly retryAfterMs: number;
  constructor(retryAfterMs = 60_000) {
    super('Limite de débit dépassée', 'RATE_LIMIT_EXCEEDED', 429);
    this.retryAfterMs = retryAfterMs;
  }
}

export class MessageInvalidFormatError extends AppError {
  constructor(message = 'Format de message invalide') {
    super(message, 'MESSAGE_INVALID_FORMAT', 400);
  }
}

export class ConversationFullError extends AppError {
  constructor(conversationId?: string) {
    const msg = conversationId ? `Conversation (${conversationId}) complète` : 'Conversation complète';
    super(msg, 'CONVERSATION_FULL', 409);
  }
}

export class UserBlockedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Utilisateur (${identifier}) bloqué` : 'Utilisateur bloqué';
    super(msg, 'USER_BLOCKED', 403);
  }
}

export class CannotMessageSelfError extends AppError {
  constructor(message = 'Impossible d\'envoyer un message à soi-même') {
    super(message, 'CANNOT_MESSAGE_SELF', 400);
  }
}

export class FileUploadFailedError extends AppError {
  constructor(message = 'Échec de l\'upload du fichier') {
    super(message, 'FILE_UPLOAD_FAILED', 500);
  }
}

export class FileDownloadFailedError extends AppError {
  constructor(message = 'Échec du téléchargement du fichier') {
    super(message, 'FILE_DOWNLOAD_FAILED', 500);
  }
}

export class SearchQueryTooShortError extends AppError {
  constructor(minLength: number) {
    super(`La requête de recherche doit contenir au moins ${minLength} caractère(s)`, 'SEARCH_QUERY_TOO_SHORT', 400);
  }
}

export class SearchQueryTooLongError extends AppError {
  constructor(maxLength: number) {
    super(`La requête de recherche ne doit pas dépasser ${maxLength} caractère(s)`, 'SEARCH_QUERY_TOO_LONG', 400);
  }
}

export class ExportFailedError extends AppError {
  constructor(message = 'Échec de l\'export') {
    super(message, 'EXPORT_FAILED', 500);
  }
}

export class ImportFailedError extends AppError {
  constructor(message = 'Échec de l\'import') {
    super(message, 'IMPORT_FAILED', 500);
  }
}

export class ModerationActionError extends AppError {
  constructor(message = 'Erreur lors de l\'action de modération') {
    super(message, 'MODERATION_ACTION_ERROR', 400);
  }
}

export class ReportAlreadyExistsError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Signalement (${identifier}) déjà existant` : 'Signalement déjà existant';
    super(msg, 'REPORT_ALREADY_EXISTS', 409);
  }
}

export class ReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Signalement (${identifier}) introuvable` : 'Signalement introuvable';
    super(msg, 'REPORT_NOT_FOUND', 404);
  }
}

export class SyncConflictError extends AppError {
  constructor(message = 'Conflit de synchronisation') {
    super(message, 'SYNC_CONFLICT', 409);
  }
}

export class OfflineQueueFullError extends AppError {
  constructor(message = 'Queue hors ligne pleine') {
    super(message, 'OFFLINE_QUEUE_FULL', 507);
  }
}

export class EncryptionError extends AppError {
  constructor(message = 'Erreur lors du chiffrement') {
    super(message, 'ENCRYPTION_ERROR', 500);
  }
}

export class MessageRetentionError extends AppError {
  constructor(message = 'Erreur de rétention du message') {
    super(message, 'MESSAGE_RETENTION_ERROR', 400);
  }
}

// ==================== FINANCE / ACCOUNTING ERRORS ====================

export class InvoiceNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Facture (${identifier}) introuvable` : 'Facture introuvable';
        super(msg, 'INVOICE_NOT_FOUND', 404);
    }
}

export class InvoiceAlreadyPaidError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Facture (${identifier}) déjà payée` : 'Facture déjà payée';
        super(msg, 'INVOICE_ALREADY_PAID', 409);
    }
}

export class InvoiceCancelledError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Facture (${identifier}) annulée` : 'Facture annulée';
        super(msg, 'INVOICE_CANCELLED', 409);
    }
}

export class InvoiceOverdueError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Facture (${identifier}) en retard` : 'Facture en retard';
        super(msg, 'INVOICE_OVERDUE', 409);
    }
}

export class InvoiceVoidError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Facture (${identifier}) annulée` : 'Facture annulée';
        super(msg, 'INVOICE_VOID', 409);
    }
}

export class InvoiceDraftError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Facture (${identifier}) est un brouillon` : 'Facture est un brouillon';
        super(msg, 'INVOICE_DRAFT', 409);
    }
}

export class PaymentFailedError extends AppError {
    constructor(message = 'Échec du paiement') {
        super(message, 'PAYMENT_FAILED', 400);
    }
}

export class PaymentAlreadyProcessedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Paiement (${identifier}) déjà traité` : 'Paiement déjà traité';
        super(msg, 'PAYMENT_ALREADY_PROCESSED', 409);
    }
}

export class PaymentNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Paiement (${identifier}) introuvable` : 'Paiement introuvable';
        super(msg, 'PAYMENT_NOT_FOUND', 404);
    }
}

export class PaymentInsufficientError extends AppError {
    constructor(expected: number, received: number) {
        super(`Paiement insuffisant: ${received} reçu, ${expected} attendu`, 'PAYMENT_INSUFFICIENT', 400);
    }
}

export class CashRegisterNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Caisse (${identifier}) introuvable` : 'Caisse introuvable';
        super(msg, 'CASH_REGISTER_NOT_FOUND', 404);
    }
}

export class CashRegisterAlreadyOpenError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Caisse (${identifier}) déjà ouverte` : 'Caisse déjà ouverte';
        super(msg, 'CASH_REGISTER_ALREADY_OPEN', 409);
    }
}

export class CashRegisterClosedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Caisse (${identifier}) fermée` : 'Caisse fermée';
        super(msg, 'CASH_REGISTER_CLOSED', 409);
    }
}

export class CashRegisterMismatchError extends AppError {
    constructor(expected: number, actual: number) {
        super(`Écart de caisse: ${actual} reçu, ${expected} attendu`, 'CASH_REGISTER_MISMATCH', 400);
    }
}

export class ExpenseNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Dépense (${identifier}) introuvable` : 'Dépense introuvable';
        super(msg, 'EXPENSE_NOT_FOUND', 404);
    }
}

export class ExpenseAlreadyApprovedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Dépense (${identifier}) déjà approuvée` : 'Dépense déjà approuvée';
        super(msg, 'EXPENSE_ALREADY_APPROVED', 409);
    }
}

export class ExpenseNotApprovedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Dépense (${identifier}) non approuvée` : 'Dépense non approuvée';
        super(msg, 'EXPENSE_NOT_APPROVED', 409);
    }
}

export class RevenueNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Revenu (${identifier}) introuvable` : 'Revenu introuvable';
        super(msg, 'REVENUE_NOT_FOUND', 404);
    }
}

export class BudgetNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Budget (${identifier}) introuvable` : 'Budget introuvable';
        super(msg, 'BUDGET_NOT_FOUND', 404);
    }
}

export class BudgetExceededError extends AppError {
    constructor(budgetId: string, amount: number) {
        super(`Budget ${budgetId} dépassé de ${amount}`, 'BUDGET_EXCEEDED', 400);
    }
}

export class BudgetAlreadyActiveError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Budget (${identifier}) déjà actif` : 'Budget déjà actif';
        super(msg, 'BUDGET_ALREADY_ACTIVE', 409);
    }
}

export class AccountingEntryNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Écriture comptable (${identifier}) introuvable` : 'Écriture comptable introuvable';
        super(msg, 'ACCOUNTING_ENTRY_NOT_FOUND', 404);
    }
}

export class AccountingEntryLockedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Écriture comptable (${identifier}) verrouillée` : 'Écriture comptable verrouillée';
        super(msg, 'ACCOUNTING_ENTRY_LOCKED', 409);
    }
}

export class AccountingEntryUnbalancedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Écriture comptable (${identifier}) déséquilibrée` : 'Écriture comptable déséquilibrée';
        super(msg, 'ACCOUNTING_ENTRY_UNBALANCED', 400);
    }
}

export class JournalNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Journal (${identifier}) introuvable` : 'Journal introuvable';
        super(msg, 'JOURNAL_NOT_FOUND', 404);
    }
}

export class AccountNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Compte (${identifier}) introuvable` : 'Compte introuvable';
        super(msg, 'ACCOUNT_NOT_FOUND', 404);
    }
}

export class AccountAlreadyExistsError extends AppError {
    constructor(code: string) {
        super(`Un compte avec le code ${code} existe déjà`, 'ACCOUNT_ALREADY_EXISTS', 409);
    }
}

export class ScholarshipNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Bourse (${identifier}) introuvable` : 'Bourse introuvable';
        super(msg, 'SCHOLARSHIP_NOT_FOUND', 404);
    }
}

export class ScholarshipExpiredError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Bourse (${identifier}) expirée` : 'Bourse expirée';
        super(msg, 'SCHOLARSHIP_EXPIRED', 409);
    }
}

export class ScholarshipAlreadyAssignedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Bourse (${identifier}) déjà attribuée` : 'Bourse déjà attribuée';
        super(msg, 'SCHOLARSHIP_ALREADY_ASSIGNED', 409);
    }
}

export class DiscountNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Réduction (${identifier}) introuvable` : 'Réduction introuvable';
        super(msg, 'DISCOUNT_NOT_FOUND', 404);
    }
}

export class DiscountExpiredError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Réduction (${identifier}) expirée` : 'Réduction expirée';
        super(msg, 'DISCOUNT_EXPIRED', 409);
    }
}

export class DiscountNotApplicableError extends AppError {
    constructor(message = 'Réduction non applicable') {
        super(message, 'DISCOUNT_NOT_APPLICABLE', 400);
    }
}

export class InstallmentPlanNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Plan de paiement (${identifier}) introuvable` : 'Plan de paiement introuvable';
        super(msg, 'INSTALLMENT_PLAN_NOT_FOUND', 404);
    }
}

export class InstallmentPlanAlreadyCompletedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Plan de paiement (${identifier}) déjà complété` : 'Plan de paiement déjà complété';
        super(msg, 'INSTALLMENT_PLAN_ALREADY_COMPLETED', 409);
    }
}

export class InstallmentNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Échéance (${identifier}) introuvable` : 'Échéance introuvable';
        super(msg, 'INSTALLMENT_NOT_FOUND', 404);
    }
}

export class InstallmentAlreadyPaidError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Échéance (${identifier}) déjà payée` : 'Échéance déjà payée';
        super(msg, 'INSTALLMENT_ALREADY_PAID', 409);
    }
}

export class RefundNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Remboursement (${identifier}) introuvable` : 'Remboursement introuvable';
        super(msg, 'REFUND_NOT_FOUND', 404);
    }
}

export class RefundAlreadyProcessedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Remboursement (${identifier}) déjà traité` : 'Remboursement déjà traité';
        super(msg, 'REFUND_ALREADY_PROCESSED', 409);
    }
}

export class RefundExceedsAmountError extends AppError {
    constructor(refundAmount: number, originalAmount: number) {
        super(`Le remboursement ${refundAmount} dépasse le montant original ${originalAmount}`, 'REFUND_EXCEEDS_AMOUNT', 400);
    }
}

export class LateFeeNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Frais de retard (${identifier}) introuvable` : 'Frais de retard introuvable';
        super(msg, 'LATE_FEE_NOT_FOUND', 404);
    }
}

export class LateFeeAlreadyAppliedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Frais de retard (${identifier}) déjà appliqué` : 'Frais de retard déjà appliqué';
        super(msg, 'LATE_FEE_ALREADY_APPLIED', 409);
    }
}

export class ReceiptGenerationError extends AppError {
    constructor(message = 'Erreur lors de la génération du reçu') {
        super(message, 'RECEIPT_GENERATION_ERROR', 500);
    }
}

export class ReceiptNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Reçu (${identifier}) introuvable` : 'Reçu introuvable';
        super(msg, 'RECEIPT_NOT_FOUND', 404);
    }
}

export class CurrencyMismatchError extends AppError {
    constructor(expected: string, received: string) {
        super(`Devise incorrecte: ${received} reçue, ${expected} attendue`, 'CURRENCY_MISMATCH', 400);
    }
}

export class CurrencyConversionError extends AppError {
    constructor(from: string, to: string) {
        super(`Erreur de conversion de devise: ${from} vers ${to}`, 'CURRENCY_CONVERSION_ERROR', 400);
    }
}

export class InvoiceTemplateNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Modèle de facture (${identifier}) introuvable` : 'Modèle de facture introuvable';
        super(msg, 'INVOICE_TEMPLATE_NOT_FOUND', 404);
    }
}

export class ReceiptTemplateNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Modèle de reçu (${identifier}) introuvable` : 'Modèle de reçu introuvable';
        super(msg, 'RECEIPT_TEMPLATE_NOT_FOUND', 404);
    }
}

export class FinanceDashboardError extends AppError {
    constructor(message = 'Erreur lors du chargement du tableau de bord financier') {
        super(message, 'FINANCE_DASHBOARD_ERROR', 500);
    }
}

export class FinanceStatisticsError extends AppError {
    constructor(message = 'Erreur lors du calcul des statistiques financières') {
        super(message, 'FINANCE_STATISTICS_ERROR', 500);
    }
}

export class FinanceAnalyticsError extends AppError {
    constructor(message = 'Erreur lors de l\'analyse financière') {
        super(message, 'FINANCE_ANALYTICS_ERROR', 500);
    }
}

export class FinanceReportError extends AppError {
    constructor(message = 'Erreur lors de la génération du rapport financier') {
        super(message, 'FINANCE_REPORT_ERROR', 500);
    }
}

export class FinanceExportError extends AppError {
    constructor(message = 'Erreur lors de l\'export financier') {
        super(message, 'FINANCE_EXPORT_ERROR', 500);
    }
}

export class FinanceImportError extends AppError {
    constructor(message = 'Erreur lors de l\'import financier') {
        super(message, 'FINANCE_IMPORT_ERROR', 500);
    }
}

export class TransactionNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Transaction (${identifier}) introuvable` : 'Transaction introuvable';
        super(msg, 'TRANSACTION_NOT_FOUND', 404);
    }
}

export class TransactionAlreadyProcessedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Transaction (${identifier}) déjà traitée` : 'Transaction déjà traitée';
        super(msg, 'TRANSACTION_ALREADY_PROCESSED', 409);
    }
}

export class PayrollNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Paie (${identifier}) introuvable` : 'Paie introuvable';
        super(msg, 'PAYROLL_NOT_FOUND', 404);
    }
}

export class PayrollAlreadyProcessedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Paie (${identifier}) déjà traitée` : 'Paie déjà traitée';
        super(msg, 'PAYROLL_ALREADY_PROCESSED', 409);
    }
}

export class TeacherSalaryNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Salaire enseignant (${identifier}) introuvable` : 'Salaire enseignant introuvable';
        super(msg, 'TEACHER_SALARY_NOT_FOUND', 404);
    }
}

export class FinanceSettingsError extends AppError {
    constructor(message = 'Erreur de configuration financière') {
        super(message, 'FINANCE_SETTINGS_ERROR', 500);
    }
}

export class FinanceValidationError extends AppError {
    constructor(message = 'Erreur de validation financière') {
        super(message, 'FINANCE_VALIDATION_ERROR', 400);
    }
}

export class FinancePermissionError extends AppError {
    constructor(message = 'Permission financière insuffisante') {
        super(message, 'FINANCE_PERMISSION_ERROR', 403);
    }
}

export class FinanceSyncError extends AppError {
    constructor(message = 'Erreur de synchronisation financière') {
        super(message, 'FINANCE_SYNC_ERROR', 500);
    }
}

export class FinanceAuditError extends AppError {
    constructor(message = 'Erreur d\'audit financier') {
        super(message, 'FINANCE_AUDIT_ERROR', 500);
    }
}

export class PaymentMethodNotSupportedError extends AppError {
    constructor(method: string) {
        super(`Moyen de paiement non supporté: ${method}`, 'PAYMENT_METHOD_NOT_SUPPORTED', 400);
    }
}

export class InvoiceNumberDuplicateError extends AppError {
    constructor(number: string) {
        super(`Le numéro de facture ${number} existe déjà`, 'INVOICE_NUMBER_DUPLICATE', 409);
    }
}

export class ReceiptNumberDuplicateError extends AppError {
    constructor(number: string) {
        super(`Le numéro de reçu ${number} existe déjà`, 'RECEIPT_NUMBER_DUPLICATE', 409);
    }
}

export class PaymentNumberDuplicateError extends AppError {
    constructor(number: string) {
        super(`Le numéro de paiement ${number} existe déjà`, 'PAYMENT_NUMBER_DUPLICATE', 409);
    }
}

export class ExpenseNumberDuplicateError extends AppError {
    constructor(number: string) {
        super(`Le numéro de dépense ${number} existe déjà`, 'EXPENSE_NUMBER_DUPLICATE', 409);
    }
}

export class VoucherNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Bon (${identifier}) introuvable` : 'Bon introuvable';
        super(msg, 'VOUCHER_NOT_FOUND', 404);
    }
}

export class VoucherAlreadyUsedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Bon (${identifier}) déjà utilisé` : 'Bon déjà utilisé';
        super(msg, 'VOUCHER_ALREADY_USED', 409);
    }
}

export class VoucherExpiredError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Bon (${identifier}) expiré` : 'Bon expiré';
        super(msg, 'VOUCHER_EXPIRED', 409);
    }
}

export class EmployeeNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Employé (${identifier}) introuvable` : 'Employé introuvable';
        super(msg, 'EMPLOYEE_NOT_FOUND', 404);
    }
}

export class EmployeeAlreadyExistsError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Employé (${identifier}) existe déjà` : 'Employé existe déjà';
        super(msg, 'EMPLOYEE_ALREADY_EXISTS', 409);
    }
}

export class DuplicateEmployeeCodeError extends AppError {
    constructor(code: string) {
        super(`Un employé avec le code ${code} existe déjà`, 'DUPLICATE_EMPLOYEE_CODE', 409);
    }
}

export class EmployeeInactiveError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Employé (${identifier}) inactif` : 'Employé inactif';
        super(msg, 'EMPLOYEE_INACTIVE', 409);
    }
}

export class DepartmentAlreadyExistsError extends AppError {
    constructor(name: string) {
        super(`Le département ${name} existe déjà`, 'DEPARTMENT_ALREADY_EXISTS', 409);
    }
}

export class DepartmentNotEmptyError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Département (${identifier}) contient des employés` : 'Département contient des employés';
        super(msg, 'DEPARTMENT_NOT_EMPTY', 409);
    }
}

export class PositionNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Poste (${identifier}) introuvable` : 'Poste introuvable';
        super(msg, 'POSITION_NOT_FOUND', 404);
    }
}

export class PositionAlreadyExistsError extends AppError {
    constructor(name: string) {
        super(`Le poste ${name} existe déjà`, 'POSITION_ALREADY_EXISTS', 409);
    }
}

export class ContractNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Contrat (${identifier}) introuvable` : 'Contrat introuvable';
        super(msg, 'CONTRACT_NOT_FOUND', 404);
    }
}

export class ContractExpiredError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Contrat (${identifier}) expiré` : 'Contrat expiré';
        super(msg, 'CONTRACT_EXPIRED', 409);
    }
}

export class ContractAlreadyEndedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Contrat (${identifier}) déjà terminé` : 'Contrat déjà terminé';
        super(msg, 'CONTRACT_ALREADY_ENDED', 409);
    }
}

export class ContractAlreadyRenewedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Contrat (${identifier}) déjà renouvelé` : 'Contrat déjà renouvelé';
        super(msg, 'CONTRACT_ALREADY_RENEWED', 409);
    }
}

export class LeaveNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Congé (${identifier}) introuvable` : 'Congé introuvable';
        super(msg, 'LEAVE_NOT_FOUND', 404);
    }
}

export class LeaveAlreadyApprovedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Congé (${identifier}) déjà approuvé` : 'Congé déjà approuvé';
        super(msg, 'LEAVE_ALREADY_APPROVED', 409);
    }
}

export class LeaveAlreadyRejectedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Congé (${identifier}) déjà rejeté` : 'Congé déjà rejeté';
        super(msg, 'LEAVE_ALREADY_REJECTED', 409);
    }
}

export class LeaveBalanceExceededError extends AppError {
    constructor(leaveType: string, available: number, requested: number) {
        super(`Solde de congé ${leaveType} insuffisant: ${available} disponibles, ${requested} demandés`, 'LEAVE_BALANCE_EXCEEDED', 400);
    }
}

export class LeavePeriodOverlapError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Période de congé (${identifier}) en conflit` : 'Période de congé en conflit';
        super(msg, 'LEAVE_PERIOD_OVERLAP', 409);
    }
}

export class LeaveCannotCancelError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Congé (${identifier}) ne peut pas être annulé` : 'Congé ne peut pas être annulé';
        super(msg, 'LEAVE_CANNOT_CANCEL', 409);
    }
}

export class TrainingNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Formation (${identifier}) introuvable` : 'Formation introuvable';
        super(msg, 'TRAINING_NOT_FOUND', 404);
    }
}

export class TrainingAlreadyCompletedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Formation (${identifier}) déjà complétée` : 'Formation déjà complétée';
        super(msg, 'TRAINING_ALREADY_COMPLETED', 409);
    }
}

export class TrainingFullError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Formation (${identifier}) complète` : 'Formation complète';
        super(msg, 'TRAINING_FULL', 409);
    }
}

export class TrainingAlreadyEnrolledError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Déjà inscrit à la formation (${identifier})` : 'Déjà inscrit à la formation';
        super(msg, 'TRAINING_ALREADY_ENROLLED', 409);
    }
}

export class TrainingNotEnrolledError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Non inscrit à la formation (${identifier})` : 'Non inscrit à la formation';
        super(msg, 'TRAINING_NOT_ENROLLED', 409);
    }
}

export class CertificationNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Certification (${identifier}) introuvable` : 'Certification introuvable';
        super(msg, 'CERTIFICATION_NOT_FOUND', 404);
    }
}

export class CertificationExpiredError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Certification (${identifier}) expirée` : 'Certification expirée';
        super(msg, 'CERTIFICATION_EXPIRED', 409);
    }
}

export class CertificationAlreadyExistsError extends AppError {
    constructor(name: string) {
        super(`La certification ${name} existe déjà`, 'CERTIFICATION_ALREADY_EXISTS', 409);
    }
}

export class PerformanceReviewNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Évaluation (${identifier}) introuvable` : 'Évaluation introuvable';
        super(msg, 'PERFORMANCE_REVIEW_NOT_FOUND', 404);
    }
}

export class EvaluationLockedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Évaluation (${identifier}) verrouillée` : 'Évaluation verrouillée';
        super(msg, 'EVALUATION_LOCKED', 409);
    }
}

export class ReviewAlreadyCompletedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Revue (${identifier}) déjà complétée` : 'Revue déjà complétée';
        super(msg, 'REVIEW_ALREADY_COMPLETED', 409);
    }
}

export class ObjectiveNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Objectif (${identifier}) introuvable` : 'Objectif introuvable';
        super(msg, 'OBJECTIVE_NOT_FOUND', 404);
    }
}

export class PromotionNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Promotion (${identifier}) introuvable` : 'Promotion introuvable';
        super(msg, 'PROMOTION_NOT_FOUND', 404);
    }
}

export class PromotionNotAllowedError extends AppError {
    constructor(reason?: string) {
        const msg = reason || 'Promotion non autorisée';
        super(msg, 'PROMOTION_NOT_ALLOWED', 409);
    }
}

export class PromotionAlreadyApprovedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Promotion (${identifier}) déjà approuvée` : 'Promotion déjà approuvée';
        super(msg, 'PROMOTION_ALREADY_APPROVED', 409);
    }
}

export class TransferNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Transfert (${identifier}) introuvable` : 'Transfert introuvable';
        super(msg, 'TRANSFER_NOT_FOUND', 404);
    }
}

export class TransferNotAllowedError extends AppError {
    constructor(reason?: string) {
        const msg = reason || 'Transfert non autorisé';
        super(msg, 'TRANSFER_NOT_ALLOWED', 409);
    }
}

export class TransferAlreadyApprovedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Transfert (${identifier}) déjà approuvé` : 'Transfert déjà approuvé';
        super(msg, 'TRANSFER_ALREADY_APPROVED', 409);
    }
}

export class TerminationNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Rupture (${identifier}) introuvable` : 'Rupture introuvable';
        super(msg, 'TERMINATION_NOT_FOUND', 404);
    }
}

export class TerminationAlreadyProcessedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Rupture (${identifier}) déjà traitée` : 'Rupture déjà traitée';
        super(msg, 'TERMINATION_ALREADY_PROCESSED', 409);
    }
}

export class TerminationPeriodError extends AppError {
    constructor(message = 'Période de préavis insuffisante') {
        super(message, 'TERMINATION_PERIOD_ERROR', 400);
    }
}

export class DisciplinaryActionNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Action disciplinaire (${identifier}) introuvable` : 'Action disciplinaire introuvable';
        super(msg, 'DISCIPLINARY_ACTION_NOT_FOUND', 404);
    }
}

export class DisciplinaryActionAlreadyResolvedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Action disciplinaire (${identifier}) déjà résolue` : 'Action disciplinaire déjà résolue';
        super(msg, 'DISCIPLINARY_ACTION_ALREADY_RESOLVED', 409);
    }
}

export class WarningNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Avertissement (${identifier}) introuvable` : 'Avertissement introuvable';
        super(msg, 'WARNING_NOT_FOUND', 404);
    }
}

export class SuspensionNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Suspension (${identifier}) introuvable` : 'Suspension introuvable';
        super(msg, 'SUSPENSION_NOT_FOUND', 404);
    }
}

export class RewardNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Récompense (${identifier}) introuvable` : 'Récompense introuvable';
        super(msg, 'REWARD_NOT_FOUND', 404);
    }
}

export class RecruitmentNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Recrutement (${identifier}) introuvable` : 'Recrutement introuvable';
        super(msg, 'RECRUITMENT_NOT_FOUND', 404);
    }
}

export class RecruitmentClosedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Recrutement (${identifier}) fermé` : 'Recrutement fermé';
        super(msg, 'RECRUITMENT_CLOSED', 409);
    }
}

export class RecruitmentAlreadyClosedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Recrutement (${identifier}) déjà fermé` : 'Recrutement déjà fermé';
        super(msg, 'RECRUITMENT_ALREADY_CLOSED', 409);
    }
}

export class CandidateNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Candidat (${identifier}) introuvable` : 'Candidat introuvable';
        super(msg, 'CANDIDATE_NOT_FOUND', 404);
    }
}

export class CandidateAlreadyExistsError extends AppError {
    constructor(email?: string) {
        const msg = email ? `Candidat avec l'email ${email} existe déjà` : 'Candidat existe déjà';
        super(msg, 'CANDIDATE_ALREADY_EXISTS', 409);
    }
}

export class InterviewNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Entretien (${identifier}) introuvable` : 'Entretien introuvable';
        super(msg, 'INTERVIEW_NOT_FOUND', 404);
    }
}

export class InterviewAlreadyDoneError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Entretien (${identifier}) déjà réalisé` : 'Entretien déjà réalisé';
        super(msg, 'INTERVIEW_ALREADY_DONE', 409);
    }
}

export class InterviewAlreadyScheduledError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Entretien (${identifier}) déjà planifié` : 'Entretien déjà planifié';
        super(msg, 'INTERVIEW_ALREADY_SCHEDULED', 409);
    }
}

export class JobOfferNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Offre (${identifier}) introuvable` : 'Offre introuvable';
        super(msg, 'JOB_OFFER_NOT_FOUND', 404);
    }
}

export class JobOfferAlreadySentError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Offre (${identifier}) déjà envoyée` : 'Offre déjà envoyée';
        super(msg, 'JOB_OFFER_ALREADY_SENT', 409);
    }
}

export class JobOfferExpiredError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Offre (${identifier}) expirée` : 'Offre expirée';
        super(msg, 'JOB_OFFER_EXPIRED', 409);
    }
}

export class EmployeeDocumentNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Document (${identifier}) introuvable` : 'Document introuvable';
        super(msg, 'EMPLOYEE_DOCUMENT_NOT_FOUND', 404);
    }
}

export class EmployeeDocumentExpiredError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Document (${identifier}) expiré` : 'Document expiré';
        super(msg, 'EMPLOYEE_DOCUMENT_EXPIRED', 409);
    }
}

export class EmployeeDocumentAlreadyVerifiedError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Document (${identifier}) déjà vérifié` : 'Document déjà vérifié';
        super(msg, 'EMPLOYEE_DOCUMENT_ALREADY_VERIFIED', 409);
    }
}

export class EmployeeMedicalCertificateMissingError extends AppError {
    constructor() {
        super('Certificat médical requis', 'EMPLOYEE_MEDICAL_CERTIFICATE_MISSING', 400);
    }
}

export class ScheduleNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Horaire (${identifier}) introuvable` : 'Horaire introuvable';
        super(msg, 'SCHEDULE_NOT_FOUND', 404);
    }
}

export class ShiftNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Service (${identifier}) introuvable` : 'Service introuvable';
        super(msg, 'SHIFT_NOT_FOUND', 404);
    }
}

export class AttendanceAlreadyClockedInError extends AppError {
    constructor(employeeId: string) {
        super(`L'employé ${employeeId} a déjà pointé l'entrée`, 'ATTENDANCE_ALREADY_CLOCKED_IN', 409);
    }
}

export class AttendanceNotClockedInError extends AppError {
    constructor(employeeId: string) {
        super(`L'employé ${employeeId} n'a pas pointé l'entrée`, 'ATTENDANCE_NOT_CLOCKED_IN', 409);
    }
}

export class HRDashboardError extends AppError {
    constructor(message = 'Erreur lors du chargement du tableau de bord RH') {
        super(message, 'HR_DASHBOARD_ERROR', 500);
    }
}

export class HRStatisticsError extends AppError {
    constructor(message = 'Erreur lors du calcul des statistiques RH') {
        super(message, 'HR_STATISTICS_ERROR', 500);
    }
}

export class HRExportError extends AppError {
    constructor(message = 'Erreur lors de l\'export RH') {
        super(message, 'HR_EXPORT_ERROR', 500);
    }
}

export class HRImportError extends AppError {
    constructor(message = 'Erreur lors de l\'import RH') {
        super(message, 'HR_IMPORT_ERROR', 500);
    }
}

export class HRValidationError extends AppError {
    constructor(message = 'Erreur de validation RH') {
        super(message, 'HR_VALIDATION_ERROR', 400);
    }
}

export class HRPermissionError extends AppError {
    constructor(message = 'Permission RH insuffisante') {
        super(message, 'HR_PERMISSION_ERROR', 403);
    }
}

export class HRSyncError extends AppError {
    constructor(message = 'Erreur de synchronisation RH') {
        super(message, 'HR_SYNC_ERROR', 500);
    }
}

export class HRAuditError extends AppError {
    constructor(message = 'Erreur d\'audit RH') {
        super(message, 'HR_AUDIT_ERROR', 500);
    }
}

export class HRSettingsError extends AppError {
    constructor(message = 'Erreur de configuration RH') {
        super(message, 'HR_SETTINGS_ERROR', 500);
    }
}

export class HRNotificationError extends AppError {
    constructor(message = 'Erreur de notification RH') {
        super(message, 'HR_NOTIFICATION_ERROR', 500);
    }
}

export class EmployeeCodeGenerationError extends AppError {
    constructor(message = 'Erreur lors de la génération du code employé') {
        super(message, 'EMPLOYEE_CODE_GENERATION_ERROR', 500);
    }
}

export class SalaryScaleNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Échelle salariale (${identifier}) introuvable` : 'Échelle salariale introuvable';
        super(msg, 'SALARY_SCALE_NOT_FOUND', 404);
    }
}

export class BenefitNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Avantage (${identifier}) introuvable` : 'Avantage introuvable';
        super(msg, 'BENEFIT_NOT_FOUND', 404);
    }
}

export class DeductionNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Retenue (${identifier}) introuvable` : 'Retenue introuvable';
        super(msg, 'DEDUCTION_NOT_FOUND', 404);
    }
}

export class AllowanceNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Indemnité (${identifier}) introuvable` : 'Indemnité introuvable';
        super(msg, 'ALLOWANCE_NOT_FOUND', 404);
    }
}

export class PayrollReferenceNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Référence de paie (${identifier}) introuvable` : 'Référence de paie introuvable';
        super(msg, 'PAYROLL_REFERENCE_NOT_FOUND', 404);
    }
}

// ============================================================
// PHASE 2.1 — ENTERPRISE ERRORS
// ============================================================

export class EnterpriseSchoolNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `École entreprise (${identifier}) introuvable` : 'École entreprise introuvable';
        super(msg, 'ENTERPRISE_SCHOOL_NOT_FOUND', 404);
    }
}

export class EnterpriseSchoolAlreadyExistsError extends AppError {
    constructor(code: string) {
        super(`L'école avec le code ${code} existe déjà`, 'ENTERPRISE_SCHOOL_ALREADY_EXISTS', 409);
    }
}

export class EnterpriseSchoolSuspendedError extends AppError {
    constructor(schoolId: string) {
        super(`L'école ${schoolId} est suspendue`, 'ENTERPRISE_school_SUSPENDED', 409);
    }
}

export class EnterpriseSchoolBlockedError extends AppError {
    constructor(schoolId: string) {
        super(`L'école ${schoolId} est bloquée`, 'ENTERPRISE_SCHOOL_BLOCKED', 409);
    }
}

export class EnterpriseSchoolExpiredError extends AppError {
    constructor(schoolId: string) {
        super(`L'abonnement de l'école ${schoolId} est expiré`, 'ENTERPRISE_SCHOOL_EXPIRED', 409);
    }
}

export class EnterpriseSchoolArchivedError extends AppError {
    constructor(schoolId: string) {
        super(`L'école ${schoolId} est archivée`, 'ENTERPRISE_SCHOOL_ARCHIVED', 409);
    }
}

export class EnterpriseSchoolQuotaExceededError extends AppError {
    constructor(resource: string, limit: number) {
        super(`Quota dépassé pour ${resource}: limite de ${limit}`, 'ENTERPRISE_SCHOOL_QUOTA_EXCEEDED', 400);
    }
}

export class EnterpriseSubscriptionNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Abonnement (${identifier}) introuvable` : 'Abonnement introuvable';
        super(msg, 'ENTERPRISE_SUBSCRIPTION_NOT_FOUND', 404);
    }
}

export class EnterpriseSubscriptionAlreadyExistsError extends AppError {
    constructor(schoolId: string) {
        super(`Un abonnement existe déjà pour l'école ${schoolId}`, 'ENTERPRISE_SUBSCRIPTION_ALREADY_EXISTS', 409);
    }
}

export class EnterpriseSubscriptionCancelledError extends AppError {
    constructor(subscriptionId: string) {
        super(`L'abonnement ${subscriptionId} est annulé`, 'ENTERPRISE_SUBSCRIPTION_CANCELLED', 409);
    }
}

export class EnterprisePlanUpgradeRequiredError extends AppError {
    constructor(currentPlan: string, requiredPlan: string) {
        super(`Mise à niveau requise: ${currentPlan} → ${requiredPlan}`, 'ENTERPRISE_PLAN_UPGRADE_REQUIRED', 400);
    }
}

export class EnterprisePlanDowngradeError extends AppError {
    constructor() {
        super('La rétrogradation de plan n\'est pas autorisée', 'ENTERPRISE_PLAN_DOWNGRADE_NOT_ALLOWED', 400);
    }
}

export class EnterpriseTrialExpiredError extends AppError {
    constructor(schoolId: string) {
        super(`L'essai gratuit de l'école ${schoolId} est expiré`, 'ENTERPRISE_TRIAL_EXPIRED', 400);
    }
}

export class EnterpriseLicenseNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Licence (${identifier}) introuvable` : 'Licence introuvable';
        super(msg, 'ENTERPRISE_LICENSE_NOT_FOUND', 404);
    }
}

export class EnterpriseLicenseAlreadyExistsError extends AppError {
    constructor(key: string) {
        super(`La licence ${key} existe déjà`, 'ENTERPRISE_LICENSE_ALREADY_EXISTS', 409);
    }
}

export class EnterpriseLicenseExpiredError extends AppError {
    constructor(licenseId: string) {
        super(`La licence ${licenseId} est expirée`, 'ENTERPRISE_LICENSE_EXPIRED', 409);
    }
}

export class EnterpriseLicenseRevokedError extends AppError {
    constructor(licenseId: string) {
        super(`La licence ${licenseId} a été révoquée`, 'ENTERPRISE_LICENSE_REVOKED', 409);
    }
}

export class EnterpriseLicenseMaxUsersError extends AppError {
    constructor(limit: number) {
        super(`Limite d'utilisateurs atteinte: ${limit}`, 'ENTERPRISE_LICENSE_MAX_USERS', 400);
    }
}

export class EnterpriseLicenseMaxStudentsError extends AppError {
    constructor(limit: number) {
        super(`Limite d'élèves atteinte: ${limit}`, 'ENTERPRISE_LICENSE_MAX_STUDENTS', 400);
    }
}

export class EnterpriseUserNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Utilisateur entreprise (${identifier}) introuvable` : 'Utilisateur entreprise introuvable';
        super(msg, 'ENTERPRISE_USER_NOT_FOUND', 404);
    }
}

export class EnterpriseUserAlreadyExistsError extends AppError {
    constructor(email: string) {
        super(`L'utilisateur ${email} existe déjà`, 'ENTERPRISE_USER_ALREADY_EXISTS', 409);
    }
}

export class EnterpriseUserLockedError extends AppError {
    constructor(userId: string) {
        super(`L'utilisateur ${userId} est verrouillé`, 'ENTERPRISE_USER_LOCKED', 409);
    }
}

export class EnterpriseUserPermissionError extends AppError {
    constructor(permission: string) {
        super(`Permission requise: ${permission}`, 'ENTERPRISE_USER_PERMISSION_ERROR', 403);
    }
}

export class EnterpriseUserMFAReturnError extends AppError {
    constructor() {
        super('Authentification multi-facteurs requise', 'ENTERPRISE_USER_MFA_REQUIRED', 401);
    }
}

export class EnterpriseUserSessionExpiredError extends AppError {
    constructor() {
        super('Session expirée', 'ENTERPRISE_USER_SESSION_EXPIRED', 401);
    }
}

export class TicketNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Ticket (${identifier}) introuvable` : 'Ticket introuvable';
        super(msg, 'TICKET_NOT_FOUND', 404);
    }
}

export class TicketAlreadyClosedError extends AppError {
    constructor(ticketId: string) {
        super(`Le ticket ${ticketId} est déjà fermé`, 'TICKET_ALREADY_CLOSED', 409);
    }
}

export class TicketAlreadyAssignedError extends AppError {
    constructor(ticketId: string) {
        super(`Le ticket ${ticketId} est déjà assigné`, 'TICKET_ALREADY_ASSIGNED', 409);
    }
}

export class TicketSLAExceededError extends AppError {
    constructor(ticketId: string) {
        super(`Le SLA du ticket ${ticketId} est dépassé`, 'TICKET_SLA_EXCEEDED', 400);
    }
}

export class FeatureFlagNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Feature flag (${identifier}) introuvable` : 'Feature flag introuvable';
        super(msg, 'FEATURE_FLAG_NOT_FOUND', 404);
    }
}

export class FeatureFlagAlreadyExistsError extends AppError {
    constructor(key: string) {
        super(`Le feature flag ${key} existe déjà`, 'FEATURE_FLAG_ALREADY_EXISTS', 409);
    }
}

export class FeatureFlagDisabledError extends AppError {
    constructor(key: string) {
        super(`Le feature flag ${key} est désactivé`, 'FEATURE_FLAG_DISABLED', 400);
    }
}

export class EnterpriseAuditNotFoundError extends AppError {
    constructor() {
        super('Entrée d\'audit introuvable', 'ENTERPRISE_AUDIT_NOT_FOUND', 404);
    }
}

export class EnterpriseAuditExportError extends AppError {
    constructor(message = 'Erreur lors de l\'export d\'audit') {
        super(message, 'ENTERPRISE_AUDIT_EXPORT_ERROR', 500);
    }
}

export class SystemNotificationNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Notification système (${identifier}) introuvable` : 'Notification système introuvable';
        super(msg, 'SYSTEM_NOTIFICATION_NOT_FOUND', 404);
    }
}

export class SystemNotificationSendError extends AppError {
    constructor(message = 'Erreur lors de l\'envoi de la notification') {
        super(message, 'SYSTEM_NOTIFICATION_SEND_ERROR', 500);
    }
}

export class SystemSettingNotFoundError extends AppError {
    constructor(key: string) {
        super(`Paramètre système ${key} introuvable`, 'SYSTEM_SETTING_NOT_FOUND', 404);
    }
}

export class SystemSettingUpdateError extends AppError {
    constructor(key: string) {
        super(`Erreur lors de la mise à jour du paramètre ${key}`, 'SYSTEM_SETTING_UPDATE_ERROR', 500);
    }
}

export class BillingCycleNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Cycle de facturation (${identifier}) introuvable` : 'Cycle de facturation introuvable';
        super(msg, 'BILLING_CYCLE_NOT_FOUND', 404);
    }
}

export class BillingPaymentFailedError extends AppError {
    constructor(message = 'Le paiement a échoué') {
        super(message, 'BILLING_PAYMENT_FAILED', 400);
    }
}

export class BillingInvoiceError extends AppError {
    constructor(message = 'Erreur lors de la génération de la facture') {
        super(message, 'BILLING_INVOICE_ERROR', 500);
    }
}

export class StorageQuotaExceededError extends AppError {
    constructor(schoolId: string, quotaMb: number) {
        super(`Quota de stockage dépassé pour l'école ${schoolId}: ${quotaMb} Mo`, 'STORAGE_QUOTA_EXCEEDED', 400);
    }
}

export class StorageFileNotFoundError extends AppError {
    constructor(path: string) {
        super(`Fichier introuvable: ${path}`, 'STORAGE_FILE_NOT_FOUND', 404);
    }
}

export class StorageFileTooLargeError extends AppError {
    constructor(maxSizeMb: number) {
        super(`Fichier trop volumineux: maximum ${maxSizeMb} Mo`, 'STORAGE_FILE_TOO_LARGE', 400);
    }
}

export class ApiQuotaExceededError extends AppError {
    constructor(schoolId: string, quota: number) {
        super(`Quota API dépassé pour l'école ${schoolId}: ${quota} requêtes`, 'API_QUOTA_EXCEEDED', 429);
    }
}

export class ApiRateLimitError extends AppError {
    constructor(retryAfter: number) {
        super(`Trop de requêtes. Réessayez dans ${retryAfter} secondes`, 'API_RATE_LIMIT_EXCEEDED', 429);
    }
}

export class MonitoringServiceDownError extends AppError {
    constructor(service: string) {
        super(`Le service ${service} est indisponible`, 'MONITORING_SERVICE_DOWN', 503);
    }
}

export class MonitoringEventNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Événement de monitoring (${identifier}) introuvable` : 'Événement de monitoring introuvable';
        super(msg, 'MONITORING_EVENT_NOT_FOUND', 404);
    }
}

export class MaintenanceWindowConflictError extends AppError {
    constructor(startTime: string, endTime: string) {
        super(`Conflit de fenêtre de maintenance: ${startTime} - ${endTime}`, 'MAINTENANCE_WINDOW_CONFLICT', 409);
    }
}

export class MaintenanceWindowNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Fenêtre de maintenance (${identifier}) introuvable` : 'Fenêtre de maintenance introuvable';
        super(msg, 'MAINTENANCE_WINDOW_NOT_FOUND', 404);
    }
}

export class MaintenanceAlreadyInProgressError extends AppError {
    constructor() {
        super('Une maintenance est déjà en cours', 'MAINTENANCE_ALREADY_IN_PROGRESS', 409);
    }
}

export class ReleaseNoteNotFoundError extends AppError {
    constructor(identifier?: string) {
        const msg = identifier ? `Note de version (${identifier}) introuvable` : 'Note de version introuvable';
        super(msg, 'RELEASE_NOTE_NOT_FOUND', 404);
    }
}

export class SystemHealthCheckError extends AppError {
    constructor(service: string) {
        super(`Échec du contrôle de santé du service ${service}`, 'SYSTEM_HEALTH_CHECK_ERROR', 500);
    }
}

export class QuotaExceededError extends AppError {
    constructor(resource: string, limit: number) {
        super(`Quota dépassé pour ${resource}: ${limit}`, 'QUOTA_EXCEEDED', 400);
    }
}

export class EnterpriseAnalyticsError extends AppError {
    constructor(message = 'Erreur lors de l\'analyse enterprise') {
        super(message, 'ENTERPRISE_ANALYTICS_ERROR', 500);
    }
}

export class EnterpriseExportError extends AppError {
    constructor(message = 'Erreur lors de l\'export enterprise') {
        super(message, 'ENTERPRISE_EXPORT_ERROR', 500);
    }
}

export class EnterpriseImportError extends AppError {
    constructor(message = 'Erreur lors de l\'import enterprise') {
        super(message, 'ENTERPRISE_IMPORT_ERROR', 500);
    }
}

export class EnterpriseValidationError extends AppError {
    constructor(message = 'Erreur de validation enterprise') {
        super(message, 'ENTERPRISE_VALIDATION_ERROR', 400);
    }
}

export class EnterprisePermissionError extends AppError {
    constructor(message = 'Permission enterprise insuffisante') {
        super(message, 'ENTERPRISE_PERMISSION_ERROR', 403);
    }
}

export class EnterpriseSyncError extends AppError {
    constructor(message = 'Erreur de synchronisation enterprise') {
        super(message, 'ENTERPRISE_SYNC_ERROR', 500);
    }
}

export class EnterpriseDashboardError extends AppError {
    constructor(message = 'Erreur lors du chargement du tableau de bord enterprise') {
        super(message, 'ENTERPRISE_DASHBOARD_ERROR', 500);
    }
}

export class EnterpriseStatisticsError extends AppError {
    constructor(message = 'Erreur lors du calcul des statistiques enterprise') {
        super(message, 'ENTERPRISE_STATISTICS_ERROR', 500);
    }
}

export class EnterpriseSettingsError extends AppError {
    constructor(message = 'Erreur de configuration enterprise') {
        super(message, 'ENTERPRISE_SETTINGS_ERROR', 500);
    }
}

export class SchoolCloneError extends AppError {
    constructor(message = 'Erreur lors du clonage de l\'école') {
        super(message, 'SCHOOL_CLONE_ERROR', 500);
    }
}

export class SchoolMigrationError extends AppError {
    constructor(message = 'Erreur lors de la migration de l\'école') {
        super(message, 'SCHOOL_MIGRATION_ERROR', 500);
    }
}

export class SchoolActivationError extends AppError {
    constructor(message = 'Erreur lors de l\'activation de l\'école') {
        super(message, 'SCHOOL_ACTIVATION_ERROR', 500);
    }
}

export class CouponNotFoundError extends AppError {
    constructor(code: string) {
        super(`Coupon ${code} introuvable`, 'COUPON_NOT_FOUND', 404);
    }
}

export class CouponExpiredError extends AppError {
    constructor(code: string) {
        super(`Le coupon ${code} est expiré`, 'COUPON_EXPIRED', 400);
    }
}

export class CouponAlreadyUsedError extends AppError {
    constructor(code: string) {
        super(`Le coupon ${code} a déjà été utilisé`, 'COUPON_ALREADY_USED', 400);
    }
}

// ============================================================
// PHASE 2.2 — ANALYTICS & BUSINESS INTELLIGENCE ERRORS
// ============================================================

// --- Dashboard Errors ---

export class DashboardError extends AppError {
  constructor(message: string) {
    super(message, 'DASHBOARD_ERROR', 500);
  }
}

export class DashboardNotFoundError extends AppError {
  constructor(dashboardId: string) {
    super(`Dashboard not found: ${dashboardId}`, 'DASHBOARD_NOT_FOUND', 404);
  }
}

export class DashboardAccessDeniedError extends AppError {
  constructor(dashboardId: string, userId: string) {
    super(`Access denied to dashboard: ${dashboardId} for user: ${userId}`, 'DASHBOARD_ACCESS_DENIED', 403);
  }
}

export class DashboardAlreadyExistsError extends AppError {
  constructor(name: string) {
    super(`Dashboard already exists: ${name}`, 'DASHBOARD_ALREADY_EXISTS', 409);
  }
}

export class DashboardConfigError extends AppError {
  constructor(message: string) {
    super(`Dashboard config error: ${message}`, 'DASHBOARD_CONFIG_ERROR', 400);
  }
}

export class DashboardWidgetError extends AppError {
  constructor(message: string) {
    super(`Dashboard widget error: ${message}`, 'DASHBOARD_WIDGET_ERROR', 400);
  }
}

export class DashboardLayoutError extends AppError {
  constructor(message: string) {
    super(`Dashboard layout error: ${message}`, 'DASHBOARD_LAYOUT_ERROR', 400);
  }
}

export class DashboardRefreshError extends AppError {
  constructor(dashboardId: string) {
    super(`Failed to refresh dashboard: ${dashboardId}`, 'DASHBOARD_REFRESH_ERROR', 500);
  }
}

export class DashboardShareError extends AppError {
  constructor(message: string) {
    super(`Dashboard share error: ${message}`, 'DASHBOARD_SHARE_ERROR', 400);
  }
}

export class DashboardExportError extends AppError {
  constructor(message: string) {
    super(`Dashboard export error: ${message}`, 'DASHBOARD_EXPORT_ERROR', 500);
  }
}

// --- Widget Errors ---

export class WidgetError extends AppError {
  constructor(message: string) {
    super(message, 'WIDGET_ERROR', 500);
  }
}

export class WidgetNotFoundError extends AppError {
  constructor(widgetId: string) {
    super(`Widget not found: ${widgetId}`, 'WIDGET_NOT_FOUND', 404);
  }
}

export class WidgetConfigError extends AppError {
  constructor(message: string) {
    super(`Widget config error: ${message}`, 'WIDGET_CONFIG_ERROR', 400);
  }
}

export class WidgetDataError extends AppError {
  constructor(widgetId: string) {
    super(`Failed to load widget data: ${widgetId}`, 'WIDGET_DATA_ERROR', 500);
  }
}

export class WidgetRefreshError extends AppError {
  constructor(widgetId: string) {
    super(`Failed to refresh widget: ${widgetId}`, 'WIDGET_REFRESH_ERROR', 500);
  }
}

export class WidgetPositionError extends AppError {
  constructor(message: string) {
    super(`Widget position error: ${message}`, 'WIDGET_POSITION_ERROR', 400);
  }
}

// --- Chart Errors ---

export class ChartError extends AppError {
  constructor(message: string) {
    super(message, 'CHART_ERROR', 500);
  }
}

export class ChartNotFoundError extends AppError {
  constructor(chartId: string) {
    super(`Chart not found: ${chartId}`, 'CHART_NOT_FOUND', 404);
  }
}

export class ChartDataError extends AppError {
  constructor(message: string) {
    super(`Chart data error: ${message}`, 'CHART_DATA_ERROR', 400);
  }
}

export class ChartRenderError extends AppError {
  constructor(message: string) {
    super(`Chart render error: ${message}`, 'CHART_RENDER_ERROR', 500);
  }
}

export class ChartConfigError extends AppError {
  constructor(message: string) {
    super(`Chart config error: ${message}`, 'CHART_CONFIG_ERROR', 400);
  }
}

export class ChartTypeNotSupportedError extends AppError {
  constructor(chartType: string) {
    super(`Chart type not supported: ${chartType}`, 'CHART_TYPE_NOT_SUPPORTED', 400);
  }
}

export class ChartExportError extends AppError {
  constructor(message: string) {
    super(`Chart export error: ${message}`, 'CHART_EXPORT_ERROR', 500);
  }
}

// --- Report Errors ---

export class ReportError extends AppError {
  constructor(message: string) {
    super(message, 'REPORT_ERROR', 500);
  }
}

export class ReportConfigError extends AppError {
  constructor(message: string) {
    super(`Report config error: ${message}`, 'REPORT_CONFIG_ERROR', 400);
  }
}

export class ReportExecutionError extends AppError {
  constructor(reportId: string) {
    super(`Failed to execute report: ${reportId}`, 'REPORT_EXECUTION_ERROR', 500);
  }
}

export class ReportAccessDeniedError extends AppError {
  constructor(reportId: string, userId: string) {
    super(`Access denied to report: ${reportId} for user: ${userId}`, 'REPORT_ACCESS_DENIED', 403);
  }
}

export class ReportScheduleError extends AppError {
  constructor(message: string) {
    super(`Report schedule error: ${message}`, 'REPORT_SCHEDULE_ERROR', 400);
  }
}

export class ReportExportError extends AppError {
  constructor(format: string) {
    super(`Report export format not supported: ${format}`, 'REPORT_EXPORT_ERROR', 400);
  }
}

export class ReportFilterError extends AppError {
  constructor(message: string) {
    super(`Report filter error: ${message}`, 'REPORT_FILTER_ERROR', 400);
  }
}

export class ReportColumnError extends AppError {
  constructor(message: string) {
    super(`Report column error: ${message}`, 'REPORT_COLUMN_ERROR', 400);
  }
}

// --- Data Source Errors ---

export class DataSourceError extends AppError {
  constructor(message: string) {
    super(message, 'DATA_SOURCE_ERROR', 500);
  }
}

export class DataSourceNotFoundError extends AppError {
  constructor(sourceId: string) {
    super(`Data source not found: ${sourceId}`, 'DATA_SOURCE_NOT_FOUND', 404);
  }
}

export class DataSourceConnectionError extends AppError {
  constructor(sourceId: string) {
    super(`Failed to connect to data source: ${sourceId}`, 'DATA_SOURCE_CONNECTION_ERROR', 500);
  }
}

export class DataSourceQueryError extends AppError {
  constructor(message: string) {
    super(`Data source query error: ${message}`, 'DATA_SOURCE_QUERY_ERROR', 400);
  }
}

export class DataSourceTimeoutError extends AppError {
  constructor(sourceId: string) {
    super(`Data source query timeout: ${sourceId}`, 'DATA_SOURCE_TIMEOUT_ERROR', 504);
  }
}

export class DataSourcePermissionError extends AppError {
  constructor(sourceId: string) {
    super(`Permission denied for data source: ${sourceId}`, 'DATA_SOURCE_PERMISSION_ERROR', 403);
  }
}

// --- KPI Errors ---

export class KPIError extends AppError {
  constructor(message: string) {
    super(message, 'KPI_ERROR', 500);
  }
}

export class KPINotFoundError extends AppError {
  constructor(kpiId: string) {
    super(`KPI not found: ${kpiId}`, 'KPI_NOT_FOUND', 404);
  }
}

export class KPICalculationError extends AppError {
  constructor(message: string) {
    super(`KPI calculation error: ${message}`, 'KPI_CALCULATION_ERROR', 500);
  }
}

export class KPITargetError extends AppError {
  constructor(message: string) {
    super(`KPI target error: ${message}`, 'KPI_TARGET_ERROR', 400);
  }
}

// --- Predictive AI Errors ---

export class PredictiveModelError extends AppError {
  constructor(message: string) {
    super(message, 'PREDICTIVE_MODEL_ERROR', 500);
  }
}

export class ModelNotFoundError extends AppError {
  constructor(modelId: string) {
    super(`Model not found: ${modelId}`, 'MODEL_NOT_FOUND', 404);
  }
}

export class ModelTrainingError extends AppError {
  constructor(modelId: string) {
    super(`Failed to train model: ${modelId}`, 'MODEL_TRAINING_ERROR', 500);
  }
}

export class ModelPredictionError extends AppError {
  constructor(modelId: string) {
    super(`Failed to run prediction: ${modelId}`, 'MODEL_PREDICTION_ERROR', 500);
  }
}

export class ModelAccuracyError extends AppError {
  constructor(modelId: string, accuracy: number) {
    super(`Model accuracy too low: ${modelId} at ${accuracy}`, 'MODEL_ACCURACY_ERROR', 400);
  }
}

export class ModelDataInsufficientError extends AppError {
  constructor(modelId: string, required: number, available: number) {
    super(`Insufficient data for model ${modelId}: ${required} required, ${available} available`, 'MODEL_DATA_INSUFFICIENT_ERROR', 400);
  }
}

export class ModelNotReadyError extends AppError {
  constructor(modelId: string) {
    super(`Model not ready: ${modelId}`, 'MODEL_NOT_READY_ERROR', 400);
  }
}

// --- Data Warehouse Errors ---

export class DataWarehouseError extends AppError {
  constructor(message: string) {
    super(message, 'DATA_WAREHOUSE_ERROR', 500);
  }
}

export class FactTableError extends AppError {
  constructor(message: string) {
    super(`Fact table error: ${message}`, 'FACT_TABLE_ERROR', 500);
  }
}

export class DimensionError extends AppError {
  constructor(message: string) {
    super(`Dimension error: ${message}`, 'DIMENSION_ERROR', 500);
  }
}

export class ETLJobError extends AppError {
  constructor(message: string) {
    super(`ETL job error: ${message}`, 'ETL_JOB_ERROR', 500);
  }
}

export class ETLJobNotFoundError extends AppError {
  constructor(jobId: string) {
    super(`ETL job not found: ${jobId}`, 'ETL_JOB_NOT_FOUND', 404);
  }
}

export class ETLJobRunningError extends AppError {
  constructor(jobId: string) {
    super(`ETL job already running: ${jobId}`, 'ETL_JOB_RUNNING_ERROR', 409);
  }
}

export class ETLJobFailedError extends AppError {
  constructor(jobId: string) {
    super(`ETL job failed: ${jobId}`, 'ETL_JOB_FAILED_ERROR', 500);
  }
}

export class DataIngestionError extends AppError {
  constructor(message: string) {
    super(`Data ingestion error: ${message}`, 'DATA_INGESTION_ERROR', 500);
  }
}

// --- Snapshot Errors ---

export class SnapshotError extends AppError {
  constructor(message: string) {
    super(message, 'SNAPSHOT_ERROR', 500);
  }
}

export class SnapshotNotFoundError extends AppError {
  constructor(snapshotId: string) {
    super(`Snapshot not found: ${snapshotId}`, 'SNAPSHOT_NOT_FOUND', 404);
  }
}

export class SnapshotCreationError extends AppError {
  constructor(message: string) {
    super(`Failed to create snapshot: ${message}`, 'SNAPSHOT_CREATION_ERROR', 500);
  }
}

export class SnapshotRestoreError extends AppError {
  constructor(snapshotId: string) {
    super(`Failed to restore snapshot: ${snapshotId}`, 'SNAPSHOT_RESTORE_ERROR', 500);
  }
}

// --- Export/Import Errors ---

export class ExportError extends AppError {
  constructor(message: string) {
    super(message, 'EXPORT_ERROR', 500);
  }
}

export class AnalyticsImportError extends AppError {
  constructor(message: string) {
    super(message, 'IMPORT_ERROR', 500);
  }
}

export class ExportFormatError extends AppError {
  constructor(format: string) {
    super(`Export format not supported: ${format}`, 'EXPORT_FORMAT_ERROR', 400);
  }
}

export class ImportErrorDataError extends AppError {
  constructor(message: string) {
    super(`Import data error: ${message}`, 'IMPORT_DATA_ERROR', 400);
  }
}

export class ImportErrorValidation extends AppError {
  constructor(message: string) {
    super(`Import validation error: ${message}`, 'IMPORT_VALIDATION_ERROR', 400);
  }
}

export class ImportErrorFileTooLarge extends AppError {
  constructor(maxSize: number) {
    super(`Import file too large: max ${maxSize}MB`, 'IMPORT_FILE_TOO_LARGE', 400);
  }
}

export class ImportErrorEncoding extends AppError {
  constructor(message: string) {
    super(`Import encoding error: ${message}`, 'IMPORT_ENCODING_ERROR', 400);
  }
}

// --- Scheduled Report Errors ---

export class ScheduledReportError extends AppError {
  constructor(message: string) {
    super(message, 'SCHEDULED_REPORT_ERROR', 500);
  }
}

export class ScheduledReportNotFoundError extends AppError {
  constructor(id: string) {
    super(`Scheduled report not found: ${id}`, 'SCHEDULED_REPORT_NOT_FOUND', 404);
  }
}

export class ScheduledReportAlreadyExistsError extends AppError {
  constructor(reportId: string) {
    super(`Scheduled report already exists for: ${reportId}`, 'SCHEDULED_REPORT_ALREADY_EXISTS', 409);
  }
}

export class ScheduledReportExecutionError extends AppError {
  constructor(id: string) {
    super(`Failed to execute scheduled report: ${id}`, 'SCHEDULED_REPORT_EXECUTION_ERROR', 500);
  }
}

export class ScheduledReportDeliveryError extends AppError {
  constructor(id: string, channel: string) {
    super(`Failed to deliver scheduled report: ${id} via ${channel}`, 'SCHEDULED_REPORT_DELIVERY_ERROR', 500);
  }
}

// --- Aggregation Errors ---

export class AggregationError extends AppError {
  constructor(message: string) {
    super(message, 'AGGREGATION_ERROR', 500);
  }
}

export class AggregationTimeoutError extends AppError {
  constructor(message: string) {
    super(`Aggregation timeout: ${message}`, 'AGGREGATION_TIMEOUT_ERROR', 504);
  }
}

export class AggregationDataError extends AppError {
  constructor(message: string) {
    super(`Aggregation data error: ${message}`, 'AGGREGATION_DATA_ERROR', 400);
  }
}

// --- Cache Errors ---

export class AnalyticsCacheError extends AppError {
  constructor(message: string) {
    super(`Analytics cache error: ${message}`, 'ANALYTICS_CACHE_ERROR', 500);
  }
}

export class CacheInvalidationError extends AppError {
  constructor(message: string) {
    super(`Cache invalidation error: ${message}`, 'CACHE_INVALIDATION_ERROR', 500);
  }
}

// --- Permission Errors ---

export class AnalyticsPermissionError extends AppError {
  constructor(resource: string, action: string) {
    super(`Analytics permission denied: ${action} on ${resource}`, 'ANALYTICS_PERMISSION_ERROR', 403);
  }
}

export class AnalyticsUnauthorizedError extends AppError {
  constructor(message: string) {
    super(`Analytics unauthorized: ${message}`, 'ANALYTICS_UNAUTHORIZED_ERROR', 401);
  }
}

// --- Validation Errors ---

export class AnalyticsValidationError extends AppError {
  constructor(message: string) {
    super(`Analytics validation error: ${message}`, 'ANALYTICS_VALIDATION_ERROR', 400);
  }
}

export class AnalyticsDateRangeError extends AppError {
  constructor(message: string) {
    super(`Analytics date range error: ${message}`, 'ANALYTICS_DATE_RANGE_ERROR', 400);
  }
}

export class AnalyticsParameterError extends AppError {
  constructor(message: string) {
    super(`Analytics parameter error: ${message}`, 'ANALYTICS_PARAMETER_ERROR', 400);
  }
}

// ============================================================
// COMMUNICATION & COLLABORATION ERRORS
// ============================================================

// --- Conversation Errors ---

export class CommConversationError extends AppError {
  constructor(message: string, code = 'COMM_CONVERSATION_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommConversationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Conversation (${identifier}) introuvable` : 'Conversation introuvable';
    super(msg, 'COMM_CONVERSATION_NOT_FOUND', 404);
  }
}

export class CommConversationAccessDeniedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accès refusé à la conversation (${identifier})` : 'Accès refusé à la conversation';
    super(msg, 'COMM_CONVERSATION_ACCESS_DENIED', 403);
  }
}

export class CommConversationAlreadyExistsError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `La conversation (${identifier}) existe déjà` : 'La conversation existe déjà';
    super(msg, 'COMM_CONVERSATION_ALREADY_EXISTS', 409);
  }
}

export class CommConversationFullError extends AppError {
  constructor(conversationId?: string) {
    const msg = conversationId ? `La conversation (${conversationId}) est complète` : 'La conversation est complète';
    super(msg, 'COMM_CONVERSATION_FULL', 409);
  }
}

export class CommConversationArchivedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `La conversation (${identifier}) est archivée` : 'La conversation est archivée';
    super(msg, 'COMM_CONVERSATION_ARCHIVED', 409);
  }
}

export class CommConversationMutedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `La conversation (${identifier}) est mise en sourdine` : 'La conversation est mise en sourdine';
    super(msg, 'COMM_CONVERSATION_MUTED', 409);
  }
}

export class CommConversationBlockedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `La conversation (${identifier}) est bloquée` : 'La conversation est bloquée';
    super(msg, 'COMM_CONVERSATION_BLOCKED', 403);
  }
}

export class CommConversationValidationTooLongError extends AppError {
  constructor(maxLength: number) {
    super(`Le message dépasse la longueur maximale de ${maxLength} caractères`, 'COMM_CONVERSATION_VALIDATION_TOO_LONG', 400);
  }
}

export class CommConversationMaxParticipantsError extends AppError {
  constructor(max: number) {
    super(`Le nombre maximum de participants (${max}) est atteint`, 'COMM_CONVERSATION_MAX_PARTICIPANTS', 400);
  }
}

// --- Message Errors ---

export class CommMessageError extends AppError {
  constructor(message: string, code = 'COMM_MESSAGE_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommMessageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Message (${identifier}) introuvable` : 'Message introuvable';
    super(msg, 'COMM_MESSAGE_NOT_FOUND', 404);
  }
}

export class CommMessageAccessDeniedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accès refusé au message (${identifier})` : 'Accès refusé au message';
    super(msg, 'COMM_MESSAGE_ACCESS_DENIED', 403);
  }
}

export class CommMessageTooLongError extends AppError {
  constructor(maxLength: number) {
    super(`Message dépassant la longueur maximale de ${maxLength} caractères`, 'COMM_MESSAGE_TOO_LONG', 400);
  }
}

export class CommMessageDeletedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le message (${identifier}) a été supprimé` : 'Le message a été supprimé';
    super(msg, 'COMM_MESSAGE_DELETED', 409);
  }
}

export class MessageEditExpiredError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le délai d'édition du message (${identifier}) est expiré` : 'Le délai d\'édition du message est expiré';
    super(msg, 'MESSAGE_EDIT_EXPIRED', 409);
  }
}

export class MessageReplyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le message de réponse (${identifier}) est introuvable` : 'Le message de réponse est introuvable';
    super(msg, 'MESSAGE_REPLY_NOT_FOUND', 404);
  }
}

export class MessageDuplicateError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Message en double détecté (${identifier})` : 'Message en double détecté';
    super(msg, 'MESSAGE_DUPLICATE', 409);
  }
}

export class MessageRateLimitError extends AppError {
  constructor(retryAfterMs = 60_000) {
    super('Trop de messages envoyés. Veuillez patienter.', 'MESSAGE_RATE_LIMIT', 429);
    this.retryAfterMs = retryAfterMs;
  }
  public readonly retryAfterMs: number;
}

export class MessageAttachmentTooLargeError extends AppError {
  constructor(maxSize: string) {
    super(`Pièce jointe dépassant la taille maximale de ${maxSize}`, 'MESSAGE_ATTACHMENT_TOO_LARGE', 400);
  }
}

export class MessageAttachmentNotAllowedError extends AppError {
  constructor(mimeType: string) {
    super(`Type de fichier non autorisé: ${mimeType}`, 'MESSAGE_ATTACHMENT_NOT_ALLOWED', 400);
  }
}

export class MessageScheduledError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le message (${identifier}) est planifié et ne peut pas être modifié` : 'Le message est planifié et ne peut pas être modifié';
    super(msg, 'MESSAGE_SCHEDULED', 409);
  }
}

export class MessageExpiredError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le message (${identifier}) a expiré` : 'Le message a expiré';
    super(msg, 'MESSAGE_EXPIRED', 410);
  }
}

export class MessageThreadLockedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le fil de discussion (${identifier}) est verrouillé` : 'Le fil de discussion est verrouillé';
    super(msg, 'MESSAGE_THREAD_LOCKED', 409);
  }
}

export class MessagePinnedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le message (${identifier}) est épinglé et ne peut pas être supprimé` : 'Le message est épinglé et ne peut pas être supprimé';
    super(msg, 'MESSAGE_PINNED', 409);
  }
}

// --- Group Errors ---

export class GroupError extends AppError {
  constructor(message: string, code = 'GROUP_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommGroupError extends AppError {
  constructor(message = 'Erreur de groupe dans la communication') {
    super(message, 'COMM_GROUP_ERROR', 500);
  }
}

export class CommGroupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Groupe (${identifier}) introuvable` : 'Groupe introuvable';
    super(msg, 'COMM_GROUP_NOT_FOUND', 404);
  }
}

export class CommGroupAccessDeniedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accès refusé au groupe (${identifier})` : 'Accès refusé au groupe';
    super(msg, 'COMM_GROUP_ACCESS_DENIED', 403);
  }
}

export class CommGroupAlreadyExistsError extends AppError {
  constructor(name: string) {
    super(`Le groupe "${name}" existe déjà`, 'COMM_GROUP_ALREADY_EXISTS', 409);
  }
}

export class CommGroupFullError extends AppError {
  constructor(groupName: string) {
    super(`Le groupe "${groupName}" est complet`, 'COMM_GROUP_FULL', 409);
  }
}

export class CommGroupMemberNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Membre (${identifier}) introuvable dans le groupe` : 'Membre introuvable dans le groupe';
    super(msg, 'COMM_GROUP_MEMBER_NOT_FOUND', 404);
  }
}

export class GroupRoleError extends AppError {
  constructor(role: string) {
    super(`Rôle invalide: ${role}`, 'GROUP_ROLE_ERROR', 400);
  }
}

export class GroupInviteError extends AppError {
  constructor(message = 'Erreur lors de l\'invitation au groupe') {
    super(message, 'GROUP_INVITE_ERROR', 400);
  }
}

export class GroupInviteExpiredError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `L'invitation (${identifier}) a expiré` : 'L\'invitation a expiré';
    super(msg, 'GROUP_INVITE_EXPIRED', 410);
  }
}

export class GroupSettingsError extends AppError {
  constructor(message = 'Erreur de configuration du groupe') {
    super(message, 'GROUP_SETTINGS_ERROR', 400);
  }
}

// --- Call Errors ---

export class CallError extends AppError {
  constructor(message: string, code = 'CALL_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CallNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Appel (${identifier}) introuvable` : 'Appel introuvable';
    super(msg, 'CALL_NOT_FOUND', 404);
  }
}

export class CallAlreadyActiveError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Un appel actif existe déjà (${identifier})` : 'Un appel actif existe déjà';
    super(msg, 'CALL_ALREADY_ACTIVE', 409);
  }
}

export class CallFullError extends AppError {
  constructor(callId: string) {
    super(`L'appel ${callId} est complet`, 'CALL_FULL', 409);
  }
}

export class CallNotActiveError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `L'appel (${identifier}) n'est pas actif` : 'L\'appel n\'est pas actif';
    super(msg, 'CALL_NOT_ACTIVE', 409);
  }
}

export class CallRecordingError extends AppError {
  constructor(message = 'Erreur lors de l\'enregistrement de l\'appel') {
    super(message, 'CALL_RECORDING_ERROR', 500);
  }
}

export class CallParticipantNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Participant (${identifier}) introuvable dans l'appel` : 'Participant introuvable dans l\'appel';
    super(msg, 'CALL_PARTICIPANT_NOT_FOUND', 404);
  }
}

export class CallPermissionError extends AppError {
  constructor(message = 'Permission insuffisante pour cet appel') {
    super(message, 'CALL_PERMISSION_ERROR', 403);
  }
}

export class CallTimeoutError extends AppError {
  constructor(callId?: string) {
    const msg = callId ? `L'appel ${callId} a expiré` : 'L\'appel a expiré';
    super(msg, 'CALL_TIMEOUT', 408);
  }
}

export class CallQualityError extends AppError {
  constructor(message = 'Qualité de l\'appel insuffisante') {
    super(message, 'CALL_QUALITY_ERROR', 500);
  }
}

// --- Email Errors ---

export class EmailError extends AppError {
  constructor(message: string, code = 'EMAIL_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class EmailNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Email (${identifier}) introuvable` : 'Email introuvable';
    super(msg, 'EMAIL_NOT_FOUND', 404);
  }
}

export class EmailSendError extends AppError {
  constructor(message = 'Erreur lors de l\'envoi de l\'email') {
    super(message, 'EMAIL_SEND_ERROR', 500);
  }
}

export class EmailTemplateError extends AppError {
  constructor(message = 'Erreur de template email') {
    super(message, 'EMAIL_TEMPLATE_ERROR', 400);
  }
}

export class EmailTemplateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Template email (${identifier}) introuvable` : 'Template email introuvable';
    super(msg, 'EMAIL_TEMPLATE_NOT_FOUND', 404);
  }
}

export class EmailCampaignError extends AppError {
  constructor(message = 'Erreur de campagne email') {
    super(message, 'EMAIL_CAMPAIGN_ERROR', 400);
  }
}

export class EmailCampaignNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Campagne email (${identifier}) introuvable` : 'Campagne email introuvable';
    super(msg, 'EMAIL_CAMPAIGN_NOT_FOUND', 404);
  }
}

export class EmailTrackingError extends AppError {
  constructor(message = 'Erreur de suivi email') {
    super(message, 'EMAIL_TRACKING_ERROR', 400);
  }
}

export class EmailBouncedError extends AppError {
  constructor(email?: string) {
    const msg = email ? `L'email ${email} a bounce` : 'L\'email a bounce';
    super(msg, 'EMAIL_BOUNCED', 400);
  }
}

export class EmailRateLimitError extends AppError {
  constructor(retryAfterMs = 60_000) {
    super('Trop d\'emails envoyés. Veuillez patienter.', 'EMAIL_RATE_LIMIT', 429);
    this.retryAfterMs = retryAfterMs;
  }
  public readonly retryAfterMs: number;
}

export class EmailInvalidAddressError extends AppError {
  constructor(email: string) {
    super(`Adresse email invalide: ${email}`, 'EMAIL_INVALID_ADDRESS', 400);
  }
}

export class EmailAttachmentError extends AppError {
  constructor(message = 'Erreur avec la pièce jointe email') {
    super(message, 'EMAIL_ATTACHMENT_ERROR', 400);
  }
}

// --- SMS Errors ---

export class SmsError extends AppError {
  constructor(message: string, code = 'SMS_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class SmsNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `SMS (${identifier}) introuvable` : 'SMS introuvable';
    super(msg, 'SMS_NOT_FOUND', 404);
  }
}

export class SmsSendError extends AppError {
  constructor(message = 'Erreur lors de l\'envoi du SMS') {
    super(message, 'SMS_SEND_ERROR', 500);
  }
}

export class SmsTemplateError extends AppError {
  constructor(message = 'Erreur de template SMS') {
    super(message, 'SMS_TEMPLATE_ERROR', 400);
  }
}

export class SmsTemplateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Template SMS (${identifier}) introuvable` : 'Template SMS introuvable';
    super(msg, 'SMS_TEMPLATE_NOT_FOUND', 404);
  }
}

export class SmsBulkError extends AppError {
  constructor(message = 'Erreur lors de l\'envoi en masse de SMS') {
    super(message, 'SMS_BULK_ERROR', 500);
  }
}

export class SmsBulkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Envoi en masse SMS (${identifier}) introuvable` : 'Envoi en masse SMS introuvable';
    super(msg, 'SMS_BULK_NOT_FOUND', 404);
  }
}

export class SmsProviderError extends AppError {
  constructor(provider: string, message = 'Erreur du fournisseur SMS') {
    super(`${message}: ${provider}`, 'SMS_PROVIDER_ERROR', 502);
  }
}

export class SmsRateLimitError extends AppError {
  constructor(retryAfterMs = 60_000) {
    super('Trop de SMS envoyés. Veuillez patienter.', 'SMS_RATE_LIMIT', 429);
    this.retryAfterMs = retryAfterMs;
  }
  public readonly retryAfterMs: number;
}

export class SmsInsufficientCreditsError extends AppError {
  constructor(available: number, required: number) {
    super(`Crédits SMS insuffisants: ${available} disponibles, ${required} requis`, 'SMS_INSUFFICIENT_CREDITS', 400);
  }
}

// --- Push Errors ---

export class PushError extends AppError {
  constructor(message: string, code = 'PUSH_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class PushNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Notification push (${identifier}) introuvable` : 'Notification push introuvable';
    super(msg, 'PUSH_NOT_FOUND', 404);
  }
}

export class PushSendError extends AppError {
  constructor(message = 'Erreur lors de l\'envoi de la notification push') {
    super(message, 'PUSH_SEND_ERROR', 500);
  }
}

export class PushTemplateError extends AppError {
  constructor(message = 'Erreur de template push') {
    super(message, 'PUSH_TEMPLATE_ERROR', 400);
  }
}

export class PushTemplateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Template push (${identifier}) introuvable` : 'Template push introuvable';
    super(msg, 'PUSH_TEMPLATE_NOT_FOUND', 404);
  }
}

export class PushSubscriptionError extends AppError {
  constructor(message = 'Erreur d\'abonnement push') {
    super(message, 'PUSH_SUBSCRIPTION_ERROR', 400);
  }
}

export class PushPlatformError extends AppError {
  constructor(platform: string) {
    super(`Plateforme push non supportée: ${platform}`, 'PUSH_PLATFORM_ERROR', 400);
  }
}

export class PushPayloadError extends AppError {
  constructor(message = 'Payload push invalide') {
    super(message, 'PUSH_PAYLOAD_ERROR', 400);
  }
}

export class PushRateLimitError extends AppError {
  constructor(retryAfterMs = 60_000) {
    super('Trop de notifications push envoyées. Veuillez patienter.', 'PUSH_RATE_LIMIT', 429);
    this.retryAfterMs = retryAfterMs;
  }
  public readonly retryAfterMs: number;
}

export class PushDeviceTokenError extends AppError {
  constructor(message = 'Token d\'appareil push invalide') {
    super(message, 'PUSH_DEVICE_TOKEN_ERROR', 400);
  }
}

// --- Announcement Errors ---

export class AnnouncementError extends AppError {
  constructor(message: string, code = 'COMM_ANNOUNCEMENT_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommAnnouncementNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Annonce (${identifier}) introuvable` : 'Annonce introuvable';
    super(msg, 'COMM_ANNOUNCEMENT_NOT_FOUND', 404);
  }
}

export class CommAnnouncementAccessDeniedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accès refusé à l'annonce (${identifier})` : 'Accès refusé à l\'annonce';
    super(msg, 'COMM_ANNOUNCEMENT_ACCESS_DENIED', 403);
  }
}

export class AnnouncementScheduleError extends AppError {
  constructor(message = 'Erreur de planification de l\'annonce') {
    super(message, 'ANNOUNCEMENT_SCHEDULE_ERROR', 400);
  }
}

export class AnnouncementTargetError extends AppError {
  constructor(message = 'Cible de l\'annonce invalide') {
    super(message, 'ANNOUNCEMENT_TARGET_ERROR', 400);
  }
}

export class AnnouncementPriorityError extends AppError {
  constructor(priority: string) {
    super(`Priorité d'annonce invalide: ${priority}`, 'ANNOUNCEMENT_PRIORITY_ERROR', 400);
  }
}

export class CommAnnouncementAlreadyPublishedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `L'annonce (${identifier}) est déjà publiée` : 'L\'annonce est déjà publiée';
    super(msg, 'COMM_ANNOUNCEMENT_ALREADY_PUBLISHED', 409);
  }
}

export class CommAnnouncementExpiredError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `L'annonce (${identifier}) a expiré` : 'L\'annonce a expiré';
    super(msg, 'COMM_ANNOUNCEMENT_EXPIRED', 410);
  }
}

export class AnnouncementAcknowledgeError extends AppError {
  constructor(message = 'Erreur lors de l\'accusé de réception de l\'annonce') {
    super(message, 'ANNOUNCEMENT_ACKNOWLEDGE_ERROR', 400);
  }
}

export class AnnouncementBulkError extends AppError {
  constructor(message = 'Erreur lors de l\'envoi en masse d\'annonces') {
    super(message, 'ANNOUNCEMENT_BULK_ERROR', 500);
  }
}

// --- Calendar Errors ---

export class CommCalendarError extends AppError {
  constructor(message: string, code = 'COMM_CALENDAR_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommCalendarEventNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Événement calendrier (${identifier}) introuvable` : 'Événement calendrier introuvable';
    super(msg, 'COMM_CALENDAR_EVENT_NOT_FOUND', 404);
  }
}

export class CommCalendarEventConflictError extends AppError {
  constructor(message = 'Conflit d\'événement calendrier') {
    super(message, 'COMM_CALENDAR_EVENT_CONFLICT', 409);
  }
}

export class CommCalendarEventPastError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `L'événement (${identifier}) est dans le passé` : 'L\'événement est dans le passé';
    super(msg, 'COMM_CALENDAR_EVENT_PAST', 409);
  }
}

export class CommCalendarRecurrenceError extends AppError {
  constructor(message = 'Erreur de récurrence calendrier') {
    super(message, 'COMM_CALENDAR_RECURRENCE_ERROR', 400);
  }
}

export class CommCalendarReminderError extends AppError {
  constructor(message = 'Erreur de rappel calendrier') {
    super(message, 'COMM_CALENDAR_REMINDER_ERROR', 400);
  }
}

export class CommCalendarAttendeeError extends AppError {
  constructor(message = 'Erreur de participant calendrier') {
    super(message, 'COMM_CALENDAR_ATTENDEE_ERROR', 400);
  }
}

export class CommCalendarPermissionError extends AppError {
  constructor(message = 'Permission calendrier insuffisante') {
    super(message, 'COMM_CALENDAR_PERMISSION_ERROR', 403);
  }
}

export class CommCalendarSyncError extends AppError {
  constructor(message = 'Erreur de synchronisation calendrier') {
    super(message, 'COMM_CALENDAR_SYNC_ERROR', 500);
  }
}

export class CommCalendarExportError extends AppError {
  constructor(message = 'Erreur lors de l\'export calendrier') {
    super(message, 'COMM_CALENDAR_EXPORT_ERROR', 500);
  }
}

export class CommCalendarImportError extends AppError {
  constructor(message = 'Erreur lors de l\'import calendrier') {
    super(message, 'COMM_CALENDAR_IMPORT_ERROR', 400);
  }
}

export class CommCalendarSubscriptionError extends AppError {
  constructor(message = 'Erreur d\'abonnement calendrier') {
    super(message, 'COMM_CALENDAR_SUBSCRIPTION_ERROR', 400);
  }
}

// --- Task Errors ---

export class CommTaskError extends AppError {
  constructor(message: string, code = 'COMM_TASK_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommTaskNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tâche (${identifier}) introuvable` : 'Tâche introuvable';
    super(msg, 'COMM_TASK_NOT_FOUND', 404);
  }
}

export class CommTaskAccessDeniedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accès refusé à la tâche (${identifier})` : 'Accès refusé à la tâche';
    super(msg, 'COMM_TASK_ACCESS_DENIED', 403);
  }
}

export class CommTaskAlreadyCompletedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `La tâche (${identifier}) est déjà terminée` : 'La tâche est déjà terminée';
    super(msg, 'COMM_TASK_ALREADY_COMPLETED', 409);
  }
}

export class CommTaskDeadlineError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `La date limite de la tâche (${identifier}) est dépassée` : 'La date limite de la tâche est dépassée';
    super(msg, 'COMM_TASK_DEADLINE_ERROR', 400);
  }
}

export class CommTaskDependencyError extends AppError {
  constructor(message = 'Erreur de dépendance de tâche') {
    super(message, 'COMM_TASK_DEPENDENCY_ERROR', 400);
  }
}

export class CommTaskChecklistError extends AppError {
  constructor(message = 'Erreur de liste de vérification de tâche') {
    super(message, 'COMM_TASK_CHECKLIST_ERROR', 400);
  }
}

export class CommTaskAssigneeError extends AppError {
  constructor(message = 'Erreur d\'assignation de tâche') {
    super(message, 'COMM_TASK_ASSIGNEE_ERROR', 400);
  }
}

export class CommTaskPermissionError extends AppError {
  constructor(message = 'Permission tâche insuffisante') {
    super(message, 'COMM_TASK_PERMISSION_ERROR', 403);
  }
}

export class CommTaskBulkError extends AppError {
  constructor(message = 'Erreur lors de l\'action en masse sur les tâches') {
    super(message, 'COMM_TASK_BULK_ERROR', 500);
  }
}

export class CommTaskTemplateError extends AppError {
  constructor(message = 'Erreur de template de tâche') {
    super(message, 'COMM_TASK_TEMPLATE_ERROR', 400);
  }
}

export class CommTaskRecurringError extends AppError {
  constructor(message = 'Erreur de tâche récurrente') {
    super(message, 'COMM_TASK_RECURRING_ERROR', 400);
  }
}

// --- Document Errors ---

export class CommDocumentError extends AppError {
  constructor(message: string, code = 'COMM_DOCUMENT_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommDocumentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Document (${identifier}) introuvable` : 'Document introuvable';
    super(msg, 'COMM_DOCUMENT_NOT_FOUND', 404);
  }
}

export class CommDocumentAccessDeniedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accès refusé au document (${identifier})` : 'Accès refusé au document';
    super(msg, 'COMM_DOCUMENT_ACCESS_DENIED', 403);
  }
}

export class CommDocumentAlreadyExistsError extends AppError {
  constructor(name: string) {
    super(`Le document "${name}" existe déjà`, 'COMM_DOCUMENT_ALREADY_EXISTS', 409);
  }
}

export class CommDocumentStorageError extends AppError {
  constructor(message = 'Erreur de stockage du document') {
    super(message, 'COMM_DOCUMENT_STORAGE_ERROR', 500);
  }
}

export class CommDocumentVersionError extends AppError {
  constructor(message = 'Erreur de version du document') {
    super(message, 'COMM_DOCUMENT_VERSION_ERROR', 400);
  }
}

export class CommDocumentPermissionError extends AppError {
  constructor(message = 'Permission document insuffisante') {
    super(message, 'COMM_DOCUMENT_PERMISSION_ERROR', 403);
  }
}

export class CommDocumentCommentError extends AppError {
  constructor(message = 'Erreur de commentaire sur le document') {
    super(message, 'COMM_DOCUMENT_COMMENT_ERROR', 400);
  }
}

export class CommDocumentPreviewError extends AppError {
  constructor(message = 'Erreur de prévisualisation du document') {
    super(message, 'COMM_DOCUMENT_PREVIEW_ERROR', 500);
  }
}

export class CommDocumentShareError extends AppError {
  constructor(message = 'Erreur de partage du document') {
    super(message, 'COMM_DOCUMENT_SHARE_ERROR', 400);
  }
}

export class CommDocumentDeleteError extends AppError {
  constructor(message = 'Erreur lors de la suppression du document') {
    super(message, 'COMM_DOCUMENT_DELETE_ERROR', 400);
  }
}

export class CommDocumentMoveError extends AppError {
  constructor(message = 'Erreur lors du déplacement du document') {
    super(message, 'COMM_DOCUMENT_MOVE_ERROR', 400);
  }
}

// --- Collaboration Errors ---

export class CommCollaborationError extends AppError {
  constructor(message: string, code = 'COMM_COLLABORATION_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommCollaborationSessionError extends AppError {
  constructor(message = 'Erreur de session de collaboration') {
    super(message, 'COMM_COLLABORATION_SESSION_ERROR', 500);
  }
}

export class CommCollaborationConflictError extends AppError {
  constructor(message = 'Conflit de collaboration détecté') {
    super(message, 'COMM_COLLABORATION_CONFLICT', 409);
  }
}

export class CommCollaborationPresenceError extends AppError {
  constructor(message = 'Erreur de présence en collaboration') {
    super(message, 'COMM_COLLABORATION_PRESENCE_ERROR', 500);
  }
}

export class CommCollaborationCursorError extends AppError {
  constructor(message = 'Erreur de curseur de collaboration') {
    super(message, 'COLLABORATION_CURSOR_ERROR', 500);
  }
}

export class CollaborationPermissionError extends AppError {
  constructor(message = 'Permission de collaboration insuffisante') {
    super(message, 'COLLABORATION_PERMISSION_ERROR', 403);
  }
}

export class CollaborationTimeoutError extends AppError {
  constructor(message = 'Session de collaboration expirée') {
    super(message, 'COLLABORATION_TIMEOUT', 408);
  }
}

export class CollaborationVersionError extends AppError {
  constructor(message = 'Erreur de version de collaboration') {
    super(message, 'COLLABORATION_VERSION_ERROR', 409);
  }
}

// --- AI Errors ---

export class AISummaryError extends AppError {
  constructor(message = 'Erreur lors de la génération du résumé IA') {
    super(message, 'AI_SUMMARY_ERROR', 500);
  }
}

export class AITranslationError extends AppError {
  constructor(message = 'Erreur lors de la traduction IA') {
    super(message, 'AI_TRANSLATION_ERROR', 500);
  }
}

export class AICorrectionError extends AppError {
  constructor(message = 'Erreur lors de la correction IA') {
    super(message, 'AI_CORRECTION_ERROR', 500);
  }
}

export class AIResponseError extends AppError {
  constructor(message = 'Erreur lors de la génération de la réponse IA') {
    super(message, 'AI_RESPONSE_ERROR', 500);
  }
}

export class AIMeetingSummaryError extends AppError {
  constructor(message = 'Erreur lors du résumé de réunion IA') {
    super(message, 'AI_MEETING_SUMMARY_ERROR', 500);
  }
}

export class AISpamDetectionError extends AppError {
  constructor(message = 'Erreur lors de la détection de spam IA') {
    super(message, 'AI_SPAM_DETECTION_ERROR', 500);
  }
}

export class AIModelNotAvailableError extends AppError {
  constructor(model?: string) {
    const msg = model ? `Modèle IA non disponible: ${model}` : 'Modèle IA non disponible';
    super(msg, 'AI_MODEL_NOT_AVAILABLE', 503);
  }
}

export class AITokenLimitError extends AppError {
  constructor(limit: number) {
    super(`Limite de tokens IA dépassée: ${limit}`, 'AI_TOKEN_LIMIT', 400);
  }
}

export class AILanguageNotSupportedError extends AppError {
  constructor(language: string) {
    super(`Langue non supportée par l'IA: ${language}`, 'AI_LANGUAGE_NOT_SUPPORTED', 400);
  }
}

export class AIAccuracyError extends AppError {
  constructor(accuracy: number, threshold: number) {
    super(`Précision IA insuffisante: ${accuracy}% (seuil: ${threshold}%)`, 'AI_ACCURACY_ERROR', 400);
  }
}

export class CommAIError extends AppError {
  constructor(message = 'Erreur IA dans la communication') {
    super(message, 'COMM_AI_ERROR', 500);
  }
}

// --- Notification Errors ---

export class CommNotificationError extends AppError {
  constructor(message: string, code = 'COMM_NOTIFICATION_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommNotificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Notification (${identifier}) introuvable` : 'Notification introuvable';
    super(msg, 'COMM_NOTIFICATION_NOT_FOUND', 404);
  }
}

export class CommNotificationPreferenceError extends AppError {
  constructor(message = 'Erreur de préférence de notification') {
    super(message, 'COMM_NOTIFICATION_PREFERENCE_ERROR', 400);
  }
}

export class CommNotificationChannelError extends AppError {
  constructor(channel: string) {
    super(`Canal de notification invalide: ${channel}`, 'COMM_NOTIFICATION_CHANNEL_ERROR', 400);
  }
}

export class NotificationRateLimitError extends AppError {
  constructor(retryAfterMs = 60_000) {
    super('Trop de notifications envoyées. Veuillez patienter.', 'NOTIFICATION_RATE_LIMIT', 429);
    this.retryAfterMs = retryAfterMs;
  }
  public readonly retryAfterMs: number;
}

export class NotificationBatchError extends AppError {
  constructor(message = 'Erreur lors de l\'envoi en masse de notifications') {
    super(message, 'NOTIFICATION_BATCH_ERROR', 500);
  }
}

export class NotificationTemplateError extends AppError {
  constructor(message = 'Erreur de template de notification') {
    super(message, 'NOTIFICATION_TEMPLATE_ERROR', 400);
  }
}

export class NotificationDeliveryError extends AppError {
  constructor(message = 'Erreur de livraison de notification') {
    super(message, 'NOTIFICATION_DELIVERY_ERROR', 500);
  }
}

export class NotificationPermissionError extends AppError {
  constructor(message = 'Permission de notification insuffisante') {
    super(message, 'NOTIFICATION_PERMISSION_ERROR', 403);
  }
}

export class NotificationScheduleError extends AppError {
  constructor(message = 'Erreur de planification de notification') {
    super(message, 'NOTIFICATION_SCHEDULE_ERROR', 400);
  }
}

// --- Poll Errors ---

export class PollError extends AppError {
  constructor(message: string, code = 'POLL_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class PollNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Sondage (${identifier}) introuvable` : 'Sondage introuvable';
    super(msg, 'POLL_NOT_FOUND', 404);
  }
}

export class PollClosedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le sondage (${identifier}) est fermé` : 'Le sondage est fermé';
    super(msg, 'POLL_CLOSED', 409);
  }
}

export class PollAlreadyVotedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Vous avez déjà voté au sondage (${identifier})` : 'Vous avez déjà voté à ce sondage';
    super(msg, 'POLL_ALREADY_VOTED', 409);
  }
}

export class PollAnonymousError extends AppError {
  constructor(message = 'Les sondages anonymes ne permettent pas de consulter les votes') {
    super(message, 'POLL_ANONYMOUS', 403);
  }
}

export class PollExpirationError extends AppError {
  constructor(message = 'Erreur d\'expiration du sondage') {
    super(message, 'POLL_EXPIRATION_ERROR', 400);
  }
}

// --- Contact Errors ---

export class ContactError extends AppError {
  constructor(message: string, code = 'CONTACT_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class ContactNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Contact (${identifier}) introuvable` : 'Contact introuvable';
    super(msg, 'CONTACT_NOT_FOUND', 404);
  }
}

export class ContactAlreadyExistsError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le contact (${identifier}) existe déjà` : 'Le contact existe déjà';
    super(msg, 'CONTACT_ALREADY_EXISTS', 409);
  }
}

export class ContactGroupError extends AppError {
  constructor(message = 'Erreur de groupe de contacts') {
    super(message, 'CONTACT_GROUP_ERROR', 400);
  }
}

export class ContactPermissionError extends AppError {
  constructor(message = 'Permission contact insuffisante') {
    super(message, 'CONTACT_PERMISSION_ERROR', 403);
  }
}

export class ContactSyncError extends AppError {
  constructor(message = 'Erreur de synchronisation des contacts') {
    super(message, 'CONTACT_SYNC_ERROR', 500);
  }
}

// --- Search Errors (Comm) ---

export class CommSearchError extends AppError {
  constructor(message: string, code = 'COMM_SEARCH_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class CommSearchQueryTooShortError extends AppError {
  constructor(minLength: number) {
    super(`La requête de recherche doit contenir au moins ${minLength} caractère(s)`, 'COMM_SEARCH_QUERY_TOO_SHORT', 400);
  }
}

export class CommSearchIndexError extends AppError {
  constructor(message = 'Erreur d\'index de recherche') {
    super(message, 'COMM_SEARCH_INDEX_ERROR', 500);
  }
}

export class CommSearchTimeoutError extends AppError {
  constructor(message = 'La recherche a expiré') {
    super(message, 'COMM_SEARCH_TIMEOUT', 504);
  }
}

// --- Export Errors ---

export class ExportTooLargeError extends AppError {
  constructor(maxSize: string) {
    super(`L'export dépasse la taille maximale de ${maxSize}`, 'EXPORT_TOO_LARGE', 400);
  }
}

export class ExportRateLimitError extends AppError {
  constructor(retryAfterMs = 60_000) {
    super('Trop d\'exports demandés. Veuillez patienter.', 'EXPORT_RATE_LIMIT', 429);
    this.retryAfterMs = retryAfterMs;
  }
  public readonly retryAfterMs: number;
}

// --- Webhook Errors ---

export class WebhookError extends AppError {
  constructor(message: string, code = 'WEBHOOK_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class WebhookNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Webhook (${identifier}) introuvable` : 'Webhook introuvable';
    super(msg, 'WEBHOOK_NOT_FOUND', 404);
  }
}

export class WebhookDeliveryError extends AppError {
  constructor(webhookId?: string) {
    const msg = webhookId ? `Échec de livraison du webhook (${webhookId})` : 'Échec de livraison du webhook';
    super(msg, 'WEBHOOK_DELIVERY_ERROR', 500);
  }
}

export class WebhookSignatureError extends AppError {
  constructor(message = 'Signature webhook invalide') {
    super(message, 'WEBHOOK_SIGNATURE_ERROR', 401);
  }
}

// --- Channel Errors ---

export class ChannelError extends AppError {
  constructor(message: string, code = 'CHANNEL_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class ChannelNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Canal (${identifier}) introuvable` : 'Canal introuvable';
    super(msg, 'CHANNEL_NOT_FOUND', 404);
  }
}

export class ChannelAccessDeniedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accès refusé au canal (${identifier})` : 'Accès refusé au canal';
    super(msg, 'CHANNEL_ACCESS_DENIED', 403);
  }
}

export class ChannelAlreadyExistsError extends AppError {
  constructor(name: string) {
    super(`Le canal "${name}" existe déjà`, 'CHANNEL_ALREADY_EXISTS', 409);
  }
}

export class ChannelFullError extends AppError {
  constructor(channelName: string) {
    super(`Le canal "${channelName}" est complet`, 'CHANNEL_FULL', 409);
  }
}

export class ChannelSettingsError extends AppError {
  constructor(message = 'Erreur de configuration du canal') {
    super(message, 'CHANNEL_SETTINGS_ERROR', 400);
  }
}

// --- Thread Errors ---

export class ThreadError extends AppError {
  constructor(message: string, code = 'THREAD_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class ThreadNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Fil de discussion (${identifier}) introuvable` : 'Fil de discussion introuvable';
    super(msg, 'THREAD_NOT_FOUND', 404);
  }
}

export class ThreadLockedError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Le fil de discussion (${identifier}) est verrouillé` : 'Le fil de discussion est verrouillé';
    super(msg, 'THREAD_LOCKED', 409);
  }
}

export class ThreadDepthError extends AppError {
  constructor(maxDepth: number) {
    super(`Profondeur maximale du fil de discussion atteinte: ${maxDepth}`, 'THREAD_DEPTH_ERROR', 400);
  }
}

// --- Presence Errors ---

export class PresenceError extends AppError {
  constructor(message: string, code = 'PRESENCE_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class PresenceUpdateError extends AppError {
  constructor(message = 'Erreur de mise à jour de la présence') {
    super(message, 'PRESENCE_UPDATE_ERROR', 500);
  }
}

export class PresenceSubscriptionError extends AppError {
  constructor(message = 'Erreur d\'abonnement à la présence') {
    super(message, 'PRESENCE_SUBSCRIPTION_ERROR', 500);
  }
}

// --- Link Preview Errors ---

export class LinkPreviewError extends AppError {
  constructor(message: string, code = 'LINK_PREVIEW_ERROR', statusCode = 500) {
    super(message, code, statusCode);
  }
}

export class LinkPreviewFetchError extends AppError {
  constructor(url?: string) {
    const msg = url ? `Impossible de récupérer l'aperçu du lien: ${url}` : 'Impossible de récupérer l\'aperçu du lien';
    super(msg, 'LINK_PREVIEW_FETCH_ERROR', 500);
  }
}

export class LinkPreviewDisabledError extends AppError {
  constructor(message = 'Les aperçus de liens sont désactivés') {
    super(message, 'LINK_PREVIEW_DISABLED', 403);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// Document Management & Digital Workflow Enterprise Errors
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Document errors ────────────────────────────────────────────────────────

export class DocNotFoundError extends AppError {
  constructor(message = 'Document introuvable') {
    super(message, 'DOC_NOT_FOUND_ERROR', 404);
  }
}

export class DocCreateError extends AppError {
  constructor(message = 'Impossible de créer le document') {
    super(message, 'DOC_CREATE_ERROR', 500);
  }
}

export class DocUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le document') {
    super(message, 'DOC_UPDATE_ERROR', 500);
  }
}

export class DocDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le document') {
    super(message, 'DOC_DELETE_ERROR', 500);
  }
}

export class DocRestoreError extends AppError {
  constructor(message = 'Impossible de restaurer le document') {
    super(message, 'DOC_RESTORE_ERROR', 500);
  }
}

export class DocValidationError extends AppError {
  constructor(message = 'Le document ne respecte pas les règles de validation') {
    super(message, 'DOC_VALIDATION_ERROR', 422);
  }
}

export class DocInvalidFileError extends AppError {
  constructor(message = 'Le fichier fourni est invalide') {
    super(message, 'DOC_INVALID_FILE_ERROR', 400);
  }
}

export class DocFileTooLargeError extends AppError {
  constructor(message = 'Le fichier dépasse la taille maximale autorisée') {
    super(message, 'DOC_FILE_TOO_LARGE_ERROR', 413);
  }
}

export class DocUnsupportedFormatError extends AppError {
  constructor(message = 'Le format du document n\'est pas supporté') {
    super(message, 'DOC_UNSUPPORTED_FORMAT_ERROR', 415);
  }
}

export class DocInvalidMimeTypeError extends AppError {
  constructor(message = 'Le type MIME du fichier est invalide') {
    super(message, 'DOC_INVALID_MIME_TYPE_ERROR', 415);
  }
}

export class DocDuplicateError extends AppError {
  constructor(message = 'Un document similaire existe déjà') {
    super(message, 'DOC_DUPLICATE_ERROR', 409);
  }
}

export class DocLockedError extends AppError {
  constructor(message = 'Le document est verrouillé et ne peut pas être modifié') {
    super(message, 'DOC_LOCKED_ERROR', 409);
  }
}

export class DocCheckoutError extends AppError {
  constructor(message = 'Impossible de vérifier le document en sortie') {
    super(message, 'DOC_CHECKOUT_ERROR', 409);
  }
}

export class DocVersionConflictError extends AppError {
  constructor(message = 'Conflit de version du document') {
    super(message, 'DOC_VERSION_CONFLICT_ERROR', 409);
  }
}

export class DocAlreadyArchivedError extends AppError {
  constructor(message = 'Le document est déjà archivé') {
    super(message, 'DOC_ALREADY_ARCHIVED_ERROR', 409);
  }
}

export class DocNotArchivedError extends AppError {
  constructor(message = 'Le document n\'est pas archivé') {
    super(message, 'DOC_NOT_ARCHIVED_ERROR', 400);
  }
}

export class DocExpiredError extends AppError {
  constructor(message = 'Le document a expiré') {
    super(message, 'DOC_EXPIRED_ERROR', 410);
  }
}

export class DocForbiddenError extends AppError {
  constructor(message = 'Accès interdit au document') {
    super(message, 'DOC_FORBIDDEN_ERROR', 403);
  }
}

export class DocConflictError extends AppError {
  constructor(message = 'Conflit détecté pour le document') {
    super(message, 'DOC_CONFLICT_ERROR', 409);
  }
}

export class DocMetadataError extends AppError {
  constructor(message = 'Les métadonnées du document sont invalides') {
    super(message, 'DOC_METADATA_ERROR', 422);
  }
}

// ─── Folder errors ──────────────────────────────────────────────────────────

export class DocFolderNotFoundError extends AppError {
  constructor(message = 'Dossier introuvable') {
    super(message, 'DOC_FOLDER_NOT_FOUND_ERROR', 404);
  }
}

export class DocFolderCreateError extends AppError {
  constructor(message = 'Impossible de créer le dossier') {
    super(message, 'DOC_FOLDER_CREATE_ERROR', 500);
  }
}

export class DocFolderUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le dossier') {
    super(message, 'DOC_FOLDER_UPDATE_ERROR', 500);
  }
}

export class DocFolderDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le dossier') {
    super(message, 'DOC_FOLDER_DELETE_ERROR', 500);
  }
}

export class DocFolderNotEmptyError extends AppError {
  constructor(message = 'Le dossier n\'est pas vide et ne peut pas être supprimé') {
    super(message, 'DOC_FOLDER_NOT_EMPTY_ERROR', 409);
  }
}

export class DocFolderDepthExceededError extends AppError {
  constructor(message = 'La profondeur maximale des dossiers est dépassée') {
    super(message, 'DOC_FOLDER_DEPTH_EXCEEDED_ERROR', 400);
  }
}

export class DocFolderCircularReferenceError extends AppError {
  constructor(message = 'Une référence circulaire a été détectée dans les dossiers') {
    super(message, 'DOC_FOLDER_CIRCULAR_REFERENCE_ERROR', 400);
  }
}

export class DocFolderPermissionError extends AppError {
  constructor(message = 'Permissions insuffisantes pour ce dossier') {
    super(message, 'DOC_FOLDER_PERMISSION_ERROR', 403);
  }
}

export class DocFolderRenameError extends AppError {
  constructor(message = 'Impossible de renommer le dossier') {
    super(message, 'DOC_FOLDER_RENAME_ERROR', 500);
  }
}

export class DocFolderMoveError extends AppError {
  constructor(message = 'Impossible de déplacer le dossier') {
    super(message, 'DOC_FOLDER_MOVE_ERROR', 500);
  }
}

// ─── Workspace errors ───────────────────────────────────────────────────────

export class DocWorkspaceNotFoundError extends AppError {
  constructor(message = 'Espace de travail introuvable') {
    super(message, 'DOC_WORKSPACE_NOT_FOUND_ERROR', 404);
  }
}

export class DocWorkspaceCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'espace de travail') {
    super(message, 'DOC_WORKSPACE_CREATE_ERROR', 500);
  }
}

export class DocWorkspaceUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'espace de travail') {
    super(message, 'DOC_WORKSPACE_UPDATE_ERROR', 500);
  }
}

export class DocWorkspaceDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'espace de travail') {
    super(message, 'DOC_WORKSPACE_DELETE_ERROR', 500);
  }
}

export class DocWorkspaceAccessError extends AppError {
  constructor(message = 'Accès refusé à l\'espace de travail') {
    super(message, 'DOC_WORKSPACE_ACCESS_ERROR', 403);
  }
}

export class DocWorkspaceQuotaError extends AppError {
  constructor(message = 'L\'espace de travail a dépassé sa quota') {
    super(message, 'DOC_WORKSPACE_QUOTA_ERROR', 413);
  }
}

export class DocWorkspaceMemberError extends AppError {
  constructor(message = 'Erreur lors de la gestion des membres de l\'espace de travail') {
    super(message, 'DOC_WORKSPACE_MEMBER_ERROR', 400);
  }
}

export class DocWorkspaceLimitError extends AppError {
  constructor(message = 'Le nombre maximal d\'espaces de travail est atteint') {
    super(message, 'DOC_WORKSPACE_LIMIT_ERROR', 413);
  }
}

// ─── Permission errors ──────────────────────────────────────────────────────

export class DocPermissionDeniedError extends AppError {
  constructor(message = 'Permission refusée pour cette action') {
    super(message, 'DOC_PERMISSION_DENIED_ERROR', 401);
  }
}

export class DocAccessDeniedError extends AppError {
  constructor(message = 'Accès refusé à la ressource demandée') {
    super(message, 'DOC_ACCESS_DENIED_ERROR', 403);
  }
}

export class DocNotOwnerError extends AppError {
  constructor(message = 'Seul le propriétaire peut effectuer cette action') {
    super(message, 'DOC_NOT_OWNER_ERROR', 403);
  }
}

export class DocNotAdminError extends AppError {
  constructor(message = 'Droits administrateur requis pour cette action') {
    super(message, 'DOC_NOT_ADMIN_ERROR', 403);
  }
}

export class DocShareNotAllowedError extends AppError {
  constructor(message = 'Le partage n\'est pas autorisé pour ce document') {
    super(message, 'DOC_SHARE_NOT_ALLOWED_ERROR', 403);
  }
}

export class DocPublicAccessError extends AppError {
  constructor(message = 'L\'accès public n\'est pas disponible pour ce document') {
    super(message, 'DOC_PUBLIC_ACCESS_ERROR', 403);
  }
}

export class DocExternalAccessError extends AppError {
  constructor(message = 'L\'accès externe n\'est pas autorisé') {
    super(message, 'DOC_EXTERNAL_ACCESS_ERROR', 403);
  }
}

export class DocRoleError extends AppError {
  constructor(message = 'Le rôle assigné est invalide pour cette opération') {
    super(message, 'DOC_ROLE_ERROR', 400);
  }
}

export class DocGroupAccessError extends AppError {
  constructor(message = 'L\'accès par groupe n\'est pas autorisé') {
    super(message, 'DOC_GROUP_ACCESS_ERROR', 403);
  }
}

export class DocConditionalAccessError extends AppError {
  constructor(message = 'Les conditions d\'accès ne sont pas satisfaites') {
    super(message, 'DOC_CONDITIONAL_ACCESS_ERROR', 403);
  }
}

// ─── Share errors ───────────────────────────────────────────────────────────

export class DocShareLinkError extends AppError {
  constructor(message = 'Erreur lors de la création du lien de partage') {
    super(message, 'DOC_SHARE_LINK_ERROR', 400);
  }
}

export class DocShareExpiredError extends AppError {
  constructor(message = 'Le lien de partage a expiré') {
    super(message, 'DOC_SHARE_EXPIRED_ERROR', 410);
  }
}

export class DocShareLimitError extends AppError {
  constructor(message = 'Le nombre maximal de partages est atteint') {
    super(message, 'DOC_SHARE_LIMIT_ERROR', 413);
  }
}

export class DocSharePasswordError extends AppError {
  constructor(message = 'Le mot de passe du lien de partage est incorrect') {
    super(message, 'DOC_SHARE_PASSWORD_ERROR', 401);
  }
}

export class DocShareInvalidError extends AppError {
  constructor(message = 'Le lien de partage est invalide') {
    super(message, 'DOC_SHARE_INVALID_ERROR', 400);
  }
}

export class DocShareRevokedError extends AppError {
  constructor(message = 'Le lien de partage a été révoqué') {
    super(message, 'DOC_SHARE_REVOKED_ERROR', 410);
  }
}

export class DocShareMaxDownloadsError extends AppError {
  constructor(message = 'Le nombre maximal de téléchargements est atteint') {
    super(message, 'DOC_SHARE_MAX_DOWNLOADS_ERROR', 413);
  }
}

export class DocShareSelfError extends AppError {
  constructor(message = 'Vous ne pouvez pas partager avec vous-même') {
    super(message, 'DOC_SHARE_SELF_ERROR', 400);
  }
}

// ─── Signature errors ───────────────────────────────────────────────────────

export class DocSignatureNotFoundError extends AppError {
  constructor(message = 'Signature introuvable') {
    super(message, 'DOC_SIGNATURE_NOT_FOUND_ERROR', 404);
  }
}

export class DocSignatureCreateError extends AppError {
  constructor(message = 'Impossible de créer la signature') {
    super(message, 'DOC_SIGNATURE_CREATE_ERROR', 500);
  }
}

export class DocSignatureExpiredError extends AppError {
  constructor(message = 'La signature a expiré') {
    super(message, 'DOC_SIGNATURE_EXPIRED_ERROR', 410);
  }
}

export class DocSignatureRejectedError extends AppError {
  constructor(message = 'La signature a été rejetée') {
    super(message, 'DOC_SIGNATURE_REJECTED_ERROR', 422);
  }
}

export class DocSignatureRevokedError extends AppError {
  constructor(message = 'La signature a été révoquée') {
    super(message, 'DOC_SIGNATURE_REVOKED_ERROR', 410);
  }
}

export class DocSignatureInvalidError extends AppError {
  constructor(message = 'La signature est invalide') {
    super(message, 'DOC_SIGNATURE_INVALID_ERROR', 400);
  }
}

export class DocSignatureCertificateError extends AppError {
  constructor(message = 'Le certificat de signature est invalide ou expiré') {
    super(message, 'DOC_SIGNATURE_CERTIFICATE_ERROR', 502);
  }
}

export class DocSignatureOrderError extends AppError {
  constructor(message = 'L\'ordre de signature n\'est pas respecté') {
    super(message, 'DOC_SIGNATURE_ORDER_ERROR', 400);
  }
}

export class DocSignatureRequiredError extends AppError {
  constructor(message = 'La signature est requise pour cette opération') {
    super(message, 'DOC_SIGNATURE_REQUIRED_ERROR', 400);
  }
}

export class DocSignatureDuplicateError extends AppError {
  constructor(message = 'Une signature identique existe déjà') {
    super(message, 'DOC_SIGNATURE_DUPLICATE_ERROR', 409);
  }
}

export class DocSignatureIntegrityError extends AppError {
  constructor(message = 'L\'intégrité de la signature est compromise') {
    super(message, 'DOC_SIGNATURE_INTEGRITY_ERROR', 422);
  }
}

export class DocSignatureChainError extends AppError {
  constructor(message = 'La chaîne de certification de la signature est invalide') {
    super(message, 'DOC_SIGNATURE_CHAIN_ERROR', 422);
  }
}

// ─── Approval errors ────────────────────────────────────────────────────────

export class DocApprovalNotFoundError extends AppError {
  constructor(message = 'Approbation introuvable') {
    super(message, 'DOC_APPROVAL_NOT_FOUND_ERROR', 404);
  }
}

export class DocApprovalCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'approbation') {
    super(message, 'DOC_APPROVAL_CREATE_ERROR', 500);
  }
}

export class DocApprovalTimeoutError extends AppError {
  constructor(message = 'L\'approbation a dépassé le délai imparti') {
    super(message, 'DOC_APPROVAL_TIMEOUT_ERROR', 408);
  }
}

export class DocApprovalRejectedError extends AppError {
  constructor(message = 'L\'approbation a été rejetée') {
    super(message, 'DOC_APPROVAL_REJECTED_ERROR', 422);
  }
}

export class DocApprovalAlreadyApprovedError extends AppError {
  constructor(message = 'Ce document a déjà été approuvé') {
    super(message, 'DOC_APPROVAL_ALREADY_APPROVED_ERROR', 409);
  }
}

export class DocApprovalStepError extends AppError {
  constructor(message = 'L\'étape d\'approbation est invalide') {
    super(message, 'DOC_APPROVAL_STEP_ERROR', 400);
  }
}

export class DocApprovalCircularError extends AppError {
  constructor(message = 'Un cycle d\'approbation circulaire a été détecté') {
    super(message, 'DOC_APPROVAL_CIRCULAR_ERROR', 400);
  }
}

export class DocApprovalDelegationError extends AppError {
  constructor(message = 'Erreur lors de la délégation d\'approbation') {
    super(message, 'DOC_APPROVAL_DELEGATION_ERROR', 400);
  }
}

export class DocApprovalEscalationError extends AppError {
  constructor(message = 'Erreur lors de l\'escalade d\'approbation') {
    super(message, 'DOC_APPROVAL_ESCALATION_ERROR', 500);
  }
}

export class DocApprovalConditionError extends AppError {
  constructor(message = 'Les conditions d\'approbation ne sont pas remplies') {
    super(message, 'DOC_APPROVAL_CONDITION_ERROR', 422);
  }
}

// ─── Workflow errors ────────────────────────────────────────────────────────

export class DocWorkflowNotFoundError extends AppError {
  constructor(message = 'Flux de travail introuvable') {
    super(message, 'DOC_WORKFLOW_NOT_FOUND_ERROR', 404);
  }
}

export class DocWorkflowCreateError extends AppError {
  constructor(message = 'Impossible de créer le flux de travail') {
    super(message, 'DOC_WORKFLOW_CREATE_ERROR', 500);
  }
}

export class DocWorkflowUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le flux de travail') {
    super(message, 'DOC_WORKFLOW_UPDATE_ERROR', 500);
  }
}

export class DocWorkflowDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le flux de travail') {
    super(message, 'DOC_WORKFLOW_DELETE_ERROR', 500);
  }
}

export class DocWorkflowNotCompletedError extends AppError {
  constructor(message = 'Le flux de travail n\'est pas terminé') {
    super(message, 'DOC_WORKFLOW_NOT_COMPLETED_ERROR', 400);
  }
}

export class DocWorkflowCircularError extends AppError {
  constructor(message = 'Un cycle circulaire a été détecté dans le flux de travail') {
    super(message, 'DOC_WORKFLOW_CIRCULAR_ERROR', 400);
  }
}

export class DocWorkflowConditionError extends AppError {
  constructor(message = 'Les conditions du flux de travail sont invalides') {
    super(message, 'DOC_WORKFLOW_CONDITION_ERROR', 422);
  }
}

export class DocWorkflowTriggerError extends AppError {
  constructor(message = 'Le déclencheur du flux de travail est invalide') {
    super(message, 'DOC_WORKFLOW_TRIGGER_ERROR', 500);
  }
}

export class DocWorkflowTimeoutError extends AppError {
  constructor(message = 'Le flux de travail a dépassé le délai imparti') {
    super(message, 'DOC_WORKFLOW_TIMEOUT_ERROR', 408);
  }
}

export class DocWorkflowStateError extends AppError {
  constructor(message = 'L\'état du flux de travail est invalide') {
    super(message, 'DOC_WORKFLOW_STATE_ERROR', 400);
  }
}

// ─── OCR errors ─────────────────────────────────────────────────────────────

export class DocOCRNotFoundError extends AppError {
  constructor(message = 'Résultat OCR introuvable') {
    super(message, 'DOC_OCR_NOT_FOUND_ERROR', 404);
  }
}

export class DocOCRFailedError extends AppError {
  constructor(message = 'La reconnaissance optique de caractères a échoué') {
    super(message, 'DOC_OCR_FAILED_ERROR', 500);
  }
}

export class DocOCRLanguageError extends AppError {
  constructor(message = 'La langue OCR sélectionnée n\'est pas supportée') {
    super(message, 'DOC_OCR_LANGUAGE_ERROR', 400);
  }
}

export class DocOCRTimeoutError extends AppError {
  constructor(message = 'Le traitement OCR a dépassé le délai imparti') {
    super(message, 'DOC_OCR_TIMEOUT_ERROR', 504);
  }
}

export class DocOCRQualityError extends AppError {
  constructor(message = 'La qualité du document est insuffisante pour l\'OCR') {
    super(message, 'DOC_OCR_QUALITY_ERROR', 422);
  }
}

export class DocOCRFormatError extends AppError {
  constructor(message = 'Le format du document n\'est pas compatible avec l\'OCR') {
    super(message, 'DOC_OCR_FORMAT_ERROR', 415);
  }
}

export class DocOCRFieldError extends AppError {
  constructor(message = 'Le champ OCR est invalide ou manquant') {
    super(message, 'DOC_OCR_FIELD_ERROR', 400);
  }
}

export class DocOCRTemplateError extends AppError {
  constructor(message = 'Le modèle OCR est introuvable') {
    super(message, 'DOC_OCR_TEMPLATE_ERROR', 404);
  }
}

export class DocOCRProcessingError extends AppError {
  constructor(message = 'Erreur lors du traitement OCR') {
    super(message, 'DOC_OCR_PROCESSING_ERROR', 500);
  }
}

export class DocOCRResultError extends AppError {
  constructor(message = 'Les résultats OCR sont invalides') {
    super(message, 'DOC_OCR_RESULT_ERROR', 422);
  }
}

// ─── Archive errors ─────────────────────────────────────────────────────────

export class DocArchiveNotFoundError extends AppError {
  constructor(message = 'Archive introuvable') {
    super(message, 'DOC_ARCHIVE_NOT_FOUND_ERROR', 404);
  }
}

export class DocArchiveCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'archive') {
    super(message, 'DOC_ARCHIVE_CREATE_ERROR', 500);
  }
}

export class DocArchiveLockedError extends AppError {
  constructor(message = 'L\'archive est verrouillée') {
    super(message, 'DOC_ARCHIVE_LOCKED_ERROR', 409);
  }
}

export class DocArchivePolicyError extends AppError {
  constructor(message = 'La politique d\'archivage n\'est pas respectée') {
    super(message, 'DOC_ARCHIVE_POLICY_ERROR', 400);
  }
}

export class DocArchiveRetentionError extends AppError {
  constructor(message = 'La période de rétention de l\'archive est invalide') {
    super(message, 'DOC_ARCHIVE_RETENTION_ERROR', 400);
  }
}

export class DocArchiveIntegrityError extends AppError {
  constructor(message = 'L\'intégrité de l\'archive est compromise') {
    super(message, 'DOC_ARCHIVE_INTEGRITY_ERROR', 500);
  }
}

export class DocArchiveRetrievalError extends AppError {
  constructor(message = 'Erreur lors de la récupération de l\'archive') {
    super(message, 'DOC_ARCHIVE_RETRIEVAL_ERROR', 502);
  }
}

export class DocArchiveComplianceError extends AppError {
  constructor(message = 'L\'archive ne respecte pas les exigences de conformité') {
    super(message, 'DOC_ARCHIVE_COMPLIANCE_ERROR', 403);
  }
}

// ─── Backup errors ──────────────────────────────────────────────────────────

export class DocBackupNotFoundError extends AppError {
  constructor(message = 'Sauvegarde introuvable') {
    super(message, 'DOC_BACKUP_NOT_FOUND_ERROR', 404);
  }
}

export class DocBackupCreateError extends AppError {
  constructor(message = 'Impossible de créer la sauvegarde') {
    super(message, 'DOC_BACKUP_CREATE_ERROR', 500);
  }
}

export class DocBackupInProgressError extends AppError {
  constructor(message = 'Une sauvegarde est déjà en cours') {
    super(message, 'DOC_BACKUP_IN_PROGRESS_ERROR', 409);
  }
}

export class DocBackupFailedError extends AppError {
  constructor(message = 'La sauvegarde a échoué') {
    super(message, 'DOC_BACKUP_FAILED_ERROR', 500);
  }
}

export class DocBackupCorruptedError extends AppError {
  constructor(message = 'La sauvegarde est corrompue') {
    super(message, 'DOC_BACKUP_CORRUPTED_ERROR', 500);
  }
}

export class DocBackupQuotaError extends AppError {
  constructor(message = 'L\'espace de sauvegarde est insuffisant') {
    super(message, 'DOC_BACKUP_QUOTA_ERROR', 413);
  }
}

export class DocBackupScheduleError extends AppError {
  constructor(message = 'Erreur dans la planification de la sauvegarde') {
    super(message, 'DOC_BACKUP_SCHEDULE_ERROR', 400);
  }
}

export class DocBackupRetentionError extends AppError {
  constructor(message = 'La politique de rétention des sauvegardes est violée') {
    super(message, 'DOC_BACKUP_RETENTION_ERROR', 400);
  }
}

// ─── Restore errors ─────────────────────────────────────────────────────────

export class DocRestoreNotFoundError extends AppError {
  constructor(message = 'Point de restauration introuvable') {
    super(message, 'DOC_RESTORE_NOT_FOUND_ERROR', 404);
  }
}

export class DocRestoreCreateError extends AppError {
  constructor(message = 'Impossible de créer le point de restauration') {
    super(message, 'DOC_RESTORE_CREATE_ERROR', 500);
  }
}

export class DocRestoreConflictError extends AppError {
  constructor(message = 'Conflit lors de la restauration') {
    super(message, 'DOC_RESTORE_CONFLICT_ERROR', 409);
  }
}

export class DocRestoreFailedError extends AppError {
  constructor(message = 'La restauration a échoué') {
    super(message, 'DOC_RESTORE_FAILED_ERROR', 500);
  }
}

export class DocRestorePermissionError extends AppError {
  constructor(message = 'Permissions insuffisantes pour effectuer la restauration') {
    super(message, 'DOC_RESTORE_PERMISSION_ERROR', 403);
  }
}

export class DocRestoreVersionError extends AppError {
  constructor(message = 'La version à restaurer est invalide') {
    super(message, 'DOC_RESTORE_VERSION_ERROR', 400);
  }
}

// ─── Trash errors ───────────────────────────────────────────────────────────

export class DocTrashNotFoundError extends AppError {
  constructor(message = 'L\'élément supprimé est introuvable dans la corbeille') {
    super(message, 'DOC_TRASH_NOT_FOUND_ERROR', 404);
  }
}

export class DocTrashEmptyError extends AppError {
  constructor(message = 'La corbeille est vide') {
    super(message, 'DOC_TRASH_EMPTY_ERROR', 400);
  }
}

export class DocTrashPermanentError extends AppError {
  constructor(message = 'La suppression définitive a échoué') {
    super(message, 'DOC_TRASH_PERMANENT_ERROR', 500);
  }
}

export class DocTrashQuotaError extends AppError {
  constructor(message = 'La corbeille a dépassé sa capacité maximale') {
    super(message, 'DOC_TRASH_QUOTA_ERROR', 413);
  }
}

export class DocTrashRetentionError extends AppError {
  constructor(message = 'La période de rétention de la corbeille est dépassée') {
    super(message, 'DOC_TRASH_RETENTION_ERROR', 400);
  }
}

// ─── Watermark errors ───────────────────────────────────────────────────────

export class DocWatermarkError extends AppError {
  constructor(message = 'Erreur lors du traitement du filigrane') {
    super(message, 'DOC_WATERMARK_ERROR', 500);
  }
}

export class DocWatermarkApplyError extends AppError {
  constructor(message = 'Impossible d\'appliquer le filigrane') {
    super(message, 'DOC_WATERMARK_APPLY_ERROR', 500);
  }
}

export class DocWatermarkRemoveError extends AppError {
  constructor(message = 'Impossible de supprimer le filigrane') {
    super(message, 'DOC_WATERMARK_REMOVE_ERROR', 500);
  }
}

export class DocWatermarkFormatError extends AppError {
  constructor(message = 'Le format du filigrane est invalide') {
    super(message, 'DOC_WATERMARK_FORMAT_ERROR', 415);
  }
}

export class DocWatermarkPositionError extends AppError {
  constructor(message = 'La position du filigrane est invalide') {
    super(message, 'DOC_WATERMARK_POSITION_ERROR', 400);
  }
}

// ─── Template errors ────────────────────────────────────────────────────────

export class DocTemplateNotFoundError extends AppError {
  constructor(message = 'Modèle introuvable') {
    super(message, 'DOC_TEMPLATE_NOT_FOUND_ERROR', 404);
  }
}

export class DocTemplateCreateError extends AppError {
  constructor(message = 'Impossible de créer le modèle') {
    super(message, 'DOC_TEMPLATE_CREATE_ERROR', 500);
  }
}

export class DocTemplateUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le modèle') {
    super(message, 'DOC_TEMPLATE_UPDATE_ERROR', 500);
  }
}

export class DocTemplateDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le modèle') {
    super(message, 'DOC_TEMPLATE_DELETE_ERROR', 500);
  }
}

export class DocTemplateRenderError extends AppError {
  constructor(message = 'Erreur lors du rendu du modèle') {
    super(message, 'DOC_TEMPLATE_RENDER_ERROR', 500);
  }
}

export class DocTemplateVariableError extends AppError {
  constructor(message = 'Une variable de modèle est invalide ou manquante') {
    super(message, 'DOC_TEMPLATE_VARIABLE_ERROR', 400);
  }
}

// ─── Merge/Split errors ─────────────────────────────────────────────────────

export class DocMergeError extends AppError {
  constructor(message = 'Erreur lors de la fusion des documents') {
    super(message, 'DOC_MERGE_ERROR', 500);
  }
}

export class DocMergeFormatError extends AppError {
  constructor(message = 'Les formats des documents à fusionner sont incompatibles') {
    super(message, 'DOC_MERGE_FORMAT_ERROR', 415);
  }
}

export class DocMergeSizeError extends AppError {
  constructor(message = 'La taille totale des documents à fusionner est trop importante') {
    super(message, 'DOC_MERGE_SIZE_ERROR', 413);
  }
}

export class DocSplitError extends AppError {
  constructor(message = 'Erreur lors de la division du document') {
    super(message, 'DOC_SPLIT_ERROR', 500);
  }
}

export class DocSplitPageError extends AppError {
  constructor(message = 'Le numéro de page à diviser est invalide') {
    super(message, 'DOC_SPLIT_PAGE_ERROR', 400);
  }
}

export class DocSplitFormatError extends AppError {
  constructor(message = 'Le format de sortie de la division est invalide') {
    super(message, 'DOC_SPLIT_FORMAT_ERROR', 415);
  }
}

// ─── Compression errors ─────────────────────────────────────────────────────

export class DocCompressionError extends AppError {
  constructor(message = 'Erreur lors de la compression du document') {
    super(message, 'DOC_COMPRESSION_ERROR', 500);
  }
}

export class DocCompressionLevelError extends AppError {
  constructor(message = 'Le niveau de compression est invalide') {
    super(message, 'DOC_COMPRESSION_LEVEL_ERROR', 400);
  }
}

export class DocDecompressionError extends AppError {
  constructor(message = 'Erreur lors de la décompression du document') {
    super(message, 'DOC_DECOMPRESSION_ERROR', 500);
  }
}

export class DocCompressionFormatError extends AppError {
  constructor(message = 'Le format de compression n\'est pas supporté') {
    super(message, 'DOC_COMPRESSION_FORMAT_ERROR', 415);
  }
}

// ─── Conversion errors ──────────────────────────────────────────────────────

export class DocConversionError extends AppError {
  constructor(message = 'Erreur lors de la conversion du document') {
    super(message, 'DOC_CONVERSION_ERROR', 500);
  }
}

export class DocConversionFormatError extends AppError {
  constructor(message = 'Le format de conversion demandé est invalide') {
    super(message, 'DOC_CONVERSION_FORMAT_ERROR', 415);
  }
}

export class DocConversionFailedError extends AppError {
  constructor(message = 'La conversion du document a échoué') {
    super(message, 'DOC_CONVERSION_FAILED_ERROR', 500);
  }
}

export class DocConversionTimeoutError extends AppError {
  constructor(message = 'La conversion a dépassé le délai imparti') {
    super(message, 'DOC_CONVERSION_TIMEOUT_ERROR', 504);
  }
}

export class DocConversionQualityError extends AppError {
  constructor(message = 'La qualité de conversion demandée n\'est pas supportée') {
    super(message, 'DOC_CONVERSION_QUALITY_ERROR', 422);
  }
}

export class DocConversionUnsupportedError extends AppError {
  constructor(message = 'La conversion du format source vers le format cible n\'est pas supportée') {
    super(message, 'DOC_CONVERSION_UNSUPPORTED_ERROR', 415);
  }
}

// ─── Search errors ──────────────────────────────────────────────────────────

export class DocSearchError extends AppError {
  constructor(message = 'Erreur lors de la recherche de documents') {
    super(message, 'DOC_SEARCH_ERROR', 500);
  }
}

export class DocSearchIndexError extends AppError {
  constructor(message = 'L\'index de recherche est indisponible ou corrompu') {
    super(message, 'DOC_SEARCH_INDEX_ERROR', 500);
  }
}

export class DocSearchTimeoutError extends AppError {
  constructor(message = 'La recherche a dépassé le délai imparti') {
    super(message, 'DOC_SEARCH_TIMEOUT_ERROR', 504);
  }
}

export class DocSearchQueryError extends AppError {
  constructor(message = 'La requête de recherche est invalide') {
    super(message, 'DOC_SEARCH_QUERY_ERROR', 400);
  }
}

export class DocSearchPermissionError extends AppError {
  constructor(message = 'Permissions insuffisantes pour cette recherche') {
    super(message, 'DOC_SEARCH_PERMISSION_ERROR', 403);
  }
}

export class DocSearchNoResultsError extends AppError {
  constructor(message = 'Aucun résultat trouvé pour cette recherche') {
    super(message, 'DOC_SEARCH_NO_RESULTS_ERROR', 404);
  }
}

// ─── Storage errors ─────────────────────────────────────────────────────────

export class DocStorageError extends AppError {
  constructor(message = 'Erreur de stockage des documents') {
    super(message, 'DOC_STORAGE_ERROR', 500);
  }
}

export class DocStorageQuotaExceededError extends AppError {
  constructor(message = 'Le quota de stockage est dépassé') {
    super(message, 'DOC_STORAGE_QUOTA_EXCEEDED_ERROR', 413);
  }
}

export class DocStorageConnectionError extends AppError {
  constructor(message = 'Impossible de se connecter au service de stockage') {
    super(message, 'DOC_STORAGE_CONNECTION_ERROR', 502);
  }
}

export class DocStorageTimeoutError extends AppError {
  constructor(message = 'Le service de stockage a dépassé le délai imparti') {
    super(message, 'DOC_STORAGE_TIMEOUT_ERROR', 504);
  }
}

export class DocStorageIntegrityError extends AppError {
  constructor(message = 'L\'intégrité des données de stockage est compromise') {
    super(message, 'DOC_STORAGE_INTEGRITY_ERROR', 500);
  }
}

export class DocStorageProviderError extends AppError {
  constructor(message = 'Le fournisseur de stockage est indisponible') {
    super(message, 'DOC_STORAGE_PROVIDER_ERROR', 502);
  }
}

// ─── Export/Import errors ───────────────────────────────────────────────────

export class DocExportError extends AppError {
  constructor(message = 'Erreur lors de l\'exportation du document') {
    super(message, 'DOC_EXPORT_ERROR', 500);
  }
}

export class DocExportFormatError extends AppError {
  constructor(message = 'Le format d\'exportation demandé n\'est pas supporté') {
    super(message, 'DOC_EXPORT_FORMAT_ERROR', 415);
  }
}

export class DocImportError extends AppError {
  constructor(message = 'Erreur lors de l\'importation du document') {
    super(message, 'DOC_IMPORT_ERROR', 500);
  }
}

export class DocImportFormatError extends AppError {
  constructor(message = 'Le format du fichier importé est invalide') {
    super(message, 'DOC_IMPORT_FORMAT_ERROR', 415);
  }
}

export class DocImportFailedError extends AppError {
  constructor(message = 'L\'importation du document a échoué') {
    super(message, 'DOC_IMPORT_FAILED_ERROR', 500);
  }
}

export class DocImportDuplicateError extends AppError {
  constructor(message = 'Un document identique existe déjà lors de l\'importation') {
    super(message, 'DOC_IMPORT_DUPLICATE_ERROR', 409);
  }
}

// ─── Version errors ─────────────────────────────────────────────────────────

export class DocVersionNotFoundError extends AppError {
  constructor(message = 'Version du document introuvable') {
    super(message, 'DOC_VERSION_NOT_FOUND_ERROR', 404);
  }
}

export class DocVersionCreateError extends AppError {
  constructor(message = 'Impossible de créer une nouvelle version') {
    super(message, 'DOC_VERSION_CREATE_ERROR', 500);
  }
}

export class DocVersionCompareError extends AppError {
  constructor(message = 'Impossible de comparer les versions du document') {
    super(message, 'DOC_VERSION_COMPARE_ERROR', 400);
  }
}

export class DocVersionRestoreError extends AppError {
  constructor(message = 'Impossible de restaurer cette version du document') {
    super(message, 'DOC_VERSION_RESTORE_ERROR', 500);
  }
}

export class DocVersionLimitError extends AppError {
  constructor(message = 'Le nombre maximal de versions est atteint') {
    super(message, 'DOC_VERSION_LIMIT_ERROR', 413);
  }
}

// ─── Comment errors ─────────────────────────────────────────────────────────

export class DocCommentNotFoundError extends AppError {
  constructor(message = 'Commentaire introuvable') {
    super(message, 'DOC_COMMENT_NOT_FOUND_ERROR', 404);
  }
}

export class DocCommentCreateError extends AppError {
  constructor(message = 'Impossible de créer le commentaire') {
    super(message, 'DOC_COMMENT_CREATE_ERROR', 500);
  }
}

export class DocCommentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le commentaire') {
    super(message, 'DOC_COMMENT_UPDATE_ERROR', 500);
  }
}

export class DocCommentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le commentaire') {
    super(message, 'DOC_COMMENT_DELETE_ERROR', 500);
  }
}

// ─── Activity errors ────────────────────────────────────────────────────────

export class DocActivityLogError extends AppError {
  constructor(message = 'Erreur lors de l\'enregistrement de l\'activité') {
    super(message, 'DOC_ACTIVITY_LOG_ERROR', 500);
  }
}

export class DocActivityNotFoundError extends AppError {
  constructor(message = 'Enregistrement d\'activité introuvable') {
    super(message, 'DOC_ACTIVITY_NOT_FOUND_ERROR', 404);
  }
}

export class DocAuditError extends AppError {
  constructor(message = 'Erreur lors de l\'audit du document') {
    super(message, 'DOC_AUDIT_ERROR', 500);
  }
}

// ─── Tag errors ─────────────────────────────────────────────────────────────

export class DocTagNotFoundError extends AppError {
  constructor(message = 'Étiquette introuvable') {
    super(message, 'DOC_TAG_NOT_FOUND_ERROR', 404);
  }
}

export class DocTagCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'étiquette') {
    super(message, 'DOC_TAG_CREATE_ERROR', 500);
  }
}

export class DocTagDuplicateError extends AppError {
  constructor(message = 'Cette étiquette existe déjà') {
    super(message, 'DOC_TAG_DUPLICATE_ERROR', 409);
  }
}

export class DocTagLimitError extends AppError {
  constructor(message = 'Le nombre maximal d\'étiquettes est atteint') {
    super(message, 'DOC_TAG_LIMIT_ERROR', 413);
  }
}

// ─── Legal hold errors ──────────────────────────────────────────────────────

export class DocLegalHoldError extends AppError {
  constructor(message = 'Erreur lors de la mise sous obligation légale') {
    super(message, 'DOC_LEGAL_HOLD_ERROR', 500);
  }
}

export class DocLegalHoldExistsError extends AppError {
  constructor(message = 'Une obligation légale existe déjà pour ce document') {
    super(message, 'DOC_LEGAL_HOLD_EXISTS_ERROR', 409);
  }
}

export class DocLegalHoldReleaseError extends AppError {
  constructor(message = 'Impossible de lever l\'obligation légale') {
    super(message, 'DOC_LEGAL_HOLD_RELEASE_ERROR', 500);
  }
}

export class DocLegalHoldExpiredError extends AppError {
  constructor(message = 'L\'obligation légale a expiré') {
    super(message, 'DOC_LEGAL_HOLD_EXPIRED_ERROR', 410);
  }
}

export class DocLegalHoldComplianceError extends AppError {
  constructor(message = 'Le document ne respecte pas les exigences de l\'obligation légale') {
    super(message, 'DOC_LEGAL_HOLD_COMPLIANCE_ERROR', 403);
  }
}

// ─── Retention errors ───────────────────────────────────────────────────────

export class DocRetentionError extends AppError {
  constructor(message = 'Erreur lors de l\'application de la politique de rétention') {
    super(message, 'DOC_RETENTION_ERROR', 500);
  }
}

export class DocRetentionScheduleError extends AppError {
  constructor(message = 'Le calendrier de rétention est invalide') {
    super(message, 'DOC_RETENTION_SCHEDULE_ERROR', 400);
  }
}

export class DocRetentionPeriodError extends AppError {
  constructor(message = 'La période de rétention est invalide') {
    super(message, 'DOC_RETENTION_PERIOD_ERROR', 400);
  }
}

export class DocRetentionComplianceError extends AppError {
  constructor(message = 'Le document ne respecte pas la politique de rétention') {
    super(message, 'DOC_RETENTION_COMPLIANCE_ERROR', 403);
  }
}

export class DocRetentionDisposalError extends AppError {
  constructor(message = 'Erreur lors de l\'élimination selon la politique de rétention') {
    super(message, 'DOC_RETENTION_DISPOSAL_ERROR', 500);
  }
}

// ─── WebDAV errors ──────────────────────────────────────────────────────────

export class DocWebDAVError extends AppError {
  constructor(message = 'Erreur WebDAV lors de l\'accès au document') {
    super(message, 'DOC_WEBDAV_ERROR', 500);
  }
}

export class DocWebDAVAuthError extends AppError {
  constructor(message = 'Échec d\'authentification WebDAV') {
    super(message, 'DOC_WEBDAV_AUTH_ERROR', 401);
  }
}

export class DocWebDAVConnectionError extends AppError {
  constructor(message = 'Impossible de se connecter au serveur WebDAV') {
    super(message, 'DOC_WEBDAV_CONNECTION_ERROR', 502);
  }
}

export class DocWebDAVSyncError extends AppError {
  constructor(message = 'Erreur de synchronisation WebDAV') {
    super(message, 'DOC_WEBDAV_SYNC_ERROR', 500);
  }
}

export class DocWebDAVConflictError extends AppError {
  constructor(message = 'Conflit WebDAV lors de la synchronisation') {
    super(message, 'DOC_WEBDAV_CONFLICT_ERROR', 409);
  }
}

// ─── Scanner errors ─────────────────────────────────────────────────────────

export class DocScannerError extends AppError {
  constructor(message = 'Erreur du scanner lors de la numérisation') {
    super(message, 'DOC_SCANNER_ERROR', 500);
  }
}

export class DocScannerConnectionError extends AppError {
  constructor(message = 'Impossible de se connecter au scanner') {
    super(message, 'DOC_SCANNER_CONNECTION_ERROR', 502);
  }
}

export class DocScannerResolutionError extends AppError {
  constructor(message = 'La résolution demandée n\'est pas supportée par le scanner') {
    super(message, 'DOC_SCANNER_RESOLUTION_ERROR', 400);
  }
}

export class DocScannerPaperJamError extends AppError {
  constructor(message = 'Blocage de papier détecté dans le scanner') {
    super(message, 'DOC_SCANNER_PAPER_JAM_ERROR', 500);
  }
}

// ─── Processing errors ──────────────────────────────────────────────────────

export class DocProcessingError extends AppError {
  constructor(message = 'Erreur lors du traitement du document') {
    super(message, 'DOC_PROCESSING_ERROR', 500);
  }
}

export class DocProcessingTimeoutError extends AppError {
  constructor(message = 'Le traitement du document a dépassé le délai imparti') {
    super(message, 'DOC_PROCESSING_TIMEOUT_ERROR', 504);
  }
}

export class DocProcessingQueueError extends AppError {
  constructor(message = 'La file d\'attente de traitement est saturée') {
    super(message, 'DOC_PROCESSING_QUEUE_ERROR', 503);
  }
}

export class DocProcessingPipelineError extends AppError {
  constructor(message = 'Erreur dans le pipeline de traitement du document') {
    super(message, 'DOC_PROCESSING_PIPELINE_ERROR', 500);
  }
}

export class DocProcessingFailedError extends AppError {
  constructor(message = 'Le traitement du document a échoué') {
    super(message, 'DOC_PROCESSING_FAILED_ERROR', 500);
  }
}

// ─── AI errors ──────────────────────────────────────────────────────────────

export class DocAIClassificationError extends AppError {
  constructor(message = 'Erreur lors de la classification IA du document') {
    super(message, 'DOC_AI_CLASSIFICATION_ERROR', 500);
  }
}

export class DocAIExtractionError extends AppError {
  constructor(message = 'Erreur lors de l\'extraction IA du document') {
    super(message, 'DOC_AI_EXTRACTION_ERROR', 500);
  }
}

export class DocAISummaryError extends AppError {
  constructor(message = 'Erreur lors de la génération du résumé IA') {
    super(message, 'DOC_AI_SUMMARY_ERROR', 500);
  }
}

export class DocAISimilarityError extends AppError {
  constructor(message = 'Erreur lors de la détection de similarité IA') {
    super(message, 'DOC_AI_SIMILARITY_ERROR', 500);
  }
}

export class DocAIRecommendationError extends AppError {
  constructor(message = 'Erreur lors de la génération de recommandations IA') {
    super(message, 'DOC_AI_RECOMMENDATION_ERROR', 500);
  }
}

export class DocAIDuplicateError extends AppError {
  constructor(message = 'Un document similaire a été détecté par l\'analyse IA') {
    super(message, 'DOC_AI_DUPLICATE_ERROR', 409);
  }
}

// ─── Timestamp errors ──────────────────────────────────────────────────────

export class DocTimestampNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Horodatage (${identifier}) introuvable` : 'Horodatage introuvable';
    super(msg, 'DOC_TIMESTAMP_NOT_FOUND_ERROR', 404);
  }
}

export class DocTimestampCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'horodatage') {
    super(message, 'DOC_TIMESTAMP_CREATE_ERROR', 500);
  }
}

export class DocTimestampValidateError extends AppError {
  constructor(message = 'L\'horodatage est invalide') {
    super(message, 'DOC_TIMESTAMP_VALIDATE_ERROR', 400);
  }
}

// ─── DRM errors ────────────────────────────────────────────────────────────

export class DocDRMNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration DRM (${identifier}) introuvable` : 'Configuration DRM introuvable';
    super(msg, 'DOC_DRM_NOT_FOUND_ERROR', 404);
  }
}

export class DocDRMApplyError extends AppError {
  constructor(message = 'Impossible d\'appliquer la protection DRM') {
    super(message, 'DOC_DRM_APPLY_ERROR', 500);
  }
}

export class DocDRMRemoveError extends AppError {
  constructor(message = 'Impossible de supprimer la protection DRM') {
    super(message, 'DOC_DRM_REMOVE_ERROR', 500);
  }
}

export class DocDRMValidateError extends AppError {
  constructor(message = 'La configuration DRM est invalide') {
    super(message, 'DOC_DRM_VALIDATE_ERROR', 400);
  }
}

// ─── Redaction errors ──────────────────────────────────────────────────────

export class DocRedactionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rédaction (${identifier}) introuvable` : 'Rédaction introuvable';
    super(msg, 'DOC_REDACTION_NOT_FOUND_ERROR', 404);
  }
}

export class DocRedactionCreateError extends AppError {
  constructor(message = 'Impossible de créer la rédaction') {
    super(message, 'DOC_REDACTION_CREATE_ERROR', 500);
  }
}

export class DocRedactionApplyError extends AppError {
  constructor(message = 'Impossible d\'appliquer la rédaction') {
    super(message, 'DOC_REDACTION_APPLY_ERROR', 500);
  }
}

export class DocRedactionRemoveError extends AppError {
  constructor(message = 'Impossible de supprimer la rédaction') {
    super(message, 'DOC_REDACTION_REMOVE_ERROR', 500);
  }
}

// ─── Annotation errors ─────────────────────────────────────────────────────

export class DocAnnotationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Annotation (${identifier}) introuvable` : 'Annotation introuvable';
    super(msg, 'DOC_ANNOTATION_NOT_FOUND_ERROR', 404);
  }
}

export class DocAnnotationCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'annotation') {
    super(message, 'DOC_ANNOTATION_CREATE_ERROR', 500);
  }
}

export class DocAnnotationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'annotation') {
    super(message, 'DOC_ANNOTATION_UPDATE_ERROR', 500);
  }
}

export class DocAnnotationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'annotation') {
    super(message, 'DOC_ANNOTATION_DELETE_ERROR', 500);
  }
}

// ─── Highlight errors ──────────────────────────────────────────────────────

export class DocHighlightNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Surlignage (${identifier}) introuvable` : 'Surlignage introuvable';
    super(msg, 'DOC_HIGHLIGHT_NOT_FOUND_ERROR', 404);
  }
}

export class DocHighlightCreateError extends AppError {
  constructor(message = 'Impossible de créer le surlignage') {
    super(message, 'DOC_HIGHLIGHT_CREATE_ERROR', 500);
  }
}

export class DocHighlightUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le surlignage') {
    super(message, 'DOC_HIGHLIGHT_UPDATE_ERROR', 500);
  }
}

export class DocHighlightDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le surlignage') {
    super(message, 'DOC_HIGHLIGHT_DELETE_ERROR', 500);
  }
}

// ─── Signature Field errors ────────────────────────────────────────────────

export class DocSignatureFieldNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Champ de signature (${identifier}) introuvable` : 'Champ de signature introuvable';
    super(msg, 'DOC_SIGNATURE_FIELD_NOT_FOUND_ERROR', 404);
  }
}

export class DocSignatureFieldCreateError extends AppError {
  constructor(message = 'Impossible de créer le champ de signature') {
    super(message, 'DOC_SIGNATURE_FIELD_CREATE_ERROR', 500);
  }
}

export class DocSignatureFieldUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le champ de signature') {
    super(message, 'DOC_SIGNATURE_FIELD_UPDATE_ERROR', 500);
  }
}

export class DocSignatureFieldDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le champ de signature') {
    super(message, 'DOC_SIGNATURE_FIELD_DELETE_ERROR', 500);
  }
}

// ─── Form Field errors ─────────────────────────────────────────────────────

export class DocFormFieldNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Champ de formulaire (${identifier}) introuvable` : 'Champ de formulaire introuvable';
    super(msg, 'DOC_FORM_FIELD_NOT_FOUND_ERROR', 404);
  }
}

export class DocFormFieldCreateError extends AppError {
  constructor(message = 'Impossible de créer le champ de formulaire') {
    super(message, 'DOC_FORM_FIELD_CREATE_ERROR', 500);
  }
}

export class DocFormFieldUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le champ de formulaire') {
    super(message, 'DOC_FORM_FIELD_UPDATE_ERROR', 500);
  }
}

export class DocFormFieldDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le champ de formulaire') {
    super(message, 'DOC_FORM_FIELD_DELETE_ERROR', 500);
  }
}

// ─── Custom Field errors ───────────────────────────────────────────────────

export class DocCustomFieldNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Champ personnalisé (${identifier}) introuvable` : 'Champ personnalisé introuvable';
    super(msg, 'DOC_CUSTOM_FIELD_NOT_FOUND_ERROR', 404);
  }
}

export class DocCustomFieldCreateError extends AppError {
  constructor(message = 'Impossible de créer le champ personnalisé') {
    super(message, 'DOC_CUSTOM_FIELD_CREATE_ERROR', 500);
  }
}

export class DocCustomFieldUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le champ personnalisé') {
    super(message, 'DOC_CUSTOM_FIELD_UPDATE_ERROR', 500);
  }
}

export class DocCustomFieldDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le champ personnalisé') {
    super(message, 'DOC_CUSTOM_FIELD_DELETE_ERROR', 500);
  }
}

// ─── Branding errors ───────────────────────────────────────────────────────

export class DocBrandingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Branding (${identifier}) introuvable` : 'Configuration branding introuvable';
    super(msg, 'DOC_BRANDING_NOT_FOUND_ERROR', 404);
  }
}

export class DocBrandingUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le branding') {
    super(message, 'DOC_BRANDING_UPDATE_ERROR', 500);
  }
}

export class DocBrandingPresetError extends AppError {
  constructor(message = 'Erreur lors de l\'application du préréglage branding') {
    super(message, 'DOC_BRANDING_PRESET_ERROR', 500);
  }
}

export class DocBrandingPreviewError extends AppError {
  constructor(message = 'Erreur lors de la génération de l\'aperçu branding') {
    super(message, 'DOC_BRANDING_PREVIEW_ERROR', 500);
  }
}

// ==================== PHASE 3: ENTERPRISE INTEGRATION RE-EXPORTS ====================
export * from './phase3-integration';
export * from './phase3-automation-connector';
export * from './phase3-ai-marketplace-obs-sec';

// ==================== PHASE 2.6: AI CORE PLATFORM RE-EXPORTS ====================
export * from './phase2-6-ai';

// ==================== PHASE 2.7: LXP LEARNING EXPERIENCE PLATFORM RE-EXPORTS ====================
export * from './phase2-7-lxp';

// ==================== PHASE 2.8: SMART CAMPUS ENTERPRISE RE-EXPORTS ====================
export * from './phase2-8-smart-campus';

// ==================== PHASE 2.9: GOVERNMENT & NATIONAL GOVERNANCE RE-EXPORTS ====================
export * from './phase2-9-gov';

// ==================== PHASE 2.10: ENTERPRISE ECOSYSTEM FINALIZATION RE-EXPORTS ====================
export * from './phase2-10-enterprise';

// ==================== PHASE 3.1: EDUCATION INTELLIGENCE PLATFORM RE-EXPORTS ====================
export * from './phase3-1-intelligence';

// ==================== PHASE 3.2: ADAPTIVE LEARNING INTELLIGENCE RE-EXPORTS ====================
export * from './phase3-2-adaptive';

// ==================== PHASE 3.3: INTELLIGENT ASSESSMENT & CERTIFICATION RE-EXPORTS ====================
export * from './phase3-3-assessment';

// ==================== PHASE 3.4: EDUOS & ECOSYSTEM ORCHESTRATION RE-EXPORTS ====================
export * from './phase3-4-eduos';

// ==================== PHASE 3.5: GLOBAL EDUCATION CLOUD & DIGITAL TWIN ====================
export * from './phase3-5-global';

// ==================== PHASE 4.0: AUTONOMOUS EDUCATION INTELLIGENCE PLATFORM ====================
export * from './phase4-aeip';

// ==================== PHASE 4.1: GOVERNMENT & NATIONAL EDUCATION ====================
export * from './phase4-1-gov';

// ==================== PHASE 4.2: GLOBAL EDUCATION GOVERNANCE & INTERNATIONAL NETWORK ====================
export * from './phase4-2-gegin';

// ==================== PHASE 4.3: GLOBAL EDUCATION INTEROPERABILITY & DATA EXCHANGE ====================
export * from './phase4-3-gei2p';

// ==================== PHASE 4.4: GLOBAL EDUCATION ECONOMY, WORKFORCE & LIFELONG LEARNING ====================
export * from './phase4-4-gewlp';

// ==================== PHASE 4.5: GLOBAL EDUCATION FINANCIAL INFRASTRUCTURE & ECONOMIC INTELLIGENCE ====================
export * from './phase4-5-gefi';

// ==================== PHASE 4.6: GLOBAL EDUCATION HEALTH, WELLBEING & SAFEGUARDING ====================
export * from './phase4-6-health';

// ==================== PHASE 4.7: GESTION CRP ====================
export * from './phase4-7-gestcrp';

// ==================== PHASE 4.8: GECIRAP ====================
export * from './phase4-8-gecirap';

// ==================== PHASE 4.9: GEDKIN ====================
export * from './phase4-9-gedkin';

// ==================== PHASE 4.10: GEAESIP ====================
export * from './phase4-10-geaesip';

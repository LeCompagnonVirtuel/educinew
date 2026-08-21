import { AppError } from './AppError';

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 2.9 — Government & National Governance Enterprise Errors
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Module 1: Ministry & National Administration (48 errors) ────────────────

// Ministry
export class GovMinistryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Ministère (${identifier}) introuvable` : 'Ministère introuvable';
    super(msg, 'GOV_MINISTRY_NOT_FOUND', 404);
  }
}

export class GovMinistryCreateError extends AppError {
  constructor(message = 'Impossible de créer le ministère') {
    super(message, 'GOV_MINISTRY_CREATE_ERROR', 500);
  }
}

export class GovMinistryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le ministère') {
    super(message, 'GOV_MINISTRY_UPDATE_ERROR', 500);
  }
}

export class GovMinistryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le ministère') {
    super(message, 'GOV_MINISTRY_DELETE_ERROR', 500);
  }
}

// MinistryDepartment
export class GovMinistryDepartmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Département ministériel (${identifier}) introuvable` : 'Département ministériel introuvable';
    super(msg, 'GOV_MINISTRY_DEPARTMENT_NOT_FOUND', 404);
  }
}

export class GovMinistryDepartmentCreateError extends AppError {
  constructor(message = 'Impossible de créer le département ministériel') {
    super(message, 'GOV_MINISTRY_DEPARTMENT_CREATE_ERROR', 500);
  }
}

export class GovMinistryDepartmentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le département ministériel') {
    super(message, 'GOV_MINISTRY_DEPARTMENT_UPDATE_ERROR', 500);
  }
}

export class GovMinistryDepartmentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le département ministériel') {
    super(message, 'GOV_MINISTRY_DEPARTMENT_DELETE_ERROR', 500);
  }
}

// Directorate
export class GovDirectorateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Direction (${identifier}) introuvable` : 'Direction introuvable';
    super(msg, 'GOV_DIRECTORATE_NOT_FOUND', 404);
  }
}

export class GovDirectorateCreateError extends AppError {
  constructor(message = 'Impossible de créer la direction') {
    super(message, 'GOV_DIRECTORATE_CREATE_ERROR', 500);
  }
}

export class GovDirectorateUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la direction') {
    super(message, 'GOV_DIRECTORATE_UPDATE_ERROR', 500);
  }
}

export class GovDirectorateDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la direction') {
    super(message, 'GOV_DIRECTORATE_DELETE_ERROR', 500);
  }
}

// EducationPolicy
export class GovEducationPolicyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Politique éducative (${identifier}) introuvable` : 'Politique éducative introuvable';
    super(msg, 'GOV_EDUCATION_POLICY_NOT_FOUND', 404);
  }
}

export class GovEducationPolicyCreateError extends AppError {
  constructor(message = 'Impossible de créer la politique éducative') {
    super(message, 'GOV_EDUCATION_POLICY_CREATE_ERROR', 500);
  }
}

export class GovEducationPolicyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la politique éducative') {
    super(message, 'GOV_EDUCATION_POLICY_UPDATE_ERROR', 500);
  }
}

export class GovEducationPolicyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la politique éducative') {
    super(message, 'GOV_EDUCATION_POLICY_DELETE_ERROR', 500);
  }
}

// NationalProgram
export class GovNationalProgramNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Programme national (${identifier}) introuvable` : 'Programme national introuvable';
    super(msg, 'GOV_NATIONAL_PROGRAM_NOT_FOUND', 404);
  }
}

export class GovNationalProgramCreateError extends AppError {
  constructor(message = 'Impossible de créer le programme national') {
    super(message, 'GOV_NATIONAL_PROGRAM_CREATE_ERROR', 500);
  }
}

export class GovNationalProgramUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le programme national') {
    super(message, 'GOV_NATIONAL_PROGRAM_UPDATE_ERROR', 500);
  }
}

export class GovNationalProgramDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le programme national') {
    super(message, 'GOV_NATIONAL_PROGRAM_DELETE_ERROR', 500);
  }
}

// EducationStrategy
export class GovEducationStrategyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Stratégie éducative (${identifier}) introuvable` : 'Stratégie éducative introuvable';
    super(msg, 'GOV_EDUCATION_STRATEGY_NOT_FOUND', 404);
  }
}

export class GovEducationStrategyCreateError extends AppError {
  constructor(message = 'Impossible de créer la stratégie éducative') {
    super(message, 'GOV_EDUCATION_STRATEGY_CREATE_ERROR', 500);
  }
}

export class GovEducationStrategyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la stratégie éducative') {
    super(message, 'GOV_EDUCATION_STRATEGY_UPDATE_ERROR', 500);
  }
}

export class GovEducationStrategyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la stratégie éducative') {
    super(message, 'GOV_EDUCATION_STRATEGY_DELETE_ERROR', 500);
  }
}

// Circular
export class GovCircularNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Circulaire (${identifier}) introuvable` : 'Circulaire introuvable';
    super(msg, 'GOV_CIRCULAR_NOT_FOUND', 404);
  }
}

export class GovCircularCreateError extends AppError {
  constructor(message = 'Impossible de créer la circulaire') {
    super(message, 'GOV_CIRCULAR_CREATE_ERROR', 500);
  }
}

export class GovCircularUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la circulaire') {
    super(message, 'GOV_CIRCULAR_UPDATE_ERROR', 500);
  }
}

export class GovCircularDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la circulaire') {
    super(message, 'GOV_CIRCULAR_DELETE_ERROR', 500);
  }
}

// OfficialDocument
export class GovOfficialDocumentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Document officiel (${identifier}) introuvable` : 'Document officiel introuvable';
    super(msg, 'GOV_OFFICIAL_DOCUMENT_NOT_FOUND', 404);
  }
}

export class GovOfficialDocumentCreateError extends AppError {
  constructor(message = 'Impossible de créer le document officiel') {
    super(message, 'GOV_OFFICIAL_DOCUMENT_CREATE_ERROR', 500);
  }
}

export class GovOfficialDocumentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le document officiel') {
    super(message, 'GOV_OFFICIAL_DOCUMENT_UPDATE_ERROR', 500);
  }
}

export class GovOfficialDocumentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le document officiel') {
    super(message, 'GOV_OFFICIAL_DOCUMENT_DELETE_ERROR', 500);
  }
}

// EducationCalendar
export class GovEducationCalendarNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Calendrier éducatif (${identifier}) introuvable` : 'Calendrier éducatif introuvable';
    super(msg, 'GOV_EDUCATION_CALENDAR_NOT_FOUND', 404);
  }
}

export class GovEducationCalendarCreateError extends AppError {
  constructor(message = 'Impossible de créer le calendrier éducatif') {
    super(message, 'GOV_EDUCATION_CALENDAR_CREATE_ERROR', 500);
  }
}

export class GovEducationCalendarUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le calendrier éducatif') {
    super(message, 'GOV_EDUCATION_CALENDAR_UPDATE_ERROR', 500);
  }
}

export class GovEducationCalendarDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le calendrier éducatif') {
    super(message, 'GOV_EDUCATION_CALENDAR_DELETE_ERROR', 500);
  }
}

// NationalStatistic
export class GovNationalStatisticNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Statistique nationale (${identifier}) introuvable` : 'Statistique nationale introuvable';
    super(msg, 'GOV_NATIONAL_STATISTIC_NOT_FOUND', 404);
  }
}

export class GovNationalStatisticCreateError extends AppError {
  constructor(message = 'Impossible de créer la statistique nationale') {
    super(message, 'GOV_NATIONAL_STATISTIC_CREATE_ERROR', 500);
  }
}

export class GovNationalStatisticUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la statistique nationale') {
    super(message, 'GOV_NATIONAL_STATISTIC_UPDATE_ERROR', 500);
  }
}

export class GovNationalStatisticDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la statistique nationale') {
    super(message, 'GOV_NATIONAL_STATISTIC_DELETE_ERROR', 500);
  }
}

// MinistryUser
export class GovMinistryUserNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Utilisateur ministériel (${identifier}) introuvable` : 'Utilisateur ministériel introuvable';
    super(msg, 'GOV_MINISTRY_USER_NOT_FOUND', 404);
  }
}

export class GovMinistryUserCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'utilisateur ministériel') {
    super(message, 'GOV_MINISTRY_USER_CREATE_ERROR', 500);
  }
}

export class GovMinistryUserUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'utilisateur ministériel') {
    super(message, 'GOV_MINISTRY_USER_UPDATE_ERROR', 500);
  }
}

export class GovMinistryUserDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'utilisateur ministériel') {
    super(message, 'GOV_MINISTRY_USER_DELETE_ERROR', 500);
  }
}

// MinistryNotification
export class GovMinistryNotificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Notification ministérielle (${identifier}) introuvable` : 'Notification ministérielle introuvable';
    super(msg, 'GOV_MINISTRY_NOTIFICATION_NOT_FOUND', 404);
  }
}

export class GovMinistryNotificationCreateError extends AppError {
  constructor(message = 'Impossible de créer la notification ministérielle') {
    super(message, 'GOV_MINISTRY_NOTIFICATION_CREATE_ERROR', 500);
  }
}

export class GovMinistryNotificationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la notification ministérielle') {
    super(message, 'GOV_MINISTRY_NOTIFICATION_UPDATE_ERROR', 500);
  }
}

export class GovMinistryNotificationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la notification ministérielle') {
    super(message, 'GOV_MINISTRY_NOTIFICATION_DELETE_ERROR', 500);
  }
}

// ─── Module 2: Regional Education Governance (40 errors) ────────────────────

// EducationRegion
export class GovEducationRegionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Région éducative (${identifier}) introuvable` : 'Région éducative introuvable';
    super(msg, 'GOV_EDUCATION_REGION_NOT_FOUND', 404);
  }
}

export class GovEducationRegionCreateError extends AppError {
  constructor(message = 'Impossible de créer la région éducative') {
    super(message, 'GOV_EDUCATION_REGION_CREATE_ERROR', 500);
  }
}

export class GovEducationRegionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la région éducative') {
    super(message, 'GOV_EDUCATION_REGION_UPDATE_ERROR', 500);
  }
}

export class GovEducationRegionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la région éducative') {
    super(message, 'GOV_EDUCATION_REGION_DELETE_ERROR', 500);
  }
}

// EducationDistrict
export class GovEducationDistrictNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `District scolaire (${identifier}) introuvable` : 'District scolaire introuvable';
    super(msg, 'GOV_EDUCATION_DISTRICT_NOT_FOUND', 404);
  }
}

export class GovEducationDistrictCreateError extends AppError {
  constructor(message = 'Impossible de créer le district scolaire') {
    super(message, 'GOV_EDUCATION_DISTRICT_CREATE_ERROR', 500);
  }
}

export class GovEducationDistrictUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le district scolaire') {
    super(message, 'GOV_EDUCATION_DISTRICT_UPDATE_ERROR', 500);
  }
}

export class GovEducationDistrictDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le district scolaire') {
    super(message, 'GOV_EDUCATION_DISTRICT_DELETE_ERROR', 500);
  }
}

// Academy
export class GovAcademyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Académie (${identifier}) introuvable` : 'Académie introuvable';
    super(msg, 'GOV_ACADEMY_NOT_FOUND', 404);
  }
}

export class GovAcademyCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'académie') {
    super(message, 'GOV_ACADEMY_CREATE_ERROR', 500);
  }
}

export class GovAcademyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'académie') {
    super(message, 'GOV_ACADEMY_UPDATE_ERROR', 500);
  }
}

export class GovAcademyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'académie') {
    super(message, 'GOV_ACADEMY_DELETE_ERROR', 500);
  }
}

// RegionalDirectorate
export class GovRegionalDirectorateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Direction régionale (${identifier}) introuvable` : 'Direction régionale introuvable';
    super(msg, 'GOV_REGIONAL_DIRECTORATE_NOT_FOUND', 404);
  }
}

export class GovRegionalDirectorateCreateError extends AppError {
  constructor(message = 'Impossible de créer la direction régionale') {
    super(message, 'GOV_REGIONAL_DIRECTORATE_CREATE_ERROR', 500);
  }
}

export class GovRegionalDirectorateUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la direction régionale') {
    super(message, 'GOV_REGIONAL_DIRECTORATE_UPDATE_ERROR', 500);
  }
}

export class GovRegionalDirectorateDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la direction régionale') {
    super(message, 'GOV_REGIONAL_DIRECTORATE_DELETE_ERROR', 500);
  }
}

// Inspector
export class GovInspectorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Inspecteur (${identifier}) introuvable` : 'Inspecteur introuvable';
    super(msg, 'GOV_INSPECTOR_NOT_FOUND', 404);
  }
}

export class GovInspectorCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'inspecteur') {
    super(message, 'GOV_INSPECTOR_CREATE_ERROR', 500);
  }
}

export class GovInspectorUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'inspecteur') {
    super(message, 'GOV_INSPECTOR_UPDATE_ERROR', 500);
  }
}

export class GovInspectorDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'inspecteur') {
    super(message, 'GOV_INSPECTOR_DELETE_ERROR', 500);
  }
}

// InspectionVisit
export class GovInspectionVisitNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Visite d'inspection (${identifier}) introuvable` : 'Visite d\'inspection introuvable';
    super(msg, 'GOV_INSPECTION_VISIT_NOT_FOUND', 404);
  }
}

export class GovInspectionVisitCreateError extends AppError {
  constructor(message = 'Impossible de créer la visite d\'inspection') {
    super(message, 'GOV_INSPECTION_VISIT_CREATE_ERROR', 500);
  }
}

export class GovInspectionVisitUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la visite d\'inspection') {
    super(message, 'GOV_INSPECTION_VISIT_UPDATE_ERROR', 500);
  }
}

export class GovInspectionVisitDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la visite d\'inspection') {
    super(message, 'GOV_INSPECTION_VISIT_DELETE_ERROR', 500);
  }
}

// RegionalReport
export class GovRegionalReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport régional (${identifier}) introuvable` : 'Rapport régional introuvable';
    super(msg, 'GOV_REGIONAL_REPORT_NOT_FOUND', 404);
  }
}

export class GovRegionalReportCreateError extends AppError {
  constructor(message = 'Impossible de créer le rapport régional') {
    super(message, 'GOV_REGIONAL_REPORT_CREATE_ERROR', 500);
  }
}

export class GovRegionalReportUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le rapport régional') {
    super(message, 'GOV_REGIONAL_REPORT_UPDATE_ERROR', 500);
  }
}

export class GovRegionalReportDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le rapport régional') {
    super(message, 'GOV_REGIONAL_REPORT_DELETE_ERROR', 500);
  }
}

// RegionalKpi
export class GovRegionalKpiNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Indicateur régional (${identifier}) introuvable` : 'Indicateur régional introuvable';
    super(msg, 'GOV_REGIONAL_KPI_NOT_FOUND', 404);
  }
}

export class GovRegionalKpiCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'indicateur régional') {
    super(message, 'GOV_REGIONAL_KPI_CREATE_ERROR', 500);
  }
}

export class GovRegionalKpiUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'indicateur régional') {
    super(message, 'GOV_REGIONAL_KPI_UPDATE_ERROR', 500);
  }
}

export class GovRegionalKpiDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'indicateur régional') {
    super(message, 'GOV_REGIONAL_KPI_DELETE_ERROR', 500);
  }
}

// DistrictReport
export class GovDistrictReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport de district (${identifier}) introuvable` : 'Rapport de district introuvable';
    super(msg, 'GOV_DISTRICT_REPORT_NOT_FOUND', 404);
  }
}

export class GovDistrictReportCreateError extends AppError {
  constructor(message = 'Impossible de créer le rapport de district') {
    super(message, 'GOV_DISTRICT_REPORT_CREATE_ERROR', 500);
  }
}

export class GovDistrictReportUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le rapport de district') {
    super(message, 'GOV_DISTRICT_REPORT_UPDATE_ERROR', 500);
  }
}

export class GovDistrictReportDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le rapport de district') {
    super(message, 'GOV_DISTRICT_REPORT_DELETE_ERROR', 500);
  }
}

// RegionUser
export class GovRegionUserNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Utilisateur régional (${identifier}) introuvable` : 'Utilisateur régional introuvable';
    super(msg, 'GOV_REGION_USER_NOT_FOUND', 404);
  }
}

export class GovRegionUserCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'utilisateur régional') {
    super(message, 'GOV_REGION_USER_CREATE_ERROR', 500);
  }
}

export class GovRegionUserUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'utilisateur régional') {
    super(message, 'GOV_REGION_USER_UPDATE_ERROR', 500);
  }
}

export class GovRegionUserDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'utilisateur régional') {
    super(message, 'GOV_REGION_USER_DELETE_ERROR', 500);
  }
}

// ─── Module 3: Multi-Campus Administration (40 errors) ──────────────────────

// Campus
export class GovCampusNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Campus (${identifier}) introuvable` : 'Campus introuvable';
    super(msg, 'GOV_CAMPUS_NOT_FOUND', 404);
  }
}

export class GovCampusCreateError extends AppError {
  constructor(message = 'Impossible de créer le campus') {
    super(message, 'GOV_CAMPUS_CREATE_ERROR', 500);
  }
}

export class GovCampusUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le campus') {
    super(message, 'GOV_CAMPUS_UPDATE_ERROR', 500);
  }
}

export class GovCampusDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le campus') {
    super(message, 'GOV_CAMPUS_DELETE_ERROR', 500);
  }
}

// CampusGroup
export class GovCampusGroupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Groupe de campus (${identifier}) introuvable` : 'Groupe de campus introuvable';
    super(msg, 'GOV_CAMPUS_GROUP_NOT_FOUND', 404);
  }
}

export class GovCampusGroupCreateError extends AppError {
  constructor(message = 'Impossible de créer le groupe de campus') {
    super(message, 'GOV_CAMPUS_GROUP_CREATE_ERROR', 500);
  }
}

export class GovCampusGroupUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le groupe de campus') {
    super(message, 'GOV_CAMPUS_GROUP_UPDATE_ERROR', 500);
  }
}

export class GovCampusGroupDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le groupe de campus') {
    super(message, 'GOV_CAMPUS_GROUP_DELETE_ERROR', 500);
  }
}

// CampusGroupMember
export class GovCampusGroupMemberNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Membre du groupe (${identifier}) introuvable` : 'Membre du groupe introuvable';
    super(msg, 'GOV_CAMPUS_GROUP_MEMBER_NOT_FOUND', 404);
  }
}

export class GovCampusGroupMemberCreateError extends AppError {
  constructor(message = 'Impossible de créer le membre du groupe') {
    super(message, 'GOV_CAMPUS_GROUP_MEMBER_CREATE_ERROR', 500);
  }
}

export class GovCampusGroupMemberUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le membre du groupe') {
    super(message, 'GOV_CAMPUS_GROUP_MEMBER_UPDATE_ERROR', 500);
  }
}

export class GovCampusGroupMemberDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le membre du groupe') {
    super(message, 'GOV_CAMPUS_GROUP_MEMBER_DELETE_ERROR', 500);
  }
}

// SharedResource
export class GovSharedResourceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Ressource partagée (${identifier}) introuvable` : 'Ressource partagée introuvable';
    super(msg, 'GOV_SHARED_RESOURCE_NOT_FOUND', 404);
  }
}

export class GovSharedResourceCreateError extends AppError {
  constructor(message = 'Impossible de créer la ressource partagée') {
    super(message, 'GOV_SHARED_RESOURCE_CREATE_ERROR', 500);
  }
}

export class GovSharedResourceUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la ressource partagée') {
    super(message, 'GOV_SHARED_RESOURCE_UPDATE_ERROR', 500);
  }
}

export class GovSharedResourceDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la ressource partagée') {
    super(message, 'GOV_SHARED_RESOURCE_DELETE_ERROR', 500);
  }
}

// SharedResourceBooking
export class GovSharedResourceBookingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réservation de ressource (${identifier}) introuvable` : 'Réservation de ressource introuvable';
    super(msg, 'GOV_SHARED_RESOURCE_BOOKING_NOT_FOUND', 404);
  }
}

export class GovSharedResourceBookingCreateError extends AppError {
  constructor(message = 'Impossible de créer la réservation de ressource') {
    super(message, 'GOV_SHARED_RESOURCE_BOOKING_CREATE_ERROR', 500);
  }
}

export class GovSharedResourceBookingUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la réservation de ressource') {
    super(message, 'GOV_SHARED_RESOURCE_BOOKING_UPDATE_ERROR', 500);
  }
}

export class GovSharedResourceBookingDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la réservation de ressource') {
    super(message, 'GOV_SHARED_RESOURCE_BOOKING_DELETE_ERROR', 500);
  }
}

// CrossCampusUser
export class GovCrossCampusUserNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Utilisateur inter-campus (${identifier}) introuvable` : 'Utilisateur inter-campus introuvable';
    super(msg, 'GOV_CROSS_CAMPUS_USER_NOT_FOUND', 404);
  }
}

export class GovCrossCampusUserCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'utilisateur inter-campus') {
    super(message, 'GOV_CROSS_CAMPUS_USER_CREATE_ERROR', 500);
  }
}

export class GovCrossCampusUserUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'utilisateur inter-campus') {
    super(message, 'GOV_CROSS_CAMPUS_USER_UPDATE_ERROR', 500);
  }
}

export class GovCrossCampusUserDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'utilisateur inter-campus') {
    super(message, 'GOV_CROSS_CAMPUS_USER_DELETE_ERROR', 500);
  }
}

// CampusTransfer
export class GovCampusTransferNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Transfert de campus (${identifier}) introuvable` : 'Transfert de campus introuvable';
    super(msg, 'GOV_CAMPUS_TRANSFER_NOT_FOUND', 404);
  }
}

export class GovCampusTransferCreateError extends AppError {
  constructor(message = 'Impossible de créer le transfert de campus') {
    super(message, 'GOV_CAMPUS_TRANSFER_CREATE_ERROR', 500);
  }
}

export class GovCampusTransferUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le transfert de campus') {
    super(message, 'GOV_CAMPUS_TRANSFER_UPDATE_ERROR', 500);
  }
}

export class GovCampusTransferDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le transfert de campus') {
    super(message, 'GOV_CAMPUS_TRANSFER_DELETE_ERROR', 500);
  }
}

// CentralizedAdministration
export class GovCentralizedAdministrationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Administration centralisée (${identifier}) introuvable` : 'Administration centralisée introuvable';
    super(msg, 'GOV_CENTRALIZED_ADMINISTRATION_NOT_FOUND', 404);
  }
}

export class GovCentralizedAdministrationCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'administration centralisée') {
    super(message, 'GOV_CENTRALIZED_ADMINISTRATION_CREATE_ERROR', 500);
  }
}

export class GovCentralizedAdministrationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'administration centralisée') {
    super(message, 'GOV_CENTRALIZED_ADMINISTRATION_UPDATE_ERROR', 500);
  }
}

export class GovCentralizedAdministrationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'administration centralisée') {
    super(message, 'GOV_CENTRALIZED_ADMINISTRATION_DELETE_ERROR', 500);
  }
}

// CampusAnalytics
export class GovCampusAnalyticsNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Analytique de campus (${identifier}) introuvable` : 'Analytique de campus introuvable';
    super(msg, 'GOV_CAMPUS_ANALYTICS_NOT_FOUND', 404);
  }
}

export class GovCampusAnalyticsCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'analytique de campus') {
    super(message, 'GOV_CAMPUS_ANALYTICS_CREATE_ERROR', 500);
  }
}

export class GovCampusAnalyticsUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'analytique de campus') {
    super(message, 'GOV_CAMPUS_ANALYTICS_UPDATE_ERROR', 500);
  }
}

export class GovCampusAnalyticsDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'analytique de campus') {
    super(message, 'GOV_CAMPUS_ANALYTICS_DELETE_ERROR', 500);
  }
}

// InterCampusCommunication
export class GovInterCampusCommunicationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Communication inter-campus (${identifier}) introuvable` : 'Communication inter-campus introuvable';
    super(msg, 'GOV_INTER_CAMPUS_COMMUNICATION_NOT_FOUND', 404);
  }
}

export class GovInterCampusCommunicationCreateError extends AppError {
  constructor(message = 'Impossible de créer la communication inter-campus') {
    super(message, 'GOV_INTER_CAMPUS_COMMUNICATION_CREATE_ERROR', 500);
  }
}

export class GovInterCampusCommunicationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la communication inter-campus') {
    super(message, 'GOV_INTER_CAMPUS_COMMUNICATION_UPDATE_ERROR', 500);
  }
}

export class GovInterCampusCommunicationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la communication inter-campus') {
    super(message, 'GOV_INTER_CAMPUS_COMMUNICATION_DELETE_ERROR', 500);
  }
}

// ─── Module 4: School Networks & Groups (40 errors) ─────────────────────────

// SchoolNetwork
export class GovSchoolNetworkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réseau scolaire (${identifier}) introuvable` : 'Réseau scolaire introuvable';
    super(msg, 'GOV_SCHOOL_NETWORK_NOT_FOUND', 404);
  }
}

export class GovSchoolNetworkCreateError extends AppError {
  constructor(message = 'Impossible de créer le réseau scolaire') {
    super(message, 'GOV_SCHOOL_NETWORK_CREATE_ERROR', 500);
  }
}

export class GovSchoolNetworkUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le réseau scolaire') {
    super(message, 'GOV_SCHOOL_NETWORK_UPDATE_ERROR', 500);
  }
}

export class GovSchoolNetworkDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le réseau scolaire') {
    super(message, 'GOV_SCHOOL_NETWORK_DELETE_ERROR', 500);
  }
}

// NetworkMember
export class GovNetworkMemberNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Membre du réseau (${identifier}) introuvable` : 'Membre du réseau introuvable';
    super(msg, 'GOV_NETWORK_MEMBER_NOT_FOUND', 404);
  }
}

export class GovNetworkMemberCreateError extends AppError {
  constructor(message = 'Impossible de créer le membre du réseau') {
    super(message, 'GOV_NETWORK_MEMBER_CREATE_ERROR', 500);
  }
}

export class GovNetworkMemberUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le membre du réseau') {
    super(message, 'GOV_NETWORK_MEMBER_UPDATE_ERROR', 500);
  }
}

export class GovNetworkMemberDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le membre du réseau') {
    super(message, 'GOV_NETWORK_MEMBER_DELETE_ERROR', 500);
  }
}

// SchoolChain
export class GovSchoolChainNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Chaîne scolaire (${identifier}) introuvable` : 'Chaîne scolaire introuvable';
    super(msg, 'GOV_SCHOOL_CHAIN_NOT_FOUND', 404);
  }
}

export class GovSchoolChainCreateError extends AppError {
  constructor(message = 'Impossible de créer la chaîne scolaire') {
    super(message, 'GOV_SCHOOL_CHAIN_CREATE_ERROR', 500);
  }
}

export class GovSchoolChainUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la chaîne scolaire') {
    super(message, 'GOV_SCHOOL_CHAIN_UPDATE_ERROR', 500);
  }
}

export class GovSchoolChainDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la chaîne scolaire') {
    super(message, 'GOV_SCHOOL_CHAIN_DELETE_ERROR', 500);
  }
}

// SchoolFranchise
export class GovSchoolFranchiseNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Franchise scolaire (${identifier}) introuvable` : 'Franchise scolaire introuvable';
    super(msg, 'GOV_SCHOOL_FRANCHISE_NOT_FOUND', 404);
  }
}

export class GovSchoolFranchiseCreateError extends AppError {
  constructor(message = 'Impossible de créer la franchise scolaire') {
    super(message, 'GOV_SCHOOL_FRANCHISE_CREATE_ERROR', 500);
  }
}

export class GovSchoolFranchiseUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la franchise scolaire') {
    super(message, 'GOV_SCHOOL_FRANCHISE_UPDATE_ERROR', 500);
  }
}

export class GovSchoolFranchiseDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la franchise scolaire') {
    super(message, 'GOV_SCHOOL_FRANCHISE_DELETE_ERROR', 500);
  }
}

// ReligiousSchoolGroup
export class GovReligiousSchoolGroupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Groupe scolaire religieux (${identifier}) introuvable` : 'Groupe scolaire religieux introuvable';
    super(msg, 'GOV_RELIGIOUS_SCHOOL_GROUP_NOT_FOUND', 404);
  }
}

export class GovReligiousSchoolGroupCreateError extends AppError {
  constructor(message = 'Impossible de créer le groupe scolaire religieux') {
    super(message, 'GOV_RELIGIOUS_SCHOOL_GROUP_CREATE_ERROR', 500);
  }
}

export class GovReligiousSchoolGroupUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le groupe scolaire religieux') {
    super(message, 'GOV_RELIGIOUS_SCHOOL_GROUP_UPDATE_ERROR', 500);
  }
}

export class GovReligiousSchoolGroupDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le groupe scolaire religieux') {
    super(message, 'GOV_RELIGIOUS_SCHOOL_GROUP_DELETE_ERROR', 500);
  }
}

// PrivateSchoolGroup
export class GovPrivateSchoolGroupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Groupe scolaire privé (${identifier}) introuvable` : 'Groupe scolaire privé introuvable';
    super(msg, 'GOV_PRIVATE_SCHOOL_GROUP_NOT_FOUND', 404);
  }
}

export class GovPrivateSchoolGroupCreateError extends AppError {
  constructor(message = 'Impossible de créer le groupe scolaire privé') {
    super(message, 'GOV_PRIVATE_SCHOOL_GROUP_CREATE_ERROR', 500);
  }
}

export class GovPrivateSchoolGroupUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le groupe scolaire privé') {
    super(message, 'GOV_PRIVATE_SCHOOL_GROUP_UPDATE_ERROR', 500);
  }
}

export class GovPrivateSchoolGroupDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le groupe scolaire privé') {
    super(message, 'GOV_PRIVATE_SCHOOL_GROUP_DELETE_ERROR', 500);
  }
}

// NgoSchoolGroup
export class GovNgoSchoolGroupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Groupe scolaire ONG (${identifier}) introuvable` : 'Groupe scolaire ONG introuvable';
    super(msg, 'GOV_NGO_SCHOOL_GROUP_NOT_FOUND', 404);
  }
}

export class GovNgoSchoolGroupCreateError extends AppError {
  constructor(message = 'Impossible de créer le groupe scolaire ONG') {
    super(message, 'GOV_NGO_SCHOOL_GROUP_CREATE_ERROR', 500);
  }
}

export class GovNgoSchoolGroupUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le groupe scolaire ONG') {
    super(message, 'GOV_NGO_SCHOOL_GROUP_UPDATE_ERROR', 500);
  }
}

export class GovNgoSchoolGroupDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le groupe scolaire ONG') {
    super(message, 'GOV_NGO_SCHOOL_GROUP_DELETE_ERROR', 500);
  }
}

// InternationalSchoolGroup
export class GovInternationalSchoolGroupNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Groupe scolaire international (${identifier}) introuvable` : 'Groupe scolaire international introuvable';
    super(msg, 'GOV_INTERNATIONAL_SCHOOL_GROUP_NOT_FOUND', 404);
  }
}

export class GovInternationalSchoolGroupCreateError extends AppError {
  constructor(message = 'Impossible de créer le groupe scolaire international') {
    super(message, 'GOV_INTERNATIONAL_SCHOOL_GROUP_CREATE_ERROR', 500);
  }
}

export class GovInternationalSchoolGroupUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le groupe scolaire international') {
    super(message, 'GOV_INTERNATIONAL_SCHOOL_GROUP_UPDATE_ERROR', 500);
  }
}

export class GovInternationalSchoolGroupDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le groupe scolaire international') {
    super(message, 'GOV_INTERNATIONAL_SCHOOL_GROUP_DELETE_ERROR', 500);
  }
}

// NetworkAgreement
export class GovNetworkAgreementNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accord de réseau (${identifier}) introuvable` : 'Accord de réseau introuvable';
    super(msg, 'GOV_NETWORK_AGREEMENT_NOT_FOUND', 404);
  }
}

export class GovNetworkAgreementCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'accord de réseau') {
    super(message, 'GOV_NETWORK_AGREEMENT_CREATE_ERROR', 500);
  }
}

export class GovNetworkAgreementUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'accord de réseau') {
    super(message, 'GOV_NETWORK_AGREEMENT_UPDATE_ERROR', 500);
  }
}

export class GovNetworkAgreementDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'accord de réseau') {
    super(message, 'GOV_NETWORK_AGREEMENT_DELETE_ERROR', 500);
  }
}

// NetworkReport
export class GovNetworkReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport de réseau (${identifier}) introuvable` : 'Rapport de réseau introuvable';
    super(msg, 'GOV_NETWORK_REPORT_NOT_FOUND', 404);
  }
}

export class GovNetworkReportCreateError extends AppError {
  constructor(message = 'Impossible de créer le rapport de réseau') {
    super(message, 'GOV_NETWORK_REPORT_CREATE_ERROR', 500);
  }
}

export class GovNetworkReportUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le rapport de réseau') {
    super(message, 'GOV_NETWORK_REPORT_UPDATE_ERROR', 500);
  }
}

export class GovNetworkReportDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le rapport de réseau') {
    super(message, 'GOV_NETWORK_REPORT_DELETE_ERROR', 500);
  }
}

// ─── Module 5: National Examinations (48 errors) ────────────────────────────

// NationalExam
export class GovNationalExamNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Examen national (${identifier}) introuvable` : 'Examen national introuvable';
    super(msg, 'GOV_NATIONAL_EXAM_NOT_FOUND', 404);
  }
}

export class GovNationalExamCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'examen national') {
    super(message, 'GOV_NATIONAL_EXAM_CREATE_ERROR', 500);
  }
}

export class GovNationalExamUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'examen national') {
    super(message, 'GOV_NATIONAL_EXAM_UPDATE_ERROR', 500);
  }
}

export class GovNationalExamDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'examen national') {
    super(message, 'GOV_NATIONAL_EXAM_DELETE_ERROR', 500);
  }
}

// ExamCenter
export class GovExamCenterNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Centre d'examen (${identifier}) introuvable` : 'Centre d\'examen introuvable';
    super(msg, 'GOV_EXAM_CENTER_NOT_FOUND', 404);
  }
}

export class GovExamCenterCreateError extends AppError {
  constructor(message = 'Impossible de créer le centre d\'examen') {
    super(message, 'GOV_EXAM_CENTER_CREATE_ERROR', 500);
  }
}

export class GovExamCenterUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le centre d\'examen') {
    super(message, 'GOV_EXAM_CENTER_UPDATE_ERROR', 500);
  }
}

export class GovExamCenterDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le centre d\'examen') {
    super(message, 'GOV_EXAM_CENTER_DELETE_ERROR', 500);
  }
}

// ExamCandidate
export class GovExamCandidateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Candidat (${identifier}) introuvable` : 'Candidat introuvable';
    super(msg, 'GOV_EXAM_CANDIDATE_NOT_FOUND', 404);
  }
}

export class GovExamCandidateCreateError extends AppError {
  constructor(message = 'Impossible de créer le candidat') {
    super(message, 'GOV_EXAM_CANDIDATE_CREATE_ERROR', 500);
  }
}

export class GovExamCandidateUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le candidat') {
    super(message, 'GOV_EXAM_CANDIDATE_UPDATE_ERROR', 500);
  }
}

export class GovExamCandidateDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le candidat') {
    super(message, 'GOV_EXAM_CANDIDATE_DELETE_ERROR', 500);
  }
}

// ExamSupervisor
export class GovExamSupervisorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Superviseur d'examen (${identifier}) introuvable` : 'Superviseur d\'examen introuvable';
    super(msg, 'GOV_EXAM_SUPERVISOR_NOT_FOUND', 404);
  }
}

export class GovExamSupervisorCreateError extends AppError {
  constructor(message = 'Impossible de créer le superviseur d\'examen') {
    super(message, 'GOV_EXAM_SUPERVISOR_CREATE_ERROR', 500);
  }
}

export class GovExamSupervisorUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le superviseur d\'examen') {
    super(message, 'GOV_EXAM_SUPERVISOR_UPDATE_ERROR', 500);
  }
}

export class GovExamSupervisorDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le superviseur d\'examen') {
    super(message, 'GOV_EXAM_SUPERVISOR_DELETE_ERROR', 500);
  }
}

// ExamSession
export class GovExamSessionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Session d'examen (${identifier}) introuvable` : 'Session d\'examen introuvable';
    super(msg, 'GOV_EXAM_SESSION_NOT_FOUND', 404);
  }
}

export class GovExamSessionCreateError extends AppError {
  constructor(message = 'Impossible de créer la session d\'examen') {
    super(message, 'GOV_EXAM_SESSION_CREATE_ERROR', 500);
  }
}

export class GovExamSessionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la session d\'examen') {
    super(message, 'GOV_EXAM_SESSION_UPDATE_ERROR', 500);
  }
}

export class GovExamSessionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la session d\'examen') {
    super(message, 'GOV_EXAM_SESSION_DELETE_ERROR', 500);
  }
}

// MarkingCenter
export class GovMarkingCenterNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Centre de correction (${identifier}) introuvable` : 'Centre de correction introuvable';
    super(msg, 'GOV_MARKING_CENTER_NOT_FOUND', 404);
  }
}

export class GovMarkingCenterCreateError extends AppError {
  constructor(message = 'Impossible de créer le centre de correction') {
    super(message, 'GOV_MARKING_CENTER_CREATE_ERROR', 500);
  }
}

export class GovMarkingCenterUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le centre de correction') {
    super(message, 'GOV_MARKING_CENTER_UPDATE_ERROR', 500);
  }
}

export class GovMarkingCenterDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le centre de correction') {
    super(message, 'GOV_MARKING_CENTER_DELETE_ERROR', 500);
  }
}

// ExamResult
export class GovExamResultNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Résultat d'examen (${identifier}) introuvable` : 'Résultat d\'examen introuvable';
    super(msg, 'GOV_EXAM_RESULT_NOT_FOUND', 404);
  }
}

export class GovExamResultCreateError extends AppError {
  constructor(message = 'Impossible de créer le résultat d\'examen') {
    super(message, 'GOV_EXAM_RESULT_CREATE_ERROR', 500);
  }
}

export class GovExamResultUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le résultat d\'examen') {
    super(message, 'GOV_EXAM_RESULT_UPDATE_ERROR', 500);
  }
}

export class GovExamResultDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le résultat d\'examen') {
    super(message, 'GOV_EXAM_RESULT_DELETE_ERROR', 500);
  }
}

// Certificate
export class GovCertificateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Certificat (${identifier}) introuvable` : 'Certificat introuvable';
    super(msg, 'GOV_CERTIFICATE_NOT_FOUND', 404);
  }
}

export class GovCertificateCreateError extends AppError {
  constructor(message = 'Impossible de créer le certificat') {
    super(message, 'GOV_CERTIFICATE_CREATE_ERROR', 500);
  }
}

export class GovCertificateUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le certificat') {
    super(message, 'GOV_CERTIFICATE_UPDATE_ERROR', 500);
  }
}

export class GovCertificateDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le certificat') {
    super(message, 'GOV_CERTIFICATE_DELETE_ERROR', 500);
  }
}

// Diploma
export class GovDiplomaNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Diplôme (${identifier}) introuvable` : 'Diplôme introuvable';
    super(msg, 'GOV_DIPLOMA_NOT_FOUND', 404);
  }
}

export class GovDiplomaCreateError extends AppError {
  constructor(message = 'Impossible de créer le diplôme') {
    super(message, 'GOV_DIPLOMA_CREATE_ERROR', 500);
  }
}

export class GovDiplomaUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le diplôme') {
    super(message, 'GOV_DIPLOMA_UPDATE_ERROR', 500);
  }
}

export class GovDiplomaDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le diplôme') {
    super(message, 'GOV_DIPLOMA_DELETE_ERROR', 500);
  }
}

// ExamFraud
export class GovExamFraudNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Fraude d'examen (${identifier}) introuvable` : 'Fraude d\'examen introuvable';
    super(msg, 'GOV_EXAM_FRAUD_NOT_FOUND', 404);
  }
}

export class GovExamFraudCreateError extends AppError {
  constructor(message = 'Impossible de créer la fraude d\'examen') {
    super(message, 'GOV_EXAM_FRAUD_CREATE_ERROR', 500);
  }
}

export class GovExamFraudUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la fraude d\'examen') {
    super(message, 'GOV_EXAM_FRAUD_UPDATE_ERROR', 500);
  }
}

export class GovExamFraudDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la fraude d\'examen') {
    super(message, 'GOV_EXAM_FRAUD_DELETE_ERROR', 500);
  }
}

// ExamAppeal
export class GovExamAppealNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Appel d'examen (${identifier}) introuvable` : 'Appel d\'examen introuvable';
    super(msg, 'GOV_EXAM_APPEAL_NOT_FOUND', 404);
  }
}

export class GovExamAppealCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'appel d\'examen') {
    super(message, 'GOV_EXAM_APPEAL_CREATE_ERROR', 500);
  }
}

export class GovExamAppealUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'appel d\'examen') {
    super(message, 'GOV_EXAM_APPEAL_UPDATE_ERROR', 500);
  }
}

export class GovExamAppealDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'appel d\'examen') {
    super(message, 'GOV_EXAM_APPEAL_DELETE_ERROR', 500);
  }
}

// ExamStatistics
export class GovExamStatisticsNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Statistique d'examen (${identifier}) introuvable` : 'Statistique d\'examen introuvable';
    super(msg, 'GOV_EXAM_STATISTICS_NOT_FOUND', 404);
  }
}

export class GovExamStatisticsCreateError extends AppError {
  constructor(message = 'Impossible de créer la statistique d\'examen') {
    super(message, 'GOV_EXAM_STATISTICS_CREATE_ERROR', 500);
  }
}

export class GovExamStatisticsUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la statistique d\'examen') {
    super(message, 'GOV_EXAM_STATISTICS_UPDATE_ERROR', 500);
  }
}

export class GovExamStatisticsDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la statistique d\'examen') {
    super(message, 'GOV_EXAM_STATISTICS_DELETE_ERROR', 500);
  }
}

// ─── Module 6: Inspection & Compliance (40 errors) ──────────────────────────

// InspectionMission
export class GovInspectionMissionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Mission d'inspection (${identifier}) introuvable` : 'Mission d\'inspection introuvable';
    super(msg, 'GOV_INSPECTION_MISSION_NOT_FOUND', 404);
  }
}

export class GovInspectionMissionCreateError extends AppError {
  constructor(message = 'Impossible de créer la mission d\'inspection') {
    super(message, 'GOV_INSPECTION_MISSION_CREATE_ERROR', 500);
  }
}

export class GovInspectionMissionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la mission d\'inspection') {
    super(message, 'GOV_INSPECTION_MISSION_UPDATE_ERROR', 500);
  }
}

export class GovInspectionMissionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la mission d\'inspection') {
    super(message, 'GOV_INSPECTION_MISSION_DELETE_ERROR', 500);
  }
}

// InspectionReport
export class GovInspectionReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport d'inspection (${identifier}) introuvable` : 'Rapport d\'inspection introuvable';
    super(msg, 'GOV_INSPECTION_REPORT_NOT_FOUND', 404);
  }
}

export class GovInspectionReportCreateError extends AppError {
  constructor(message = 'Impossible de créer le rapport d\'inspection') {
    super(message, 'GOV_INSPECTION_REPORT_CREATE_ERROR', 500);
  }
}

export class GovInspectionReportUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le rapport d\'inspection') {
    super(message, 'GOV_INSPECTION_REPORT_UPDATE_ERROR', 500);
  }
}

export class GovInspectionReportDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le rapport d\'inspection') {
    super(message, 'GOV_INSPECTION_REPORT_DELETE_ERROR', 500);
  }
}

// InspectionRecommendation
export class GovInspectionRecommendationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Recommandation d'inspection (${identifier}) introuvable` : 'Recommandation d\'inspection introuvable';
    super(msg, 'GOV_INSPECTION_RECOMMENDATION_NOT_FOUND', 404);
  }
}

export class GovInspectionRecommendationCreateError extends AppError {
  constructor(message = 'Impossible de créer la recommandation d\'inspection') {
    super(message, 'GOV_INSPECTION_RECOMMENDATION_CREATE_ERROR', 500);
  }
}

export class GovInspectionRecommendationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la recommandation d\'inspection') {
    super(message, 'GOV_INSPECTION_RECOMMENDATION_UPDATE_ERROR', 500);
  }
}

export class GovInspectionRecommendationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la recommandation d\'inspection') {
    super(message, 'GOV_INSPECTION_RECOMMENDATION_DELETE_ERROR', 500);
  }
}

// SchoolCompliance
export class GovSchoolComplianceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Conformité scolaire (${identifier}) introuvable` : 'Conformité scolaire introuvable';
    super(msg, 'GOV_SCHOOL_COMPLIANCE_NOT_FOUND', 404);
  }
}

export class GovSchoolComplianceCreateError extends AppError {
  constructor(message = 'Impossible de créer la conformité scolaire') {
    super(message, 'GOV_SCHOOL_COMPLIANCE_CREATE_ERROR', 500);
  }
}

export class GovSchoolComplianceUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la conformité scolaire') {
    super(message, 'GOV_SCHOOL_COMPLIANCE_UPDATE_ERROR', 500);
  }
}

export class GovSchoolComplianceDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la conformité scolaire') {
    super(message, 'GOV_SCHOOL_COMPLIANCE_DELETE_ERROR', 500);
  }
}

// CorrectiveAction
export class GovCorrectiveActionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Action corrective (${identifier}) introuvable` : 'Action corrective introuvable';
    super(msg, 'GOV_CORRECTIVE_ACTION_NOT_FOUND', 404);
  }
}

export class GovCorrectiveActionCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'action corrective') {
    super(message, 'GOV_CORRECTIVE_ACTION_CREATE_ERROR', 500);
  }
}

export class GovCorrectiveActionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'action corrective') {
    super(message, 'GOV_CORRECTIVE_ACTION_UPDATE_ERROR', 500);
  }
}

export class GovCorrectiveActionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'action corrective') {
    super(message, 'GOV_CORRECTIVE_ACTION_DELETE_ERROR', 500);
  }
}

// InspectionCalendar
export class GovInspectionCalendarNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Calendrier d'inspection (${identifier}) introuvable` : 'Calendrier d\'inspection introuvable';
    super(msg, 'GOV_INSPECTION_CALENDAR_NOT_FOUND', 404);
  }
}

export class GovInspectionCalendarCreateError extends AppError {
  constructor(message = 'Impossible de créer le calendrier d\'inspection') {
    super(message, 'GOV_INSPECTION_CALENDAR_CREATE_ERROR', 500);
  }
}

export class GovInspectionCalendarUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le calendrier d\'inspection') {
    super(message, 'GOV_INSPECTION_CALENDAR_UPDATE_ERROR', 500);
  }
}

export class GovInspectionCalendarDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le calendrier d\'inspection') {
    super(message, 'GOV_INSPECTION_CALENDAR_DELETE_ERROR', 500);
  }
}

// SchoolRating
export class GovSchoolRatingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Évaluation scolaire (${identifier}) introuvable` : 'Évaluation scolaire introuvable';
    super(msg, 'GOV_SCHOOL_RATING_NOT_FOUND', 404);
  }
}

export class GovSchoolRatingCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'évaluation scolaire') {
    super(message, 'GOV_SCHOOL_RATING_CREATE_ERROR', 500);
  }
}

export class GovSchoolRatingUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'évaluation scolaire') {
    super(message, 'GOV_SCHOOL_RATING_UPDATE_ERROR', 500);
  }
}

export class GovSchoolRatingDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'évaluation scolaire') {
    super(message, 'GOV_SCHOOL_RATING_DELETE_ERROR', 500);
  }
}

// InspectionChecklist
export class GovInspectionChecklistNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Check-list d'inspection (${identifier}) introuvable` : 'Check-list d\'inspection introuvable';
    super(msg, 'GOV_INSPECTION_CHECKLIST_NOT_FOUND', 404);
  }
}

export class GovInspectionChecklistCreateError extends AppError {
  constructor(message = 'Impossible de créer la check-list d\'inspection') {
    super(message, 'GOV_INSPECTION_CHECKLIST_CREATE_ERROR', 500);
  }
}

export class GovInspectionChecklistUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la check-list d\'inspection') {
    super(message, 'GOV_INSPECTION_CHECKLIST_UPDATE_ERROR', 500);
  }
}

export class GovInspectionChecklistDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la check-list d\'inspection') {
    super(message, 'GOV_INSPECTION_CHECKLIST_DELETE_ERROR', 500);
  }
}

// InspectorPerformance
export class GovInspectorPerformanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Performance d'inspecteur (${identifier}) introuvable` : 'Performance d\'inspecteur introuvable';
    super(msg, 'GOV_INSPECTOR_PERFORMANCE_NOT_FOUND', 404);
  }
}

export class GovInspectorPerformanceCreateError extends AppError {
  constructor(message = 'Impossible de créer la performance d\'inspecteur') {
    super(message, 'GOV_INSPECTOR_PERFORMANCE_CREATE_ERROR', 500);
  }
}

export class GovInspectorPerformanceUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la performance d\'inspecteur') {
    super(message, 'GOV_INSPECTOR_PERFORMANCE_UPDATE_ERROR', 500);
  }
}

export class GovInspectorPerformanceDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la performance d\'inspecteur') {
    super(message, 'GOV_INSPECTOR_PERFORMANCE_DELETE_ERROR', 500);
  }
}

// ComplianceTrend
export class GovComplianceTrendNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tendance de conformité (${identifier}) introuvable` : 'Tendance de conformité introuvable';
    super(msg, 'GOV_COMPLIANCE_TREND_NOT_FOUND', 404);
  }
}

export class GovComplianceTrendCreateError extends AppError {
  constructor(message = 'Impossible de créer la tendance de conformité') {
    super(message, 'GOV_COMPLIANCE_TREND_CREATE_ERROR', 500);
  }
}

export class GovComplianceTrendUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la tendance de conformité') {
    super(message, 'GOV_COMPLIANCE_TREND_UPDATE_ERROR', 500);
  }
}

export class GovComplianceTrendDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la tendance de conformité') {
    super(message, 'GOV_COMPLIANCE_TREND_DELETE_ERROR', 500);
  }
}

// ─── Module 7: Accreditation & Quality (40 errors) ──────────────────────────

// Accreditation
export class GovAccreditationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accréditation (${identifier}) introuvable` : 'Accréditation introuvable';
    super(msg, 'GOV_ACCREDITATION_NOT_FOUND', 404);
  }
}

export class GovAccreditationCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'accréditation') {
    super(message, 'GOV_ACCREDITATION_CREATE_ERROR', 500);
  }
}

export class GovAccreditationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'accréditation') {
    super(message, 'GOV_ACCREDITATION_UPDATE_ERROR', 500);
  }
}

export class GovAccreditationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'accréditation') {
    super(message, 'GOV_ACCREDITATION_DELETE_ERROR', 500);
  }
}

// AccreditationStandard
export class GovAccreditationStandardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Standard d'accréditation (${identifier}) introuvable` : 'Standard d\'accréditation introuvable';
    super(msg, 'GOV_ACCREDITATION_STANDARD_NOT_FOUND', 404);
  }
}

export class GovAccreditationStandardCreateError extends AppError {
  constructor(message = 'Impossible de créer le standard d\'accréditation') {
    super(message, 'GOV_ACCREDITATION_STANDARD_CREATE_ERROR', 500);
  }
}

export class GovAccreditationStandardUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le standard d\'accréditation') {
    super(message, 'GOV_ACCREDITATION_STANDARD_UPDATE_ERROR', 500);
  }
}

export class GovAccreditationStandardDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le standard d\'accréditation') {
    super(message, 'GOV_ACCREDITATION_STANDARD_DELETE_ERROR', 500);
  }
}

// AccreditationAssessment
export class GovAccreditationAssessmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Évaluation d'accréditation (${identifier}) introuvable` : 'Évaluation d\'accréditation introuvable';
    super(msg, 'GOV_ACCREDITATION_ASSESSMENT_NOT_FOUND', 404);
  }
}

export class GovAccreditationAssessmentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'évaluation d\'accréditation') {
    super(message, 'GOV_ACCREDITATION_ASSESSMENT_CREATE_ERROR', 500);
  }
}

export class GovAccreditationAssessmentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'évaluation d\'accréditation') {
    super(message, 'GOV_ACCREDITATION_ASSESSMENT_UPDATE_ERROR', 500);
  }
}

export class GovAccreditationAssessmentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'évaluation d\'accréditation') {
    super(message, 'GOV_ACCREDITATION_ASSESSMENT_DELETE_ERROR', 500);
  }
}

// Certification
export class GovCertificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Certification (${identifier}) introuvable` : 'Certification introuvable';
    super(msg, 'GOV_CERTIFICATION_NOT_FOUND', 404);
  }
}

export class GovCertificationCreateError extends AppError {
  constructor(message = 'Impossible de créer la certification') {
    super(message, 'GOV_CERTIFICATION_CREATE_ERROR', 500);
  }
}

export class GovCertificationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la certification') {
    super(message, 'GOV_CERTIFICATION_UPDATE_ERROR', 500);
  }
}

export class GovCertificationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la certification') {
    super(message, 'GOV_CERTIFICATION_DELETE_ERROR', 500);
  }
}

// Renewal
export class GovRenewalNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Renouvellement (${identifier}) introuvable` : 'Renouvellement introuvable';
    super(msg, 'GOV_RENEWAL_NOT_FOUND', 404);
  }
}

export class GovRenewalCreateError extends AppError {
  constructor(message = 'Impossible de créer le renouvellement') {
    super(message, 'GOV_RENEWAL_CREATE_ERROR', 500);
  }
}

export class GovRenewalUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le renouvellement') {
    super(message, 'GOV_RENEWAL_UPDATE_ERROR', 500);
  }
}

export class GovRenewalDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le renouvellement') {
    super(message, 'GOV_RENEWAL_DELETE_ERROR', 500);
  }
}

// QualityAudit
export class GovQualityAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit qualité (${identifier}) introuvable` : 'Audit qualité introuvable';
    super(msg, 'GOV_QUALITY_AUDIT_NOT_FOUND', 404);
  }
}

export class GovQualityAuditCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'audit qualité') {
    super(message, 'GOV_QUALITY_AUDIT_CREATE_ERROR', 500);
  }
}

export class GovQualityAuditUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'audit qualité') {
    super(message, 'GOV_QUALITY_AUDIT_UPDATE_ERROR', 500);
  }
}

export class GovQualityAuditDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'audit qualité') {
    super(message, 'GOV_QUALITY_AUDIT_DELETE_ERROR', 500);
  }
}

// ComplianceRule
export class GovComplianceRuleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Règle de conformité (${identifier}) introuvable` : 'Règle de conformité introuvable';
    super(msg, 'GOV_COMPLIANCE_RULE_NOT_FOUND', 404);
  }
}

export class GovComplianceRuleCreateError extends AppError {
  constructor(message = 'Impossible de créer la règle de conformité') {
    super(message, 'GOV_COMPLIANCE_RULE_CREATE_ERROR', 500);
  }
}

export class GovComplianceRuleUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la règle de conformité') {
    super(message, 'GOV_COMPLIANCE_RULE_UPDATE_ERROR', 500);
  }
}

export class GovComplianceRuleDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la règle de conformité') {
    super(message, 'GOV_COMPLIANCE_RULE_DELETE_ERROR', 500);
  }
}

// QualityIndicator
export class GovQualityIndicatorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Indicateur qualité (${identifier}) introuvable` : 'Indicateur qualité introuvable';
    super(msg, 'GOV_QUALITY_INDICATOR_NOT_FOUND', 404);
  }
}

export class GovQualityIndicatorCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'indicateur qualité') {
    super(message, 'GOV_QUALITY_INDICATOR_CREATE_ERROR', 500);
  }
}

export class GovQualityIndicatorUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'indicateur qualité') {
    super(message, 'GOV_QUALITY_INDICATOR_UPDATE_ERROR', 500);
  }
}

export class GovQualityIndicatorDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'indicateur qualité') {
    super(message, 'GOV_QUALITY_INDICATOR_DELETE_ERROR', 500);
  }
}

// AccreditationDocument
export class GovAccreditationDocumentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Document d'accréditation (${identifier}) introuvable` : 'Document d\'accréditation introuvable';
    super(msg, 'GOV_ACCREDITATION_DOCUMENT_NOT_FOUND', 404);
  }
}

export class GovAccreditationDocumentCreateError extends AppError {
  constructor(message = 'Impossible de créer le document d\'accréditation') {
    super(message, 'GOV_ACCREDITATION_DOCUMENT_CREATE_ERROR', 500);
  }
}

export class GovAccreditationDocumentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le document d\'accréditation') {
    super(message, 'GOV_ACCREDITATION_DOCUMENT_UPDATE_ERROR', 500);
  }
}

export class GovAccreditationDocumentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le document d\'accréditation') {
    super(message, 'GOV_ACCREDITATION_DOCUMENT_DELETE_ERROR', 500);
  }
}

// AuditFinding
export class GovAuditFindingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Constat d'audit (${identifier}) introuvable` : 'Constat d\'audit introuvable';
    super(msg, 'GOV_AUDIT_FINDING_NOT_FOUND', 404);
  }
}

export class GovAuditFindingCreateError extends AppError {
  constructor(message = 'Impossible de créer le constat d\'audit') {
    super(message, 'GOV_AUDIT_FINDING_CREATE_ERROR', 500);
  }
}

export class GovAuditFindingUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le constat d\'audit') {
    super(message, 'GOV_AUDIT_FINDING_UPDATE_ERROR', 500);
  }
}

export class GovAuditFindingDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le constat d\'audit') {
    super(message, 'GOV_AUDIT_FINDING_DELETE_ERROR', 500);
  }
}

// ─── Module 8: Education Analytics & Dashboards (48 errors) ─────────────────

// EducationKpi
export class GovEducationKpiNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Indicateur éducatif (${identifier}) introuvable` : 'Indicateur éducatif introuvable';
    super(msg, 'GOV_EDUCATION_KPI_NOT_FOUND', 404);
  }
}

export class GovEducationKpiCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'indicateur éducatif') {
    super(message, 'GOV_EDUCATION_KPI_CREATE_ERROR', 500);
  }
}

export class GovEducationKpiUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'indicateur éducatif') {
    super(message, 'GOV_EDUCATION_KPI_UPDATE_ERROR', 500);
  }
}

export class GovEducationKpiDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'indicateur éducatif') {
    super(message, 'GOV_EDUCATION_KPI_DELETE_ERROR', 500);
  }
}

// RegionalAnalyticsKpi
export class GovRegionalAnalyticsKpiNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Indicateur analytique régional (${identifier}) introuvable` : 'Indicateur analytique régional introuvable';
    super(msg, 'GOV_REGIONAL_ANALYTICS_KPI_NOT_FOUND', 404);
  }
}

export class GovRegionalAnalyticsKpiCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'indicateur analytique régional') {
    super(message, 'GOV_REGIONAL_ANALYTICS_KPI_CREATE_ERROR', 500);
  }
}

export class GovRegionalAnalyticsKpiUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'indicateur analytique régional') {
    super(message, 'GOV_REGIONAL_ANALYTICS_KPI_UPDATE_ERROR', 500);
  }
}

export class GovRegionalAnalyticsKpiDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'indicateur analytique régional') {
    super(message, 'GOV_REGIONAL_ANALYTICS_KPI_DELETE_ERROR', 500);
  }
}

// NationalDashboard
export class GovNationalDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord national (${identifier}) introuvable` : 'Tableau de bord national introuvable';
    super(msg, 'GOV_NATIONAL_DASHBOARD_NOT_FOUND', 404);
  }
}

export class GovNationalDashboardCreateError extends AppError {
  constructor(message = 'Impossible de créer le tableau de bord national') {
    super(message, 'GOV_NATIONAL_DASHBOARD_CREATE_ERROR', 500);
  }
}

export class GovNationalDashboardUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le tableau de bord national') {
    super(message, 'GOV_NATIONAL_DASHBOARD_UPDATE_ERROR', 500);
  }
}

export class GovNationalDashboardDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le tableau de bord national') {
    super(message, 'GOV_NATIONAL_DASHBOARD_DELETE_ERROR', 500);
  }
}

// DashboardWidget
export class GovDashboardWidgetNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Widget du tableau de bord (${identifier}) introuvable` : 'Widget du tableau de bord introuvable';
    super(msg, 'GOV_DASHBOARD_WIDGET_NOT_FOUND', 404);
  }
}

export class GovDashboardWidgetCreateError extends AppError {
  constructor(message = 'Impossible de créer le widget du tableau de bord') {
    super(message, 'GOV_DASHBOARD_WIDGET_CREATE_ERROR', 500);
  }
}

export class GovDashboardWidgetUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le widget du tableau de bord') {
    super(message, 'GOV_DASHBOARD_WIDGET_UPDATE_ERROR', 500);
  }
}

export class GovDashboardWidgetDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le widget du tableau de bord') {
    super(message, 'GOV_DASHBOARD_WIDGET_DELETE_ERROR', 500);
  }
}

// PredictiveAnalytic
export class GovPredictiveAnalyticNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Analyse prédictive (${identifier}) introuvable` : 'Analyse prédictive introuvable';
    super(msg, 'GOV_PREDICTIVE_ANALYTIC_NOT_FOUND', 404);
  }
}

export class GovPredictiveAnalyticCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'analyse prédictive') {
    super(message, 'GOV_PREDICTIVE_ANALYTIC_CREATE_ERROR', 500);
  }
}

export class GovPredictiveAnalyticUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'analyse prédictive') {
    super(message, 'GOV_PREDICTIVE_ANALYTIC_UPDATE_ERROR', 500);
  }
}

export class GovPredictiveAnalyticDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'analyse prédictive') {
    super(message, 'GOV_PREDICTIVE_ANALYTIC_DELETE_ERROR', 500);
  }
}

// DropoutMap
export class GovDropoutMapNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Carte d'abandon (${identifier}) introuvable` : 'Carte d\'abandon introuvable';
    super(msg, 'GOV_DROPOUT_MAP_NOT_FOUND', 404);
  }
}

export class GovDropoutMapCreateError extends AppError {
  constructor(message = 'Impossible de créer la carte d\'abandon') {
    super(message, 'GOV_DROPOUT_MAP_CREATE_ERROR', 500);
  }
}

export class GovDropoutMapUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la carte d\'abandon') {
    super(message, 'GOV_DROPOUT_MAP_UPDATE_ERROR', 500);
  }
}

export class GovDropoutMapDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la carte d\'abandon') {
    super(message, 'GOV_DROPOUT_MAP_DELETE_ERROR', 500);
  }
}

// InfrastructureMap
export class GovInfrastructureMapNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Carte des infrastructures (${identifier}) introuvable` : 'Carte des infrastructures introuvable';
    super(msg, 'GOV_INFRASTRUCTURE_MAP_NOT_FOUND', 404);
  }
}

export class GovInfrastructureMapCreateError extends AppError {
  constructor(message = 'Impossible de créer la carte des infrastructures') {
    super(message, 'GOV_INFRASTRUCTURE_MAP_CREATE_ERROR', 500);
  }
}

export class GovInfrastructureMapUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la carte des infrastructures') {
    super(message, 'GOV_INFRASTRUCTURE_MAP_UPDATE_ERROR', 500);
  }
}

export class GovInfrastructureMapDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la carte des infrastructures') {
    super(message, 'GOV_INFRASTRUCTURE_MAP_DELETE_ERROR', 500);
  }
}

// TeacherDistribution
export class GovTeacherDistributionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Répartition des enseignants (${identifier}) introuvable` : 'Répartition des enseignants introuvable';
    super(msg, 'GOV_TEACHER_DISTRIBUTION_NOT_FOUND', 404);
  }
}

export class GovTeacherDistributionCreateError extends AppError {
  constructor(message = 'Impossible de créer la répartition des enseignants') {
    super(message, 'GOV_TEACHER_DISTRIBUTION_CREATE_ERROR', 500);
  }
}

export class GovTeacherDistributionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la répartition des enseignants') {
    super(message, 'GOV_TEACHER_DISTRIBUTION_UPDATE_ERROR', 500);
  }
}

export class GovTeacherDistributionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la répartition des enseignants') {
    super(message, 'GOV_TEACHER_DISTRIBUTION_DELETE_ERROR', 500);
  }
}

// StudentDistribution
export class GovStudentDistributionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Répartition des étudiants (${identifier}) introuvable` : 'Répartition des étudiants introuvable';
    super(msg, 'GOV_STUDENT_DISTRIBUTION_NOT_FOUND', 404);
  }
}

export class GovStudentDistributionCreateError extends AppError {
  constructor(message = 'Impossible de créer la répartition des étudiants') {
    super(message, 'GOV_STUDENT_DISTRIBUTION_CREATE_ERROR', 500);
  }
}

export class GovStudentDistributionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la répartition des étudiants') {
    super(message, 'GOV_STUDENT_DISTRIBUTION_UPDATE_ERROR', 500);
  }
}

export class GovStudentDistributionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la répartition des étudiants') {
    super(message, 'GOV_STUDENT_DISTRIBUTION_DELETE_ERROR', 500);
  }
}

// BudgetAnalytic
export class GovBudgetAnalyticNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Analyse budgétaire (${identifier}) introuvable` : 'Analyse budgétaire introuvable';
    super(msg, 'GOV_BUDGET_ANALYTIC_NOT_FOUND', 404);
  }
}

export class GovBudgetAnalyticCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'analyse budgétaire') {
    super(message, 'GOV_BUDGET_ANALYTIC_CREATE_ERROR', 500);
  }
}

export class GovBudgetAnalyticUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'analyse budgétaire') {
    super(message, 'GOV_BUDGET_ANALYTIC_UPDATE_ERROR', 500);
  }
}

export class GovBudgetAnalyticDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'analyse budgétaire') {
    super(message, 'GOV_BUDGET_ANALYTIC_DELETE_ERROR', 500);
  }
}

// EducationForecast
export class GovEducationForecastNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prévision éducative (${identifier}) introuvable` : 'Prévision éducative introuvable';
    super(msg, 'GOV_EDUCATION_FORECAST_NOT_FOUND', 404);
  }
}

export class GovEducationForecastCreateError extends AppError {
  constructor(message = 'Impossible de créer la prévision éducative') {
    super(message, 'GOV_EDUCATION_FORECAST_CREATE_ERROR', 500);
  }
}

export class GovEducationForecastUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la prévision éducative') {
    super(message, 'GOV_EDUCATION_FORECAST_UPDATE_ERROR', 500);
  }
}

export class GovEducationForecastDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la prévision éducative') {
    super(message, 'GOV_EDUCATION_FORECAST_DELETE_ERROR', 500);
  }
}

// DataCollection
export class GovDataCollectionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Collecte de données (${identifier}) introuvable` : 'Collecte de données introuvable';
    super(msg, 'GOV_DATA_COLLECTION_NOT_FOUND', 404);
  }
}

export class GovDataCollectionCreateError extends AppError {
  constructor(message = 'Impossible de créer la collecte de données') {
    super(message, 'GOV_DATA_COLLECTION_CREATE_ERROR', 500);
  }
}

export class GovDataCollectionUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la collecte de données') {
    super(message, 'GOV_DATA_COLLECTION_UPDATE_ERROR', 500);
  }
}

export class GovDataCollectionDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la collecte de données') {
    super(message, 'GOV_DATA_COLLECTION_DELETE_ERROR', 500);
  }
}

// ─── Module 9: Funding & Scholarships (48 errors) ───────────────────────────

// GovernmentFunding
export class GovGovernmentFundingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Financement gouvernemental (${identifier}) introuvable` : 'Financement gouvernemental introuvable';
    super(msg, 'GOV_GOVERNMENT_FUNDING_NOT_FOUND', 404);
  }
}

export class GovGovernmentFundingCreateError extends AppError {
  constructor(message = 'Impossible de créer le financement gouvernemental') {
    super(message, 'GOV_GOVERNMENT_FUNDING_CREATE_ERROR', 500);
  }
}

export class GovGovernmentFundingUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le financement gouvernemental') {
    super(message, 'GOV_GOVERNMENT_FUNDING_UPDATE_ERROR', 500);
  }
}

export class GovGovernmentFundingDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le financement gouvernemental') {
    super(message, 'GOV_GOVERNMENT_FUNDING_DELETE_ERROR', 500);
  }
}

// FundingAllocation
export class GovFundingAllocationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Allocation de financement (${identifier}) introuvable` : 'Allocation de financement introuvable';
    super(msg, 'GOV_FUNDING_ALLOCATION_NOT_FOUND', 404);
  }
}

export class GovFundingAllocationCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'allocation de financement') {
    super(message, 'GOV_FUNDING_ALLOCATION_CREATE_ERROR', 500);
  }
}

export class GovFundingAllocationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'allocation de financement') {
    super(message, 'GOV_FUNDING_ALLOCATION_UPDATE_ERROR', 500);
  }
}

export class GovFundingAllocationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'allocation de financement') {
    super(message, 'GOV_FUNDING_ALLOCATION_DELETE_ERROR', 500);
  }
}

// Scholarship
export class GovScholarshipNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Bourse (${identifier}) introuvable` : 'Bourse introuvable';
    super(msg, 'GOV_SCHOLARSHIP_NOT_FOUND', 404);
  }
}

export class GovScholarshipCreateError extends AppError {
  constructor(message = 'Impossible de créer la bourse') {
    super(message, 'GOV_SCHOLARSHIP_CREATE_ERROR', 500);
  }
}

export class GovScholarshipUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la bourse') {
    super(message, 'GOV_SCHOLARSHIP_UPDATE_ERROR', 500);
  }
}

export class GovScholarshipDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la bourse') {
    super(message, 'GOV_SCHOLARSHIP_DELETE_ERROR', 500);
  }
}

// ScholarshipApplication
export class GovScholarshipApplicationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Demande de bourse (${identifier}) introuvable` : 'Demande de bourse introuvable';
    super(msg, 'GOV_SCHOLARSHIP_APPLICATION_NOT_FOUND', 404);
  }
}

export class GovScholarshipApplicationCreateError extends AppError {
  constructor(message = 'Impossible de créer la demande de bourse') {
    super(message, 'GOV_SCHOLARSHIP_APPLICATION_CREATE_ERROR', 500);
  }
}

export class GovScholarshipApplicationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la demande de bourse') {
    super(message, 'GOV_SCHOLARSHIP_APPLICATION_UPDATE_ERROR', 500);
  }
}

export class GovScholarshipApplicationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la demande de bourse') {
    super(message, 'GOV_SCHOLARSHIP_APPLICATION_DELETE_ERROR', 500);
  }
}

// Grant
export class GovGrantNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Subvention (${identifier}) introuvable` : 'Subvention introuvable';
    super(msg, 'GOV_GRANT_NOT_FOUND', 404);
  }
}

export class GovGrantCreateError extends AppError {
  constructor(message = 'Impossible de créer la subvention') {
    super(message, 'GOV_GRANT_CREATE_ERROR', 500);
  }
}

export class GovGrantUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la subvention') {
    super(message, 'GOV_GRANT_UPDATE_ERROR', 500);
  }
}

export class GovGrantDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la subvention') {
    super(message, 'GOV_GRANT_DELETE_ERROR', 500);
  }
}

// GrantProject
export class GovGrantProjectNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Projet de subvention (${identifier}) introuvable` : 'Projet de subvention introuvable';
    super(msg, 'GOV_GRANT_PROJECT_NOT_FOUND', 404);
  }
}

export class GovGrantProjectCreateError extends AppError {
  constructor(message = 'Impossible de créer le projet de subvention') {
    super(message, 'GOV_GRANT_PROJECT_CREATE_ERROR', 500);
  }
}

export class GovGrantProjectUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le projet de subvention') {
    super(message, 'GOV_GRANT_PROJECT_UPDATE_ERROR', 500);
  }
}

export class GovGrantProjectDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le projet de subvention') {
    super(message, 'GOV_GRANT_PROJECT_DELETE_ERROR', 500);
  }
}

// Donor
export class GovDonorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Donateur (${identifier}) introuvable` : 'Donateur introuvable';
    super(msg, 'GOV_DONOR_NOT_FOUND', 404);
  }
}

export class GovDonorCreateError extends AppError {
  constructor(message = 'Impossible de créer le donateur') {
    super(message, 'GOV_DONOR_CREATE_ERROR', 500);
  }
}

export class GovDonorUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le donateur') {
    super(message, 'GOV_DONOR_UPDATE_ERROR', 500);
  }
}

export class GovDonorDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le donateur') {
    super(message, 'GOV_DONOR_DELETE_ERROR', 500);
  }
}

// NgoPartner
export class GovNgoPartnerNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Partenaire ONG (${identifier}) introuvable` : 'Partenaire ONG introuvable';
    super(msg, 'GOV_NGO_PARTNER_NOT_FOUND', 404);
  }
}

export class GovNgoPartnerCreateError extends AppError {
  constructor(message = 'Impossible de créer le partenaire ONG') {
    super(message, 'GOV_NGO_PARTNER_CREATE_ERROR', 500);
  }
}

export class GovNgoPartnerUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le partenaire ONG') {
    super(message, 'GOV_NGO_PARTNER_UPDATE_ERROR', 500);
  }
}

export class GovNgoPartnerDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le partenaire ONG') {
    super(message, 'GOV_NGO_PARTNER_DELETE_ERROR', 500);
  }
}

// BudgetAllocation
export class GovBudgetAllocationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Allocation budgétaire (${identifier}) introuvable` : 'Allocation budgétaire introuvable';
    super(msg, 'GOV_BUDGET_ALLOCATION_NOT_FOUND', 404);
  }
}

export class GovBudgetAllocationCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'allocation budgétaire') {
    super(message, 'GOV_BUDGET_ALLOCATION_CREATE_ERROR', 500);
  }
}

export class GovBudgetAllocationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'allocation budgétaire') {
    super(message, 'GOV_BUDGET_ALLOCATION_UPDATE_ERROR', 500);
  }
}

export class GovBudgetAllocationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'allocation budgétaire') {
    super(message, 'GOV_BUDGET_ALLOCATION_DELETE_ERROR', 500);
  }
}

// RegionalBudget
export class GovRegionalBudgetNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Budget régional (${identifier}) introuvable` : 'Budget régional introuvable';
    super(msg, 'GOV_REGIONAL_BUDGET_NOT_FOUND', 404);
  }
}

export class GovRegionalBudgetCreateError extends AppError {
  constructor(message = 'Impossible de créer le budget régional') {
    super(message, 'GOV_REGIONAL_BUDGET_CREATE_ERROR', 500);
  }
}

export class GovRegionalBudgetUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le budget régional') {
    super(message, 'GOV_REGIONAL_BUDGET_UPDATE_ERROR', 500);
  }
}

export class GovRegionalBudgetDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le budget régional') {
    super(message, 'GOV_REGIONAL_BUDGET_DELETE_ERROR', 500);
  }
}

// FundDisbursement
export class GovFundDisbursementNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Déboursement de fonds (${identifier}) introuvable` : 'Déboursement de fonds introuvable';
    super(msg, 'GOV_FUND_DISBURSEMENT_NOT_FOUND', 404);
  }
}

export class GovFundDisbursementCreateError extends AppError {
  constructor(message = 'Impossible de créer le déboursement de fonds') {
    super(message, 'GOV_FUND_DISBURSEMENT_CREATE_ERROR', 500);
  }
}

export class GovFundDisbursementUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le déboursement de fonds') {
    super(message, 'GOV_FUND_DISBURSEMENT_UPDATE_ERROR', 500);
  }
}

export class GovFundDisbursementDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le déboursement de fonds') {
    super(message, 'GOV_FUND_DISBURSEMENT_DELETE_ERROR', 500);
  }
}

// FundingReport
export class GovFundingReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport de financement (${identifier}) introuvable` : 'Rapport de financement introuvable';
    super(msg, 'GOV_FUNDING_REPORT_NOT_FOUND', 404);
  }
}

export class GovFundingReportCreateError extends AppError {
  constructor(message = 'Impossible de créer le rapport de financement') {
    super(message, 'GOV_FUNDING_REPORT_CREATE_ERROR', 500);
  }
}

export class GovFundingReportUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le rapport de financement') {
    super(message, 'GOV_FUNDING_REPORT_UPDATE_ERROR', 500);
  }
}

export class GovFundingReportDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le rapport de financement') {
    super(message, 'GOV_FUNDING_REPORT_DELETE_ERROR', 500);
  }
}

// ─── Module 10: National Identity & Registry (32 errors) ────────────────────

// NationalStudentId
export class GovNationalStudentIdNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Identité nationale étudiante (${identifier}) introuvable` : 'Identité nationale étudiante introuvable';
    super(msg, 'GOV_NATIONAL_STUDENT_ID_NOT_FOUND', 404);
  }
}

export class GovNationalStudentIdCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'identité nationale étudiante') {
    super(message, 'GOV_NATIONAL_STUDENT_ID_CREATE_ERROR', 500);
  }
}

export class GovNationalStudentIdUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'identité nationale étudiante') {
    super(message, 'GOV_NATIONAL_STUDENT_ID_UPDATE_ERROR', 500);
  }
}

export class GovNationalStudentIdDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'identité nationale étudiante') {
    super(message, 'GOV_NATIONAL_STUDENT_ID_DELETE_ERROR', 500);
  }
}

// TeacherRegistry
export class GovTeacherRegistryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Registre des enseignants (${identifier}) introuvable` : 'Registre des enseignants introuvable';
    super(msg, 'GOV_TEACHER_REGISTRY_NOT_FOUND', 404);
  }
}

export class GovTeacherRegistryCreateError extends AppError {
  constructor(message = 'Impossible de créer le registre des enseignants') {
    super(message, 'GOV_TEACHER_REGISTRY_CREATE_ERROR', 500);
  }
}

export class GovTeacherRegistryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le registre des enseignants') {
    super(message, 'GOV_TEACHER_REGISTRY_UPDATE_ERROR', 500);
  }
}

export class GovTeacherRegistryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le registre des enseignants') {
    super(message, 'GOV_TEACHER_REGISTRY_DELETE_ERROR', 500);
  }
}

// SchoolRegistry
export class GovSchoolRegistryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Registre scolaire (${identifier}) introuvable` : 'Registre scolaire introuvable';
    super(msg, 'GOV_SCHOOL_REGISTRY_NOT_FOUND', 404);
  }
}

export class GovSchoolRegistryCreateError extends AppError {
  constructor(message = 'Impossible de créer le registre scolaire') {
    super(message, 'GOV_SCHOOL_REGISTRY_CREATE_ERROR', 500);
  }
}

export class GovSchoolRegistryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le registre scolaire') {
    super(message, 'GOV_SCHOOL_REGISTRY_UPDATE_ERROR', 500);
  }
}

export class GovSchoolRegistryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le registre scolaire') {
    super(message, 'GOV_SCHOOL_REGISTRY_DELETE_ERROR', 500);
  }
}

// DigitalCertificate
export class GovDigitalCertificateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Certificat numérique (${identifier}) introuvable` : 'Certificat numérique introuvable';
    super(msg, 'GOV_DIGITAL_CERTIFICATE_NOT_FOUND', 404);
  }
}

export class GovDigitalCertificateCreateError extends AppError {
  constructor(message = 'Impossible de créer le certificat numérique') {
    super(message, 'GOV_DIGITAL_CERTIFICATE_CREATE_ERROR', 500);
  }
}

export class GovDigitalCertificateUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le certificat numérique') {
    super(message, 'GOV_DIGITAL_CERTIFICATE_UPDATE_ERROR', 500);
  }
}

export class GovDigitalCertificateDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le certificat numérique') {
    super(message, 'GOV_DIGITAL_CERTIFICATE_DELETE_ERROR', 500);
  }
}

// QrVerification
export class GovQrVerificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Vérification QR (${identifier}) introuvable` : 'Vérification QR introuvable';
    super(msg, 'GOV_QR_VERIFICATION_NOT_FOUND', 404);
  }
}

export class GovQrVerificationCreateError extends AppError {
  constructor(message = 'Impossible de créer la vérification QR') {
    super(message, 'GOV_QR_VERIFICATION_CREATE_ERROR', 500);
  }
}

export class GovQrVerificationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la vérification QR') {
    super(message, 'GOV_QR_VERIFICATION_UPDATE_ERROR', 500);
  }
}

export class GovQrVerificationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la vérification QR') {
    super(message, 'GOV_QR_VERIFICATION_DELETE_ERROR', 500);
  }
}

// IdentityVerification
export class GovIdentityVerificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Vérification d'identité (${identifier}) introuvable` : 'Vérification d\'identité introuvable';
    super(msg, 'GOV_IDENTITY_VERIFICATION_NOT_FOUND', 404);
  }
}

export class GovIdentityVerificationCreateError extends AppError {
  constructor(message = 'Impossible de créer la vérification d\'identité') {
    super(message, 'GOV_IDENTITY_VERIFICATION_CREATE_ERROR', 500);
  }
}

export class GovIdentityVerificationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la vérification d\'identité') {
    super(message, 'GOV_IDENTITY_VERIFICATION_UPDATE_ERROR', 500);
  }
}

export class GovIdentityVerificationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la vérification d\'identité') {
    super(message, 'GOV_IDENTITY_VERIFICATION_DELETE_ERROR', 500);
  }
}

// BiometricData
export class GovBiometricDataNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Données biométriques (${identifier}) introuvable` : 'Données biométriques introuvable';
    super(msg, 'GOV_BIOMETRIC_DATA_NOT_FOUND', 404);
  }
}

export class GovBiometricDataCreateError extends AppError {
  constructor(message = 'Impossible de créer les données biométriques') {
    super(message, 'GOV_BIOMETRIC_DATA_CREATE_ERROR', 500);
  }
}

export class GovBiometricDataUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour les données biométriques') {
    super(message, 'GOV_BIOMETRIC_DATA_UPDATE_ERROR', 500);
  }
}

export class GovBiometricDataDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer les données biométriques') {
    super(message, 'GOV_BIOMETRIC_DATA_DELETE_ERROR', 500);
  }
}

// IdentityAudit
export class GovIdentityAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit d'identité (${identifier}) introuvable` : 'Audit d\'identité introuvable';
    super(msg, 'GOV_IDENTITY_AUDIT_NOT_FOUND', 404);
  }
}

export class GovIdentityAuditCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'audit d\'identité') {
    super(message, 'GOV_IDENTITY_AUDIT_CREATE_ERROR', 500);
  }
}

export class GovIdentityAuditUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'audit d\'identité') {
    super(message, 'GOV_IDENTITY_AUDIT_UPDATE_ERROR', 500);
  }
}

export class GovIdentityAuditDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'audit d\'identité') {
    super(message, 'GOV_IDENTITY_AUDIT_DELETE_ERROR', 500);
  }
}

// ─── Module 11: Standards & Regulations (32 errors) ─────────────────────────

// NationalStandard
export class GovNationalStandardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Norme nationale (${identifier}) introuvable` : 'Norme nationale introuvable';
    super(msg, 'GOV_NATIONAL_STANDARD_NOT_FOUND', 404);
  }
}

export class GovNationalStandardCreateError extends AppError {
  constructor(message = 'Impossible de créer la norme nationale') {
    super(message, 'GOV_NATIONAL_STANDARD_CREATE_ERROR', 500);
  }
}

export class GovNationalStandardUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la norme nationale') {
    super(message, 'GOV_NATIONAL_STANDARD_UPDATE_ERROR', 500);
  }
}

export class GovNationalStandardDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la norme nationale') {
    super(message, 'GOV_NATIONAL_STANDARD_DELETE_ERROR', 500);
  }
}

// SchoolComplianceRecord
export class GovSchoolComplianceRecordNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Registre de conformité scolaire (${identifier}) introuvable` : 'Registre de conformité scolaire introuvable';
    super(msg, 'GOV_SCHOOL_COMPLIANCE_RECORD_NOT_FOUND', 404);
  }
}

export class GovSchoolComplianceRecordCreateError extends AppError {
  constructor(message = 'Impossible de créer le registre de conformité scolaire') {
    super(message, 'GOV_SCHOOL_COMPLIANCE_RECORD_CREATE_ERROR', 500);
  }
}

export class GovSchoolComplianceRecordUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le registre de conformité scolaire') {
    super(message, 'GOV_SCHOOL_COMPLIANCE_RECORD_UPDATE_ERROR', 500);
  }
}

export class GovSchoolComplianceRecordDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le registre de conformité scolaire') {
    super(message, 'GOV_SCHOOL_COMPLIANCE_RECORD_DELETE_ERROR', 500);
  }
}

// ComplianceAssessment
export class GovComplianceAssessmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Évaluation de conformité (${identifier}) introuvable` : 'Évaluation de conformité introuvable';
    super(msg, 'GOV_COMPLIANCE_ASSESSMENT_NOT_FOUND', 404);
  }
}

export class GovComplianceAssessmentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'évaluation de conformité') {
    super(message, 'GOV_COMPLIANCE_ASSESSMENT_CREATE_ERROR', 500);
  }
}

export class GovComplianceAssessmentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'évaluation de conformité') {
    super(message, 'GOV_COMPLIANCE_ASSESSMENT_UPDATE_ERROR', 500);
  }
}

export class GovComplianceAssessmentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'évaluation de conformité') {
    super(message, 'GOV_COMPLIANCE_ASSESSMENT_DELETE_ERROR', 500);
  }
}

// ComplianceWaiver
export class GovComplianceWaiverNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Dérogation de conformité (${identifier}) introuvable` : 'Dérogation de conformité introuvable';
    super(msg, 'GOV_COMPLIANCE_WAIVER_NOT_FOUND', 404);
  }
}

export class GovComplianceWaiverCreateError extends AppError {
  constructor(message = 'Impossible de créer la dérogation de conformité') {
    super(message, 'GOV_COMPLIANCE_WAIVER_CREATE_ERROR', 500);
  }
}

export class GovComplianceWaiverUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la dérogation de conformité') {
    super(message, 'GOV_COMPLIANCE_WAIVER_UPDATE_ERROR', 500);
  }
}

export class GovComplianceWaiverDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la dérogation de conformité') {
    super(message, 'GOV_COMPLIANCE_WAIVER_DELETE_ERROR', 500);
  }
}

// RegulationCategory
export class GovRegulationCategoryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Catégorie de réglementation (${identifier}) introuvable` : 'Catégorie de réglementation introuvable';
    super(msg, 'GOV_REGULATION_CATEGORY_NOT_FOUND', 404);
  }
}

export class GovRegulationCategoryCreateError extends AppError {
  constructor(message = 'Impossible de créer la catégorie de réglementation') {
    super(message, 'GOV_REGULATION_CATEGORY_CREATE_ERROR', 500);
  }
}

export class GovRegulationCategoryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la catégorie de réglementation') {
    super(message, 'GOV_REGULATION_CATEGORY_UPDATE_ERROR', 500);
  }
}

export class GovRegulationCategoryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la catégorie de réglementation') {
    super(message, 'GOV_REGULATION_CATEGORY_DELETE_ERROR', 500);
  }
}

// EducationRegulation
export class GovEducationRegulationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réglement éducatif (${identifier}) introuvable` : 'Réglement éducatif introuvable';
    super(msg, 'GOV_EDUCATION_REGULATION_NOT_FOUND', 404);
  }
}

export class GovEducationRegulationCreateError extends AppError {
  constructor(message = 'Impossible de créer le réglement éducatif') {
    super(message, 'GOV_EDUCATION_REGULATION_CREATE_ERROR', 500);
  }
}

export class GovEducationRegulationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le réglement éducatif') {
    super(message, 'GOV_EDUCATION_REGULATION_UPDATE_ERROR', 500);
  }
}

export class GovEducationRegulationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le réglement éducatif') {
    super(message, 'GOV_EDUCATION_REGULATION_DELETE_ERROR', 500);
  }
}

// ComplianceNotification
export class GovComplianceNotificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Notification de conformité (${identifier}) introuvable` : 'Notification de conformité introuvable';
    super(msg, 'GOV_COMPLIANCE_NOTIFICATION_NOT_FOUND', 404);
  }
}

export class GovComplianceNotificationCreateError extends AppError {
  constructor(message = 'Impossible de créer la notification de conformité') {
    super(message, 'GOV_COMPLIANCE_NOTIFICATION_CREATE_ERROR', 500);
  }
}

export class GovComplianceNotificationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la notification de conformité') {
    super(message, 'GOV_COMPLIANCE_NOTIFICATION_UPDATE_ERROR', 500);
  }
}

export class GovComplianceNotificationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la notification de conformité') {
    super(message, 'GOV_COMPLIANCE_NOTIFICATION_DELETE_ERROR', 500);
  }
}

// ComplianceReport
export class GovComplianceReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport de conformité (${identifier}) introuvable` : 'Rapport de conformité introuvable';
    super(msg, 'GOV_COMPLIANCE_REPORT_NOT_FOUND', 404);
  }
}

export class GovComplianceReportCreateError extends AppError {
  constructor(message = 'Impossible de créer le rapport de conformité') {
    super(message, 'GOV_COMPLIANCE_REPORT_CREATE_ERROR', 500);
  }
}

export class GovComplianceReportUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le rapport de conformité') {
    super(message, 'GOV_COMPLIANCE_REPORT_UPDATE_ERROR', 500);
  }
}

export class GovComplianceReportDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le rapport de conformité') {
    super(message, 'GOV_COMPLIANCE_REPORT_DELETE_ERROR', 500);
  }
}

// ─── Module 12: International & Comparative Education (40 errors) ────────────

// Country
export class GovCountryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Pays (${identifier}) introuvable` : 'Pays introuvable';
    super(msg, 'GOV_COUNTRY_NOT_FOUND', 404);
  }
}

export class GovCountryCreateError extends AppError {
  constructor(message = 'Impossible de créer le pays') {
    super(message, 'GOV_COUNTRY_CREATE_ERROR', 500);
  }
}

export class GovCountryUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le pays') {
    super(message, 'GOV_COUNTRY_UPDATE_ERROR', 500);
  }
}

export class GovCountryDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le pays') {
    super(message, 'GOV_COUNTRY_DELETE_ERROR', 500);
  }
}

// Language
export class GovLanguageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Langue (${identifier}) introuvable` : 'Langue introuvable';
    super(msg, 'GOV_LANGUAGE_NOT_FOUND', 404);
  }
}

export class GovLanguageCreateError extends AppError {
  constructor(message = 'Impossible de créer la langue') {
    super(message, 'GOV_LANGUAGE_CREATE_ERROR', 500);
  }
}

export class GovLanguageUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la langue') {
    super(message, 'GOV_LANGUAGE_UPDATE_ERROR', 500);
  }
}

export class GovLanguageDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la langue') {
    super(message, 'GOV_LANGUAGE_DELETE_ERROR', 500);
  }
}

// Currency
export class GovCurrencyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Monnaie (${identifier}) introuvable` : 'Monnaie introuvable';
    super(msg, 'GOV_CURRENCY_NOT_FOUND', 404);
  }
}

export class GovCurrencyCreateError extends AppError {
  constructor(message = 'Impossible de créer la monnaie') {
    super(message, 'GOV_CURRENCY_CREATE_ERROR', 500);
  }
}

export class GovCurrencyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la monnaie') {
    super(message, 'GOV_CURRENCY_UPDATE_ERROR', 500);
  }
}

export class GovCurrencyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la monnaie') {
    super(message, 'GOV_CURRENCY_DELETE_ERROR', 500);
  }
}

// EducationSystem
export class GovEducationSystemNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Système éducatif (${identifier}) introuvable` : 'Système éducatif introuvable';
    super(msg, 'GOV_EDUCATION_SYSTEM_NOT_FOUND', 404);
  }
}

export class GovEducationSystemCreateError extends AppError {
  constructor(message = 'Impossible de créer le système éducatif') {
    super(message, 'GOV_EDUCATION_SYSTEM_CREATE_ERROR', 500);
  }
}

export class GovEducationSystemUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le système éducatif') {
    super(message, 'GOV_EDUCATION_SYSTEM_UPDATE_ERROR', 500);
  }
}

export class GovEducationSystemDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le système éducatif') {
    super(message, 'GOV_EDUCATION_SYSTEM_DELETE_ERROR', 500);
  }
}

// Equivalency
export class GovEquivalencyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Équivalence (${identifier}) introuvable` : 'Équivalence introuvable';
    super(msg, 'GOV_EQUIVALENCY_NOT_FOUND', 404);
  }
}

export class GovEquivalencyCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'équivalence') {
    super(message, 'GOV_EQUIVALENCY_CREATE_ERROR', 500);
  }
}

export class GovEquivalencyUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'équivalence') {
    super(message, 'GOV_EQUIVALENCY_UPDATE_ERROR', 500);
  }
}

export class GovEquivalencyDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'équivalence') {
    super(message, 'GOV_EQUIVALENCY_DELETE_ERROR', 500);
  }
}

// InternationalPartnership
export class GovInternationalPartnershipNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Partenariat international (${identifier}) introuvable` : 'Partenariat international introuvable';
    super(msg, 'GOV_INTERNATIONAL_PARTNERSHIP_NOT_FOUND', 404);
  }
}

export class GovInternationalPartnershipCreateError extends AppError {
  constructor(message = 'Impossible de créer le partenariat international') {
    super(message, 'GOV_INTERNATIONAL_PARTNERSHIP_CREATE_ERROR', 500);
  }
}

export class GovInternationalPartnershipUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le partenariat international') {
    super(message, 'GOV_INTERNATIONAL_PARTNERSHIP_UPDATE_ERROR', 500);
  }
}

export class GovInternationalPartnershipDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le partenariat international') {
    super(message, 'GOV_INTERNATIONAL_PARTNERSHIP_DELETE_ERROR', 500);
  }
}

// ExchangeProgram
export class GovExchangeProgramNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Programme d'échange (${identifier}) introuvable` : 'Programme d\'échange introuvable';
    super(msg, 'GOV_EXCHANGE_PROGRAM_NOT_FOUND', 404);
  }
}

export class GovExchangeProgramCreateError extends AppError {
  constructor(message = 'Impossible de créer le programme d\'échange') {
    super(message, 'GOV_EXCHANGE_PROGRAM_CREATE_ERROR', 500);
  }
}

export class GovExchangeProgramUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le programme d\'échange') {
    super(message, 'GOV_EXCHANGE_PROGRAM_UPDATE_ERROR', 500);
  }
}

export class GovExchangeProgramDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le programme d\'échange') {
    super(message, 'GOV_EXCHANGE_PROGRAM_DELETE_ERROR', 500);
  }
}

// InternationalStudent
export class GovInternationalStudentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Étudiant international (${identifier}) introuvable` : 'Étudiant international introuvable';
    super(msg, 'GOV_INTERNATIONAL_STUDENT_NOT_FOUND', 404);
  }
}

export class GovInternationalStudentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'étudiant international') {
    super(message, 'GOV_INTERNATIONAL_STUDENT_CREATE_ERROR', 500);
  }
}

export class GovInternationalStudentUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'étudiant international') {
    super(message, 'GOV_INTERNATIONAL_STUDENT_UPDATE_ERROR', 500);
  }
}

export class GovInternationalStudentDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'étudiant international') {
    super(message, 'GOV_INTERNATIONAL_STUDENT_DELETE_ERROR', 500);
  }
}

// CrossBorderResearch
export class GovCrossBorderResearchNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Recherche transfrontalière (${identifier}) introuvable` : 'Recherche transfrontalière introuvable';
    super(msg, 'GOV_CROSS_BORDER_RESEARCH_NOT_FOUND', 404);
  }
}

export class GovCrossBorderResearchCreateError extends AppError {
  constructor(message = 'Impossible de créer la recherche transfrontalière') {
    super(message, 'GOV_CROSS_BORDER_RESEARCH_CREATE_ERROR', 500);
  }
}

export class GovCrossBorderResearchUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la recherche transfrontalière') {
    super(message, 'GOV_CROSS_BORDER_RESEARCH_UPDATE_ERROR', 500);
  }
}

export class GovCrossBorderResearchDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la recherche transfrontalière') {
    super(message, 'GOV_CROSS_BORDER_RESEARCH_DELETE_ERROR', 500);
  }
}

// GlobalBenchmark
export class GovGlobalBenchmarkNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Référence mondiale (${identifier}) introuvable` : 'Référence mondiale introuvable';
    super(msg, 'GOV_GLOBAL_BENCHMARK_NOT_FOUND', 404);
  }
}

export class GovGlobalBenchmarkCreateError extends AppError {
  constructor(message = 'Impossible de créer la référence mondiale') {
    super(message, 'GOV_GLOBAL_BENCHMARK_CREATE_ERROR', 500);
  }
}

export class GovGlobalBenchmarkUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la référence mondiale') {
    super(message, 'GOV_GLOBAL_BENCHMARK_UPDATE_ERROR', 500);
  }
}

export class GovGlobalBenchmarkDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la référence mondiale') {
    super(message, 'GOV_GLOBAL_BENCHMARK_DELETE_ERROR', 500);
  }
}

export class GovIdentityBiometricMatchingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Correspondance biométrique (${identifier}) introuvable` : 'Correspondance biométrique introuvable';
    super(msg, 'GOV_IDENTITY_BIOMETRIC_MATCHING_NOT_FOUND', 404);
  }
}

export class GovInspectionComplianceCheckingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Vérification de conformité (${identifier}) introuvable` : 'Vérification de conformité introuvable';
    super(msg, 'GOV_INSPECTION_COMPLIANCE_CHECKING_NOT_FOUND', 404);
  }
}

export class GovInspectionSchedulingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Planification d'inspection (${identifier}) introuvable` : 'Planification d\'inspection introuvable';
    super(msg, 'GOV_INSPECTION_SCHEDULING_NOT_FOUND', 404);
  }
}

export class GovInternationalDataSyncNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Synchronisation internationale (${identifier}) introuvable` : 'Synchronisation internationale introuvable';
    super(msg, 'GOV_INTERNATIONAL_DATA_SYNC_NOT_FOUND', 404);
  }
}

export class GovInternationalEquivalencyCalculationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Calcul d'équivalence (${identifier}) introuvable` : 'Calcul d\'équivalence introuvable';
    super(msg, 'GOV_INTERNATIONAL_EQUIVALENCY_CALCULATION_NOT_FOUND', 404);
  }
}

export class GovMinistryAnalyticsNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Analytiques ministère (${identifier}) introuvable` : 'Analytiques ministère introuvable';
    super(msg, 'GOV_MINISTRY_ANALYTICS_NOT_FOUND', 404);
  }
}

export class GovMinistryExportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Export ministère (${identifier}) introuvable` : 'Export ministère introuvable';
    super(msg, 'GOV_MINISTRY_EXPORT_NOT_FOUND', 404);
  }
}

export class GovScholarshipSelectionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Sélection de bourse (${identifier}) introuvable` : 'Sélection de bourse introuvable';
    super(msg, 'GOV_SCHOLARSHIP_SELECTION_NOT_FOUND', 404);
  }
}

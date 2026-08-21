import { AppError } from './AppError';

// ═══════════════════════════════════════════════════════════════════════════════
// Phase 2.8 — Smart Campus Enterprise Errors
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Module 1: Transport (30 errors) ─────────────────────────────────────────

export class ScBusNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Bus (${identifier}) introuvable` : 'Bus introuvable';
    super(msg, 'SC_BUS_NOT_FOUND', 404);
  }
}

export class ScBusCreateError extends AppError {
  constructor(message = 'Impossible de créer le bus') {
    super(message, 'SC_BUS_CREATE_ERROR', 500);
  }
}

export class ScBusUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le bus') {
    super(message, 'SC_BUS_UPDATE_ERROR', 500);
  }
}

export class ScBusDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le bus') {
    super(message, 'SC_BUS_DELETE_ERROR', 500);
  }
}

export class ScRouteNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Itinéraire (${identifier}) introuvable` : 'Itinéraire introuvable';
    super(msg, 'SC_ROUTE_NOT_FOUND', 404);
  }
}

export class ScRouteCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'itinéraire') {
    super(message, 'SC_ROUTE_CREATE_ERROR', 500);
  }
}

export class ScRouteUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'itinéraire') {
    super(message, 'SC_ROUTE_UPDATE_ERROR', 500);
  }
}

export class ScRouteDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'itinéraire') {
    super(message, 'SC_ROUTE_DELETE_ERROR', 500);
  }
}

export class ScTripNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Trajet (${identifier}) introuvable` : 'Trajet introuvable';
    super(msg, 'SC_TRIP_NOT_FOUND', 404);
  }
}

export class ScTripCreateError extends AppError {
  constructor(message = 'Impossible de créer le trajet') {
    super(message, 'SC_TRIP_CREATE_ERROR', 500);
  }
}

export class ScTripUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le trajet') {
    super(message, 'SC_TRIP_UPDATE_ERROR', 500);
  }
}

export class ScTripDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le trajet') {
    super(message, 'SC_TRIP_DELETE_ERROR', 500);
  }
}

export class ScDriverNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Chauffeur (${identifier}) introuvable` : 'Chauffeur introuvable';
    super(msg, 'SC_DRIVER_NOT_FOUND', 404);
  }
}

export class ScDriverCreateError extends AppError {
  constructor(message = 'Impossible de créer le chauffeur') {
    super(message, 'SC_DRIVER_CREATE_ERROR', 500);
  }
}

export class ScDriverUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le chauffeur') {
    super(message, 'SC_DRIVER_UPDATE_ERROR', 500);
  }
}

export class ScDriverDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le chauffeur') {
    super(message, 'SC_DRIVER_DELETE_ERROR', 500);
  }
}

export class ScAssistantNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Assistant (${identifier}) introuvable` : 'Assistant introuvable';
    super(msg, 'SC_ASSISTANT_NOT_FOUND', 404);
  }
}

export class ScAssistantCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'assistant') {
    super(message, 'SC_ASSISTANT_CREATE_ERROR', 500);
  }
}

export class ScAssignmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Affectation (${identifier}) introuvable` : 'Affectation introuvable';
    super(msg, 'SC_ASSIGNMENT_NOT_FOUND', 404);
  }
}

export class ScAssignmentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'affectation') {
    super(message, 'SC_ASSIGNMENT_CREATE_ERROR', 500);
  }
}

export class ScTrackingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Suivi (${identifier}) introuvable` : 'Suivi introuvable';
    super(msg, 'SC_TRACKING_NOT_FOUND', 404);
  }
}

export class ScTrackingCreateError extends AppError {
  constructor(message = 'Impossible de créer le suivi') {
    super(message, 'SC_TRACKING_CREATE_ERROR', 500);
  }
}

export class ScAttendanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Présence transport (${identifier}) introuvable` : 'Présence transport introuvable';
    super(msg, 'SC_TRANSPORT_ATTENDANCE_NOT_FOUND', 404);
  }
}

export class ScAttendanceCreateError extends AppError {
  constructor(message = 'Impossible de créer la présence transport') {
    super(message, 'SC_TRANSPORT_ATTENDANCE_CREATE_ERROR', 500);
  }
}

export class ScFuelNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Carburant (${identifier}) introuvable` : 'Carburant introuvable';
    super(msg, 'SC_FUEL_NOT_FOUND', 404);
  }
}

export class ScFuelCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'enregistrement carburant') {
    super(message, 'SC_FUEL_CREATE_ERROR', 500);
  }
}

export class ScTransportMaintenanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Maintenance transport (${identifier}) introuvable` : 'Maintenance transport introuvable';
    super(msg, 'SC_TRANSPORT_MAINTENANCE_NOT_FOUND', 404);
  }
}

export class ScTransportMaintenanceCreateError extends AppError {
  constructor(message = 'Impossible de créer la maintenance transport') {
    super(message, 'SC_TRANSPORT_MAINTENANCE_CREATE_ERROR', 500);
  }
}

export class ScInsuranceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Assurance (${identifier}) introuvable` : 'Assurance introuvable';
    super(msg, 'SC_INSURANCE_NOT_FOUND', 404);
  }
}

export class ScInsuranceCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'assurance') {
    super(message, 'SC_INSURANCE_CREATE_ERROR', 500);
  }
}

// ─── Module 2: Library (30 errors) ───────────────────────────────────────────

export class ScBookNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Livre (${identifier}) introuvable` : 'Livre introuvable';
    super(msg, 'SC_BOOK_NOT_FOUND', 404);
  }
}

export class ScBookCreateError extends AppError {
  constructor(message = 'Impossible de créer le livre') {
    super(message, 'SC_BOOK_CREATE_ERROR', 500);
  }
}

export class ScBookUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le livre') {
    super(message, 'SC_BOOK_UPDATE_ERROR', 500);
  }
}

export class ScBookDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le livre') {
    super(message, 'SC_BOOK_DELETE_ERROR', 500);
  }
}

export class ScAuthorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Auteur (${identifier}) introuvable` : 'Auteur introuvable';
    super(msg, 'SC_AUTHOR_NOT_FOUND', 404);
  }
}

export class ScAuthorCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'auteur') {
    super(message, 'SC_AUTHOR_CREATE_ERROR', 500);
  }
}

export class ScPublisherNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Éditeur (${identifier}) introuvable` : 'Éditeur introuvable';
    super(msg, 'SC_PUBLISHER_NOT_FOUND', 404);
  }
}

export class ScPublisherCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'éditeur') {
    super(message, 'SC_PUBLISHER_CREATE_ERROR', 500);
  }
}

export class ScCopyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Exemplaire (${identifier}) introuvable` : 'Exemplaire introuvable';
    super(msg, 'SC_COPY_NOT_FOUND', 404);
  }
}

export class ScCopyCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'exemplaire') {
    super(message, 'SC_COPY_CREATE_ERROR', 500);
  }
}

export class ScLoanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prêt (${identifier}) introuvable` : 'Prêt introuvable';
    super(msg, 'SC_LOAN_NOT_FOUND', 404);
  }
}

export class ScLoanCreateError extends AppError {
  constructor(message = 'Impossible de créer le prêt') {
    super(message, 'SC_LOAN_CREATE_ERROR', 500);
  }
}

export class ScReturnNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Retour (${identifier}) introuvable` : 'Retour introuvable';
    super(msg, 'SC_RETURN_NOT_FOUND', 404);
  }
}

export class ScReturnCreateError extends AppError {
  constructor(message = 'Impossible de créer le retour') {
    super(message, 'SC_RETURN_CREATE_ERROR', 500);
  }
}

export class ScReservationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réservation (${identifier}) introuvable` : 'Réservation introuvable';
    super(msg, 'SC_LIBRARY_RESERVATION_NOT_FOUND', 404);
  }
}

export class ScReservationCreateError extends AppError {
  constructor(message = 'Impossible de créer la réservation') {
    super(message, 'SC_LIBRARY_RESERVATION_CREATE_ERROR', 500);
  }
}

export class ScFineNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Amende (${identifier}) introuvable` : 'Amende introuvable';
    super(msg, 'SC_FINE_NOT_FOUND', 404);
  }
}

export class ScFineCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'amende') {
    super(message, 'SC_FINE_CREATE_ERROR', 500);
  }
}

export class ScEBookNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Livre électronique (${identifier}) introuvable` : 'Livre électronique introuvable';
    super(msg, 'SC_EBOOK_NOT_FOUND', 404);
  }
}

export class ScEBookCreateError extends AppError {
  constructor(message = 'Impossible de créer le livre électronique') {
    super(message, 'SC_EBOOK_CREATE_ERROR', 500);
  }
}

export class ScAudiobookNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Livre audio (${identifier}) introuvable` : 'Livre audio introuvable';
    super(msg, 'SC_AUDIOBOOK_NOT_FOUND', 404);
  }
}

export class ScAudiobookCreateError extends AppError {
  constructor(message = 'Impossible de créer le livre audio') {
    super(message, 'SC_AUDIOBOOK_CREATE_ERROR', 500);
  }
}

export class ScRFIDNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `RFID (${identifier}) introuvable` : 'RFID introuvable';
    super(msg, 'SC_RFID_NOT_FOUND', 404);
  }
}

export class ScRFIDCreateError extends AppError {
  constructor(message = 'Impossible de créer le RFID') {
    super(message, 'SC_RFID_CREATE_ERROR', 500);
  }
}

export class ScInventoryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Inventaire (${identifier}) introuvable` : 'Inventaire introuvable';
    super(msg, 'SC_LIBRARY_INVENTORY_NOT_FOUND', 404);
  }
}

export class ScInventoryCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'inventaire') {
    super(message, 'SC_LIBRARY_INVENTORY_CREATE_ERROR', 500);
  }
}

export class ScAcquisitionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Acquisition (${identifier}) introuvable` : 'Acquisition introuvable';
    super(msg, 'SC_ACQUISITION_NOT_FOUND', 404);
  }
}

export class ScAcquisitionCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'acquisition') {
    super(message, 'SC_ACQUISITION_CREATE_ERROR', 500);
  }
}

export class ScRecommendationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Recommandation (${identifier}) introuvable` : 'Recommandation introuvable';
    super(msg, 'SC_RECOMMENDATION_NOT_FOUND', 404);
  }
}

export class ScRecommendationCreateError extends AppError {
  constructor(message = 'Impossible de créer la recommandation') {
    super(message, 'SC_RECOMMENDATION_CREATE_ERROR', 500);
  }
}

// ─── Module 3: Cantine (25 errors) ───────────────────────────────────────────

export class ScMenuNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Menu (${identifier}) introuvable` : 'Menu introuvable';
    super(msg, 'SC_MENU_NOT_FOUND', 404);
  }
}

export class ScMenuCreateError extends AppError {
  constructor(message = 'Impossible de créer le menu') {
    super(message, 'SC_MENU_CREATE_ERROR', 500);
  }
}

export class ScMenuUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le menu') {
    super(message, 'SC_MENU_UPDATE_ERROR', 500);
  }
}

export class ScMenuDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le menu') {
    super(message, 'SC_MENU_DELETE_ERROR', 500);
  }
}

export class ScMealNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Repas (${identifier}) introuvable` : 'Repas introuvable';
    super(msg, 'SC_MEAL_NOT_FOUND', 404);
  }
}

export class ScMealCreateError extends AppError {
  constructor(message = 'Impossible de créer le repas') {
    super(message, 'SC_MEAL_CREATE_ERROR', 500);
  }
}

export class ScNutritionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Informations nutritionnelles (${identifier}) introuvables` : 'Informations nutritionnelles introuvables';
    super(msg, 'SC_NUTRITION_NOT_FOUND', 404);
  }
}

export class ScNutritionCreateError extends AppError {
  constructor(message = 'Impossible de créer les informations nutritionnelles') {
    super(message, 'SC_NUTRITION_CREATE_ERROR', 500);
  }
}

export class ScAllergenNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Allergène (${identifier}) introuvable` : 'Allergène introuvable';
    super(msg, 'SC_ALLERGEN_NOT_FOUND', 404);
  }
}

export class ScAllergenCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'allergène') {
    super(message, 'SC_ALLERGEN_CREATE_ERROR', 500);
  }
}

export class ScFoodStockNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Stock alimentaire (${identifier}) introuvable` : 'Stock alimentaire introuvable';
    super(msg, 'SC_FOOD_STOCK_NOT_FOUND', 404);
  }
}

export class ScFoodStockCreateError extends AppError {
  constructor(message = 'Impossible de créer le stock alimentaire') {
    super(message, 'SC_FOOD_STOCK_CREATE_ERROR', 500);
  }
}

export class ScSupplierNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Fournisseur (${identifier}) introuvable` : 'Fournisseur introuvable';
    super(msg, 'SC_SUPPLIER_NOT_FOUND', 404);
  }
}

export class ScSupplierCreateError extends AppError {
  constructor(message = 'Impossible de créer le fournisseur') {
    super(message, 'SC_SUPPLIER_CREATE_ERROR', 500);
  }
}

export class ScOrderNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Commande (${identifier}) introuvable` : 'Commande introuvable';
    super(msg, 'SC_ORDER_NOT_FOUND', 404);
  }
}

export class ScOrderCreateError extends AppError {
  constructor(message = 'Impossible de créer la commande') {
    super(message, 'SC_ORDER_CREATE_ERROR', 500);
  }
}

export class ScConsumptionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Consommation (${identifier}) introuvable` : 'Consommation introuvable';
    super(msg, 'SC_CONSUMPTION_NOT_FOUND', 404);
  }
}

export class ScConsumptionCreateError extends AppError {
  constructor(message = 'Impossible de créer la consommation') {
    super(message, 'SC_CONSUMPTION_CREATE_ERROR', 500);
  }
}

export class ScSubscriptionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Abonnement cantine (${identifier}) introuvable` : 'Abonnement cantine introuvable';
    super(msg, 'SC_SUBSCRIPTION_NOT_FOUND', 404);
  }
}

export class ScSubscriptionCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'abonnement cantine') {
    super(message, 'SC_SUBSCRIPTION_CREATE_ERROR', 500);
  }
}

export class ScPaymentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Paiement cantine (${identifier}) introuvable` : 'Paiement cantine introuvable';
    super(msg, 'SC_CANTINE_PAYMENT_NOT_FOUND', 404);
  }
}

export class ScPaymentCreateError extends AppError {
  constructor(message = 'Impossible de créer le paiement cantine') {
    super(message, 'SC_CANTINE_PAYMENT_CREATE_ERROR', 500);
  }
}

export class ScKitchenStaffNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Personnel de cuisine (${identifier}) introuvable` : 'Personnel de cuisine introuvable';
    super(msg, 'SC_KITCHEN_STAFF_NOT_FOUND', 404);
  }
}

export class ScKitchenStaffCreateError extends AppError {
  constructor(message = 'Impossible de créer le personnel de cuisine') {
    super(message, 'SC_KITCHEN_STAFF_CREATE_ERROR', 500);
  }
}

export class ScMealPlanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Plan de repas (${identifier}) introuvable` : 'Plan de repas introuvable';
    super(msg, 'SC_MEAL_PLAN_NOT_FOUND', 404);
  }
}

// ─── Module 4: Medical (25 errors) ───────────────────────────────────────────

export class ScMedicalRecordNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Dossier médical (${identifier}) introuvable` : 'Dossier médical introuvable';
    super(msg, 'SC_MEDICAL_RECORD_NOT_FOUND', 404);
  }
}

export class ScMedicalRecordCreateError extends AppError {
  constructor(message = 'Impossible de créer le dossier médical') {
    super(message, 'SC_MEDICAL_RECORD_CREATE_ERROR', 500);
  }
}

export class ScMedicalRecordUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le dossier médical') {
    super(message, 'SC_MEDICAL_RECORD_UPDATE_ERROR', 500);
  }
}

export class ScMedicalRecordDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le dossier médical') {
    super(message, 'SC_MEDICAL_RECORD_DELETE_ERROR', 500);
  }
}

export class ScVisitNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Visite médicale (${identifier}) introuvable` : 'Visite médicale introuvable';
    super(msg, 'SC_VISIT_NOT_FOUND', 404);
  }
}

export class ScVisitCreateError extends AppError {
  constructor(message = 'Impossible de créer la visite médicale') {
    super(message, 'SC_VISIT_CREATE_ERROR', 500);
  }
}

export class ScTreatmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Traitement (${identifier}) introuvable` : 'Traitement introuvable';
    super(msg, 'SC_TREATMENT_NOT_FOUND', 404);
  }
}

export class ScTreatmentCreateError extends AppError {
  constructor(message = 'Impossible de créer le traitement') {
    super(message, 'SC_TREATMENT_CREATE_ERROR', 500);
  }
}

export class ScVaccinationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Vaccination (${identifier}) introuvable` : 'Vaccination introuvable';
    super(msg, 'SC_VACCINATION_NOT_FOUND', 404);
  }
}

export class ScVaccinationCreateError extends AppError {
  constructor(message = 'Impossible de créer la vaccination') {
    super(message, 'SC_VACCINATION_CREATE_ERROR', 500);
  }
}

export class ScMedicalAllergyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Allergie (${identifier}) introuvable` : 'Allergie introuvable';
    super(msg, 'SC_MEDICAL_ALLERGY_NOT_FOUND', 404);
  }
}

export class ScMedicalAllergyCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'allergie') {
    super(message, 'SC_MEDICAL_ALLERGY_CREATE_ERROR', 500);
  }
}

export class ScMedicalHistoryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Historique médical (${identifier}) introuvable` : 'Historique médical introuvable';
    super(msg, 'SC_MEDICAL_HISTORY_NOT_FOUND', 404);
  }
}

export class ScMedicalHistoryCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'historique médical') {
    super(message, 'SC_MEDICAL_HISTORY_CREATE_ERROR', 500);
  }
}

export class ScMedicationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Médicament (${identifier}) introuvable` : 'Médicament introuvable';
    super(msg, 'SC_MEDICATION_NOT_FOUND', 404);
  }
}

export class ScMedicationCreateError extends AppError {
  constructor(message = 'Impossible de créer le médicament') {
    super(message, 'SC_MEDICATION_CREATE_ERROR', 500);
  }
}

export class ScEmergencyContactNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Contact d'urgence (${identifier}) introuvable` : 'Contact d\'urgence introuvable';
    super(msg, 'SC_EMERGENCY_CONTACT_NOT_FOUND', 404);
  }
}

export class ScEmergencyContactCreateError extends AppError {
  constructor(message = 'Impossible de créer le contact d\'urgence') {
    super(message, 'SC_EMERGENCY_CONTACT_CREATE_ERROR', 500);
  }
}

export class ScAccidentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accident (${identifier}) introuvable` : 'Accident introuvable';
    super(msg, 'SC_ACCIDENT_NOT_FOUND', 404);
  }
}

export class ScAccidentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'accident') {
    super(message, 'SC_ACCIDENT_CREATE_ERROR', 500);
  }
}

export class ScHealthReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport de santé (${identifier}) introuvable` : 'Rapport de santé introuvable';
    super(msg, 'SC_HEALTH_REPORT_NOT_FOUND', 404);
  }
}

export class ScHealthReportCreateError extends AppError {
  constructor(message = 'Impossible de créer le rapport de santé') {
    super(message, 'SC_HEALTH_REPORT_CREATE_ERROR', 500);
  }
}

export class ScCertificateNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Certificat médical (${identifier}) introuvable` : 'Certificat médical introuvable';
    super(msg, 'SC_CERTIFICATE_NOT_FOUND', 404);
  }
}

export class ScCertificateCreateError extends AppError {
  constructor(message = 'Impossible de créer le certificat médical') {
    super(message, 'SC_CERTIFICATE_CREATE_ERROR', 500);
  }
}

export class ScDosageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Dosage (${identifier}) introuvable` : 'Dosage introuvable';
    super(msg, 'SC_DOSAGE_NOT_FOUND', 404);
  }
}

// ─── Module 5: Boarding (25 errors) ──────────────────────────────────────────

export class ScBuildingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Bâtiment (${identifier}) introuvable` : 'Bâtiment introuvable';
    super(msg, 'SC_BUILDING_NOT_FOUND', 404);
  }
}

export class ScBuildingCreateError extends AppError {
  constructor(message = 'Impossible de créer le bâtiment') {
    super(message, 'SC_BUILDING_CREATE_ERROR', 500);
  }
}

export class ScBuildingUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le bâtiment') {
    super(message, 'SC_BUILDING_UPDATE_ERROR', 500);
  }
}

export class ScBuildingDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le bâtiment') {
    super(message, 'SC_BUILDING_DELETE_ERROR', 500);
  }
}

export class ScRoomNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Chambre (${identifier}) introuvable` : 'Chambre introuvable';
    super(msg, 'SC_ROOM_NOT_FOUND', 404);
  }
}

export class ScRoomCreateError extends AppError {
  constructor(message = 'Impossible de créer la chambre') {
    super(message, 'SC_ROOM_CREATE_ERROR', 500);
  }
}

export class ScRoomUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la chambre') {
    super(message, 'SC_ROOM_UPDATE_ERROR', 500);
  }
}

export class ScRoomDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la chambre') {
    super(message, 'SC_ROOM_DELETE_ERROR', 500);
  }
}

export class ScBedNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Lit (${identifier}) introuvable` : 'Lit introuvable';
    super(msg, 'SC_BED_NOT_FOUND', 404);
  }
}

export class ScBedCreateError extends AppError {
  constructor(message = 'Impossible de créer le lit') {
    super(message, 'SC_BED_CREATE_ERROR', 500);
  }
}

export class ScBedUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le lit') {
    super(message, 'SC_BED_UPDATE_ERROR', 500);
  }
}

export class ScOccupancyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Occupation (${identifier}) introuvable` : 'Occupation introuvable';
    super(msg, 'SC_OCCUPANCY_NOT_FOUND', 404);
  }
}

export class ScOccupancyCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'occupation') {
    super(message, 'SC_OCCUPANCY_CREATE_ERROR', 500);
  }
}

export class ScRoomAssignmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Affectation chambre (${identifier}) introuvable` : 'Affectation chambre introuvable';
    super(msg, 'SC_ROOM_ASSIGNMENT_NOT_FOUND', 404);
  }
}

export class ScRoomAssignmentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'affectation chambre') {
    super(message, 'SC_ROOM_ASSIGNMENT_CREATE_ERROR', 500);
  }
}

export class ScBoardingAttendanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Présence internat (${identifier}) introuvable` : 'Présence internat introuvable';
    super(msg, 'SC_BOARDING_ATTENDANCE_NOT_FOUND', 404);
  }
}

export class ScBoardingAttendanceCreateError extends AppError {
  constructor(message = 'Impossible de créer la présence internat') {
    super(message, 'SC_BOARDING_ATTENDANCE_CREATE_ERROR', 500);
  }
}

export class ScNightReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport nocturne (${identifier}) introuvable` : 'Rapport nocturne introuvable';
    super(msg, 'SC_NIGHT_REPORT_NOT_FOUND', 404);
  }
}

export class ScNightReportCreateError extends AppError {
  constructor(message = 'Impossible de créer le rapport nocturne') {
    super(message, 'SC_NIGHT_REPORT_CREATE_ERROR', 500);
  }
}

export class ScDisciplineNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Discipline (${identifier}) introuvable` : 'Discipline introuvable';
    super(msg, 'SC_DISCIPLINE_NOT_FOUND', 404);
  }
}

export class ScDisciplineCreateError extends AppError {
  constructor(message = 'Impossible de créer la discipline') {
    super(message, 'SC_DISCIPLINE_CREATE_ERROR', 500);
  }
}

export class ScBuildingMaintenanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Maintenance bâtiment (${identifier}) introuvable` : 'Maintenance bâtiment introuvable';
    super(msg, 'SC_BUILDING_MAINTENANCE_NOT_FOUND', 404);
  }
}

export class ScBuildingMaintenanceCreateError extends AppError {
  constructor(message = 'Impossible de créer la maintenance bâtiment') {
    super(message, 'SC_BUILDING_MAINTENANCE_CREATE_ERROR', 500);
  }
}

export class ScNightShiftNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Garde de nuit (${identifier}) introuvable` : 'Garde de nuit introuvable';
    super(msg, 'SC_NIGHT_SHIFT_NOT_FOUND', 404);
  }
}

export class ScVisitorLogNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Journal de visite internat (${identifier}) introuvable` : 'Journal de visite internat introuvable';
    super(msg, 'SC_VISITOR_LOG_NOT_FOUND', 404);
  }
}

// ─── Module 6: Visitors (20 errors) ──────────────────────────────────────────

export class ScVisitorRegistrationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Enregistrement visiteur (${identifier}) introuvable` : 'Enregistrement visiteur introuvable';
    super(msg, 'SC_VISITOR_REGISTRATION_NOT_FOUND', 404);
  }
}

export class ScVisitorRegistrationCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'enregistrement visiteur') {
    super(message, 'SC_VISITOR_REGISTRATION_CREATE_ERROR', 500);
  }
}

export class ScVisitorRegistrationUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'enregistrement visiteur') {
    super(message, 'SC_VISITOR_REGISTRATION_UPDATE_ERROR', 500);
  }
}

export class ScVisitorRegistrationDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'enregistrement visiteur') {
    super(message, 'SC_VISITOR_REGISTRATION_DELETE_ERROR', 500);
  }
}

export class ScVisitorBadgeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Badge visiteur (${identifier}) introuvable` : 'Badge visiteur introuvable';
    super(msg, 'SC_VISITOR_BADGE_NOT_FOUND', 404);
  }
}

export class ScVisitorBadgeCreateError extends AppError {
  constructor(message = 'Impossible de créer le badge visiteur') {
    super(message, 'SC_VISITOR_BADGE_CREATE_ERROR', 500);
  }
}

export class ScVisitorQRNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `QR code visiteur (${identifier}) introuvable` : 'QR code visiteur introuvable';
    super(msg, 'SC_VISITOR_QR_NOT_FOUND', 404);
  }
}

export class ScVisitorQRCreateError extends AppError {
  constructor(message = 'Impossible de créer le QR code visiteur') {
    super(message, 'SC_VISITOR_QR_CREATE_ERROR', 500);
  }
}

export class ScVisitorInvitationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Invitation visiteur (${identifier}) introuvable` : 'Invitation visiteur introuvable';
    super(msg, 'SC_VISITOR_INVITATION_NOT_FOUND', 404);
  }
}

export class ScVisitorInvitationCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'invitation visiteur') {
    super(message, 'SC_VISITOR_INVITATION_CREATE_ERROR', 500);
  }
}

export class ScVisitorApprovalNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Approbation visiteur (${identifier}) introuvable` : 'Approbation visiteur introuvable';
    super(msg, 'SC_VISITOR_APPROVAL_NOT_FOUND', 404);
  }
}

export class ScVisitorApprovalCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'approbation visiteur') {
    super(message, 'SC_VISITOR_APPROVAL_CREATE_ERROR', 500);
  }
}

export class ScIdentityVerificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Vérification d'identité (${identifier}) introuvable` : 'Vérification d\'identité introuvable';
    super(msg, 'SC_IDENTITY_VERIFICATION_NOT_FOUND', 404);
  }
}

export class ScIdentityVerificationCreateError extends AppError {
  constructor(message = 'Impossible de créer la vérification d\'identité') {
    super(message, 'SC_IDENTITY_VERIFICATION_CREATE_ERROR', 500);
  }
}

export class ScVisitorBlacklistNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Liste noire visiteurs (${identifier}) introuvable` : 'Liste noire visiteurs introuvable';
    super(msg, 'SC_VISITOR_BLACKLIST_NOT_FOUND', 404);
  }
}

export class ScVisitorBlacklistCreateError extends AppError {
  constructor(message = 'Impossible d\'ajouter à la liste noire visiteurs') {
    super(message, 'SC_VISITOR_BLACKLIST_CREATE_ERROR', 500);
  }
}

export class ScVisitHistoryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Historique de visite (${identifier}) introuvable` : 'Historique de visite introuvable';
    super(msg, 'SC_VISIT_HISTORY_NOT_FOUND', 404);
  }
}

export class ScVisitHistoryCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'historique de visite') {
    super(message, 'SC_VISIT_HISTORY_CREATE_ERROR', 500);
  }
}

export class ScVisitorPassNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Pass visiteur (${identifier}) introuvable` : 'Pass visiteur introuvable';
    super(msg, 'SC_VISITOR_PASS_NOT_FOUND', 404);
  }
}

export class ScVisitorNotificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Notification visiteur (${identifier}) introuvable` : 'Notification visiteur introuvable';
    super(msg, 'SC_VISITOR_NOTIFICATION_NOT_FOUND', 404);
  }
}

// ─── Module 7: Assets (25 errors) ────────────────────────────────────────────

export class ScAssetNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Asset (${identifier}) introuvable` : 'Asset introuvable';
    super(msg, 'SC_ASSET_NOT_FOUND', 404);
  }
}

export class ScAssetCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'asset') {
    super(message, 'SC_ASSET_CREATE_ERROR', 500);
  }
}

export class ScAssetUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'asset') {
    super(message, 'SC_ASSET_UPDATE_ERROR', 500);
  }
}

export class ScAssetDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'asset') {
    super(message, 'SC_ASSET_DELETE_ERROR', 500);
  }
}

export class ScEquipmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Équipement (${identifier}) introuvable` : 'Équipement introuvable';
    super(msg, 'SC_EQUIPMENT_NOT_FOUND', 404);
  }
}

export class ScEquipmentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'équipement') {
    super(message, 'SC_EQUIPMENT_CREATE_ERROR', 500);
  }
}

export class ScFurnitureNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Mobilier (${identifier}) introuvable` : 'Mobilier introuvable';
    super(msg, 'SC_FURNITURE_NOT_FOUND', 404);
  }
}

export class ScFurnitureCreateError extends AppError {
  constructor(message = 'Impossible de créer le mobilier') {
    super(message, 'SC_FURNITURE_CREATE_ERROR', 500);
  }
}

export class ScITAssetNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Asset IT (${identifier}) introuvable` : 'Asset IT introuvable';
    super(msg, 'SC_IT_ASSET_NOT_FOUND', 404);
  }
}

export class ScITAssetCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'asset IT') {
    super(message, 'SC_IT_ASSET_CREATE_ERROR', 500);
  }
}

export class ScPrinterNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Imprimante (${identifier}) introuvable` : 'Imprimante introuvable';
    super(msg, 'SC_PRINTER_NOT_FOUND', 404);
  }
}

export class ScPrinterCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'imprimante') {
    super(message, 'SC_PRINTER_CREATE_ERROR', 500);
  }
}

export class ScLaptopNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Ordinateur portable (${identifier}) introuvable` : 'Ordinateur portable introuvable';
    super(msg, 'SC_LAPTOP_NOT_FOUND', 404);
  }
}

export class ScLaptopCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'ordinateur portable') {
    super(message, 'SC_LAPTOP_CREATE_ERROR', 500);
  }
}

export class ScProjectorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Projecteur (${identifier}) introuvable` : 'Projecteur introuvable';
    super(msg, 'SC_PROJECTOR_NOT_FOUND', 404);
  }
}

export class ScProjectorCreateError extends AppError {
  constructor(message = 'Impossible de créer le projecteur') {
    super(message, 'SC_PROJECTOR_CREATE_ERROR', 500);
  }
}

export class ScLabEquipmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Équipement de laboratoire (${identifier}) introuvable` : 'Équipement de laboratoire introuvable';
    super(msg, 'SC_LAB_EQUIPMENT_NOT_FOUND', 404);
  }
}

export class ScLabEquipmentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'équipement de laboratoire') {
    super(message, 'SC_LAB_EQUIPMENT_CREATE_ERROR', 500);
  }
}

export class ScWarrantyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Garantie (${identifier}) introuvable` : 'Garantie introuvable';
    super(msg, 'SC_WARRANTY_NOT_FOUND', 404);
  }
}

export class ScWarrantyCreateError extends AppError {
  constructor(message = 'Impossible de créer la garantie') {
    super(message, 'SC_WARRANTY_CREATE_ERROR', 500);
  }
}

export class ScDepreciationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Dépréciation (${identifier}) introuvable` : 'Dépréciation introuvable';
    super(msg, 'SC_DEPRECIATION_NOT_FOUND', 404);
  }
}

export class ScDepreciationCreateError extends AppError {
  constructor(message = 'Impossible de créer la dépréciation') {
    super(message, 'SC_DEPRECIATION_CREATE_ERROR', 500);
  }
}

export class ScAssetTransferNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Transfert d'asset (${identifier}) introuvable` : 'Transfert d\'asset introuvable';
    super(msg, 'SC_ASSET_TRANSFER_NOT_FOUND', 404);
  }
}

export class ScAssetTransferCreateError extends AppError {
  constructor(message = 'Impossible de créer le transfert d\'asset') {
    super(message, 'SC_ASSET_TRANSFER_CREATE_ERROR', 500);
  }
}

export class ScAssetAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit d'asset (${identifier}) introuvable` : 'Audit d\'asset introuvable';
    super(msg, 'SC_ASSET_AUDIT_NOT_FOUND', 404);
  }
}

// ─── Module 8: Maintenance (25 errors) ───────────────────────────────────────

export class ScMaintenanceTicketNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Ticket de maintenance (${identifier}) introuvable` : 'Ticket de maintenance introuvable';
    super(msg, 'SC_MAINTENANCE_TICKET_NOT_FOUND', 404);
  }
}

export class ScMaintenanceTicketCreateError extends AppError {
  constructor(message = 'Impossible de créer le ticket de maintenance') {
    super(message, 'SC_MAINTENANCE_TICKET_CREATE_ERROR', 500);
  }
}

export class ScMaintenanceTicketUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le ticket de maintenance') {
    super(message, 'SC_MAINTENANCE_TICKET_UPDATE_ERROR', 500);
  }
}

export class ScMaintenanceTicketDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le ticket de maintenance') {
    super(message, 'SC_MAINTENANCE_TICKET_DELETE_ERROR', 500);
  }
}

export class ScPreventiveMaintenanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Maintenance préventive (${identifier}) introuvable` : 'Maintenance préventive introuvable';
    super(msg, 'SC_PREVENTIVE_MAINTENANCE_NOT_FOUND', 404);
  }
}

export class ScPreventiveMaintenanceCreateError extends AppError {
  constructor(message = 'Impossible de créer la maintenance préventive') {
    super(message, 'SC_PREVENTIVE_MAINTENANCE_CREATE_ERROR', 500);
  }
}

export class ScCorrectiveMaintenanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Maintenance corrective (${identifier}) introuvable` : 'Maintenance corrective introuvable';
    super(msg, 'SC_CORRECTIVE_MAINTENANCE_NOT_FOUND', 404);
  }
}

export class ScCorrectiveMaintenanceCreateError extends AppError {
  constructor(message = 'Impossible de créer la maintenance corrective') {
    super(message, 'SC_CORRECTIVE_MAINTENANCE_CREATE_ERROR', 500);
  }
}

export class ScTechnicianNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Technicien (${identifier}) introuvable` : 'Technicien introuvable';
    super(msg, 'SC_TECHNICIAN_NOT_FOUND', 404);
  }
}

export class ScTechnicianCreateError extends AppError {
  constructor(message = 'Impossible de créer le technicien') {
    super(message, 'SC_TECHNICIAN_CREATE_ERROR', 500);
  }
}

export class ScWorkOrderNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Ordre de travail (${identifier}) introuvable` : 'Ordre de travail introuvable';
    super(msg, 'SC_WORK_ORDER_NOT_FOUND', 404);
  }
}

export class ScWorkOrderCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'ordre de travail') {
    super(message, 'SC_WORK_ORDER_CREATE_ERROR', 500);
  }
}

export class ScMaintenanceContractNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Contrat de maintenance (${identifier}) introuvable` : 'Contrat de maintenance introuvable';
    super(msg, 'SC_MAINTENANCE_CONTRACT_NOT_FOUND', 404);
  }
}

export class ScMaintenanceContractCreateError extends AppError {
  constructor(message = 'Impossible de créer le contrat de maintenance') {
    super(message, 'SC_MAINTENANCE_CONTRACT_CREATE_ERROR', 500);
  }
}

export class ScSparePartNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Pièce de rechange (${identifier}) introuvable` : 'Pièce de rechange introuvable';
    super(msg, 'SC_SPARE_PART_NOT_FOUND', 404);
  }
}

export class ScSparePartCreateError extends AppError {
  constructor(message = 'Impossible de créer la pièce de rechange') {
    super(message, 'SC_SPARE_PART_CREATE_ERROR', 500);
  }
}

export class ScMaintenanceCalendarNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Calendrier de maintenance (${identifier}) introuvable` : 'Calendrier de maintenance introuvable';
    super(msg, 'SC_MAINTENANCE_CALENDAR_NOT_FOUND', 404);
  }
}

export class ScMaintenanceCalendarCreateError extends AppError {
  constructor(message = 'Impossible de créer le calendrier de maintenance') {
    super(message, 'SC_MAINTENANCE_CALENDAR_CREATE_ERROR', 500);
  }
}

export class ScMaintenanceSLANotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `SLA de maintenance (${identifier}) introuvable` : 'SLA de maintenance introuvable';
    super(msg, 'SC_MAINTENANCE_SLA_NOT_FOUND', 404);
  }
}

export class ScMaintenanceCostNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Coût de maintenance (${identifier}) introuvable` : 'Coût de maintenance introuvable';
    super(msg, 'SC_MAINTENANCE_COST_NOT_FOUND', 404);
  }
}

export class ScQualityCheckNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Contrôle qualité (${identifier}) introuvable` : 'Contrôle qualité introuvable';
    super(msg, 'SC_QUALITY_CHECK_NOT_FOUND', 404);
  }
}

export class ScQualityCheckCreateError extends AppError {
  constructor(message = 'Impossible de créer le contrôle qualité') {
    super(message, 'SC_QUALITY_CHECK_CREATE_ERROR', 500);
  }
}

export class ScMaintenanceScheduleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Planification de maintenance (${identifier}) introuvable` : 'Planification de maintenance introuvable';
    super(msg, 'SC_MAINTENANCE_SCHEDULE_NOT_FOUND', 404);
  }
}

export class ScMaintenanceHistoryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Historique de maintenance (${identifier}) introuvable` : 'Historique de maintenance introuvable';
    super(msg, 'SC_MAINTENANCE_HISTORY_NOT_FOUND', 404);
  }
}

export class ScEscalationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Escalade (${identifier}) introuvable` : 'Escalade introuvable';
    super(msg, 'SC_ESCALATION_NOT_FOUND', 404);
  }
}

// ─── Module 9: IoT (30 errors) ───────────────────────────────────────────────

export class ScIoTDeviceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Appareil IoT (${identifier}) introuvable` : 'Appareil IoT introuvable';
    super(msg, 'SC_IOT_DEVICE_NOT_FOUND', 404);
  }
}

export class ScIoTDeviceCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'appareil IoT') {
    super(message, 'SC_IOT_DEVICE_CREATE_ERROR', 500);
  }
}

export class ScIoTDeviceUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour l\'appareil IoT') {
    super(message, 'SC_IOT_DEVICE_UPDATE_ERROR', 500);
  }
}

export class ScIoTDeviceDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer l\'appareil IoT') {
    super(message, 'SC_IOT_DEVICE_DELETE_ERROR', 500);
  }
}

export class ScSensorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Capteur (${identifier}) introuvable` : 'Capteur introuvable';
    super(msg, 'SC_SENSOR_NOT_FOUND', 404);
  }
}

export class ScSensorCreateError extends AppError {
  constructor(message = 'Impossible de créer le capteur') {
    super(message, 'SC_SENSOR_CREATE_ERROR', 500);
  }
}

export class ScSensorDataNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Données du capteur (${identifier}) introuvables` : 'Données du capteur introuvables';
    super(msg, 'SC_SENSOR_DATA_NOT_FOUND', 404);
  }
}

export class ScSensorDataCreateError extends AppError {
  constructor(message = 'Impossible de créer les données du capteur') {
    super(message, 'SC_SENSOR_DATA_CREATE_ERROR', 500);
  }
}

export class ScEnergyMonitorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Moniteur d'énergie (${identifier}) introuvable` : 'Moniteur d\'énergie introuvable';
    super(msg, 'SC_ENERGY_MONITOR_NOT_FOUND', 404);
  }
}

export class ScEnergyMonitorCreateError extends AppError {
  constructor(message = 'Impossible de créer le moniteur d\'énergie') {
    super(message, 'SC_ENERGY_MONITOR_CREATE_ERROR', 500);
  }
}

export class ScWaterMonitorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Moniteur d'eau (${identifier}) introuvable` : 'Moniteur d\'eau introuvable';
    super(msg, 'SC_WATER_MONITOR_NOT_FOUND', 404);
  }
}

export class ScWaterMonitorCreateError extends AppError {
  constructor(message = 'Impossible de créer le moniteur d\'eau') {
    super(message, 'SC_WATER_MONITOR_CREATE_ERROR', 500);
  }
}

export class ScDoorAccessNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Accès porte (${identifier}) introuvable` : 'Accès porte introuvable';
    super(msg, 'SC_DOOR_ACCESS_NOT_FOUND', 404);
  }
}

export class ScDoorAccessCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'accès porte') {
    super(message, 'SC_DOOR_ACCESS_CREATE_ERROR', 500);
  }
}

export class ScSmartLockNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Serrure connectée (${identifier}) introuvable` : 'Serrure connectée introuvable';
    super(msg, 'SC_SMART_LOCK_NOT_FOUND', 404);
  }
}

export class ScSmartLockCreateError extends AppError {
  constructor(message = 'Impossible de créer la serrure connectée') {
    super(message, 'SC_SMART_LOCK_CREATE_ERROR', 500);
  }
}

export class ScSmartCameraNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Caméra connectée (${identifier}) introuvable` : 'Caméra connectée introuvable';
    super(msg, 'SC_SMART_CAMERA_NOT_FOUND', 404);
  }
}

export class ScSmartCameraCreateError extends AppError {
  constructor(message = 'Impossible de créer la caméra connectée') {
    super(message, 'SC_SMART_CAMERA_CREATE_ERROR', 500);
  }
}

export class ScEnvironmentMonitorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Moniteur d'environnement (${identifier}) introuvable` : 'Moniteur d\'environnement introuvable';
    super(msg, 'SC_ENVIRONMENT_MONITOR_NOT_FOUND', 404);
  }
}

export class ScEnvironmentMonitorCreateError extends AppError {
  constructor(message = 'Impossible de créer le moniteur d\'environnement') {
    super(message, 'SC_ENVIRONMENT_MONITOR_CREATE_ERROR', 500);
  }
}

export class ScIoTAlertNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Alerte IoT (${identifier}) introuvable` : 'Alerte IoT introuvable';
    super(msg, 'SC_IOT_ALERT_NOT_FOUND', 404);
  }
}

export class ScIoTAlertCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'alerte IoT') {
    super(message, 'SC_IOT_ALERT_CREATE_ERROR', 500);
  }
}

export class ScAutomationRuleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Règle d'automatisation (${identifier}) introuvable` : 'Règle d\'automatisation introuvable';
    super(msg, 'SC_AUTOMATION_RULE_NOT_FOUND', 404);
  }
}

export class ScAutomationRuleCreateError extends AppError {
  constructor(message = 'Impossible de créer la règle d\'automatisation') {
    super(message, 'SC_AUTOMATION_RULE_CREATE_ERROR', 500);
  }
}

export class ScDeviceCalibrationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Calibration d'appareil (${identifier}) introuvable` : 'Calibration d\'appareil introuvable';
    super(msg, 'SC_DEVICE_CALIBRATION_NOT_FOUND', 404);
  }
}

export class ScDeviceFirmwareNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Firmware d'appareil (${identifier}) introuvable` : 'Firmware d\'appareil introuvable';
    super(msg, 'SC_DEVICE_FIRMWARE_NOT_FOUND', 404);
  }
}

export class ScNetworkConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration réseau (${identifier}) introuvable` : 'Configuration réseau introuvable';
    super(msg, 'SC_NETWORK_CONFIG_NOT_FOUND', 404);
  }
}

export class ScDataAggregationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Agrégation de données (${identifier}) introuvable` : 'Agrégation de données introuvable';
    super(msg, 'SC_DATA_AGGREGATION_NOT_FOUND', 404);
  }
}

export class ScIoTDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord IoT (${identifier}) introuvable` : 'Tableau de bord IoT introuvable';
    super(msg, 'SC_IOT_DASHBOARD_NOT_FOUND', 404);
  }
}

export class ScIoTConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration IoT (${identifier}) introuvable` : 'Configuration IoT introuvable';
    super(msg, 'SC_IOT_CONFIG_NOT_FOUND', 404);
  }
}

// ─── Module 10: Rooms (25 errors) ────────────────────────────────────────────

export class ScSmartRoomNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Salle intelligente (${identifier}) introuvable` : 'Salle intelligente introuvable';
    super(msg, 'SC_SMART_ROOM_NOT_FOUND', 404);
  }
}

export class ScSmartRoomCreateError extends AppError {
  constructor(message = 'Impossible de créer la salle intelligente') {
    super(message, 'SC_SMART_ROOM_CREATE_ERROR', 500);
  }
}

export class ScSmartRoomUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la salle intelligente') {
    super(message, 'SC_SMART_ROOM_UPDATE_ERROR', 500);
  }
}

export class ScSmartRoomDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la salle intelligente') {
    super(message, 'SC_SMART_ROOM_DELETE_ERROR', 500);
  }
}

export class ScRoomCapacityNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Capacité de salle (${identifier}) introuvable` : 'Capacité de salle introuvable';
    super(msg, 'SC_ROOM_CAPACITY_NOT_FOUND', 404);
  }
}

export class ScRoomCapacityCreateError extends AppError {
  constructor(message = 'Impossible de créer la capacité de salle') {
    super(message, 'SC_ROOM_CAPACITY_CREATE_ERROR', 500);
  }
}

export class ScRoomReservationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réservation de salle (${identifier}) introuvable` : 'Réservation de salle introuvable';
    super(msg, 'SC_ROOM_RESERVATION_NOT_FOUND', 404);
  }
}

export class ScRoomReservationCreateError extends AppError {
  constructor(message = 'Impossible de créer la réservation de salle') {
    super(message, 'SC_ROOM_RESERVATION_CREATE_ERROR', 500);
  }
}

export class ScRoomAvailabilityNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Disponibilité de salle (${identifier}) introuvable` : 'Disponibilité de salle introuvable';
    super(msg, 'SC_ROOM_AVAILABILITY_NOT_FOUND', 404);
  }
}

export class ScRoomAvailabilityCreateError extends AppError {
  constructor(message = 'Impossible de créer la disponibilité de salle') {
    super(message, 'SC_ROOM_AVAILABILITY_CREATE_ERROR', 500);
  }
}

export class ScRoomEquipmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Équipement de salle (${identifier}) introuvable` : 'Équipement de salle introuvable';
    super(msg, 'SC_ROOM_EQUIPMENT_NOT_FOUND', 404);
  }
}

export class ScRoomEquipmentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'équipement de salle') {
    super(message, 'SC_ROOM_EQUIPMENT_CREATE_ERROR', 500);
  }
}

export class ScRoomSchedulingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Planification de salle (${identifier}) introuvable` : 'Planification de salle introuvable';
    super(msg, 'SC_ROOM_SCHEDULING_NOT_FOUND', 404);
  }
}

export class ScRoomSchedulingCreateError extends AppError {
  constructor(message = 'Impossible de créer la planification de salle') {
    super(message, 'SC_ROOM_SCHEDULING_CREATE_ERROR', 500);
  }
}

export class ScRoomOccupancyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Occupation de salle (${identifier}) introuvable` : 'Occupation de salle introuvable';
    super(msg, 'SC_ROOM_OCCUPANCY_NOT_FOUND', 404);
  }
}

export class ScRoomOccupancyCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'occupation de salle') {
    super(message, 'SC_ROOM_OCCUPANCY_CREATE_ERROR', 500);
  }
}

export class ScRoomUsageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Utilisation de salle (${identifier}) introuvable` : 'Utilisation de salle introuvable';
    super(msg, 'SC_ROOM_USAGE_NOT_FOUND', 404);
  }
}

export class ScRoomBookingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réservation de salle (${identifier}) introuvable` : 'Réservation de salle introuvable';
    super(msg, 'SC_ROOM_BOOKING_NOT_FOUND', 404);
  }
}

export class ScRoomMaintenanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Maintenance de salle (${identifier}) introuvable` : 'Maintenance de salle introuvable';
    super(msg, 'SC_ROOM_MAINTENANCE_NOT_FOUND', 404);
  }
}

export class ScRoomFeatureNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Fonctionnalité de salle (${identifier}) introuvable` : 'Fonctionnalité de salle introuvable';
    super(msg, 'SC_ROOM_FEATURE_NOT_FOUND', 404);
  }
}

export class ScRoomLayoutNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Disposition de salle (${identifier}) introuvable` : 'Disposition de salle introuvable';
    super(msg, 'SC_ROOM_LAYOUT_NOT_FOUND', 404);
  }
}

export class ScRoomDisplayNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Affichage de salle (${identifier}) introuvable` : 'Affichage de salle introuvable';
    super(msg, 'SC_ROOM_DISPLAY_NOT_FOUND', 404);
  }
}

export class ScRoomSensorNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Capteur de salle (${identifier}) introuvable` : 'Capteur de salle introuvable';
    super(msg, 'SC_ROOM_SENSOR_NOT_FOUND', 404);
  }
}

export class ScRoomEnvironmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Environnement de salle (${identifier}) introuvable` : 'Environnement de salle introuvable';
    super(msg, 'SC_ROOM_ENVIRONMENT_NOT_FOUND', 404);
  }
}

export class ScRoomConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration de salle (${identifier}) introuvable` : 'Configuration de salle introuvable';
    super(msg, 'SC_ROOM_CONFIG_NOT_FOUND', 404);
  }
}

// ─── Module 11: Security (25 errors) ─────────────────────────────────────────

export class ScEmergencyPlanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Plan d'urgence (${identifier}) introuvable` : 'Plan d\'urgence introuvable';
    super(msg, 'SC_EMERGENCY_PLAN_NOT_FOUND', 404);
  }
}

export class ScEmergencyPlanCreateError extends AppError {
  constructor(message = 'Impossible de créer le plan d\'urgence') {
    super(message, 'SC_EMERGENCY_PLAN_CREATE_ERROR', 500);
  }
}

export class ScEmergencyPlanUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour le plan d\'urgence') {
    super(message, 'SC_EMERGENCY_PLAN_UPDATE_ERROR', 500);
  }
}

export class ScEmergencyPlanDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer le plan d\'urgence') {
    super(message, 'SC_EMERGENCY_PLAN_DELETE_ERROR', 500);
  }
}

export class ScEvacuationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Évacuation (${identifier}) introuvable` : 'Évacuation introuvable';
    super(msg, 'SC_EVACUATION_NOT_FOUND', 404);
  }
}

export class ScEvacuationCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'évacuation') {
    super(message, 'SC_EVACUATION_CREATE_ERROR', 500);
  }
}

export class ScFireIncidentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Incendie (${identifier}) introuvable` : 'Incendie introuvable';
    super(msg, 'SC_FIRE_INCIDENT_NOT_FOUND', 404);
  }
}

export class ScFireIncidentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'incident incendie') {
    super(message, 'SC_FIRE_INCIDENT_CREATE_ERROR', 500);
  }
}

export class ScSecurityIncidentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Incident de sécurité (${identifier}) introuvable` : 'Incident de sécurité introuvable';
    super(msg, 'SC_SECURITY_INCIDENT_NOT_FOUND', 404);
  }
}

export class ScSecurityIncidentCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'incident de sécurité') {
    super(message, 'SC_SECURITY_INCIDENT_CREATE_ERROR', 500);
  }
}

export class ScGuardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Gardien (${identifier}) introuvable` : 'Gardien introuvable';
    super(msg, 'SC_GUARD_NOT_FOUND', 404);
  }
}

export class ScGuardCreateError extends AppError {
  constructor(message = 'Impossible de créer le gardien') {
    super(message, 'SC_GUARD_CREATE_ERROR', 500);
  }
}

export class ScCCTVNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `CCTV (${identifier}) introuvable` : 'CCTV introuvable';
    super(msg, 'SC_CCTV_NOT_FOUND', 404);
  }
}

export class ScCCTVCreateError extends AppError {
  constructor(message = 'Impossible de créer la caméra CCTV') {
    super(message, 'SC_CCTV_CREATE_ERROR', 500);
  }
}

export class ScEmergencyNotificationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Notification d'urgence (${identifier}) introuvable` : 'Notification d\'urgence introuvable';
    super(msg, 'SC_EMERGENCY_NOTIFICATION_NOT_FOUND', 404);
  }
}

export class ScEmergencyNotificationCreateError extends AppError {
  constructor(message = 'Impossible de créer la notification d\'urgence') {
    super(message, 'SC_EMERGENCY_NOTIFICATION_CREATE_ERROR', 500);
  }
}

export class ScCrisisManagementNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Gestion de crise (${identifier}) introuvable` : 'Gestion de crise introuvable';
    super(msg, 'SC_CRISIS_MANAGEMENT_NOT_FOUND', 404);
  }
}

export class ScCrisisManagementCreateError extends AppError {
  constructor(message = 'Impossible de créer la gestion de crise') {
    super(message, 'SC_CRISIS_MANAGEMENT_CREATE_ERROR', 500);
  }
}

export class ScSafetyDrillNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Exercice de sécurité (${identifier}) introuvable` : 'Exercice de sécurité introuvable';
    super(msg, 'SC_SAFETY_DRILL_NOT_FOUND', 404);
  }
}

export class ScSafetyDrillCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'exercice de sécurité') {
    super(message, 'SC_SAFETY_DRILL_CREATE_ERROR', 500);
  }
}

export class ScAccessLogNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Journal d'accès (${identifier}) introuvable` : 'Journal d\'accès introuvable';
    super(msg, 'SC_ACCESS_LOG_NOT_FOUND', 404);
  }
}

export class ScSafetyEquipmentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Équipement de sécurité (${identifier}) introuvable` : 'Équipement de sécurité introuvable';
    super(msg, 'SC_SAFETY_EQUIPMENT_NOT_FOUND', 404);
  }
}

export class ScSafetyInspectionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Inspection de sécurité (${identifier}) introuvable` : 'Inspection de sécurité introuvable';
    super(msg, 'SC_SAFETY_INSPECTION_NOT_FOUND', 404);
  }
}

export class ScEmergencyProtocolNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Protocole d'urgence (${identifier}) introuvable` : 'Protocole d\'urgence introuvable';
    super(msg, 'SC_EMERGENCY_PROTOCOL_NOT_FOUND', 404);
  }
}

export class ScSafetyRatingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Évaluation de sécurité (${identifier}) introuvable` : 'Évaluation de sécurité introuvable';
    super(msg, 'SC_SAFETY_RATING_NOT_FOUND', 404);
  }
}

// ─── Module 12: Environment (25 errors) ──────────────────────────────────────

export class ScWasteManagementNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Gestion des déchets (${identifier}) introuvable` : 'Gestion des déchets introuvable';
    super(msg, 'SC_WASTE_MANAGEMENT_NOT_FOUND', 404);
  }
}

export class ScWasteManagementCreateError extends AppError {
  constructor(message = 'Impossible de créer la gestion des déchets') {
    super(message, 'SC_WASTE_MANAGEMENT_CREATE_ERROR', 500);
  }
}

export class ScWasteManagementUpdateError extends AppError {
  constructor(message = 'Impossible de mettre à jour la gestion des déchets') {
    super(message, 'SC_WASTE_MANAGEMENT_UPDATE_ERROR', 500);
  }
}

export class ScWasteManagementDeleteError extends AppError {
  constructor(message = 'Impossible de supprimer la gestion des déchets') {
    super(message, 'SC_WASTE_MANAGEMENT_DELETE_ERROR', 500);
  }
}

export class ScCarbonFootprintNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Empreinte carbone (${identifier}) introuvable` : 'Empreinte carbone introuvable';
    super(msg, 'SC_CARBON_FOOTPRINT_NOT_FOUND', 404);
  }
}

export class ScCarbonFootprintCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'empreinte carbone') {
    super(message, 'SC_CARBON_FOOTPRINT_CREATE_ERROR', 500);
  }
}

export class ScSolarProductionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Production solaire (${identifier}) introuvable` : 'Production solaire introuvable';
    super(msg, 'SC_SOLAR_PRODUCTION_NOT_FOUND', 404);
  }
}

export class ScSolarProductionCreateError extends AppError {
  constructor(message = 'Impossible de créer la production solaire') {
    super(message, 'SC_SOLAR_PRODUCTION_CREATE_ERROR', 500);
  }
}

export class ScEnergySavingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Économie d'énergie (${identifier}) introuvable` : 'Économie d\'énergie introuvable';
    super(msg, 'SC_ENERGY_SAVING_NOT_FOUND', 404);
  }
}

export class ScEnergySavingCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'économie d\'énergie') {
    super(message, 'SC_ENERGY_SAVING_CREATE_ERROR', 500);
  }
}

export class ScWaterUsageNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Consommation d'eau (${identifier}) introuvable` : 'Consommation d\'eau introuvable';
    super(msg, 'SC_WATER_USAGE_NOT_FOUND', 404);
  }
}

export class ScWaterUsageCreateError extends AppError {
  constructor(message = 'Impossible de créer la consommation d\'eau') {
    super(message, 'SC_WATER_USAGE_CREATE_ERROR', 500);
  }
}

export class ScEnvironmentalReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport environnemental (${identifier}) introuvable` : 'Rapport environnemental introuvable';
    super(msg, 'SC_ENVIRONMENTAL_REPORT_NOT_FOUND', 404);
  }
}

export class ScEnvironmentalReportCreateError extends AppError {
  constructor(message = 'Impossible de créer le rapport environnemental') {
    super(message, 'SC_ENVIRONMENTAL_REPORT_CREATE_ERROR', 500);
  }
}

export class ScEnvironmentalGoalNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Objectif environnemental (${identifier}) introuvable` : 'Objectif environnemental introuvable';
    super(msg, 'SC_ENVIRONMENTAL_GOAL_NOT_FOUND', 404);
  }
}

export class ScEnvironmentalGoalCreateError extends AppError {
  constructor(message = 'Impossible de créer l\'objectif environnemental') {
    super(message, 'SC_ENVIRONMENTAL_GOAL_CREATE_ERROR', 500);
  }
}

export class ScEnvironmentalComplianceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Conformité environnementale (${identifier}) introuvable` : 'Conformité environnementale introuvable';
    super(msg, 'SC_ENVIRONMENTAL_COMPLIANCE_NOT_FOUND', 404);
  }
}

export class ScEnvironmentalComplianceCreateError extends AppError {
  constructor(message = 'Impossible de créer la conformité environnementale') {
    super(message, 'SC_ENVIRONMENTAL_COMPLIANCE_CREATE_ERROR', 500);
  }
}

export class ScWasteScheduleNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Planification des déchets (${identifier}) introuvable` : 'Planification des déchets introuvable';
    super(msg, 'SC_WASTE_SCHEDULE_NOT_FOUND', 404);
  }
}

export class ScEnergyAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit énergétique (${identifier}) introuvable` : 'Audit énergétique introuvable';
    super(msg, 'SC_ENERGY_AUDIT_NOT_FOUND', 404);
  }
}

export class ScWaterAuditNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Audit hydrique (${identifier}) introuvable` : 'Audit hydrique introuvable';
    super(msg, 'SC_WATER_AUDIT_NOT_FOUND', 404);
  }
}

export class ScCarbonOffsetNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Compensation carbone (${identifier}) introuvable` : 'Compensation carbone introuvable';
    super(msg, 'SC_CARBON_OFFSET_NOT_FOUND', 404);
  }
}

export class ScGreenInitiativeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Initiative verte (${identifier}) introuvable` : 'Initiative verte introuvable';
    super(msg, 'SC_GREEN_INITIATIVE_NOT_FOUND', 404);
  }
}

export class ScEnvironmentalDashboardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tableau de bord environnemental (${identifier}) introuvable` : 'Tableau de bord environnemental introuvable';
    super(msg, 'SC_ENVIRONMENTAL_DASHBOARD_NOT_FOUND', 404);
  }
}

export class ScEnvironmentalConfigNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Configuration environnementale (${identifier}) introuvable` : 'Configuration environnementale introuvable';
    super(msg, 'SC_ENVIRONMENTAL_CONFIG_NOT_FOUND', 404);
  }
}

// ─── Generic Errors (10) ─────────────────────────────────────────────────────

export class ScValidationError extends AppError {
  constructor(message = 'Erreur de validation Smart Campus') {
    super(message, 'SC_VALIDATION_ERROR', 400);
  }
}

export class ScAuthenticationError extends AppError {
  constructor(message = 'Authentification Smart Campus échouée') {
    super(message, 'SC_AUTHENTICATION_ERROR', 401);
  }
}

export class ScAuthorizationError extends AppError {
  constructor(message = 'Autorisation Smart Campus refusée') {
    super(message, 'SC_AUTHORIZATION_ERROR', 403);
  }
}

export class ScNotFoundError extends AppError {
  constructor(message = 'Ressource Smart Campus introuvable') {
    super(message, 'SC_NOT_FOUND', 404);
  }
}

export class ScConflictError extends AppError {
  constructor(message = 'Conflit Smart Campus détecté') {
    super(message, 'SC_CONFLICT_ERROR', 409);
  }
}

export class ScRateLimitError extends AppError {
  constructor(message = 'Limite de débit Smart Campus dépassée') {
    super(message, 'SC_RATE_LIMIT_ERROR', 429);
  }
}

export class ScTimeoutError extends AppError {
  constructor(message = 'Délai d\'attente Smart Campus dépassé') {
    super(message, 'SC_TIMEOUT_ERROR', 408);
  }
}

export class ScExternalServiceError extends AppError {
  constructor(message = 'Erreur du service externe Smart Campus') {
    super(message, 'SC_EXTERNAL_SERVICE_ERROR', 502);
  }
}

export class ScDataIntegrityError extends AppError {
  constructor(message = 'Erreur d\'intégrité des données Smart Campus') {
    super(message, 'SC_DATA_INTEGRITY_ERROR', 500);
  }
}

export class ScConfigurationError extends AppError {
  constructor(message = 'Erreur de configuration Smart Campus') {
    super(message, 'SC_CONFIGURATION_ERROR', 500);
  }
}

// ─── Alias classes for repository/service naming conventions ─────────────────

export class ScBusStopNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Arrêt de bus (${identifier}) introuvable` : 'Arrêt de bus introuvable';
    super(msg, 'SC_BUS_STOP_NOT_FOUND', 404);
  }
}

export class ScGpsTrackingNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Suivi GPS (${identifier}) introuvable` : 'Suivi GPS introuvable';
    super(msg, 'SC_GPS_TRACKING_NOT_FOUND', 404);
  }
}

export class ScBusAttendanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Présence bus (${identifier}) introuvable` : 'Présence bus introuvable';
    super(msg, 'SC_BUS_ATTENDANCE_NOT_FOUND', 404);
  }
}

export class ScFuelRecordNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Enregistrement carburant (${identifier}) introuvable` : 'Enregistrement carburant introuvable';
    super(msg, 'SC_FUEL_RECORD_NOT_FOUND', 404);
  }
}

export class ScBusMaintenanceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Maintenance bus (${identifier}) introuvable` : 'Maintenance bus introuvable';
    super(msg, 'SC_BUS_MAINTENANCE_NOT_FOUND', 404);
  }
}

export class ScBusInsuranceNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Assurance bus (${identifier}) introuvable` : 'Assurance bus introuvable';
    super(msg, 'SC_BUS_INSURANCE_NOT_FOUND', 404);
  }
}

export class ScBusIncidentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Incident bus (${identifier}) introuvable` : 'Incident bus introuvable';
    super(msg, 'SC_BUS_INCIDENT_NOT_FOUND', 404);
  }
}

export class ScEmergencyAlertNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Alerte d'urgence (${identifier}) introuvable` : 'Alerte d\'urgence introuvable';
    super(msg, 'SC_EMERGENCY_ALERT_NOT_FOUND', 404);
  }
}

export class ScBookCategoryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Catégorie de livre (${identifier}) introuvable` : 'Catégorie de livre introuvable';
    super(msg, 'SC_BOOK_CATEGORY_NOT_FOUND', 404);
  }
}

export class ScBookCopyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Exemplaire de livre (${identifier}) introuvable` : 'Exemplaire de livre introuvable';
    super(msg, 'SC_BOOK_COPY_NOT_FOUND', 404);
  }
}

export class ScBookLoanNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Prêt de livre (${identifier}) introuvable` : 'Prêt de livre introuvable';
    super(msg, 'SC_BOOK_LOAN_NOT_FOUND', 404);
  }
}

export class ScBookReturnNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Retour de livre (${identifier}) introuvable` : 'Retour de livre introuvable';
    super(msg, 'SC_BOOK_RETURN_NOT_FOUND', 404);
  }
}

export class ScBookReservationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Réservation de livre (${identifier}) introuvable` : 'Réservation de livre introuvable';
    super(msg, 'SC_BOOK_RESERVATION_NOT_FOUND', 404);
  }
}

export class ScLateFeeNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Frais de retard (${identifier}) introuvable` : 'Frais de retard introuvable';
    super(msg, 'SC_LATE_FEE_NOT_FOUND', 404);
  }
}

export class ScRfidTagNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Tag RFID (${identifier}) introuvable` : 'Tag RFID introuvable';
    super(msg, 'SC_RFID_TAG_NOT_FOUND', 404);
  }
}

export class ScLibraryInventoryNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Inventaire bibliothèque (${identifier}) introuvable` : 'Inventaire bibliothèque introuvable';
    super(msg, 'SC_LIBRARY_INVENTORY_NOT_FOUND', 404);
  }
}

export class ScBookAcquisitionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Acquisition de livre (${identifier}) introuvable` : 'Acquisition de livre introuvable';
    super(msg, 'SC_BOOK_ACQUISITION_NOT_FOUND', 404);
  }
}

export class ScLibraryCardNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Carte de bibliothèque (${identifier}) introuvable` : 'Carte de bibliothèque introuvable';
    super(msg, 'SC_LIBRARY_CARD_NOT_FOUND', 404);
  }
}

export class ScFoodSupplierNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Fournisseur alimentaire (${identifier}) introuvable` : 'Fournisseur alimentaire introuvable';
    super(msg, 'SC_FOOD_SUPPLIER_NOT_FOUND', 404);
  }
}

export class ScMealOrderNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Commande de repas (${identifier}) introuvable` : 'Commande de repas introuvable';
    super(msg, 'SC_MEAL_ORDER_NOT_FOUND', 404);
  }
}

export class ScMealConsumptionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Consommation de repas (${identifier}) introuvable` : 'Consommation de repas introuvable';
    super(msg, 'SC_MEAL_CONSUMPTION_NOT_FOUND', 404);
  }
}

export class ScMealSubscriptionNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Abonnement repas (${identifier}) introuvable` : 'Abonnement repas introuvable';
    super(msg, 'SC_MEAL_SUBSCRIPTION_NOT_FOUND', 404);
  }
}

export class ScMealPaymentNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Paiement repas (${identifier}) introuvable` : 'Paiement repas introuvable';
    super(msg, 'SC_MEAL_PAYMENT_NOT_FOUND', 404);
  }
}

export class ScCantineReportNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Rapport cantine (${identifier}) introuvable` : 'Rapport cantine introuvable';
    super(msg, 'SC_CANTINE_REPORT_NOT_FOUND', 404);
  }
}

export class ScMedicalVisitNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Visite médicale (${identifier}) introuvable` : 'Visite médicale introuvable';
    super(msg, 'SC_MEDICAL_VISIT_NOT_FOUND', 404);
  }
}

export class ScAssetWarrantyNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Garantie asset (${identifier}) introuvable` : 'Garantie asset introuvable';
    super(msg, 'SC_ASSET_WARRANTY_NOT_FOUND', 404);
  }
}

export class ScAssetDepreciationNotFoundError extends AppError {
  constructor(identifier?: string) {
    const msg = identifier ? `Dépréciation asset (${identifier}) introuvable` : 'Dépréciation asset introuvable';
    super(msg, 'SC_ASSET_DEPRECIATION_NOT_FOUND', 404);
  }
}

export const ScEbookNotFoundError = ScEBookNotFoundError;
export const ScVisitorQrNotFoundError = ScVisitorQRNotFoundError;
export const ScVisitorQrCreateError = ScVisitorQRCreateError;
export const ScIotDeviceNotFoundError = ScIoTDeviceNotFoundError;
export const ScCctvNotFoundError = ScCCTVNotFoundError;
export const ScCctvCreateError = ScCCTVCreateError;
export const ScItAssetNotFoundError = ScITAssetNotFoundError;


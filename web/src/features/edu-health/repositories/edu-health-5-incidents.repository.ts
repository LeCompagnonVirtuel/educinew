import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-5: Incidents — Health Incidents, Emergency Response & First Aid
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHHealthIncident extends BaseEntity { student_id?: string; incident_date: string; incident_time: string; incident_type: 'injury'|'illness'|'allergic_reaction'|'medication_error'|'food_related'|'environmental'|'other'; severity: 'minor'|'moderate'|'severe'|'life_threatening'; location: string; description: string; immediate_actions: string[]; reported_by: string; reported_by_role: string; witnesses: string[]; parent_notified: boolean; parent_notified_at?: string; status: 'reported'|'in_progress'|'resolved'|'escalated'; }
export interface EHEmergencyResponse extends BaseEntity { incident_id: string; response_type: 'first_aid'|'cpr'|'epipen_administered'|'ambulance_called'|'evacuation'|'lockdown'|'other'; responder_id: string; response_time_seconds?: number; actions_taken: string[]; equipment_used: string[]; outcome: 'resolved'|'referred_to_hospital'|'ongoing'|'fatal'; hospital_name?: string; hospital_ref?: string; }
export interface EHFirstAidLog extends BaseEntity { student_id?: string; incident_id?: string; log_date: string; treatment_type: string; treatment_description: string; administered_by: string; supplies_used: string[]; follow_up_required: boolean; follow_up_action?: string; }
export interface EHIncidentReport extends BaseEntity { incident_id: string; report_date: string; report_type: 'initial'|'follow_up'|'final'; reported_by: string; narrative: string; root_cause?: string; contributing_factors: string[]; recommendations: string[]; attachments: Record<string,unknown>[]; status: 'draft'|'submitted'|'approved'|'archived'; approved_by?: string; approved_at?: string; }
export interface EHMedicalEmergency extends BaseEntity { student_id: string; emergency_date: string; emergency_type: 'anaphylaxis'|'asthma'|'seizure'|'diabetic'| 'cardiac'|'head_injury'|'fracture'|'other'; severity: 'moderate'|'severe'|'critical'; symptoms: string[]; vital_signs: Record<string,unknown>; treatment_given: string[]; ambulance_called: boolean; parent_contacted: boolean; hospital_admitted: boolean; status: 'active'|'stabilized'|'hospitalized'|'released'; }
export interface EHIncidentWitness extends BaseEntity { incident_id: string; witness_id: string; witness_role: 'student'|'staff'|'visitor'|'parent'; statement: string; statement_date: string; follow_up_needed: boolean; }
export interface EHIncidentCategory extends BaseEntity { category_name: string; category_code: string; description: string; severity_default: string; response_protocol: string; requires_escalation: boolean; active: boolean; }
export interface EHSchoolSafetyPlan extends BaseEntity { plan_name: string; plan_type: 'emergency'|'fire'| 'lockdown'|'evacuation'|'severe_weather'|'medical'; version: string; effective_date: string; review_date: string; procedures: Record<string,unknown>[]; contacts: Record<string,unknown>[]; assembly_points: string[]; drill_frequency: string; status: 'active'|'under_review'|'archived'; }
export interface EHEmergencyDrill extends BaseEntity { drill_type: 'fire'|'lockdown'|'evacuation'|'medical'|'severe_weather'; drill_date: string; drill_time: string; duration_minutes: number; participants_count: number; evacuation_time_seconds?: number; issues_identified: string[]; improvements_needed: string[]; conducted_by: string; status: 'completed'|'scheduled'|'cancelled'; }
export interface EHIncidentFollowUp extends BaseEntity { incident_id: string; follow_up_date: string; follow_up_type: 'medical'|'emotional'|'disciplinary'|'procedural'; description: string; responsible_person: string; completed: boolean; completed_date?: string; outcome?: string; }
export interface EHIncidentEquipmentLog extends BaseEntity { incident_id: string; equipment_type: string; equipment_id: string; used_date: string; condition_before: string; condition_after: string; restocked: boolean; restocked_date?: string; }
export interface EHIncidentNotification extends BaseEntity { incident_id: string; notification_type: 'parent'|'administration'|'medical'|'insurance'|'regulatory'; recipient: string; method: 'phone'|'email'|'sms'|'in_person'; sent_at: string; acknowledged: boolean; acknowledged_at?: string; }
export interface EHIncidentTrend extends BaseEntity { trend_period: string; category: string; incident_count: number; severity_breakdown: Record<string,number>; location_breakdown: Record<string,number>; trend: 'increasing'|'stable'|'decreasing'; }
export interface EHIncidentPolicy extends BaseEntity { policy_name: string; version: string; effective_date: string; content_hash: string; sections: Record<string,unknown>[]; approved_by: string; status: 'draft'|'active'|'under_review'|'archived'; }
export interface EHIncidentMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_5_TABLE_NAMES: Record<string, string> = {
  EHHealthIncident: 'eh_health_incidents',
  EHEmergencyResponse: 'eh_emergency_responses',
  EHFirstAidLog: 'eh_first_aid_logs',
  EHIncidentReport: 'eh_incident_reports',
  EHMedicalEmergency: 'eh_medical_emergencies',
  EHIncidentWitness: 'eh_incident_witnesses',
  EHIncidentCategory: 'eh_incident_categories',
  EHSchoolSafetyPlan: 'eh_school_safety_plans',
  EHEmergencyDrill: 'eh_emergency_drills',
  EHIncidentFollowUp: 'eh_incident_follow_ups',
  EHIncidentEquipmentLog: 'eh_incident_equipment_logs',
  EHIncidentNotification: 'eh_incident_notifications',
  EHIncidentTrend: 'eh_incident_trends',
  EHIncidentPolicy: 'eh_incident_policies',
  EHIncidentMetric: 'eh_incident_metrics',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_5_Repository {
  healthIncidents: CrudRepository<EHHealthIncident>;
  emergencyResponses: CrudRepository<EHEmergencyResponse>;
  firstAidLogs: CrudRepository<EHFirstAidLog>;
  incidentReports: CrudRepository<EHIncidentReport>;
  medicalEmergencies: CrudRepository<EHMedicalEmergency>;
  incidentWitnesses: CrudRepository<EHIncidentWitness>;
  incidentCategories: CrudRepository<EHIncidentCategory>;
  schoolSafetyPlans: CrudRepository<EHSchoolSafetyPlan>;
  emergencyDrills: CrudRepository<EHEmergencyDrill>;
  incidentFollowUps: CrudRepository<EHIncidentFollowUp>;
  incidentEquipmentLogs: CrudRepository<EHIncidentEquipmentLog>;
  incidentNotifications: CrudRepository<EHIncidentNotification>;
  incidentTrends: CrudRepository<EHIncidentTrend>;
  incidentPolicies: CrudRepository<EHIncidentPolicy>;
  incidentMetrics: CrudRepository<EHIncidentMetric>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_5_Repository(supabase: SupabaseClient): EDU_HEALTH_5_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    healthIncidents: crud<EHHealthIncident>(EDU_HEALTH_5_TABLE_NAMES.EHHealthIncident),
    emergencyResponses: crud<EHEmergencyResponse>(EDU_HEALTH_5_TABLE_NAMES.EHEmergencyResponse),
    firstAidLogs: crud<EHFirstAidLog>(EDU_HEALTH_5_TABLE_NAMES.EHFirstAidLog),
    incidentReports: crud<EHIncidentReport>(EDU_HEALTH_5_TABLE_NAMES.EHIncidentReport),
    medicalEmergencies: crud<EHMedicalEmergency>(EDU_HEALTH_5_TABLE_NAMES.EHMedicalEmergency),
    incidentWitnesses: crud<EHIncidentWitness>(EDU_HEALTH_5_TABLE_NAMES.EHIncidentWitness),
    incidentCategories: crud<EHIncidentCategory>(EDU_HEALTH_5_TABLE_NAMES.EHIncidentCategory),
    schoolSafetyPlans: crud<EHSchoolSafetyPlan>(EDU_HEALTH_5_TABLE_NAMES.EHSchoolSafetyPlan),
    emergencyDrills: crud<EHEmergencyDrill>(EDU_HEALTH_5_TABLE_NAMES.EHEmergencyDrill),
    incidentFollowUps: crud<EHIncidentFollowUp>(EDU_HEALTH_5_TABLE_NAMES.EHIncidentFollowUp),
    incidentEquipmentLogs: crud<EHIncidentEquipmentLog>(EDU_HEALTH_5_TABLE_NAMES.EHIncidentEquipmentLog),
    incidentNotifications: crud<EHIncidentNotification>(EDU_HEALTH_5_TABLE_NAMES.EHIncidentNotification),
    incidentTrends: crud<EHIncidentTrend>(EDU_HEALTH_5_TABLE_NAMES.EHIncidentTrend),
    incidentPolicies: crud<EHIncidentPolicy>(EDU_HEALTH_5_TABLE_NAMES.EHIncidentPolicy),
    incidentMetrics: crud<EHIncidentMetric>(EDU_HEALTH_5_TABLE_NAMES.EHIncidentMetric),
  };
}

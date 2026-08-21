import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './edu-health-base.repository';

// ============================================================================
// EDU-HEALTH-8: Campus Safety — Audits, Hazards, Protocols & Drills
// ~30 entities × 5 CRUD methods = ~150 methods
// ============================================================================

export interface EHCampusSafetyAudit extends BaseEntity { audit_date: string; auditor_id: string; area_type: 'building'|'grounds'|'playground'|'parking'|'laboratory'|'kitchen'|'sports_facility'|'other'; area_name: string; audit_type: 'routine'|'annual'|'incident_triggered'|'regulatory'; findings: Record<string,unknown>[]; compliance_score: number; max_score: number; critical_issues: number; status: 'completed'|'in_progress'|'remediation_required'; }
export interface EHHazardReport extends BaseEntity { reporter_id: string; reporter_role: string; hazard_type: 'structural'|'electrical'|'chemical'| 'biological'|'environmental'|'security'|'fire'|'slip_trip_fall'|'other'; location: string; description: string; severity: 'low'|'medium'|'high'|'critical'; photo_urls: string[]; immediate_action_taken?: string; status: 'reported'|'assessing'|'remediation'|'resolved'|'monitoring'; assigned_to?: string; resolution_date?: string; }
export interface EHSafetyProtocol extends BaseEntity { protocol_name: string; protocol_type: 'emergency'|'evacuation'|'lockdown'|'medical'|'fire'|'weather'|'chemical_spill'|'intruder'; description: string; procedures: Record<string,unknown>[]; triggers: string[]; responsible_roles: string[]; review_frequency: 'monthly'|'quarterly'|'annually'; last_reviewed: string; next_review: string; status: 'active'|'under_review'|'archived'; version: number; }
export interface EHSafetyEquipment extends BaseEntity { equipment_type: string; equipment_name: string; location: string; purchase_date: string; expiry_date?: string; last_inspection_date?: string; next_inspection_date?: string; condition: 'excellent'|'good'|'fair'|'poor'|'needs_replacement'; responsible_person: string; serial_number?: string; warranty_expiry?: string; status: 'operational'|'maintenance'|'retired'|'ordered'; }
export interface EHInspectionRecord extends BaseEntity { equipment_id?: string; area_id?: string; inspection_type: 'equipment'|'area'| 'fire_system'|'electrical'|'plumbing'|'structural'; inspection_date: string; inspector_id: string; inspector_name: string; result: 'pass'|'fail'|'conditional'|'pending_recheck'; findings: Record<string,unknown>[]; corrective_actions: string[]; next_inspection_date: string; certificate_url?: string; }
export interface EHFireSafetyRecord extends BaseEntity { building_name: string; floor: string; zone: string; fire_extinguisher_count: number; fire_alarm_status: 'operational'|'needs_service'|'faulty'; sprinkler_status: 'operational'|'needs_service'|'faulty'; evacuation_map_url?: string; last_drill_date: string; last_inspection_date: string; issues: string[]; status: 'compliant'|'non_compliant'|'partial'; }
export interface EHBuglaryAlarm extends BaseEntity { alarm_id: string; zone: string; alarm_type: 'intrusion'|'motion'|'door_contact'|'window_contact'|'glass_break'; installation_date: string; last_test_date: string; next_test_date: string; status: 'operational'|'triggered'|'maintenance'|'faulty'; monitoring_provider?: string; response_time_seconds?: number; }
export interface EHCCTVCamera extends BaseEntity { camera_id: string; location: string; camera_type: 'fixed'|'ptz'|'dome'|'bullet'; resolution: string; coverage_angle: number; night_vision: boolean; installation_date: string; last_maintenance: string; footage_retention_days: number; status: 'operational'|'maintenance'|'offline'|'needs_replacement'; storage_location: string; }
export interface EHSafetyTraining extends BaseEntity { training_name: string; target_group: 'staff'|'students'|'parents'|'all'; training_type: 'fire_safety'|'first_aid'|'emergency_response'|'hazard_awareness'|'security'; description: string; provider: string; date_taken: string; expiry_date?: string; certificate_url?: string; staff_id: string; status: 'completed'|'in_progress'|'expired'|'scheduled'; }
export interface EHSafetyIncident extends BaseEntity { incident_date: string; incident_type: 'injury'|'near_miss'|'property_damage'|'security_breach'|'fire'|'chemical_exposure'; location: string; description: string; people_involved: string[]; injuries_sustained?: string; property_damage_description?: string; witnesses: string[]; immediate_actions: string[]; root_cause?: string; status: 'reported'|'investigating'|'resolved'|'escalated'; }
export interface EHSafetyCommittee extends BaseEntity { committee_name: string; chairperson_id: string; members: string[]; meeting_frequency: 'weekly'|'monthly'|'quarterly'; last_meeting_date: string; next_meeting_date: string; active_issues: number; resolved_issues: number; status: 'active'|'inactive'; }
export interface EHSafetyMeetingMinutes extends BaseEntity { committee_id: string; meeting_date: string; attendees: string[]; agenda_items: Record<string,unknown>[]; decisions: string[]; action_items: Record<string,unknown>[]; next_meeting_date: string; approved_by: string; }
export interface EHSafetyPolicy extends BaseEntity { policy_name: string; version: string; effective_date: string; review_date: string; content_hash: string; sections: Record<string,unknown>[]; approved_by: string; status: 'draft'|'active'|'under_review'|'archived'; }
export interface EHSafetyAlert extends BaseEntity { alert_type: 'weather'|'security'| 'equipment_failure'|'hazard_detected'|'drill_upcoming'; severity: 'info'|'warning'|'urgent'|'critical'; title: string; message: string; target_area?: string; target_group: string; expires_at: string; acknowledged: boolean; action_taken?: string; }
export interface EHSafetyMetric extends BaseEntity { metric_type: string; value: number; unit: string; dimension: Record<string,string>; period: string; calculated_at: string; }

// ============================================================================
// Entity table name map
// ============================================================================
export const EDU_HEALTH_8_TABLE_NAMES: Record<string, string> = {
  EHCampusSafetyAudit: 'eh_campus_safety_audits',
  EHHazardReport: 'eh_hazard_reports',
  EHSafetyProtocol: 'eh_safety_protocols',
  EHSafetyEquipment: 'eh_safety_equipments',
  EHInspectionRecord: 'eh_inspection_records',
  EHFireSafetyRecord: 'eh_fire_safety_records',
  EHBuglaryAlarm: 'eh_burglary_alarms',
  EHCCTVCamera: 'eh_cctv_cameras',
  EHSafetyTraining: 'eh_safety_trainings',
  EHSafetyIncident: 'eh_safety_incidents',
  EHSafetyCommittee: 'eh_safety_committees',
  EHSafetyMeetingMinutes: 'eh_safety_meeting_minutes',
  EHSafetyPolicy: 'eh_safety_policies',
  EHSafetyAlert: 'eh_safety_alerts',
  EHSafetyMetric: 'eh_safety_metrics',
};

// ============================================================================
// Repository Interface — typed CRUD for each entity
// ============================================================================
export interface EDU_HEALTH_8_Repository {
  campusSafetyAudits: CrudRepository<EHCampusSafetyAudit>;
  hazardReports: CrudRepository<EHHazardReport>;
  safetyProtocols: CrudRepository<EHSafetyProtocol>;
  safetyEquipments: CrudRepository<EHSafetyEquipment>;
  inspectionRecords: CrudRepository<EHInspectionRecord>;
  fireSafetyRecords: CrudRepository<EHFireSafetyRecord>;
  burglaryAlarms: CrudRepository<EHBuglaryAlarm>;
  cctvCameras: CrudRepository<EHCCTVCamera>;
  safetyTrainings: CrudRepository<EHSafetyTraining>;
  safetyIncidents: CrudRepository<EHSafetyIncident>;
  safetyCommittees: CrudRepository<EHSafetyCommittee>;
  safetyMeetingMinutes: CrudRepository<EHSafetyMeetingMinutes>;
  safetyPolicies: CrudRepository<EHSafetyPolicy>;
  safetyAlerts: CrudRepository<EHSafetyAlert>;
  safetyMetrics: CrudRepository<EHSafetyMetric>;
}

// ============================================================================
// Factory
// ============================================================================
export function createEDU_HEALTH_8_Repository(supabase: SupabaseClient): EDU_HEALTH_8_Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    campusSafetyAudits: crud<EHCampusSafetyAudit>(EDU_HEALTH_8_TABLE_NAMES.EHCampusSafetyAudit),
    hazardReports: crud<EHHazardReport>(EDU_HEALTH_8_TABLE_NAMES.EHHazardReport),
    safetyProtocols: crud<EHSafetyProtocol>(EDU_HEALTH_8_TABLE_NAMES.EHSafetyProtocol),
    safetyEquipments: crud<EHSafetyEquipment>(EDU_HEALTH_8_TABLE_NAMES.EHSafetyEquipment),
    inspectionRecords: crud<EHInspectionRecord>(EDU_HEALTH_8_TABLE_NAMES.EHInspectionRecord),
    fireSafetyRecords: crud<EHFireSafetyRecord>(EDU_HEALTH_8_TABLE_NAMES.EHFireSafetyRecord),
    burglaryAlarms: crud<EHBuglaryAlarm>(EDU_HEALTH_8_TABLE_NAMES.EHBuglaryAlarm),
    cctvCameras: crud<EHCCTVCamera>(EDU_HEALTH_8_TABLE_NAMES.EHCCTVCamera),
    safetyTrainings: crud<EHSafetyTraining>(EDU_HEALTH_8_TABLE_NAMES.EHSafetyTraining),
    safetyIncidents: crud<EHSafetyIncident>(EDU_HEALTH_8_TABLE_NAMES.EHSafetyIncident),
    safetyCommittees: crud<EHSafetyCommittee>(EDU_HEALTH_8_TABLE_NAMES.EHSafetyCommittee),
    safetyMeetingMinutes: crud<EHSafetyMeetingMinutes>(EDU_HEALTH_8_TABLE_NAMES.EHSafetyMeetingMinutes),
    safetyPolicies: crud<EHSafetyPolicy>(EDU_HEALTH_8_TABLE_NAMES.EHSafetyPolicy),
    safetyAlerts: crud<EHSafetyAlert>(EDU_HEALTH_8_TABLE_NAMES.EHSafetyAlert),
    safetyMetrics: crud<EHSafetyMetric>(EDU_HEALTH_8_TABLE_NAMES.EHSafetyMetric),
  };
}

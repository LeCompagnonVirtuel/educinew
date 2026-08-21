import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gefi-base.repository';

// ============================================================================
// GEFI-13: Fraud Detection — Rules, Alerts, Investigations, ML Models
// ============================================================================

export interface GEFIFraudRule extends BaseEntity { name: string; description: string; category: 'AMOUNT'|'VELOCITY'|'PATTERN'|'LOCATION'|'DEVICE'|'BEHAVIORAL'|'CUSTOM'; condition: Record<string,unknown>; severity: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; action: 'BLOCK'|'FLAG'|'REVIEW'|'ALERT'|'LOG'; priority: number; is_active: boolean; hit_count: number; false_positive_rate: number; metadata: Record<string,unknown>; }
export interface GEFIFraudAlert extends BaseEntity { rule_id: string; entity_type: string; entity_id: string; transaction_id?: string; alert_type: string; severity: 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL'; score: number; details: Record<string,unknown>; status: 'NEW'|'INVESTIGATING'|'CONFIRMED_FRAUD'|'FALSE_POSITIVE'|'RESOLVED'|'DISMISSED'; assigned_to?: string; assigned_at?: string; resolved_at?: string; resolution?: string; metadata: Record<string,unknown>; }
export interface GEFIFraudInvestigation extends BaseEntity { alert_id: string; investigator_id: string; title: string; description: string; evidence: Record<string,unknown>[]; timeline: Record<string,unknown>[]; finding?: string; recommendation?: string; status: 'OPEN'|'IN_PROGRESS'|'ESCALATED'|'CLOSED'; opened_at: string; closed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIFraudCase extends BaseEntity { case_number: string; investigation_id: string; entity_type: string; entity_id: string; fraud_type: string; amount_involved: number; currency_code: string; status: 'OPEN'|'UNDER_REVIEW'|'CONFIRMED'|'REPORTED'|'RECOVERED'|'WRITTEN_OFF'; assigned_to: string; opened_at: string; closed_at?: string; metadata: Record<string,unknown>; }
export interface GEFIFraudCaseUpdate extends BaseEntity { case_id: string; update_type: string; content: string; attachments: Record<string,unknown>[]; author_id: string; created_at: string; metadata: Record<string,unknown>; }
export interface GEFIFraudPattern extends BaseEntity { name: string; description: string; pattern_type: string; detection_query: string; confidence: number; sample_size: number; last_detected: string; status: 'ACTIVE'|'ARCHIVED'|'SUPERSEDED'; metadata: Record<string,unknown>; }
export interface GEFIFraudPatternMatch extends BaseEntity { pattern_id: string; entity_type: string; entity_id: string; match_score: number; match_details: Record<string,unknown>; detected_at: string; status: 'NEW'|'CONFIRMED'|'DISMISSED'; metadata: Record<string,unknown>; }
export interface GEFIFraudMLModel extends BaseEntity { name: string; model_type: string; algorithm: string; version: number; accuracy: number; precision_score: number; recall: number; f1_score: number; training_data_size: number; last_trained_at: string; status: 'ACTIVE'|'RETIRED'|'TRAINING'; model_path: string; features: string[]; metadata: Record<string,unknown>; }
export interface GEFIFraudMLPrediction extends BaseEntity { model_id: string; entity_type: string; entity_id: string; input_data: Record<string,unknown>; prediction: number; probability: number; confidence: number; features_importance: Record<string,number>; predicted_at: string; metadata: Record<string,unknown>; }
export interface GEFIFraudWhitelist extends BaseEntity { entity_type: string; entity_id: string; entity_name: string; reason: string; added_by: string; expires_at?: string; is_permanent: boolean; metadata: Record<string,unknown>; }
export interface GEFIFraudBlacklist extends BaseEntity { entity_type: string; entity_id: string; entity_name: string; reason: string; risk_level: 'MEDIUM'|'HIGH'|'CRITICAL'; added_by: string; expires_at?: string; is_permanent: boolean; metadata: Record<string,unknown>; }
export interface GEFIFraudDeviceFingerprint extends BaseEntity { user_id: string; device_id: string; device_type: string; browser: string; os: string; ip_address: string; location: string; first_seen: string; last_seen: string; trust_score: number; is_compromised: boolean; metadata: Record<string,unknown>; }
export interface GEFIFraudVelocityCheck extends BaseEntity { entity_type: string; entity_id: string; check_type: string; window_minutes: number; count: number; total_amount: number; threshold_count: number; threshold_amount: number; is_exceeded: boolean; checked_at: string; metadata: Record<string,unknown>; }
export interface GEFIFraudGeoAnomaly extends BaseEntity { user_id: string; transaction_id: string; current_location: string; previous_location: string; distance_km: number; time_gap_minutes: number; impossible_travel: boolean; risk_score: number; detected_at: string; metadata: Record<string,unknown>; }
export interface GEFIFraudAccountTakeover extends BaseEntity { user_id: string; indicators: string[]; risk_score: number; ip_address: string; device_id: string; detected_at: string; status: 'DETECTED'|'INVESTIGATING'|'CONFIRMED'|'FALSE_POSITIVE'; metadata: Record<string,unknown>; }
export interface GEFIFraudIdentityTheft extends BaseEntity { victim_id: string; suspect_id?: string; indicators: string[]; accounts_affected: string[]; amount_involved: number; status: 'DETECTED'|'INVESTIGATING'|'CONFIRMED'|'RESOLVED'; reported_at: string; resolved_at?: string; metadata: Record<string,unknown>; }
export interface GEFIFraudReport extends BaseEntity { report_type: string; period: string; total_alerts: number; confirmed_fraud: number; false_positives: number; total_amount_involved: number; recovered_amount: number; avg_response_time_hours: number; generated_at: string; metadata: Record<string,unknown>; }
export interface GEFIAuditTrail extends BaseEntity { entity_type: string; entity_id: string; action: string; actor_id: string; changes: Record<string,unknown>; ip_address?: string; metadata: Record<string,unknown>; }

export interface GEFI13Repository {
  fraudRule: CrudRepository<GEFIFraudRule>;
  fraudAlert: CrudRepository<GEFIFraudAlert>;
  fraudInvestigation: CrudRepository<GEFIFraudInvestigation>;
  fraudCase: CrudRepository<GEFIFraudCase>;
  fraudCaseUpdate: CrudRepository<GEFIFraudCaseUpdate>;
  fraudPattern: CrudRepository<GEFIFraudPattern>;
  fraudPatternMatch: CrudRepository<GEFIFraudPatternMatch>;
  fraudMLModel: CrudRepository<GEFIFraudMLModel>;
  fraudMLPrediction: CrudRepository<GEFIFraudMLPrediction>;
  fraudWhitelist: CrudRepository<GEFIFraudWhitelist>;
  fraudBlacklist: CrudRepository<GEFIFraudBlacklist>;
  fraudDeviceFingerprint: CrudRepository<GEFIFraudDeviceFingerprint>;
  fraudVelocityCheck: CrudRepository<GEFIFraudVelocityCheck>;
  fraudGeoAnomaly: CrudRepository<GEFIFraudGeoAnomaly>;
  fraudAccountTakeover: CrudRepository<GEFIFraudAccountTakeover>;
  fraudIdentityTheft: CrudRepository<GEFIFraudIdentityTheft>;
  fraudReport: CrudRepository<GEFIFraudReport>;
  auditTrail: CrudRepository<GEFIAuditTrail>;
}

export function createGEFI13Repository(supabase: SupabaseClient): GEFI13Repository {
  return {
    fraudRule: createCrudRepository<GEFIFraudRule>(supabase, 'gefi_fraud_rules'),
    fraudAlert: createCrudRepository<GEFIFraudAlert>(supabase, 'gefi_fraud_alerts'),
    fraudInvestigation: createCrudRepository<GEFIFraudInvestigation>(supabase, 'gefi_fraud_investigations'),
    fraudCase: createCrudRepository<GEFIFraudCase>(supabase, 'gefi_fraud_cases'),
    fraudCaseUpdate: createCrudRepository<GEFIFraudCaseUpdate>(supabase, 'gefi_fraud_case_updates'),
    fraudPattern: createCrudRepository<GEFIFraudPattern>(supabase, 'gefi_fraud_patterns'),
    fraudPatternMatch: createCrudRepository<GEFIFraudPatternMatch>(supabase, 'gefi_fraud_pattern_matches'),
    fraudMLModel: createCrudRepository<GEFIFraudMLModel>(supabase, 'gefi_fraud_ml_models'),
    fraudMLPrediction: createCrudRepository<GEFIFraudMLPrediction>(supabase, 'gefi_fraud_ml_predictions'),
    fraudWhitelist: createCrudRepository<GEFIFraudWhitelist>(supabase, 'gefi_fraud_whitelists'),
    fraudBlacklist: createCrudRepository<GEFIFraudBlacklist>(supabase, 'gefi_fraud_blacklists'),
    fraudDeviceFingerprint: createCrudRepository<GEFIFraudDeviceFingerprint>(supabase, 'gefi_fraud_device_fingerprints'),
    fraudVelocityCheck: createCrudRepository<GEFIFraudVelocityCheck>(supabase, 'gefi_fraud_velocity_checks'),
    fraudGeoAnomaly: createCrudRepository<GEFIFraudGeoAnomaly>(supabase, 'gefi_fraud_geo_anomalies'),
    fraudAccountTakeover: createCrudRepository<GEFIFraudAccountTakeover>(supabase, 'gefi_fraud_account_takeovers'),
    fraudIdentityTheft: createCrudRepository<GEFIFraudIdentityTheft>(supabase, 'gefi_fraud_identity_thefts'),
    fraudReport: createCrudRepository<GEFIFraudReport>(supabase, 'gefi_fraud_reports'),
    auditTrail: createCrudRepository<GEFIAuditTrail>(supabase, 'gefi_fraud_detection_audit_trails'),
  };
}

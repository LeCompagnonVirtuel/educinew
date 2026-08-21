import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-10: Compliance — Regulatory Compliance Framework
// ============================================================================

export interface GEGINComplianceAssessment extends BaseEntity {
  institution_id: string;
  framework: string;
  version: string;
  assessment_date: string;
  assessor_id: string;
  overall_score: number;
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  findings: Record<string, unknown>[];
  recommendations: string[];
  metadata: Record<string, unknown>;
}

export interface GEGINDataResidency extends BaseEntity {
  institution_id: string;
  data_type: string;
  storage_location: string;
  country_code: string;
  provider?: string;
  encryption_type: string;
  retention_days: number;
  status: 'active' | 'inactive' | 'pending_review';
  last_reviewed?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINConsentRecord extends BaseEntity {
  user_id: string;
  consent_type: 'data_processing' | 'marketing' | 'analytics' | 'third_party' | 'other';
  purpose: string;
  granted: boolean;
  granted_at: string;
  expires_at?: string;
  withdrawn_at?: string;
  source: string;
  ip_address?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINSovereigntyConfig extends BaseEntity {
  institution_id: string;
  country_code: string;
  data_localization_required: boolean;
  encryption_at_rest: boolean;
  encryption_in_transit: boolean;
  access_logging_enabled: boolean;
  audit_frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  compliance_frameworks: string[];
  metadata: Record<string, unknown>;
}

export interface GEGINLegalHold extends BaseEntity {
  institution_id: string;
  title: string;
  description: string;
  legal_reference: string;
  custodian_id: string;
  status: 'active' | 'released' | 'expired';
  issued_at: string;
  expires_at?: string;
  released_at?: string;
  affected_data_types: string[];
  metadata: Record<string, unknown>;
}

export interface GEGINAuditLog extends BaseEntity {
  institution_id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string;
  details: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
  metadata: Record<string, unknown>;
}

export interface GEGINPrivacySettings extends BaseEntity {
  institution_id: string;
  setting_type: 'cookie_consent' | 'data_retention' | 'access_control' | 'notification' | 'other';
  configuration: Record<string, unknown>;
  status: 'active' | 'inactive' | 'pending_review';
  last_updated: string;
  updated_by: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN10_TABLE_NAMES: Record<string, string> = {
  GEGINComplianceAssessment: 'gegin_compliance_assessments',
  GEGINDataResidency: 'gegin_data_residency',
  GEGINConsentRecord: 'gegin_consent_records',
  GEGINSovereigntyConfig: 'gegin_sovereignty_configs',
  GEGINLegalHold: 'gegin_legal_holds',
  GEGINAuditLog: 'gegin_audit_logs',
  GEGINPrivacySettings: 'gegin_privacy_settings',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN10Repository {
  complianceAssessments: CrudRepository<GEGINComplianceAssessment>;
  dataResidency: CrudRepository<GEGINDataResidency>;
  consentRecords: CrudRepository<GEGINConsentRecord>;
  sovereigntyConfigs: CrudRepository<GEGINSovereigntyConfig>;
  legalHolds: CrudRepository<GEGINLegalHold>;
  auditLogs: CrudRepository<GEGINAuditLog>;
  privacySettings: CrudRepository<GEGINPrivacySettings>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN10Repository(supabase: SupabaseClient): GEGIN10Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    complianceAssessments: crud<GEGINComplianceAssessment>(GEGIN10_TABLE_NAMES.GEGINComplianceAssessment),
    dataResidency: crud<GEGINDataResidency>(GEGIN10_TABLE_NAMES.GEGINDataResidency),
    consentRecords: crud<GEGINConsentRecord>(GEGIN10_TABLE_NAMES.GEGINConsentRecord),
    sovereigntyConfigs: crud<GEGINSovereigntyConfig>(GEGIN10_TABLE_NAMES.GEGINSovereigntyConfig),
    legalHolds: crud<GEGINLegalHold>(GEGIN10_TABLE_NAMES.GEGINLegalHold),
    auditLogs: crud<GEGINAuditLog>(GEGIN10_TABLE_NAMES.GEGINAuditLog),
    privacySettings: crud<GEGINPrivacySettings>(GEGIN10_TABLE_NAMES.GEGINPrivacySettings),
  };
}

import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINComplianceAssessment, GEGINDataResidency, GEGINConsentRecord, GEGINSovereigntyConfig, GEGINLegalHold, GEGINAuditLog, GEGINPrivacySettings, GEGIN10_TABLE_NAMES } from '../repositories/gegin-10-compliance.repository';
import { logger } from '@educi/logger';

export class GEGINComplianceAssessmentService extends GEGINBaseService<GEGINComplianceAssessment> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN10_TABLE_NAMES.GEGINComplianceAssessment, moduleName: 'ComplianceAssessment' });
  }
}

export class GEGINDataResidencyService extends GEGINBaseService<GEGINDataResidency> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN10_TABLE_NAMES.GEGINDataResidency, moduleName: 'DataResidency' });
  }
}

export class GEGINConsentRecordService extends GEGINBaseService<GEGINConsentRecord> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN10_TABLE_NAMES.GEGINConsentRecord, moduleName: 'ConsentRecord' });
  }
}

export class GEGINSovereigntyConfigService extends GEGINBaseService<GEGINSovereigntyConfig> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN10_TABLE_NAMES.GEGINSovereigntyConfig, moduleName: 'SovereigntyConfig' });
  }
}

export class GEGINLegalHoldService extends GEGINBaseService<GEGINLegalHold> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN10_TABLE_NAMES.GEGINLegalHold, moduleName: 'LegalHold' });
  }
}

export class GEGINAuditLogService extends GEGINBaseService<GEGINAuditLog> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN10_TABLE_NAMES.GEGINAuditLog, moduleName: 'AuditLog' });
  }
}

export class GEGINPrivacySettingsService extends GEGINBaseService<GEGINPrivacySettings> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN10_TABLE_NAMES.GEGINPrivacySettings, moduleName: 'PrivacySettings' });
  }
}

export class GEGIN10ComplianceService {
  readonly complianceAssessments: GEGINComplianceAssessmentService;
  readonly dataResidency: GEGINDataResidencyService;
  readonly consentRecords: GEGINConsentRecordService;
  readonly sovereigntyConfigs: GEGINSovereigntyConfigService;
  readonly legalHolds: GEGINLegalHoldService;
  readonly auditLogs: GEGINAuditLogService;
  readonly privacySettings: GEGINPrivacySettingsService;

  constructor(supabase: SupabaseClient) {
    this.complianceAssessments = new GEGINComplianceAssessmentService(supabase);
    this.dataResidency = new GEGINDataResidencyService(supabase);
    this.consentRecords = new GEGINConsentRecordService(supabase);
    this.sovereigntyConfigs = new GEGINSovereigntyConfigService(supabase);
    this.legalHolds = new GEGINLegalHoldService(supabase);
    this.auditLogs = new GEGINAuditLogService(supabase);
    this.privacySettings = new GEGINPrivacySettingsService(supabase);
  }
}

export function createGEGIN10ComplianceService(supabase: SupabaseClient): GEGIN10ComplianceService {
  return new GEGIN10ComplianceService(supabase);
}

import { SupabaseClient } from '@supabase/supabase-js';
import { GEGINBaseService } from '../gegin-base.service';
import { GEGINGovernanceBody, GEGINGovernanceMember, GEGINGovernanceMeeting, GEGINGovernanceVote, GEGINGovernanceMotion, GEGINGovernancePolicy, GEGINGovernanceAuditTrail, GEGINGovernanceComplianceCheck, GEGINGovernanceTransparencyReport, GEGINGovernanceStakeholder, GEGINGovernanceInitiative, GEGINGovernanceDecisionLog, GEGIN1_TABLE_NAMES } from '../repositories/gegin-1-governance.repository';
import { logger } from '@educi/logger';

export class GEGINGovernanceBodyService extends GEGINBaseService<GEGINGovernanceBody> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceBody, moduleName: 'GovernanceBody' });
  }
}

export class GEGINGovernanceMemberService extends GEGINBaseService<GEGINGovernanceMember> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceMember, moduleName: 'GovernanceMember' });
  }
}

export class GEGINGovernanceMeetingService extends GEGINBaseService<GEGINGovernanceMeeting> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceMeeting, moduleName: 'GovernanceMeeting' });
  }
}

export class GEGINGovernanceVoteService extends GEGINBaseService<GEGINGovernanceVote> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceVote, moduleName: 'GovernanceVote' });
  }
}

export class GEGINGovernanceMotionService extends GEGINBaseService<GEGINGovernanceMotion> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceMotion, moduleName: 'GovernanceMotion' });
  }
}

export class GEGINGovernancePolicyService extends GEGINBaseService<GEGINGovernancePolicy> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernancePolicy, moduleName: 'GovernancePolicy' });
  }
}

export class GEGINGovernanceAuditTrailService extends GEGINBaseService<GEGINGovernanceAuditTrail> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceAuditTrail, moduleName: 'GovernanceAuditTrail' });
  }
}

export class GEGINGovernanceComplianceCheckService extends GEGINBaseService<GEGINGovernanceComplianceCheck> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceComplianceCheck, moduleName: 'GovernanceComplianceCheck' });
  }
}

export class GEGINGovernanceTransparencyReportService extends GEGINBaseService<GEGINGovernanceTransparencyReport> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceTransparencyReport, moduleName: 'GovernanceTransparencyReport' });
  }
}

export class GEGINGovernanceStakeholderService extends GEGINBaseService<GEGINGovernanceStakeholder> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceStakeholder, moduleName: 'GovernanceStakeholder' });
  }
}

export class GEGINGovernanceInitiativeService extends GEGINBaseService<GEGINGovernanceInitiative> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceInitiative, moduleName: 'GovernanceInitiative' });
  }
}

export class GEGINGovernanceDecisionLogService extends GEGINBaseService<GEGINGovernanceDecisionLog> {
  constructor(supabase: SupabaseClient) {
    super({ supabase, tableName: GEGIN1_TABLE_NAMES.GEGINGovernanceDecisionLog, moduleName: 'GovernanceDecisionLog' });
  }
}

export class GEGIN1GovernanceService {
  readonly bodies: GEGINGovernanceBodyService;
  readonly members: GEGINGovernanceMemberService;
  readonly meetings: GEGINGovernanceMeetingService;
  readonly votes: GEGINGovernanceVoteService;
  readonly motions: GEGINGovernanceMotionService;
  readonly policies: GEGINGovernancePolicyService;
  readonly auditTrails: GEGINGovernanceAuditTrailService;
  readonly complianceChecks: GEGINGovernanceComplianceCheckService;
  readonly transparencyReports: GEGINGovernanceTransparencyReportService;
  readonly stakeholders: GEGINGovernanceStakeholderService;
  readonly initiatives: GEGINGovernanceInitiativeService;
  readonly decisionLogs: GEGINGovernanceDecisionLogService;

  constructor(supabase: SupabaseClient) {
    this.bodies = new GEGINGovernanceBodyService(supabase);
    this.members = new GEGINGovernanceMemberService(supabase);
    this.meetings = new GEGINGovernanceMeetingService(supabase);
    this.votes = new GEGINGovernanceVoteService(supabase);
    this.motions = new GEGINGovernanceMotionService(supabase);
    this.policies = new GEGINGovernancePolicyService(supabase);
    this.auditTrails = new GEGINGovernanceAuditTrailService(supabase);
    this.complianceChecks = new GEGINGovernanceComplianceCheckService(supabase);
    this.transparencyReports = new GEGINGovernanceTransparencyReportService(supabase);
    this.stakeholders = new GEGINGovernanceStakeholderService(supabase);
    this.initiatives = new GEGINGovernanceInitiativeService(supabase);
    this.decisionLogs = new GEGINGovernanceDecisionLogService(supabase);
  }
}

export function createGEGIN1GovernanceService(supabase: SupabaseClient): GEGIN1GovernanceService {
  return new GEGIN1GovernanceService(supabase);
}

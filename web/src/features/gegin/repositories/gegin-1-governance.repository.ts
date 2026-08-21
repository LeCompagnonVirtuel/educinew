import { SupabaseClient } from '@supabase/supabase-js';
import { BaseEntity, CrudRepository, createCrudRepository } from './gegin-base.repository';

// ============================================================================
// GEGIN-1: Governance — Global Education Governance Framework
// ============================================================================

export interface GEGINGovernanceBody extends BaseEntity {
  name: string;
  description: string;
  type: 'board' | 'committee' | 'council' | 'assembly' | 'regulatory' | 'advisory';
  jurisdiction: string;
  country_code: string;
  status: 'active' | 'inactive' | 'dissolved';
  president_id?: string;
  meeting_frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'annually';
  established_date: string;
  dissolution_date?: string;
  website_url?: string;
  contact_email?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINGovernanceMember extends BaseEntity {
  body_id: string;
  user_id: string;
  role: 'chair' | 'vice_chair' | 'secretary' | 'member' | 'observer' | 'advisor';
  status: 'active' | 'inactive' | 'suspended';
  appointed_date: string;
  term_end_date?: string;
  voting_power: number;
  participation_rate: number;
  metadata: Record<string, unknown>;
}

export interface GEGINGovernanceMeeting extends BaseEntity {
  body_id: string;
  title: string;
  description: string;
  type: 'regular' | 'special' | 'emergency' | 'annual' | 'workshop';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';
  scheduled_date: string;
  start_time: string;
  end_time?: string;
  location: string;
  virtual_link?: string;
  quorum_required: number;
  quorum_met: boolean;
  agenda: Record<string, unknown>[];
  minutes_url?: string;
  decisions: Record<string, unknown>[];
  metadata: Record<string, unknown>;
}

export interface GEGINGovernanceVote extends BaseEntity {
  meeting_id: string;
  motion_id: string;
  voter_id: string;
  vote: 'yes' | 'no' | 'abstain' | 'absent';
  voting_power: number;
  rationale?: string;
  timestamp: string;
}

export interface GEGINGovernanceMotion extends BaseEntity {
  meeting_id: string;
  title: string;
  description: string;
  proposed_by: string;
  seconded_by?: string;
  status: 'proposed' | 'seconded' | 'voting' | 'passed' | 'failed' | 'withdrawn';
  required_votes: number;
  yes_votes: number;
  no_votes: number;
  abstain_votes: number;
  result?: string;
  effective_date?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINGovernancePolicy extends BaseEntity {
  body_id: string;
  title: string;
  description: string;
  category: 'academic' | 'financial' | 'hr' | 'infrastructure' | 'security' | 'compliance' | 'operational';
  version: number;
  status: 'draft' | 'review' | 'approved' | 'active' | 'archived' | 'superseded';
  effective_date: string;
  review_date: string;
  expiry_date?: string;
  approved_by?: string;
  document_url?: string;
  tags: string[];
  metadata: Record<string, unknown>;
}

export interface GEGINGovernanceAuditTrail extends BaseEntity {
  entity_type: string;
  entity_id: string;
  action: 'create' | 'update' | 'delete' | 'approve' | 'reject' | 'archive';
  actor_id: string;
  changes: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  timestamp: string;
}

export interface GEGINGovernanceComplianceCheck extends BaseEntity {
  policy_id: string;
  entity_type: string;
  entity_id: string;
  status: 'compliant' | 'non_compliant' | 'pending' | 'exempt';
  checked_at: string;
  checked_by: string;
  findings: Record<string, unknown>[];
  remediation?: string;
  due_date?: string;
  metadata: Record<string, unknown>;
}

export interface GEGINGovernanceTransparencyReport extends BaseEntity {
  body_id: string;
  title: string;
  period: string;
  report_type: 'annual' | 'quarterly' | 'special';
  status: 'draft' | 'published' | 'archived';
  published_date: string;
  content: Record<string, unknown>;
  download_url?: string;
  views: number;
  metadata: Record<string, unknown>;
}

export interface GEGINGovernanceStakeholder extends BaseEntity {
  name: string;
  type: 'government' | 'ngo' | 'private' | 'academic' | 'international' | 'community';
  country_code: string;
  contact_email?: string;
  contact_phone?: string;
  representation_level: 'local' | 'regional' | 'national' | 'international';
  status: 'active' | 'inactive' | 'suspended';
  participation_score: number;
  metadata: Record<string, unknown>;
}

export interface GEGINGovernanceInitiative extends BaseEntity {
  body_id: string;
  title: string;
  description: string;
  category: 'reform' | 'modernization' | 'capacity_building' | 'digital' | 'equity' | 'inclusion';
  status: 'proposed' | 'approved' | 'active' | 'completed' | 'suspended' | 'cancelled';
  budget: number;
  spent: number;
  start_date: string;
  end_date?: string;
  progress: number;
  lead_id?: string;
  partners: string[];
  metadata: Record<string, unknown>;
}

export interface GEGINGovernanceDecisionLog extends BaseEntity {
  body_id: string;
  meeting_id?: string;
  motion_id?: string;
  title: string;
  description: string;
  decision: string;
  rationale: string;
  decided_by: string;
  decided_at: string;
  implementation_status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  review_date?: string;
  metadata: Record<string, unknown>;
}

// ============================================================================
// Table Name Map
// ============================================================================
export const GEGIN1_TABLE_NAMES: Record<string, string> = {
  GEGINGovernanceBody: 'gegin_governance_bodies',
  GEGINGovernanceMember: 'gegin_governance_members',
  GEGINGovernanceMeeting: 'gegin_governance_meetings',
  GEGINGovernanceVote: 'gegin_governance_votes',
  GEGINGovernanceMotion: 'gegin_governance_motions',
  GEGINGovernancePolicy: 'gegin_governance_policies',
  GEGINGovernanceAuditTrail: 'gegin_governance_audit_trails',
  GEGINGovernanceComplianceCheck: 'gegin_governance_compliance_checks',
  GEGINGovernanceTransparencyReport: 'gegin_governance_transparency_reports',
  GEGINGovernanceStakeholder: 'gegin_governance_stakeholders',
  GEGINGovernanceInitiative: 'gegin_governance_initiatives',
  GEGINGovernanceDecisionLog: 'gegin_governance_decision_logs',
};

// ============================================================================
// Repository Interface
// ============================================================================
export interface GEGIN1Repository {
  bodies: CrudRepository<GEGINGovernanceBody>;
  members: CrudRepository<GEGINGovernanceMember>;
  meetings: CrudRepository<GEGINGovernanceMeeting>;
  votes: CrudRepository<GEGINGovernanceVote>;
  motions: CrudRepository<GEGINGovernanceMotion>;
  policies: CrudRepository<GEGINGovernancePolicy>;
  auditTrails: CrudRepository<GEGINGovernanceAuditTrail>;
  complianceChecks: CrudRepository<GEGINGovernanceComplianceCheck>;
  transparencyReports: CrudRepository<GEGINGovernanceTransparencyReport>;
  stakeholders: CrudRepository<GEGINGovernanceStakeholder>;
  initiatives: CrudRepository<GEGINGovernanceInitiative>;
  decisionLogs: CrudRepository<GEGINGovernanceDecisionLog>;
}

// ============================================================================
// Factory
// ============================================================================
export function createGEGIN1Repository(supabase: SupabaseClient): GEGIN1Repository {
  const crud = <T extends BaseEntity>(table: string): CrudRepository<T> =>
    createCrudRepository<T>(supabase, table);

  return {
    bodies: crud<GEGINGovernanceBody>(GEGIN1_TABLE_NAMES.GEGINGovernanceBody),
    members: crud<GEGINGovernanceMember>(GEGIN1_TABLE_NAMES.GEGINGovernanceMember),
    meetings: crud<GEGINGovernanceMeeting>(GEGIN1_TABLE_NAMES.GEGINGovernanceMeeting),
    votes: crud<GEGINGovernanceVote>(GEGIN1_TABLE_NAMES.GEGINGovernanceVote),
    motions: crud<GEGINGovernanceMotion>(GEGIN1_TABLE_NAMES.GEGINGGovernanceMotion),
    policies: crud<GEGINGovernancePolicy>(GEGIN1_TABLE_NAMES.GEGINGGovernancePolicy),
    auditTrails: crud<GEGINGovernanceAuditTrail>(GEGIN1_TABLE_NAMES.GEGINGGovernanceAuditTrail),
    complianceChecks: crud<GEGINGovernanceComplianceCheck>(GEGIN1_TABLE_NAMES.GEGINGGovernanceComplianceCheck),
    transparencyReports: crud<GEGINGovernanceTransparencyReport>(GEGIN1_TABLE_NAMES.GEGINGGovernanceTransparencyReport),
    stakeholders: crud<GEGINGovernanceStakeholder>(GEGIN1_TABLE_NAMES.GEGINGGovernanceStakeholder),
    initiatives: crud<GEGINGovernanceInitiative>(GEGIN1_TABLE_NAMES.GEGINGGovernanceInitiative),
    decisionLogs: crud<GEGINGovernanceDecisionLog>(GEGIN1_TABLE_NAMES.GEGINGGovernanceDecisionLog),
  };
}

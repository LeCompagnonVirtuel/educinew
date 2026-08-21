import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpComplianceAssessmentError,
  GestcrpGovernancePolicyError,
  GestcrpRiskRegisterError,
  GestcrpAuditLogError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// Compliance Entity Interfaces
// ============================================================================

export interface GestcrpComplianceAssessment extends GestcrpBaseEntity {
  standard: string;
  name: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLIANT' | 'PARTIALLY_COMPLIANT' | 'NON_COMPLIANT' | 'WAIVED';
  scope: string;
  requirements: Record<string, unknown>[];
  assessment_date: string;
  assessor: string;
  valid_until: string;
  score: number;
  max_score: number;
  findings: Record<string, unknown>[];
  recommendations: string[];
  documents: string[];
}

export interface GestcrpGovernancePolicy extends GestcrpBaseEntity {
  name: string;
  description: string;
  category: string;
  version: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'ACTIVE' | 'ARCHIVED' | 'DEPRECATED';
  owner: string;
  approver: string;
  effective_date: string;
  review_date: string;
  expiry_date?: string;
  applicable_roles: string[];
  applicable_data: string[];
  tags: string[];
  document_url?: string;
  last_review_at?: string;
  next_review_at?: string;
}

export interface GestcrpRiskRegister extends GestcrpBaseEntity {
  name: string;
  description: string;
  category: string;
  likelihood: number;
  impact: number;
  risk_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'IDENTIFIED' | 'ANALYZED' | 'TREATED' | 'MONITORED' | 'CLOSED';
  owner: string;
  controls: string[];
  treatment_plan: string;
  residual_risk?: number;
  last_assessed_at: string;
  next_assessment_date: string;
}

export interface GestcrpAuditLog extends GestcrpBaseEntity {
  action: string;
  actor: string;
  actor_type: 'USER' | 'SYSTEM' | 'API' | 'SERVICE';
  resource: string;
  resource_id: string;
  details: Record<string, unknown>;
  ip_address: string;
  user_agent: string;
  result: 'SUCCESS' | 'FAILURE';
  timestamp: string;
}

// ============================================================================
// Table Names
// ============================================================================

export const COMPLIANCE_TABLE_NAMES = {
  assessments: 'gestcrp_compliance_assessments',
  governancePolicies: 'gestcrp_governance_policies',
  riskRegisters: 'gestcrp_risk_registers',
  auditLogs: 'gestcrp_audit_logs',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface ComplianceRepository {
  assessments: GestcrpCrudRepository<GestcrpComplianceAssessment>;
  governancePolicies: GestcrpCrudRepository<GestcrpGovernancePolicy>;
  riskRegisters: GestcrpCrudRepository<GestcrpRiskRegister>;
  auditLogs: GestcrpCrudRepository<GestcrpAuditLog>;
  findActiveGovernancePolicies(schoolId: string): Promise<PaginatedResult<GestcrpGovernancePolicy>>;
  findOpenRisks(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpRiskRegister>>;
  findRecentAuditLogs(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpAuditLog>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createComplianceRepository(supabase: SupabaseClient): ComplianceRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    assessments: crud<GestcrpComplianceAssessment>(COMPLIANCE_TABLE_NAMES.assessments),
    governancePolicies: crud<GestcrpGovernancePolicy>(COMPLIANCE_TABLE_NAMES.governancePolicies),
    riskRegisters: crud<GestcrpRiskRegister>(COMPLIANCE_TABLE_NAMES.riskRegisters),
    auditLogs: crud<GestcrpAuditLog>(COMPLIANCE_TABLE_NAMES.auditLogs),

    async findActiveGovernancePolicies(schoolId: string) {
      const { data, error, count } = await supabase
        .from(COMPLIANCE_TABLE_NAMES.governancePolicies)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('status', 'ACTIVE')
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) {
        throw new GestcrpGovernancePolicyError(
          `Erreur lors de la récupération des politiques de gouvernance actives: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpGovernancePolicy[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },

    async findOpenRisks(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(COMPLIANCE_TABLE_NAMES.riskRegisters)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .in('status', ['IDENTIFIED', 'ANALYZED', 'TREATED'])
        .is('deleted_at', null)
        .order('risk_score', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpRiskRegisterError(
          `Erreur lors de la récupération des risques ouverts: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpRiskRegister[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findRecentAuditLogs(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(COMPLIANCE_TABLE_NAMES.auditLogs)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpAuditLogError(
          `Erreur lors de la récupération des journaux d'audit récents: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpAuditLog[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },
  };
}

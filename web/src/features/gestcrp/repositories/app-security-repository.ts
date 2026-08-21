import { SupabaseClient } from '@supabase/supabase-js';
import {
  GestcrpAppScanError,
  GestcrpVulnerabilityError,
  GestcrpAPISecurityError,
  GestcrpDependencyScanError,
} from '@educi/errors';
import {
  GestcrpBaseEntity,
  GestcrpCrudRepository,
  PaginatedResult,
  PaginationParams,
  createGestcrpCrudRepository,
} from './base-gestcrp-repository';

// ============================================================================
// App Security Entity Interfaces
// ============================================================================

export interface GestcrpAppScan extends GestcrpBaseEntity {
  scan_type: 'SAST' | 'DAST' | 'SCA' | 'IAST' | 'RASP' | 'CONTAINER' | 'IAC' | 'API' | 'MOBILE' | 'SECRETS';
  target: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  findings: Record<string, unknown>[];
  started_at?: string;
  completed_at?: string;
  duration?: number;
  scanner: string;
  version: string;
  triggered_by: string;
}

export interface GestcrpVulnerability extends GestcrpBaseEntity {
  scan_id: string;
  title: string;
  description: string;
  severity: 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'NEW' | 'CONFIRMED' | 'IN_PROGRESS' | 'MITIGATED' | 'RESOLVED' | 'ACCEPTED' | 'FALSE_POSITIVE';
  category: string;
  cwe_id?: string;
  cve_id?: string;
  cvss_score?: number;
  affected_component: string;
  affected_file?: string;
  affected_line?: number;
  evidence: string;
  recommendation: string;
  references: string[];
  exploit_available: boolean;
  patch_available: boolean;
  risk_score: number;
  discovered_at: string;
  resolved_at?: string;
}

export interface GestcrpAPISecurityPolicy extends GestcrpBaseEntity {
  name: string;
  description: string;
  enabled: boolean;
  api_path: string;
  methods: string[];
  rate_limit: number;
  rate_limit_window: number;
  authentication: 'NONE' | 'API_KEY' | 'BEARER' | 'BASIC' | 'MUTUAL_TLS';
  authorization: string[];
  input_validation: Record<string, unknown>[];
  output_encoding: 'HTML' | 'JSON' | 'XML' | 'PLAIN';
  cors_policy?: Record<string, unknown>;
  waf_rules: string[];
}

export interface GestcrpDependencyScan extends GestcrpBaseEntity {
  target: string;
  dependencies: Record<string, unknown>[];
  vulnerabilities: Record<string, unknown>[];
  completed_at: string;
}

// ============================================================================
// Table Names
// ============================================================================

export const APP_SECURITY_TABLE_NAMES = {
  scans: 'gestcrp_app_scans',
  vulnerabilities: 'gestcrp_vulnerabilities',
  apiSecurityPolicies: 'gestcrp_api_security_policies',
  dependencyScans: 'gestcrp_dependency_scans',
} as const;

// ============================================================================
// Repository Interface
// ============================================================================

export interface AppSecurityRepository {
  scans: GestcrpCrudRepository<GestcrpAppScan>;
  vulnerabilities: GestcrpCrudRepository<GestcrpVulnerability>;
  apiSecurityPolicies: GestcrpCrudRepository<GestcrpAPISecurityPolicy>;
  dependencyScans: GestcrpCrudRepository<GestcrpDependencyScan>;
  findRecentScans(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpAppScan>>;
  findCriticalVulnerabilities(schoolId: string, params?: PaginationParams): Promise<PaginatedResult<GestcrpVulnerability>>;
  findActiveAPISecurityPolicies(schoolId: string): Promise<PaginatedResult<GestcrpAPISecurityPolicy>>;
}

// ============================================================================
// Factory
// ============================================================================

export function createAppSecurityRepository(supabase: SupabaseClient): AppSecurityRepository {
  const crud = <T extends GestcrpBaseEntity>(table: string): GestcrpCrudRepository<T> =>
    createGestcrpCrudRepository<T>(supabase, table);

  return {
    scans: crud<GestcrpAppScan>(APP_SECURITY_TABLE_NAMES.scans),
    vulnerabilities: crud<GestcrpVulnerability>(APP_SECURITY_TABLE_NAMES.vulnerabilities),
    apiSecurityPolicies: crud<GestcrpAPISecurityPolicy>(APP_SECURITY_TABLE_NAMES.apiSecurityPolicies),
    dependencyScans: crud<GestcrpDependencyScan>(APP_SECURITY_TABLE_NAMES.dependencyScans),

    async findRecentScans(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(APP_SECURITY_TABLE_NAMES.scans)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpAppScanError(
          `Erreur lors de la récupération des scans récents: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpAppScan[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findCriticalVulnerabilities(schoolId: string, params: PaginationParams = {}) {
      const { offset = 0, limit = 50 } = params;
      const safeLimit = Math.min(limit, 200);

      const { data, error, count } = await supabase
        .from(APP_SECURITY_TABLE_NAMES.vulnerabilities)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('severity', 'CRITICAL')
        .is('deleted_at', null)
        .order('risk_score', { ascending: false })
        .range(offset, offset + safeLimit - 1);

      if (error) {
        throw new GestcrpVulnerabilityError(
          `Erreur lors de la récupération des vulnérabilités critiques: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpVulnerability[],
        total: count || 0,
        offset,
        limit: safeLimit,
      };
    },

    async findActiveAPISecurityPolicies(schoolId: string) {
      const { data, error, count } = await supabase
        .from(APP_SECURITY_TABLE_NAMES.apiSecurityPolicies)
        .select('*', { count: 'exact' })
        .eq('school_id', schoolId)
        .eq('enabled', true)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (error) {
        throw new GestcrpAPISecurityError(
          `Erreur lors de la récupération des politiques API actives: ${error.message}`,
        );
      }

      return {
        data: (data || []) as GestcrpAPISecurityPolicy[],
        total: count || 0,
        offset: 0,
        limit: data?.length || 0,
      };
    },
  };
}

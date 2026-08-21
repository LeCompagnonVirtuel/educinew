import {
  GestcrpAppScanError,
  GestcrpVulnerabilityError,
  GestcrpAPISecurityError,
  GestcrpDependencyScanError,
} from '@educi/errors';
import {
  createAppScanSchema,
  updateAppScanSchema,
  createAPISecurityPolicySchema,
  updateAPISecurityPolicySchema,
} from '../validators';
import type {
  GestcrpAppScan,
  GestcrpVulnerability,
  GestcrpAPISecurityPolicy,
  GestcrpDependencyScan,
  AppSecurityRepository,
} from '../repositories/app-security-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Application Security Service
// ============================================================================

export class AppSecurityService extends BaseGestcrpService {
  constructor(
    private readonly appSecurityRepo: AppSecurityRepository,
    config?: GestcrpServiceConfig,
  ) {
    super(config);
  }

  // ─── Scans ───────────────────────────────────────────────────────────────

  async listScans(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpAppScan>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.appSecurityRepo.scans.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getScan(schoolId: string, id: string): Promise<GestcrpAppScan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scan application');
    return this.ensureExists(this.appSecurityRepo.scans, id, schoolId, 'Scan application');
  }

  async getRecentScans(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpAppScan>> {
    this.validateSchoolId(schoolId);
    return this.appSecurityRepo.findRecentScans(schoolId, params);
  }

  async createScan(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpAppScan> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['scan_type', 'target', 'scanner', 'version', 'triggered_by'], 'Scan application');

    const VALID_SCAN_TYPES = ['SAST', 'DAST', 'SCA', 'IAST', 'RASP', 'CONTAINER', 'IAC', 'API', 'MOBILE', 'SECRETS'] as const;
    this.validateEnum(data.scan_type as string, VALID_SCAN_TYPES, 'scan_type', 'Scan application');

    const validated = this.validateSchema(createAppScanSchema, data, 'Scan application');

    return this.appSecurityRepo.scans.create(
      {
        scan_type: validated.scan_type,
        target: validated.target,
        status: 'PENDING',
        findings: [],
        scanner: validated.scanner,
        version: validated.version,
        triggered_by: validated.triggered_by,
      },
      schoolId,
    );
  }

  async startScan(schoolId: string, id: string): Promise<GestcrpAppScan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scan application');

    const existing = await this.ensureExists(
      this.appSecurityRepo.scans,
      id,
      schoolId,
      'Scan application',
    );
    this.validateOwnership(existing, schoolId, 'Scan application');

    if (existing.status !== 'PENDING') {
      throw new GestcrpAppScanError(
        `Le scan ne peut pas être démarré depuis le statut "${existing.status}"`,
      );
    }

    return this.appSecurityRepo.scans.update(id, schoolId, {
      status: 'RUNNING',
      started_at: new Date().toISOString(),
    });
  }

  async completeScan(
    schoolId: string,
    id: string,
    findings: Record<string, unknown>[],
  ): Promise<GestcrpAppScan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scan application');

    const existing = await this.ensureExists(
      this.appSecurityRepo.scans,
      id,
      schoolId,
      'Scan application',
    );
    this.validateOwnership(existing, schoolId, 'Scan application');

    if (existing.status !== 'RUNNING') {
      throw new GestcrpAppScanError(
        `Le scan ne peut pas être terminé depuis le statut "${existing.status}"`,
      );
    }

    const now = new Date().toISOString();
    const startedAt = existing.started_at ? new Date(existing.started_at).getTime() : Date.now();
    const duration = Math.round((Date.now() - startedAt) / 1000);

    return this.appSecurityRepo.scans.update(id, schoolId, {
      status: 'COMPLETED',
      findings,
      completed_at: now,
      duration,
    });
  }

  async failScan(schoolId: string, id: string, error: string): Promise<GestcrpAppScan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scan application');

    const existing = await this.ensureExists(
      this.appSecurityRepo.scans,
      id,
      schoolId,
      'Scan application',
    );
    this.validateOwnership(existing, schoolId, 'Scan application');

    return this.appSecurityRepo.scans.update(id, schoolId, {
      status: 'FAILED',
      completed_at: new Date().toISOString(),
      findings: [{ error }],
    });
  }

  async cancelScan(schoolId: string, id: string): Promise<GestcrpAppScan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scan application');

    const existing = await this.ensureExists(
      this.appSecurityRepo.scans,
      id,
      schoolId,
      'Scan application',
    );
    this.validateOwnership(existing, schoolId, 'Scan application');

    if (!['PENDING', 'RUNNING'].includes(existing.status)) {
      throw new GestcrpAppScanError(
        `Le scan ne peut pas être annulé depuis le statut "${existing.status}"`,
      );
    }

    return this.appSecurityRepo.scans.update(id, schoolId, {
      status: 'CANCELLED',
      completed_at: new Date().toISOString(),
    });
  }

  // ─── Vulnerabilities ─────────────────────────────────────────────────────

  async listVulnerabilities(
    schoolId: string,
    params: PaginationParams = {},
    filters: Record<string, unknown> = {},
  ): Promise<PaginatedResult<GestcrpVulnerability>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.appSecurityRepo.vulnerabilities.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getVulnerability(schoolId: string, id: string): Promise<GestcrpVulnerability> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Vulnérabilité');
    return this.ensureExists(
      this.appSecurityRepo.vulnerabilities,
      id,
      schoolId,
      'Vulnérabilité',
    );
  }

  async getCriticalVulnerabilities(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpVulnerability>> {
    this.validateSchoolId(schoolId);
    return this.appSecurityRepo.findCriticalVulnerabilities(schoolId, params);
  }

  async createVulnerability(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpVulnerability> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['scan_id', 'title', 'description', 'severity', 'category', 'affected_component', 'evidence', 'recommendation'],
      'Vulnérabilité',
    );

    const VALID_SEVERITIES = ['INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;
    this.validateEnum(data.severity as string, VALID_SEVERITIES, 'severity', 'Vulnérabilité');

    const scanExists = await this.appSecurityRepo.scans.exists(
      data.scan_id as string,
      schoolId,
    );
    if (!scanExists) {
      throw new GestcrpAppScanError(
        `Scan (${data.scan_id}) introuvable`,
      );
    }

    const riskScore = this.calculateVulnerabilityRiskScore(
      data.severity as string,
      data.cvss_score as number | undefined,
      data.exploit_available as boolean ?? false,
      data.patch_available as boolean ?? false,
    );

    return this.appSecurityRepo.vulnerabilities.create(
      {
        scan_id: data.scan_id as string,
        title: data.title as string,
        description: data.description as string,
        severity: data.severity as GestcrpVulnerability['severity'],
        status: 'NEW',
        category: data.category as string,
        cwe_id: data.cwe_id as string,
        cve_id: data.cve_id as string,
        cvss_score: data.cvss_score as number,
        affected_component: data.affected_component as string,
        affected_file: data.affected_file as string,
        affected_line: data.affected_line as number,
        evidence: data.evidence as string,
        recommendation: data.recommendation as string,
        references: (data.references as string[]) ?? [],
        exploit_available: data.exploit_available as boolean ?? false,
        patch_available: data.patch_available as boolean ?? false,
        risk_score: riskScore,
        discovered_at: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateVulnerabilityStatus(
    schoolId: string,
    id: string,
    status: GestcrpVulnerability['status'],
  ): Promise<GestcrpVulnerability> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Vulnérabilité');

    const VALID_STATUSES = ['NEW', 'CONFIRMED', 'IN_PROGRESS', 'MITIGATED', 'RESOLVED', 'ACCEPTED', 'FALSE_POSITIVE'] as const;
    this.validateEnum(status, VALID_STATUSES, 'status', 'Vulnérabilité');

    const existing = await this.ensureExists(
      this.appSecurityRepo.vulnerabilities,
      id,
      schoolId,
      'Vulnérabilité',
    );
    this.validateOwnership(existing, schoolId, 'Vulnérabilité');

    const updateData: Partial<GestcrpVulnerability> = { status };
    if (status === 'RESOLVED') {
      updateData.resolved_at = new Date().toISOString();
    }

    return this.appSecurityRepo.vulnerabilities.update(id, schoolId, updateData);
  }

  async deleteVulnerability(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Vulnérabilité');

    const existing = await this.ensureExists(
      this.appSecurityRepo.vulnerabilities,
      id,
      schoolId,
      'Vulnérabilité',
    );
    this.validateOwnership(existing, schoolId, 'Vulnérabilité');

    await this.appSecurityRepo.vulnerabilities.softDelete(id, schoolId);
  }

  // ─── API Security Policies ───────────────────────────────────────────────

  async listAPISecurityPolicies(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpAPISecurityPolicy>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.appSecurityRepo.apiSecurityPolicies.findAll(schoolId, pagination);
  }

  async getAPISecurityPolicy(schoolId: string, id: string): Promise<GestcrpAPISecurityPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique sécurité API');
    return this.ensureExists(
      this.appSecurityRepo.apiSecurityPolicies,
      id,
      schoolId,
      'Politique sécurité API',
    );
  }

  async getActiveAPISecurityPolicies(
    schoolId: string,
  ): Promise<PaginatedResult<GestcrpAPISecurityPolicy>> {
    this.validateSchoolId(schoolId);
    return this.appSecurityRepo.findActiveAPISecurityPolicies(schoolId);
  }

  async createAPISecurityPolicy(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpAPISecurityPolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['name', 'description', 'api_path', 'methods', 'authentication'],
      'Politique sécurité API',
    );

    const VALID_AUTH = ['NONE', 'API_KEY', 'BEARER', 'BASIC', 'MUTUAL_TLS'] as const;
    this.validateEnum(data.authentication as string, VALID_AUTH, 'authentication', 'Politique sécurité API');
    this.validateRange(data.rate_limit as number, 1, 100000, 'rate_limit', 'Politique sécurité API');

    const validated = this.validateSchema(createAPISecurityPolicySchema, data, 'Politique sécurité API');

    const existing = await this.appSecurityRepo.apiSecurityPolicies.findAll(schoolId, {
      api_path: validated.api_path,
      limit: 1,
    });
    if (existing.total > 0) {
      throw new GestcrpAPISecurityError(
        `Une politique de sécurité API pour le chemin "${validated.api_path}" existe déjà`,
      );
    }

    return this.appSecurityRepo.apiSecurityPolicies.create(
      {
        name: validated.name,
        description: validated.description,
        enabled: validated.enabled ?? true,
        api_path: validated.api_path,
        methods: validated.methods,
        rate_limit: validated.rate_limit,
        rate_limit_window: validated.rate_limit_window ?? 60,
        authentication: validated.authentication,
        authorization: validated.authorization ?? [],
        input_validation: validated.input_validation ?? [],
        output_encoding: validated.output_encoding ?? 'JSON',
        cors_policy: validated.cors_policy,
        waf_rules: validated.waf_rules ?? [],
      },
      schoolId,
    );
  }

  async updateAPISecurityPolicy(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpAPISecurityPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique sécurité API');

    const existing = await this.ensureExists(
      this.appSecurityRepo.apiSecurityPolicies,
      id,
      schoolId,
      'Politique sécurité API',
    );
    this.validateOwnership(existing, schoolId, 'Politique sécurité API');

    const validated = this.validateSchema(updateAPISecurityPolicySchema, data, 'Politique sécurité API');

    return this.appSecurityRepo.apiSecurityPolicies.update(id, schoolId, validated);
  }

  async deleteAPISecurityPolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique sécurité API');

    const existing = await this.ensureExists(
      this.appSecurityRepo.apiSecurityPolicies,
      id,
      schoolId,
      'Politique sécurité API',
    );
    this.validateOwnership(existing, schoolId, 'Politique sécurité API');

    await this.appSecurityRepo.apiSecurityPolicies.softDelete(id, schoolId);
  }

  // ─── Dependency Scans ────────────────────────────────────────────────────

  async listDependencyScans(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GestcrpDependencyScan>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.appSecurityRepo.dependencyScans.findAll(schoolId, pagination);
  }

  async getDependencyScan(schoolId: string, id: string): Promise<GestcrpDependencyScan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scan dépendances');
    return this.ensureExists(
      this.appSecurityRepo.dependencyScans,
      id,
      schoolId,
      'Scan dépendances',
    );
  }

  async createDependencyScan(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpDependencyScan> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['target'], 'Scan dépendances');

    return this.appSecurityRepo.dependencyScans.create(
      {
        target: data.target as string,
        dependencies: (data.dependencies as Record<string, unknown>[]) ?? [],
        vulnerabilities: (data.vulnerabilities as Record<string, unknown>[]) ?? [],
        completed_at: new Date().toISOString(),
      },
      schoolId,
    );
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getVulnerabilityStats(schoolId: string): Promise<{
    total: number;
    bySeverity: Record<string, number>;
    byStatus: Record<string, number>;
    criticalCount: number;
    exploitableCount: number;
    patchAvailableCount: number;
    averageRiskScore: number;
  }> {
    this.validateSchoolId(schoolId);
    const all = await this.appSecurityRepo.vulnerabilities.findAll(schoolId, { limit: 1000 });
    const bySeverity: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let criticalCount = 0;
    let exploitableCount = 0;
    let patchAvailableCount = 0;
    let totalRiskScore = 0;
    for (const vuln of all.data) {
      bySeverity[vuln.severity] = (bySeverity[vuln.severity] ?? 0) + 1;
      byStatus[vuln.status] = (byStatus[vuln.status] ?? 0) + 1;
      if (vuln.severity === 'CRITICAL') criticalCount++;
      if (vuln.exploit_available) exploitableCount++;
      if (vuln.patch_available) patchAvailableCount++;
      totalRiskScore += vuln.risk_score;
    }
    return { total: all.total, bySeverity, byStatus, criticalCount, exploitableCount, patchAvailableCount, averageRiskScore: all.total > 0 ? totalRiskScore / all.total : 0 };
  }

  async getScanStats(schoolId: string): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    averageDuration: number;
  }> {
    this.validateSchoolId(schoolId);
    const all = await this.appSecurityRepo.scans.findAll(schoolId, { limit: 1000 });
    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let totalDuration = 0;
    let durationCount = 0;
    for (const scan of all.data) {
      byType[scan.scan_type] = (byType[scan.scan_type] ?? 0) + 1;
      byStatus[scan.status] = (byStatus[scan.status] ?? 0) + 1;
      if (scan.duration) {
        totalDuration += scan.duration;
        durationCount++;
      }
    }
    return { total: all.total, byType, byStatus, averageDuration: durationCount > 0 ? totalDuration / durationCount : 0 };
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  private calculateVulnerabilityRiskScore(
    severity: string,
    cvssScore: number | undefined,
    exploitAvailable: boolean,
    patchAvailable: boolean,
  ): number {
    const severityScores: Record<string, number> = {
      INFO: 10,
      LOW: 25,
      MEDIUM: 50,
      HIGH: 75,
      CRITICAL: 90,
    };

    let score = severityScores[severity] ?? 50;

    if (cvssScore !== undefined) {
      score = Math.max(score, cvssScore * 10);
    }

    if (exploitAvailable) {
      score = Math.min(100, score + 10);
    }

    if (patchAvailable) {
      score = Math.max(0, score - 5);
    }

    return Math.round(Math.min(100, Math.max(0, score)));
  }
}

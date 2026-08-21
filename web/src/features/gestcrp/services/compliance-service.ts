import {
  GestcrpComplianceAssessmentError,
  GestcrpGovernancePolicyError,
  GestcrpRiskRegisterError,
  GestcrpAuditLogError,
} from '@educi/errors';
import { createComplianceAssessmentSchema, updateComplianceAssessmentSchema, createGovernancePolicySchema, updateGovernancePolicySchema } from '../validators';
import type { GestcrpComplianceAssessment, GestcrpGovernancePolicy, GestcrpRiskRegister, GestcrpAuditLog, ComplianceRepository } from '../repositories/compliance-repository';
import type { PaginatedResult, PaginationParams } from '../repositories/base-gestcrp-repository';
import { BaseGestcrpService, type GestcrpServiceConfig } from './base-gestcrp-service';

// ============================================================================
// Compliance & Governance Service
// ============================================================================

export class ComplianceService extends BaseGestcrpService {
  constructor(private readonly complianceRepo: ComplianceRepository, config?: GestcrpServiceConfig) {
    super(config);
  }

  // ─── Compliance Assessments ──────────────────────────────────────────────

  async listAssessments(schoolId: string, params: PaginationParams = {}, filters: Record<string, unknown> = {}): Promise<PaginatedResult<GestcrpComplianceAssessment>> {
    this.validateSchoolId(schoolId);
    return this.complianceRepo.assessments.findAll(schoolId, { ...this.validatePagination(params), ...this.sanitizeFilters(filters) });
  }

  async getAssessment(schoolId: string, id: string): Promise<GestcrpComplianceAssessment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Évaluation de conformité');
    return this.ensureExists(
      this.complianceRepo.assessments,
      id,
      schoolId,
      'Évaluation de conformité',
    );
  }

  async createAssessment(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GestcrpComplianceAssessment> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(
      data,
      ['standard', 'name', 'description', 'scope', 'assessor', 'valid_until'],
      'Évaluation de conformité',
    );

    const validated = this.validateSchema(createComplianceAssessmentSchema, data, 'Évaluation de conformité');

    return this.complianceRepo.assessments.create(
      {
        standard: validated.standard,
        name: validated.name,
        description: validated.description,
        status: 'NOT_STARTED',
        scope: validated.scope,
        requirements: validated.requirements ?? [],
        assessment_date: validated.assessment_date ?? new Date().toISOString(),
        assessor: validated.assessor,
        valid_until: validated.valid_until,
        score: validated.score ?? 0,
        max_score: validated.max_score ?? 100,
        findings: validated.findings ?? [],
        recommendations: validated.recommendations ?? [],
        documents: validated.documents ?? [],
      },
      schoolId,
    );
  }

  async updateAssessment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GestcrpComplianceAssessment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Évaluation de conformité');
    const existing = await this.ensureExists(this.complianceRepo.assessments, id, schoolId, 'Évaluation de conformité');
    this.validateOwnership(existing, schoolId, 'Évaluation de conformité');
    if (data.status !== undefined) {
      this.validateEnum(data.status as string, ['NOT_STARTED', 'IN_PROGRESS', 'COMPLIANT', 'PARTIALLY_COMPLIANT', 'NON_COMPLIANT', 'WAIVED'] as const, 'status', 'Évaluation de conformité');
    }
    return this.complianceRepo.assessments.update(id, schoolId, this.validateSchema(updateComplianceAssessmentSchema, data, 'Évaluation de conformité'));
  }

  async completeAssessment(schoolId: string, id: string, score: number, findings: Record<string, unknown>[], recommendations: string[]): Promise<GestcrpComplianceAssessment> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Évaluation de conformité');
    this.validateRange(score, 0, 100, 'score', 'Évaluation de conformité');
    const existing = await this.ensureExists(this.complianceRepo.assessments, id, schoolId, 'Évaluation de conformité');
    this.validateOwnership(existing, schoolId, 'Évaluation de conformité');
    const percentage = (score / (existing.max_score || 100)) * 100;
    const status: GestcrpComplianceAssessment['status'] = percentage >= 90 ? 'COMPLIANT' : percentage >= 70 ? 'PARTIALLY_COMPLIANT' : 'NON_COMPLIANT';
    return this.complianceRepo.assessments.update(id, schoolId, { status, score, findings, recommendations });
  }

  async deleteAssessment(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Évaluation de conformité');
    const existing = await this.ensureExists(this.complianceRepo.assessments, id, schoolId, 'Évaluation de conformité');
    this.validateOwnership(existing, schoolId, 'Évaluation de conformité');
    await this.complianceRepo.assessments.softDelete(id, schoolId);
  }

  // ─── Governance Policies ─────────────────────────────────────────────────

  async listGovernancePolicies(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpGovernancePolicy>> {
    this.validateSchoolId(schoolId);
    return this.complianceRepo.governancePolicies.findAll(schoolId, this.validatePagination(params));
  }

  async getGovernancePolicy(schoolId: string, id: string): Promise<GestcrpGovernancePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de gouvernance');
    return this.ensureExists(this.complianceRepo.governancePolicies, id, schoolId, 'Politique de gouvernance');
  }

  async getActiveGovernancePolicies(schoolId: string): Promise<PaginatedResult<GestcrpGovernancePolicy>> {
    this.validateSchoolId(schoolId);
    return this.complianceRepo.findActiveGovernancePolicies(schoolId);
  }

  async createGovernancePolicy(schoolId: string, data: Record<string, unknown>): Promise<GestcrpGovernancePolicy> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'category', 'version', 'owner', 'effective_date', 'review_date'], 'Politique de gouvernance');
    const validated = this.validateSchema(createGovernancePolicySchema, data, 'Politique de gouvernance');
    const existing = await this.complianceRepo.governancePolicies.findAll(schoolId, { name: validated.name, limit: 1 });
    if (existing.total > 0) throw new GestcrpGovernancePolicyError(`Une politique "${validated.name}" existe déjà`);
    return this.complianceRepo.governancePolicies.create({
      name: validated.name, description: validated.description, category: validated.category, version: validated.version,
      status: 'DRAFT', owner: validated.owner, approver: validated.approver ?? '',
      effective_date: validated.effective_date, review_date: validated.review_date, expiry_date: validated.expiry_date,
      applicable_roles: validated.applicable_roles ?? [], applicable_data: validated.applicable_data ?? [],
      tags: validated.tags ?? [], document_url: validated.document_url,
    }, schoolId);
  }

  async updateGovernancePolicy(schoolId: string, id: string, data: Record<string, unknown>): Promise<GestcrpGovernancePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de gouvernance');
    const existing = await this.ensureExists(this.complianceRepo.governancePolicies, id, schoolId, 'Politique de gouvernance');
    this.validateOwnership(existing, schoolId, 'Politique de gouvernance');
    if (data.status !== undefined) {
      this.validateEnum(data.status as string, ['DRAFT', 'REVIEW', 'APPROVED', 'ACTIVE', 'ARCHIVED', 'DEPRECATED'] as const, 'status', 'Politique de gouvernance');
    }
    return this.complianceRepo.governancePolicies.update(id, schoolId, this.validateSchema(updateGovernancePolicySchema, data, 'Politique de gouvernance'));
  }

  async approveGovernancePolicy(schoolId: string, id: string, approver: string): Promise<GestcrpGovernancePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de gouvernance');
    this.validateId(approver, 'Approveur');

    const existing = await this.ensureExists(
      this.complianceRepo.governancePolicies,
      id,
      schoolId,
      'Politique de gouvernance',
    );
    this.validateOwnership(existing, schoolId, 'Politique de gouvernance');

    if (existing.status !== 'REVIEW') {
      throw new GestcrpGovernancePolicyError(
        `La politique ne peut pas être approuvée depuis le statut "${existing.status}"`,
      );
    }

    return this.complianceRepo.governancePolicies.update(id, schoolId, {
      status: 'APPROVED',
      approver,
    });
  }

  async activateGovernancePolicy(schoolId: string, id: string): Promise<GestcrpGovernancePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de gouvernance');
    const existing = await this.ensureExists(this.complianceRepo.governancePolicies, id, schoolId, 'Politique de gouvernance');
    this.validateOwnership(existing, schoolId, 'Politique de gouvernance');
    if (existing.status !== 'APPROVED') throw new GestcrpGovernancePolicyError(`Ne peut être activée depuis "${existing.status}"`);
    return this.complianceRepo.governancePolicies.update(id, schoolId, { status: 'ACTIVE', effective_date: new Date().toISOString() });
  }

  async deleteGovernancePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de gouvernance');
    const existing = await this.ensureExists(this.complianceRepo.governancePolicies, id, schoolId, 'Politique de gouvernance');
    this.validateOwnership(existing, schoolId, 'Politique de gouvernance');
    await this.complianceRepo.governancePolicies.softDelete(id, schoolId);
  }

  // ─── Risk Register ───────────────────────────────────────────────────────

  async listRisks(schoolId: string, params: PaginationParams = {}, filters: Record<string, unknown> = {}): Promise<PaginatedResult<GestcrpRiskRegister>> {
    this.validateSchoolId(schoolId);
    return this.complianceRepo.riskRegisters.findAll(schoolId, { ...this.validatePagination(params), ...this.sanitizeFilters(filters) });
  }

  async getRisk(schoolId: string, id: string): Promise<GestcrpRiskRegister> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Risque');
    return this.ensureExists(this.complianceRepo.riskRegisters, id, schoolId, 'Risque');
  }

  async getOpenRisks(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpRiskRegister>> {
    this.validateSchoolId(schoolId);
    return this.complianceRepo.findOpenRisks(schoolId, params);
  }

  async createRisk(schoolId: string, data: Record<string, unknown>): Promise<GestcrpRiskRegister> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'category', 'likelihood', 'impact', 'owner', 'treatment_plan'], 'Risque');
    this.validateRange(data.likelihood as number, 1, 5, 'likelihood', 'Risque');
    this.validateRange(data.impact as number, 1, 5, 'impact', 'Risque');
    const existing = await this.complianceRepo.riskRegisters.findAll(schoolId, { name: data.name as string, limit: 1 });
    if (existing.total > 0) throw new GestcrpRiskRegisterError(`Un risque "${data.name}" existe déjà`);
    const riskScore = (data.likelihood as number) * (data.impact as number);
    const riskLevel: GestcrpRiskRegister['risk_level'] = riskScore >= 20 ? 'CRITICAL' : riskScore >= 12 ? 'HIGH' : riskScore >= 6 ? 'MEDIUM' : 'LOW';
    return this.complianceRepo.riskRegisters.create({
      name: data.name as string, description: data.description as string, category: data.category as string,
      likelihood: data.likelihood as number, impact: data.impact as number, risk_score: riskScore, risk_level: riskLevel,
      status: 'IDENTIFIED', owner: data.owner as string, controls: (data.controls as string[]) ?? [],
      treatment_plan: data.treatment_plan as string, last_assessed_at: new Date().toISOString(),
      next_assessment_date: (data.next_assessment_date as string) ?? new Date().toISOString(),
    }, schoolId);
  }

  async updateRisk(schoolId: string, id: string, data: Record<string, unknown>): Promise<GestcrpRiskRegister> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Risque');
    const existing = await this.ensureExists(this.complianceRepo.riskRegisters, id, schoolId, 'Risque');
    this.validateOwnership(existing, schoolId, 'Risque');
    if (data.status !== undefined) this.validateEnum(data.status as string, ['IDENTIFIED', 'ANALYZED', 'TREATED', 'MONITORED', 'CLOSED'] as const, 'status', 'Risque');
    const updateData: Record<string, unknown> = { ...data };
    if (data.likelihood !== undefined || data.impact !== undefined) {
      const likelihood = (data.likelihood as number) ?? existing.likelihood;
      const impact = (data.impact as number) ?? existing.impact;
      this.validateRange(likelihood, 1, 5, 'likelihood', 'Risque');
      this.validateRange(impact, 1, 5, 'impact', 'Risque');
      const riskScore = likelihood * impact;
      updateData.risk_score = riskScore;
      updateData.risk_level = riskScore >= 20 ? 'CRITICAL' : riskScore >= 12 ? 'HIGH' : riskScore >= 6 ? 'MEDIUM' : 'LOW';
    }
    updateData.last_assessed_at = new Date().toISOString();
    return this.complianceRepo.riskRegisters.update(id, schoolId, updateData);
  }

  async deleteRisk(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Risque');
    const existing = await this.ensureExists(this.complianceRepo.riskRegisters, id, schoolId, 'Risque');
    this.validateOwnership(existing, schoolId, 'Risque');
    await this.complianceRepo.riskRegisters.softDelete(id, schoolId);
  }

  // ─── Audit Logs ──────────────────────────────────────────────────────────

  async listAuditLogs(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpAuditLog>> {
    this.validateSchoolId(schoolId);
    return this.complianceRepo.auditLogs.findAll(schoolId, this.validatePagination(params));
  }

  async getAuditLog(schoolId: string, id: string): Promise<GestcrpAuditLog> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Journal d\'audit');
    return this.ensureExists(this.complianceRepo.auditLogs, id, schoolId, 'Journal d\'audit');
  }

  async getRecentAuditLogs(schoolId: string, params: PaginationParams = {}): Promise<PaginatedResult<GestcrpAuditLog>> {
    this.validateSchoolId(schoolId);
    return this.complianceRepo.findRecentAuditLogs(schoolId, params);
  }

  async createAuditLog(schoolId: string, data: Record<string, unknown>): Promise<GestcrpAuditLog> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['action', 'actor', 'actor_type', 'resource', 'resource_id', 'result'], 'Journal d\'audit');
    this.validateEnum(data.actor_type as string, ['USER', 'SYSTEM', 'API', 'SERVICE'] as const, 'actor_type', 'Journal d\'audit');
    this.validateEnum(data.result as string, ['SUCCESS', 'FAILURE'] as const, 'result', 'Journal d\'audit');
    try {
      return await this.complianceRepo.auditLogs.create({
        action: data.action as string, actor: data.actor as string,
        actor_type: data.actor_type as GestcrpAuditLog['actor_type'],
        resource: data.resource as string, resource_id: data.resource_id as string,
        details: (data.details as Record<string, unknown>) ?? {},
        ip_address: (data.ip_address as string) ?? '', user_agent: (data.user_agent as string) ?? '',
        result: data.result as GestcrpAuditLog['result'],
        timestamp: (data.timestamp as string) ?? new Date().toISOString(),
      }, schoolId);
    } catch (error) {
      throw new GestcrpAuditLogError(`Erreur création journal d'audit: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  async getComplianceStats(schoolId: string): Promise<{ totalAssessments: number; compliant: number; partiallyCompliant: number; nonCompliant: number; overallScore: number }> {
    this.validateSchoolId(schoolId);
    const all = await this.complianceRepo.assessments.findAll(schoolId, { limit: 1000 });
    const compliant = all.data.filter((a) => a.status === 'COMPLIANT').length;
    const partiallyCompliant = all.data.filter((a) => a.status === 'PARTIALLY_COMPLIANT').length;
    const nonCompliant = all.data.filter((a) => a.status === 'NON_COMPLIANT').length;
    const overallScore = all.total > 0 ? all.data.reduce((sum, a) => sum + (a.score / a.max_score) * 100, 0) / all.total : 0;
    return { totalAssessments: all.total, compliant, partiallyCompliant, nonCompliant, overallScore };
  }

  async getRiskStats(schoolId: string): Promise<{ total: number; open: number; closed: number; byLevel: Record<string, number>; byStatus: Record<string, number>; averageScore: number }> {
    this.validateSchoolId(schoolId);
    const all = await this.complianceRepo.riskRegisters.findAll(schoolId, { limit: 1000 });
    const byLevel: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let totalScore = 0;
    for (const risk of all.data) {
      byLevel[risk.risk_level] = (byLevel[risk.risk_level] ?? 0) + 1;
      byStatus[risk.status] = (byStatus[risk.status] ?? 0) + 1;
      totalScore += risk.risk_score;
    }
    const open = all.data.filter((r) => r.status !== 'CLOSED').length;
    return { total: all.total, open, closed: all.total - open, byLevel, byStatus, averageScore: all.total > 0 ? totalScore / all.total : 0 };
  }

  async getGovernanceStats(schoolId: string): Promise<{ total: number; active: number; draft: number; archived: number; byCategory: Record<string, number> }> {
    this.validateSchoolId(schoolId);
    const all = await this.complianceRepo.governancePolicies.findAll(schoolId, { limit: 1000 });
    const byCategory: Record<string, number> = {};
    for (const policy of all.data) { byCategory[policy.category] = (byCategory[policy.category] ?? 0) + 1; }
    return { total: all.total, active: all.data.filter((p) => p.status === 'ACTIVE').length, draft: all.data.filter((p) => p.status === 'DRAFT').length, archived: all.data.filter((p) => p.status === 'ARCHIVED').length, byCategory };
  }
}

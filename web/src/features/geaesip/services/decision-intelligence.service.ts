import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipDecision,
  GeaesipDecisionOption,
  GeaesipDecisionApproval,
  GeaesipDecisionAudit,
} from '@educi/types';
import {
  GeaesipDecisionRepository,
  GeaesipDecisionOptionRepository,
  GeaesipDecisionApprovalRepository,
  GeaesipDecisionAuditRepository,
} from '../repositories/decision-intelligence.repository';

// ============================================================================
// Decision Intelligence Service
// ============================================================================

export class GeaesipDecisionIntelligenceService {
  constructor(
    private readonly decisionRepo = new GeaesipDecisionRepository(),
    private readonly optionRepo = new GeaesipDecisionOptionRepository(),
    private readonly approvalRepo = new GeaesipDecisionApprovalRepository(),
    private readonly auditRepo = new GeaesipDecisionAuditRepository(),
  ) {}

  private validateSchoolId(schoolId: string): void {
    if (!schoolId || typeof schoolId !== 'string' || schoolId.trim().length === 0) {
      throw new ValidationError('school_id est requis');
    }
  }

  private validateId(id: string, entityName: string): void {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new ValidationError(`${entityName} id est requis`);
    }
  }

  // ─── Decisions ────────────────────────────────────────────────────────────

  async listDecisions(schoolId: string): Promise<GeaesipDecision[]> {
    this.validateSchoolId(schoolId);
    return this.decisionRepo.findAllBySchool(schoolId);
  }

  async getDecision(schoolId: string, id: string): Promise<GeaesipDecision> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Décision');
    const entity = await this.decisionRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Décision', id);
    }
    return entity;
  }

  async createDecision(
    schoolId: string,
    data: Omit<GeaesipDecision, 'id' | 'createdAt' | 'updatedAt' | 'selectedOption'>,
  ): Promise<GeaesipDecision> {
    this.validateSchoolId(schoolId);
    return this.decisionRepo.create({ ...data, school_id: schoolId });
  }

  async selectOption(
    schoolId: string,
    id: string,
    optionId: string,
  ): Promise<GeaesipDecision> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Décision');
    await this.getDecision(schoolId, id);
    return this.decisionRepo.update(id, { selectedOption: optionId });
  }

  async updateDecision(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipDecision, 'id' | 'createdAt'>>,
  ): Promise<GeaesipDecision> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Décision');
    await this.getDecision(schoolId, id);
    return this.decisionRepo.update(id, data);
  }

  async deleteDecision(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Décision');
    await this.getDecision(schoolId, id);
    await this.decisionRepo.delete(id);
  }

  // ─── Decision Options ─────────────────────────────────────────────────────

  async listOptions(schoolId: string): Promise<GeaesipDecisionOption[]> {
    this.validateSchoolId(schoolId);
    return this.optionRepo.findAllBySchool(schoolId);
  }

  async getOption(schoolId: string, id: string): Promise<GeaesipDecisionOption> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Option');
    const entity = await this.optionRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Option', id);
    }
    return entity;
  }

  async createOption(
    schoolId: string,
    data: Omit<GeaesipDecisionOption, 'id'>,
  ): Promise<GeaesipDecisionOption> {
    this.validateSchoolId(schoolId);
    return this.optionRepo.create({ ...data, school_id: schoolId });
  }

  async updateOption(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipDecisionOption, 'id'>>,
  ): Promise<GeaesipDecisionOption> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Option');
    await this.getOption(schoolId, id);
    return this.optionRepo.update(id, data);
  }

  async deleteOption(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Option');
    await this.getOption(schoolId, id);
    await this.optionRepo.delete(id);
  }

  // ─── Decision Approvals ───────────────────────────────────────────────────

  async listApprovals(schoolId: string): Promise<GeaesipDecisionApproval[]> {
    this.validateSchoolId(schoolId);
    return this.approvalRepo.findAllBySchool(schoolId);
  }

  async getApproval(schoolId: string, id: string): Promise<GeaesipDecisionApproval> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Approbation');
    const entity = await this.approvalRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Approbation', id);
    }
    return entity;
  }

  async createApproval(
    schoolId: string,
    data: Omit<GeaesipDecisionApproval, 'id' | 'timestamp'>,
  ): Promise<GeaesipDecisionApproval> {
    this.validateSchoolId(schoolId);
    return this.approvalRepo.create({ ...data, school_id: schoolId });
  }

  async updateApproval(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipDecisionApproval, 'id' | 'timestamp'>>,
  ): Promise<GeaesipDecisionApproval> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Approbation');
    await this.getApproval(schoolId, id);
    return this.approvalRepo.update(id, data);
  }

  async deleteApproval(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Approbation');
    await this.getApproval(schoolId, id);
    await this.approvalRepo.delete(id);
  }

  // ─── Decision Audits ──────────────────────────────────────────────────────

  async listAudits(schoolId: string): Promise<GeaesipDecisionAudit[]> {
    this.validateSchoolId(schoolId);
    return this.auditRepo.findAllBySchool(schoolId);
  }

  async getAudit(schoolId: string, id: string): Promise<GeaesipDecisionAudit> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Audit');
    const entity = await this.auditRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Audit', id);
    }
    return entity;
  }

  async createAudit(
    schoolId: string,
    data: Omit<GeaesipDecisionAudit, 'id' | 'timestamp'>,
  ): Promise<GeaesipDecisionAudit> {
    this.validateSchoolId(schoolId);
    return this.auditRepo.create({ ...data, school_id: schoolId });
  }

  async deleteAudit(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Audit');
    await this.getAudit(schoolId, id);
    await this.auditRepo.delete(id);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getDecisionIntelligenceStats(schoolId: string) {
    this.validateSchoolId(schoolId);

    const decisions = await this.decisionRepo.findAllBySchool(schoolId);
    const options = await this.optionRepo.findAllBySchool(schoolId);
    const approvals = await this.approvalRepo.findAllBySchool(schoolId);
    const audits = await this.auditRepo.findAllBySchool(schoolId);
    const decided = decisions.filter((d) => d.selectedOption !== null);

    return {
      totalDecisions: decisions.length,
      decidedCount: decided.length,
      totalOptions: options.length,
      totalApprovals: approvals.length,
      totalAudits: audits.length,
    };
  }
}

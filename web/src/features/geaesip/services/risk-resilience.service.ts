import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipRiskRegistry,
  GeaesipRiskMatrix,
  GeaesipEarlyWarning,
  GeaesipMitigationPlan,
} from '@educi/types';
import {
  GeaesipRiskRegistryRepository,
  GeaesipRiskMatrixRepository,
  GeaesipEarlyWarningRepository,
  GeaesipMitigationPlanRepository,
} from '../repositories/risk-resilience.repository';

// ============================================================================
// Risk & Resilience Service
// ============================================================================

export class GeaesipRiskResilienceService {
  constructor(
    private readonly registryRepo = new GeaesipRiskRegistryRepository(),
    private readonly matrixRepo = new GeaesipRiskMatrixRepository(),
    private readonly warningRepo = new GeaesipEarlyWarningRepository(),
    private readonly mitigationRepo = new GeaesipMitigationPlanRepository(),
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

  // ─── Risk Registry ────────────────────────────────────────────────────────

  async listRisks(schoolId: string): Promise<GeaesipRiskRegistry[]> {
    this.validateSchoolId(schoolId);
    return this.registryRepo.findAllBySchool(schoolId);
  }

  async getRisk(schoolId: string, id: string): Promise<GeaesipRiskRegistry> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Risque');
    const entity = await this.registryRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Risque', id);
    }
    return entity;
  }

  async createRisk(
    schoolId: string,
    data: Omit<GeaesipRiskRegistry, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<GeaesipRiskRegistry> {
    this.validateSchoolId(schoolId);
    return this.registryRepo.create({ ...data, school_id: schoolId });
  }

  async updateRisk(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipRiskRegistry, 'id' | 'createdAt'>>,
  ): Promise<GeaesipRiskRegistry> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Risque');
    await this.getRisk(schoolId, id);
    return this.registryRepo.update(id, data);
  }

  async deleteRisk(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Risque');
    await this.getRisk(schoolId, id);
    await this.registryRepo.delete(id);
  }

  // ─── Risk Matrices ────────────────────────────────────────────────────────

  async listMatrices(schoolId: string): Promise<GeaesipRiskMatrix[]> {
    this.validateSchoolId(schoolId);
    return this.matrixRepo.findAllBySchool(schoolId);
  }

  async getMatrix(schoolId: string, id: string): Promise<GeaesipRiskMatrix> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Matrice de risque');
    const entity = await this.matrixRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Matrice de risque', id);
    }
    return entity;
  }

  async createMatrix(
    schoolId: string,
    data: Omit<GeaesipRiskMatrix, 'id' | 'computedAt'>,
  ): Promise<GeaesipRiskMatrix> {
    this.validateSchoolId(schoolId);
    return this.matrixRepo.create({ ...data, school_id: schoolId });
  }

  async updateMatrix(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipRiskMatrix, 'id' | 'computedAt'>>,
  ): Promise<GeaesipRiskMatrix> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Matrice de risque');
    await this.getMatrix(schoolId, id);
    return this.matrixRepo.update(id, data);
  }

  async deleteMatrix(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Matrice de risque');
    await this.getMatrix(schoolId, id);
    await this.matrixRepo.delete(id);
  }

  // ─── Early Warnings ───────────────────────────────────────────────────────

  async listWarnings(schoolId: string): Promise<GeaesipEarlyWarning[]> {
    this.validateSchoolId(schoolId);
    return this.warningRepo.findAllBySchool(schoolId);
  }

  async getWarning(schoolId: string, id: string): Promise<GeaesipEarlyWarning> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alerte précoce');
    const entity = await this.warningRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Alerte précoce', id);
    }
    return entity;
  }

  async createWarning(
    schoolId: string,
    data: Omit<GeaesipEarlyWarning, 'id' | 'timestamp'>,
  ): Promise<GeaesipEarlyWarning> {
    this.validateSchoolId(schoolId);
    return this.warningRepo.create({ ...data, school_id: schoolId });
  }

  async updateWarning(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipEarlyWarning, 'id' | 'timestamp'>>,
  ): Promise<GeaesipEarlyWarning> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alerte précoce');
    await this.getWarning(schoolId, id);
    return this.warningRepo.update(id, data);
  }

  async deleteWarning(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Alerte précoce');
    await this.getWarning(schoolId, id);
    await this.warningRepo.delete(id);
  }

  // ─── Mitigation Plans ─────────────────────────────────────────────────────

  async listMitigationPlans(schoolId: string): Promise<GeaesipMitigationPlan[]> {
    this.validateSchoolId(schoolId);
    return this.mitigationRepo.findAllBySchool(schoolId);
  }

  async getMitigationPlan(schoolId: string, id: string): Promise<GeaesipMitigationPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de mitigation');
    const entity = await this.mitigationRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Plan de mitigation', id);
    }
    return entity;
  }

  async createMitigationPlan(
    schoolId: string,
    data: Omit<GeaesipMitigationPlan, 'id' | 'createdAt'>,
  ): Promise<GeaesipMitigationPlan> {
    this.validateSchoolId(schoolId);
    return this.mitigationRepo.create({ ...data, school_id: schoolId });
  }

  async updateMitigationPlan(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipMitigationPlan, 'id' | 'createdAt'>>,
  ): Promise<GeaesipMitigationPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de mitigation');
    await this.getMitigationPlan(schoolId, id);
    return this.mitigationRepo.update(id, data);
  }

  async deleteMitigationPlan(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan de mitigation');
    await this.getMitigationPlan(schoolId, id);
    await this.mitigationRepo.delete(id);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getRiskResilienceStats(schoolId: string) {
    this.validateSchoolId(schoolId);

    const risks = await this.registryRepo.findAllBySchool(schoolId);
    const matrices = await this.matrixRepo.findAllBySchool(schoolId);
    const warnings = await this.warningRepo.findAllBySchool(schoolId);
    const mitigations = await this.mitigationRepo.findAllBySchool(schoolId);
    const activeWarnings = warnings.filter((w) => w.status === 'active');

    return {
      totalRisks: risks.length,
      totalMatrices: matrices.length,
      totalWarnings: warnings.length,
      activeWarnings: activeWarnings.length,
      totalMitigationPlans: mitigations.length,
    };
  }
}

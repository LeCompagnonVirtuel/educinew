import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipScenario,
  GeaesipScenarioRun,
  GeaesipScenarioComparison,
} from '@educi/types';
import {
  GeaesipScenarioRepository,
  GeaesipScenarioRunRepository,
  GeaesipScenarioComparisonRepository,
} from '../repositories/scenario-simulator.repository';

// ============================================================================
// Scenario Simulator Service
// ============================================================================

export class GeaesipScenarioSimulatorService {
  constructor(
    private readonly scenarioRepo = new GeaesipScenarioRepository(),
    private readonly runRepo = new GeaesipScenarioRunRepository(),
    private readonly comparisonRepo = new GeaesipScenarioComparisonRepository(),
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

  // ─── Scenarios ────────────────────────────────────────────────────────────

  async listScenarios(schoolId: string): Promise<GeaesipScenario[]> {
    this.validateSchoolId(schoolId);
    return this.scenarioRepo.findAllBySchool(schoolId);
  }

  async getScenario(schoolId: string, id: string): Promise<GeaesipScenario> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scénario');
    const entity = await this.scenarioRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Scénario', id);
    }
    return entity;
  }

  async createScenario(
    schoolId: string,
    data: Omit<GeaesipScenario, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<GeaesipScenario> {
    this.validateSchoolId(schoolId);
    return this.scenarioRepo.create({ ...data, school_id: schoolId });
  }

  async updateScenario(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipScenario, 'id' | 'createdAt'>>,
  ): Promise<GeaesipScenario> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scénario');
    await this.getScenario(schoolId, id);
    return this.scenarioRepo.update(id, data);
  }

  async deleteScenario(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scénario');
    await this.getScenario(schoolId, id);
    await this.scenarioRepo.delete(id);
  }

  // ─── Scenario Runs ────────────────────────────────────────────────────────

  async listRuns(schoolId: string): Promise<GeaesipScenarioRun[]> {
    this.validateSchoolId(schoolId);
    return this.runRepo.findAllBySchool(schoolId);
  }

  async getRun(schoolId: string, id: string): Promise<GeaesipScenarioRun> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution');
    const entity = await this.runRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Exécution', id);
    }
    return entity;
  }

  async createRun(
    schoolId: string,
    data: Omit<GeaesipScenarioRun, 'id' | 'createdAt' | 'completedAt' | 'results' | 'impacts' | 'risks' | 'costs' | 'benefits' | 'probabilities' | 'timeline' | 'recommendations'>,
  ): Promise<GeaesipScenarioRun> {
    this.validateSchoolId(schoolId);
    return this.runRepo.create({ ...data, school_id: schoolId });
  }

  async completeRun(
    schoolId: string,
    id: string,
    data: { results: Record<string, unknown>; impacts: Record<string, unknown>; risks: string[] },
  ): Promise<GeaesipScenarioRun> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution');
    await this.getRun(schoolId, id);
    return this.runRepo.update(id, {
      completedAt: new Date().toISOString(),
      ...data,
    });
  }

  async deleteRun(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution');
    await this.getRun(schoolId, id);
    await this.runRepo.delete(id);
  }

  // ─── Scenario Comparisons ─────────────────────────────────────────────────

  async listComparisons(schoolId: string): Promise<GeaesipScenarioComparison[]> {
    this.validateSchoolId(schoolId);
    return this.comparisonRepo.findAllBySchool(schoolId);
  }

  async getComparison(schoolId: string, id: string): Promise<GeaesipScenarioComparison> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Comparaison');
    const entity = await this.comparisonRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Comparaison', id);
    }
    return entity;
  }

  async createComparison(
    schoolId: string,
    data: Omit<GeaesipScenarioComparison, 'id' | 'createdAt'>,
  ): Promise<GeaesipScenarioComparison> {
    this.validateSchoolId(schoolId);
    return this.comparisonRepo.create({ ...data, school_id: schoolId });
  }

  async updateComparison(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipScenarioComparison, 'id' | 'createdAt'>>,
  ): Promise<GeaesipScenarioComparison> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Comparaison');
    await this.getComparison(schoolId, id);
    return this.comparisonRepo.update(id, data);
  }

  async deleteComparison(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Comparaison');
    await this.getComparison(schoolId, id);
    await this.comparisonRepo.delete(id);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getScenarioSimulatorStats(schoolId: string) {
    this.validateSchoolId(schoolId);

    const scenarios = await this.scenarioRepo.findAllBySchool(schoolId);
    const runs = await this.runRepo.findAllBySchool(schoolId);
    const comparisons = await this.comparisonRepo.findAllBySchool(schoolId);
    const completedRuns = runs.filter((r) => r.completedAt !== null);

    return {
      totalScenarios: scenarios.length,
      totalRuns: runs.length,
      completedRuns: completedRuns.length,
      totalComparisons: comparisons.length,
    };
  }
}

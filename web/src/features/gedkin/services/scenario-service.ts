import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createScenarioSchema,
  updateScenarioSchema,
  createScenarioRunSchema,
  updateScenarioRunSchema,
  createSimulationResultSchema,
  updateSimulationResultSchema,
  createSensitivityAnalysisSchema,
  updateSensitivityAnalysisSchema,
} from '../validators/gedkin';
import type {
  GedkinScenario,
  GedkinScenarioRun,
  GedkinSimulationResult,
  GedkinSensitivityAnalysis,
} from '@educi/types';
import type {
  GedkinScenarioRepository,
  GedkinScenarioRunRepository,
  GedkinSimulationResultRepository,
  GedkinSensitivityAnalysisRepository,
} from '../repositories/scenario-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Scenario Service
// ============================================================================

export class ScenarioService extends BaseGedkinService {
  constructor(
    private readonly scenarioRepo: GedkinScenarioRepository,
    private readonly runRepo: GedkinScenarioRunRepository,
    private readonly resultRepo: GedkinSimulationResultRepository,
    private readonly sensitivityRepo: GedkinSensitivityAnalysisRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  // ─── Scenarios ───────────────────────────────────────────────────────────

  async listScenarios(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinScenario>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.scenarioRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getScenario(schoolId: string, id: string): Promise<GedkinScenario> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scénario');
    return this.ensureExists(this.scenarioRepo, id, schoolId, 'Scénario');
  }

  async createScenario(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinScenario> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['simulationId', 'name', 'type', 'description', 'assumptions', 'parameters'], 'Scénario');

    const validated = this.validateSchema(createScenarioSchema, data, 'Scénario');

    return this.scenarioRepo.create(
      {
        simulationId: validated.simulationId,
        name: validated.name,
        type: validated.type,
        description: validated.description,
        assumptions: validated.assumptions,
        parameters: validated.parameters,
      },
      schoolId,
    );
  }

  async updateScenario(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinScenario> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scénario');

    const existing = await this.ensureExists(this.scenarioRepo, id, schoolId, 'Scénario');
    this.validateOwnership(existing, schoolId, 'Scénario');

    const validated = this.validateSchema(updateScenarioSchema, data, 'Scénario');
    return this.scenarioRepo.update(id, schoolId, validated);
  }

  async deleteScenario(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scénario');

    const existing = await this.ensureExists(this.scenarioRepo, id, schoolId, 'Scénario');
    this.validateOwnership(existing, schoolId, 'Scénario');

    await this.scenarioRepo.softDelete(id, schoolId);
  }

  async listBySimulation(
    schoolId: string,
    simulationId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinScenario>> {
    this.validateSchoolId(schoolId);
    return this.scenarioRepo.findBySimulationId(simulationId, schoolId, this.validatePagination(params));
  }

  async listByType(
    schoolId: string,
    type: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinScenario>> {
    this.validateSchoolId(schoolId);
    return this.scenarioRepo.findByType(type, schoolId, this.validatePagination(params));
  }

  // ─── Scenario Runs ───────────────────────────────────────────────────────

  async listRuns(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinScenarioRun>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.runRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getRun(schoolId: string, id: string): Promise<GedkinScenarioRun> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution de scénario');
    return this.ensureExists(this.runRepo, id, schoolId, 'Exécution de scénario');
  }

  async createRun(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinScenarioRun> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['scenarioId', 'status', 'results', 'duration'], 'Exécution de scénario');

    const validated = this.validateSchema(createScenarioRunSchema, data, 'Exécution de scénario');

    return this.runRepo.create(
      {
        scenarioId: validated.scenarioId,
        status: validated.status,
        results: validated.results,
        duration: validated.duration,
        startedAt: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateRun(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinScenarioRun> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution de scénario');

    const existing = await this.ensureExists(this.runRepo, id, schoolId, 'Exécution de scénario');
    this.validateOwnership(existing, schoolId, 'Exécution de scénario');

    const validated = this.validateSchema(updateScenarioRunSchema, data, 'Exécution de scénario');
    return this.runRepo.update(id, schoolId, validated);
  }

  async deleteRun(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Exécution de scénario');

    const existing = await this.ensureExists(this.runRepo, id, schoolId, 'Exécution de scénario');
    this.validateOwnership(existing, schoolId, 'Exécution de scénario');

    await this.runRepo.softDelete(id, schoolId);
  }

  async listByScenario(
    schoolId: string,
    scenarioId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinScenarioRun>> {
    this.validateSchoolId(schoolId);
    return this.runRepo.findByScenarioId(scenarioId, schoolId, this.validatePagination(params));
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinScenarioRun>> {
    this.validateSchoolId(schoolId);
    return this.runRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  // ─── Simulation Results ──────────────────────────────────────────────────

  async listResults(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinSimulationResult>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.resultRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getResult(schoolId: string, id: string): Promise<GedkinSimulationResult> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Résultat de simulation');
    return this.ensureExists(this.resultRepo, id, schoolId, 'Résultat de simulation');
  }

  async createResult(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinSimulationResult> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['runId', 'dimension', 'baselineValue', 'scenarioValue', 'impact', 'confidence'], 'Résultat de simulation');

    const validated = this.validateSchema(createSimulationResultSchema, data, 'Résultat de simulation');
    this.validateRange(validated.confidence, 0, 1, 'confidence', 'Résultat de simulation');

    return this.resultRepo.create(
      {
        runId: validated.runId,
        dimension: validated.dimension,
        baselineValue: validated.baselineValue,
        scenarioValue: validated.scenarioValue,
        impact: validated.impact,
        confidence: validated.confidence,
      },
      schoolId,
    );
  }

  async deleteResult(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Résultat de simulation');

    const existing = await this.ensureExists(this.resultRepo, id, schoolId, 'Résultat de simulation');
    this.validateOwnership(existing, schoolId, 'Résultat de simulation');

    await this.resultRepo.softDelete(id, schoolId);
  }

  async listByRun(
    schoolId: string,
    runId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinSimulationResult>> {
    this.validateSchoolId(schoolId);
    return this.resultRepo.findByRunId(runId, schoolId, this.validatePagination(params));
  }

  // ─── Sensitivity Analysis ────────────────────────────────────────────────

  async listSensitivityAnalyses(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinSensitivityAnalysis>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.sensitivityRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSensitivityAnalysis(schoolId: string, id: string): Promise<GedkinSensitivityAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Analyse de sensibilité');
    return this.ensureExists(this.sensitivityRepo, id, schoolId, 'Analyse de sensibilité');
  }

  async createSensitivityAnalysis(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinSensitivityAnalysis> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['simulationId', 'parameter', 'range', 'impact', 'sensitivity'], 'Analyse de sensibilité');

    const validated = this.validateSchema(createSensitivityAnalysisSchema, data, 'Analyse de sensibilité');

    return this.sensitivityRepo.create(
      {
        simulationId: validated.simulationId,
        parameter: validated.parameter,
        range: validated.range,
        impact: validated.impact,
        sensitivity: validated.sensitivity,
      },
      schoolId,
    );
  }

  async deleteSensitivityAnalysis(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Analyse de sensibilité');

    const existing = await this.ensureExists(this.sensitivityRepo, id, schoolId, 'Analyse de sensibilité');
    this.validateOwnership(existing, schoolId, 'Analyse de sensibilité');

    await this.sensitivityRepo.softDelete(id, schoolId);
  }

  async listBySimulationForSensitivity(
    schoolId: string,
    simulationId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinSensitivityAnalysis>> {
    this.validateSchoolId(schoolId);
    return this.sensitivityRepo.findBySimulationId(simulationId, schoolId, this.validatePagination(params));
  }

  async getScenarioStats(
    schoolId: string,
  ): Promise<{
    totalScenarios: number;
    totalRuns: number;
    totalResults: number;
    totalSensitivityAnalyses: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
  }> {
    this.validateSchoolId(schoolId);

    const scenarios = await this.scenarioRepo.findAll(schoolId, { limit: 1000 });
    const runs = await this.runRepo.findAll(schoolId, { limit: 1000 });
    const results = await this.resultRepo.findAll(schoolId, { limit: 1000 });
    const sensitivityAnalyses = await this.sensitivityRepo.findAll(schoolId, { limit: 1000 });

    const byType: Record<string, number> = {};
    for (const scenario of scenarios.data) {
      byType[scenario.type] = (byType[scenario.type] ?? 0) + 1;
    }

    const byStatus: Record<string, number> = {};
    for (const run of runs.data) {
      byStatus[run.status] = (byStatus[run.status] ?? 0) + 1;
    }

    return {
      totalScenarios: scenarios.total,
      totalRuns: runs.total,
      totalResults: results.total,
      totalSensitivityAnalyses: sensitivityAnalyses.total,
      byType,
      byStatus,
    };
  }
}
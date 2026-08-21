import {
  createTwinSimulationSchema,
  updateTwinSimulationSchema,
  createTwinScenarioSchema,
  updateTwinScenarioSchema,
  createTwinResultSchema,
} from '../validators/digital-twin';
import type {
  GecirapTwinSimulation,
  GecirapTwinScenario,
  GecirapTwinResult,
  TwinSimulationRepository,
  TwinScenarioRepository,
  TwinResultRepository,
  InfrastructureTwinRepository,
} from '../repositories/digital-twin-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gecirap-repository';
import { BaseGecirapService, type GecirapServiceConfig } from './base-gecirap-service';

// ============================================================================
// Simulation Service
// ============================================================================

export class SimulationService extends BaseGecirapService {
  constructor(
    private readonly simulationRepo: TwinSimulationRepository,
    private readonly scenarioRepo: TwinScenarioRepository,
    private readonly resultRepo: TwinResultRepository,
    private readonly twinRepo: InfrastructureTwinRepository,
    config?: GecirapServiceConfig,
  ) {
    super(config);
  }

  // -- Simulations -----------------------------------------------------------

  async listSimulations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapTwinSimulation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.simulationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSimulation(schoolId: string, id: string): Promise<GecirapTwinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation jumeau');
    return this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation jumeau');
  }

  async createSimulation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapTwinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['twinId', 'name', 'type'], 'Simulation jumeau');

    const validated = this.validateSchema(createTwinSimulationSchema, data, 'Simulation jumeau');

    await this.ensureExists(this.twinRepo, validated.twinId, schoolId, 'Jumeau numerique');

    return this.simulationRepo.create(
      {
        twin_id: validated.twinId,
        simulation_name: validated.name,
        simulation_type: validated.type,
        parameters: validated.parameters ?? {},
        status: validated.status ?? 'DRAFT',
        started_at: undefined,
        completed_at: undefined,
        error_message: undefined,
        metadata: undefined,
      },
      schoolId,
    );
  }

  async updateSimulation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapTwinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation jumeau');

    const existing = await this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation jumeau');
    this.validateOwnership(existing, schoolId, 'Simulation jumeau');

    const validated = this.validateSchema(updateTwinSimulationSchema, data, 'Simulation jumeau');
    return this.simulationRepo.update(id, schoolId, validated);
  }

  async deleteSimulation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation jumeau');

    const existing = await this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation jumeau');
    this.validateOwnership(existing, schoolId, 'Simulation jumeau');

    await this.simulationRepo.softDelete(id, schoolId);
  }

  async listRunningSimulations(schoolId: string): Promise<GecirapTwinSimulation[]> {
    this.validateSchoolId(schoolId);
    const result = await this.simulationRepo.findAll(schoolId, {
      status: 'RUNNING',
      limit: 1000,
    });
    return result.data;
  }

  async listFailedSimulations(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTwinSimulation>> {
    this.validateSchoolId(schoolId);
    return this.simulationRepo.findAll(schoolId, {
      ...this.validatePagination(params),
      status: 'FAILED',
    });
  }

  async listByTwin(
    schoolId: string,
    twinId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTwinSimulation>> {
    this.validateSchoolId(schoolId);
    this.validateId(twinId, 'Jumeau numerique');
    return this.simulationRepo.findByTwinId(twinId, schoolId, this.validatePagination(params));
  }

  // -- Scenarios -------------------------------------------------------------

  async listScenarios(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GecirapTwinScenario>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.scenarioRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getScenario(schoolId: string, id: string): Promise<GecirapTwinScenario> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scenario jumeau');
    return this.ensureExists(this.scenarioRepo, id, schoolId, 'Scenario jumeau');
  }

  async createScenario(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapTwinScenario> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['twinId', 'name', 'description'], 'Scenario jumeau');

    const validated = this.validateSchema(createTwinScenarioSchema, data, 'Scenario jumeau');

    await this.ensureExists(this.twinRepo, validated.twinId, schoolId, 'Jumeau numerique');

    return this.scenarioRepo.create(
      {
        twin_id: validated.twinId,
        scenario_name: validated.name,
        description: validated.description,
        scenario_type: 'CUSTOM',
        variables: validated.assumptions ?? {},
        is_default: false,
        metadata: validated.expectedImpact,
      },
      schoolId,
    );
  }

  async updateScenario(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GecirapTwinScenario> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scenario jumeau');

    const existing = await this.ensureExists(this.scenarioRepo, id, schoolId, 'Scenario jumeau');
    this.validateOwnership(existing, schoolId, 'Scenario jumeau');

    const validated = this.validateSchema(updateTwinScenarioSchema, data, 'Scenario jumeau');
    return this.scenarioRepo.update(id, schoolId, validated);
  }

  async deleteScenario(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Scenario jumeau');

    const existing = await this.ensureExists(this.scenarioRepo, id, schoolId, 'Scenario jumeau');
    this.validateOwnership(existing, schoolId, 'Scenario jumeau');

    await this.scenarioRepo.softDelete(id, schoolId);
  }

  async listByTwinScenarios(
    schoolId: string,
    twinId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTwinScenario>> {
    this.validateSchoolId(schoolId);
    this.validateId(twinId, 'Jumeau numerique');
    return this.scenarioRepo.findByTwinId(twinId, schoolId, this.validatePagination(params));
  }

  async listDefaults(schoolId: string): Promise<GecirapTwinScenario[]> {
    this.validateSchoolId(schoolId);
    return this.scenarioRepo.findDefaults(schoolId);
  }

  // -- Results ---------------------------------------------------------------

  async listResults(
    schoolId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTwinResult>> {
    this.validateSchoolId(schoolId);
    return this.resultRepo.findAll(schoolId, this.validatePagination(params));
  }

  async getResult(schoolId: string, id: string): Promise<GecirapTwinResult> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Resultat simulation');
    return this.ensureExists(this.resultRepo, id, schoolId, 'Resultat simulation');
  }

  async createResult(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GecirapTwinResult> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['simulationId', 'scenarioId', 'cost', 'availability'], 'Resultat simulation');

    const validated = this.validateSchema(createTwinResultSchema, data, 'Resultat simulation');

    return this.resultRepo.create(
      {
        simulation_id: validated.simulationId,
        scenario_id: validated.scenarioId,
        result_data: validated.impact ?? {},
        metrics: { cost: validated.cost, availability: validated.availability },
        insights: validated.recommendations,
        generated_at: new Date().toISOString(),
        metadata: { risks: validated.risks },
      },
      schoolId,
    );
  }

  async listBySimulationResults(
    schoolId: string,
    simulationId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTwinResult>> {
    this.validateSchoolId(schoolId);
    this.validateId(simulationId, 'Simulation');
    return this.resultRepo.findBySimulationId(simulationId, schoolId, this.validatePagination(params));
  }

  async listByScenarioResults(
    schoolId: string,
    scenarioId: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GecirapTwinResult>> {
    this.validateSchoolId(schoolId);
    this.validateId(scenarioId, 'Scenario');
    return this.resultRepo.findByScenarioId(scenarioId, schoolId, this.validatePagination(params));
  }

  async getLatestResult(
    schoolId: string,
    simulationId: string,
  ): Promise<GecirapTwinResult | null> {
    this.validateSchoolId(schoolId);
    return this.resultRepo.findLatest(simulationId, schoolId);
  }

  // -- Templates -------------------------------------------------------------

  async createTemplate(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'simulation_type'], 'Template simulation');

    return {
      id: crypto.randomUUID(),
      name: data.name as string,
      simulation_type: data.simulation_type as string,
      description: (data.description as string) ?? '',
      is_public: (data.is_public as boolean) ?? false,
      template_parameters: (data.template_parameters as Record<string, unknown>) ?? {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  // -- Overview --------------------------------------------------------------

  async getSimulationOverview(schoolId: string): Promise<{
    totalSimulations: number;
    activeSimulations: number;
    totalTemplates: number;
    avgScore: number;
  }> {
    this.validateSchoolId(schoolId);

    const simulations = await this.simulationRepo.findAll(schoolId, { limit: 1000 });
    const runningResult = await this.simulationRepo.findAll(schoolId, {
      status: 'RUNNING',
      limit: 1000,
    });
    const allResults = await this.resultRepo.findAll(schoolId, { limit: 1000 });

    const avgScore =
      allResults.data.length > 0
        ? allResults.data.reduce((sum, r) => {
            const score = (r.metrics as Record<string, unknown>)?.score;
            return sum + (typeof score === 'number' ? score : 0);
          }, 0) / allResults.data.length
        : 0;

    return {
      totalSimulations: simulations.total,
      activeSimulations: runningResult.data.length,
      totalTemplates: 0,
      avgScore,
    };
  }
}

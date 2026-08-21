import {
  ValidationError,
  NotFoundError,
} from '@educi/errors';
import {
  createSimulationSchema,
  updateSimulationSchema,
} from '../validators/gedkin';
import type {
  GedkinSimulation,
} from '@educi/types';
import type {
  GedkinSimulationRepository,
} from '../repositories/simulation-repository';
import type { PaginatedResult, PaginationParams, FilterParams } from '../repositories/base-gedkin-repository';
import { BaseGedkinService, type GedkinServiceConfig } from './base-gedkin-service';

// ============================================================================
// Simulation Service
// ============================================================================

export class SimulationService extends BaseGedkinService {
  constructor(
    private readonly simulationRepo: GedkinSimulationRepository,
    config?: GedkinServiceConfig,
  ) {
    super(config);
  }

  async listSimulations(
    schoolId: string,
    params: PaginationParams = {},
    filters: FilterParams = {},
  ): Promise<PaginatedResult<GedkinSimulation>> {
    this.validateSchoolId(schoolId);
    const pagination = this.validatePagination(params);
    return this.simulationRepo.findAll(schoolId, {
      ...pagination,
      ...this.sanitizeFilters(filters),
    });
  }

  async getSimulation(schoolId: string, id: string): Promise<GedkinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation');
    return this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation');
  }

  async createSimulation(
    schoolId: string,
    data: Record<string, unknown>,
  ): Promise<GedkinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateNotEmpty(data, ['name', 'description', 'type', 'status', 'parameters'], 'Simulation');

    const validated = this.validateSchema(createSimulationSchema, data, 'Simulation');

    return this.simulationRepo.create(
      {
        name: validated.name,
        description: validated.description,
        type: validated.type,
        status: validated.status,
        parameters: validated.parameters,
        startedAt: new Date().toISOString(),
      },
      schoolId,
    );
  }

  async updateSimulation(
    schoolId: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<GedkinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation');

    const existing = await this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation');
    this.validateOwnership(existing, schoolId, 'Simulation');

    const validated = this.validateSchema(updateSimulationSchema, data, 'Simulation');
    return this.simulationRepo.update(id, schoolId, validated);
  }

  async deleteSimulation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation');

    const existing = await this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation');
    this.validateOwnership(existing, schoolId, 'Simulation');

    await this.simulationRepo.softDelete(id, schoolId);
  }

  async listByType(
    schoolId: string,
    type: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinSimulation>> {
    this.validateSchoolId(schoolId);
    return this.simulationRepo.findByType(type, schoolId, this.validatePagination(params));
  }

  async listByStatus(
    schoolId: string,
    status: string,
    params: PaginationParams = {},
  ): Promise<PaginatedResult<GedkinSimulation>> {
    this.validateSchoolId(schoolId);
    return this.simulationRepo.findByStatus(status, schoolId, this.validatePagination(params));
  }

  async startSimulation(
    schoolId: string,
    id: string,
  ): Promise<GedkinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation');

    const existing = await this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation');
    this.validateOwnership(existing, schoolId, 'Simulation');

    return this.simulationRepo.update(id, schoolId, {
      status: 'RUNNING',
      startedAt: new Date().toISOString(),
    });
  }

  async completeSimulation(
    schoolId: string,
    id: string,
  ): Promise<GedkinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation');

    const existing = await this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation');
    this.validateOwnership(existing, schoolId, 'Simulation');

    return this.simulationRepo.update(id, schoolId, {
      status: 'COMPLETED',
      completedAt: new Date().toISOString(),
    });
  }

  async failSimulation(
    schoolId: string,
    id: string,
  ): Promise<GedkinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation');

    const existing = await this.ensureExists(this.simulationRepo, id, schoolId, 'Simulation');
    this.validateOwnership(existing, schoolId, 'Simulation');

    return this.simulationRepo.update(id, schoolId, {
      status: 'FAILED',
      completedAt: new Date().toISOString(),
    });
  }

  async getSimulationStats(
    schoolId: string,
  ): Promise<{
    totalSimulations: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    averageDuration: number;
  }> {
    this.validateSchoolId(schoolId);
    const simulations = await this.simulationRepo.findAll(schoolId, { limit: 1000 });

    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let totalDuration = 0;
    let completedCount = 0;

    for (const simulation of simulations.data) {
      byType[simulation.type] = (byType[simulation.type] ?? 0) + 1;
      byStatus[simulation.status] = (byStatus[simulation.status] ?? 0) + 1;
      if (simulation.completedAt && simulation.startedAt) {
        const duration = new Date(simulation.completedAt).getTime() - new Date(simulation.startedAt).getTime();
        totalDuration += duration;
        completedCount++;
      }
    }

    return {
      totalSimulations: simulations.total,
      byType,
      byStatus,
      averageDuration: completedCount > 0 ? totalDuration / completedCount : 0,
    };
  }
}
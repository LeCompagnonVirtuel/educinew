import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipSystemTwin,
  GeaesipTwinState,
  GeaesipTwinSimulation,
} from '@educi/types';
import {
  GeaesipSystemTwinRepository,
  GeaesipTwinStateRepository,
  GeaesipTwinSimulationRepository,
} from '../repositories/digital-twin.repository';

// ============================================================================
// Digital Twin Service
// ============================================================================

export class GeaesipDigitalTwinService {
  constructor(
    private readonly twinRepo = new GeaesipSystemTwinRepository(),
    private readonly stateRepo = new GeaesipTwinStateRepository(),
    private readonly simulationRepo = new GeaesipTwinSimulationRepository(),
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

  // ─── System Twins ─────────────────────────────────────────────────────────

  async listTwins(schoolId: string): Promise<GeaesipSystemTwin[]> {
    this.validateSchoolId(schoolId);
    return this.twinRepo.findAllBySchool(schoolId);
  }

  async getTwin(schoolId: string, id: string): Promise<GeaesipSystemTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau');
    const entity = await this.twinRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Jumeau', id);
    }
    return entity;
  }

  async createTwin(
    schoolId: string,
    data: Omit<GeaesipSystemTwin, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<GeaesipSystemTwin> {
    this.validateSchoolId(schoolId);
    return this.twinRepo.create({ ...data, school_id: schoolId });
  }

  async updateTwin(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipSystemTwin, 'id' | 'createdAt'>>,
  ): Promise<GeaesipSystemTwin> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau');
    await this.getTwin(schoolId, id);
    return this.twinRepo.update(id, data);
  }

  async deleteTwin(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Jumeau');
    await this.getTwin(schoolId, id);
    await this.twinRepo.delete(id);
  }

  // ─── Twin States ──────────────────────────────────────────────────────────

  async listStates(schoolId: string): Promise<GeaesipTwinState[]> {
    this.validateSchoolId(schoolId);
    return this.stateRepo.findAllBySchool(schoolId);
  }

  async getState(schoolId: string, id: string): Promise<GeaesipTwinState> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'État jumeau');
    const entity = await this.stateRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('État jumeau', id);
    }
    return entity;
  }

  async createState(
    schoolId: string,
    data: Omit<GeaesipTwinState, 'id' | 'lastUpdated'>,
  ): Promise<GeaesipTwinState> {
    this.validateSchoolId(schoolId);
    return this.stateRepo.create({ ...data, school_id: schoolId });
  }

  async updateState(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipTwinState, 'id' | 'lastUpdated'>>,
  ): Promise<GeaesipTwinState> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'État jumeau');
    await this.getState(schoolId, id);
    return this.stateRepo.update(id, data);
  }

  async deleteState(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'État jumeau');
    await this.getState(schoolId, id);
    await this.stateRepo.delete(id);
  }

  // ─── Twin Simulations ─────────────────────────────────────────────────────

  async listSimulations(schoolId: string): Promise<GeaesipTwinSimulation[]> {
    this.validateSchoolId(schoolId);
    return this.simulationRepo.findAllBySchool(schoolId);
  }

  async getSimulation(schoolId: string, id: string): Promise<GeaesipTwinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation jumeau');
    const entity = await this.simulationRepo.findById(id);
    if (entity.school_id !== schoolId) {
      throw new NotFoundError('Simulation jumeau', id);
    }
    return entity;
  }

  async createSimulation(
    schoolId: string,
    data: Omit<GeaesipTwinSimulation, 'id' | 'createdAt' | 'completedAt'>,
  ): Promise<GeaesipTwinSimulation> {
    this.validateSchoolId(schoolId);
    return this.simulationRepo.create({ ...data, school_id: schoolId });
  }

  async updateSimulation(
    schoolId: string,
    id: string,
    data: Partial<Omit<GeaesipTwinSimulation, 'id' | 'createdAt'>>,
  ): Promise<GeaesipTwinSimulation> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation jumeau');
    await this.getSimulation(schoolId, id);
    return this.simulationRepo.update(id, data);
  }

  async deleteSimulation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Simulation jumeau');
    await this.getSimulation(schoolId, id);
    await this.simulationRepo.delete(id);
  }

  // ─── Stats ────────────────────────────────────────────────────────────────

  async getDigitalTwinStats(schoolId: string) {
    this.validateSchoolId(schoolId);

    const twins = await this.twinRepo.findAllBySchool(schoolId);
    const states = await this.stateRepo.findAllBySchool(schoolId);
    const simulations = await this.simulationRepo.findAllBySchool(schoolId);

    const completed = simulations.filter((s) => s.completedAt !== null);

    return {
      totalTwins: twins.length,
      totalStates: states.length,
      totalSimulations: simulations.length,
      completedSimulations: completed.length,
    };
  }
}

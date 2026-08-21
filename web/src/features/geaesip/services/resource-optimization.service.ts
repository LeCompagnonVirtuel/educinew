import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipResourceForecast,
  GeaesipAllocationPlan,
  GeaesipOptimizationResult,
} from '@educi/types';
import {
  GeaesipResourceForecastRepository,
  GeaesipAllocationPlanRepository,
  GeaesipOptimizationResultRepository,
} from '../repositories/resource-optimization.repository';

export class GeaesipResourceOptimizationService {
  constructor(
    private readonly forecastRepo = new GeaesipResourceForecastRepository(),
    private readonly allocationRepo = new GeaesipAllocationPlanRepository(),
    private readonly optimizationRepo = new GeaesipOptimizationResultRepository(),
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

  async listForecasts(schoolId: string): Promise<GeaesipResourceForecast[]> {
    this.validateSchoolId(schoolId);
    return this.forecastRepo.findAllBySchool(schoolId);
  }

  async getForecast(schoolId: string, id: string): Promise<GeaesipResourceForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prevision de ressource');
    const entity = await this.forecastRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Prevision de ressource', id);
    return entity;
  }

  async createForecast(schoolId: string, data: Omit<GeaesipResourceForecast, 'id' | 'createdAt'>): Promise<GeaesipResourceForecast> {
    this.validateSchoolId(schoolId);
    return this.forecastRepo.create({ ...data, school_id: schoolId });
  }

  async updateForecast(schoolId: string, id: string, data: Partial<Omit<GeaesipResourceForecast, 'id' | 'createdAt'>>): Promise<GeaesipResourceForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prevision de ressource');
    await this.getForecast(schoolId, id);
    return this.forecastRepo.update(id, data);
  }

  async deleteForecast(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prevision de ressource');
    await this.getForecast(schoolId, id);
    await this.forecastRepo.delete(id);
  }

  async listAllocations(schoolId: string): Promise<GeaesipAllocationPlan[]> {
    this.validateSchoolId(schoolId);
    return this.allocationRepo.findAllBySchool(schoolId);
  }

  async getAllocation(schoolId: string, id: string): Promise<GeaesipAllocationPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan d allocation');
    const entity = await this.allocationRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Plan d allocation', id);
    return entity;
  }

  async createAllocation(schoolId: string, data: Omit<GeaesipAllocationPlan, 'id' | 'createdAt' | 'updatedAt'>): Promise<GeaesipAllocationPlan> {
    this.validateSchoolId(schoolId);
    return this.allocationRepo.create({ ...data, school_id: schoolId });
  }

  async updateAllocation(schoolId: string, id: string, data: Partial<Omit<GeaesipAllocationPlan, 'id' | 'createdAt'>>): Promise<GeaesipAllocationPlan> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan d allocation');
    await this.getAllocation(schoolId, id);
    return this.allocationRepo.update(id, data);
  }

  async deleteAllocation(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Plan d allocation');
    await this.getAllocation(schoolId, id);
    await this.allocationRepo.delete(id);
  }

  async listOptimizations(schoolId: string): Promise<GeaesipOptimizationResult[]> {
    this.validateSchoolId(schoolId);
    return this.optimizationRepo.findAllBySchool(schoolId);
  }

  async getOptimization(schoolId: string, id: string): Promise<GeaesipOptimizationResult> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Resultat d optimisation');
    const entity = await this.optimizationRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Resultat d optimisation', id);
    return entity;
  }

  async createOptimization(schoolId: string, data: Omit<GeaesipOptimizationResult, 'id' | 'createdAt'>): Promise<GeaesipOptimizationResult> {
    this.validateSchoolId(schoolId);
    return this.optimizationRepo.create({ ...data, school_id: schoolId });
  }

  async deleteOptimization(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Resultat d optimisation');
    await this.getOptimization(schoolId, id);
    await this.optimizationRepo.delete(id);
  }

  async getResourceOptimizationStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const forecasts = await this.forecastRepo.findAllBySchool(schoolId);
    const allocations = await this.allocationRepo.findAllBySchool(schoolId);
    const optimizations = await this.optimizationRepo.findAllBySchool(schoolId);
    return {
      totalForecasts: forecasts.length,
      totalAllocations: allocations.length,
      totalOptimizations: optimizations.length,
    };
  }
}

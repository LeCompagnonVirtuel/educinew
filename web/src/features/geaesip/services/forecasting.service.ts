import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipExtendedForecast,
  GeaesipForecastBacktest,
  GeaesipModelDrift,
} from '@educi/types';
import {
  GeaesipExtendedForecastRepository,
  GeaesipForecastBacktestRepository,
  GeaesipModelDriftRepository,
} from '../repositories/forecasting.repository';

export class GeaesipForecastingService {
  constructor(
    private readonly forecastRepo = new GeaesipExtendedForecastRepository(),
    private readonly backtestRepo = new GeaesipForecastBacktestRepository(),
    private readonly driftRepo = new GeaesipModelDriftRepository(),
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

  async listForecasts(schoolId: string): Promise<GeaesipExtendedForecast[]> {
    this.validateSchoolId(schoolId);
    return this.forecastRepo.findAllBySchool(schoolId);
  }

  async getForecast(schoolId: string, id: string): Promise<GeaesipExtendedForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prevision etendue');
    const entity = await this.forecastRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Prevision etendue', id);
    return entity;
  }

  async createForecast(schoolId: string, data: Omit<GeaesipExtendedForecast, 'id' | 'createdAt' | 'completedAt'>): Promise<GeaesipExtendedForecast> {
    this.validateSchoolId(schoolId);
    return this.forecastRepo.create({ ...data, school_id: schoolId });
  }

  async updateForecast(schoolId: string, id: string, data: Partial<Omit<GeaesipExtendedForecast, 'id' | 'createdAt'>>): Promise<GeaesipExtendedForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prevision etendue');
    await this.getForecast(schoolId, id);
    return this.forecastRepo.update(id, data);
  }

  async deleteForecast(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prevision etendue');
    await this.getForecast(schoolId, id);
    await this.forecastRepo.delete(id);
  }

  async listBacktests(schoolId: string): Promise<GeaesipForecastBacktest[]> {
    this.validateSchoolId(schoolId);
    return this.backtestRepo.findAllBySchool(schoolId);
  }

  async getBacktest(schoolId: string, id: string): Promise<GeaesipForecastBacktest> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Backtest');
    const entity = await this.backtestRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Backtest', id);
    return entity;
  }

  async createBacktest(schoolId: string, data: Omit<GeaesipForecastBacktest, 'id' | 'evaluatedAt'>): Promise<GeaesipForecastBacktest> {
    this.validateSchoolId(schoolId);
    return this.backtestRepo.create({ ...data, school_id: schoolId });
  }

  async deleteBacktest(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Backtest');
    await this.getBacktest(schoolId, id);
    await this.backtestRepo.delete(id);
  }

  async listDrifts(schoolId: string): Promise<GeaesipModelDrift[]> {
    this.validateSchoolId(schoolId);
    return this.driftRepo.findAllBySchool(schoolId);
  }

  async getDrift(schoolId: string, id: string): Promise<GeaesipModelDrift> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Derivation');
    const entity = await this.driftRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Derivation', id);
    return entity;
  }

  async createDrift(schoolId: string, data: Omit<GeaesipModelDrift, 'id' | 'detectedAt'>): Promise<GeaesipModelDrift> {
    this.validateSchoolId(schoolId);
    return this.driftRepo.create({ ...data, school_id: schoolId });
  }

  async deleteDrift(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Derivation');
    await this.getDrift(schoolId, id);
    await this.driftRepo.delete(id);
  }

  async getForecastingStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const forecasts = await this.forecastRepo.findAllBySchool(schoolId);
    const backtests = await this.backtestRepo.findAllBySchool(schoolId);
    const drifts = await this.driftRepo.findAllBySchool(schoolId);
    return {
      totalForecasts: forecasts.length,
      totalBacktests: backtests.length,
      totalDrifts: drifts.length,
    };
  }
}

import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipImpactModel,
  GeaesipImpactResult,
  GeaesipEconomicForecast,
  GeaesipHumanCapitalIndex,
} from '@educi/types';
import {
  GeaesipImpactModelRepository,
  GeaesipImpactResultRepository,
  GeaesipEconomicForecastRepository,
  GeaesipHumanCapitalIndexRepository,
} from '../repositories/impact-intelligence.repository';

export class GeaesipImpactIntelligenceService {
  constructor(
    private readonly modelRepo = new GeaesipImpactModelRepository(),
    private readonly resultRepo = new GeaesipImpactResultRepository(),
    private readonly economicRepo = new GeaesipEconomicForecastRepository(),
    private readonly capitalRepo = new GeaesipHumanCapitalIndexRepository(),
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

  async listModels(schoolId: string): Promise<GeaesipImpactModel[]> {
    this.validateSchoolId(schoolId);
    return this.modelRepo.findAllBySchool(schoolId);
  }

  async getModel(schoolId: string, id: string): Promise<GeaesipImpactModel> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Modele d impact');
    const entity = await this.modelRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Modele d impact', id);
    return entity;
  }

  async createModel(schoolId: string, data: Omit<GeaesipImpactModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<GeaesipImpactModel> {
    this.validateSchoolId(schoolId);
    return this.modelRepo.create({ ...data, school_id: schoolId });
  }

  async updateModel(schoolId: string, id: string, data: Partial<Omit<GeaesipImpactModel, 'id' | 'createdAt'>>): Promise<GeaesipImpactModel> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Modele d impact');
    await this.getModel(schoolId, id);
    return this.modelRepo.update(id, data);
  }

  async deleteModel(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Modele d impact');
    await this.getModel(schoolId, id);
    await this.modelRepo.delete(id);
  }

  async listResults(schoolId: string): Promise<GeaesipImpactResult[]> {
    this.validateSchoolId(schoolId);
    return this.resultRepo.findAllBySchool(schoolId);
  }

  async getResult(schoolId: string, id: string): Promise<GeaesipImpactResult> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Resultat d impact');
    const entity = await this.resultRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Resultat d impact', id);
    return entity;
  }

  async createResult(schoolId: string, data: Omit<GeaesipImpactResult, 'id' | 'calculatedAt'>): Promise<GeaesipImpactResult> {
    this.validateSchoolId(schoolId);
    return this.resultRepo.create({ ...data, school_id: schoolId });
  }

  async deleteResult(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Resultat d impact');
    await this.getResult(schoolId, id);
    await this.resultRepo.delete(id);
  }

  async listEconomicForecasts(schoolId: string): Promise<GeaesipEconomicForecast[]> {
    this.validateSchoolId(schoolId);
    return this.economicRepo.findAllBySchool(schoolId);
  }

  async getEconomicForecast(schoolId: string, id: string): Promise<GeaesipEconomicForecast> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prevision economique');
    const entity = await this.economicRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Prevision economique', id);
    return entity;
  }

  async createEconomicForecast(schoolId: string, data: Omit<GeaesipEconomicForecast, 'id' | 'createdAt'>): Promise<GeaesipEconomicForecast> {
    this.validateSchoolId(schoolId);
    return this.economicRepo.create({ ...data, school_id: schoolId });
  }

  async deleteEconomicForecast(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Prevision economique');
    await this.getEconomicForecast(schoolId, id);
    await this.economicRepo.delete(id);
  }

  async listHumanCapitalIndices(schoolId: string): Promise<GeaesipHumanCapitalIndex[]> {
    this.validateSchoolId(schoolId);
    return this.capitalRepo.findAllBySchool(schoolId);
  }

  async getHumanCapitalIndex(schoolId: string, id: string): Promise<GeaesipHumanCapitalIndex> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indice de capital humain');
    const entity = await this.capitalRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Indice de capital humain', id);
    return entity;
  }

  async createHumanCapitalIndex(schoolId: string, data: Omit<GeaesipHumanCapitalIndex, 'id' | 'computedAt'>): Promise<GeaesipHumanCapitalIndex> {
    this.validateSchoolId(schoolId);
    return this.capitalRepo.create({ ...data, school_id: schoolId });
  }

  async deleteHumanCapitalIndex(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indice de capital humain');
    await this.getHumanCapitalIndex(schoolId, id);
    await this.capitalRepo.delete(id);
  }

  async getImpactIntelligenceStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const models = await this.modelRepo.findAllBySchool(schoolId);
    const results = await this.resultRepo.findAllBySchool(schoolId);
    const economic = await this.economicRepo.findAllBySchool(schoolId);
    const capital = await this.capitalRepo.findAllBySchool(schoolId);
    return {
      totalModels: models.length,
      totalResults: results.length,
      totalEconomicForecasts: economic.length,
      totalHumanCapitalIndices: capital.length,
    };
  }
}

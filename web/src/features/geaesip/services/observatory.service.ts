import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipCompositeIndex,
  GeaesipObservatoryIndicator2,
  GeaesipObservatoryTrend,
} from '@educi/types';
import {
  GeaesipCompositeIndexRepository,
  GeaesipObservatoryIndicator2Repository,
  GeaesipObservatoryTrendRepository,
} from '../repositories/observatory.repository';

export class GeaesipObservatoryService {
  constructor(
    private readonly indexRepo = new GeaesipCompositeIndexRepository(),
    private readonly indicatorRepo = new GeaesipObservatoryIndicator2Repository(),
    private readonly trendRepo = new GeaesipObservatoryTrendRepository(),
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

  async listIndices(schoolId: string): Promise<GeaesipCompositeIndex[]> {
    this.validateSchoolId(schoolId);
    return this.indexRepo.findAllBySchool(schoolId);
  }

  async getIndex(schoolId: string, id: string): Promise<GeaesipCompositeIndex> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indice composite');
    const entity = await this.indexRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Indice composite', id);
    return entity;
  }

  async createIndex(schoolId: string, data: Omit<GeaesipCompositeIndex, 'id' | 'computedAt'>): Promise<GeaesipCompositeIndex> {
    this.validateSchoolId(schoolId);
    return this.indexRepo.create({ ...data, school_id: schoolId });
  }

  async updateIndex(schoolId: string, id: string, data: Partial<Omit<GeaesipCompositeIndex, 'id' | 'computedAt'>>): Promise<GeaesipCompositeIndex> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indice composite');
    await this.getIndex(schoolId, id);
    return this.indexRepo.update(id, data);
  }

  async deleteIndex(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indice composite');
    await this.getIndex(schoolId, id);
    await this.indexRepo.delete(id);
  }

  async listIndicators(schoolId: string): Promise<GeaesipObservatoryIndicator2[]> {
    this.validateSchoolId(schoolId);
    return this.indicatorRepo.findAllBySchool(schoolId);
  }

  async getIndicator(schoolId: string, id: string): Promise<GeaesipObservatoryIndicator2> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur observatoire');
    const entity = await this.indicatorRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Indicateur observatoire', id);
    return entity;
  }

  async createIndicator(schoolId: string, data: Omit<GeaesipObservatoryIndicator2, 'id' | 'computedAt'>): Promise<GeaesipObservatoryIndicator2> {
    this.validateSchoolId(schoolId);
    return this.indicatorRepo.create({ ...data, school_id: schoolId });
  }

  async updateIndicator(schoolId: string, id: string, data: Partial<Omit<GeaesipObservatoryIndicator2, 'id' | 'computedAt'>>): Promise<GeaesipObservatoryIndicator2> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur observatoire');
    await this.getIndicator(schoolId, id);
    return this.indicatorRepo.update(id, data);
  }

  async deleteIndicator(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Indicateur observatoire');
    await this.getIndicator(schoolId, id);
    await this.indicatorRepo.delete(id);
  }

  async listTrends(schoolId: string): Promise<GeaesipObservatoryTrend[]> {
    this.validateSchoolId(schoolId);
    return this.trendRepo.findAllBySchool(schoolId);
  }

  async getTrend(schoolId: string, id: string): Promise<GeaesipObservatoryTrend> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tendance observatoire');
    const entity = await this.trendRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Tendance observatoire', id);
    return entity;
  }

  async createTrend(schoolId: string, data: Omit<GeaesipObservatoryTrend, 'id' | 'computedAt'>): Promise<GeaesipObservatoryTrend> {
    this.validateSchoolId(schoolId);
    return this.trendRepo.create({ ...data, school_id: schoolId });
  }

  async deleteTrend(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Tendance observatoire');
    await this.getTrend(schoolId, id);
    await this.trendRepo.delete(id);
  }

  async getObservatoryStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const indices = await this.indexRepo.findAllBySchool(schoolId);
    const indicators = await this.indicatorRepo.findAllBySchool(schoolId);
    const trends = await this.trendRepo.findAllBySchool(schoolId);
    return {
      totalIndices: indices.length,
      totalIndicators: indicators.length,
      totalTrends: trends.length,
    };
  }
}

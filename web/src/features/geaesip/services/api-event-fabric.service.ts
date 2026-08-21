import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipIntelligenceAPI,
  GeaesipEventBus,
  GeaesipEventSubscription,
  GeaesipAPIUsage,
} from '@educi/types';
import {
  GeaesipIntelligenceAPIRepository,
  GeaesipEventBusRepository,
  GeaesipEventSubscriptionRepository,
  GeaesipAPIUsageRepository,
} from '../repositories/api-event-fabric.repository';

export class GeaesipApiEventFabricService {
  constructor(
    private readonly apiRepo = new GeaesipIntelligenceAPIRepository(),
    private readonly busRepo = new GeaesipEventBusRepository(),
    private readonly subRepo = new GeaesipEventSubscriptionRepository(),
    private readonly usageRepo = new GeaesipAPIUsageRepository(),
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

  async listAPIs(schoolId: string): Promise<GeaesipIntelligenceAPI[]> {
    this.validateSchoolId(schoolId);
    return this.apiRepo.findAllBySchool(schoolId);
  }

  async getAPI(schoolId: string, id: string): Promise<GeaesipIntelligenceAPI> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'API');
    const entity = await this.apiRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('API', id);
    return entity;
  }

  async createAPI(schoolId: string, data: Omit<GeaesipIntelligenceAPI, 'id' | 'createdAt' | 'updatedAt'>): Promise<GeaesipIntelligenceAPI> {
    this.validateSchoolId(schoolId);
    return this.apiRepo.create({ ...data, school_id: schoolId });
  }

  async updateAPI(schoolId: string, id: string, data: Partial<Omit<GeaesipIntelligenceAPI, 'id' | 'createdAt'>>): Promise<GeaesipIntelligenceAPI> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'API');
    await this.getAPI(schoolId, id);
    return this.apiRepo.update(id, data);
  }

  async deleteAPI(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'API');
    await this.getAPI(schoolId, id);
    await this.apiRepo.delete(id);
  }

  async listEventBuses(schoolId: string): Promise<GeaesipEventBus[]> {
    this.validateSchoolId(schoolId);
    return this.busRepo.findAllBySchool(schoolId);
  }

  async getEventBus(schoolId: string, id: string): Promise<GeaesipEventBus> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Bus d evenements');
    const entity = await this.busRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Bus d evenements', id);
    return entity;
  }

  async createEventBus(schoolId: string, data: Omit<GeaesipEventBus, 'id' | 'createdAt'>): Promise<GeaesipEventBus> {
    this.validateSchoolId(schoolId);
    return this.busRepo.create({ ...data, school_id: schoolId });
  }

  async updateEventBus(schoolId: string, id: string, data: Partial<Omit<GeaesipEventBus, 'id' | 'createdAt'>>): Promise<GeaesipEventBus> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Bus d evenements');
    await this.getEventBus(schoolId, id);
    return this.busRepo.update(id, data);
  }

  async deleteEventBus(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Bus d evenements');
    await this.getEventBus(schoolId, id);
    await this.busRepo.delete(id);
  }

  async listSubscriptions(schoolId: string): Promise<GeaesipEventSubscription[]> {
    this.validateSchoolId(schoolId);
    return this.subRepo.findAllBySchool(schoolId);
  }

  async getSubscription(schoolId: string, id: string): Promise<GeaesipEventSubscription> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Abonnement');
    const entity = await this.subRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Abonnement', id);
    return entity;
  }

  async createSubscription(schoolId: string, data: Omit<GeaesipEventSubscription, 'id' | 'createdAt'>): Promise<GeaesipEventSubscription> {
    this.validateSchoolId(schoolId);
    return this.subRepo.create({ ...data, school_id: schoolId });
  }

  async updateSubscription(schoolId: string, id: string, data: Partial<Omit<GeaesipEventSubscription, 'id' | 'createdAt'>>): Promise<GeaesipEventSubscription> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Abonnement');
    await this.getSubscription(schoolId, id);
    return this.subRepo.update(id, data);
  }

  async deleteSubscription(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Abonnement');
    await this.getSubscription(schoolId, id);
    await this.subRepo.delete(id);
  }

  async listUsages(schoolId: string): Promise<GeaesipAPIUsage[]> {
    this.validateSchoolId(schoolId);
    return this.usageRepo.findAllBySchool(schoolId);
  }

  async getUsage(schoolId: string, id: string): Promise<GeaesipAPIUsage> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Usage API');
    const entity = await this.usageRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Usage API', id);
    return entity;
  }

  async createUsage(schoolId: string, data: Omit<GeaesipAPIUsage, 'id' | 'timestamp'>): Promise<GeaesipAPIUsage> {
    this.validateSchoolId(schoolId);
    return this.usageRepo.create({ ...data, school_id: schoolId });
  }

  async deleteUsage(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Usage API');
    await this.getUsage(schoolId, id);
    await this.usageRepo.delete(id);
  }

  async getApiEventFabricStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const apis = await this.apiRepo.findAllBySchool(schoolId);
    const buses = await this.busRepo.findAllBySchool(schoolId);
    const subs = await this.subRepo.findAllBySchool(schoolId);
    const usages = await this.usageRepo.findAllBySchool(schoolId);
    return {
      totalAPIs: apis.length,
      totalEventBuses: buses.length,
      totalSubscriptions: subs.length,
      totalUsages: usages.length,
    };
  }
}

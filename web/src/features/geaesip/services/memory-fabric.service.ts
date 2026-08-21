import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipMemory,
  GeaesipMemoryRetrieval,
  GeaesipMemoryPolicy,
} from '@educi/types';
import {
  GeaesipMemoryRepository,
  GeaesipMemoryRetrievalRepository,
  GeaesipMemoryPolicyRepository,
} from '../repositories/memory-fabric.repository';

export class GeaesipMemoryFabricService {
  constructor(
    private readonly memoryRepo = new GeaesipMemoryRepository(),
    private readonly retrievalRepo = new GeaesipMemoryRetrievalRepository(),
    private readonly policyRepo = new GeaesipMemoryPolicyRepository(),
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

  async listMemories(schoolId: string): Promise<GeaesipMemory[]> {
    this.validateSchoolId(schoolId);
    return this.memoryRepo.findAllBySchool(schoolId);
  }

  async getMemory(schoolId: string, id: string): Promise<GeaesipMemory> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Memoire');
    const entity = await this.memoryRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Memoire', id);
    return entity;
  }

  async createMemory(schoolId: string, data: Omit<GeaesipMemory, 'id' | 'createdAt' | 'updatedAt'>): Promise<GeaesipMemory> {
    this.validateSchoolId(schoolId);
    return this.memoryRepo.create({ ...data, school_id: schoolId });
  }

  async updateMemory(schoolId: string, id: string, data: Partial<Omit<GeaesipMemory, 'id' | 'createdAt'>>): Promise<GeaesipMemory> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Memoire');
    await this.getMemory(schoolId, id);
    return this.memoryRepo.update(id, data);
  }

  async deleteMemory(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Memoire');
    await this.getMemory(schoolId, id);
    await this.memoryRepo.delete(id);
  }

  async listRetrievals(schoolId: string): Promise<GeaesipMemoryRetrieval[]> {
    this.validateSchoolId(schoolId);
    return this.retrievalRepo.findAllBySchool(schoolId);
  }

  async getRetrieval(schoolId: string, id: string): Promise<GeaesipMemoryRetrieval> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Retrieval');
    const entity = await this.retrievalRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Retrieval', id);
    return entity;
  }

  async createRetrieval(schoolId: string, data: Omit<GeaesipMemoryRetrieval, 'id' | 'timestamp'>): Promise<GeaesipMemoryRetrieval> {
    this.validateSchoolId(schoolId);
    return this.retrievalRepo.create({ ...data, school_id: schoolId });
  }

  async deleteRetrieval(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Retrieval');
    await this.getRetrieval(schoolId, id);
    await this.retrievalRepo.delete(id);
  }

  async listPolicies(schoolId: string): Promise<GeaesipMemoryPolicy[]> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findAllBySchool(schoolId);
  }

  async getPolicy(schoolId: string, id: string): Promise<GeaesipMemoryPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique memoire');
    const entity = await this.policyRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Politique memoire', id);
    return entity;
  }

  async createPolicy(schoolId: string, data: Omit<GeaesipMemoryPolicy, 'id' | 'createdAt'>): Promise<GeaesipMemoryPolicy> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.create({ ...data, school_id: schoolId });
  }

  async updatePolicy(schoolId: string, id: string, data: Partial<Omit<GeaesipMemoryPolicy, 'id' | 'createdAt'>>): Promise<GeaesipMemoryPolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique memoire');
    await this.getPolicy(schoolId, id);
    return this.policyRepo.update(id, data);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique memoire');
    await this.getPolicy(schoolId, id);
    await this.policyRepo.delete(id);
  }

  async getMemoryFabricStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const memories = await this.memoryRepo.findAllBySchool(schoolId);
    const retrievals = await this.retrievalRepo.findAllBySchool(schoolId);
    const policies = await this.policyRepo.findAllBySchool(schoolId);
    return {
      totalMemories: memories.length,
      totalRetrievals: retrievals.length,
      totalPolicies: policies.length,
    };
  }
}

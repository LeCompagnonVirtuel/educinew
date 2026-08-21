import { ValidationError, NotFoundError } from '@educi/errors';
import type {
  GeaesipGovernancePolicy,
  GeaesipGovernanceAudit,
  GeaesipEthicsReview,
  GeaesipBiasReview,
} from '@educi/types';
import {
  GeaesipGovernancePolicyRepository,
  GeaesipGovernanceAuditRepository,
  GeaesipEthicsReviewRepository,
  GeaesipBiasReviewRepository,
} from '../repositories/governance-ethics.repository';

export class GeaesipGovernanceEthicsService {
  constructor(
    private readonly policyRepo = new GeaesipGovernancePolicyRepository(),
    private readonly auditRepo = new GeaesipGovernanceAuditRepository(),
    private readonly ethicsRepo = new GeaesipEthicsReviewRepository(),
    private readonly biasRepo = new GeaesipBiasReviewRepository(),
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

  async listPolicies(schoolId: string): Promise<GeaesipGovernancePolicy[]> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.findAllBySchool(schoolId);
  }

  async getPolicy(schoolId: string, id: string): Promise<GeaesipGovernancePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de gouvernance');
    const entity = await this.policyRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Politique de gouvernance', id);
    return entity;
  }

  async createPolicy(schoolId: string, data: Omit<GeaesipGovernancePolicy, 'id' | 'createdAt' | 'updatedAt'>): Promise<GeaesipGovernancePolicy> {
    this.validateSchoolId(schoolId);
    return this.policyRepo.create({ ...data, school_id: schoolId });
  }

  async updatePolicy(schoolId: string, id: string, data: Partial<Omit<GeaesipGovernancePolicy, 'id' | 'createdAt'>>): Promise<GeaesipGovernancePolicy> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de gouvernance');
    await this.getPolicy(schoolId, id);
    return this.policyRepo.update(id, data);
  }

  async deletePolicy(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Politique de gouvernance');
    await this.getPolicy(schoolId, id);
    await this.policyRepo.delete(id);
  }

  async listAudits(schoolId: string): Promise<GeaesipGovernanceAudit[]> {
    this.validateSchoolId(schoolId);
    return this.auditRepo.findAllBySchool(schoolId);
  }

  async getAudit(schoolId: string, id: string): Promise<GeaesipGovernanceAudit> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Audit de gouvernance');
    const entity = await this.auditRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Audit de gouvernance', id);
    return entity;
  }

  async createAudit(schoolId: string, data: Omit<GeaesipGovernanceAudit, 'id' | 'timestamp'>): Promise<GeaesipGovernanceAudit> {
    this.validateSchoolId(schoolId);
    return this.auditRepo.create({ ...data, school_id: schoolId });
  }

  async deleteAudit(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Audit de gouvernance');
    await this.getAudit(schoolId, id);
    await this.auditRepo.delete(id);
  }

  async listEthicsReviews(schoolId: string): Promise<GeaesipEthicsReview[]> {
    this.validateSchoolId(schoolId);
    return this.ethicsRepo.findAllBySchool(schoolId);
  }

  async getEthicsReview(schoolId: string, id: string): Promise<GeaesipEthicsReview> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Revue d ethique');
    const entity = await this.ethicsRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Revue d ethique', id);
    return entity;
  }

  async createEthicsReview(schoolId: string, data: Omit<GeaesipEthicsReview, 'id' | 'timestamp'>): Promise<GeaesipEthicsReview> {
    this.validateSchoolId(schoolId);
    return this.ethicsRepo.create({ ...data, school_id: schoolId });
  }

  async updateEthicsReview(schoolId: string, id: string, data: Partial<Omit<GeaesipEthicsReview, 'id' | 'timestamp'>>): Promise<GeaesipEthicsReview> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Revue d ethique');
    await this.getEthicsReview(schoolId, id);
    return this.ethicsRepo.update(id, data);
  }

  async deleteEthicsReview(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Revue d ethique');
    await this.getEthicsReview(schoolId, id);
    await this.ethicsRepo.delete(id);
  }

  async listBiasReviews(schoolId: string): Promise<GeaesipBiasReview[]> {
    this.validateSchoolId(schoolId);
    return this.biasRepo.findAllBySchool(schoolId);
  }

  async getBiasReview(schoolId: string, id: string): Promise<GeaesipBiasReview> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Revue de biais');
    const entity = await this.biasRepo.findById(id);
    if (entity.school_id !== schoolId) throw new NotFoundError('Revue de biais', id);
    return entity;
  }

  async createBiasReview(schoolId: string, data: Omit<GeaesipBiasReview, 'id' | 'timestamp'>): Promise<GeaesipBiasReview> {
    this.validateSchoolId(schoolId);
    return this.biasRepo.create({ ...data, school_id: schoolId });
  }

  async updateBiasReview(schoolId: string, id: string, data: Partial<Omit<GeaesipBiasReview, 'id' | 'timestamp'>>): Promise<GeaesipBiasReview> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Revue de biais');
    await this.getBiasReview(schoolId, id);
    return this.biasRepo.update(id, data);
  }

  async deleteBiasReview(schoolId: string, id: string): Promise<void> {
    this.validateSchoolId(schoolId);
    this.validateId(id, 'Revue de biais');
    await this.getBiasReview(schoolId, id);
    await this.biasRepo.delete(id);
  }

  async getGovernanceEthicsStats(schoolId: string) {
    this.validateSchoolId(schoolId);
    const policies = await this.policyRepo.findAllBySchool(schoolId);
    const audits = await this.auditRepo.findAllBySchool(schoolId);
    const ethics = await this.ethicsRepo.findAllBySchool(schoolId);
    const bias = await this.biasRepo.findAllBySchool(schoolId);
    return {
      totalPolicies: policies.length,
      totalAudits: audits.length,
      totalEthicsReviews: ethics.length,
      totalBiasReviews: bias.length,
    };
  }
}

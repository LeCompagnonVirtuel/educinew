import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationPolicy, EducationPolicyCreate } from '@educi/types';
import { GovEducationPolicyNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryEducationPolicyService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<EducationPolicy> {
    const item = await this.repo.findEducationPolicyById(schoolId, id);
    if (!item) throw new GovEducationPolicyNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<EducationPolicy[]> {
    return this.repo.findAllEducationPolicies(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<EducationPolicyCreate>): Promise<EducationPolicy> {
    return this.repo.createEducationPolicy(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<EducationPolicyCreate>): Promise<EducationPolicy> {
    const existing = await this.repo.findEducationPolicyById(schoolId, id);
    if (!existing) throw new GovEducationPolicyNotFoundError(id);
    return this.repo.updateEducationPolicy(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationPolicyById(schoolId, id);
    if (!existing) throw new GovEducationPolicyNotFoundError(id);
    return this.repo.deleteEducationPolicy(schoolId, id);
  }
}

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudGovernancePolicy } from '@educi/types';
import { EduCloudCloudGovernancePolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudGovernancePolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudGovernancePolicy(schoolId: string, id: string): Promise<CloudGovernancePolicy> {
    const item = await this.repo.getCloudGovernancePolicy(schoolId, id);
    if (!item) throw new EduCloudCloudGovernancePolicyError(id);
    return item;
  }
  async listCloudGovernancePolicys(schoolId: string, filters?: Record<string, unknown>): Promise<CloudGovernancePolicy[]> {
    return this.repo.listCloudGovernancePolicy(schoolId, filters);
  }
  async createCloudGovernancePolicy(schoolId: string, data: Partial<CloudGovernancePolicy>): Promise<CloudGovernancePolicy> {
    return this.repo.createCloudGovernancePolicy(schoolId, data as any);
  }
  async updateCloudGovernancePolicy(schoolId: string, id: string, data: Partial<CloudGovernancePolicy>): Promise<CloudGovernancePolicy> {
    const existing = await this.repo.getCloudGovernancePolicy(schoolId, id);
    if (!existing) throw new EduCloudCloudGovernancePolicyError(id);
    return this.repo.updateCloudGovernancePolicy(schoolId, id, data as any);
  }
  async deleteCloudGovernancePolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudGovernancePolicy(schoolId, id);
    if (!existing) throw new EduCloudCloudGovernancePolicyError(id);
    return this.repo.deleteCloudGovernancePolicy(schoolId, id);
  }
}

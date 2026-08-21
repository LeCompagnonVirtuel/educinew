import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernmentPolicy } from '@educi/types';
import { EduCloudGovernmentPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudGovernmentPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getGovernmentPolicy(schoolId: string, id: string): Promise<GovernmentPolicy> {
    const item = await this.repo.getGovernmentPolicy(schoolId, id);
    if (!item) throw new EduCloudGovernmentPolicyError(id);
    return item;
  }
  async listGovernmentPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentPolicy[]> {
    return this.repo.listGovernmentPolicy(schoolId, filters);
  }
  async createGovernmentPolicy(schoolId: string, data: Partial<GovernmentPolicy>): Promise<GovernmentPolicy> {
    return this.repo.createGovernmentPolicy(schoolId, data as any);
  }
  async updateGovernmentPolicy(schoolId: string, id: string, data: Partial<GovernmentPolicy>): Promise<GovernmentPolicy> {
    const existing = await this.repo.getGovernmentPolicy(schoolId, id);
    if (!existing) throw new EduCloudGovernmentPolicyError(id);
    return this.repo.updateGovernmentPolicy(schoolId, id, data as any);
  }
  async deleteGovernmentPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGovernmentPolicy(schoolId, id);
    if (!existing) throw new EduCloudGovernmentPolicyError(id);
    return this.repo.deleteGovernmentPolicy(schoolId, id);
  }
}

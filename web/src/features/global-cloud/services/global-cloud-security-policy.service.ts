import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecurityPolicy } from '@educi/types';
import { EduCloudSecurityPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSecurityPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSecurityPolicy(schoolId: string, id: string): Promise<SecurityPolicy> {
    const item = await this.repo.getSecurityPolicy(schoolId, id);
    if (!item) throw new EduCloudSecurityPolicyError(id);
    return item;
  }
  async listSecurityPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<SecurityPolicy[]> {
    return this.repo.listSecurityPolicy(schoolId, filters);
  }
  async createSecurityPolicy(schoolId: string, data: Partial<SecurityPolicy>): Promise<SecurityPolicy> {
    return this.repo.createSecurityPolicy(schoolId, data as any);
  }
  async updateSecurityPolicy(schoolId: string, id: string, data: Partial<SecurityPolicy>): Promise<SecurityPolicy> {
    const existing = await this.repo.getSecurityPolicy(schoolId, id);
    if (!existing) throw new EduCloudSecurityPolicyError(id);
    return this.repo.updateSecurityPolicy(schoolId, id, data as any);
  }
  async deleteSecurityPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSecurityPolicy(schoolId, id);
    if (!existing) throw new EduCloudSecurityPolicyError(id);
    return this.repo.deleteSecurityPolicy(schoolId, id);
  }
}

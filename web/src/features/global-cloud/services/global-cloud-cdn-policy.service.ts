import type { SupabaseClient } from '@supabase/supabase-js';
import type { CdnPolicy } from '@educi/types';
import { EduCloudCdnPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCdnPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCdnPolicy(schoolId: string, id: string): Promise<CdnPolicy> {
    const item = await this.repo.getCdnPolicy(schoolId, id);
    if (!item) throw new EduCloudCdnPolicyError(id);
    return item;
  }
  async listCdnPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<CdnPolicy[]> {
    return this.repo.listCdnPolicy(schoolId, filters);
  }
  async createCdnPolicy(schoolId: string, data: Partial<CdnPolicy>): Promise<CdnPolicy> {
    return this.repo.createCdnPolicy(schoolId, data as any);
  }
  async updateCdnPolicy(schoolId: string, id: string, data: Partial<CdnPolicy>): Promise<CdnPolicy> {
    const existing = await this.repo.getCdnPolicy(schoolId, id);
    if (!existing) throw new EduCloudCdnPolicyError(id);
    return this.repo.updateCdnPolicy(schoolId, id, data as any);
  }
  async deleteCdnPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCdnPolicy(schoolId, id);
    if (!existing) throw new EduCloudCdnPolicyError(id);
    return this.repo.deleteCdnPolicy(schoolId, id);
  }
}

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CdnDistribution } from '@educi/types';
import { EduCloudCdnDistributionError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCdnDistribution {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCdnDistribution(schoolId: string, id: string): Promise<CdnDistribution> {
    const item = await this.repo.getCdnDistribution(schoolId, id);
    if (!item) throw new EduCloudCdnDistributionError(id);
    return item;
  }
  async listCdnDistributions(schoolId: string, filters?: Record<string, unknown>): Promise<CdnDistribution[]> {
    return this.repo.listCdnDistribution(schoolId, filters);
  }
  async createCdnDistribution(schoolId: string, data: Partial<CdnDistribution>): Promise<CdnDistribution> {
    return this.repo.createCdnDistribution(schoolId, data as any);
  }
  async updateCdnDistribution(schoolId: string, id: string, data: Partial<CdnDistribution>): Promise<CdnDistribution> {
    const existing = await this.repo.getCdnDistribution(schoolId, id);
    if (!existing) throw new EduCloudCdnDistributionError(id);
    return this.repo.updateCdnDistribution(schoolId, id, data as any);
  }
  async deleteCdnDistribution(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCdnDistribution(schoolId, id);
    if (!existing) throw new EduCloudCdnDistributionError(id);
    return this.repo.deleteCdnDistribution(schoolId, id);
  }
}

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FeatureFlag } from '@educi/types';
import { EduCloudFeatureFlagError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFeatureFlag {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFeatureFlag(schoolId: string, id: string): Promise<FeatureFlag> {
    const item = await this.repo.getFeatureFlag(schoolId, id);
    if (!item) throw new EduCloudFeatureFlagError(id);
    return item;
  }
  async listFeatureFlags(schoolId: string, filters?: Record<string, unknown>): Promise<FeatureFlag[]> {
    return this.repo.listFeatureFlag(schoolId, filters);
  }
  async createFeatureFlag(schoolId: string, data: Partial<FeatureFlag>): Promise<FeatureFlag> {
    return this.repo.createFeatureFlag(schoolId, data as any);
  }
  async updateFeatureFlag(schoolId: string, id: string, data: Partial<FeatureFlag>): Promise<FeatureFlag> {
    const existing = await this.repo.getFeatureFlag(schoolId, id);
    if (!existing) throw new EduCloudFeatureFlagError(id);
    return this.repo.updateFeatureFlag(schoolId, id, data as any);
  }
  async deleteFeatureFlag(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFeatureFlag(schoolId, id);
    if (!existing) throw new EduCloudFeatureFlagError(id);
    return this.repo.deleteFeatureFlag(schoolId, id);
  }
}

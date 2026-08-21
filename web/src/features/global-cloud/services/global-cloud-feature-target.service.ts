import type { SupabaseClient } from '@supabase/supabase-js';
import type { FeatureTarget } from '@educi/types';
import { EduCloudFeatureTargetError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFeatureTarget {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFeatureTarget(schoolId: string, id: string): Promise<FeatureTarget> {
    const item = await this.repo.getFeatureTarget(schoolId, id);
    if (!item) throw new EduCloudFeatureTargetError(id);
    return item;
  }
  async listFeatureTargets(schoolId: string, filters?: Record<string, unknown>): Promise<FeatureTarget[]> {
    return this.repo.listFeatureTarget(schoolId, filters);
  }
  async createFeatureTarget(schoolId: string, data: Partial<FeatureTarget>): Promise<FeatureTarget> {
    return this.repo.createFeatureTarget(schoolId, data as any);
  }
  async updateFeatureTarget(schoolId: string, id: string, data: Partial<FeatureTarget>): Promise<FeatureTarget> {
    const existing = await this.repo.getFeatureTarget(schoolId, id);
    if (!existing) throw new EduCloudFeatureTargetError(id);
    return this.repo.updateFeatureTarget(schoolId, id, data as any);
  }
  async deleteFeatureTarget(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFeatureTarget(schoolId, id);
    if (!existing) throw new EduCloudFeatureTargetError(id);
    return this.repo.deleteFeatureTarget(schoolId, id);
  }
}

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudFeature } from '@educi/types';
import { EduCloudCloudFeatureError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudFeature {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudFeature(schoolId: string, id: string): Promise<CloudFeature> {
    const item = await this.repo.getCloudFeature(schoolId, id);
    if (!item) throw new EduCloudCloudFeatureError(id);
    return item;
  }
  async listCloudFeatures(schoolId: string, filters?: Record<string, unknown>): Promise<CloudFeature[]> {
    return this.repo.listCloudFeature(schoolId, filters);
  }
  async createCloudFeature(schoolId: string, data: Partial<CloudFeature>): Promise<CloudFeature> {
    return this.repo.createCloudFeature(schoolId, data as any);
  }
  async updateCloudFeature(schoolId: string, id: string, data: Partial<CloudFeature>): Promise<CloudFeature> {
    const existing = await this.repo.getCloudFeature(schoolId, id);
    if (!existing) throw new EduCloudCloudFeatureError(id);
    return this.repo.updateCloudFeature(schoolId, id, data as any);
  }
  async deleteCloudFeature(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudFeature(schoolId, id);
    if (!existing) throw new EduCloudCloudFeatureError(id);
    return this.repo.deleteCloudFeature(schoolId, id);
  }
}

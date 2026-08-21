import type { SupabaseClient } from '@supabase/supabase-js';
import type { GeoPolicy } from '@educi/types';
import { EduCloudGeoPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudGeoPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getGeoPolicy(schoolId: string, id: string): Promise<GeoPolicy> {
    const item = await this.repo.getGeoPolicy(schoolId, id);
    if (!item) throw new EduCloudGeoPolicyError(id);
    return item;
  }
  async listGeoPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<GeoPolicy[]> {
    return this.repo.listGeoPolicy(schoolId, filters);
  }
  async createGeoPolicy(schoolId: string, data: Partial<GeoPolicy>): Promise<GeoPolicy> {
    return this.repo.createGeoPolicy(schoolId, data as any);
  }
  async updateGeoPolicy(schoolId: string, id: string, data: Partial<GeoPolicy>): Promise<GeoPolicy> {
    const existing = await this.repo.getGeoPolicy(schoolId, id);
    if (!existing) throw new EduCloudGeoPolicyError(id);
    return this.repo.updateGeoPolicy(schoolId, id, data as any);
  }
  async deleteGeoPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGeoPolicy(schoolId, id);
    if (!existing) throw new EduCloudGeoPolicyError(id);
    return this.repo.deleteGeoPolicy(schoolId, id);
  }
}

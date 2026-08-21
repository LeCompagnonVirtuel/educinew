import type { SupabaseClient } from '@supabase/supabase-js';
import type { GeoFailover } from '@educi/types';
import { EduCloudGeoFailoverError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudGeoFailover {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getGeoFailover(schoolId: string, id: string): Promise<GeoFailover> {
    const item = await this.repo.getGeoFailover(schoolId, id);
    if (!item) throw new EduCloudGeoFailoverError(id);
    return item;
  }
  async listGeoFailovers(schoolId: string, filters?: Record<string, unknown>): Promise<GeoFailover[]> {
    return this.repo.listGeoFailover(schoolId, filters);
  }
  async createGeoFailover(schoolId: string, data: Partial<GeoFailover>): Promise<GeoFailover> {
    return this.repo.createGeoFailover(schoolId, data as any);
  }
  async updateGeoFailover(schoolId: string, id: string, data: Partial<GeoFailover>): Promise<GeoFailover> {
    const existing = await this.repo.getGeoFailover(schoolId, id);
    if (!existing) throw new EduCloudGeoFailoverError(id);
    return this.repo.updateGeoFailover(schoolId, id, data as any);
  }
  async deleteGeoFailover(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGeoFailover(schoolId, id);
    if (!existing) throw new EduCloudGeoFailoverError(id);
    return this.repo.deleteGeoFailover(schoolId, id);
  }
}

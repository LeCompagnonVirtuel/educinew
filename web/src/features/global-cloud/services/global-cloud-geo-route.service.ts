import type { SupabaseClient } from '@supabase/supabase-js';
import type { GeoRoute } from '@educi/types';
import { EduCloudGeoRouteError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudGeoRoute {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getGeoRoute(schoolId: string, id: string): Promise<GeoRoute> {
    const item = await this.repo.getGeoRoute(schoolId, id);
    if (!item) throw new EduCloudGeoRouteError(id);
    return item;
  }
  async listGeoRoutes(schoolId: string, filters?: Record<string, unknown>): Promise<GeoRoute[]> {
    return this.repo.listGeoRoute(schoolId, filters);
  }
  async createGeoRoute(schoolId: string, data: Partial<GeoRoute>): Promise<GeoRoute> {
    return this.repo.createGeoRoute(schoolId, data as any);
  }
  async updateGeoRoute(schoolId: string, id: string, data: Partial<GeoRoute>): Promise<GeoRoute> {
    const existing = await this.repo.getGeoRoute(schoolId, id);
    if (!existing) throw new EduCloudGeoRouteError(id);
    return this.repo.updateGeoRoute(schoolId, id, data as any);
  }
  async deleteGeoRoute(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGeoRoute(schoolId, id);
    if (!existing) throw new EduCloudGeoRouteError(id);
    return this.repo.deleteGeoRoute(schoolId, id);
  }
}

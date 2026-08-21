import type { SupabaseClient } from '@supabase/supabase-js';
import type { GeoAnalytics } from '@educi/types';
import { EduCloudGeoAnalyticsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudGeoAnalytics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getGeoAnalytics(schoolId: string, id: string): Promise<GeoAnalytics> {
    const item = await this.repo.getGeoAnalytics(schoolId, id);
    if (!item) throw new EduCloudGeoAnalyticsError(id);
    return item;
  }
  async listGeoAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<GeoAnalytics[]> {
    return this.repo.listGeoAnalytics(schoolId, filters);
  }
  async createGeoAnalytics(schoolId: string, data: Partial<GeoAnalytics>): Promise<GeoAnalytics> {
    return this.repo.createGeoAnalytics(schoolId, data as any);
  }
  async updateGeoAnalytics(schoolId: string, id: string, data: Partial<GeoAnalytics>): Promise<GeoAnalytics> {
    const existing = await this.repo.getGeoAnalytics(schoolId, id);
    if (!existing) throw new EduCloudGeoAnalyticsError(id);
    return this.repo.updateGeoAnalytics(schoolId, id, data as any);
  }
  async deleteGeoAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGeoAnalytics(schoolId, id);
    if (!existing) throw new EduCloudGeoAnalyticsError(id);
    return this.repo.deleteGeoAnalytics(schoolId, id);
  }
}

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TrafficRoute } from '@educi/types';
import { EduCloudTrafficRouteError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudTrafficRoute {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getTrafficRoute(schoolId: string, id: string): Promise<TrafficRoute> {
    const item = await this.repo.getTrafficRoute(schoolId, id);
    if (!item) throw new EduCloudTrafficRouteError(id);
    return item;
  }
  async listTrafficRoutes(schoolId: string, filters?: Record<string, unknown>): Promise<TrafficRoute[]> {
    return this.repo.listTrafficRoute(schoolId, filters);
  }
  async createTrafficRoute(schoolId: string, data: Partial<TrafficRoute>): Promise<TrafficRoute> {
    return this.repo.createTrafficRoute(schoolId, data as any);
  }
  async updateTrafficRoute(schoolId: string, id: string, data: Partial<TrafficRoute>): Promise<TrafficRoute> {
    const existing = await this.repo.getTrafficRoute(schoolId, id);
    if (!existing) throw new EduCloudTrafficRouteError(id);
    return this.repo.updateTrafficRoute(schoolId, id, data as any);
  }
  async deleteTrafficRoute(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTrafficRoute(schoolId, id);
    if (!existing) throw new EduCloudTrafficRouteError(id);
    return this.repo.deleteTrafficRoute(schoolId, id);
  }
}

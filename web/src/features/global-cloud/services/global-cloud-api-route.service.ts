import type { SupabaseClient } from '@supabase/supabase-js';
import type { ApiRoute } from '@educi/types';
import { EduCloudApiRouteError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudApiRoute {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getApiRoute(schoolId: string, id: string): Promise<ApiRoute> {
    const item = await this.repo.getApiRoute(schoolId, id);
    if (!item) throw new EduCloudApiRouteError(id);
    return item;
  }
  async listApiRoutes(schoolId: string, filters?: Record<string, unknown>): Promise<ApiRoute[]> {
    return this.repo.listApiRoute(schoolId, filters);
  }
  async createApiRoute(schoolId: string, data: Partial<ApiRoute>): Promise<ApiRoute> {
    return this.repo.createApiRoute(schoolId, data as any);
  }
  async updateApiRoute(schoolId: string, id: string, data: Partial<ApiRoute>): Promise<ApiRoute> {
    const existing = await this.repo.getApiRoute(schoolId, id);
    if (!existing) throw new EduCloudApiRouteError(id);
    return this.repo.updateApiRoute(schoolId, id, data as any);
  }
  async deleteApiRoute(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getApiRoute(schoolId, id);
    if (!existing) throw new EduCloudApiRouteError(id);
    return this.repo.deleteApiRoute(schoolId, id);
  }
}

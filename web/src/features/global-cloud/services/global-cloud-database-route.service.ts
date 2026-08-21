import type { SupabaseClient } from '@supabase/supabase-js';
import type { DatabaseRoute } from '@educi/types';
import { EduCloudDatabaseRouteError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDatabaseRoute {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDatabaseRoute(schoolId: string, id: string): Promise<DatabaseRoute> {
    const item = await this.repo.getDatabaseRoute(schoolId, id);
    if (!item) throw new EduCloudDatabaseRouteError(id);
    return item;
  }
  async listDatabaseRoutes(schoolId: string, filters?: Record<string, unknown>): Promise<DatabaseRoute[]> {
    return this.repo.listDatabaseRoute(schoolId, filters);
  }
  async createDatabaseRoute(schoolId: string, data: Partial<DatabaseRoute>): Promise<DatabaseRoute> {
    return this.repo.createDatabaseRoute(schoolId, data as any);
  }
  async updateDatabaseRoute(schoolId: string, id: string, data: Partial<DatabaseRoute>): Promise<DatabaseRoute> {
    const existing = await this.repo.getDatabaseRoute(schoolId, id);
    if (!existing) throw new EduCloudDatabaseRouteError(id);
    return this.repo.updateDatabaseRoute(schoolId, id, data as any);
  }
  async deleteDatabaseRoute(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDatabaseRoute(schoolId, id);
    if (!existing) throw new EduCloudDatabaseRouteError(id);
    return this.repo.deleteDatabaseRoute(schoolId, id);
  }
}

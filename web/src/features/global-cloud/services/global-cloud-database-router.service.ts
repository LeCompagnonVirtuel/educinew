import type { SupabaseClient } from '@supabase/supabase-js';
import type { DatabaseRouter } from '@educi/types';
import { EduCloudDatabaseRouterError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDatabaseRouter {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDatabaseRouter(schoolId: string, id: string): Promise<DatabaseRouter> {
    const item = await this.repo.getDatabaseRouter(schoolId, id);
    if (!item) throw new EduCloudDatabaseRouterError(id);
    return item;
  }
  async listDatabaseRouters(schoolId: string, filters?: Record<string, unknown>): Promise<DatabaseRouter[]> {
    return this.repo.listDatabaseRouter(schoolId, filters);
  }
  async createDatabaseRouter(schoolId: string, data: Partial<DatabaseRouter>): Promise<DatabaseRouter> {
    return this.repo.createDatabaseRouter(schoolId, data as any);
  }
  async updateDatabaseRouter(schoolId: string, id: string, data: Partial<DatabaseRouter>): Promise<DatabaseRouter> {
    const existing = await this.repo.getDatabaseRouter(schoolId, id);
    if (!existing) throw new EduCloudDatabaseRouterError(id);
    return this.repo.updateDatabaseRouter(schoolId, id, data as any);
  }
  async deleteDatabaseRouter(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDatabaseRouter(schoolId, id);
    if (!existing) throw new EduCloudDatabaseRouterError(id);
    return this.repo.deleteDatabaseRouter(schoolId, id);
  }
}

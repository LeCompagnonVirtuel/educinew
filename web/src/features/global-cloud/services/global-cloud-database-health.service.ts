import type { SupabaseClient } from '@supabase/supabase-js';
import type { DatabaseHealth } from '@educi/types';
import { EduCloudDatabaseHealthError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDatabaseHealth {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDatabaseHealth(schoolId: string, id: string): Promise<DatabaseHealth> {
    const item = await this.repo.getDatabaseHealth(schoolId, id);
    if (!item) throw new EduCloudDatabaseHealthError(id);
    return item;
  }
  async listDatabaseHealths(schoolId: string, filters?: Record<string, unknown>): Promise<DatabaseHealth[]> {
    return this.repo.listDatabaseHealth(schoolId, filters);
  }
  async createDatabaseHealth(schoolId: string, data: Partial<DatabaseHealth>): Promise<DatabaseHealth> {
    return this.repo.createDatabaseHealth(schoolId, data as any);
  }
  async updateDatabaseHealth(schoolId: string, id: string, data: Partial<DatabaseHealth>): Promise<DatabaseHealth> {
    const existing = await this.repo.getDatabaseHealth(schoolId, id);
    if (!existing) throw new EduCloudDatabaseHealthError(id);
    return this.repo.updateDatabaseHealth(schoolId, id, data as any);
  }
  async deleteDatabaseHealth(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDatabaseHealth(schoolId, id);
    if (!existing) throw new EduCloudDatabaseHealthError(id);
    return this.repo.deleteDatabaseHealth(schoolId, id);
  }
}

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DatabaseMetrics } from '@educi/types';
import { EduCloudDatabaseMetricsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDatabaseMetrics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDatabaseMetrics(schoolId: string, id: string): Promise<DatabaseMetrics> {
    const item = await this.repo.getDatabaseMetrics(schoolId, id);
    if (!item) throw new EduCloudDatabaseMetricsError(id);
    return item;
  }
  async listDatabaseMetricss(schoolId: string, filters?: Record<string, unknown>): Promise<DatabaseMetrics[]> {
    return this.repo.listDatabaseMetrics(schoolId, filters);
  }
  async createDatabaseMetrics(schoolId: string, data: Partial<DatabaseMetrics>): Promise<DatabaseMetrics> {
    return this.repo.createDatabaseMetrics(schoolId, data as any);
  }
  async updateDatabaseMetrics(schoolId: string, id: string, data: Partial<DatabaseMetrics>): Promise<DatabaseMetrics> {
    const existing = await this.repo.getDatabaseMetrics(schoolId, id);
    if (!existing) throw new EduCloudDatabaseMetricsError(id);
    return this.repo.updateDatabaseMetrics(schoolId, id, data as any);
  }
  async deleteDatabaseMetrics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDatabaseMetrics(schoolId, id);
    if (!existing) throw new EduCloudDatabaseMetricsError(id);
    return this.repo.deleteDatabaseMetrics(schoolId, id);
  }
}

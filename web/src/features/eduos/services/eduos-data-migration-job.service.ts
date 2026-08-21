import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataMigrationJob } from '@educi/types';
import { EduOSDataMigrationJobError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataMigrationJobService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataMigrationJob(schoolId: string, id: string): Promise<DataMigrationJob> {
    const item = await this.repo.getDataMigrationJob(schoolId, id);
    if (!item) throw new EduOSDataMigrationJobError(id);
    return item;
  }
  async listDataMigrationJobs(schoolId: string, filters?: Record<string, unknown>): Promise<DataMigrationJob[]> {
    return this.repo.listDataMigrationJobs(schoolId, filters);
  }
  async createDataMigrationJob(schoolId: string, data: Partial<DataMigrationJob>): Promise<DataMigrationJob> {
    return this.repo.createDataMigrationJob(schoolId, data as any);
  }
  async updateDataMigrationJob(schoolId: string, id: string, data: Partial<DataMigrationJob>): Promise<DataMigrationJob> {
    const existing = await this.repo.getDataMigrationJob(schoolId, id);
    if (!existing) throw new EduOSDataMigrationJobError(id);
    return this.repo.updateDataMigrationJob(schoolId, id, data as any);
  }
  async deleteDataMigrationJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataMigrationJob(schoolId, id);
    if (!existing) throw new EduOSDataMigrationJobError(id);
    return this.repo.deleteDataMigrationJob(schoolId, id);
  }
}


import type { SupabaseClient } from '@supabase/supabase-js';
import type { BackupJob } from '@educi/types';
import { EduCloudBackupJobError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudBackupJob {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getBackupJob(schoolId: string, id: string): Promise<BackupJob> {
    const item = await this.repo.getBackupJob(schoolId, id);
    if (!item) throw new EduCloudBackupJobError(id);
    return item;
  }
  async listBackupJobs(schoolId: string, filters?: Record<string, unknown>): Promise<BackupJob[]> {
    return this.repo.listBackupJob(schoolId, filters);
  }
  async createBackupJob(schoolId: string, data: Partial<BackupJob>): Promise<BackupJob> {
    return this.repo.createBackupJob(schoolId, data as any);
  }
  async updateBackupJob(schoolId: string, id: string, data: Partial<BackupJob>): Promise<BackupJob> {
    const existing = await this.repo.getBackupJob(schoolId, id);
    if (!existing) throw new EduCloudBackupJobError(id);
    return this.repo.updateBackupJob(schoolId, id, data as any);
  }
  async deleteBackupJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBackupJob(schoolId, id);
    if (!existing) throw new EduCloudBackupJobError(id);
    return this.repo.deleteBackupJob(schoolId, id);
  }
}

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BackupRestore } from '@educi/types';
import { EduCloudBackupRestoreError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudBackupRestore {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getBackupRestore(schoolId: string, id: string): Promise<BackupRestore> {
    const item = await this.repo.getBackupRestore(schoolId, id);
    if (!item) throw new EduCloudBackupRestoreError(id);
    return item;
  }
  async listBackupRestores(schoolId: string, filters?: Record<string, unknown>): Promise<BackupRestore[]> {
    return this.repo.listBackupRestore(schoolId, filters);
  }
  async createBackupRestore(schoolId: string, data: Partial<BackupRestore>): Promise<BackupRestore> {
    return this.repo.createBackupRestore(schoolId, data as any);
  }
  async updateBackupRestore(schoolId: string, id: string, data: Partial<BackupRestore>): Promise<BackupRestore> {
    const existing = await this.repo.getBackupRestore(schoolId, id);
    if (!existing) throw new EduCloudBackupRestoreError(id);
    return this.repo.updateBackupRestore(schoolId, id, data as any);
  }
  async deleteBackupRestore(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBackupRestore(schoolId, id);
    if (!existing) throw new EduCloudBackupRestoreError(id);
    return this.repo.deleteBackupRestore(schoolId, id);
  }
}

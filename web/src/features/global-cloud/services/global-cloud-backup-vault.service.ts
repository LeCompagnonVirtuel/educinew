import type { SupabaseClient } from '@supabase/supabase-js';
import type { BackupVault } from '@educi/types';
import { EduCloudBackupVaultError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudBackupVault {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getBackupVault(schoolId: string, id: string): Promise<BackupVault> {
    const item = await this.repo.getBackupVault(schoolId, id);
    if (!item) throw new EduCloudBackupVaultError(id);
    return item;
  }
  async listBackupVaults(schoolId: string, filters?: Record<string, unknown>): Promise<BackupVault[]> {
    return this.repo.listBackupVault(schoolId, filters);
  }
  async createBackupVault(schoolId: string, data: Partial<BackupVault>): Promise<BackupVault> {
    return this.repo.createBackupVault(schoolId, data as any);
  }
  async updateBackupVault(schoolId: string, id: string, data: Partial<BackupVault>): Promise<BackupVault> {
    const existing = await this.repo.getBackupVault(schoolId, id);
    if (!existing) throw new EduCloudBackupVaultError(id);
    return this.repo.updateBackupVault(schoolId, id, data as any);
  }
  async deleteBackupVault(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBackupVault(schoolId, id);
    if (!existing) throw new EduCloudBackupVaultError(id);
    return this.repo.deleteBackupVault(schoolId, id);
  }
}

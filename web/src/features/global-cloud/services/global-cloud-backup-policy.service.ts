import type { SupabaseClient } from '@supabase/supabase-js';
import type { BackupPolicy } from '@educi/types';
import { EduCloudBackupPolicyError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudBackupPolicy {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getBackupPolicy(schoolId: string, id: string): Promise<BackupPolicy> {
    const item = await this.repo.getBackupPolicy(schoolId, id);
    if (!item) throw new EduCloudBackupPolicyError(id);
    return item;
  }
  async listBackupPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<BackupPolicy[]> {
    return this.repo.listBackupPolicy(schoolId, filters);
  }
  async createBackupPolicy(schoolId: string, data: Partial<BackupPolicy>): Promise<BackupPolicy> {
    return this.repo.createBackupPolicy(schoolId, data as any);
  }
  async updateBackupPolicy(schoolId: string, id: string, data: Partial<BackupPolicy>): Promise<BackupPolicy> {
    const existing = await this.repo.getBackupPolicy(schoolId, id);
    if (!existing) throw new EduCloudBackupPolicyError(id);
    return this.repo.updateBackupPolicy(schoolId, id, data as any);
  }
  async deleteBackupPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBackupPolicy(schoolId, id);
    if (!existing) throw new EduCloudBackupPolicyError(id);
    return this.repo.deleteBackupPolicy(schoolId, id);
  }
}

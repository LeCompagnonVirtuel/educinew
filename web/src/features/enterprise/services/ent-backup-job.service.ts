// Enterprise Platform Service - BackupJob
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BackupJob, BackupJobCreate } from '@educi/types';
import { EntBackupJobNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBackupJobService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBackupJob(schoolId: string, id: string): Promise<BackupJob> {
    const item = await this.repo.findBackupJobById(schoolId, id);
    if (!item) throw new EntBackupJobNotFoundError(id);
    return item;
  }
  async listBackupJobs(schoolId: string, filters?: Record<string, unknown>): Promise<BackupJob[]> {
    return this.repo.findAllBackupJobs(schoolId, filters);
  }
  async createBackupJob(schoolId: string, data: BackupJobCreate): Promise<BackupJob> {
    return this.repo.createBackupJob(schoolId, data);
  }
  async updateBackupJob(schoolId: string, id: string, data: Partial<BackupJobCreate>): Promise<BackupJob> {
    const existing = await this.repo.findBackupJobById(schoolId, id);
    if (!existing) throw new EntBackupJobNotFoundError(id);
    return this.repo.updateBackupJob(schoolId, id, data);
  }
  async deleteBackupJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBackupJobById(schoolId, id);
    if (!existing) throw new EntBackupJobNotFoundError(id);
    return this.repo.deleteBackupJob(schoolId, id);
  }
  async countBackupJobs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBackupJobs(schoolId, filters);
  }
}

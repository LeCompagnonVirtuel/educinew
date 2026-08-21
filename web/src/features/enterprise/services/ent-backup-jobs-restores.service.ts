// Enterprise Platform Service - BackupJobsRestores
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBackupRestoreService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBackupJobsRestore(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findBackupJobsRestoreById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listBackupJobsRestores(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllBackupJobsRestores(schoolId, filters);
  }
  async createBackupJobsRestore(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createBackupJobsRestore(schoolId, data);
  }
  async updateBackupJobsRestore(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findBackupJobsRestoreById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateBackupJobsRestore(schoolId, id, data);
  }
  async deleteBackupJobsRestore(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBackupJobsRestoreById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteBackupJobsRestore(schoolId, id);
  }
  async countBackupJobsRestores(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBackupJobsRestores(schoolId, filters);
  }
}

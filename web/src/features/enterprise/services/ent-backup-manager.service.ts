// Enterprise Platform Service - BackupManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BackupManager, BackupManagerCreate } from '@educi/types';
import { EntBackupManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBackupManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBackupManager(schoolId: string, id: string): Promise<BackupManager> {
    const item = await this.repo.findBackupManagerById(schoolId, id);
    if (!item) throw new EntBackupManagerNotFoundError(id);
    return item;
  }
  async listBackupManagers(schoolId: string, filters?: Record<string, unknown>): Promise<BackupManager[]> {
    return this.repo.findAllBackupManagers(schoolId, filters);
  }
  async createBackupManager(schoolId: string, data: BackupManagerCreate): Promise<BackupManager> {
    return this.repo.createBackupManager(schoolId, data);
  }
  async updateBackupManager(schoolId: string, id: string, data: Partial<BackupManagerCreate>): Promise<BackupManager> {
    const existing = await this.repo.findBackupManagerById(schoolId, id);
    if (!existing) throw new EntBackupManagerNotFoundError(id);
    return this.repo.updateBackupManager(schoolId, id, data);
  }
  async deleteBackupManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBackupManagerById(schoolId, id);
    if (!existing) throw new EntBackupManagerNotFoundError(id);
    return this.repo.deleteBackupManager(schoolId, id);
  }
  async countBackupManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBackupManagers(schoolId, filters);
  }
}

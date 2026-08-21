// Enterprise Platform Service - PlatformBackup
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformBackup, PlatformBackupCreate } from '@educi/types';
import { EntPlatformBackupNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformBackupService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformBackup(schoolId: string, id: string): Promise<PlatformBackup> {
    const item = await this.repo.findPlatformBackupById(schoolId, id);
    if (!item) throw new EntPlatformBackupNotFoundError(id);
    return item;
  }
  async listPlatformBackups(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformBackup[]> {
    return this.repo.findAllPlatformBackups(schoolId, filters);
  }
  async createPlatformBackup(schoolId: string, data: PlatformBackupCreate): Promise<PlatformBackup> {
    return this.repo.createPlatformBackup(schoolId, data);
  }
  async updatePlatformBackup(schoolId: string, id: string, data: Partial<PlatformBackupCreate>): Promise<PlatformBackup> {
    const existing = await this.repo.findPlatformBackupById(schoolId, id);
    if (!existing) throw new EntPlatformBackupNotFoundError(id);
    return this.repo.updatePlatformBackup(schoolId, id, data);
  }
  async deletePlatformBackup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformBackupById(schoolId, id);
    if (!existing) throw new EntPlatformBackupNotFoundError(id);
    return this.repo.deletePlatformBackup(schoolId, id);
  }
  async countPlatformBackups(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformBackups(schoolId, filters);
  }
}

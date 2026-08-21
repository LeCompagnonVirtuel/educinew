// Enterprise Platform Service - PlatformBackup
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformBackup, PlatformBackupCreate } from '@educi/types';
import { EntPlatformBackupNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformBackupServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformBackupService(schoolId: string, id: string): Promise<PlatformBackup> {
    const item = await this.repo.findPlatformBackupServiceById(schoolId, id);
    if (!item) throw new EntPlatformBackupNotFoundError(id);
    return item;
  }
  async listPlatformBackupServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformBackup[]> {
    return this.repo.findAllPlatformBackupServices(schoolId, filters);
  }
  async createPlatformBackupService(schoolId: string, data: PlatformBackupCreate): Promise<PlatformBackup> {
    return this.repo.createPlatformBackupService(schoolId, data);
  }
  async updatePlatformBackupService(schoolId: string, id: string, data: Partial<PlatformBackupCreate>): Promise<PlatformBackup> {
    const existing = await this.repo.findPlatformBackupServiceById(schoolId, id);
    if (!existing) throw new EntPlatformBackupNotFoundError(id);
    return this.repo.updatePlatformBackupService(schoolId, id, data);
  }
  async deletePlatformBackupService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformBackupServiceById(schoolId, id);
    if (!existing) throw new EntPlatformBackupNotFoundError(id);
    return this.repo.deletePlatformBackupService(schoolId, id);
  }
  async countPlatformBackupServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformBackupServices(schoolId, filters);
  }
}

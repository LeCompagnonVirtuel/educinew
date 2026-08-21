// Enterprise Platform Service - VolumesBackups
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntVolumeBackupService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getVolumesBackup(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findVolumesBackupById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listVolumesBackups(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllVolumesBackups(schoolId, filters);
  }
  async createVolumesBackup(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createVolumesBackup(schoolId, data);
  }
  async updateVolumesBackup(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findVolumesBackupById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateVolumesBackup(schoolId, id, data);
  }
  async deleteVolumesBackup(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVolumesBackupById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteVolumesBackup(schoolId, id);
  }
  async countVolumesBackups(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVolumesBackups(schoolId, filters);
  }
}

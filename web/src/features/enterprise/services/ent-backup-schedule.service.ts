// Enterprise Platform Service - BackupSchedule
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { BackupSchedule, BackupScheduleCreate } from '@educi/types';
import { EntBackupScheduleNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBackupScheduleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBackupSchedule(schoolId: string, id: string): Promise<BackupSchedule> {
    const item = await this.repo.findBackupScheduleById(schoolId, id);
    if (!item) throw new EntBackupScheduleNotFoundError(id);
    return item;
  }
  async listBackupSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<BackupSchedule[]> {
    return this.repo.findAllBackupSchedules(schoolId, filters);
  }
  async createBackupSchedule(schoolId: string, data: BackupScheduleCreate): Promise<BackupSchedule> {
    return this.repo.createBackupSchedule(schoolId, data);
  }
  async updateBackupSchedule(schoolId: string, id: string, data: Partial<BackupScheduleCreate>): Promise<BackupSchedule> {
    const existing = await this.repo.findBackupScheduleById(schoolId, id);
    if (!existing) throw new EntBackupScheduleNotFoundError(id);
    return this.repo.updateBackupSchedule(schoolId, id, data);
  }
  async deleteBackupSchedule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBackupScheduleById(schoolId, id);
    if (!existing) throw new EntBackupScheduleNotFoundError(id);
    return this.repo.deleteBackupSchedule(schoolId, id);
  }
  async countBackupSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBackupSchedules(schoolId, filters);
  }
}

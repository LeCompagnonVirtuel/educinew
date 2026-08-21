// Enterprise Platform Service - BackupJobsSchedules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBackupScheduleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBackupJobsSchedule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findBackupJobsScheduleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listBackupJobsSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllBackupJobsSchedules(schoolId, filters);
  }
  async createBackupJobsSchedule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createBackupJobsSchedule(schoolId, data);
  }
  async updateBackupJobsSchedule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findBackupJobsScheduleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateBackupJobsSchedule(schoolId, id, data);
  }
  async deleteBackupJobsSchedule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBackupJobsScheduleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteBackupJobsSchedule(schoolId, id);
  }
  async countBackupJobsSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBackupJobsSchedules(schoolId, filters);
  }
}

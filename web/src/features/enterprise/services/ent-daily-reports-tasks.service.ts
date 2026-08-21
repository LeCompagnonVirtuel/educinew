// Enterprise Platform Service - DailyReportsTasks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDailyTaskService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDailyReportsTask(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDailyReportsTaskById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDailyReportsTasks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDailyReportsTasks(schoolId, filters);
  }
  async createDailyReportsTask(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDailyReportsTask(schoolId, data);
  }
  async updateDailyReportsTask(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDailyReportsTaskById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDailyReportsTask(schoolId, id, data);
  }
  async deleteDailyReportsTask(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDailyReportsTaskById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDailyReportsTask(schoolId, id);
  }
  async countDailyReportsTasks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDailyReportsTasks(schoolId, filters);
  }
}

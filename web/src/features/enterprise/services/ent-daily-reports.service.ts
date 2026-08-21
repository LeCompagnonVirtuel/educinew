// Enterprise Platform Service - DailyReports
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDailyReportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDailyReport(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDailyReportById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDailyReports(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDailyReports(schoolId, filters);
  }
  async createDailyReport(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDailyReport(schoolId, data);
  }
  async updateDailyReport(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDailyReportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDailyReport(schoolId, id, data);
  }
  async deleteDailyReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDailyReportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDailyReport(schoolId, id);
  }
  async countDailyReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDailyReports(schoolId, filters);
  }
}

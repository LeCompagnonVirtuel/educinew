// Enterprise Platform Service - WeeklyReports
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntWeeklyReportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getWeeklyReport(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findWeeklyReportById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listWeeklyReports(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllWeeklyReports(schoolId, filters);
  }
  async createWeeklyReport(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createWeeklyReport(schoolId, data);
  }
  async updateWeeklyReport(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findWeeklyReportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateWeeklyReport(schoolId, id, data);
  }
  async deleteWeeklyReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWeeklyReportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteWeeklyReport(schoolId, id);
  }
  async countWeeklyReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWeeklyReports(schoolId, filters);
  }
}

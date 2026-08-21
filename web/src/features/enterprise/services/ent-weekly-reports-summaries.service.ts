// Enterprise Platform Service - WeeklyReportsSummaries
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntWeeklySummaryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getWeeklyReportsSummarie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findWeeklyReportsSummarieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listWeeklyReportsSummaries(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllWeeklyReportsSummaries(schoolId, filters);
  }
  async createWeeklyReportsSummarie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createWeeklyReportsSummarie(schoolId, data);
  }
  async updateWeeklyReportsSummarie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findWeeklyReportsSummarieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateWeeklyReportsSummarie(schoolId, id, data);
  }
  async deleteWeeklyReportsSummarie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWeeklyReportsSummarieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteWeeklyReportsSummarie(schoolId, id);
  }
  async countWeeklyReportsSummaries(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWeeklyReportsSummaries(schoolId, filters);
  }
}

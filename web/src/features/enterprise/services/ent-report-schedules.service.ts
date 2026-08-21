// Enterprise Platform Service - ReportSchedules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReportScheduleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReportSchedule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findReportScheduleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listReportSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllReportSchedules(schoolId, filters);
  }
  async createReportSchedule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createReportSchedule(schoolId, data);
  }
  async updateReportSchedule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findReportScheduleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateReportSchedule(schoolId, id, data);
  }
  async deleteReportSchedule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReportScheduleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteReportSchedule(schoolId, id);
  }
  async countReportSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReportSchedules(schoolId, filters);
  }
}

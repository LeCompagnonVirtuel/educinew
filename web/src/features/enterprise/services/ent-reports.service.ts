// Enterprise Platform Service - Reports
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReport(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findReportById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listReports(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllReports(schoolId, filters);
  }
  async createReport(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createReport(schoolId, data);
  }
  async updateReport(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findReportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateReport(schoolId, id, data);
  }
  async deleteReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteReport(schoolId, id);
  }
  async countReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReports(schoolId, filters);
  }
}

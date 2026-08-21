// Enterprise Platform Service - SlaTrackingReports
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSlaReportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSlaTrackingReport(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSlaTrackingReportById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSlaTrackingReports(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSlaTrackingReports(schoolId, filters);
  }
  async createSlaTrackingReport(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSlaTrackingReport(schoolId, data);
  }
  async updateSlaTrackingReport(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSlaTrackingReportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSlaTrackingReport(schoolId, id, data);
  }
  async deleteSlaTrackingReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSlaTrackingReportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSlaTrackingReport(schoolId, id);
  }
  async countSlaTrackingReports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSlaTrackingReports(schoolId, filters);
  }
}

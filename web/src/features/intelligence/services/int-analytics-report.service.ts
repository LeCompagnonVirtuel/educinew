// Intelligence Platform Service - AnalyticsReport
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AnalyticsReport, AnalyticsReportCreate } from '@educi/types';
import { IntAnalyticsReportNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntAnalyticsReportService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getAnalyticsReport(schoolId: string, id: string): Promise<AnalyticsReport> {
    const item = await this.repo.getAnalyticsReport(id, schoolId);
    if (!item) throw new IntAnalyticsReportNotFoundError(id);
    return item;
  }
  async listAnalyticsReports(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsReport[]> {
    return this.repo.listAnalyticsReports(schoolId, filters);
  }
  async createAnalyticsReport(schoolId: string, data: AnalyticsReportCreate): Promise<AnalyticsReport> {
    return this.repo.createAnalyticsReport({ ...data, school_id: schoolId });
  }
  async updateAnalyticsReport(schoolId: string, id: string, data: Partial<AnalyticsReportCreate>): Promise<AnalyticsReport> {
    const existing = await this.repo.getAnalyticsReport(id, schoolId);
    if (!existing) throw new IntAnalyticsReportNotFoundError(id);
    return this.repo.updateAnalyticsReport(id, schoolId, data);
  }
  async deleteAnalyticsReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAnalyticsReport(id, schoolId);
    if (!existing) throw new IntAnalyticsReportNotFoundError(id);
    return this.repo.deleteAnalyticsReport(id, schoolId);
  }
}

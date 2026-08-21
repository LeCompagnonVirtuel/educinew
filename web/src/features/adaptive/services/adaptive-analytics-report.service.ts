import type { SupabaseClient } from '@supabase/supabase-js';
import type { AnalyticsReport, AnalyticsReportCreate } from '@educi/types';
import { AdaptiveAnalyticsReportError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveAnalyticsReportService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getReport(schoolId: string, id: string): Promise<AnalyticsReport> {
    const item = await this.repo.getAnalyticsReport(schoolId, id);
    if (!item) throw new AdaptiveAnalyticsReportError(id);
    return item;
  }
  async listReports(schoolId: string, filters?: Record<string, unknown>): Promise<AnalyticsReport[]> {
    return this.repo.listAnalyticsReports(schoolId, filters);
  }
  async createReport(schoolId: string, data: AnalyticsReportCreate): Promise<AnalyticsReport> {
    return this.repo.createAnalyticsReport(schoolId, data);
  }
  async updateReport(schoolId: string, id: string, data: Partial<AnalyticsReportCreate>): Promise<AnalyticsReport> {
    const existing = await this.repo.getAnalyticsReport(schoolId, id);
    if (!existing) throw new AdaptiveAnalyticsReportError(id);
    return this.repo.updateAnalyticsReport(schoolId, id, data);
  }
  async deleteReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAnalyticsReport(schoolId, id);
    if (!existing) throw new AdaptiveAnalyticsReportError(id);
    return this.repo.deleteAnalyticsReport(schoolId, id);
  }
}

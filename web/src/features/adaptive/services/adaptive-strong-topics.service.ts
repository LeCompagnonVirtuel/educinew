import type { SupabaseClient } from '@supabase/supabase-js';
import type { StrongTopicsReport, StrongTopicsReportCreate } from '@educi/types';
import { AdaptiveStrongTopicsError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveStrongTopicsService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getReport(schoolId: string, id: string): Promise<StrongTopicsReport> {
    const item = await this.repo.getStrongTopicsReport(schoolId, id);
    if (!item) throw new AdaptiveStrongTopicsError(id);
    return item;
  }
  async listReports(schoolId: string, filters?: Record<string, unknown>): Promise<StrongTopicsReport[]> {
    return this.repo.listStrongTopicsReports(schoolId, filters);
  }
  async createReport(schoolId: string, data: StrongTopicsReportCreate): Promise<StrongTopicsReport> {
    return this.repo.createStrongTopicsReport(schoolId, data);
  }
  async updateReport(schoolId: string, id: string, data: Partial<StrongTopicsReportCreate>): Promise<StrongTopicsReport> {
    const existing = await this.repo.getStrongTopicsReport(schoolId, id);
    if (!existing) throw new AdaptiveStrongTopicsError(id);
    return this.repo.updateStrongTopicsReport(schoolId, id, data);
  }
  async deleteReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStrongTopicsReport(schoolId, id);
    if (!existing) throw new AdaptiveStrongTopicsError(id);
    return this.repo.deleteStrongTopicsReport(schoolId, id);
  }
}

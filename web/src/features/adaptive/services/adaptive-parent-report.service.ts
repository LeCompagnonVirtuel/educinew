import type { SupabaseClient } from '@supabase/supabase-js';
import type { ParentWeeklyReport } from '@educi/types';
import { AdaptiveParentWeeklyReportError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveParentWeeklyReportService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getParentWeeklyReport(schoolId: string, id: string): Promise<ParentWeeklyReport> {
    const item = await this.repo.getParentWeeklyReport(schoolId, id);
    if (!item) throw new AdaptiveParentWeeklyReportError(id);
    return item;
  }
  async listParentWeeklyReports(schoolId: string, filters?: Record<string, unknown>): Promise<ParentWeeklyReport[]> {
    return this.repo.listParentWeeklyReports(schoolId, filters);
  }
  async createParentWeeklyReport(schoolId: string, data: Omit<ParentWeeklyReport, 'id' | 'created_at'>): Promise<ParentWeeklyReport> {
    return this.repo.createParentWeeklyReport(schoolId, data);
  }
  async updateParentWeeklyReport(schoolId: string, id: string, data: Partial<Omit<ParentWeeklyReport, 'id' | 'created_at'>>): Promise<ParentWeeklyReport> {
    const existing = await this.repo.getParentWeeklyReport(schoolId, id);
    if (!existing) throw new AdaptiveParentWeeklyReportError(id);
    return this.repo.updateParentWeeklyReport(schoolId, id, data);
  }
  async deleteParentWeeklyReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getParentWeeklyReport(schoolId, id);
    if (!existing) throw new AdaptiveParentWeeklyReportError(id);
    return this.repo.deleteParentWeeklyReport(schoolId, id);
  }
}

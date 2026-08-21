import type { SupabaseClient } from '@supabase/supabase-js';
import type { WeakTopicsReport, WeakTopicsReportCreate } from '@educi/types';
import { AdaptiveWeakTopicsError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveWeakTopicsService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getReport(schoolId: string, id: string): Promise<WeakTopicsReport> {
    const item = await this.repo.getWeakTopicsReport(schoolId, id);
    if (!item) throw new AdaptiveWeakTopicsError(id);
    return item;
  }
  async listReports(schoolId: string, filters?: Record<string, unknown>): Promise<WeakTopicsReport[]> {
    return this.repo.listWeakTopicsReports(schoolId, filters);
  }
  async createReport(schoolId: string, data: WeakTopicsReportCreate): Promise<WeakTopicsReport> {
    return this.repo.createWeakTopicsReport(schoolId, data);
  }
  async updateReport(schoolId: string, id: string, data: Partial<WeakTopicsReportCreate>): Promise<WeakTopicsReport> {
    const existing = await this.repo.getWeakTopicsReport(schoolId, id);
    if (!existing) throw new AdaptiveWeakTopicsError(id);
    return this.repo.updateWeakTopicsReport(schoolId, id, data);
  }
  async deleteReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWeakTopicsReport(schoolId, id);
    if (!existing) throw new AdaptiveWeakTopicsError(id);
    return this.repo.deleteWeakTopicsReport(schoolId, id);
  }
}

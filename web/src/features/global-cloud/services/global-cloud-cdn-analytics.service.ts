import type { SupabaseClient } from '@supabase/supabase-js';
import type { CdnAnalytics } from '@educi/types';
import { EduCloudCdnAnalyticsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCdnAnalytics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCdnAnalytics(schoolId: string, id: string): Promise<CdnAnalytics> {
    const item = await this.repo.getCdnAnalytics(schoolId, id);
    if (!item) throw new EduCloudCdnAnalyticsError(id);
    return item;
  }
  async listCdnAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<CdnAnalytics[]> {
    return this.repo.listCdnAnalytics(schoolId, filters);
  }
  async createCdnAnalytics(schoolId: string, data: Partial<CdnAnalytics>): Promise<CdnAnalytics> {
    return this.repo.createCdnAnalytics(schoolId, data as any);
  }
  async updateCdnAnalytics(schoolId: string, id: string, data: Partial<CdnAnalytics>): Promise<CdnAnalytics> {
    const existing = await this.repo.getCdnAnalytics(schoolId, id);
    if (!existing) throw new EduCloudCdnAnalyticsError(id);
    return this.repo.updateCdnAnalytics(schoolId, id, data as any);
  }
  async deleteCdnAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCdnAnalytics(schoolId, id);
    if (!existing) throw new EduCloudCdnAnalyticsError(id);
    return this.repo.deleteCdnAnalytics(schoolId, id);
  }
}

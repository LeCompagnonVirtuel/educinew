import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryAnalytics } from '@educi/types';
import { EduCloudMinistryAnalyticsError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMinistryAnalytics {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMinistryAnalytics(schoolId: string, id: string): Promise<MinistryAnalytics> {
    const item = await this.repo.getMinistryAnalytics(schoolId, id);
    if (!item) throw new EduCloudMinistryAnalyticsError(id);
    return item;
  }
  async listMinistryAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryAnalytics[]> {
    return this.repo.listMinistryAnalytics(schoolId, filters);
  }
  async createMinistryAnalytics(schoolId: string, data: Partial<MinistryAnalytics>): Promise<MinistryAnalytics> {
    return this.repo.createMinistryAnalytics(schoolId, data as any);
  }
  async updateMinistryAnalytics(schoolId: string, id: string, data: Partial<MinistryAnalytics>): Promise<MinistryAnalytics> {
    const existing = await this.repo.getMinistryAnalytics(schoolId, id);
    if (!existing) throw new EduCloudMinistryAnalyticsError(id);
    return this.repo.updateMinistryAnalytics(schoolId, id, data as any);
  }
  async deleteMinistryAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMinistryAnalytics(schoolId, id);
    if (!existing) throw new EduCloudMinistryAnalyticsError(id);
    return this.repo.deleteMinistryAnalytics(schoolId, id);
  }
}

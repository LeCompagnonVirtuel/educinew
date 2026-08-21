import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntegrationAnalytics } from '@educi/types';
import { EduOSIntegrationAnalyticsError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSIntegrationAnalyticsService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getIntegrationAnalytics(schoolId: string, id: string): Promise<IntegrationAnalytics> {
    const item = await this.repo.getIntegrationAnalytics(schoolId, id);
    if (!item) throw new EduOSIntegrationAnalyticsError(id);
    return item;
  }
  async listIntegrationAnalytics(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationAnalytics[]> {
    return this.repo.listIntegrationAnalytics(schoolId, filters);
  }
  async createIntegrationAnalytics(schoolId: string, data: Partial<IntegrationAnalytics>): Promise<IntegrationAnalytics> {
    return this.repo.createIntegrationAnalytics(schoolId, data as any);
  }
  async updateIntegrationAnalytics(schoolId: string, id: string, data: Partial<IntegrationAnalytics>): Promise<IntegrationAnalytics> {
    const existing = await this.repo.getIntegrationAnalytics(schoolId, id);
    if (!existing) throw new EduOSIntegrationAnalyticsError(id);
    return this.repo.updateIntegrationAnalytics(schoolId, id, data as any);
  }
  async deleteIntegrationAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIntegrationAnalytics(schoolId, id);
    if (!existing) throw new EduOSIntegrationAnalyticsError(id);
    return this.repo.deleteIntegrationAnalytics(schoolId, id);
  }
}


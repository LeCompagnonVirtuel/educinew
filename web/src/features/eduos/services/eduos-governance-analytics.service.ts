import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernanceAnalytics } from '@educi/types';
import { EduOSGovernanceAnalyticsError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSGovernanceAnalyticsService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getGovernanceAnalytics(schoolId: string, id: string): Promise<GovernanceAnalytics> {
    const item = await this.repo.getGovernanceAnalytics(schoolId, id);
    if (!item) throw new EduOSGovernanceAnalyticsError(id);
    return item;
  }
  async listGovernanceAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<GovernanceAnalytics[]> {
    return this.repo.listGovernanceAnalyticss(schoolId, filters);
  }
  async createGovernanceAnalytics(schoolId: string, data: Partial<GovernanceAnalytics>): Promise<GovernanceAnalytics> {
    return this.repo.createGovernanceAnalytics(schoolId, data as any);
  }
  async updateGovernanceAnalytics(schoolId: string, id: string, data: Partial<GovernanceAnalytics>): Promise<GovernanceAnalytics> {
    const existing = await this.repo.getGovernanceAnalytics(schoolId, id);
    if (!existing) throw new EduOSGovernanceAnalyticsError(id);
    return this.repo.updateGovernanceAnalytics(schoolId, id, data as any);
  }
  async deleteGovernanceAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGovernanceAnalytics(schoolId, id);
    if (!existing) throw new EduOSGovernanceAnalyticsError(id);
    return this.repo.deleteGovernanceAnalytics(schoolId, id);
  }
}


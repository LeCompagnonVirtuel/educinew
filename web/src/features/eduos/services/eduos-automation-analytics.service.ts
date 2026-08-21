import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomationAnalytics } from '@educi/types';
import { EduOSAutomationAnalyticsError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAutomationAnalyticsService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAutomationAnalytics(schoolId: string, id: string): Promise<AutomationAnalytics> {
    const item = await this.repo.getAutomationAnalytics(schoolId, id);
    if (!item) throw new EduOSAutomationAnalyticsError(id);
    return item;
  }
  async listAutomationAnalyticss(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationAnalytics[]> {
    return this.repo.listAutomationAnalyticss(schoolId, filters);
  }
  async createAutomationAnalytics(schoolId: string, data: Partial<AutomationAnalytics>): Promise<AutomationAnalytics> {
    return this.repo.createAutomationAnalytics(schoolId, data as any);
  }
  async updateAutomationAnalytics(schoolId: string, id: string, data: Partial<AutomationAnalytics>): Promise<AutomationAnalytics> {
    const existing = await this.repo.getAutomationAnalytics(schoolId, id);
    if (!existing) throw new EduOSAutomationAnalyticsError(id);
    return this.repo.updateAutomationAnalytics(schoolId, id, data as any);
  }
  async deleteAutomationAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutomationAnalytics(schoolId, id);
    if (!existing) throw new EduOSAutomationAnalyticsError(id);
    return this.repo.deleteAutomationAnalytics(schoolId, id);
  }
}


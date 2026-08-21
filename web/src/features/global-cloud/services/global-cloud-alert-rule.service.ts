import type { SupabaseClient } from '@supabase/supabase-js';
import type { AlertRule } from '@educi/types';
import { EduCloudAlertRuleError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudAlertRule {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getAlertRule(schoolId: string, id: string): Promise<AlertRule> {
    const item = await this.repo.getAlertRule(schoolId, id);
    if (!item) throw new EduCloudAlertRuleError(id);
    return item;
  }
  async listAlertRules(schoolId: string, filters?: Record<string, unknown>): Promise<AlertRule[]> {
    return this.repo.listAlertRule(schoolId, filters);
  }
  async createAlertRule(schoolId: string, data: Partial<AlertRule>): Promise<AlertRule> {
    return this.repo.createAlertRule(schoolId, data as any);
  }
  async updateAlertRule(schoolId: string, id: string, data: Partial<AlertRule>): Promise<AlertRule> {
    const existing = await this.repo.getAlertRule(schoolId, id);
    if (!existing) throw new EduCloudAlertRuleError(id);
    return this.repo.updateAlertRule(schoolId, id, data as any);
  }
  async deleteAlertRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAlertRule(schoolId, id);
    if (!existing) throw new EduCloudAlertRuleError(id);
    return this.repo.deleteAlertRule(schoolId, id);
  }
}

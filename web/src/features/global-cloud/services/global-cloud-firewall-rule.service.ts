import type { SupabaseClient } from '@supabase/supabase-js';
import type { FirewallRule } from '@educi/types';
import { EduCloudFirewallRuleError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFirewallRule {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFirewallRule(schoolId: string, id: string): Promise<FirewallRule> {
    const item = await this.repo.getFirewallRule(schoolId, id);
    if (!item) throw new EduCloudFirewallRuleError(id);
    return item;
  }
  async listFirewallRules(schoolId: string, filters?: Record<string, unknown>): Promise<FirewallRule[]> {
    return this.repo.listFirewallRule(schoolId, filters);
  }
  async createFirewallRule(schoolId: string, data: Partial<FirewallRule>): Promise<FirewallRule> {
    return this.repo.createFirewallRule(schoolId, data as any);
  }
  async updateFirewallRule(schoolId: string, id: string, data: Partial<FirewallRule>): Promise<FirewallRule> {
    const existing = await this.repo.getFirewallRule(schoolId, id);
    if (!existing) throw new EduCloudFirewallRuleError(id);
    return this.repo.updateFirewallRule(schoolId, id, data as any);
  }
  async deleteFirewallRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFirewallRule(schoolId, id);
    if (!existing) throw new EduCloudFirewallRuleError(id);
    return this.repo.deleteFirewallRule(schoolId, id);
  }
}

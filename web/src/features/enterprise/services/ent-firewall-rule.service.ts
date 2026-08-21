// Enterprise Platform Service - FirewallRule
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FirewallRule, FirewallRuleCreate } from '@educi/types';
import { EntFirewallRuleNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFirewallRuleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFirewallRule(schoolId: string, id: string): Promise<FirewallRule> {
    const item = await this.repo.findFirewallRuleById(schoolId, id);
    if (!item) throw new EntFirewallRuleNotFoundError(id);
    return item;
  }
  async listFirewallRules(schoolId: string, filters?: Record<string, unknown>): Promise<FirewallRule[]> {
    return this.repo.findAllFirewallRules(schoolId, filters);
  }
  async createFirewallRule(schoolId: string, data: FirewallRuleCreate): Promise<FirewallRule> {
    return this.repo.createFirewallRule(schoolId, data);
  }
  async updateFirewallRule(schoolId: string, id: string, data: Partial<FirewallRuleCreate>): Promise<FirewallRule> {
    const existing = await this.repo.findFirewallRuleById(schoolId, id);
    if (!existing) throw new EntFirewallRuleNotFoundError(id);
    return this.repo.updateFirewallRule(schoolId, id, data);
  }
  async deleteFirewallRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFirewallRuleById(schoolId, id);
    if (!existing) throw new EntFirewallRuleNotFoundError(id);
    return this.repo.deleteFirewallRule(schoolId, id);
  }
  async countFirewallRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFirewallRules(schoolId, filters);
  }
}

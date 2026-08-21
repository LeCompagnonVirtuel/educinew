import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomationRule, AutomationRuleCreate } from '@educi/types';
import { ScAutomationRuleNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAutomationRuleService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getRule(schoolId: string, id: string): Promise<AutomationRule> {
    const rule = await this.repo.findAutomationRuleById(schoolId, id);
    if (!rule) throw new ScAutomationRuleNotFoundError(id);
    return rule;
  }

  async listRules(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationRule[]> {
    return this.repo.findAllAutomationRules(schoolId, filters);
  }

  async createRule(schoolId: string, data: AutomationRuleCreate): Promise<AutomationRule> {
    return this.repo.createAutomationRule(schoolId, data);
  }

  async updateRule(schoolId: string, id: string, data: Partial<AutomationRuleCreate>): Promise<AutomationRule> {
    const existing = await this.repo.findAutomationRuleById(schoolId, id);
    if (!existing) throw new ScAutomationRuleNotFoundError(id);
    return this.repo.updateAutomationRule(schoolId, id, data);
  }

  async deleteRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAutomationRuleById(schoolId, id);
    if (!existing) throw new ScAutomationRuleNotFoundError(id);
    return this.repo.deleteAutomationRule(schoolId, id);
  }

  async countRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAutomationRules(schoolId, filters);
  }
}

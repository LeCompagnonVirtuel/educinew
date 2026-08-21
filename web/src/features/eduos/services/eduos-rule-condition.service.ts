import type { SupabaseClient } from '@supabase/supabase-js';
import type { RuleCondition } from '@educi/types';
import { EduOSRuleConditionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSRuleConditionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getRuleCondition(schoolId: string, id: string): Promise<RuleCondition> {
    const item = await this.repo.getRuleCondition(schoolId, id);
    if (!item) throw new EduOSRuleConditionError(id);
    return item;
  }
  async listRuleConditions(schoolId: string, filters?: Record<string, unknown>): Promise<RuleCondition[]> {
    return this.repo.listRuleConditions(schoolId, filters);
  }
  async createRuleCondition(schoolId: string, data: Partial<RuleCondition>): Promise<RuleCondition> {
    return this.repo.createRuleCondition(schoolId, data as any);
  }
  async updateRuleCondition(schoolId: string, id: string, data: Partial<RuleCondition>): Promise<RuleCondition> {
    const existing = await this.repo.getRuleCondition(schoolId, id);
    if (!existing) throw new EduOSRuleConditionError(id);
    return this.repo.updateRuleCondition(schoolId, id, data as any);
  }
  async deleteRuleCondition(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRuleCondition(schoolId, id);
    if (!existing) throw new EduOSRuleConditionError(id);
    return this.repo.deleteRuleCondition(schoolId, id);
  }
}


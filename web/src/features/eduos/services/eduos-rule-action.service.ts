import type { SupabaseClient } from '@supabase/supabase-js';
import type { RuleAction } from '@educi/types';
import { EduOSRuleActionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSRuleActionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getRuleAction(schoolId: string, id: string): Promise<RuleAction> {
    const item = await this.repo.getRuleAction(schoolId, id);
    if (!item) throw new EduOSRuleActionError(id);
    return item;
  }
  async listRuleActions(schoolId: string, filters?: Record<string, unknown>): Promise<RuleAction[]> {
    return this.repo.listRuleActions(schoolId, filters);
  }
  async createRuleAction(schoolId: string, data: Partial<RuleAction>): Promise<RuleAction> {
    return this.repo.createRuleAction(schoolId, data as any);
  }
  async updateRuleAction(schoolId: string, id: string, data: Partial<RuleAction>): Promise<RuleAction> {
    const existing = await this.repo.getRuleAction(schoolId, id);
    if (!existing) throw new EduOSRuleActionError(id);
    return this.repo.updateRuleAction(schoolId, id, data as any);
  }
  async deleteRuleAction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRuleAction(schoolId, id);
    if (!existing) throw new EduOSRuleActionError(id);
    return this.repo.deleteRuleAction(schoolId, id);
  }
}


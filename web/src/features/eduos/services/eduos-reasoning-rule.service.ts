import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReasoningRule } from '@educi/types';
import { EduOSReasoningRuleError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSReasoningRuleService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getReasoningRule(schoolId: string, id: string): Promise<ReasoningRule> {
    const item = await this.repo.getReasoningRule(schoolId, id);
    if (!item) throw new EduOSReasoningRuleError(id);
    return item;
  }
  async listReasoningRules(schoolId: string, filters?: Record<string, unknown>): Promise<ReasoningRule[]> {
    return this.repo.listReasoningRules(schoolId, filters);
  }
  async createReasoningRule(schoolId: string, data: Partial<ReasoningRule>): Promise<ReasoningRule> {
    return this.repo.createReasoningRule(schoolId, data as any);
  }
  async updateReasoningRule(schoolId: string, id: string, data: Partial<ReasoningRule>): Promise<ReasoningRule> {
    const existing = await this.repo.getReasoningRule(schoolId, id);
    if (!existing) throw new EduOSReasoningRuleError(id);
    return this.repo.updateReasoningRule(schoolId, id, data as any);
  }
  async deleteReasoningRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getReasoningRule(schoolId, id);
    if (!existing) throw new EduOSReasoningRuleError(id);
    return this.repo.deleteReasoningRule(schoolId, id);
  }
}


import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusinessRule } from '@educi/types';
import { EduOSBusinessRuleError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBusinessRuleService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBusinessRule(schoolId: string, id: string): Promise<BusinessRule> {
    const item = await this.repo.getBusinessRule(schoolId, id);
    if (!item) throw new EduOSBusinessRuleError(id);
    return item;
  }
  async listBusinessRules(schoolId: string, filters?: Record<string, unknown>): Promise<BusinessRule[]> {
    return this.repo.listBusinessRules(schoolId, filters);
  }
  async createBusinessRule(schoolId: string, data: Partial<BusinessRule>): Promise<BusinessRule> {
    return this.repo.createBusinessRule(schoolId, data as any);
  }
  async updateBusinessRule(schoolId: string, id: string, data: Partial<BusinessRule>): Promise<BusinessRule> {
    const existing = await this.repo.getBusinessRule(schoolId, id);
    if (!existing) throw new EduOSBusinessRuleError(id);
    return this.repo.updateBusinessRule(schoolId, id, data as any);
  }
  async deleteBusinessRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBusinessRule(schoolId, id);
    if (!existing) throw new EduOSBusinessRuleError(id);
    return this.repo.deleteBusinessRule(schoolId, id);
  }
}


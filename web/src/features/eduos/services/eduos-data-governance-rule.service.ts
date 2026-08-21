import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataGovernanceRule } from '@educi/types';
import { EduOSDataGovernanceRuleError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataGovernanceRuleService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataGovernanceRule(schoolId: string, id: string): Promise<DataGovernanceRule> {
    const item = await this.repo.getDataGovernanceRule(schoolId, id);
    if (!item) throw new EduOSDataGovernanceRuleError(id);
    return item;
  }
  async listDataGovernanceRules(schoolId: string, filters?: Record<string, unknown>): Promise<DataGovernanceRule[]> {
    return this.repo.listDataGovernanceRules(schoolId, filters);
  }
  async createDataGovernanceRule(schoolId: string, data: Partial<DataGovernanceRule>): Promise<DataGovernanceRule> {
    return this.repo.createDataGovernanceRule(schoolId, data as any);
  }
  async updateDataGovernanceRule(schoolId: string, id: string, data: Partial<DataGovernanceRule>): Promise<DataGovernanceRule> {
    const existing = await this.repo.getDataGovernanceRule(schoolId, id);
    if (!existing) throw new EduOSDataGovernanceRuleError(id);
    return this.repo.updateDataGovernanceRule(schoolId, id, data as any);
  }
  async deleteDataGovernanceRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataGovernanceRule(schoolId, id);
    if (!existing) throw new EduOSDataGovernanceRuleError(id);
    return this.repo.deleteDataGovernanceRule(schoolId, id);
  }
}


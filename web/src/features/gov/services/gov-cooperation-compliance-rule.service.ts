import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceRule, ComplianceRuleCreate } from '@educi/types';
import { GovComplianceRuleNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCooperationComplianceRuleService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<ComplianceRule> {
    const item = await this.repo.findComplianceRuleById(schoolId, id);
    if (!item) throw new GovComplianceRuleNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceRule[]> {
    return this.repo.findAllComplianceRules(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<ComplianceRuleCreate>): Promise<ComplianceRule> {
    return this.repo.createComplianceRule(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<ComplianceRuleCreate>): Promise<ComplianceRule> {
    const existing = await this.repo.findComplianceRuleById(schoolId, id);
    if (!existing) throw new GovComplianceRuleNotFoundError(id);
    return this.repo.updateComplianceRule(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceRuleById(schoolId, id);
    if (!existing) throw new GovComplianceRuleNotFoundError(id);
    return this.repo.deleteComplianceRule(schoolId, id);
  }
}

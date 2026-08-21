// Government & National Governance Service - ComplianceRule
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceRule, ComplianceRuleCreate } from '@educi/types';
import { GovComplianceRuleNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceRuleService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceRule(schoolId: string, id: string): Promise<ComplianceRule> {
    const item = await this.repo.findComplianceRuleById(schoolId, id);
    if (!item) throw new GovComplianceRuleNotFoundError(id);
    return item;
  }

  async listComplianceRules(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceRule[]> {
    return this.repo.findAllComplianceRules(schoolId, filters);
  }

  async createComplianceRule(schoolId: string, data: ComplianceRuleCreate): Promise<ComplianceRule> {
    return this.repo.createComplianceRule(schoolId, data);
  }

  async updateComplianceRule(schoolId: string, id: string, data: Partial<ComplianceRuleCreate>): Promise<ComplianceRule> {
    const existing = await this.repo.findComplianceRuleById(schoolId, id);
    if (!existing) throw new GovComplianceRuleNotFoundError(id);
    return this.repo.updateComplianceRule(schoolId, id, data);
  }

  async deleteComplianceRule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceRuleById(schoolId, id);
    if (!existing) throw new GovComplianceRuleNotFoundError(id);
    return this.repo.deleteComplianceRule(schoolId, id);
  }

  async countComplianceRules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceRules(schoolId, filters);
  }
}

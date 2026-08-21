// Government & National Governance Service - ComplianceTrend
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceTrend, ComplianceTrendCreate } from '@educi/types';
import { GovComplianceTrendNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovComplianceTrendService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getComplianceTrend(schoolId: string, id: string): Promise<ComplianceTrend> {
    const item = await this.repo.findComplianceTrendById(schoolId, id);
    if (!item) throw new GovComplianceTrendNotFoundError(id);
    return item;
  }

  async listComplianceTrends(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceTrend[]> {
    return this.repo.findAllComplianceTrends(schoolId, filters);
  }

  async createComplianceTrend(schoolId: string, data: ComplianceTrendCreate): Promise<ComplianceTrend> {
    return this.repo.createComplianceTrend(schoolId, data);
  }

  async updateComplianceTrend(schoolId: string, id: string, data: Partial<ComplianceTrendCreate>): Promise<ComplianceTrend> {
    const existing = await this.repo.findComplianceTrendById(schoolId, id);
    if (!existing) throw new GovComplianceTrendNotFoundError(id);
    return this.repo.updateComplianceTrend(schoolId, id, data);
  }

  async deleteComplianceTrend(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findComplianceTrendById(schoolId, id);
    if (!existing) throw new GovComplianceTrendNotFoundError(id);
    return this.repo.deleteComplianceTrend(schoolId, id);
  }

  async countComplianceTrends(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countComplianceTrends(schoolId, filters);
  }
}

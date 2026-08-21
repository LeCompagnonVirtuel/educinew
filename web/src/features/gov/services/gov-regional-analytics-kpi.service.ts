// Government & National Governance Service - RegionalAnalyticsKpi
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionalAnalyticsKpi, RegionalAnalyticsKpiCreate } from '@educi/types';
import { GovRegionalAnalyticsKpiNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegionalAnalyticsKpiService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRegionalAnalyticsKpi(schoolId: string, id: string): Promise<RegionalAnalyticsKpi> {
    const item = await this.repo.findRegionalAnalyticsKpiById(schoolId, id);
    if (!item) throw new GovRegionalAnalyticsKpiNotFoundError(id);
    return item;
  }

  async listRegionalAnalyticsKpis(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalAnalyticsKpi[]> {
    return this.repo.findAllRegionalAnalyticsKpis(schoolId, filters);
  }

  async createRegionalAnalyticsKpi(schoolId: string, data: RegionalAnalyticsKpiCreate): Promise<RegionalAnalyticsKpi> {
    return this.repo.createRegionalAnalyticsKpi(schoolId, data);
  }

  async updateRegionalAnalyticsKpi(schoolId: string, id: string, data: Partial<RegionalAnalyticsKpiCreate>): Promise<RegionalAnalyticsKpi> {
    const existing = await this.repo.findRegionalAnalyticsKpiById(schoolId, id);
    if (!existing) throw new GovRegionalAnalyticsKpiNotFoundError(id);
    return this.repo.updateRegionalAnalyticsKpi(schoolId, id, data);
  }

  async deleteRegionalAnalyticsKpi(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionalAnalyticsKpiById(schoolId, id);
    if (!existing) throw new GovRegionalAnalyticsKpiNotFoundError(id);
    return this.repo.deleteRegionalAnalyticsKpi(schoolId, id);
  }

  async countRegionalAnalyticsKpis(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRegionalAnalyticsKpis(schoolId, filters);
  }
}

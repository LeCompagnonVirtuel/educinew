import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionalAnalyticsKpi, RegionalAnalyticsKpiCreate } from '@educi/types';
import { GovRegionalAnalyticsKpiNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsRegionalAnalyticsKpiService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<RegionalAnalyticsKpi> {
    const item = await this.repo.findRegionalAnalyticsKpiById(schoolId, id);
    if (!item) throw new GovRegionalAnalyticsKpiNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalAnalyticsKpi[]> {
    return this.repo.findAllRegionalAnalyticsKpis(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<RegionalAnalyticsKpiCreate>): Promise<RegionalAnalyticsKpi> {
    return this.repo.createRegionalAnalyticsKpi(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<RegionalAnalyticsKpiCreate>): Promise<RegionalAnalyticsKpi> {
    const existing = await this.repo.findRegionalAnalyticsKpiById(schoolId, id);
    if (!existing) throw new GovRegionalAnalyticsKpiNotFoundError(id);
    return this.repo.updateRegionalAnalyticsKpi(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionalAnalyticsKpiById(schoolId, id);
    if (!existing) throw new GovRegionalAnalyticsKpiNotFoundError(id);
    return this.repo.deleteRegionalAnalyticsKpi(schoolId, id);
  }
}

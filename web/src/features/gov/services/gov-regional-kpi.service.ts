// Government & National Governance Service - RegionalKpi
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegionalKpi, RegionalKpiCreate } from '@educi/types';
import { GovRegionalKpiNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovRegionalKpiService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getRegionalKpi(schoolId: string, id: string): Promise<RegionalKpi> {
    const item = await this.repo.findRegionalKpiById(schoolId, id);
    if (!item) throw new GovRegionalKpiNotFoundError(id);
    return item;
  }

  async listRegionalKpis(schoolId: string, filters?: Record<string, unknown>): Promise<RegionalKpi[]> {
    return this.repo.findAllRegionalKpis(schoolId, filters);
  }

  async createRegionalKpi(schoolId: string, data: RegionalKpiCreate): Promise<RegionalKpi> {
    return this.repo.createRegionalKpi(schoolId, data);
  }

  async updateRegionalKpi(schoolId: string, id: string, data: Partial<RegionalKpiCreate>): Promise<RegionalKpi> {
    const existing = await this.repo.findRegionalKpiById(schoolId, id);
    if (!existing) throw new GovRegionalKpiNotFoundError(id);
    return this.repo.updateRegionalKpi(schoolId, id, data);
  }

  async deleteRegionalKpi(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRegionalKpiById(schoolId, id);
    if (!existing) throw new GovRegionalKpiNotFoundError(id);
    return this.repo.deleteRegionalKpi(schoolId, id);
  }

  async countRegionalKpis(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRegionalKpis(schoolId, filters);
  }
}

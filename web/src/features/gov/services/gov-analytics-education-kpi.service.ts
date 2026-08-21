import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationKpi, EducationKpiCreate } from '@educi/types';
import { GovEducationKpiNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsEducationKpiService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<EducationKpi> {
    const item = await this.repo.findEducationKpiById(schoolId, id);
    if (!item) throw new GovEducationKpiNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<EducationKpi[]> {
    return this.repo.findAllEducationKpis(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<EducationKpiCreate>): Promise<EducationKpi> {
    return this.repo.createEducationKpi(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<EducationKpiCreate>): Promise<EducationKpi> {
    const existing = await this.repo.findEducationKpiById(schoolId, id);
    if (!existing) throw new GovEducationKpiNotFoundError(id);
    return this.repo.updateEducationKpi(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationKpiById(schoolId, id);
    if (!existing) throw new GovEducationKpiNotFoundError(id);
    return this.repo.deleteEducationKpi(schoolId, id);
  }
}

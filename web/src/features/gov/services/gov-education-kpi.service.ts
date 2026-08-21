// Government & National Governance Service - EducationKpi
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationKpi, EducationKpiCreate } from '@educi/types';
import { GovEducationKpiNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEducationKpiService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEducationKpi(schoolId: string, id: string): Promise<EducationKpi> {
    const item = await this.repo.findEducationKpiById(schoolId, id);
    if (!item) throw new GovEducationKpiNotFoundError(id);
    return item;
  }

  async listEducationKpis(schoolId: string, filters?: Record<string, unknown>): Promise<EducationKpi[]> {
    return this.repo.findAllEducationKpis(schoolId, filters);
  }

  async createEducationKpi(schoolId: string, data: EducationKpiCreate): Promise<EducationKpi> {
    return this.repo.createEducationKpi(schoolId, data);
  }

  async updateEducationKpi(schoolId: string, id: string, data: Partial<EducationKpiCreate>): Promise<EducationKpi> {
    const existing = await this.repo.findEducationKpiById(schoolId, id);
    if (!existing) throw new GovEducationKpiNotFoundError(id);
    return this.repo.updateEducationKpi(schoolId, id, data);
  }

  async deleteEducationKpi(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationKpiById(schoolId, id);
    if (!existing) throw new GovEducationKpiNotFoundError(id);
    return this.repo.deleteEducationKpi(schoolId, id);
  }

  async countEducationKpis(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEducationKpis(schoolId, filters);
  }
}

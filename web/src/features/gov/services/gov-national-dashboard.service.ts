// Government & National Governance Service - NationalDashboard
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalDashboard, NationalDashboardCreate } from '@educi/types';
import { GovNationalDashboardNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNationalDashboardService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNationalDashboard(schoolId: string, id: string): Promise<NationalDashboard> {
    const item = await this.repo.findNationalDashboardById(schoolId, id);
    if (!item) throw new GovNationalDashboardNotFoundError(id);
    return item;
  }

  async listNationalDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<NationalDashboard[]> {
    return this.repo.findAllNationalDashboards(schoolId, filters);
  }

  async createNationalDashboard(schoolId: string, data: NationalDashboardCreate): Promise<NationalDashboard> {
    return this.repo.createNationalDashboard(schoolId, data);
  }

  async updateNationalDashboard(schoolId: string, id: string, data: Partial<NationalDashboardCreate>): Promise<NationalDashboard> {
    const existing = await this.repo.findNationalDashboardById(schoolId, id);
    if (!existing) throw new GovNationalDashboardNotFoundError(id);
    return this.repo.updateNationalDashboard(schoolId, id, data);
  }

  async deleteNationalDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalDashboardById(schoolId, id);
    if (!existing) throw new GovNationalDashboardNotFoundError(id);
    return this.repo.deleteNationalDashboard(schoolId, id);
  }

  async countNationalDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNationalDashboards(schoolId, filters);
  }
}

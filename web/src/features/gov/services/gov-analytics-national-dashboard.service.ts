import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalDashboard, NationalDashboardCreate } from '@educi/types';
import { GovNationalDashboardNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsNationalDashboardService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<NationalDashboard> {
    const item = await this.repo.findNationalDashboardById(schoolId, id);
    if (!item) throw new GovNationalDashboardNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<NationalDashboard[]> {
    return this.repo.findAllNationalDashboards(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<NationalDashboardCreate>): Promise<NationalDashboard> {
    return this.repo.createNationalDashboard(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<NationalDashboardCreate>): Promise<NationalDashboard> {
    const existing = await this.repo.findNationalDashboardById(schoolId, id);
    if (!existing) throw new GovNationalDashboardNotFoundError(id);
    return this.repo.updateNationalDashboard(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalDashboardById(schoolId, id);
    if (!existing) throw new GovNationalDashboardNotFoundError(id);
    return this.repo.deleteNationalDashboard(schoolId, id);
  }
}

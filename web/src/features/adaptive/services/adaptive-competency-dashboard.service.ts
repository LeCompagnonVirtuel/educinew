import type { SupabaseClient } from '@supabase/supabase-js';
import type { CompetencyDashboard, CompetencyDashboardCreate } from '@educi/types';
import { AdaptiveCompetencyDashboardNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveCompetencyDashboardService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getDashboard(schoolId: string, id: string): Promise<CompetencyDashboard> {
    const item = await this.repo.getCompetencyDashboard(schoolId, id);
    if (!item) throw new AdaptiveCompetencyDashboardNotFoundError(id);
    return item;
  }
  async listDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyDashboard[]> {
    return this.repo.listCompetencyDashboards(schoolId, filters);
  }
  async createDashboard(schoolId: string, data: CompetencyDashboardCreate): Promise<CompetencyDashboard> {
    return this.repo.createCompetencyDashboard(schoolId, data);
  }
  async updateDashboard(schoolId: string, id: string, data: Partial<CompetencyDashboardCreate>): Promise<CompetencyDashboard> {
    const existing = await this.repo.getCompetencyDashboard(schoolId, id);
    if (!existing) throw new AdaptiveCompetencyDashboardNotFoundError(id);
    return this.repo.updateCompetencyDashboard(schoolId, id, data);
  }
  async deleteDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCompetencyDashboard(schoolId, id);
    if (!existing) throw new AdaptiveCompetencyDashboardNotFoundError(id);
    return this.repo.deleteCompetencyDashboard(schoolId, id);
  }
}

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MasteryDashboard, MasteryDashboardCreate } from '@educi/types';
import { AdaptiveMasteryDashboardNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveMasteryDashboardService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getDashboard(schoolId: string, id: string): Promise<MasteryDashboard> {
    const item = await this.repo.getMasteryDashboard(schoolId, id);
    if (!item) throw new AdaptiveMasteryDashboardNotFoundError(id);
    return item;
  }
  async listDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<MasteryDashboard[]> {
    return this.repo.listMasteryDashboards(schoolId, filters);
  }
  async createDashboard(schoolId: string, data: MasteryDashboardCreate): Promise<MasteryDashboard> {
    return this.repo.createMasteryDashboard(schoolId, data);
  }
  async updateDashboard(schoolId: string, id: string, data: Partial<MasteryDashboardCreate>): Promise<MasteryDashboard> {
    const existing = await this.repo.getMasteryDashboard(schoolId, id);
    if (!existing) throw new AdaptiveMasteryDashboardNotFoundError(id);
    return this.repo.updateMasteryDashboard(schoolId, id, data);
  }
  async deleteDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMasteryDashboard(schoolId, id);
    if (!existing) throw new AdaptiveMasteryDashboardNotFoundError(id);
    return this.repo.deleteMasteryDashboard(schoolId, id);
  }
}

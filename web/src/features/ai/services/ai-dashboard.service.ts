import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiDashboard, AiDashboardQuery, AiDashboardCreate, AiDashboardUpdate } from '@educi/types';
import { AiDashboardNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiDashboardService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getDashboard(schoolId: string, id: string): Promise<AiDashboard> {
    const dashboard = await this.repo.findById(schoolId, id);
    if (!dashboard) throw new AiDashboardNotFoundError(id);
    return dashboard;
  }

  async listDashboards(schoolId: string, query: AiDashboardQuery): Promise<AiDashboard[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createDashboard(schoolId: string, data: AiDashboardCreate): Promise<AiDashboard> {
    return this.repo.create(schoolId, data);
  }

  async updateDashboard(schoolId: string, id: string, data: AiDashboardUpdate): Promise<AiDashboard> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiDashboardNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiDashboardNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}

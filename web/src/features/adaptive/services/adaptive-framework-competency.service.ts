import type { SupabaseClient } from '@supabase/supabase-js';
import type { FrameworkCompetency, FrameworkCompetencyCreate } from '@educi/types';
import { AdaptiveFrameworkCompetencyNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveFrameworkCompetencyService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getCompetency(schoolId: string, id: string): Promise<FrameworkCompetency> {
    const item = await this.repo.getFrameworkCompetency(schoolId, id);
    if (!item) throw new AdaptiveFrameworkCompetencyNotFoundError(id);
    return item;
  }
  async listCompetencies(schoolId: string, filters?: Record<string, unknown>): Promise<FrameworkCompetency[]> {
    return this.repo.listFrameworkCompetencies(schoolId, filters);
  }
  async createCompetency(schoolId: string, data: FrameworkCompetencyCreate): Promise<FrameworkCompetency> {
    return this.repo.createFrameworkCompetency(schoolId, data);
  }
  async updateCompetency(schoolId: string, id: string, data: Partial<FrameworkCompetencyCreate>): Promise<FrameworkCompetency> {
    const existing = await this.repo.getFrameworkCompetency(schoolId, id);
    if (!existing) throw new AdaptiveFrameworkCompetencyNotFoundError(id);
    return this.repo.updateFrameworkCompetency(schoolId, id, data);
  }
  async deleteCompetency(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFrameworkCompetency(schoolId, id);
    if (!existing) throw new AdaptiveFrameworkCompetencyNotFoundError(id);
    return this.repo.deleteFrameworkCompetency(schoolId, id);
  }
}

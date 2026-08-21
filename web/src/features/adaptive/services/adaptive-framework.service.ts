import type { SupabaseClient } from '@supabase/supabase-js';
import type { CompetencyFramework, CompetencyFrameworkCreate } from '@educi/types';
import { AdaptiveFrameworkNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveFrameworkService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getFramework(schoolId: string, id: string): Promise<CompetencyFramework> {
    const item = await this.repo.getCompetencyFramework(schoolId, id);
    if (!item) throw new AdaptiveFrameworkNotFoundError(id);
    return item;
  }
  async listFrameworks(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyFramework[]> {
    return this.repo.listCompetencyFrameworks(schoolId, filters);
  }
  async createFramework(schoolId: string, data: CompetencyFrameworkCreate): Promise<CompetencyFramework> {
    return this.repo.createCompetencyFramework(schoolId, data);
  }
  async updateFramework(schoolId: string, id: string, data: Partial<CompetencyFrameworkCreate>): Promise<CompetencyFramework> {
    const existing = await this.repo.getCompetencyFramework(schoolId, id);
    if (!existing) throw new AdaptiveFrameworkNotFoundError(id);
    return this.repo.updateCompetencyFramework(schoolId, id, data);
  }
  async deleteFramework(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCompetencyFramework(schoolId, id);
    if (!existing) throw new AdaptiveFrameworkNotFoundError(id);
    return this.repo.deleteCompetencyFramework(schoolId, id);
  }
}

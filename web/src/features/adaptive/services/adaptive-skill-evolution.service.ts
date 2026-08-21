import type { SupabaseClient } from '@supabase/supabase-js';
import type { SkillEvolution, SkillEvolutionCreate } from '@educi/types';
import { AdaptiveSkillEvolutionNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveSkillEvolutionService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getEvolution(schoolId: string, id: string): Promise<SkillEvolution> {
    const item = await this.repo.getSkillEvolution(schoolId, id);
    if (!item) throw new AdaptiveSkillEvolutionNotFoundError(id);
    return item;
  }
  async listEvolutions(schoolId: string, filters?: Record<string, unknown>): Promise<SkillEvolution[]> {
    return this.repo.listSkillEvolutions(schoolId, filters);
  }
  async createEvolution(schoolId: string, data: SkillEvolutionCreate): Promise<SkillEvolution> {
    return this.repo.createSkillEvolution(schoolId, data);
  }
  async updateEvolution(schoolId: string, id: string, data: Partial<SkillEvolutionCreate>): Promise<SkillEvolution> {
    const existing = await this.repo.getSkillEvolution(schoolId, id);
    if (!existing) throw new AdaptiveSkillEvolutionNotFoundError(id);
    return this.repo.updateSkillEvolution(schoolId, id, data);
  }
  async deleteEvolution(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSkillEvolution(schoolId, id);
    if (!existing) throw new AdaptiveSkillEvolutionNotFoundError(id);
    return this.repo.deleteSkillEvolution(schoolId, id);
  }
}

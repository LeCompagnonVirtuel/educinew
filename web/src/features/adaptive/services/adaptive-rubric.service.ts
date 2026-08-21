import type { SupabaseClient } from '@supabase/supabase-js';
import type { Rubric } from '@educi/types';
import { AdaptiveRubricNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRubricService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getRubric(schoolId: string, id: string): Promise<Rubric> {
    const item = await this.repo.getRubric(schoolId, id);
    if (!item) throw new AdaptiveRubricNotFoundError(id);
    return item;
  }
  async listRubrics(schoolId: string, filters?: Record<string, unknown>): Promise<Rubric[]> {
    return this.repo.listRubrics(schoolId, filters);
  }
  async createRubric(schoolId: string, data: Omit<Rubric, 'id' | 'created_at'>): Promise<Rubric> {
    return this.repo.createRubric(schoolId, data);
  }
  async updateRubric(schoolId: string, id: string, data: Partial<Omit<Rubric, 'id' | 'created_at'>>): Promise<Rubric> {
    const existing = await this.repo.getRubric(schoolId, id);
    if (!existing) throw new AdaptiveRubricNotFoundError(id);
    return this.repo.updateRubric(schoolId, id, data);
  }
  async deleteRubric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRubric(schoolId, id);
    if (!existing) throw new AdaptiveRubricNotFoundError(id);
    return this.repo.deleteRubric(schoolId, id);
  }
}

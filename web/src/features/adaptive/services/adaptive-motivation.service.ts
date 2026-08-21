import type { SupabaseClient } from '@supabase/supabase-js';
import type { MotivationIndex, MotivationIndexCreate } from '@educi/types';
import { AdaptiveMotivationNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveMotivationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getMotivationIndex(schoolId: string, id: string): Promise<MotivationIndex> {
    const item = await this.repo.getMotivationIndex(schoolId, id);
    if (!item) throw new AdaptiveMotivationNotFoundError(id);
    return item;
  }
  async listMotivationIndices(schoolId: string, filters?: Record<string, unknown>): Promise<MotivationIndex[]> {
    return this.repo.listMotivationIndices(schoolId, filters);
  }
  async createMotivationIndex(schoolId: string, data: MotivationIndexCreate): Promise<MotivationIndex> {
    return this.repo.createMotivationIndex(schoolId, { ...data } as any);
  }
  async updateMotivationIndex(schoolId: string, id: string, data: Partial<MotivationIndexCreate>): Promise<MotivationIndex> {
    const existing = await this.repo.getMotivationIndex(schoolId, id);
    if (!existing) throw new AdaptiveMotivationNotFoundError(id);
    return this.repo.updateMotivationIndex(schoolId, id, data);
  }
  async deleteMotivationIndex(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMotivationIndex(schoolId, id);
    if (!existing) throw new AdaptiveMotivationNotFoundError(id);
    return this.repo.deleteMotivationIndex(schoolId, id);
  }
}

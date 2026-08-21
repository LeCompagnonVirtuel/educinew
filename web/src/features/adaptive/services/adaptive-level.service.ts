import type { SupabaseClient } from '@supabase/supabase-js';
import type { Level } from '@educi/types';
import { AdaptiveLevelError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveLevelService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getLevel(schoolId: string, id: string): Promise<Level> {
    const item = await this.repo.getLevel(schoolId, id);
    if (!item) throw new AdaptiveLevelError(id);
    return item;
  }
  async listLevels(schoolId: string, filters?: Record<string, unknown>): Promise<Level[]> {
    return this.repo.listLevels(schoolId, filters);
  }
  async createLevel(schoolId: string, data: Omit<Level, 'id' | 'created_at'>): Promise<Level> {
    return this.repo.createLevel(schoolId, data);
  }
  async updateLevel(schoolId: string, id: string, data: Partial<Omit<Level, 'id' | 'created_at'>>): Promise<Level> {
    const existing = await this.repo.getLevel(schoolId, id);
    if (!existing) throw new AdaptiveLevelError(id);
    return this.repo.updateLevel(schoolId, id, data);
  }
  async deleteLevel(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLevel(schoolId, id);
    if (!existing) throw new AdaptiveLevelError(id);
    return this.repo.deleteLevel(schoolId, id);
  }
}

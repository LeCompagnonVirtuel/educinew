import type { SupabaseClient } from '@supabase/supabase-js';
import type { ParentCoaching } from '@educi/types';
import { AdaptiveParentCoachingError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveParentCoachingService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getParentCoaching(schoolId: string, id: string): Promise<ParentCoaching> {
    const item = await this.repo.getParentCoaching(schoolId, id);
    if (!item) throw new AdaptiveParentCoachingError(id);
    return item;
  }
  async listParentCoachings(schoolId: string, filters?: Record<string, unknown>): Promise<ParentCoaching[]> {
    return this.repo.listParentCoachings(schoolId, filters);
  }
  async createParentCoaching(schoolId: string, data: Omit<ParentCoaching, 'id' | 'created_at'>): Promise<ParentCoaching> {
    return this.repo.createParentCoaching(schoolId, data);
  }
  async updateParentCoaching(schoolId: string, id: string, data: Partial<Omit<ParentCoaching, 'id' | 'created_at'>>): Promise<ParentCoaching> {
    const existing = await this.repo.getParentCoaching(schoolId, id);
    if (!existing) throw new AdaptiveParentCoachingError(id);
    return this.repo.updateParentCoaching(schoolId, id, data);
  }
  async deleteParentCoaching(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getParentCoaching(schoolId, id);
    if (!existing) throw new AdaptiveParentCoachingError(id);
    return this.repo.deleteParentCoaching(schoolId, id);
  }
}

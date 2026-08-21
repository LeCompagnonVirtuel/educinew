import type { SupabaseClient } from '@supabase/supabase-js';
import type { HomeActivity } from '@educi/types';
import { AdaptiveHomeActivityError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveHomeActivityService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getHomeActivity(schoolId: string, id: string): Promise<HomeActivity> {
    const item = await this.repo.getHomeActivity(schoolId, id);
    if (!item) throw new AdaptiveHomeActivityError(id);
    return item;
  }
  async listHomeActivities(schoolId: string, filters?: Record<string, unknown>): Promise<HomeActivity[]> {
    return this.repo.listHomeActivities(schoolId, filters);
  }
  async createHomeActivity(schoolId: string, data: Omit<HomeActivity, 'id' | 'created_at'>): Promise<HomeActivity> {
    return this.repo.createHomeActivity(schoolId, data);
  }
  async updateHomeActivity(schoolId: string, id: string, data: Partial<Omit<HomeActivity, 'id' | 'created_at'>>): Promise<HomeActivity> {
    const existing = await this.repo.getHomeActivity(schoolId, id);
    if (!existing) throw new AdaptiveHomeActivityError(id);
    return this.repo.updateHomeActivity(schoolId, id, data);
  }
  async deleteHomeActivity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getHomeActivity(schoolId, id);
    if (!existing) throw new AdaptiveHomeActivityError(id);
    return this.repo.deleteHomeActivity(schoolId, id);
  }
}

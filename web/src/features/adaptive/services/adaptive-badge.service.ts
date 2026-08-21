import type { SupabaseClient } from '@supabase/supabase-js';
import type { Badge } from '@educi/types';
import { AdaptiveBadgeError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveBadgeService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getBadge(schoolId: string, id: string): Promise<Badge> {
    const item = await this.repo.getBadge(schoolId, id);
    if (!item) throw new AdaptiveBadgeError(id);
    return item;
  }
  async listBadges(schoolId: string, filters?: Record<string, unknown>): Promise<Badge[]> {
    return this.repo.listBadges(schoolId, filters);
  }
  async createBadge(schoolId: string, data: Omit<Badge, 'id' | 'created_at'>): Promise<Badge> {
    return this.repo.createBadge(schoolId, data);
  }
  async updateBadge(schoolId: string, id: string, data: Partial<Omit<Badge, 'id' | 'created_at'>>): Promise<Badge> {
    const existing = await this.repo.getBadge(schoolId, id);
    if (!existing) throw new AdaptiveBadgeError(id);
    return this.repo.updateBadge(schoolId, id, data);
  }
  async deleteBadge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBadge(schoolId, id);
    if (!existing) throw new AdaptiveBadgeError(id);
    return this.repo.deleteBadge(schoolId, id);
  }
}

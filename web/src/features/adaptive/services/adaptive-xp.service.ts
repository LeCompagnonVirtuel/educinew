import type { SupabaseClient } from '@supabase/supabase-js';
import type { XP } from '@educi/types';
import { AdaptiveXPError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveXPService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getXP(schoolId: string, id: string): Promise<XP> {
    const item = await this.repo.getXP(schoolId, id);
    if (!item) throw new AdaptiveXPError(id);
    return item;
  }
  async listXPs(schoolId: string, filters?: Record<string, unknown>): Promise<XP[]> {
    return this.repo.listXPs(schoolId, filters);
  }
  async createXP(schoolId: string, data: Omit<XP, 'id' | 'created_at'>): Promise<XP> {
    return this.repo.createXP(schoolId, data);
  }
  async updateXP(schoolId: string, id: string, data: Partial<Omit<XP, 'id' | 'created_at'>>): Promise<XP> {
    const existing = await this.repo.getXP(schoolId, id);
    if (!existing) throw new AdaptiveXPError(id);
    return this.repo.updateXP(schoolId, id, data);
  }
  async deleteXP(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getXP(schoolId, id);
    if (!existing) throw new AdaptiveXPError(id);
    return this.repo.deleteXP(schoolId, id);
  }
}

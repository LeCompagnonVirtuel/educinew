import type { SupabaseClient } from '@supabase/supabase-js';
import type { HintUsage, HintUsageCreate } from '@educi/types';
import { AdaptiveHintNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveHintService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getHintUsage(schoolId: string, id: string): Promise<HintUsage> {
    const item = await this.repo.getHintUsage(schoolId, id);
    if (!item) throw new AdaptiveHintNotFoundError(id);
    return item;
  }
  async listHintUsages(schoolId: string, filters?: Record<string, unknown>): Promise<HintUsage[]> {
    return this.repo.listHintUsages(schoolId, filters);
  }
  async createHintUsage(schoolId: string, data: HintUsageCreate): Promise<HintUsage> {
    return this.repo.createHintUsage(schoolId, { ...data } as any);
  }
  async updateHintUsage(schoolId: string, id: string, data: Partial<HintUsageCreate>): Promise<HintUsage> {
    const existing = await this.repo.getHintUsage(schoolId, id);
    if (!existing) throw new AdaptiveHintNotFoundError(id);
    return this.repo.updateHintUsage(schoolId, id, data);
  }
  async deleteHintUsage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getHintUsage(schoolId, id);
    if (!existing) throw new AdaptiveHintNotFoundError(id);
    return this.repo.deleteHintUsage(schoolId, id);
  }
}

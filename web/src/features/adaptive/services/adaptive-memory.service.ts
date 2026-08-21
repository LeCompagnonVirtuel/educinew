import type { SupabaseClient } from '@supabase/supabase-js';
import type { MemoryRetention, MemoryRetentionCreate } from '@educi/types';
import { AdaptiveMemoryNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveMemoryService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getMemoryRetention(schoolId: string, id: string): Promise<MemoryRetention> {
    const item = await this.repo.getMemoryRetention(schoolId, id);
    if (!item) throw new AdaptiveMemoryNotFoundError(id);
    return item;
  }
  async listMemoryRetentions(schoolId: string, filters?: Record<string, unknown>): Promise<MemoryRetention[]> {
    return this.repo.listMemoryRetentions(schoolId, filters);
  }
  async createMemoryRetention(schoolId: string, data: MemoryRetentionCreate): Promise<MemoryRetention> {
    return this.repo.createMemoryRetention(schoolId, { ...data } as any);
  }
  async updateMemoryRetention(schoolId: string, id: string, data: Partial<MemoryRetentionCreate>): Promise<MemoryRetention> {
    const existing = await this.repo.getMemoryRetention(schoolId, id);
    if (!existing) throw new AdaptiveMemoryNotFoundError(id);
    return this.repo.updateMemoryRetention(schoolId, id, data);
  }
  async deleteMemoryRetention(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMemoryRetention(schoolId, id);
    if (!existing) throw new AdaptiveMemoryNotFoundError(id);
    return this.repo.deleteMemoryRetention(schoolId, id);
  }
}

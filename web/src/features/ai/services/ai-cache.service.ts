import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiCache, AiCacheQuery, AiCacheCreate, AiCacheUpdate } from '@educi/types';
import { AiCacheNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiCacheService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getCache(schoolId: string, id: string): Promise<AiCache> {
    const cache = await this.repo.findById(schoolId, id);
    if (!cache) throw new AiCacheNotFoundError(id);
    return cache;
  }

  async listCacheEntries(schoolId: string, query: AiCacheQuery): Promise<AiCache[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createCacheEntry(schoolId: string, data: AiCacheCreate): Promise<AiCache> {
    return this.repo.create(schoolId, data);
  }

  async updateCacheEntry(schoolId: string, id: string, data: AiCacheUpdate): Promise<AiCache> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiCacheNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }
}

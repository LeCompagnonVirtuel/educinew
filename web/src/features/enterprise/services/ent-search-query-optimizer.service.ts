// Enterprise Platform Service - SearchQueryOptimizer
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchQueryOptimizer, SearchQueryOptimizerCreate } from '@educi/types';
import { EntSearchQueryOptimizerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchQueryOptimizerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchQueryOptimizer(schoolId: string, id: string): Promise<SearchQueryOptimizer> {
    const item = await this.repo.findSearchQueryOptimizerById(schoolId, id);
    if (!item) throw new EntSearchQueryOptimizerNotFoundError(id);
    return item;
  }
  async listSearchQueryOptimizers(schoolId: string, filters?: Record<string, unknown>): Promise<SearchQueryOptimizer[]> {
    return this.repo.findAllSearchQueryOptimizers(schoolId, filters);
  }
  async createSearchQueryOptimizer(schoolId: string, data: SearchQueryOptimizerCreate): Promise<SearchQueryOptimizer> {
    return this.repo.createSearchQueryOptimizer(schoolId, data);
  }
  async updateSearchQueryOptimizer(schoolId: string, id: string, data: Partial<SearchQueryOptimizerCreate>): Promise<SearchQueryOptimizer> {
    const existing = await this.repo.findSearchQueryOptimizerById(schoolId, id);
    if (!existing) throw new EntSearchQueryOptimizerNotFoundError(id);
    return this.repo.updateSearchQueryOptimizer(schoolId, id, data);
  }
  async deleteSearchQueryOptimizer(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchQueryOptimizerById(schoolId, id);
    if (!existing) throw new EntSearchQueryOptimizerNotFoundError(id);
    return this.repo.deleteSearchQueryOptimizer(schoolId, id);
  }
  async countSearchQueryOptimizers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchQueryOptimizers(schoolId, filters);
  }
}

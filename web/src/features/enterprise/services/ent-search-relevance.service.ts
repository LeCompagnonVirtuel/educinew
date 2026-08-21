// Enterprise Platform Service - SearchRelevance
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchRelevance, SearchRelevanceCreate } from '@educi/types';
import { EntSearchRelevanceNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchRelevanceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchRelevance(schoolId: string, id: string): Promise<SearchRelevance> {
    const item = await this.repo.findSearchRelevanceById(schoolId, id);
    if (!item) throw new EntSearchRelevanceNotFoundError(id);
    return item;
  }
  async listSearchRelevances(schoolId: string, filters?: Record<string, unknown>): Promise<SearchRelevance[]> {
    return this.repo.findAllSearchRelevances(schoolId, filters);
  }
  async createSearchRelevance(schoolId: string, data: SearchRelevanceCreate): Promise<SearchRelevance> {
    return this.repo.createSearchRelevance(schoolId, data);
  }
  async updateSearchRelevance(schoolId: string, id: string, data: Partial<SearchRelevanceCreate>): Promise<SearchRelevance> {
    const existing = await this.repo.findSearchRelevanceById(schoolId, id);
    if (!existing) throw new EntSearchRelevanceNotFoundError(id);
    return this.repo.updateSearchRelevance(schoolId, id, data);
  }
  async deleteSearchRelevance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchRelevanceById(schoolId, id);
    if (!existing) throw new EntSearchRelevanceNotFoundError(id);
    return this.repo.deleteSearchRelevance(schoolId, id);
  }
  async countSearchRelevances(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchRelevances(schoolId, filters);
  }
}

// Enterprise Platform Service - SearchSynonym
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchSynonym, SearchSynonymCreate } from '@educi/types';
import { EntSearchSynonymNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchSynonymService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchSynonym(schoolId: string, id: string): Promise<SearchSynonym> {
    const item = await this.repo.findSearchSynonymById(schoolId, id);
    if (!item) throw new EntSearchSynonymNotFoundError(id);
    return item;
  }
  async listSearchSynonyms(schoolId: string, filters?: Record<string, unknown>): Promise<SearchSynonym[]> {
    return this.repo.findAllSearchSynonyms(schoolId, filters);
  }
  async createSearchSynonym(schoolId: string, data: SearchSynonymCreate): Promise<SearchSynonym> {
    return this.repo.createSearchSynonym(schoolId, data);
  }
  async updateSearchSynonym(schoolId: string, id: string, data: Partial<SearchSynonymCreate>): Promise<SearchSynonym> {
    const existing = await this.repo.findSearchSynonymById(schoolId, id);
    if (!existing) throw new EntSearchSynonymNotFoundError(id);
    return this.repo.updateSearchSynonym(schoolId, id, data);
  }
  async deleteSearchSynonym(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchSynonymById(schoolId, id);
    if (!existing) throw new EntSearchSynonymNotFoundError(id);
    return this.repo.deleteSearchSynonym(schoolId, id);
  }
  async countSearchSynonyms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchSynonyms(schoolId, filters);
  }
}

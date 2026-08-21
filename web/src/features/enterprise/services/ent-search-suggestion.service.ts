// Enterprise Platform Service - SearchSuggestion
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchSuggestion, SearchSuggestionCreate } from '@educi/types';
import { EntSearchSuggestionNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchSuggestionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchSuggestion(schoolId: string, id: string): Promise<SearchSuggestion> {
    const item = await this.repo.findSearchSuggestionById(schoolId, id);
    if (!item) throw new EntSearchSuggestionNotFoundError(id);
    return item;
  }
  async listSearchSuggestions(schoolId: string, filters?: Record<string, unknown>): Promise<SearchSuggestion[]> {
    return this.repo.findAllSearchSuggestions(schoolId, filters);
  }
  async createSearchSuggestion(schoolId: string, data: SearchSuggestionCreate): Promise<SearchSuggestion> {
    return this.repo.createSearchSuggestion(schoolId, data);
  }
  async updateSearchSuggestion(schoolId: string, id: string, data: Partial<SearchSuggestionCreate>): Promise<SearchSuggestion> {
    const existing = await this.repo.findSearchSuggestionById(schoolId, id);
    if (!existing) throw new EntSearchSuggestionNotFoundError(id);
    return this.repo.updateSearchSuggestion(schoolId, id, data);
  }
  async deleteSearchSuggestion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchSuggestionById(schoolId, id);
    if (!existing) throw new EntSearchSuggestionNotFoundError(id);
    return this.repo.deleteSearchSuggestion(schoolId, id);
  }
  async countSearchSuggestions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchSuggestions(schoolId, filters);
  }
}

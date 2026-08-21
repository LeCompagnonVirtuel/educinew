// Enterprise Platform Service - IndexBuilder
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IndexBuilder, IndexBuilderCreate } from '@educi/types';
import { EntIndexBuilderNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIndexBuilderService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIndexBuilder(schoolId: string, id: string): Promise<IndexBuilder> {
    const item = await this.repo.findIndexBuilderById(schoolId, id);
    if (!item) throw new EntIndexBuilderNotFoundError(id);
    return item;
  }
  async listIndexBuilders(schoolId: string, filters?: Record<string, unknown>): Promise<IndexBuilder[]> {
    return this.repo.findAllIndexBuilders(schoolId, filters);
  }
  async createIndexBuilder(schoolId: string, data: IndexBuilderCreate): Promise<IndexBuilder> {
    return this.repo.createIndexBuilder(schoolId, data);
  }
  async updateIndexBuilder(schoolId: string, id: string, data: Partial<IndexBuilderCreate>): Promise<IndexBuilder> {
    const existing = await this.repo.findIndexBuilderById(schoolId, id);
    if (!existing) throw new EntIndexBuilderNotFoundError(id);
    return this.repo.updateIndexBuilder(schoolId, id, data);
  }
  async deleteIndexBuilder(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIndexBuilderById(schoolId, id);
    if (!existing) throw new EntIndexBuilderNotFoundError(id);
    return this.repo.deleteIndexBuilder(schoolId, id);
  }
  async countIndexBuilders(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIndexBuilders(schoolId, filters);
  }
}

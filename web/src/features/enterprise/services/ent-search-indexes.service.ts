// Enterprise Platform Service - SearchIndexes
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchIndexService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchIndexe(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSearchIndexeById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSearchIndexes(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSearchIndexes(schoolId, filters);
  }
  async createSearchIndexe(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSearchIndexe(schoolId, data);
  }
  async updateSearchIndexe(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSearchIndexeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSearchIndexe(schoolId, id, data);
  }
  async deleteSearchIndexe(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchIndexeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSearchIndexe(schoolId, id);
  }
  async countSearchIndexes(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchIndexes(schoolId, filters);
  }
}

// Enterprise Platform Service - ChangelogsEntries
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntChangelogEntryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getChangelogsEntrie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findChangelogsEntrieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listChangelogsEntries(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllChangelogsEntries(schoolId, filters);
  }
  async createChangelogsEntrie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createChangelogsEntrie(schoolId, data);
  }
  async updateChangelogsEntrie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findChangelogsEntrieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateChangelogsEntrie(schoolId, id, data);
  }
  async deleteChangelogsEntrie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findChangelogsEntrieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteChangelogsEntrie(schoolId, id);
  }
  async countChangelogsEntries(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countChangelogsEntries(schoolId, filters);
  }
}

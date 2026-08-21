// Enterprise Platform Service - Changelogs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntChangelogService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getChangelog(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findChangelogById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listChangelogs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllChangelogs(schoolId, filters);
  }
  async createChangelog(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createChangelog(schoolId, data);
  }
  async updateChangelog(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findChangelogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateChangelog(schoolId, id, data);
  }
  async deleteChangelog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findChangelogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteChangelog(schoolId, id);
  }
  async countChangelogs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countChangelogs(schoolId, filters);
  }
}

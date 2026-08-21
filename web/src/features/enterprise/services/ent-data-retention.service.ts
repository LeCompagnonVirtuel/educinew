// Enterprise Platform Service - DataRetention
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataRetention, DataRetentionCreate } from '@educi/types';
import { EntDataRetentionNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataRetentionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataRetention(schoolId: string, id: string): Promise<DataRetention> {
    const item = await this.repo.findDataRetentionById(schoolId, id);
    if (!item) throw new EntDataRetentionNotFoundError(id);
    return item;
  }
  async listDataRetentions(schoolId: string, filters?: Record<string, unknown>): Promise<DataRetention[]> {
    return this.repo.findAllDataRetentions(schoolId, filters);
  }
  async createDataRetention(schoolId: string, data: DataRetentionCreate): Promise<DataRetention> {
    return this.repo.createDataRetention(schoolId, data);
  }
  async updateDataRetention(schoolId: string, id: string, data: Partial<DataRetentionCreate>): Promise<DataRetention> {
    const existing = await this.repo.findDataRetentionById(schoolId, id);
    if (!existing) throw new EntDataRetentionNotFoundError(id);
    return this.repo.updateDataRetention(schoolId, id, data);
  }
  async deleteDataRetention(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataRetentionById(schoolId, id);
    if (!existing) throw new EntDataRetentionNotFoundError(id);
    return this.repo.deleteDataRetention(schoolId, id);
  }
  async countDataRetentions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataRetentions(schoolId, filters);
  }
}

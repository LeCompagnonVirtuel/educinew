// Enterprise Platform Service - SlowQuery
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SlowQuery, SlowQueryCreate } from '@educi/types';
import { EntSlowQueryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSlowQueryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSlowQuery(schoolId: string, id: string): Promise<SlowQuery> {
    const item = await this.repo.findSlowQueryById(schoolId, id);
    if (!item) throw new EntSlowQueryNotFoundError(id);
    return item;
  }
  async listSlowQuerys(schoolId: string, filters?: Record<string, unknown>): Promise<SlowQuery[]> {
    return this.repo.findAllSlowQuerys(schoolId, filters);
  }
  async createSlowQuery(schoolId: string, data: SlowQueryCreate): Promise<SlowQuery> {
    return this.repo.createSlowQuery(schoolId, data);
  }
  async updateSlowQuery(schoolId: string, id: string, data: Partial<SlowQueryCreate>): Promise<SlowQuery> {
    const existing = await this.repo.findSlowQueryById(schoolId, id);
    if (!existing) throw new EntSlowQueryNotFoundError(id);
    return this.repo.updateSlowQuery(schoolId, id, data);
  }
  async deleteSlowQuery(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSlowQueryById(schoolId, id);
    if (!existing) throw new EntSlowQueryNotFoundError(id);
    return this.repo.deleteSlowQuery(schoolId, id);
  }
  async countSlowQuerys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSlowQuerys(schoolId, filters);
  }
}

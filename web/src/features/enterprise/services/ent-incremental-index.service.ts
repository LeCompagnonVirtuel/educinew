// Enterprise Platform Service - IncrementalIndex
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IncrementalIndex, IncrementalIndexCreate } from '@educi/types';
import { EntIncrementalIndexNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIncrementalIndexService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIncrementalIndex(schoolId: string, id: string): Promise<IncrementalIndex> {
    const item = await this.repo.findIncrementalIndexById(schoolId, id);
    if (!item) throw new EntIncrementalIndexNotFoundError(id);
    return item;
  }
  async listIncrementalIndexs(schoolId: string, filters?: Record<string, unknown>): Promise<IncrementalIndex[]> {
    return this.repo.findAllIncrementalIndexs(schoolId, filters);
  }
  async createIncrementalIndex(schoolId: string, data: IncrementalIndexCreate): Promise<IncrementalIndex> {
    return this.repo.createIncrementalIndex(schoolId, data);
  }
  async updateIncrementalIndex(schoolId: string, id: string, data: Partial<IncrementalIndexCreate>): Promise<IncrementalIndex> {
    const existing = await this.repo.findIncrementalIndexById(schoolId, id);
    if (!existing) throw new EntIncrementalIndexNotFoundError(id);
    return this.repo.updateIncrementalIndex(schoolId, id, data);
  }
  async deleteIncrementalIndex(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIncrementalIndexById(schoolId, id);
    if (!existing) throw new EntIncrementalIndexNotFoundError(id);
    return this.repo.deleteIncrementalIndex(schoolId, id);
  }
  async countIncrementalIndexs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIncrementalIndexs(schoolId, filters);
  }
}

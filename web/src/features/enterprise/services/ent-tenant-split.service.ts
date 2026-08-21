// Enterprise Platform Service - TenantSplit
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantSplit, TenantSplitCreate } from '@educi/types';
import { EntTenantSplitNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantSplitService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantSplit(schoolId: string, id: string): Promise<TenantSplit> {
    const item = await this.repo.findTenantSplitById(schoolId, id);
    if (!item) throw new EntTenantSplitNotFoundError(id);
    return item;
  }
  async listTenantSplits(schoolId: string, filters?: Record<string, unknown>): Promise<TenantSplit[]> {
    return this.repo.findAllTenantSplits(schoolId, filters);
  }
  async createTenantSplit(schoolId: string, data: TenantSplitCreate): Promise<TenantSplit> {
    return this.repo.createTenantSplit(schoolId, data);
  }
  async updateTenantSplit(schoolId: string, id: string, data: Partial<TenantSplitCreate>): Promise<TenantSplit> {
    const existing = await this.repo.findTenantSplitById(schoolId, id);
    if (!existing) throw new EntTenantSplitNotFoundError(id);
    return this.repo.updateTenantSplit(schoolId, id, data);
  }
  async deleteTenantSplit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantSplitById(schoolId, id);
    if (!existing) throw new EntTenantSplitNotFoundError(id);
    return this.repo.deleteTenantSplit(schoolId, id);
  }
  async countTenantSplits(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantSplits(schoolId, filters);
  }
}

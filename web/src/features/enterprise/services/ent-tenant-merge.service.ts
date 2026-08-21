// Enterprise Platform Service - TenantMerge
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantMerge, TenantMergeCreate } from '@educi/types';
import { EntTenantMergeNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantMergeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantMerge(schoolId: string, id: string): Promise<TenantMerge> {
    const item = await this.repo.findTenantMergeById(schoolId, id);
    if (!item) throw new EntTenantMergeNotFoundError(id);
    return item;
  }
  async listTenantMerges(schoolId: string, filters?: Record<string, unknown>): Promise<TenantMerge[]> {
    return this.repo.findAllTenantMerges(schoolId, filters);
  }
  async createTenantMerge(schoolId: string, data: TenantMergeCreate): Promise<TenantMerge> {
    return this.repo.createTenantMerge(schoolId, data);
  }
  async updateTenantMerge(schoolId: string, id: string, data: Partial<TenantMergeCreate>): Promise<TenantMerge> {
    const existing = await this.repo.findTenantMergeById(schoolId, id);
    if (!existing) throw new EntTenantMergeNotFoundError(id);
    return this.repo.updateTenantMerge(schoolId, id, data);
  }
  async deleteTenantMerge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantMergeById(schoolId, id);
    if (!existing) throw new EntTenantMergeNotFoundError(id);
    return this.repo.deleteTenantMerge(schoolId, id);
  }
  async countTenantMerges(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantMerges(schoolId, filters);
  }
}

// Enterprise Platform Service - TenantRestore
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantRestore, TenantRestoreCreate } from '@educi/types';
import { EntTenantRestoreNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantRestoreService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantRestore(schoolId: string, id: string): Promise<TenantRestore> {
    const item = await this.repo.findTenantRestoreById(schoolId, id);
    if (!item) throw new EntTenantRestoreNotFoundError(id);
    return item;
  }
  async listTenantRestores(schoolId: string, filters?: Record<string, unknown>): Promise<TenantRestore[]> {
    return this.repo.findAllTenantRestores(schoolId, filters);
  }
  async createTenantRestore(schoolId: string, data: TenantRestoreCreate): Promise<TenantRestore> {
    return this.repo.createTenantRestore(schoolId, data);
  }
  async updateTenantRestore(schoolId: string, id: string, data: Partial<TenantRestoreCreate>): Promise<TenantRestore> {
    const existing = await this.repo.findTenantRestoreById(schoolId, id);
    if (!existing) throw new EntTenantRestoreNotFoundError(id);
    return this.repo.updateTenantRestore(schoolId, id, data);
  }
  async deleteTenantRestore(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantRestoreById(schoolId, id);
    if (!existing) throw new EntTenantRestoreNotFoundError(id);
    return this.repo.deleteTenantRestore(schoolId, id);
  }
  async countTenantRestores(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantRestores(schoolId, filters);
  }
}

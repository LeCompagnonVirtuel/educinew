// Enterprise Platform Service - TenantClone
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantClone, TenantCloneCreate } from '@educi/types';
import { EntTenantCloneNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantCloneService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantClone(schoolId: string, id: string): Promise<TenantClone> {
    const item = await this.repo.findTenantCloneById(schoolId, id);
    if (!item) throw new EntTenantCloneNotFoundError(id);
    return item;
  }
  async listTenantClones(schoolId: string, filters?: Record<string, unknown>): Promise<TenantClone[]> {
    return this.repo.findAllTenantClones(schoolId, filters);
  }
  async createTenantClone(schoolId: string, data: TenantCloneCreate): Promise<TenantClone> {
    return this.repo.createTenantClone(schoolId, data);
  }
  async updateTenantClone(schoolId: string, id: string, data: Partial<TenantCloneCreate>): Promise<TenantClone> {
    const existing = await this.repo.findTenantCloneById(schoolId, id);
    if (!existing) throw new EntTenantCloneNotFoundError(id);
    return this.repo.updateTenantClone(schoolId, id, data);
  }
  async deleteTenantClone(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantCloneById(schoolId, id);
    if (!existing) throw new EntTenantCloneNotFoundError(id);
    return this.repo.deleteTenantClone(schoolId, id);
  }
  async countTenantClones(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantClones(schoolId, filters);
  }
}

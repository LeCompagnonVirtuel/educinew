// Enterprise Platform Service - TenantSso
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantSso, TenantSsoCreate } from '@educi/types';
import { EntTenantSsoNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantSsoService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantSso(schoolId: string, id: string): Promise<TenantSso> {
    const item = await this.repo.findTenantSsoById(schoolId, id);
    if (!item) throw new EntTenantSsoNotFoundError(id);
    return item;
  }
  async listTenantSsos(schoolId: string, filters?: Record<string, unknown>): Promise<TenantSso[]> {
    return this.repo.findAllTenantSsos(schoolId, filters);
  }
  async createTenantSso(schoolId: string, data: TenantSsoCreate): Promise<TenantSso> {
    return this.repo.createTenantSso(schoolId, data);
  }
  async updateTenantSso(schoolId: string, id: string, data: Partial<TenantSsoCreate>): Promise<TenantSso> {
    const existing = await this.repo.findTenantSsoById(schoolId, id);
    if (!existing) throw new EntTenantSsoNotFoundError(id);
    return this.repo.updateTenantSso(schoolId, id, data);
  }
  async deleteTenantSso(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantSsoById(schoolId, id);
    if (!existing) throw new EntTenantSsoNotFoundError(id);
    return this.repo.deleteTenantSso(schoolId, id);
  }
  async countTenantSsos(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantSsos(schoolId, filters);
  }
}

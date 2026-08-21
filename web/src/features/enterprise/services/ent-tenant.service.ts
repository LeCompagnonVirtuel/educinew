// Enterprise Platform Service - Tenant
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Tenant, TenantCreate } from '@educi/types';
import { EntTenantNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenant(schoolId: string, id: string): Promise<Tenant> {
    const item = await this.repo.findTenantById(schoolId, id);
    if (!item) throw new EntTenantNotFoundError(id);
    return item;
  }
  async listTenants(schoolId: string, filters?: Record<string, unknown>): Promise<Tenant[]> {
    return this.repo.findAllTenants(schoolId, filters);
  }
  async createTenant(schoolId: string, data: TenantCreate): Promise<Tenant> {
    return this.repo.createTenant(schoolId, data);
  }
  async updateTenant(schoolId: string, id: string, data: Partial<TenantCreate>): Promise<Tenant> {
    const existing = await this.repo.findTenantById(schoolId, id);
    if (!existing) throw new EntTenantNotFoundError(id);
    return this.repo.updateTenant(schoolId, id, data);
  }
  async deleteTenant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantById(schoolId, id);
    if (!existing) throw new EntTenantNotFoundError(id);
    return this.repo.deleteTenant(schoolId, id);
  }
  async countTenants(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenants(schoolId, filters);
  }
}

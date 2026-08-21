// Enterprise Platform Service - TenantRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantRegistry, TenantRegistryCreate } from '@educi/types';
import { EntTenantRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantRegistryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantRegistry(schoolId: string, id: string): Promise<TenantRegistry> {
    const item = await this.repo.findTenantRegistryById(schoolId, id);
    if (!item) throw new EntTenantRegistryNotFoundError(id);
    return item;
  }
  async listTenantRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<TenantRegistry[]> {
    return this.repo.findAllTenantRegistrys(schoolId, filters);
  }
  async createTenantRegistry(schoolId: string, data: TenantRegistryCreate): Promise<TenantRegistry> {
    return this.repo.createTenantRegistry(schoolId, data);
  }
  async updateTenantRegistry(schoolId: string, id: string, data: Partial<TenantRegistryCreate>): Promise<TenantRegistry> {
    const existing = await this.repo.findTenantRegistryById(schoolId, id);
    if (!existing) throw new EntTenantRegistryNotFoundError(id);
    return this.repo.updateTenantRegistry(schoolId, id, data);
  }
  async deleteTenantRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantRegistryById(schoolId, id);
    if (!existing) throw new EntTenantRegistryNotFoundError(id);
    return this.repo.deleteTenantRegistry(schoolId, id);
  }
  async countTenantRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantRegistrys(schoolId, filters);
  }
}

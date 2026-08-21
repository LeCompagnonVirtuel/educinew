// Enterprise Platform Service - TenantRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantRegistry, TenantRegistryCreate } from '@educi/types';
import { EntTenantRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantRegistryServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantRegistryService(schoolId: string, id: string): Promise<TenantRegistry> {
    const item = await this.repo.findTenantRegistryServiceById(schoolId, id);
    if (!item) throw new EntTenantRegistryNotFoundError(id);
    return item;
  }
  async listTenantRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<TenantRegistry[]> {
    return this.repo.findAllTenantRegistryServices(schoolId, filters);
  }
  async createTenantRegistryService(schoolId: string, data: TenantRegistryCreate): Promise<TenantRegistry> {
    return this.repo.createTenantRegistryService(schoolId, data);
  }
  async updateTenantRegistryService(schoolId: string, id: string, data: Partial<TenantRegistryCreate>): Promise<TenantRegistry> {
    const existing = await this.repo.findTenantRegistryServiceById(schoolId, id);
    if (!existing) throw new EntTenantRegistryNotFoundError(id);
    return this.repo.updateTenantRegistryService(schoolId, id, data);
  }
  async deleteTenantRegistryService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantRegistryServiceById(schoolId, id);
    if (!existing) throw new EntTenantRegistryNotFoundError(id);
    return this.repo.deleteTenantRegistryService(schoolId, id);
  }
  async countTenantRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantRegistryServices(schoolId, filters);
  }
}

// Enterprise Platform Service - TenantCustomDomain
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantCustomDomain, TenantCustomDomainCreate } from '@educi/types';
import { EntTenantCustomDomainNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantCustomDomainService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantCustomDomain(schoolId: string, id: string): Promise<TenantCustomDomain> {
    const item = await this.repo.findTenantCustomDomainById(schoolId, id);
    if (!item) throw new EntTenantCustomDomainNotFoundError(id);
    return item;
  }
  async listTenantCustomDomains(schoolId: string, filters?: Record<string, unknown>): Promise<TenantCustomDomain[]> {
    return this.repo.findAllTenantCustomDomains(schoolId, filters);
  }
  async createTenantCustomDomain(schoolId: string, data: TenantCustomDomainCreate): Promise<TenantCustomDomain> {
    return this.repo.createTenantCustomDomain(schoolId, data);
  }
  async updateTenantCustomDomain(schoolId: string, id: string, data: Partial<TenantCustomDomainCreate>): Promise<TenantCustomDomain> {
    const existing = await this.repo.findTenantCustomDomainById(schoolId, id);
    if (!existing) throw new EntTenantCustomDomainNotFoundError(id);
    return this.repo.updateTenantCustomDomain(schoolId, id, data);
  }
  async deleteTenantCustomDomain(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantCustomDomainById(schoolId, id);
    if (!existing) throw new EntTenantCustomDomainNotFoundError(id);
    return this.repo.deleteTenantCustomDomain(schoolId, id);
  }
  async countTenantCustomDomains(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantCustomDomains(schoolId, filters);
  }
}

// Enterprise Platform Service - TenantQuota
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantQuota, TenantQuotaCreate } from '@educi/types';
import { EntTenantQuotaNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantQuotaService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantQuota(schoolId: string, id: string): Promise<TenantQuota> {
    const item = await this.repo.findTenantQuotaById(schoolId, id);
    if (!item) throw new EntTenantQuotaNotFoundError(id);
    return item;
  }
  async listTenantQuotas(schoolId: string, filters?: Record<string, unknown>): Promise<TenantQuota[]> {
    return this.repo.findAllTenantQuotas(schoolId, filters);
  }
  async createTenantQuota(schoolId: string, data: TenantQuotaCreate): Promise<TenantQuota> {
    return this.repo.createTenantQuota(schoolId, data);
  }
  async updateTenantQuota(schoolId: string, id: string, data: Partial<TenantQuotaCreate>): Promise<TenantQuota> {
    const existing = await this.repo.findTenantQuotaById(schoolId, id);
    if (!existing) throw new EntTenantQuotaNotFoundError(id);
    return this.repo.updateTenantQuota(schoolId, id, data);
  }
  async deleteTenantQuota(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantQuotaById(schoolId, id);
    if (!existing) throw new EntTenantQuotaNotFoundError(id);
    return this.repo.deleteTenantQuota(schoolId, id);
  }
  async countTenantQuotas(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantQuotas(schoolId, filters);
  }
}

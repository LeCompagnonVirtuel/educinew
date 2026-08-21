// Enterprise Platform Service - TenantBilling
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantBilling, TenantBillingCreate } from '@educi/types';
import { EntTenantBillingNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantBillingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantBilling(schoolId: string, id: string): Promise<TenantBilling> {
    const item = await this.repo.findTenantBillingById(schoolId, id);
    if (!item) throw new EntTenantBillingNotFoundError(id);
    return item;
  }
  async listTenantBillings(schoolId: string, filters?: Record<string, unknown>): Promise<TenantBilling[]> {
    return this.repo.findAllTenantBillings(schoolId, filters);
  }
  async createTenantBilling(schoolId: string, data: TenantBillingCreate): Promise<TenantBilling> {
    return this.repo.createTenantBilling(schoolId, data);
  }
  async updateTenantBilling(schoolId: string, id: string, data: Partial<TenantBillingCreate>): Promise<TenantBilling> {
    const existing = await this.repo.findTenantBillingById(schoolId, id);
    if (!existing) throw new EntTenantBillingNotFoundError(id);
    return this.repo.updateTenantBilling(schoolId, id, data);
  }
  async deleteTenantBilling(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantBillingById(schoolId, id);
    if (!existing) throw new EntTenantBillingNotFoundError(id);
    return this.repo.deleteTenantBilling(schoolId, id);
  }
  async countTenantBillings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantBillings(schoolId, filters);
  }
}

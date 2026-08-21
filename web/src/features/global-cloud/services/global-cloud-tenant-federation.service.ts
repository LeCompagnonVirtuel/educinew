import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantFederation } from '@educi/types';
import { EduCloudTenantFederationError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudTenantFederation {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getTenantFederation(schoolId: string, id: string): Promise<TenantFederation> {
    const item = await this.repo.getTenantFederation(schoolId, id);
    if (!item) throw new EduCloudTenantFederationError(id);
    return item;
  }
  async listTenantFederations(schoolId: string, filters?: Record<string, unknown>): Promise<TenantFederation[]> {
    return this.repo.listTenantFederation(schoolId, filters);
  }
  async createTenantFederation(schoolId: string, data: Partial<TenantFederation>): Promise<TenantFederation> {
    return this.repo.createTenantFederation(schoolId, data as any);
  }
  async updateTenantFederation(schoolId: string, id: string, data: Partial<TenantFederation>): Promise<TenantFederation> {
    const existing = await this.repo.getTenantFederation(schoolId, id);
    if (!existing) throw new EduCloudTenantFederationError(id);
    return this.repo.updateTenantFederation(schoolId, id, data as any);
  }
  async deleteTenantFederation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTenantFederation(schoolId, id);
    if (!existing) throw new EduCloudTenantFederationError(id);
    return this.repo.deleteTenantFederation(schoolId, id);
  }
}

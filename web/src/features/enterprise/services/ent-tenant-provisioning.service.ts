// Enterprise Platform Service - TenantProvisioning
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TenantProvisioning, TenantProvisioningCreate } from '@educi/types';
import { EntTenantProvisioningNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTenantProvisioningService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTenantProvisioning(schoolId: string, id: string): Promise<TenantProvisioning> {
    const item = await this.repo.findTenantProvisioningById(schoolId, id);
    if (!item) throw new EntTenantProvisioningNotFoundError(id);
    return item;
  }
  async listTenantProvisionings(schoolId: string, filters?: Record<string, unknown>): Promise<TenantProvisioning[]> {
    return this.repo.findAllTenantProvisionings(schoolId, filters);
  }
  async createTenantProvisioning(schoolId: string, data: TenantProvisioningCreate): Promise<TenantProvisioning> {
    return this.repo.createTenantProvisioning(schoolId, data);
  }
  async updateTenantProvisioning(schoolId: string, id: string, data: Partial<TenantProvisioningCreate>): Promise<TenantProvisioning> {
    const existing = await this.repo.findTenantProvisioningById(schoolId, id);
    if (!existing) throw new EntTenantProvisioningNotFoundError(id);
    return this.repo.updateTenantProvisioning(schoolId, id, data);
  }
  async deleteTenantProvisioning(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTenantProvisioningById(schoolId, id);
    if (!existing) throw new EntTenantProvisioningNotFoundError(id);
    return this.repo.deleteTenantProvisioning(schoolId, id);
  }
  async countTenantProvisionings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTenantProvisionings(schoolId, filters);
  }
}

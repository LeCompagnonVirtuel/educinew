import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityFederation } from '@educi/types';
import { EduCloudIdentityFederationError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudIdentityFederation {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getIdentityFederation(schoolId: string, id: string): Promise<IdentityFederation> {
    const item = await this.repo.getIdentityFederation(schoolId, id);
    if (!item) throw new EduCloudIdentityFederationError(id);
    return item;
  }
  async listIdentityFederations(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityFederation[]> {
    return this.repo.listIdentityFederation(schoolId, filters);
  }
  async createIdentityFederation(schoolId: string, data: Partial<IdentityFederation>): Promise<IdentityFederation> {
    return this.repo.createIdentityFederation(schoolId, data as any);
  }
  async updateIdentityFederation(schoolId: string, id: string, data: Partial<IdentityFederation>): Promise<IdentityFederation> {
    const existing = await this.repo.getIdentityFederation(schoolId, id);
    if (!existing) throw new EduCloudIdentityFederationError(id);
    return this.repo.updateIdentityFederation(schoolId, id, data as any);
  }
  async deleteIdentityFederation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIdentityFederation(schoolId, id);
    if (!existing) throw new EduCloudIdentityFederationError(id);
    return this.repo.deleteIdentityFederation(schoolId, id);
  }
}

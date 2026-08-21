import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityProvider } from '@educi/types';
import { EduCloudIdentityProviderError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudIdentityProvider {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getIdentityProvider(schoolId: string, id: string): Promise<IdentityProvider> {
    const item = await this.repo.getIdentityProvider(schoolId, id);
    if (!item) throw new EduCloudIdentityProviderError(id);
    return item;
  }
  async listIdentityProviders(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityProvider[]> {
    return this.repo.listIdentityProvider(schoolId, filters);
  }
  async createIdentityProvider(schoolId: string, data: Partial<IdentityProvider>): Promise<IdentityProvider> {
    return this.repo.createIdentityProvider(schoolId, data as any);
  }
  async updateIdentityProvider(schoolId: string, id: string, data: Partial<IdentityProvider>): Promise<IdentityProvider> {
    const existing = await this.repo.getIdentityProvider(schoolId, id);
    if (!existing) throw new EduCloudIdentityProviderError(id);
    return this.repo.updateIdentityProvider(schoolId, id, data as any);
  }
  async deleteIdentityProvider(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIdentityProvider(schoolId, id);
    if (!existing) throw new EduCloudIdentityProviderError(id);
    return this.repo.deleteIdentityProvider(schoolId, id);
  }
}
